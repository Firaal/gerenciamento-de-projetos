import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Outlet } from "react-router";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/hello")
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <h1>{message}</h1>
            <Outlet />
        </>
    );
}

export default App;
