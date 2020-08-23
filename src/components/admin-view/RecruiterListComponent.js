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
import NewRecruiter from "./NewRecruiter";

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

  newRecruiterRender = () => {
    console.log("clicked");
    return <NewRecruiter />;
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

  renderComponentAfterDataIsRetrieved() {
    if (this.state.dataLoaded === null) {
      this.handleQueryAllData();
      // console.log("it is null");
    } else {
      return (
        <div>
          {console.log(
            "ReruitersListComponent before gets sent to List Render"
          )}
          {console.log(this.state.recruitersList)}

          {/* <Accordion defaultActiveKey="0">
            {this.state.filtered.map((data, index) => (
              // {this.props.datas.map((data, index) => (
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
                    {this.resumeAccessRender(data)}
                    {this.state.resumeAccessListRender}
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
                      </Card.Body>
                    </div>
                  </Accordion.Collapse>
                </Card>
              </div>
            ))}
          </Accordion> */}
        </div>
      );
    }
  }

  render(props) {
    this.renderComponentAfterDataIsRetrieved();

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
          <Button
            className="admin-new-recruiter-button"
            onClick={this.newRecruiterRender}
          >
            New Recruiter
          </Button>
        </h2>

        <div className="unordered-list-students">
          {/* <div style={{ paddingBottom: "1%" }}>
            <FormControl
              className="admin-input-box"
              placeholder="Search recruiter..."
              aria-label="Search recruiter..."
              aria-describedby="basic-addon2"
              onChange={this.handleSearchChange}
            />
          </div> */}
          {/* {this.renderComponentAfterDataIsRetrieved()} */}

          <Accordion defaultActiveKey="0">
            {this.props.datas.map((data, index) => (
              // {this.state.filtered.map((data, index) => (
              <div
                className="admin-student-card-accordion-toggle"
                key={data.UID}
              >
                {console.log(data)}
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
                      <Card.Body>
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

  handleSearchChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.list;
      newList = currentList.filter((item) => {
        let fullName = item["First Name"] + item["Last Name"];
        const lc = fullName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.list;
    }
    this.setState({
      filtered: newList,
    });
  }
}
export default withFirebase(RecruiterListComponent);
