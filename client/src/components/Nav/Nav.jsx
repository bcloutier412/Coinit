import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import React from "react";
import links from "./links";
import { useContext, useEffect, useState } from "react";
import { UIContext } from "../../App";
import { NavHeaderLinks } from '../NavHeader/NavHeader'

/*
    Sidebar component
*/
const Nav = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
            console.log(window.innerWidth)
        })
        return () => window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
        })
    })
    return (
        <nav className={styles.nav}>
            <CoinBaseLogo />
            {windowWidth > 770 ? <NavLinks/> : <NavHeaderLinks />}
        </nav>
    );
};

/*
    Coinbase logo
*/
const CoinBaseLogo = () => {
    
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate('/home')
    }
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Coinbase logo"
            viewBox="0 0 48 48"
            width="32"
            height="32"
            className={styles.svg}
            onClick={handleClick}
        >
            <title>Coinbase logo</title>
            <path
                d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z"
                fill="#0052FF"
            ></path>
        </svg>
    );
};

export const NavLinks = () => {
    const { header } = useContext(UIContext)
    const location = useLocation();

    /*
     * Function will check if the link is the same as the current path, 
     * If it is it will give the button styling.
     */   
    const checkCurrentLocation = (pathName) => {
        if (pathName === location.pathname) {
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
                            onClick={() => header.setHeaderText(link.text)}
                        >
                            <span>{link.image}</span>
                            <span className={styles.linkText}>{link.text}</span>
                        </Link>
                        )
                    })
                }
            </div>
        </React.Fragment>
    );
};

export default Nav;
