import styles from "./NavHeader.module.css";
import React, { useContext, useEffect, useState } from "react";
import { UIContext } from "../../App";
import { NavLinks } from "../Nav/Nav";
/*
 * NavHeader component
 */
const NavHeader = () => {
    // Get the header text from the UI context
    const { header } = useContext(UIContext);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
        })
        return () => window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
        })
    }, [])

    return (
        <div className={styles.NavHeader}>
            <header>{header.headerText}</header>
            {windowWidth > 770 ? <NavHeaderLinks /> : <NavLinks />}
        </div>
    );
};

/*
 * NavHeaderLinks component
 */
export const NavHeaderLinks = () => {
    return (
        <div className={styles.NavHeaderLinks}>
            {/*<div className={styles.HeaderTransactButtons}>
                <div className={`${styles.buy} ${styles.TransactionButton}`}>
                    Buy & Sell
                </div>
                <div className={`${styles.send} ${styles.TransactionButton}`}>
                    Send & Receive
                </div>
    </div>*/}
            <div className={styles.HeaderMiniButtons}>
                <div className={styles.MiniButton}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bell"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                </div>
                <div className={styles.MiniButton}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-menu-down"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.646.146a.5.5 0 0 1 .708 0L10.207 2H14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.793L7.646.146zM1 7v3h14V7H1zm14-1V4a1 1 0 0 0-1-1h-3.793a1 1 0 0 1-.707-.293L8 1.207l-1.5 1.5A1 1 0 0 1 5.793 3H2a1 1 0 0 0-1 1v2h14zm0 5H1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zM2 4.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </div>
                <div>
                    <div className={styles.verticalLine}></div>
                </div>
                <div
                    className={styles.MiniButton}
                    style={{ backgroundColor: "white" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="rgb(216, 218, 221)"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default NavHeader;
