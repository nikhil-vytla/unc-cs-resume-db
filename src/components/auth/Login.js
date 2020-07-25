import React, { useState } from "react";
import Firebase from "../../Firebase";
import { Form, Container } from "react-bootstrap";
import { withRouter, Redirect, Link } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [redirect, setRedirect] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    await Firebase.login(email.value, password.value)
    .catch(err => console.log(err));

    const { currentUser } = Firebase.auth;
    const claims = (await currentUser.getIdTokenResult(true)
    .catch(err => console.log(err))).claims;

    if(claims.admin) {
      setRedirect(<Redirect to="/admin" />);
    } else if(claims.recruiter) {
      setRedirect(<Redirect to="/recruiter" />);
    } else if (claims.student) {
      setRedirect(<Redirect to="/student" />);
    } else {
      setRedirect(<Redirect to="/" />);
    }
  };

  return (
    <Container className="authContainer">
      <Container id="LoginComponent" className="authComponent">
        {redirect}

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
      </Container>
    </Container>
  );
}

export default withRouter(Login);