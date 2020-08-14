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

class EventsEnterBox extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;

    this.state = {
      eventCode: "",
    };
  }

  // sends info to firebase
  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.eventCode === "") {
      alert("Please enter your event code!");
      return;
    }

    const allCodesPreData = await this.Firebase.getEventCodes();
    const allCodes = allCodesPreData["codes"];

    if (
      allCodes[this.state.eventCode] !== "" ||
      allCodes[this.state.eventCode] !== null ||
      allCodes[this.state.eventCode] != ""
    ) {
      const currentEvent = allCodes[this.state.eventCode];
      const fullEventRef = `Events.${currentEvent}`;
      await this.Firebase.db
        .collection("students")
        .doc(this.Firebase.auth.currentUser.uid)
        .update({ [fullEventRef]: true });
      this.props.monitorChanges();
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                className="form-control-student"
                placeholder="Enter Event Code"
                onChange={(event) => {
                  this.setState({ eventCode: event.target.value });
                }}
              />
              <Button variant="primary" type="submit" className="formBtn">
                Update
              </Button>
            </InputGroup>
            <InputGroup.Append></InputGroup.Append>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default withFirebase(EventsEnterBox);
