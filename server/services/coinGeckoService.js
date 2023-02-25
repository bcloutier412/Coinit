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
  trendingCoinsIDs = trendingCoinsIDs.join("%2C");

  // Fetching all the market data for the trending coins using the coin ids
  let trendingCoinsData = await axios.get(
    coinGeckoAPI +
      `/coins/markets?vs_currency=usd&ids=${trendingCoinsIDs}&order=volume_desc&page=1&sparkline=false&price_change_percentage=24h`
  );

  // Parsing coin data
  trendingCoinsData = trendingCoinsData.data.map((coin) => {
    return {
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
    };
  });

  return trendingCoinsData;
};
module.exports = {
  getTrendingCoins,
  getChartData,
  getCoinData,
};
