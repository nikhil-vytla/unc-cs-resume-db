import React, { Component } from "react";
import Firebase from "../../Firebase";
import { Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./auth.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { LoginEmail: "", LoginPassword: "" };
  }

  render() {
    return (
      <Container className="authContainer">
        <Container id="LoginComponent" className="authComponent">

          {/* Test Button to run sample query */}
          <Button type="button" onClick={this.handleQuery}>Run Query</Button>

          <Form className="authForm" onSubmit={this.handleLogin}>
            <h1>Login</h1>

            <Form.Control
              type="email"
              placeholder="Email Address"
              value={this.state.LoginEmail}
              onChange={(e) => {
                this.setState({ "LoginEmail": e.target.value });
              }}
            />
            <Form.Control
              id="LoginPassword"
              type="password"
              placeholder="Password"
              value={this.state.LoginPassword}
              onChange={(e) => {
                this.setState({ "LoginPassword": e.target.value });
              }}
            />
            <button className="authBtn" type="submit">
              Login
            </button>
          </Form>
          <p className="authLink" >Don't have an account? <Link to="/signup">Signup</Link></p>
        </Container>
      </Container>
    );
  }

  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await Firebase.login(this.state.LoginEmail, this.state.LoginPassword);
      console.log(await (await Firebase.db.collection("students").doc(user.uid).get()).data());
      alert("Check console for logged in user");
    } catch (err) {
      console.log(err);
    }
  };

  // Sample query handler
  handleQuery = async (e) => {
    try {
      const result = await Firebase.runQuery();
      console.log(result);
      alert("Check console for result");
    } catch(err) {console.log(err);}
  }
}
