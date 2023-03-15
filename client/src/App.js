import styles from "./App.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import NavHeader from "./components/NavHeader/NavHeader";
import { useState, useEffect } from "react";
import React from "react";
import { paths }  from "./components/Nav/links";

// Create a context for the UI state
export const UIContext = React.createContext();

function App() {
    console.log('rendering')
     // Get the current path from the URL and use it to set the initial currentPath state
    const location = useLocation().pathname.split("/", 2)[1];

    // Initialize state for theme and header text
    const [theme, setTheme] = useState("light");
    const [headerText, setHeaderText] = useState(paths[location].headerText);

    // Combine the theme and header state into a context object
    const contextValue = {
        theme: { theme, setTheme },
        header: { headerText, setHeaderText },
    };

    // Navigate to /home if the user goes to the root route
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
