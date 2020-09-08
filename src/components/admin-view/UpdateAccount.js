import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Container, Form } from "react-bootstrap";
import firebase from "firebase/app";
import "./updateAccount.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "react-router-dom/Link";

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
  }

  handleNewPassword = async (event) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = event.target.elements;

    let exitBoolean = false;
    await this.Firebase.auth
      .signInWithEmailAndPassword(
        this.Firebase.auth.currentUser.email,
        currentPassword.value
      )
      .catch(() => {
        alert("Current password is incorrect!");
        exitBoolean = true;
      });

    if (exitBoolean === true) return;

    const user = this.Firebase.auth.currentUser;
    const credential = await firebase.auth.EmailAuthProvider.credential(
      this.Firebase.auth.currentUser.email,
      currentPassword.value
    );

    // Prompt the user to re-provide their sign-in credentials

    exitBoolean = false;

    await user
      .reauthenticateWithCredential(credential)
      .then(async () => {
        // User re-authenticated.
        if (newPassword.value !== confirmPassword.value) {
          alert("Password and confirm password are not equal!");
          exitBoolean = true;
          return;
        }
        await user.updatePassword(newPassword.value);
      })
      .catch(() => {
        // An error happened.
        exitBoolean = true;
        alert("Something went wrong. Please try again.");
      });
    if (exitBoolean === false) {
      alert("You have successfully changed your password!");
    }
  };

  render() {
    return (
      <Container className="accountChangeContainer">
        <h1 className="accountSettingsTitle">Account Settings</h1>
        <Link to="/admin">
          <ArrowBackIcon
            style={{ color: "black", marginLeft: "15px" }}
            fontSize="large"
            className="arrowIcon"
          />
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Container
            className="passwordChangeContainer"
            style={{ display: "flex" }}
          >
            <Form
              className="passwordChangeForm"
              onSubmit={this.handleNewPassword}
            >
              <h1 className="changeInfoHeader">Change Password</h1>
              <Form.Control
                name="currentPassword"
                type="password"
                placeholder="Current Password"
                className="form-control-auth"
                style={{
                  padding: "20px",
                  margin: "auto",
                  marginTop: "15px",
                  minWidth: "150px",
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
                  marginTop: "15px",
                  minWidth: "150px",
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
                  marginTop: "15px",
                  minWidth: "150px",
                  maxWidth: "20vw",
                }}
              />
              <button className="accountChangeBtn" type="submit">
                Submit
              </button>
            </Form>
          </Container>
        </div>
      </Container>
    );
  }
}
export default withFirebase(UpdateAccount);
