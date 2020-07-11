import React, { Component } from "react";
import "./SignUp.css";
import firebase from "../Firebase";
import ReactDOM from "react-dom";

export default class SignUp extends Component {
  getUserSignUpEmailAndPassword() {
    const emailText = ReactDOM.findDOMNode(this.refs.emailInput);
    const passwordText = ReactDOM.findDOMNode(this.refs.passwordInput);
    const confirmedPasswordText = ReactDOM.findDOMNode(
      this.refs.passwordConfirmInput
    );

    // get email and password
    const email = emailText.value;
    const password = passwordText.value;
    const confirmedPassword = confirmedPasswordText.value;

    if (password != confirmedPassword) {
      alert(
        "Passwords do not match. Please make sure that the passwords match!"
      );
      return;
    }

    // Signing Up

    const promise = firebase.register(email, password);

    promise
      .then(console.log("Account creation was successful"))
      .catch((e) => console.log(e.message));

    // add user to the database ?
  }
  render() {
    return (
      <div className="SignUp">
        <div className="SignUpHeaderUNCimage"></div>
        <div className="SignUpEmailSection">
          <h2 className="SignUpEmailH2">Email</h2>
          <input id="emailText" ref="emailInput" type="email"></input>
        </div>

        <div className="SignUpPasswordSection">
          <h2 className="SignUpPasswordH2">Password</h2>
          <input id="passwordText" ref="passwordInput" type="password"></input>
        </div>
        <div className="SignUpConfirmPasswordSection">
          <h2 className="SignUpConfirmPasswordH2">Confirm Password</h2>
          <input
            id="passwordConfirmText"
            ref="passwordConfirmInput"
            type="password"
          ></input>
        </div>

        <div className="SignUpButtons">
          <button
            className="btnSignUp"
            onClick={() => this.getUserSignUpEmailAndPassword()}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}
