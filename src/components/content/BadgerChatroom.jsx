// title, poster, content, and created {
//     "id": 5,
//     "poster": "d",
//     "title": "test",
//     "content": "1",
//     "chatroom": "Bascom Hill Hangout",
//     "created": "2024-10-23T03:25:31.000Z"
// }

import React, { useEffect, useState, useRef, useContext } from "react";
import { Container, Col, Row, Pagination } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { Form, Button } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

  const titleRef = useRef();
  const contentRef = useRef();

  const loadMessages = () => {
    fetch(
      `https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}&page=1`,
      {
        method: "GET",
        headers: {
          "X-CS571-ID":
            "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  };

  useEffect(loadMessages, [props]);

  // In BadgerChatroom.jsx, allow an authenticated user to create posts.
  // If the user is not yet authenticated, display a message that says "You must be logged in to post!" Otherwise, the user should be able to make a post through a form with a post title, post content, and a create post button. You may choose whether you want to use controlled or uncontrolled input components.

  // Before performing the API call you should handle the following cases...

  // If the user does not enter a title or content, display an alert saying
  // "You must provide both a title and content!"
  // After performing the API call you should alert the user that they have
  // "Successfully posted!" and you should reload the latest messages.

  function varifyPost(title, content) {
    if (title === "" || content === "") {
      alert("You must provide both a title and content!");
      return false;
    }
    return true;
  }

  function handlePost(e) {
    e.preventDefault();
    if (!varifyPost(titleRef.current.value, contentRef.current.value)) {
      return;
    }
    fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CS571-ID":
          "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        content: contentRef.current.value,
      }),
    }).then((res) => {
      if (res.status === 200) {
        alert("Successfully posted!");
        loadMessages();
      }
    });
  }
  // After performing the API call you should alert the user that
  // they have "Successfully deleted the post!" and you should reload the latest messages.
  // This likely will require the child component BadgerMessage.jsx
  // to talk back to its parent component BadgerChatroom.jsx;
  // I would recommend passing a callback from parent to child component.

  function handleDelete(id) {
    fetch(`https://cs571.org/rest/f24/hw6/messages?id=${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CS571-ID":
          "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
      },
    }).then((res) => {
      if (res.status === 200) {
        alert("Successfully deleted the post!");
        loadMessages();
      } else {
        alert("Failed to delete the post!");
      }
    });
  }

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {
        /* TODO: Allow an authenticated user to create a post. */
        loginStatus ? (
          <Form onSubmit={handlePost}>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control type="text" id="title" ref={titleRef} />
            <br />
            <Form.Label htmlFor="content">Content</Form.Label>
            <Form.Control as="textarea" id="content" ref={contentRef} />
            <br />
            <Button type="submit">Create Post</Button>
          </Form>
        ) : (
          <p>You must be logged in to post!</p>
        )
      }
      <hr />
      {messages.length > 0 ? (
        <>
          <Container fluid>
            <Row>
              {messages.slice((page - 1) * 25, page * 25).map((message) => (
                <Col xs={12} sm={12} md={6} lg={4} xl={3} key={message.id}>
                  <BadgerMessage {...message} handleDelete={handleDelete} />
                </Col>
              ))}
            </Row>
          </Container>
          <Pagination>
            <Pagination.Item active={page === 1} onClick={() => setPage(1)}>
              1
            </Pagination.Item>
            <Pagination.Item active={page === 2} onClick={() => setPage(2)}>
              2
            </Pagination.Item>
            <Pagination.Item active={page === 3} onClick={() => setPage(3)}>
              3
            </Pagination.Item>
            <Pagination.Item active={page === 4} onClick={() => setPage(4)}>
              4
            </Pagination.Item>
          </Pagination>
        </>
      ) : (
        <>
          <p>There are no messages on this page yet!</p>
        </>
      )}
    </>
  );
}
