import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { UIContext } from "../../App";

const Main = ({ data }) => {
    return (
        <div className={styles.main}>
            <div className={styles.mainContent}>
                <Balance />
                <Prices data={data} />
            </div>
        </div>
    );
};

const Balance = () => {
    return (
        <header className={styles.balanceContainer}>
            <div className={styles.myBalanceText}>My Balance</div>
            <div className={styles.balance}>$0</div>
        </header>
    );
};

const Prices = ({ data }) => {
    // const { header } = useContext(UIContext);
    const [currentData, setCurrentData] = useState(data.watchlistData);
    return (
        <div className={styles.pricesContainer}>
            <header>
                <h1>Prices</h1>
                <div className={styles.buttons}>
                    <div
                        onClick={() => setCurrentData(data.watchlistData)}
                        className={styles.button}
                    >
                        Watchlist
                    </div>
                    <div
                        onClick={() => setCurrentData(data.trendingCoinsData)}
                        className={styles.button}
                    >
                        Trending
                    </div>
                </div>
            </header>
            <ul>
                {currentData.map((coin) => {
                    console.log(typeof coin.price_change_percentage_24h);
                    return (
                        <Link
                            className={styles.coin}
                            key={coin.id}
                            to={`/price/${coin.id}`}
                        >
                            <div className={styles.coinInfo}>
                                <div
                                    className={styles.image}
                                    style={{
                                        backgroundImage: `url(${coin.image})`,
                                        borderRadius: "50px",
                                    }}
                                ></div>
                            </div>
                            <div className={styles.coinPrice}>
                                $
                                {Math.round(coin.current_price * 10000) / 10000}
                            </div>
                            <div className={`${styles.coinPricePercentageChange} ${coin.price_change_percentage_24h > 0 ? styles.positive : styles.negative}`}>
                                {Math.round(
                                    coin.price_change_percentage_24h * 100
                                ) / 100}
                                %
                            </div>
                            <div className={styles.coinMarketCap}>
                                {coin.market_cap}
                            </div>
                            <div>Buy</div>
                            <div>STAR</div>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};
export default Main;
