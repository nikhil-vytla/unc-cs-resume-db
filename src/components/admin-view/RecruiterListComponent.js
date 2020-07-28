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
import { withFirebase } from "../Firebase";
import "./AdminView.css";
class RecruiterListComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = { eventInput: "", uid: "" };
  }

  render(props) {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Accordion defaultActiveKey="0">
          {this.props.datas.map((data, index) => (
            <Card key={index}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={data.Name}
                style={{ backgroundColor: "#E5E5E5", color: "Black" }}
              >
                <h3 className="card-name">{data.Name}</h3>
                {data["Resume Access"].map((item, inx) => (
                  <li className="resume-access-list" key={inx}>
                    {item}
                  </li>
                ))}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={data.Name}>
                <div style={{ color: "Black" }}>
                  <Card.Title style={{ color: "Black", padding: "3%" }}>
                    <Form.Label>Email : {data.Email}</Form.Label>
                    <br />
                    <Form.Label>UID : {data.UID}</Form.Label>
                  </Card.Title>
                  <Card.Body className="input-box">
                    <Form>
                      <InputGroup>
                        <FormControl
                          placeholder="Event to Add/Remove"
                          aria-label="Event to Add/Remove"
                          aria-describedby="basic-addon2"
                          key={data.UID}
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
              </Accordion.Collapse>
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
    await this.Firebase.db
      .collection("recruiters")
      .doc(this.state.uid)
      .update({
        ["Resume Access"]: this.Firebase.firestore.FieldValue.arrayUnion(
          this.state.eventInput
        ),
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    await this.Firebase.db
      .collection("recruiters")
      .doc(this.state.uid)
      .update({
        ["Resume Access"]: this.Firebase.firestore.FieldValue.arrayRemove(
          this.state.eventInput
        ),
      })
      .catch((err) => console.log(err));
    this.handsleUpdate();
  };

  handleUpdate = () => {
    this.props.updateRecruitersx();
  };
}
export default withFirebase(RecruiterListComponent);
