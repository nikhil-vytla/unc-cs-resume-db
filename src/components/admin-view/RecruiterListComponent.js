import React, { Component, useState } from "react";
import {
  Accordion,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  Modal,
  ButtonGroup,
} from "react-bootstrap";
import { withFirebase } from "../Firebase";
import "./AdminView.css";
import NewRecruiter from "./NewRecruiter";
import NewAdmin from "./NewAdmin";

import axios from "axios";

class RecruiterListComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventInput: "",
      uid: "",
      resumeAccessListState: [],
      targetRecruiter: {},
      filtered: [{}],
      resumeAccessListRender: "",
      newRecruiterShow: false,
      newAdminShow: false,
    };
  }

  async componentDidMount() {
    this.setState({ filtered: this.props.datas });
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
    let newRecruiterClose = () => this.setState({ newRecruiterShow: false });
    let newAdminClose = () => this.setState({ newAdminShow: false });

    function resumeAccessRender(recruiter) {
      let resumeAccessArr = [];
      if (
        recruiter["Resume Access"] !== null &&
        recruiter["Resume Access"] != null
      ) {
        resumeAccessList = recruiter["Resume Access"].map((dat, ind) => (
          <li key={ind + dat} className="admin-resume-access-list">
            {dat}
          </li>
        ));
      }
    }

    return (
      <div>
        <div>
          <h2 className="admin-heading">{this.props.title}</h2>
          <ButtonGroup className="admin-new-recruiter-admin-buttons">
            <div className="admin-new-admin-button">
              <Button onClick={() => this.setState({ newAdminShow: true })}>
                New Admin
              </Button>
              <NewAdmin
                show={this.state.newAdminShow}
                onHide={newAdminClose}
                update={this.handleUpdate}
              />
            </div>

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
          </ButtonGroup>
        </div>
        <div className="unordered-list-students">
          <Accordion defaultActiveKey="0">
            {this.props.datas.map((data, index) => (
              <div
                className="admin-student-card-accordion-toggle"
                key={data.UID}
              >
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
                  <Accordion.Collapse
                    eventKey={data.Name}
                    style={{ color: "Black" }}
                  >
                    {/* <div style={{ color: "Black" }}> */}
                    <Card>
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
                                  data.UID,
                                  data
                                )
                              }
                            />
                            <InputGroup.Append
                              style={{ display: "inline-flex" }}
                            >
                              {/* <div
                                style={{ display: "inline-flex" }}
                              > */}
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
                              {/* </div> */}
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
                      {/* </div> */}
                    </Card>
                  </Accordion.Collapse>
                </Card>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }

  updateStates = (input, id, recruiter) => {
    this.setState({ eventInput: input });
    this.setState({ uid: id });
    this.setState({ targetRecruiter: recruiter });
  };

  handleAdd = async (event) => {
    event.preventDefault();
    //check if same item exist in the array before adding
    let tempRA = this.state.targetRecruiter["Resume Access"];
    const index = tempRA.indexOf(this.state.eventInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }

    tempRA.push(this.state.eventInput);
    await this.Firebase.db
      .collection("recruiters")
      .doc(this.state.uid)
      .update({
        ["Resume Access"]: tempRA,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    //check if same item exist in the array before removing
    let tempRA = this.state.targetRecruiter["Resume Access"];
    const index = tempRA.indexOf(this.state.eventInput);
    if (index > -1) {
      tempRA.splice(index, 1);
      await this.Firebase.db
        .collection("recruiters")
        .doc(this.state.uid)
        .update({
          ["Resume Access"]: tempRA,
        })
        .catch((err) => console.log(err));
      this.handleUpdate();
    }
  };

  handleUpdate = () => {
    this.props.updateRecruitersx();
  };

  doubleCheck(data) {
    {
      let didConfirm = window.confirm(
        "Are you sure you want to delete " + data["Name"] + "?"
      );
      if (didConfirm) {
        this.handleRemoveRecruiter(data);
      } else {
        console.log("canceled");
      }
    }
  }

  handleRemoveRecruiter = async (recruiterData) => {
    await axios.put(
      "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/removeRecruiterFromDB",
      {
        recruiterUID: recruiterData.UID,
        currentAdminEmail: this.Firebase.auth.currentUser.email,
      }
    );
    this.handleUpdate();
  };
}
export default withFirebase(RecruiterListComponent);
