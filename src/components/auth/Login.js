import React, { useState } from "react";
import { withFirebase } from '../Firebase';
import { Form, Container } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import "./auth.css";

const Login = ({ Firebase }) => {
  const [redirect, setRedirect] = useState(null);
  console.log(Firebase);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    await Firebase.auth
    .signInWithEmailAndPassword(email.value, password.value)
    .catch(err => console.log(err));

    const { currentUser } = Firebase.auth;
    const { admin, recruiter, student } = (await currentUser
    .getIdTokenResult(true)
    .catch(err => console.log(err)))
    .claims;

    if(!!admin) {
      setRedirect(<Redirect to="/admin" />);
    } else if(!!recruiter) {
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
          <h1>Login</h1>

          <Form.Control
            name="email"
            type="email"
            placeholder="Email Address"
          />
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
          <button className="authBtn" type="submit">
            Login
          </button>
        </Form>
        <p className="authLink" >Don't have an account? <Link to="/signup">Signup</Link></p>
        {redirect}
      </Container>
    </Container>
  );
}

export default withFirebase(Login);