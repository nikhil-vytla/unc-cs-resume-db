import React, { Component } from "react";
import Firebase from "../../Firebase";
import "./Signup.css";
import Logo from "../Logo.js";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", confirmPassword: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleSignup = this.handleSignup.bind(this);
  }

  render() {
    return (
      <div className="SignupComponent container">
        <Logo isLarge="true" />
        <form className="form-signup" onSubmit={this.handleSignup}>
          <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
          <input
            className="form-control"
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />
          <button
            className="SignupBtn btn btn-primary"
            type="submit"
            value="Submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleSignup = async (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("Password and Confirm Password are not equal");
    } else {
      try {
        const user = await Firebase.createUser(
          this.state.email,
          this.state.password
        );
        console.log("Sign Up successful!");
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    }
  };
}
