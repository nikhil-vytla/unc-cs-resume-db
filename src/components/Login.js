import React, { Component } from "react";
import "./Login.css";
import firebase from "../Firebase";
import ReactDOM from "react-dom";

export default class Login extends Component {
  getUserLoginInfo() {
    const emailText = ReactDOM.findDOMNode(this.refs.emailInput);
    const passwordText = ReactDOM.findDOMNode(this.refs.passwordInput);

    // get email and password
    const email = emailText.value;
    const password = passwordText.value;
    // const auth = firebase.auth();

    // Sign in

    const promise = firebase.login(email, password);

    promise
      .then(console.log("Login was successful"))
      .catch((e) => console.log(e.message));
  }

  render() {
    return (
      <div className="login">
        <div className="loginHeaderUNCimage"></div>
        <div className="loginEmailSection">
          <h2 className="loginEmailH2">Email</h2>
          <input id="emailText" ref="emailInput" type="email"></input>
        </div>

        <div className="loginPasswordSection">
          <h2 className="loginPasswordH2">Password</h2>
          <input id="passwordText" ref="passwordInput" type="password"></input>
        </div>

        <div className="loginButtons">
          <button className="btnLogin" onClick={() => this.getUserLoginInfo()}>
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <a className="loginSignUpLink" href="https://twitch.tv">
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
  }
}
