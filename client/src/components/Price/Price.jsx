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
                        `http://192.168.1.30:3001/api/coin/coinData/${coinID}`
                    ),
                    axios.get(
                        `http://192.168.1.30:3001/api/coin/chartData/${coinID}`
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
                        <Overview apiData={apiData} />
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
                            {Math.ceil(coinData.sentiment_votes_up_percentage)}%
                            buy
                        </span>
                        <div className={styles.barContainer}>
                            {[
                                ...Array(
                                    Math.floor(
                                        coinData.sentiment_votes_up_percentage /
                                            5
                                    )
                                ),
                            ].map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        style={{ backgroundColor: "green" }}
                                    ></div>
                                );
                            })}
                            {[
                                ...Array(
                                    Math.ceil(
                                        coinData.sentiment_votes_down_percentage /
                                            5
                                    )
                                ),
                            ].map((x, i) => {
                                return (
                                    <div
                                        key={i}
                                        style={{ backgroundColor: "grey" }}
                                    ></div>
                                );
                            })}
                        </div>
                        <span style={{ color: "grey" }}>
                            {Math.floor(
                                coinData.sentiment_votes_down_percentage
                            )}
                            % sell
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Overview = ({ apiData }) => {
    const overviewStr = apiData[0].data.description.en.split("\n\r\n");
    console.log(apiData);
    return (
        <div className={`${styles.infoContainer} ${styles.bgWhite}`}>
            <div className={styles.overviewWrapper}>
                <h1>Overview</h1>
                <p dangerouslySetInnerHTML={{ __html: overviewStr[0] }} />
                <br />
                <p dangerouslySetInnerHTML={{ __html: overviewStr[1] }} />
            </div>
            <div className={styles.resourcesWrapper}>
                <h2>Resources</h2>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-globe"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                    </svg>
                    <a href={apiData[0].data.links.homepage[0]}>
                        Official website
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Price;
