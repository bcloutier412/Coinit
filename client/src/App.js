import styles from "./App.module.css";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import NavHeader from "./components/NavHeader/NavHeader";
import { useState } from "react";
import React from "react";
import links from "./components/Nav/links";

export const UIContext = React.createContext();

function App() {
    const location = useLocation().pathname.split("/", 2)[1];
    let currentPathText;
    if (location === 'price'){
        currentPathText = {text:''}
    }
    else if (!currentPathText) {
        currentPathText = {text:'Home'}
    } else {
        currentPathText = links.find(element => element.path === location);
    }
    const [theme, setTheme] = useState("light");
    const [headerText, setHeaderText] = useState(currentPathText.text);
    const contextValue = {
        theme: { theme, setTheme },
        header: { headerText, setHeaderText },
    };

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
