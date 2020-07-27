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
} from "react-bootstrap";
import Firebase from "../../Firebase";
import "./AdminView.css";
import * as firebase from "firebase";

export class StudentListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { eventInput: "", uid: "", information: {} };
  }

  render(props) {
    let resumeAccess;
    const tempAllTheEvents = [
      "HackNC",
      "Pearl Hacks",
      "UNC Students",
      "Hackathon",
      "Carolina Data Challenge",
      "Queer_hack",
      "Global Game Jam",
      "HackReality",
      "AfroPix",
    ];

    function resumeChecker(data) {
      console.log(data);
      // Object.entries(data).map((key, val) => {
      //   if (key.includes("Resume Access")) {
      //     resumeAccess = key[1];
      //     return key[1];
      //   }
      // });
    }

    return (
      <div>
        <h2>{this.props.title}</h2>

        <Accordion defaultActiveKey="0">
          {this.props.datas.map((data, index) => (
            <Card key={index}>
              {/* {console.log(data)} */}
              <Accordion.Toggle
                as={Card.Header}
                // eventKey={this.state.information["Last Name"]}
                style={{ backgroundColor: "#E5E5E5", color: "Black" }}
              >
                <h3 className="student-name">
                  {data["First Name"]} {data["Last Name"]}
                </h3>
                {resumeChecker(data)}
                {/* {resumeAccess.map((item, inx) => (
                  // {data.(["Resume Access"]).map((item, inx) => (
                  <li className="resume-access-list" key={inx}>
                    {item}
                  </li>
                ))} */}
              </Accordion.Toggle>
              {/* 

              <Accordion.Collapse eventKey={data.Name}>
                <div style={{ color: "Black" }}>
                  <Card.Title style={{ color: "Black", padding: "3%" }}>
                    <Form.Label>Email : {data.Email}</Form.Label>
                    <Form.Label>UID : {data.UID}</Form.Label>
                  </Card.Title>
                  <Card.Body>
                    <Form>
                      <InputGroup>
                        <FormControl
                          placeholder="Event to Add/Remove"
                          aria-label="Event to Add/Remove"
                          aria-describedby="basic-addon2"
                          key={data.UID}
                          // onChange={(e) => changeTwoStates(data, e)}
                          // value={this.state.eventInput}
                          // onChange={(e) => this.setState({ uid: data.UID })}
                          // onChange={(e) =>
                          //   this.setState({ eventInput: e.currentTarget.value })
                          // }
                          onChange={(e) =>
                            this.updateStates(e.currentTarget.value, data.UID)
                          }
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-success"
                            onClick={this.handleAdd}
                          >
                            Add
                          </Button>
                          <Button
                            variant="outline-danger"
                            // onClick={console.log(this.state.eventInput)}
                            onClick={this.handleRemove}
                          >
                            Remove
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form>
                  </Card.Body>
                </div>
              </Accordion.Collapse> */}
            </Card>
          ))}
        </Accordion>
      </div>
    );
  }

  updateStates = (input, id) => {
    this.setState({ eventInput: input });
    this.setState({ uid: id });
  };

  handleAdd = async (event) => {
    event.preventDefault();
    try {
      const res = await Firebase.db
        .collection("students")
        .doc(this.state.uid)
        .update({
          ["Resume Access"]: firebase.firestore.FieldValue.arrayUnion(
            this.state.eventInput
          ),
        });
    } catch (err) {
      console.log(err);
    }
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    try {
      const res = await Firebase.db
        .collection("students")
        .doc(this.state.uid)
        .update({
          ["Resume Access"]: firebase.firestore.FieldValue.arrayRemove(
            this.state.eventInput
          ),
        });
    } catch (err) {
      console.log(err);
    }
  };
}
export default StudentListComponent;
