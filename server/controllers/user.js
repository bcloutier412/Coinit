const userRouter = require("express").Router();
const coinGeckoService = require("../services/coinGeckoService");
const CoinModel = require("../models/coin");

/*
 * Route for adding a coin to user's watchlist
 * Checks if coin is valid and not already in database
 * Adds new coin to database
 */
userRouter.post("/watchlist/:coinID", async (request, response, error) => {
    try {
        // Fetching Trending Coin data
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

/*
 * Route for getting user's watchlist
 * Fetches coins from database and formats array for use in API call
 * Fetches data for each coin from CoinGecko API
 */
userRouter.get("/watchlist", async (request, response, error) => {
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

/*
 * Route for removing a coin from user's watchlist
 * Deletes coin from database if it exists
 */
userRouter.delete("/watchlist/:ID", async (request, response, error) => {
    try {
        // Fetching Trending Coin data
        const ID = request.params.ID;

        // Checking to see if the coin is in the database. If it is delete it from the database
        const deletedCoin = await CoinModel.findByIdAndRemove(ID);
        if (deletedCoin) return response.send(deletedCoin);

        return response.status(409).send({ error: "Coin not in database " });
    } catch (error) {
        console.log(error);
        return response.status(404).send({ error: "could not connect to api" });
    }
});

module.exports = userRouter 