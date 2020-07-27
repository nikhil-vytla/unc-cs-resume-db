import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./StudentView.css";
import SideCard from "./SideCard.js";
import MyInformation from "./MyInformation";
import { withFirebase } from "../Firebase";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import Form from "react-bootstrap/Form";

class StudentView extends Component {
  constructor(props) {
    this.Firebase = props.Firebase;
    super(props);
    this.state = {
      studentObject: {},
      isReady: false,
    };
  }

  handleHideResume = async () => {
    if (this.Firebase.currentUser !== null) {
      await this.Firebase.db
        .collection("students")
        .doc(this.Firebase.auth.currentUser.uid)
        .update({ "Hide Resume": true });
      this.updateStudentPage();
    }
  };

  handleShowResume = async () => {
    if (this.Firebase.currentUser !== null) {
      await this.Firebase.db
        .collection("students")
        .doc(this.Firebase.auth.currentUser.uid)
        .update({ "Hide Resume": false });
      this.updateStudentPage();
    }
  };

  handlingUserInfo = async () => {
    if (this.Firebase.currentUser !== null) {
      const obj = await this.Firebase.getUserInfo(
        this.Firebase.auth.currentUser.uid
      );
      return obj[0];
    }
  };

  updateStudentPage = async () => {
    const data = await this.handlingUserInfo();
    this.setState({
      studentObject: data,
    });
  };

  async componentDidMount() {
    const data = await this.handlingUserInfo();
    this.setState({
      studentObject: data,
    });
  }

  render() {
    return (
      <div className="full-panel">
        <Container fluid="true">
          <Row>
            <Col xs={3} className="left-panel">
              <SideCard
                emailAddress={this.state.studentObject["Email"]}
                firstName={this.state.studentObject["First Name"]}
                lastName={this.state.studentObject["Last Name"]}
                resURL={this.state.studentObject["Resume PDF"]}
                profileImgURL={this.state.studentObject["Profile Image"]}
              />
            </Col>
            <Col className="right-panel">
              <div className="myInfoDiv">
                <MyInformation
                  //School
                  schoolData={this.state.studentObject["School"]}
                  // Graduation year
                  gradData={this.state.studentObject["Graduation Year"]}
                  // Major(s)
                  primMajorData={this.state.studentObject["Primary Major"]}
                  //Secondary Major
                  secMajorData={this.state.studentObject["Secondary Major"]}
                  // Minor(s)
                  minorsData={this.state.studentObject["Minors"]}
                  // Skills
                  skillsData={this.state.studentObject["Skills"]}
                  // Events
                  eventData={this.state.studentObject["Events"]}
                  // Programming Languages
                  progLangData={
                    this.state.studentObject["Programming Languages"]
                  }
                  // Frameworks and tools
                  frameAndToolsData={
                    this.state.studentObject["Frameworks and Tools"]
                  }
                  // Operating Systems
                  opSystemsData={this.state.studentObject["Operating Systems"]}
                  // Database Systems
                  dbSystemsData={this.state.studentObject["Database Systems"]}
                  // Name for header
                  fNameData={this.state.studentObject["First Name"]}
                  lNameData={this.state.studentObject["Last Name"]}
                  // Monitors updates
                  onStudentDataChange={this.updateStudentPage}
                  // Seeking Data
                  seekingData={this.state.studentObject["Seeking"]}
                />
              </div>
              <div className="updateButtonDiv">
                {/*Implement Radio for Showing Resume */}

                {/* <Form>
                  <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                      inline
                      label="Display your resume in the database"
                      type="radio"
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      inline
                      label="Hide your resume from the database"
                      type="radio"
                      id={`inline-radio-2`}
                    />
                  </div>
                </Form> */}

                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="customRadioInline1"
                    name="customRadioInline1"
                    className="custom-control-input"
                    onClick={this.handleShowResume}
                  />
                  <label class="custom-control-label" for="customRadioInline1">
                    Display your resume in the database
                  </label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="customRadioInline2"
                    name="customRadioInline1"
                    className="custom-control-input"
                    onClick={this.handleHideResume}
                  />
                  <label class="custom-control-label" for="customRadioInline2">
                    Hide your resume from the database
                  </label>
                </div>
                <h6>{`Your resume is currently ${
                  this.state.studentObject["Hide Resume"]
                    ? "hidden from recruiters."
                    : "is visible to recruiters!"
                }`}</h6>

                {/* <Button variant="primary" onClick={this.updateStudentPage}>
                  Display Updates
                </Button> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withFirebase(StudentView);
