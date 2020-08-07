import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./StudentView.css";
import SideCard from "./SideCard.js";
import MyInformation from "./MyInformation";
import { withFirebase } from "../Firebase";

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
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
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="customRadioInline1"
                    name="customRadioInline1"
                    className="custom-control-input"
                    onClick={this.handleShowResume}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline1"
                  >
                    Display your resume in the database
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="customRadioInline2"
                    name="customRadioInline1"
                    className="custom-control-input"
                    onClick={this.handleHideResume}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline2"
                  >
                    Hide your resume from the database
                  </label>
                </div>
                <h5>{`Your resume is currently ${
                  this.state.studentObject["Hide Resume"]
                    ? "hidden from recruiters."
                    : "visible to recruiters!"
                }`}</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withFirebase(StudentView);
