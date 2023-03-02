import { Link } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../App";
import styles from "./Home.module.css";
import React from "react";

// <Link to="../price/bitcoin" onClick={() => header.setHeaderText('Bitcoin')}>Bitcoin</Link>
const Home = () => {
    const { header } = useContext(UIContext);
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.main}>hello</div>
            </div>
        </React.Fragment>
    );
};

export default Home;
