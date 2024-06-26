import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("https://designstudio-1.onrender.com/api/v1/staff/staff-auth");
            console.log("API Response:", res.data);
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet/> : <Spinner/>;
}

