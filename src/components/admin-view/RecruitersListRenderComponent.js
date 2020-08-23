import React, { Component } from "react";
import {
  Accordion,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./AdminView.css";
import axios from "axios";
import { withFirebase } from "../Firebase";

export class RecruitersListRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      filtered: [{}],
      selectedStudent: {},
      eventInput: "",
      uid: "",
      resumeAccess: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.list,
      selectedStudent: {},
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items,
      selectedStudent: {},
    });
  }
  render() {
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
        // this.setState({resumeAccess: resumeAccessArr})
        resumeAccessList = resumeAccessArr.map((dat, ind) => (
          <li
            // key={"Resume Access" + ind + dat}
            className="admin-resume-access-list"
          >
            {" "}
            {dat}
          </li>
        ));
      }
    }
    return (
      <div className="unordered-list-students">
        <div style={{ paddingBottom: "1%" }}>
          <FormControl
            className="admin-input-box"
            placeholder="Search recruiter..."
            aria-label="Search recruiter..."
            aria-describedby="basic-addon2"
            onChange={this.handleChange}
          />
        </div>
        {console.log("this.state.filtered in render() return()")}
        {console.log(this.state.filtered)}

        {console.log("this.state.filtered in render() return() to Accordion")}

        <Accordion defaultActiveKey="0">
          {this.state.filtered.map((data, index) => (
            <div
              className="admin-student-card-accordion-toggle"
              key={data.UID}
              onClick={(e) => this.setState({ selectedStudent: data })}
            >
              <Card>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={data.UID + data["Name"]}
                  style={{ backgroundColor: "#E5E5E5", color: "Black" }}
                >
                  <h2 className="admin-recruiter-card-name">
                    {data["Name"]}
                    {resumeAccessRender(data)}
                    {resumeAccessList}
                  </h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={data.UID + data["Name"]}>
                  <div style={{ color: "Black" }}>
                    <Card.Title style={{ color: "Black", padding: "1%" }}>
                      <Form.Label>Email : {data.Email}</Form.Label>
                      <br />
                      <Form.Label>UID : {data.UID}</Form.Label>
                    </Card.Title>
                    <Card.Text className="admin-card-text">
                      <Form>
                        <InputGroup className="mb-3">
                          <FormControl
                            className="admin-input-box"
                            placeholder="Event to Add/Remove"
                            aria-label="Event to Add/Remove"
                            aria-describedby="basic-addon2"
                            key={data.Name + data.UID}
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
                        variant="outline-danger"
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

  doubleCheck(data) {
    {
      console.log(data);
      let didConfirm = window.confirm(
        "Are you sure you want to delete " +
          data["First Name"] +
          " " +
          data["Last Name"] +
          "?"
      );
      if (didConfirm) {
        console.log("execute Deleting the student");
        this.handleRemoveRecruiter(data);
      } else {
        console.log("canceled");
      }
    }
  }

  handleUpdate = () => {
    this.props.updateResumeAccess();
  };

  handleAddRecruiter = async () => {
    // /newRecruiter
  };

  handleRemoveRecruiter = async (recruiterData) => {
    console.log("RecruiterData:");
    console.log(recruiterData.UID);
    // //deletes resume pdf
    // if (recruiterData["Resume PDF"] !== "") {
    //   // Delete current file in storage
    //   // Send request to delete current file
    //   await this.Firebase.storage.ref(`resumePDFs/${recruiterData.UID}`).delete();
    // }
    // if (recruiterData["Profile Image"] !== "") {
    //   // Delete current file in storage
    //   // Send request to delete current file
    //   await this.Firebase.storage
    //     .ref(`profilePictures/${recruiterData.UID}`)
    //     .delete();
    // }

    let newList = [];
    newList = this.props.list;
    newList.map((data, index) => {
      if (data.UID === recruiterData.UID) newList.splice(index, 1);
    });

    // await axios.put(
    //   "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/removeStudentFromDB",
    //   { recruiterUID: recruiterData.UID }
    // );

    this.setState({
      filtered: newList,
    });
  };
  handleChange(e) {
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

export default withFirebase(RecruitersListRenderComponent);
