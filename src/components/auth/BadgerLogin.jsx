// In BadgerLogin.jsx, create a form using uncontrolled input components that 
// allows a user to enter their username and pin. Upon clicking a "Login" button, 
// a POST should be performed to authenticate the user via the API.
// The pin must be masked and NOT shown in plaintext.

// Before performing the API call you should handle the following cases...

// If the pin is not exactly 7-digits, inform the user "Your pin is a 7-digit number!". 
// You can use the regex /^\d{7}$/ to test this.
// If the user does not enter a username or pin, display an alert saying 
// "You must provide both a username and pin!"
// After receiving a response from the API, you should handle the following cases...

// If the username or pin is incorrect, display an alert saying "Incorrect username or pin!"
// If the login was successful, alert the user that the login was successful.

// Hint: Don't forget the fetch option to include credentials!

import React from 'react';
import { useState, useRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {
    const usernameRef = useRef();
    const pinRef = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const checkValidity = () => {
        if (!/^\d{7}$/.test(pinRef.current.value)) {
            alert("Your pin must be a 7-digit number!");
            return false;
        };
        if (!usernameRef.current.value || !pinRef.current.value) {
            alert("You must provide both a username and pin!");
            return false;
        }
        return true;
    }

    function handleLogin(e) {
        e.preventDefault();
        if (!checkValidity()) {
            return;
        }
        fetch('https://cs571.org/rest/f24/hw6/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "X-CS571-ID": "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                pin: pinRef.current.value   
            })
        }).then(res => {
            if (res.status === 401) {
                alert("Incorrect username or pin!");
            } else if (res.status === 200) {
                alert("Login successful!");
                sessionStorage.setItem('username', usernameRef.current.value);
                sessionStorage.setItem('loginStatus', 'true');
                setLoginStatus(true);
                navigate('/');
            }
        })
    }

    return <>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control id="username" type="text" ref={usernameRef} />
            <br />
            <Form.Label htmlFor="pin">Password</Form.Label>
            <Form.Control id="pin" type="password" ref={pinRef} />
            <br />
            <Button type="submit">Login</Button>
        </Form>
            
    </>
}
