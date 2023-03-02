import styles from "./App.module.css";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import NavHeader from "./components/NavHeader/NavHeader";
import { useState } from "react";
import React from "react";
import { paths }  from "./components/Nav/links";

// Create a new context to pass data to components
export const UIContext = React.createContext();

function App() {
     // Get the current path from the URL and use it to set the initial currentPath state
    const location = useLocation().pathname.split("/", 2)[1];

    const [theme, setTheme] = useState("light");
    const [headerText, setHeaderText] = useState(paths[location].headerText);
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
