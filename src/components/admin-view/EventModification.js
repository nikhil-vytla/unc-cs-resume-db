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
import { withFirebase } from "../Firebase";

class EventModification extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = { eventInput: "", doc: "", eventListArrState: [] };
  }

  async componentDidMount() {
    const eventsHolder = await this.getListArrays("Events", "eventsList");
    this.setState({
      eventListArrState: eventsHolder.eventsList,
    });
  }

  getListArrays = async (collection, doc) => {
    const data = await this.Firebase.db.collection(collection).doc(doc).get();
    return data.data();
  };

  render() {
    return (
      <div>
        <h2 className="admin-heading">{this.props.title}</h2>

        <Accordion defaultActiveKey="0">
          <div className="admin-card-accordion-toggle">
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="eventCodes"
                style={{ backgroundColor: "#E5E5E5", color: "Black" }}
              >
                <h3 className="admin-card-name">Event Code</h3>
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
                          className="admin-input-box"
                          placeholder="Event to Add/Remove"
                          aria-label="Event to Add/Remove"
                          aria-describedby="basic-addon2"
                          // key={data.UID}
                          key="eventCodes"
                          onChange={(e) =>
                            this.updateStates(
                              e.currentTarget.value,
                              "eventCodes"
                            )
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
                <h3 className="admin-card-name">Events List</h3>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="eventsList">
                <div style={{ color: "Black" }}>
                  <Card.Title style={{ color: "Black", padding: "3%" }}>
                    {this.state.eventListArrState.map((event, ind) => (
                      <li key={ind}>{event}</li>
                    ))}
                    {/* {this.props.datas[1].eventsList.map((event, ind) => (
                    <li key={ind}>{event}</li>
                  ))} */}
                  </Card.Title>
                  <Card.Body>
                    <Form>
                      <InputGroup>
                        <FormControl
                          className="admin-input-box"
                          placeholder="Event to Add/Remove"
                          aria-label="Event to Add/Remove"
                          aria-describedby="basic-addon2"
                          // key={data.UID}
                          key="eventCodes"
                          onChange={(e) =>
                            this.updateStates(
                              e.currentTarget.value,
                              "eventsList"
                            )
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
          </div>
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
    this.state.eventListArrState.push(this.state.eventInput);
    console.log(this.state.eventListArrState);
    await this.Firebase.db
      .collection("Events")
      .doc(this.state.doc)
      .update({
        [this.state.doc]: this.state.eventListArrState,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.eventListArrState.indexOf(this.state.eventInput);
    if (index > -1) {
      this.state.eventListArrState.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Events")
      .doc(this.state.doc)
      .update({
        [this.state.doc]: this.state.eventListArrState,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  handleUpdate = () => {
    this.props.updateEventsx();
  };
}

export default withFirebase(EventModification);
