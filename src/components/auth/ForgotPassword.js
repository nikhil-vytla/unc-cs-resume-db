import React from "react";
import { withFirebase } from "../Firebase";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./auth.css";

const Login = ({ Firebase }) => {
  const handleReset = async (event) => {
    event.preventDefault();
    const { email } = event.target.elements;

    // Resets Email
    await Firebase.auth
      .sendPasswordResetEmail(email.value)
      .then(function () {
        // Email sent.
        alert(
          "You have successfully reset your password. Please check your email for more instructions."
        );
      })
      .catch(function (error) {
        // An error happened.
        alert("Something went wrong, please try again.");
        console.log(error);
      });
  };

  return (
    <Container className="authContainer">
      <Link to="/">
        <ArrowBackIcon
          style={{ color: "white", marginLeft: "15px" }}
          fontSize="large"
          className="arrowIcon"
        />
      </Link>
      <Container id="LoginComponent" className="authComponent">
        <Form className="authForm" onSubmit={handleReset}>
          <h1 className="loginHeader">Reset Password</h1>

          <Form.Control
            name="email"
            type="email"
            placeholder="Email Address"
            className="form-control-auth"
            style={{
              padding: "20px",
              margin: "auto",
              marginTop: "40px",
              minWidth: "15vw",
              maxWidth: "20vw",
            }}
          />
          <button className="authBtn" type="submit">
            Submit
          </button>
        </Form>
      </Container>
    </Container>
  );
};

export default withFirebase(Login);
