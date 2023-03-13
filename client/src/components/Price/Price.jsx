import styles from './Price.module.css'
import { useLoaderData } from 'react-router-dom';

const Price = () => {
    const coinID = useLoaderData()
    console.log(coinID)

    return (
        <div>Price</div>
    )
}

export default Price