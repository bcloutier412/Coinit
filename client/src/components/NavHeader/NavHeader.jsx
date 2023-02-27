import styles from "./NavHeader.module.css";
import { useLocation } from "react-router-dom";
import React from "react";

const NavHeader = () => {
    return (
        <div className={styles.NavHeader}>
            <header>Home</header>
            <NavHeaderLinks />
        </div>
    );
};

const NavHeaderLinks = () => {
    return (
        <div className={styles.NavHeaderLinks}>
            <div className={styles.HeaderTransactButtons}>
                <div className={`${styles.buy} ${styles.TransactionButton}`}>Buy & Sell</div>
                <div className={`${styles.send} ${styles.TransactionButton}`}>Send & Receive</div>
            </div>
            <div className={styles.HeaderMiniButtons}>
                <div>O</div>
                <div>| |</div>
                <div>|</div>
                <div>Profile</div>
            </div>
        </div>
    );
};

export default NavHeader;
