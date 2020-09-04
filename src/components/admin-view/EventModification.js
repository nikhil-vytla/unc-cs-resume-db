import React, { Component } from "react";
import {
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  Accordion,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { withFirebase } from "../Firebase";
import axios from "axios";

class EventModification extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventInput: "",
      eventListArrState: [],
      eventCodeArrState: [],
      eventCode: [],
      eventName: [],
      eventCodeInput: "",
      eventNameInput: "",
    };
  }

  componentDidMount() {
    this.handleQueryAllData();
  }

  getListArrays = async (collection, doc) => {
    const data = await this.Firebase.db.collection(collection).doc(doc).get();
    return data.data();
  };
  handleQueryAllData = async (e) => {
    const eventListHolder = await this.getListArrays("Events", "eventsList");
    this.setState({
      eventListArrState: eventListHolder.eventsList,
    });
    const eventCodesHolder = await this.getListArrays("Events", "eventCodes");
    this.setState({
      eventCodeArrState: eventCodesHolder.codes,
    });
    this.separateKeyValue();
  };

  separateKeyValue() {
    this.setState({ eventCode: [] });
    this.setState({ eventName: [] });
    Object.keys(this.state.eventCodeArrState).forEach((key, index) => {
      this.state.eventCode.push(key);
      this.state.eventName.push(this.state.eventCodeArrState[key]);
    });
  }

  render() {
    let codeRenderOutput;
    function codeRender(eventCodeArrays) {
      let arrTemp = [];
      Object.keys(eventCodeArrays).forEach((ekey, index) => arrTemp.push(ekey));
      codeRenderOutput = arrTemp.map((dat) => (
        <option key={dat}>
          {dat} || {eventCodeArrays[dat]}
        </option>
      ));
    }

    const popover = (
      <Popover id="popover-positioned-left">
        <Popover.Title as="h3">Missing Something?</Popover.Title>
        <Popover.Content>
          Need <strong>event code</strong>
          please use the other one.
        </Popover.Content>
      </Popover>
    );

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
                  <Card.Body>
                    <Form>
                      <Form.Control
                        className="admin-input-box"
                        as="select"
                        onChange={(e) =>
                          this.parseKeyValue(e.currentTarget.value)
                        }
                      >
                        <option>Select Event</option>
                        {codeRender(this.state.eventCodeArrState)}
                        {codeRenderOutput}
                      </Form.Control>
                      <InputGroup>
                        <FormControl
                          className="admin-input-box"
                          placeholder="Event Code"
                          value={this.state.eventCodeInput}
                          aria-label="Event Code"
                          aria-describedby="basic-addon2"
                          key="eventCodes"
                          onChange={(e) =>
                            this.setState({
                              eventCodeInput: e.currentTarget.value,
                            })
                          }
                        />
                        <FormControl
                          className="admin-input-box"
                          placeholder="Event Name"
                          value={this.state.eventNameInput}
                          aria-label="Event Name"
                          aria-describedby="basic-addon2"
                          key="eventName"
                          onChange={(e) =>
                            this.setState({
                              eventNameInput: e.currentTarget.value,
                            })
                          }
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-success"
                            onClick={this.handleCodeAdd}
                          >
                            Add
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={this.handleCodeRemove}
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
                    <Form.Control
                      className="admin-input-box"
                      as="select"
                      onChange={(e) =>
                        this.setState({ eventInput: e.currentTarget.value })
                      }
                    >
                      <option>Select Event</option>
                      {this.state.eventListArrState.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                  </Card.Title>
                  <Card.Body>
                    <Form>
                      <InputGroup>
                        <FormControl
                          className="admin-input-box"
                          placeholder="Event to Add/Remove"
                          aria-label="Event to Add/Remove"
                          aria-describedby="basic-addon2"
                          key="eventCodes"
                          value={this.state.eventInput}
                          onChange={(e) =>
                            this.setState({ eventInput: e.currentTarget.value })
                          }
                        />
                        <InputGroup.Append>
                          <OverlayTrigger
                            trigger="click"
                            placement="left"
                            overlay={popover}
                          >
                            <Button variant="outline-success">Add</Button>
                          </OverlayTrigger>
                          <Button
                            variant="outline-danger"
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

  parseKeyValue(keyValPair) {
    let loc = keyValPair.indexOf(" || ");
    this.setState({ eventCodeInput: keyValPair.substr(0, loc) });
    this.setState({ eventNameInput: keyValPair.substr(loc + 4) });
  }

  handleCodeAdd = async (event) => {
    event.preventDefault();
    let index = this.state.eventCode.indexOf(this.state.eventCodeInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    let mapfield = {};
    mapfield[`codes.${this.state.eventCodeInput}`] = this.state.eventNameInput;

    await this.Firebase.db
      .collection("Events")
      .doc("eventCodes")
      .update(mapfield)
      .catch((err) => console.log(err));

    index = this.state.eventListArrState.indexOf(this.state.eventNameInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.eventListArrState.push(this.state.eventNameInput);
    console.log(this.state.eventListArrState);
    await this.Firebase.db
      .collection("Events")
      .doc("eventsList")
      .update({
        ["eventsList"]: this.state.eventListArrState,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  //Remove resume access
  handleCodeRemove = async (event) => {
    event.preventDefault();
    let index = this.state.eventCode.indexOf(this.state.eventCodeInput);
    if (index > -1) {
      this.state.eventCode.splice(index, 1);
      this.state.eventName.splice(index, 1);
    }

    await axios.put(
      "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/removeEventCodeField",
      {
        eCode: this.state.eventCodeInput,
        currentAdminEmail: this.Firebase.auth.currentUser.email,
      }
    );

    this.setState({
      eventInput: this.state.eventCodeArrState[this.state.eventCodeInput],
    });

    index = this.state.eventListArrState.indexOf(
      this.state.eventCodeArrState[this.state.eventCodeInput]
    );
    if (index > -1) {
      this.state.eventListArrState.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Events")
      .doc("eventsList")
      .update({
        ["eventsList"]: this.state.eventListArrState,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    let index = this.state.eventListArrState.indexOf(this.state.eventInput);
    if (index > -1) {
      this.state.eventListArrState.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Events")
      .doc("eventsList")
      .update({
        ["eventsList"]: this.state.eventListArrState,
      })
      .catch((err) => console.log(err));

    this.setState({
      eventCodeInput: this.state.eventCode[
        this.state.eventName.indexOf(this.state.eventInput)
      ],
    });

    index = this.state.eventCode.indexOf(this.state.eventCodeInput);
    if (index > -1) {
      this.state.eventCode.splice(index, 1);
      this.state.eventName.splice(index, 1);
    }

    await axios.put(
      "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/removeEventCodeField",
      {
        eCode: this.state.eventCodeInput,
        currentAdminEmail: this.Firebase.auth.currentUser.email,
      }
    );

    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(EventModification);
