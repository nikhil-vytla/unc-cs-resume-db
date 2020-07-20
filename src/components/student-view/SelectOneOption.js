import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { analytics } from "firebase";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Firebase from "../../Firebase.js";

export default class SelectOneOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: "",
      makeUpdate: false,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleMapUpload = this.handleMapUpload.bind(this);
  }

  handleUpdate = (event) => {
    const currentVal = event.target.value;
    this.setState({
      update: currentVal,
    });
    console.log(currentVal);
  };

  handleUpload = (event) => {
    Firebase.db
      .collection("students")
      .doc(Firebase.auth.currentUser.uid)
      .update({
        [this.props.valueType]: this.state.update,
      });
  };

  handleMapUpload = () => {
    const valuePlaceHolder = this.props.valueType;
    const currentState = this.state.update;
    const currentObjString = `${valuePlaceHolder}.${currentState}`;

    Firebase.db
      .collection("students")
      .doc(Firebase.auth.currentUser.uid)
      .update({
        [currentObjString]: true,
      });
  };

  render() {
    const optionOptions = this.props.optionArray.map((eachOption) => (
      <option>{eachOption}</option>
    ));

    return (
      <InputGroup className="mb-3">
        <Form.Group controlId="ControlSelect1">
          <Form.Control as="select" onChange={this.handleUpdate}>
            <option>Choose ...</option>
            {optionOptions}
          </Form.Control>
        </Form.Group>
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
