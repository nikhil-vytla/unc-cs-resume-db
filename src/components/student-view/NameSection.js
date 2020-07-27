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
import { withFirebase } from "../Firebase";

class NameSection extends Component {
  // function MyInformation(props) {
  constructor(props) {
    this.Firebase = props.Firebase;
    super(props);
    this.state = {
      fName: "",
      lName: "",
    };
  }

  // sends info to firebase
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.fName === "" || this.state.lName === "") {
      alert("Please enter your first and last name");
      return;
    }
    await this.Firebase.db
      .collection("students")
      .doc(this.Firebase.auth.currentUser.uid)
      .update({
        "First Name": this.state.fName,
        "Last Name": this.state.lName,
      });
    this.props.monitorChanges();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row className="formRow">
          <Form.Label className="data-row-label" column lg={3}>
            Name
          </Form.Label>
          {/* <Col className="formColumn"> */}
          <InputGroup className="mb-3 inputGroup">
            <FormControl
              className="textForm"
              type="text"
              placeholder="First Name"
              onChange={(event) => {
                this.setState({ fName: event.target.value });
              }}
            />
            <FormControl
              className="textForm"
              type="text"
              placeholder="Last Name"
              onChange={(event) => {
                this.setState({ lName: event.target.value });
              }}
            />
            <Button variant="primary" className="formBtn" type="submit">
              Update
            </Button>
          </InputGroup>
          {/* <InputGroup.Append>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </InputGroup.Append> */}
          {/* </Col> */}
        </Form.Row>
      </Form>
    );
  }
}

export default withFirebase(NameSection);
