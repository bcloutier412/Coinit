const coinRouter = require("express").Router();
const axios = require("axios");

coinRouter.get("/basicData/:coinId", (request, response, error) => {
  const coinId = request.params.coinId;
  axios
    .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
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
  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=5m`
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
  // Fetching all the trending coins converting it to an array of their ids
  let trendingCoinsIDs = await axios.get(
    "https://api.coingecko.com/api/v3/search/trending"
  );
  trendingCoinsIDs = trendingCoinsIDs.data.coins.map((coin) => {
    return coin.item.id;
  });

  // Fetching all the market data for the trending coins
  let trendingCoinsData = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${trendingCoinsIDs.join("%2C")}&order=volume_desc&page=1&sparkline=false&price_change_percentage=24h`)
  trendingCoinsData = trendingCoinsData.data.length


  console.log(trendingCoinsData)
});
module.exports = coinRouter;
