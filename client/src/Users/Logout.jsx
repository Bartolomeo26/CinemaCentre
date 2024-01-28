import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

export default function Logout()
{
    const { authState, setAuthState } = useContext(AuthContext);

    useEffect(() =>
    {
        localStorage.clear();
        setAuthState(!authState);

    })
    return <Navigate to="/" />
}