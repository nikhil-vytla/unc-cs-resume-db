import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { Form, Container } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import "./auth.css";

const Login = ({ Firebase }) => {
  const [redirect, setRedirect] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    await Firebase.auth
      .signInWithEmailAndPassword(email.value, password.value)
      .catch((err) => console.log(err));

    const { currentUser } = Firebase.auth;
    const { admin, recruiter, student } = (
      await currentUser.getIdTokenResult(true).catch((err) => console.log(err))
    ).claims;

    if (!!admin) {
      setRedirect(<Redirect to="/admin" />);
    } else if (!!recruiter) {
      setRedirect(<Redirect to="/recruiter" />);
    } else if (!!student) {
      setRedirect(<Redirect to="/student" />);
    } else {
      setRedirect(<Redirect to="/" />);
    }
  };

  return (
    <Container className="authContainer">
      <Container id="LoginComponent" className="authComponent">
        <Form className="authForm" onSubmit={handleLogin}>
          <h1 className="loginHeader">Login</h1>

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
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
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
            Login
          </button>
        </Form>
        <p className="authLink">
          Don't have an account?{" "}
          <Link to="/signup" className="studentSignUp">
            Student Sign-up
          </Link>
        </p>
        <p className="forgotLink">
          <Link to="/ForgotPassword" className="studentSignUp">
            Forgot password?
          </Link>
        </p>
        {redirect}
      </Container>
    </Container>
  );
};

export default withFirebase(Login);
