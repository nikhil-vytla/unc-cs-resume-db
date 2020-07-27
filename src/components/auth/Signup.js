import React, { useState, useContext } from "react";
import { FirebaseContext } from '../Firebase';
import { Form, Container } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import "./auth.css";
const axios = require('axios');

const Signup = () => {
  const [redirect, setRedirect] = useState(null);
  const Firebase = useContext(FirebaseContext);

  const handleSignup = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = event.target.elements;

    if (password.value !== confirmPassword.value) {
      alert("Password and confirm password are not equal");
      return;
    }

    await Firebase.auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .catch(err => console.log(err));

    await axios.post("http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/newStudent", {
      "email": email.value,
    }).catch(err => console.log(err.message));

    setRedirect(<Redirect to="/student" />);
  };

  return (
    <Container className="authContainer">
      <Container className="authComponent">
        {redirect}
        <Form className="authForm" onSubmit={handleSignup}>
          <h1>Sign Up</h1>

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
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <button className="authBtn" type="submit">
            Sign Up
          </button>
          <p className="authLink">Already have an account? <Link to="/">Login</Link></p>
        </Form>
      </Container>
    </Container>
  );
}

export default withRouter(Signup);