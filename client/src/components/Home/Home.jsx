import { Link } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../App";
import styles from "./Home.module.css";
import React from "react";

// <Link to="../price/bitcoin" onClick={() => header.setHeaderText('Bitcoin')}>Bitcoin</Link>

/*
 * Home component that appears in the middle of the page and
 * shows balance and watchlist
 */
const Home = () => {
    // Get the header state from the UI context
    const { header } = useContext(UIContext);

    return (
        <React.Fragment>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.main}>
                        <div className={styles.stuff}>hi</div>
                    </div>
                    <div className={styles.topMoversWrapper}>
                        <div className={styles.moreStuff}>Morestuff</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
