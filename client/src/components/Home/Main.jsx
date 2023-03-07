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
            <div>
                {currentData.map((coin) => {
                    // console.log(typeof coin.price_change_percentage_24h);
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
                                <div>
                                    <div>
                                    {coin.name}
                                    </div>
                                    <div>
                                    {coin.symbol.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.coinPrice}>
                                $
                                {Math.round(coin.current_price * 10000) / 10000}
                            </div>
                            <div
                                className={`${
                                    styles.coinPricePercentageChange
                                } ${
                                    coin.price_change_percentage_24h > 0
                                        ? styles.positive
                                        : styles.negative
                                }`}
                            >
                                {Math.round(
                                    coin.price_change_percentage_24h * 100
                                ) / 100}
                                %
                            </div>
                            <div className={styles.coinMarketCap}>
                                {formatMarketCap(coin.market_cap)}
                            </div>
                            <div style={{ textAlign: "center" }}><StarButton/></div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

const formatMarketCap = (market_cap) => {
    if (market_cap >= 1000000000) {
        let string_market_cap = market_cap.toString();
        string_market_cap = string_market_cap.slice(0, string_market_cap.length - 8);
        return string_market_cap.slice(0, string_market_cap.length - 1) + '.' + string_market_cap.slice(string_market_cap.length - 1, string_market_cap.length) + 'B';
    } else if (market_cap >= 1000000) {
        let string_market_cap = market_cap.toString();
        string_market_cap = string_market_cap.slice(0, string_market_cap.length - 5);
        return string_market_cap.slice(0, string_market_cap.length - 1) + '.' + string_market_cap.slice(string_market_cap.length - 1, string_market_cap.length) + 'M';
    } else if (market_cap >= 1000) {
        let string_market_cap = market_cap.toString();
        string_market_cap = string_market_cap.slice(0, string_market_cap.length - 2);
        return string_market_cap.slice(0, string_market_cap.length - 1) + '.' + string_market_cap.slice(string_market_cap.length - 1, string_market_cap.length) + 'K';
    }
};

const StarButton = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-star"
            viewBox="0 0 16 16"
        >
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
    );
};
export default Main;
