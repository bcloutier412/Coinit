const coinRouter = require("express").Router();
const coinGeckoService = require("../services/coinGeckoService");
const CoinModel = require("../models/coin");

coinRouter.get("/coinData/:coinID", async (request, response, error) => {
    try {
        const coinID = request.params.coinID;

        const coinData = await coinGeckoService.getCoinData(coinID);
        return response.send(coinData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "Could Not Connect To API" });
    }
});

coinRouter.get("/chartData/:coinID", async (request, response, error) => {
    try {
        const coinID = request.params.coinID;

        // Fetching data for market chart
        const chartData = await coinGeckoService.getChartData(coinID);
        return response.send(chartData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "Could Not Connect To API" });
    }
});

coinRouter.get("/trendingCoins", async (request, response, error) => {
    try {
        // Fetching Trending Coin data
        const trendingCoinsData = await coinGeckoService.getTrendingCoins();
        response.send(trendingCoinsData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "Could Not Connect To API" });
    }
});

module.exports = coinRouter;
