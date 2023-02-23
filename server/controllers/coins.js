const coinRouter = require("express").Router();
const axios = require("axios");
const coinGeckoService = require('../services/coinGeckoService')

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

coinRouter.get("/chartData/:coinId", async (request, response, error) => {

    const coinID = request.params.coinId;

    try {
        
        // Fetching data for market chart
        const chartData = await coinGeckoService.getChartData(coinID);
        return response.send(chartData)
    }
    catch (error) {
        console.log(error)
        return response.status(404).send({ error: "Could Not Connect To API"});
    }
});

coinRouter.get("/topCoins", (request, response, error) => {});

coinRouter.get("/trendingCoins", async (request, response, error) => {
    try {

        // Fetching Trending Coin data
        const trendingCoinsData = await coinGeckoService.getTrendingCoins()
        response.send(trendingCoinsData);

    } catch (error) {
        console.log(error)
        return response.status(404).send({ error: "Could Not Connect To API"});
    }
});

module.exports = coinRouter;
