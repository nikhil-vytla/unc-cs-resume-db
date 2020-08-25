import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { Form, Container, Modal } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./auth.css";
import "./authModal.css"
const axios = require("axios");

const Signup = ({ Firebase }) => {
  const [redirect, setRedirect] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")

  const handleSignup = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = event.target.elements;

    if (password.value !== confirmPassword.value) {
      alert("Password and confirm password are not equal");
      return;
    }

    await Firebase.auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch((err) => setErrorMessage(err.message));




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

  //logic to display error messages
  let errorMessageBlock = null;

  if (errorMessage !== "") {
    errorMessageBlock = (
      <h4 class="loginError"> {errorMessage} </h4>
    )
  }

  //modal logic
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Container className="authContainer">
      <Modal
        dialogClassName="authModal"
        show={show}
        style={{ marginTop: "0" }}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="authModalHeader">
          <Modal.Title>Welcome to the UNC CS Resume Database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="authModalSectionTitle"> Resume Database Privacy Policy</h6>
          <p>
            The UNC CS Resume Database access is restricted to qualifying partner organizations/sponsors. Data will not be accessible to outside users and will not be shared to third parties. To protect privacy, resumes posted to the UNC CS resume database cannot include private information such as physical addresses, phone numbers, social security numbers, or any other information you would not want shared with public entities. Resume upload access is restricted to students 18 years and older or active students of UNC Chapel Hill.
            <br></br>
            You may access, review, correct, update, or delete your resume or profile any time by signing into your account. Please note that qualifying partners will contact users by the email addresses provided.

            </p>
        </Modal.Body>
      </Modal>
      <Container className="authComponent">
        {redirect}
        <Form className="authForm" onSubmit={handleSignup}>
          <h1 className="loginHeader">Sign Up</h1>

          <Form.Control
            name="email"
            type="email"
            placeholder="Email Address"
            className="form-control-auth"
            style={{
              padding: "20px",
              margin: "auto",
              marginTop: "20px",
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
              marginTop: "20px",
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
              marginTop: "20px",
              minWidth: "15vw",
              maxWidth: "20vw",
            }}
          />
          <button className="authBtn" type="submit">
            Sign Up
          </button>
          {errorMessageBlock}
          <p className="authLink">
            Already have an account?{" "}
            <Link className="studentSignUp" to="/">
              Login
            </Link>
          </p>
        </Form>
      </Container>
    </Container>
  );
};

export default withFirebase(Signup);
