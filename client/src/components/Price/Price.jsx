import styles from "./Price.module.css";
import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { UIContext } from "../../App";
import { TailSpin } from "react-loading-icons";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { formatMarketCap } from "../../utils/formattingFunctions";

const Price = () => {
    const { header } = useContext(UIContext);
    // Getting param from the URL
    const coinID = useLoaderData();

    // State for loading api data
    const [apiData, setApiData] = useState(null);

    // Fetch the coin api data when mounting
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Promise.all([
                    axios.get(
                        `http://localhost:3001/api/coin/coinData/${coinID}`
                    ),
                    axios.get(
                        `http://localhost:3001/api/coin/chartData/${coinID}`
                    ),
                ]);
                if (header.headerText !== response[0].data.name) {
                    header.setHeaderText(response[0].data.name);
                }
                setApiData(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        const interval = setInterval(fetchData, 60000);

        return () => {
            clearInterval(interval);
        };
    }, [coinID, header]);

    return (
        <React.Fragment>
            {apiData ? (
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <Chart apiData={apiData} />
                        <Stats apiData={apiData} />
                        <Overview />
                        {/* <News /> */}
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

const Chart = ({ apiData }) => {
    const currentPrice = apiData[0].data.market_data.current_price.usd;
    const marketData = apiData[1].data.prices;

    const chartdata = {
        series: [
            {
                name: "$",
                data: marketData.map((dataPoint) => {
                    return Math.round(dataPoint[1] * 100) / 100;
                }),
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
                background: "white",
                fontFamily: "Segoe UI",
            },
            tooltip: {
                x: {
                    show: true,
                    format: "H:mm",
                    formatter: undefined,
                },
            },
            colors: ["#3366FF"],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
                width: 2,
            },
            xaxis: {
                categories: marketData.map((dataPoint) => {
                    return dataPoint[0];
                }),
                labels: {
                    datetimeUTC: true,
                    datetimeFormatter: {
                        year: "yyyy",
                        month: "MMM 'yy",
                        day: "dd MMM",
                        hour: "H:mm",
                    },
                    style: {
                        fontFamily: "Segoe UI",
                        fontWeight: 500,
                    },
                },
                type: "datetime",
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
        },
    };

    return (
        <div className={`${styles.chartContainer} ${styles.bgWhite}`}>
            <header className={styles.header}>
                <div className={styles.priceText}>
                    ${new Intl.NumberFormat("en-US").format(currentPrice)}
                </div>
            </header>
            <ReactApexChart
                options={chartdata.options}
                series={chartdata.series}
                type="line"
                height={350}
            />
        </div>
    );
};

const Stats = ({ apiData }) => {
    const coinData = apiData[0].data;
    const market_data = coinData.market_data;
    console.log(coinData);
    return (
        <div className={`${styles.infoContainer} ${styles.bgWhite}`}>
            <header>Market stats</header>
            <div className={styles.statsContainer}>
                <div>
                    <h1>Market cap</h1>$
                    {formatMarketCap(market_data.market_cap.usd)}
                </div>
                <div>
                    <h1>Circulating supply</h1>
                    {formatMarketCap(market_data.circulating_supply)}
                </div>
                <div>
                    <h1>Total supply</h1>
                    {formatMarketCap(market_data.total_supply)}
                </div>
                <div>
                    <h1>All time high</h1>$
                    {formatMarketCap(market_data.ath.usd)}
                </div>
                <div>
                    <h1>Market Sentiment</h1>
                    <div className={styles.barWrapper}>
                        <span style={{ color: "green" }}>
                            {Math.ceil(coinData.sentiment_votes_up_percentage)}% buy
                        </span>
                        <div className={styles.barContainer}>
                            {[...Array(Math.floor(coinData.sentiment_votes_up_percentage / 5))].map((x, i) => {
                                return (<div key={i} style={{ backgroundColor: 'green'}}></div>)
                            })}
                            {[...Array(Math.ceil(coinData.sentiment_votes_down_percentage / 5))].map((x, i) => {
                                return (<div key={i} style={{ backgroundColor: 'grey'}}></div>)
                            })}
                        </div>
                        <span style={{ color: 'grey'}}>{Math.floor(coinData.sentiment_votes_down_percentage)}% sell</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Overview = () => {
    return (
        <div className={`${styles.infoContainer} ${styles.bgWhite}`}>
            <header>Overview</header>
        </div>
    );
};
export default Price;
