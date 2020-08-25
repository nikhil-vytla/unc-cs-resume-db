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

export class StudentListRenderComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      filtered: [],
      selectedStudent: {},
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
    return (
      <div className="unordered-list-students">
        <div style={{ paddingBottom: "1%" }}>
          <FormControl
            className="admin-input-box"
            placeholder="Search student..."
            aria-label="Search student..."
            aria-describedby="basic-addon2"
            onChange={this.handleChange}
          />
        </div>

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
                  eventKey={data.UID + data["Last Name"]}
                  style={{ backgroundColor: "#E5E5E5", color: "Black" }}
                >
                  <h2 className="admin-card-name">
                    {data["First Name"]} {data["Last Name"]}
                  </h2>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={data.UID + data["Last Name"]}>
                  <div style={{ color: "Black" }}>
                    <Card.Title style={{ color: "Black", padding: "1%" }}>
                      <Form.Label>Email : {data.Email}</Form.Label>
                      <br />
                      <Form.Label>UID : {data.UID}</Form.Label>
                    </Card.Title>
                    <Card.Body>
                      <Button
                        variant="danger"
                        onClick={(e) => this.doubleCheck(data)}
                      >
                        Delete Student
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
  doubleCheck(data) {
    {
      let didConfirm = window.confirm(
        "Are you sure you want to delete " +
          data["First Name"] +
          " " +
          data["Last Name"] +
          "?"
      );
      if (didConfirm) {
        this.handleRemoveStudent(data);
      } else {
      }
    }
  }
  handleRemoveStudent = async (studentData) => {
    //deletes resume pdf
    if (studentData["Resume PDF"] !== "") {
      // Delete current file in storage
      // Send request to delete current file
      await this.Firebase.storage.ref(`resumePDFs/${studentData.UID}`).delete();
    }
    if (studentData["Profile Image"] !== "") {
      // Delete current file in storage
      // Send request to delete current file
      await this.Firebase.storage
        .ref(`profilePictures/${studentData.UID}`)
        .delete();
    }

    let newList = [];
    newList = this.props.list;
    newList.map((data, index) => {
      if (data.UID === studentData.UID) newList.splice(index, 1);
    });

    await axios.put(
      "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/removeStudentFromDB",
      { studentUID: studentData.UID }
    );

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

export default withFirebase(StudentListRenderComponent);
