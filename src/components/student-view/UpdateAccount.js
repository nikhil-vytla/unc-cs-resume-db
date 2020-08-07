import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Container, Form } from "react-bootstrap";

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
  }

  handleNewPassword = async (event) => {
    // event.preventDefault();
    // const { email, password, confirmPassword } = event.target.elements;
    // if (password.value !== confirmPassword.value) {
    //   alert("Password and confirm password are not equal");
    //   return;
    // }
    // await Firebase.auth
    //   .createUserWithEmailAndPassword(email.value, password.value)
    //   .catch((err) => console.log(err));
    return;
  };

  render() {
    return (
      <Container className="accountChangeContainer" style={{ display: "flex" }}>
        <Container className="emailChangeContainer">
          <Form>
            <Form.Control
              name="currentEmail"
              type="email"
              placeholder="Current Email Address"
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
              name="newEmail"
              type="email"
              placeholder="New Email Address"
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
        <Container
          className="passwordChangeContainer"
          style={{ display: "flex" }}
        >
          <Form
            className="passwordChangeForm"
            onSubmit={this.handleNewPassword}
          >
            <h1 className="loginHeader" style={{ color: "white" }}>
              Change Password
            </h1>
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
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
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
  }
}
export default withFirebase(UpdateAccount);
