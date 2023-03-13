const axios = require("axios");
const coinGeckoAPI = "https://api.coingecko.com/api/v3";
const HttpsProxyAgent = require("https-proxy-agent");
const config = require('../utils/config')

const proxy = config.PROXY;

const getCoinData = (coinID) => {
    const url =
        coinGeckoAPI +
        `/coins/${coinID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;

    // Fetching Coin data
    const response = axios.get(url, {
        proxy: false,
        httpsAgent: new HttpsProxyAgent.HttpsProxyAgent(proxy),
    });
    return response.then((response) => response.data);
};

const getChartData = (coinID) => {
    const url =
        coinGeckoAPI +
        `/coins/${coinID}/market_chart?vs_currency=usd&days=1&interval=5m`;

    // Fetching chart data for a coin
    const response = axios.get(url, {
        proxy: false,
        httpsAgent: new HttpsProxyAgent.HttpsProxyAgent(proxy),
    });
    return response.then((response) => response.data);
};

const getTrendingCoins = async () => {
    const url = coinGeckoAPI + "/search/trending";

    // Fetching all the trending coins converting it to an array of their ids
    let trendingCoinsIDs = await axios.get(url, {
        proxy: false,
        httpsAgent: new HttpsProxyAgent.HttpsProxyAgent(proxy),
    });
    trendingCoinsIDs = trendingCoinsIDs.data.coins.map((coin) => {
        return coin.item.id;
    });

    // Fetching all the market data for the trending coins using the coin ids
    let trendingCoinsData = getMultipleCoinsData(trendingCoinsIDs);

    return trendingCoinsData;
};

const getTopCoins = async () => {
    const url =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    // Fetching the data from coinGeckoApi
    let getTopCoinsData = await axios.get(url, {
        proxy: false,
        httpsAgent: new HttpsProxyAgent.HttpsProxyAgent(proxy),
    });

    // Format response
    getTopCoinsData = getTopCoinsData.data.map((coin) => {
        return {
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            market_cap: coin.market_cap,
            id: coin.id,
        };
    });

    // Return formatted data
    return getTopCoinsData;
};

const getMultipleCoinsData = async (coinsArray) => {
    const coinIDsString = coinsArray.join("%2C");

    const url = 
    coinGeckoAPI +
        `/coins/markets?vs_currency=usd&ids=${coinIDsString}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=24h`

    let coinsDataArray = await axios.get(url, {
        proxy: false,
        httpsAgent: new HttpsProxyAgent.HttpsProxyAgent(proxy),
    });

    coinsDataArray = coinsDataArray.data.map((coin) => {
        return {
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            market_cap: coin.market_cap,
            id: coin.id,
        };
    });

    return coinsDataArray;
};
module.exports = {
    getTrendingCoins,
    getChartData,
    getCoinData,
    getMultipleCoinsData,
    getTopCoins,
};
