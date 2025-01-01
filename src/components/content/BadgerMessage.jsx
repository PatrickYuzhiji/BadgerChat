import React from "react"
import { Card, Button } from "react-bootstrap";

    // Add the option for a user to delete their own posts. 
    // A red "Delete" button should be shown for each post 
    // that a user owns (but not for others' posts).

function BadgerMessage(props) {

    const currentUser=sessionStorage.getItem('username')

    const dt = new Date(props.created);

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {currentUser === props.poster && 
        <Button onClick={() => props.handleDelete(props.id)} variant="danger">Delete</Button>}
    </Card>
}


export default BadgerMessage;