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
    console.log(data);
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
                    return (
                        <Link className={styles.coin} key={coin.id} to={`/price/${coin.id}`}>
                            <div className={styles.coinInfo}>
                                <img src={coin.image} width="32px" height="32px"/>
                            </div>
                            <div className={styles.coinPrice}>{coin.current_price}</div>
                            <div className={styles.coinPricePercentageChange}>{coin.price_change_percentage_24h}%</div>
                            <div className={styles.coinMarketCap}>{coin.market_cap}</div>
                            <button>Buy</button>
                            <div>STAR</div>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};
export default Main;
