import React, { Component } from "react";
import { Container, Col, Row, Button, Modal, Form } from "react-bootstrap";
import "./StudentView.css";
import SideCard from "./SideCard.js";
import MyInformation from "./MyInformation";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import "./modal.css"

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      studentObject: {},
      updateScreen: true,
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

  handleIntro = async (event) => {
    if (this.Firebase.currentUser !== null) {
      await this.Firebase.db
        .collection("students")
        .doc(this.Firebase.auth.currentUser.uid)
        .update({ Intro: !event.target.checked });
    }
  };

  handleClose = async () => {
    this.setState({
      updateScreen: false,
    });
    this.updateStudentPage();
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
        <Modal
          dialogClassName="studentViewModal"
          show={this.state.studentObject["Intro"] && this.state.updateScreen}
          style={{ marginTop: "0" }}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton
            className="studentModalHeader">
            <Modal.Title>Welcome to the UNC CS Resume Database</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6
              className="studentModalSectionTitle"

            > Basic Information</h6>
            <p>
              For each element, select your information and then click the update
              button next to each section when you are finished. If you
              accidentally add an attribute that you don't want, simply choose the
              "None" option and then click the update button. In the Minors
              section, if you happen to accidentally check an unwanted option,
              uncheck the option and press the update button.
            </p>
            <h6
              className="studentModalSectionTitle"
            > Skills and Experience </h6>
            <p>
              For each element, check your relevant skills and then click the
              update button next to each section when you are finished. If you
              happen to accidentally check an unwanted option, uncheck the option
              and press the update button.
            </p>
            <h6
              className="studentModalSectionTitle"

            >Events</h6>
            <p>
              Once you're registered for an event, you will be emailed an event
              code and then enter in the box and press update.
            </p>
            <h6 className="studentModalSectionTitle"
            >Resume/Profile Picture Upload</h6>
            <p>
              Click on the browse button and select your resume pdf and click on
              the Resume button. Similarily, click on the browse button and select
              your profile image and click on the Profile Picture button.
            </p>
            <h6
              className="studentModalSectionTitle"

            >Account Settings</h6>
            <p>
              Click on the cog in the top left corner next to your profile picture
              if you need to change your email or password.
            </p>


          </Modal.Body>
          <Modal.Footer>
            <Form.Check
              type="checkbox"
              id={`default-checkbox`}
              label="Don't show again"
              onClick={this.handleIntro}
            />
          </Modal.Footer>

        </Modal>
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

              <Link to="/accountSettings">
                <Button variant="primary" onClick={this.handleChangeSettings}>
                  Change Account Settings
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withFirebase(StudentView);
