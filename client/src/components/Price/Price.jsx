import styles from './Price.module.css'
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Price = () => {

    // Getting param from the URL
    const coinID = useLoaderData()

    const [apiData, setApiData] = useState(null);


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
    }, [coinID])

    return (
        <div>Price</div>
    )
}

export default Price