const coinRouter = require("express").Router();
const coinGeckoService = require("../services/coinGeckoService");
const CoinModel = require("../models/coin");
const axios = require("axios");
var HttpsProxyAgent = require('https-proxy-agent');

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

/*
 * Get get top 10 market coins data from coingeckapi and sending to client
 * Example: /topCoins
 */
coinRouter.get("/topCoins", async (request, response, error) => {
    try {
        // Fetching Trending Coin data
        const topCoinsData = await coinGeckoService.getTopCoins();

        // returning data to client
        return response.send(topCoinsData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "Could Not Connect To API" });
    }
});

coinRouter.get("/test", async (request, response, error) => {
    // try {
    //     const testResponse = await axios.get("https://app.scrapingbee.com/api/v1", {
    //         params: {
    //             'api_key': 'TM9DTQ4DRH7FHQAKVHLOL7HOCPX13H4UDEQJINAEECYQWWEXJ4X1CPXOZH86UYG94JN07HCOIVAUB9OP',
    //             'url': 'https://api.coingecko.com/api/v3/ping',
    //         }
    //     })
    //     console.log(testResponse)
    // } catch (error) {
    //     console.log(error);
    // }
    const url = "https://api.coingecko.com/api/v3/ping";
    const resp = axios
        .get(url, {
            proxy: false,
            httpsAgent: new HttpsProxyAgent.HttpsProxyAgent('http://bcloutier412:cloutier461@dc.smartproxy.com:10000')
        })
        .then((resp) => {
            console.log(resp.data);
        }).catch((error) => {
            console.log(error)
        })
});
module.exports = coinRouter;
