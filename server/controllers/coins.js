const coinRouter = require("express").Router();
const coinGeckoService = require("../services/coinGeckoService");
const CoinModel = require("../models/coin");

/* 
 * Get coin data for a given coin ID
 * Example: /coinData/bitcoin
 */
coinRouter.get("/coinData/:coinID", async (request, response, error) => {
    try {
         // Get the coin ID from the request parameters
        const coinID = request.params.coinID;

        // Fetching coin data from coingeckoapi
        const coinData = await coinGeckoService.getCoinData(coinID);

        // returning data to client
        return response.send(coinData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "Could Not Connect To API" });
    }
});

/* 
 * Get coin chart data for a given coin ID
 * Example: /chartData/bitcoin
 */
coinRouter.get("/chartData/:coinID", async (request, response, error) => {
    try {
         // Get the coin ID from the request parameters
        const coinID = request.params.coinID;

        // Fetching data for market chart
        const chartData = await coinGeckoService.getChartData(coinID);

        // returning data to client
        return response.send(chartData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "Could Not Connect To API" });
    }
});

/* 
 * Get get trending coins data from coingeckapi and sending to client
 * Example: /trendingCoins
 */
coinRouter.get("/trendingCoins", async (request, response, error) => {
    try {
        // Fetching Trending Coin data
        const trendingCoinsData = await coinGeckoService.getTrendingCoins();
        
        // returning data to client
        return response.send(trendingCoinsData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "Could Not Connect To API" });
    }
});

module.exports = coinRouter;
