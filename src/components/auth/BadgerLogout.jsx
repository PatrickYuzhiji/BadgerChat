
import { useEffect, useContext } from 'react';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    useEffect(() => {
        fetch('https://cs571.org/rest/f24/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // json.success should be true
            // You should also clear the sessionStorage
            sessionStorage.clear();
            setLoginStatus(false);
            alert("You have been successfully logged out.");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
