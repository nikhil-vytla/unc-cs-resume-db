import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./StudentView.css";
import MyInformation from "./MyInformation";

export class StudentView extends Component {
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
          "eventAttended": ["pearl hack", "hackathon", "hackNC"]
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
              <h3>Left Panel</h3>
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
