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

coinRouter.post("/watchlist/:coinID", async (request, response, error) => {
    try {
        const coinID = request.params.coinID;

        // Check if the coin is valid
        await coinGeckoService.getCoinData(coinID);

        // Check if the coin is in the database
        const coinInDatabase = await CoinModel.find({ name: coinID });
        if (coinInDatabase.length !== 0) {
            return response
                .status(409)
                .send({ error: "Coin already in watchlist" });
        }

        // Adding new coin to database
        const coin = new CoinModel({
            name: coinID,
        });

        const newCoin = await coin.save();
        return response.send(newCoin);
    } catch (error) {
        console.log(error);
        response.status(404).send({ error: "invalid coin" });
    }
});

coinRouter.get("/watchlist", async (request, response, error) => {
    try {
        // Gettings list of coins in watchlist database
        let coins = await CoinModel.find({});

        // Formatting array for use in api call
        coins = coins.map((coin) => coin.name);

        // Fetching the coins data from coingecko
        const coinsData = await coinGeckoService.getMultipleCoinsData(coins);

        return response.send(coinsData);
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "could not connect to api" });
    }
});

coinRouter.delete("/watchlist/:ID", async (request, response, error) => {
    try {
        const ID = request.params.ID;

        const deletedCoin = await CoinModel.findByIdAndRemove(ID);
        if (deletedCoin) return response.send(deletedCoin);

        return response.status(409).send({ error: "Coin not in database " });
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "could not connect to api" });
    }
});

module.exports = coinRouter;
