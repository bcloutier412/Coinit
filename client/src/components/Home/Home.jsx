// import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import React from "react";
import TopMovers from "./TopMovers";
import Main from "./Main";

// <Link to="../price/bitcoin" onClick={() => header.setHeaderText('Bitcoin')}>Bitcoin</Link>

/*
 * Home component that appears in the middle of the page and
 * shows balance and watchlist
 */
const Home = () => {

    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Main content showing balance and crypto tickers */}
                    <Main />

                    {/* Top movers widget that goes on the right side of screen */}
                    <TopMovers />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
