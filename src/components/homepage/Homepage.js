import React, { Component } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { Button, Modal, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";
function Homepage() {
  return (
    <div className="background-img">
      <div className="btn-logins-container">
        <Container>
          <h1 className="h1-login"> I am A ....</h1>
          <div className="router-link">
            <Link to="/studentlogin">
              <Button className="btn-login">CS Student</Button>
            </Link>
          </div>
          <div className="router-link">
            <Link className="router-link" to="/recruiterlogin">
              <Button className="btn-login">Recruiter</Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Homepage;
