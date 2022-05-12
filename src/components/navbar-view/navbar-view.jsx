import React from "react";
import { Container, Nav, Navbar,Button } from "react-bootstrap";

import './navbar-view.scss';

export function NavbarView({user}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if(localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  
  return (
 

    <Container fluid>
    <Navbar className="main-nav" sticky="top" bg="navColor" expand="lg">
    <Navbar.Brand className="navbar-logo" href="/"> Welcome to myFlix !</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">

              <Nav className="me-auto">
              {isAuth() && (
              <Nav.Link href="/profile">Profile</Nav.Link>
              )}
              {isAuth() && (
                <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                )}
                {!isAuth() && (
              <Nav.Link href="/">Sign in</Nav.Link>
              )}
                  {!isAuth() && (
              <Nav.Link href="/register">Sign up</Nav.Link>
              )}
              <spinner animation= "border"/>
              </Nav>
            
      </Navbar.Collapse>
      </Navbar>
      </Container>

);
}