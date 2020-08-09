import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Container, Form } from "react-bootstrap";

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
  }

  handleNewEmail = async (event) => {
    event.preventDefault();

    const { currentEmail, newEmail, password } = event.target.elements;

    const user = this.Firebase.auth.currentUser;
    const credential = await this.Firebase.auth.EmailAuthProvider.credential(
      this.Firebase.auth.currentUser.email,
      password.value
    );

    // Prompt the user to re-provide their sign-in credentials

    await user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated.
        if (this.Firebase.auth.currentUser.email !== currentEmail) {
          alert("Your current email address is not correct");
          return;
        }
        user.updateEmail(newEmail.value);
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
    alert("You have successfully changed your email address!");
  };

  handleNewPassword = async (event) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = event.target.elements;

    const user = this.Firebase.auth.currentUser;
    const credential = await this.Firebase.auth.EmailAuthProvider.credential(
      this.Firebase.auth.currentUser.email,
      currentPassword.value
    );

    // Prompt the user to re-provide their sign-in credentials

    await user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated.
        if (newPassword.value !== confirmPassword.value) {
          alert("Password and confirm password are not equal!");
          return;
        }
        user.updatePassword(newPassword);
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
    alert("You have successfully changed your password!");
  };

  render() {
    return (
      <Container className="accountChangeContainer" style={{ display: "flex" }}>
        <Container className="emailChangeContainer">
          <Form className="emailChangeForm" onSubmit={this.handleNewEmail}>
            <h1 className="loginHeader" style={{ color: "white" }}>
              Change Email
            </h1>
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
              name="currentPassword"
              type="password"
              placeholder="Current Password"
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
              name="newPassword"
              type="password"
              placeholder="New Password"
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
