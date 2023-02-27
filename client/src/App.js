import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import NavHeader from "./components/NavHeader/NavHeader";

function App() {
    return (
        <div className={styles.App}>
            <div className={styles.body}>
                <Nav />
                <main className={styles.main}>
                    <NavHeader />
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
export default App;
