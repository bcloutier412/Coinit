const axios = require("axios");
const coinGeckoAPI = "https://api.coingecko.com/api/v3";

const getCoinData = (coinID) => {
    // Fetching Coin data
    const response = axios.get(
        coinGeckoAPI +
            `/coins/${coinID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
    );
    return response.then((response) => response.data);
};

const getChartData = (coinID) => {
    // Fetching chart data for a coin
    const response = axios.get(
        coinGeckoAPI +
            `/coins/${coinID}/market_chart?vs_currency=usd&days=1&interval=5m`
    );
    return response.then((response) => response.data);
};

const getTrendingCoins = async () => {
    // Fetching all the trending coins converting it to an array of their ids
    let trendingCoinsIDs = await axios.get(coinGeckoAPI + "/search/trending");
    trendingCoinsIDs = trendingCoinsIDs.data.coins.map((coin) => {
        return coin.item.id;
    });

    // Fetching all the market data for the trending coins using the coin ids
    let trendingCoinsData = getMultipleCoinsData(trendingCoinsIDs);

    return trendingCoinsData;
};

const getTopCoins = async () => {
    // Fetching the data from coinGeckoApi
    let getTopCoinsData = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    
    // Format response
    getTopCoinsData = getTopCoinsData.data.map((coin) => {
        return {
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            market_cap: coin.market_cap,
            id: coin.id
        };
    });

    // Return formatted data
    return getTopCoinsData;
}

const getMultipleCoinsData = async (coinsArray) => {
    const coinIDsString = coinsArray.join("%2C");

    let coinsDataArray = await axios.get(
        coinGeckoAPI +
            `/coins/markets?vs_currency=usd&ids=${coinIDsString}&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=24h`
    );

    coinsDataArray = coinsDataArray.data.map((coin) => {
        return {
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            market_cap: coin.market_cap,
            id: coin.id
        };
    });

    return coinsDataArray;
};
module.exports = {
    getTrendingCoins,
    getChartData,
    getCoinData,
    getMultipleCoinsData,
    getTopCoins
};
