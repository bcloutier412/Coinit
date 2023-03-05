import styles from "./Home.module.css";
// import { useContext } from "react";
// import { UIContext } from "../../App";

const Main = ({ data }) => {
    const watchlistData = data.watchlistData
    const trendingCoinsData = data.trendingCoinsData
    return (
        <div className={styles.main}>
            <div className={styles.mainContent}>
                <Balance />
                <Prices />
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
    )
}

const Prices = () => {
    // const { header } = useContext(UIContext);
    return (
        <div className={styles.pricesContainer}>
            <header>
                <h1>Prices</h1>
                <div className={styles.buttons}>
                    <div className={styles.button}>Watchlist</div>
                    <div className={styles.button}>Trending</div>
                </div>
            </header>
        </div>
    )
}
export default Main;
