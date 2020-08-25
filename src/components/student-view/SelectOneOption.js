import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { withFirebase } from "../Firebase";
import axios from "axios";
import "./SelectOne.css";

class SelectOneOption extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      update: "",
      reqSchool: "",
    };
  }

  handleUpdate = (event) => {
    event.preventDefault();
    const currentVal = event.target.value;
    this.setState({
      update: currentVal,
    });
  };

  handleUpload = async (event) => {
    event.preventDefault();
    // Adds school to request list
    if (this.props.needInput) {
      if (
        this.state.update === "School missing?" &&
        this.state.reqSchool !== ""
      ) {
        await this.Firebase.db
          .collection("students")
          .doc(this.Firebase.auth.currentUser.uid)
          .update({
            School: "Other",
          });
        axios.post(
          "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/requestSchool",
          {
            school: this.state.reqSchool,
            currentStudentEmail: this.Firebase.auth.currentUser.email,
          }
        );
        this.props.monitorChanges();
        alert(
          "Your school has been requested to be added, and the admins will review the request. Please check back soon to see if your school has been listed."
        );
        return;
      }
    }

    // prevents students from choosing Choose ...
    if (this.state.update === "Choose ...") {
      return;
    }

    if (this.state.update === "None") {
      await this.Firebase.db
        .collection("students")
        .doc(this.Firebase.auth.currentUser.uid)
        .update({
          [this.props.valueType]: "",
        });
      this.props.monitorChanges();
      return;
    }

    await this.Firebase.db
      .collection("students")
      .doc(this.Firebase.auth.currentUser.uid)
      .update({
        [this.props.valueType]: this.state.update,
      });
    this.props.monitorChanges();
  };

  handleMapUpload = async (event) => {
    event.preventDefault();
    if (this.state.update === "Choose ...") {
      return;
    }

    const valuePlaceHolder = this.props.valueType;
    const currentState = this.state.update;
    const currentObjString = `${valuePlaceHolder}.${currentState}`;

    await this.Firebase.db
      .collection("students")
      .doc(this.Firebase.auth.currentUser.uid)
      .update({
        [currentObjString]: true,
      });
    this.props.monitorChanges();
  };

  render() {
    const optionOptions = this.props.optionArray.map((eachOption) => (
      <option key={`${eachOption}`}>{eachOption}</option>
    ));

    let typingForm;
    if (this.props.needInput && this.state.update === "School missing?") {
      typingForm = (
        <FormControl
          className="textForm form-control-student"
          placeholder="Enter School Here"
          value={this.state.reqSchool}
          onChange={(e) => {
            this.setState({ reqSchool: e.target.value });
          }}
        ></FormControl>
      );
    } else {
      typingForm = null;
    }

    return (
      <InputGroup className="mb-3">
        <Form.Group controlId="ControlSelect1 ">
          <Form.Control
            className="selectOneInput"
            as="select"
            onChange={this.handleUpdate}
          >
            <option>Choose ...</option>
            <option>None</option>
            {optionOptions}
            {this.props.needInput ? <option>School missing?</option> : <></>}
          </Form.Control>
        </Form.Group>
        {typingForm}

        <Button
          className="updateBtn"
          variant="primary"
          onClick={
            this.props.isSingle ? this.handleUpload : this.handleMapUpload
          }
        >
          Update
        </Button>
      </InputGroup>
    );
  }
}

export default withFirebase(SelectOneOption);
