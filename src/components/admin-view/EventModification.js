import React, { Component } from "react";
import {
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  Accordion,
} from "react-bootstrap";
import Firebase from "../../Firebase";
import * as firebase from "firebase";

export class EventModification extends Component {
  constructor(props) {
    super(props);
    this.state = { eventInput: "", doc: "" };
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>

        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="eventCodes"
              style={{ backgroundColor: "#E5E5E5", color: "Black" }}
            >
              <h3 className="recruiter-name">Event Code</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="eventCodes">
              <div style={{ color: "Black" }}>
                <Card.Title style={{ color: "Black", padding: "3%" }}>
                  {/* {console.log(this.props.datas[0].codes.key())} */}
                  {/* {let arrthis.props.datas[0].map((codes, ind) => (
                    <li key={ind}>{codes}</li>
                  ))} */}
                </Card.Title>
                <Card.Body>
                  <Form>
                    <InputGroup>
                      <FormControl
                        placeholder="Event to Add/Remove"
                        aria-label="Event to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="eventCodes"
                        onChange={(e) =>
                          this.updateStates(e.currentTarget.value, "eventCodes")
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

          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="eventsList"
              style={{ backgroundColor: "#E5E5E5", color: "Black" }}
            >
              <h3 className="recruiter-name">Events List</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="eventsList">
              <div style={{ color: "Black" }}>
                <Card.Title style={{ color: "Black", padding: "3%" }}>
                  {this.props.datas[1].eventsList.map((event, ind) => (
                    <li key={ind}>{event}</li>
                  ))}
                </Card.Title>
                <Card.Body>
                  <Form>
                    <InputGroup>
                      <FormControl
                        placeholder="Event to Add/Remove"
                        aria-label="Event to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="eventCodes"
                        onChange={(e) =>
                          this.updateStates(e.currentTarget.value, "eventsList")
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
        </Accordion>
      </div>
    );
  }
  updateStates = (input, id) => {
    this.setState({ eventInput: input });
    this.setState({ doc: id });
  };

  handleAdd = async (event) => {
    event.preventDefault();
    try {
      const res = await Firebase.db
        .collection("Events")
        .doc(this.state.doc)
        .update({
          [this.state.doc]: firebase.firestore.FieldValue.arrayUnion(
            this.state.eventInput
          ),
        });
      this.handleUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    try {
      const res = await Firebase.db
        .collection("Events")
        .doc(this.state.doc)
        .update({
          [this.state.doc]: firebase.firestore.FieldValue.arrayRemove(
            this.state.eventInput
          ),
        });
      this.handleUpdate();
    } catch (err) {
      console.log(err);
    }
  };
  handleUpdate = () => {
    this.props.updateEventsx();
  };
}

export default EventModification;
