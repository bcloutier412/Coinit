// import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import React from "react";
import TopMovers from "./TopMovers";
import Main from "./Main";
import { TailSpin } from "react-loading-icons";
import { useState } from "react";

// <Link to="../price/bitcoin" onClick={() => header.setHeaderText('Bitcoin')}>Bitcoin</Link>

/*
 * Home component that appears in the middle of the page and
 * shows balance and watchlist
 */
const Home = () => {
    const [loaded, setLoaded] = useState(false);
    return (
        <React.Fragment>
            {loaded ? 
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Main content showing balance and crypto tickers */}
                    <Main />

                    {/* Top movers widget that goes on the right side of screen */}
                    <TopMovers />
                </div>
            </div> : <TailSpin className={styles.loader} stroke="#0052ff" speed={.75}/>}
        </React.Fragment>
    );
};

export default Home;
