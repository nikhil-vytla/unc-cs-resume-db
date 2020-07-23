import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { analytics } from "firebase";
import { InputGroup, FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Firebase from "../../Firebase.js";

export default class SelectOneOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: "",
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleMapUpload = this.handleMapUpload.bind(this);
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
    if (this.state.update == "Choose ...") {
      return;
    }
    await Firebase.db
      .collection("students")
      .doc(Firebase.auth.currentUser.uid)
      .update({
        [this.props.valueType]: this.state.update,
      });
    this.props.monitorChanges();
    console.log("This is in Select One Option");
  };

  // THERE IS A BUG IF THE NAME HAS A . IN IT
  // EXAMPLE: Vue.js SPLITS INTO Vue with a sub map of js
  // SOLUTION: FOR NOW DON'T USE NAMES WITH . IN THEM :)
  handleMapUpload = async (event) => {
    event.preventDefault();
    if (this.state.update == "Choose ...") {
      return;
    }
    const valuePlaceHolder = this.props.valueType;
    const currentState = this.state.update;
    const currentObjString = `${valuePlaceHolder}.${currentState}`;

    await Firebase.db
      .collection("students")
      .doc(Firebase.auth.currentUser.uid)
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
      typingForm = <FormControl></FormControl>;
    } else {
      typingForm = <div></div>;
    }

    return (
      <InputGroup className="mb-3">
        <Form.Group controlId="ControlSelect1">
          <Form.Control as="select" onChange={this.handleUpdate}>
            <option>Choose ...</option>
            {optionOptions}
          </Form.Control>
        </Form.Group>
        {typingForm}

        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={
              this.props.isSingle ? this.handleUpload : this.handleMapUpload
            }
          >
            +
          </Button>

          <Button variant="outline-secondary">-</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
