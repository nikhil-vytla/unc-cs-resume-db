import React, { Component, useState } from "react";
import {
  ToggleButton,
  ButtonGroup,
  Accordion,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { withFirebase } from "../Firebase";
import "./AdminView.css";
import StudentListRenderComponent from "./StudentListRenderComponent";

class StudentListComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = { eventInput: "", uid: "", information: {} };
  }

  render(props) {
    function resumeChecker(data) {
      console.log(data);
    }

    return (
      <div>
        <h2 className="admin-heading">{this.props.title}</h2>

        {console.log(this.props.datas)}
        <StudentListRenderComponent list={this.props.datas} />
      </div>
    );
  }

  updateStates = (input, id) => {
    this.setState({ eventInput: input });
    this.setState({ uid: id });
  };

  handleAdd = async (event) => {
    event.preventDefault();
    await this.Firebase.db
      .collection("students")
      .doc(this.state.uid)
      .update({
        ["Resume Access"]: this.Firebase.firestore.FieldValue.arrayUnion(
          this.state.eventInput
        ),
      })
      .catch((err) => console.log(err));
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    await this.Firebase.db
      .collection("students")
      .doc(this.state.uid)
      .update({
        ["Resume Access"]: this.Firebase.firestore.FieldValue.arrayRemove(
          this.state.eventInput
        ),
      })
      .catch((err) => console.log(err));
  };
}

export default withFirebase(StudentListComponent);
