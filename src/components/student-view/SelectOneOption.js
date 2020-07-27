import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FirebaseContext } from '../Firebase';
import axios from "axios";
import "./SelectOne.css";

export default class SelectOneOption extends Component {
  static contextType = FirebaseContext;
  constructor(props) {
    super(props);

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
      if (this.state.update === "Other" && this.state.reqSchool !== "") {
        await this.context.db
          .collection("students")
          .doc(this.context.auth.currentUser.uid)
          .update({
            School: this.state.update,
          });
        axios.post(
          "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/requestSchool",
          { school: this.state.reqSchool }
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
    await this.context.db
      .collection("students")
      .doc(this.context.auth.currentUser.uid)
      .update({
        [this.props.valueType]: this.state.update,
      });
    this.props.monitorChanges();
    // console.log("This is in Select One Option");
  };

  // THERE IS A BUG IF THE NAME HAS A . IN IT
  // EXAMPLE: Vue.js SPLITS INTO Vue with a sub map of js
  // SOLUTION: FOR NOW DON'T USE NAMES WITH . IN THEM :)
  handleMapUpload = async (event) => {
    event.preventDefault();
    if (this.state.update === "Choose ...") {
      return;
    }
    const valuePlaceHolder = this.props.valueType;
    const currentState = this.state.update;
    const currentObjString = `${valuePlaceHolder}.${currentState}`;

    await this.context.db
      .collection("students")
      .doc(this.context.auth.currentUser.uid)
      .update({
        [currentObjString]: true,
      });
    this.props.monitorChanges();
  };

  render() {
    const optionOptions = this.props.optionArray.map((eachOption) => (
      <option>{eachOption}</option>
    ));

    let typingForm;
    if (this.props.needInput) {
      typingForm = (
        <FormControl className="textForm"
          placeholder="School missing?"
          value={this.state.reqSchool}
          onChange={(e) => {
            this.setState({ reqSchool: e.target.value });
          }}
        ></FormControl>
      );
    } else {
      typingForm = <div></div>;
    }

    return (
      <InputGroup className="mb-3">
        <Form.Group controlId="ControlSelect1 ">
          <Form.Control className="selectOneInput"
          as="select" onChange={this.handleUpdate}>
            <option>Choose ...</option>
            {optionOptions}
            {this.props.needInput ? <option>Other</option> : <></>}
          </Form.Control>
        </Form.Group>
        {typingForm}

        {/* <InputGroup.Append> */}
          <Button
            className="updateBtn"
            variant="primary"
            onClick={
              this.props.isSingle ? this.handleUpload : this.handleMapUpload
            }
          >
            Update
          </Button>

          {/* <Button variant="outline-secondary">-</Button> */}
        {/* </InputGroup.Append> */}
      </InputGroup>
    );
  }
}
