import styles from "./App.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
// import NavHeader from "./components/NavHeader/NavHeader";
import { useState, useEffect } from "react";
import React from "react";
import { paths }  from "./components/Nav/links";
import NavHeader from './components/NavHeader/NavHeader'

export const UIContext = React.createContext(); 

function App() {
    const location = useLocation().pathname.split("/", 2)[1];
    const [theme, setTheme] = useState("light");
    const [headerText, setHeaderText] = useState(paths[location].headerText);
    const contextValue = {
        theme: { theme, setTheme },
        header: { headerText, setHeaderText },
    };
    const navigate = useNavigate()
    useEffect(() => {
        if (!location) navigate('/home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={styles.App}>
            <UIContext.Provider value={contextValue}>
                <div className={styles.body}>
                    <Nav />
                    <main className={styles.main}>
                        <NavHeader />
                        <Outlet />
                    </main>
                </div>
            </UIContext.Provider>
        </div>
    );
}

export default App;
