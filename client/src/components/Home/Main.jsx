import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { UIContext } from "../../App";

const Main = ({ data }) => {
    return (
        <div className={styles.main}>
            <div className={styles.mainContent}>
                <Balance />
                <Prices data={data}/>
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

const Prices = ({ data }) => {
    // const { header } = useContext(UIContext);
    const [currentData, setCurrentData] = useState(data.watchlistData)
    return (
        <div className={styles.pricesContainer}>
            <header>
                <h1>Prices</h1>
                <div className={styles.buttons}>
                    <div className={styles.button}>Watchlist</div>
                    <div className={styles.button}>Trending</div>
                </div>
            </header>
            <ul>
                {currentData.map(coin => {
                    return (
                        <Link key={coin.id} to={`/price/${coin.id}`}>{coin.name}</Link>
                    )
                })}
            </ul>
        </div>
    )
}
export default Main;
