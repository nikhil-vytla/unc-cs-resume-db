import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./StudentView.css";
import SideCard from "./SideCard.js";
import MyInformation from "./MyInformation";
import Firebase from "../../Firebase.js";

export class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentObject: {},
    };
    this.handlingUserInfo = this.handlingUserInfo.bind(this);
  }

  handlingUserInfo = async () => {
    console.log(Firebase.auth.currentUser);
    if (Firebase.currentUser !== null) {
      const obj = await Firebase.getUserInfo(Firebase.auth.currentUser.uid);
      console.log(obj);
      return obj[0];
    }
  };

  async componentDidMount() {
    const data = await this.handlingUserInfo();
    console.log(data);
    this.setState({
      studentObject: data,
    });
  }

  render() {
    let studentInfo = `[
        {
          "id": 1,
          "name": "John Doe",
          "school": "UNC CH",
          "graduatingyear": "2021",
          "major": ["Computer Science", "Computer Engineering"],
          "programmingLanguage": ["python","c++","c#"],
          "frameworkTool": ["react"],
          "operatingSystem": ["linux"],
          "databaseSystem": [],
          "eventsAttended": ["pearl hack", "hackathon", "hackNC"]
        }]`;
    let studentInfo1 = `[
        {
          "id": 10,
          "name": "John Doe",
          "basicInfo": {
            "School": ["UNC CH"],
            "Graduating Year": ["2021"],
            "Major": ["Computer Science"]
          },
          "skillsExperience": {
            "Programming Language": ["python", "c++", "c#"],
            "Framework Tool": ["react", "js"],
            "Operating System": ["linux"],
            "Database System": []
          },
          "eventAttended": {"events":["pearl hack", "hackNC"]}
        }
      ]`;
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
              />
            </Col>
            <Col className="right-panel">
              <MyInformation studentData={JSON.parse(studentInfo)} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StudentView;
