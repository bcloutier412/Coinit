import styles from "./Price.module.css";
import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { UIContext } from "../../App";
import { TailSpin } from "react-loading-icons";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

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
                console.log(response[0])
                header.setHeaderText(response[0].data.name)
                setApiData(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        const interval = setInterval(fetchData, 60000)

        return () => {clearInterval(interval)}
    }, [coinID]);

    return (
        <React.Fragment>
            {apiData ? (
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <Chart apiData={apiData} />
                        <Stats />
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
                <div className={styles.priceText}>${new Intl.NumberFormat('en-US').format(currentPrice)}</div>
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

const Stats = () => {
    return (
        <div className={`${styles.infoContainer} ${styles.bgWhite}`}>
            <header>Market stats</header>
            <div className={styles.statsContainer}>
                <div>Market cap</div>
                <div>Volume</div>
                <div>Circulating supply</div>
                <div>All time high</div>
                <div>Sentimentvotesup</div>
            </div>
        </div>
    )
}

const Overview = () => {
    return (
        <div className={`${styles.infoContainer} ${styles.bgWhite}`}>
            <header>Overview</header>
        </div>
    )
}
export default Price;
