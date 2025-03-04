import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import Home from "../components/pages/Home.jsx";
import Company from "../components/pages/Company.jsx";
import Contact from "../components/pages/Contact.jsx";
import NewProject from "../components/pages/NewProject.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "company",
                element: <Company />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "newproject",
                element: <NewProject />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
