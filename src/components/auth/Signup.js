import React, { Component } from "react";
import Firebase from "../../Firebase";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./auth.css";
import axios from "axios";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      SignupEmail: "",
      SignupPassword: "",
      SignupConfirmPassword: "",
    };
  }

  render() {
    return (
      <Container className="authContainer">
        <Container className="authComponent">
          <Form className="authForm" onSubmit={this.handleSignup}>
            <h1>Sign Up</h1>

            <Form.Control
              type="email"
              placeholder="Email Address"
              value={this.state.SignupEmail}
              onChange={(e) => {
                this.setState({ SignupEmail: e.target.value });
              }}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.SignupPassword}
              onChange={(e) => {
                this.setState({ SignupPassword: e.target.value });
              }}
            />
            <Form.Control
              id="SignupConfirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={this.state.SignupConfirmPassword}
              onChange={(e) => {
                this.setState({ SignupConfirmPassword: e.target.value });
              }}
            />
            <button className="authBtn" type="submit">
              Sign Up
            </button>
            <p className="authLink">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </Form>
        </Container>
      </Container>
    );
  }

  handleSignup = async (event) => {
    event.preventDefault();
    if (this.state.SignupPassword !== this.state.SignupConfirmPassword) {
      alert("Password and Confirm Password must be equal");
    } else {
      try {
        const user = await Firebase.createUser(
          this.state.SignupEmail,
          this.state.SignupPassword
        );
        console.log(user);
        axios.post("/newUser", { user });
        alert("Sign Up successful! Check console for user object");
      } catch (err) {
        console.log(err);
      }
    }
  };
}
