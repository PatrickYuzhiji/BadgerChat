// Upon receiving a successful 200 response for register or login (and alerting the user), 
// the user should be automatically navigated back to the home page using react-router's 
// useNavigate hook. Furthermore, 
// 



import { useState, useContext } from 'react';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";



export default function BadgerRegister() {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const checkValidity = () => {
        if (!/^\d{7}$/.test(pin)) {
            alert("Your pin must be a 7-digit number!");
            return false;
        };
        if (pin !== confirmation) {
            alert("Your pins do not match!");
            return false;
        }
        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return false;
        }
        return true;
    }


    function handleRegister (e) {
        e.preventDefault();
        if (!checkValidity()) {
            return;
        }
        // After receiving a response from the API, you should handle the following cases...
        // If the username is already taken, display an alert saying "That username has already been taken!"
        // If the registration was successful, alert the user that the registration was successful.
        fetch('https://cs571.org/rest/f24/hw6/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "X-CS571-ID": "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        }).then(response => {
            if (response.status === 409) {
                alert("That username has already been taken!");
            } else if (response.status === 200) {
                // You may use loginStatus to track whether the user is logged in, their username, 
                // or whatever other data you find relevant. Be sure to persist all changes to sessionStorage
                alert("Registration successful!");
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('loginStatus', 'true');
                setLoginStatus(true);
                navigate('/');
            }
        });
    }

    return (
    <>
        <h1>Register</h1>
        <Form onSubmit={handleRegister}> 
            <Form.Label htmlFor="username"> Username </Form.Label>
            <Form.Control type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <br />
            <Form.Label htmlFor="pin"> Password </Form.Label>
            <Form.Control type="password" id="pin" name="pin" value={pin} onChange={(e) => setPin(e.target.value)} required/>
            <br />
            <Form.Label htmlFor="confirmation"> Reapeat Password </Form.Label>
            <Form.Control type="password" id="confirmation" name="confirmation" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} required/>
            <br />
            <Button type="submit"> Register </Button>
        </Form>
    </>);   
    }
