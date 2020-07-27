import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { Form, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./auth.css";
const axios = require("axios");

const Signup = ({ Firebase }) => {
  const [redirect, setRedirect] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = event.target.elements;

    if (password.value !== confirmPassword.value) {
      alert("Password and confirm password are not equal");
      return;
    }

    await Firebase.auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch((err) => console.log(err));

    // await axios.post("https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/newStudent", {
    //   "email": email.value,
    // }).catch(err => console.log(err.message));

    axios({
      method: "post",
      headers: {
        "Access-Control-Allow-Origin":
          "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net",
      },
      url:
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/newStudent",
      data: {
        email: email.value,
      },
    }).catch((err) => console.log(err.message));

    setRedirect(<Redirect to="/student" />);
  };

  return (
    <Container className="authContainer">
      <Container className="authComponent">
        {redirect}
        <Form className="authForm" onSubmit={handleSignup}>
          <h1>Sign Up</h1>

          <Form.Control name="email" type="email" placeholder="Email Address" />
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
          <p className="authLink">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </Form>
      </Container>
    </Container>
  );
};

export default withFirebase(Signup);
