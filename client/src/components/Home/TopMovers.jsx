import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../App";

const TopMovers = ({ data }) => {
    const navigate = useNavigate();
    const { header } = useContext(UIContext);
    return (
        <div className={styles.topMovers}>
            <div className={styles.topMoversContent}>
                <div style={{ width: "380px" }}>
                    <header className={styles.topMoversHeader}>
                        Top Movers
                    </header>
                    <div className={styles.topMoversList}>
                        {data.trendingCoins.map((coin) => {
                            return (
                                <div className={styles.coin} key={coin.id} onClick={() => {
                                    navigate(`/price/${coin.id}`);
                                    header.setHeaderText(coin.name)
                                }}>
                                    <div
                                        className={styles.coinInfo}
                                        style={{ width: "50%" }}
                                    >
                                        <div
                                            className={styles.image}
                                            style={{
                                                backgroundImage: `url(${coin.image})`,
                                                borderRadius: "50px",
                                            }}
                                        ></div>
                                        <div>
                                            <div className={styles.bold}>{coin.name}</div>
                                            <div>
                                                {coin.symbol.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <div>
                                            $
                                            {Math.round(
                                                coin.current_price * 10000
                                            ) / 10000}
                                        </div>
                                        <div
                                            className={`${
                                                styles.coinPricePercentageChange
                                            } ${
                                                coin.price_change_percentage_24h >
                                                0
                                                    ? styles.positive
                                                    : styles.negative
                                            }`}
                                        >
                                            {Math.round(
                                                coin.price_change_percentage_24h *
                                                    100
                                            ) / 100}
                                            %
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopMovers;
