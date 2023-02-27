import React from "react";
import styles from './Nav.module.css'
import { useLocation, Link } from "react-router-dom";

const NavLinks = () => {
    const links = [
        {
            path: "home",
            text: "Home"
        },
        // {
        //     path: "assets",
        //     text: "My assets"
        // },
        // {
        //     path: "advanced-trade",
        //     text: "Trade"
        // },
        // {
        //     path: "earn",
        //     text: "Earn"
        // },
        // {
        //     path: "learning-rewards",
        //     text: "Learning rewards"
        // }
    ]
    // Current Route
    const location = useLocation().pathname.split("/", 2)[1];
    const checkCurrentLocation = (pathName) => {
        if (pathName === location) {
            return styles.active;
        }
        return null;
    };

    return (
        <React.Fragment>
            <div className={styles.navLinks}>
                {
                    links.map(link => {
                        return (
                            <Link
                            to={link.path}
                            className={`${styles.navLink} ${checkCurrentLocation(
                                link.path
                            )}`}
                            key={link.path}
                        >
                            <span>|   |</span>
                            <span>{link.text}</span>
                        </Link>
                        )
                    })
                }
            </div>
        </React.Fragment>
    );
};

export default NavLinks