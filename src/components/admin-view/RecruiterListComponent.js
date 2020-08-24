import React, { Component, useState } from "react";
import {
  Accordion,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import { withFirebase } from "../Firebase";
import "./AdminView.css";
import NewRecruiter from "./NewRecruiter";
import axios from "axios";

class RecruiterListComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventInput: "",
      uid: "",
      resumeAccessListState: [],
      filtered: [{}],
      resumeAccessListRender: "",
      newRecruiterShow: false,
    };
  }

  async componentDidMount() {
    this.setState({ filtered: this.props.datas });
    console.log(this.state.filtered);
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

  resumeAccessRender(recruiter) {
    let resumeAccessList;
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
      resumeAccessList = resumeAccessArr.map((dat, ind) => (
        <li key={ind + dat} className="admin-resume-access-list">
          {" "}
          {dat}
        </li>
      ));
      this.setState({ resumeAccessListRender: resumeAccessList });
    }
  }

  render(props) {
    let resumeAccessList;
    let newRecruiterClose = () => this.setState({ newRecruiterShow: false });

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
        resumeAccessList = resumeAccessArr.map((dat, ind) => (
          <li key={ind + dat} className="admin-resume-access-list">
            {" "}
            {dat}
          </li>
        ));
      }
    }

    return (
      <div>
        <h2 className="admin-heading">
          {this.props.title}
          {/* <Button
            className="admin-new-recruiter-button"
            onClick={this.newRecruiterRender}
          >
            New Recruiter
          </Button> */}
          <div className="admin-new-recruiter-button">
            <Button onClick={() => this.setState({ newRecruiterShow: true })}>
              New Recruiter
            </Button>
            <NewRecruiter
              show={this.state.newRecruiterShow}
              onHide={newRecruiterClose}
              update={this.handleUpdate}
            />
          </div>
        </h2>

        <div className="unordered-list-students">
          <Accordion defaultActiveKey="0">
            {this.props.datas.map((data, index) => (
              // {this.state.filtered.map((data, index) => (
              <div
                className="admin-student-card-accordion-toggle"
                key={data.UID}
              >
                {/* {console.log(data)} */}
                <Card>
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
                      <Card.Text>
                        <Form>
                          <InputGroup className="mb-3">
                            <FormControl
                              className="admin-input-box"
                              placeholder="Event to Add/Remove"
                              aria-label="Event to Add/Remove"
                              aria-describedby="basic-addon2"
                              key={data.Name + data.UID}
                              onChange={(e) =>
                                this.updateStates(
                                  e.currentTarget.value,
                                  data.UID
                                )
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
                                  onClick={this.handleRemove}
                                >
                                  Remove
                                </Button>
                              </div>
                            </InputGroup.Append>
                          </InputGroup>
                        </Form>
                      </Card.Text>
                      <Card.Body>
                        <Button
                          variant="danger"
                          onClick={(e) => this.doubleCheck(data)}
                        >
                          Delete Recruiter
                        </Button>
                      </Card.Body>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </div>
            ))}
          </Accordion>
        </div>
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

  doubleCheck(data) {
    {
      // console.log(data);
      let didConfirm = window.confirm(
        "Are you sure you want to delete " + data["Name"] + "?"
      );
      if (didConfirm) {
        console.log("execute Deleting the recruiter");
        this.handleRemoveRecruiter(data);
      } else {
        console.log("canceled");
      }
    }
  }

  handleRemoveRecruiter = async (recruiterData) => {
    // console.log("deleting recruiterUID: " + recruiterData.UID);
    await axios.put(
      "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/removeRecruiterFromDB",
      { recruiterUID: recruiterData.UID }
    );
    this.handleUpdate();
  };
}
export default withFirebase(RecruiterListComponent);
