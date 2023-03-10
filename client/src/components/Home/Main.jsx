import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
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
    const navigate = useNavigate();

    const [currentData, setCurrentData] = useState(data);
    const [currentTab, setCurrentTab] = useState('watchlistData')
    const handleDelete = (coinID) => {
        const newData = {
            topCoinsData: currentData['topCoinsData'],
            watchlistData: currentData['watchlistData'].filter(coin => {
                return coin.id !== coinID
            })
        }

        setCurrentData(newData)
    }
    return (
        <div className={styles.pricesContainer}>
            {/*
             * Header of the Cointainer
             * EX: Prices      <Watchlist>  <Top assets>
             */}
            <header>
                <h1>Prices</h1>
                <div className={styles.buttons}>
                    <div
                        onClick={() => setCurrentTab('watchlistData')}
                        className={styles.button}
                    >
                        Watchlist
                    </div>
                    <div
                        onClick={() => setCurrentTab('topCoinsData')}
                        className={styles.button}
                    >
                        Top assets
                    </div>
                </div>
            </header>

            {/*
             * Displays all of the coins
             * EX: [bitcoin, price, mktcp]
             *     [Ethereum, price, mktcp]
             *     [litecoin, price, mktcp]
             *     ...
             */}
            <div>
                {currentData[currentTab].map((coin) => {
                    return (
                        <div
                            className={styles.coin}
                            key={coin.id}
                            onClick={() => {
                                navigate(`/price/${coin.id}`);
                            }}
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
                                    <div className={styles.bold}>
                                        {coin.name}
                                    </div>
                                    <div>{coin.symbol.toUpperCase()}</div>
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
                            <div style={{ textAlign: "center" }}>
                                <StarButton coinID={coin.id} handleDelete={handleDelete}/>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const formatMarketCap = (market_cap) => {
    if (market_cap >= 1000000000) {
        let string_market_cap = market_cap.toString();
        string_market_cap = string_market_cap.slice(
            0,
            string_market_cap.length - 8
        );
        return (
            string_market_cap.slice(0, string_market_cap.length - 1) +
            "." +
            string_market_cap.slice(
                string_market_cap.length - 1,
                string_market_cap.length
            ) +
            "B"
        );
    } else if (market_cap >= 1000000) {
        let string_market_cap = market_cap.toString();
        string_market_cap = string_market_cap.slice(
            0,
            string_market_cap.length - 5
        );
        return (
            string_market_cap.slice(0, string_market_cap.length - 1) +
            "." +
            string_market_cap.slice(
                string_market_cap.length - 1,
                string_market_cap.length
            ) +
            "M"
        );
    } else if (market_cap >= 1000) {
        let string_market_cap = market_cap.toString();
        string_market_cap = string_market_cap.slice(
            0,
            string_market_cap.length - 2
        );
        return (
            string_market_cap.slice(0, string_market_cap.length - 1) +
            "." +
            string_market_cap.slice(
                string_market_cap.length - 1,
                string_market_cap.length
            ) +
            "K"
        );
    }
};

const StarButton = ({ coinID, handleDelete }) => {
    const containerRef = useRef(null);

    const handleClick = (e) => {
        e.stopPropagation();
        containerRef.current.style.backgroundColor = "rgb(240, 243, 250)";
        axios
            .delete(`http://localhost:3001/api/user/watchlist/${coinID}`)
            .then(() => {handleDelete(coinID)});
    };

    return (
        <div
            className={styles.starButton}
            ref={containerRef}
            onClick={handleClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#0052ff"
                className={`${styles.bi} ${styles.bi_star_fill}`}
                viewBox="0 0 16 16"
                onClick={handleClick}
            >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
        </div>
    );
};
export default Main;
