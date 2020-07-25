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

export default class EventsEnterBox extends Component {
  // function MyInformation(props) {
  constructor(props) {
    super(props);
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

    const allCodesPreData = await Firebase.getEventCodes();
    //const allCodes = allCodesPreData.codes;
    //console.log(allCodes);
    const allCodes = allCodesPreData["codes"];
    // console.log(test);

    //   const allCodes = allCodesPreData.docs.map((doc) => doc.data());

    //    console.log(allCodes);
    if (
      allCodes[this.state.eventCode] !== "" ||
      allCodes[this.state.eventCode] !== null ||
      allCodes[this.state.eventCode] != ""
    ) {
      console.log(allCodes[this.state.eventCode]);
      const currentEvent = allCodes[this.state.eventCode];
      const fullEventRef = `Events.${currentEvent}`;
      await Firebase.db
        .collection("students")
        .doc(Firebase.auth.currentUser.uid)
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
                placeholder="Enter Event Code"
                onChange={(event) => {
                  this.setState({ eventCode: event.target.value });
                }}
              />
            </InputGroup>
            <InputGroup.Append>
              <Button variant="outline-secondary" type="submit">
                Update
              </Button>
            </InputGroup.Append>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}
