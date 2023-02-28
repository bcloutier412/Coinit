import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Home from "./components/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: () => {
            return null;
        },
        children: [
            {
              index: true, element: <Home />
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "assets",
                element: <div>assets</div>,
            },
            {
                path: "price/:id",
                element: <div>hello</div>,
            },
        ],
    },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
