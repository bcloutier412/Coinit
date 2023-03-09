// import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import TopMovers from "./TopMovers";
import Main from "./Main";
import { TailSpin } from "react-loading-icons";
import axios from "axios";
// <Link to="../price/bitcoin" onClick={() => header.setHeaderText('Bitcoin')}>Bitcoin</Link>

/*
 * Home component that appears in the middle of the page and
 * shows balance and watchlist
 */
const Home = () => {
    const [apiData, setApiData] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Promise.all([
                    axios.get("http://localhost:3001/api/user/watchlist"),
                    axios.get('http://localhost:3001/api/coin/topCoins'),
                    axios.get('http://localhost:3001/api/coin/trendingCoins')
                ]);

                setApiData(response)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);
    return (
        <React.Fragment>
            {apiData ? (
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        {/* Main content showing balance and crypto tickers */}
                        <Main data={{ watchlistData: apiData[0].data, topCoinsData: apiData[1].data}}/>

                        {/* Top movers widget that goes on the right side of screen */}
                        <TopMovers data={{ trendingCoins: apiData[2].data }}/>
                    </div>
                </div>
            ) : (
                <TailSpin
                    className={styles.loader}
                    stroke="#0052ff"
                    speed={0.75}
                />
            )}
        </React.Fragment>
    );
};

export default Home;
