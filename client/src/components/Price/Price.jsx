import styles from "./Price.module.css";
import { useLoaderData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loading-icons";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const Price = () => {
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

                setApiData(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [coinID]);

    return (
        <React.Fragment>
            {apiData ? (
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <Chart apiData={apiData} />
                        {/* <Stats /> */}
                        {/* <Overview /> */}
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
    const chartdata = {
        series: [
            {
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
                    enabled: false
                },
                background: 'white',
                fontFamily: "Segoe UI",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                ],
            },
        },
    };

    return (
        <div className={`${styles.chartContainer} ${styles.bgWhite}`}>
            <div className={styles.price}>$2000</div>
            <ReactApexChart
                options={chartdata.options}
                series={chartdata.series}
                type="line"
                height={350}
            />
        </div>
    );
};
export default Price;
