import React, { Component } from "react";
import {
  Accordion,
  Card,
  Form,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./StudentView.css";
import Firebase from "../../Firebase";

export default class NameSection extends Component {
  // function MyInformation(props) {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // sends info to firebase
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.fName == "" || this.state.lName == "") {
      alert("Please enter your first and last name");
      return;
    }
    await Firebase.db
      .collection("students")
      .doc(Firebase.auth.currentUser.uid)
      .update({
        ["First Name"]: this.state.fName,
        ["Last Name"]: this.state.lName,
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Label column lg={2}>
            Name
          </Form.Label>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="First Name"
                onChange={(event) => {
                  this.setState({ fName: event.target.value });
                }}
              />
              <FormControl
                type="text"
                placeholder="Last Name"
                onChange={(event) => {
                  this.setState({ lName: event.target.value });
                }}
              />
            </InputGroup>
            <InputGroup.Append>
              <Button variant="outline-secondary" type="submit">
                +
              </Button>
            </InputGroup.Append>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}
