import styles from './Price.module.css'
import { useLoaderData } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { TailSpin } from "react-loading-icons";
import axios from 'axios';

const Price = () => {

    // Getting param from the URL
    const coinID = useLoaderData()

    // State for loading api data
    const [apiData, setApiData] = useState(null);

    // Fetch the coin api data when mounting
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await Promise.all([
                    
                ]);

                setApiData(response)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [coinID])

    return (
        <React.Fragment>
            {apiData ? (
                <div>
                prices
                </div>
            ) : (
                <TailSpin
                    className={styles.loader}
                    stroke="#0052ff"
                    speed={0.75}
                />
            )}
        </React.Fragment>
    )
}

export default Price