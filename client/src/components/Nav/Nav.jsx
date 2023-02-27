import { Link } from "react-router-dom";
import styles from "./Nav.module.css"
const Nav = () => {
    return (
        <nav className={styles.nav}>
            <Link to={`home`}>Home</Link>
        </nav>
    );
};

export default Nav