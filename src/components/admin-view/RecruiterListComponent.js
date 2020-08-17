import React, { Component, useState } from "react";
import {
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
    this.state = { eventInput: "", uid: "", resumeAccessListState: [] };
  }

  async componentDidMount() {
    const resumeAccessaHolder = await this.getListArrays(
      "Events",
      "eventsList"
    );
    this.setState({
      resumeAccessListState: resumeAccessaHolder.eventsList,
    });
  }

  getListArrays = async (collection, doc) => {
    const data = await this.Firebase.db.collection(collection).doc(doc).get();
    return data.data();
  };

  render(props) {
    let resumeAccessList;
    function resumeAccessRender(recruiter) {
      let resumeAccessArr = [];
      if (
        recruiter["Resume Access Map"] !== null &&
        recruiter["Resume Access Map"] != null
      ) {
        Object.keys(recruiter["Resume Access Map"]).forEach((key, index) => {
          if (recruiter["Resume Access Map"][key]) resumeAccessArr.push(key);
        });
      }
      if (
        recruiter["Resume Access Map"] !== null &&
        recruiter["Resume Access Map"] != null
      ) {
        resumeAccessList = resumeAccessArr.map((dat) => (
          <li key={dat} className="admin-resume-access-list">
            {" "}
            {dat}
          </li>
        ));
      }
      console.log(recruiter["Resume Access Map"]);
      console.log("console logging");
    }
    return (
      <div>
        <h2 className="admin-heading">{this.props.title}</h2>
        <Accordion defaultActiveKey="0">
          {this.props.datas.map((data, index) => (
            <div className="admin-card-accordion-toggle">
              <Card key={index}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={data.Name}
                  style={{ backgroundColor: "#E5E5E5", color: "Black" }}
                >
                  <h2 className="admin-card-name">{data.Name}</h2>
                  {resumeAccessRender(data)}
                  {resumeAccessList}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={data.Name}>
                  <div style={{ color: "Black" }}>
                    <Card.Title style={{ color: "Black", padding: "3%" }}>
                      <Form.Label>Email : {data.Email}</Form.Label>
                      <br />
                      <Form.Label>UID : {data.UID}</Form.Label>
                    </Card.Title>
                    <Card.Body>
                      <Form>
                        <InputGroup className="mb-3">
                          <FormControl
                            className="admin-input-box"
                            placeholder="Event to Add/Remove"
                            aria-label="Event to Add/Remove"
                            aria-describedby="basic-addon2"
                            key={data.UID}
                            onChange={(e) =>
                              this.updateStates(e.currentTarget.value, data.UID)
                            }
                          />
                          <InputGroup.Append>
                            <div style={{ display: "inline-flex" }}>
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
                            </div>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form>
                    </Card.Body>
                  </div>
                </Accordion.Collapse>
              </Card>
            </div>
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
    let mapfield = {};
    mapfield[`Resume Access Map.${this.state.eventInput}`] = true;

    await this.Firebase.db
      .collection("recruiters")
      .doc(this.state.uid)
      .update(mapfield)
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    let mapfield = {};
    mapfield[`Resume Access Map.${this.state.eventInput}`] = false;

    await this.Firebase.db
      .collection("recruiters")
      .doc(this.state.uid)
      .update(mapfield)
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  handleUpdate = () => {
    this.props.updateRecruitersx();
  };
}
export default withFirebase(RecruiterListComponent);
