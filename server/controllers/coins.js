const coinRouter = require("express").Router();
const axios = require("axios");

coinRouter.get("/basicData/:coinId", (request, response, error) => {
  const coinId = request.params.coinId;
  axios
    .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    .then(response => response.data)
    .then(data => {
      const current_price = data.market_data.current_price.usd;
      const market_cap = data.market_data.market_cap.usd;
      const price_change_percentage_24h_in_currency = data.market_data.price_change_percentage_24h_in_currency.usd
      response.send({
        current_price,
        market_cap,
        price_change_percentage_24h_in_currency
      })
    });
});

coinRouter.get('/chartData/:coinId', (request, response, error) => {
  const coinId = request.params.coinId;
  axios
    .get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=5m`)
    .then(response => response.data)
    .then(data => {
      console.log(data.prices.length)
    })
})

module.exports = coinRouter;
