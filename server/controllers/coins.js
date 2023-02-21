const coinRouter = require("express").Router();
const axios = require("axios");

const coinGeckoAPI = "https://api.coingecko.com/api/v3";

coinRouter.get("/basicData/:coinId", (request, response, error) => {
    const coinId = request.params.coinId;
    axios
        .get(coinGeckoAPI + `/coins/${coinId}`)
        .then((response) => response.data)
        .then((data) => {
            const current_price = data.market_data.current_price.usd;
            const market_cap = data.market_data.market_cap.usd;
            const price_change_percentage_24h_in_currency =
                data.market_data.price_change_percentage_24h_in_currency.usd;
            const profile_image = data.image.small;
            response.send({
                current_price,
                market_cap,
                price_change_percentage_24h_in_currency,
                profile_image,
            });
        })
        .catch((error) => {
            response.status(404).end();
        });
});

coinRouter.get("/chartData/:coinId", (request, response, error) => {
    const coinId = request.params.coinId;
    // Fetching data for market chart
    axios
        .get(
            coinGeckoAPI +
                `/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=5m`
        )
        .then((response) => response.data)
        .then((data) => {
            console.log(data.prices.length);
        })
        .catch((error) => {
            response.status(404).end();
        });
});

coinRouter.get("/topCoins", (request, response, error) => {});

coinRouter.get("/trendingCoins", async (request, response, error) => {
    try {
        // Fetching all the trending coins converting it to an array of their ids
        let trendingCoinsIDs = await axios.get(
            coinGeckoAPI + "/search/trending"
        );
        trendingCoinsIDs = trendingCoinsIDs.data.coins.map((coin) => {
            return coin.item.id;
        });
        trendingCoinsIDs = trendingCoinsIDs.join("%2C");

        // Fetching all the market data for the trending coins using the coin ids
        let trendingCoinsData = await axios.get(
            coinGeckoAPI +
                `/coins/markets?vs_currency=usd&ids=${trendingCoinsIDs}&order=volume_desc&page=1&sparkline=false&price_change_percentage=24h`
        );

        // Parsing coin data
        trendingCoinsData = trendingCoinsData.data.map((coin) => {
            return {
                name: coin.name,
                symbol: coin.symbol,
                image: coin.image,
                current_price: coin.current_price,
                price_change_percentage_24h: coin.price_change_percentage_24h,
                market_cap: coin.market_cap,
            };
        });
        
        // Sending coin data back to client
        response.send(trendingCoinsData);
    } catch (error) {
        console.log(error)
        return response.status(404).send({ error: "Could Not Connect To API"});
    }
});
module.exports = coinRouter;
