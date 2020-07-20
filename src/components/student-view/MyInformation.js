import React, { Component } from "react";
import {
  Accordion,
  Card,
  Form,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./StudentView.css";
import SelectOneOption from "./SelectOneOption";
//import MultiSelect from "./MultiSelect";

export class MyInformation extends Component {
  // function MyInformation(props) {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }
  render() {
    const schoolsList = [
      "UNC Chapel Hill",
      "North Carolina State University",
      "UNC Charlotte",
      "Duke University",
      "University of Central Florida",
      "Georgia Tech",
      "UNC Greensboro",
      "Virginia Tech",
      "University of Maryland",
      "Florida International University",
      "University of Florida",
      "University of Virginia",
      "Appalachian State University",
      "University of Maryland",
    ];
    const gradYearList = ["2020", "2021", "2022", "2023", "2024", "202X"];
    const majorsList = [
      "Computer Science",
      "Mathematics",
      "Physics",
      "Information Science",
    ];
    const eventsList = [
      "HackNC",
      "Queer_Hack",
      "Global Game Jam",
      "Carolina Data Challenge",
      "Pearl Hacks",
    ];

    const progLangauges = [
      "Java",
      "Python",
      "C#",
      "C++",
      "C",
      "Swift",
      "Javascript",
      "HTML",
      "CSS",
    ];

    const frameworksAndTools = [
      "React",
      "Angular",
      "Ruby on Rails",
      "Vue.js",
      "Django",
    ];

    const operatingSystems = ["macOS", "Linux", "Windows", "Unix"];

    const databaseSystems = ["SQL", "Oracle", "MongoDB"];

    let eventListStuff = new Array();

    // Get all of the trues from the Event data section
    if (this.props.eventData !== null && this.props.eventData != null) {
      Object.keys(this.props.eventData).forEach((key, index) => {
        if (this.props.eventData[key]) {
          eventListStuff.push(key);
        }
      });
    }

    // Events
    let eventListToView;
    if (this.props.eventData !== null && this.props.eventData != null) {
      eventListToView = eventListStuff.map((eachEvent) => (
        <li className="list-group-item list-group-item-primary">{eachEvent}</li>
      ));
    } else {
      eventListToView = <li>Please update your information!</li>;
    }

    let proLangArray = new Array();

    // Programming Langauges
    if (this.props.progLangData !== null && this.props.progLangData != null) {
      Object.keys(this.props.progLangData).forEach((key, index) => {
        if (this.props.progLangData[key]) {
          proLangArray.push(key);
        }
      });
    }

    let progLangList;
    if (this.props.progLangData !== null && this.props.progLangData != null) {
      progLangList = proLangArray.map((eachLang) => (
        <li className="list-group-item list-group-item-primary">{eachLang}</li>
      ));
    } else {
      progLangList = <li>Please update your information!</li>;
    }

    let opSystemsArray = new Array();

    // Operating Systems
    if (this.props.opSystemsData !== null && this.props.opSystemsData != null) {
      Object.keys(this.props.opSystemsData).forEach((key, index) => {
        if (this.props.opSystemsData[key]) {
          opSystemsArray.push(key);
        }
      });
    }

    let opSystemsList;
    if (this.props.opSystemsData !== null && this.props.opSystemsData != null) {
      opSystemsList = opSystemsArray.map((eachLang) => (
        <li className="list-group-item list-group-item-primary">{eachLang}</li>
      ));
    } else {
      opSystemsList = <li>Please update your information!</li>;
    }

    let dbSystemsArray = new Array();

    // Database Systems
    if (this.props.dbSystemsData !== null && this.props.dbSystemsData != null) {
      Object.keys(this.props.dbSystemsData).forEach((key, index) => {
        if (this.props.dbSystemsData[key]) {
          dbSystemsArray.push(key);
        }
      });
    }

    let dbSystemsList;
    if (this.props.dbSystemsData !== null && this.props.dbSystemsData != null) {
      dbSystemsList = dbSystemsArray.map((eachLang) => (
        <li className="list-group-item list-group-item-primary">{eachLang}</li>
      ));
    } else {
      dbSystemsList = <li>Please update your information!</li>;
    }

    let frameAndToolsArray = new Array();

    // Frameworks and Tools
    if (
      this.props.frameAndToolsData !== null &&
      this.props.frameAndToolsData != null
    ) {
      Object.keys(this.props.frameAndToolsData).forEach((key, index) => {
        if (this.props.frameAndToolsData[key]) {
          frameAndToolsArray.push(key);
        }
      });
    }

    let frameAndToolsList;
    if (
      this.props.frameAndToolsData !== null &&
      this.props.frameAndToolsData != null
    ) {
      frameAndToolsList = frameAndToolsArray.map((eachLang) => (
        <li className="list-group-item list-group-item-primary">{eachLang}</li>
      ));
    } else {
      frameAndToolsList = <li>Please update your information!</li>;
    }

    // OG Skills
    let listStuff;
    console.log(this.props.skillsData);
    if (this.props.skillsData !== null && this.props.skillsData != null) {
      listStuff = this.props.skillsData.map((listitem) => (
        <li className="list-group-item list-group-item-primary">{listitem}</li>
      ));
    } else {
      listStuff = <li>Please update your information in the form below!</li>;
    }
    return (
      <div>
        <h3>My Information</h3>
        <div className="my-information-container">
          <Accordion defaultActiveKey="0">
            {/* <Card className="card-setting"> */}
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <h3>Basic Information</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div className="basic-information-form">
                <Form.Group>
                  <div className="data-row">
                    <Form.Row>
                      <Form.Label column lg={2}>
                        <div className="data-row-label">School</div>
                      </Form.Label>
                      <Col>
                        <SelectOneOption
                          optionArray={schoolsList}
                          valueType="School"
                          isSingle={true}
                        />
                        {/* <InputGroup className="mb-3">
                          
                          <FormControl
                            placeholder={this.props.studentData[0].school}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          />
                          
                        </InputGroup> */}

                        <div className="testDiv">
                          <li className="list-group-item list-group-item-primary">
                            {this.props.schoolData}
                          </li>
                          {/* <li>{this.props.testingData}</li> */}
                          {/* {listStuff} */}
                          {/* yooooooo */}
                        </div>
                      </Col>
                    </Form.Row>
                  </div>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Graduation Year
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={gradYearList}
                          valueType="Graduation Year"
                          isSingle={true}
                        />
                        <li className="list-group-item list-group-item-primary">
                          {this.props.gradData}
                        </li>

                        {/* <FormControl
                          placeholder={this.props.studentData[0].graduatingyear}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        /> */}
                        {/* <InputGroup.Append>
                          <Button variant="outline-secondary">+</Button>
                          <Button variant="outline-secondary">-</Button>
                        </InputGroup.Append> */}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Primary Major
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={majorsList}
                          valueType="Majors"
                          isSingle={true}
                        />
                        <li className="list-group-item list-group-item-primary">
                          {this.props.majorData}
                        </li>
                        {/* <FormControl
                          placeholder={this.props.studentData[0].major}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        /> */}
                        {/* <InputGroup.Append>
                          <Button variant="outline-secondary">+</Button>
                          <Button variant="outline-secondary">-</Button>
                        </InputGroup.Append> */}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </div>
            </Accordion.Collapse>
            {/* </Card> */}
            {/* <Card className="card-setting"> */}
            <Accordion.Toggle
              as={Card.Header}
              eventKey="1"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <h3>Skills / Experience</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <div className="basic-information-form">
                <Form.Group>
                  <div className="data-row">
                    <Form.Row>
                      <Form.Label column lg={2}>
                        <div className="data-row-label">
                          Programming Languages
                        </div>
                      </Form.Label>
                      <Col>
                        {/* Programming languages 
Java
Python
C (#,++)
Swift
Javascript
HTML
CSS

Frameworks/Tools 
React 
Angular
Ruby on Rails
Vue.js
Django

Database Systems
SQL
Oracle
MongoDB

Operating Systems 
macOS
Linux
Windows
Unix */}

                        <InputGroup className="mb-3">
                          <SelectOneOption
                            optionArray={progLangauges}
                            valueType="Programming Languages"
                            isSingle={false}
                          />
                          {progLangList}
                          {/* <FormControl
                            placeholder={
                              this.props.studentData[0].programmingLanguage
                            }
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          /> */}
                          {/* <InputGroup.Append>
                            <Button variant="outline-secondary">+</Button>
                            <Button variant="outline-secondary">-</Button>
                          </InputGroup.Append> */}
                        </InputGroup>
                      </Col>
                    </Form.Row>
                  </div>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Frameworks / Tools
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={frameworksAndTools}
                          valueType="Frameworks and Tools"
                          isSingle={false}
                        />
                        {frameAndToolsList}
                        {/* <FormControl
                          placeholder={this.props.studentData[0].frameworkTool}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        /> */}
                        {/* <InputGroup.Append>
                          <Button variant="outline-secondary">+</Button>
                          <Button variant="outline-secondary">-</Button>
                        </InputGroup.Append> */}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Operating Systems
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={operatingSystems}
                          valueType="Operating Systems"
                          isSingle={false}
                        />
                        {opSystemsList}
                        {/* <FormControl
                          placeholder={
                            this.props.studentData[0].operatingSystem
                          }
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        /> */}
                        {/* <InputGroup.Append>
                          <Button variant="outline-secondary">+</Button>
                          <Button variant="outline-secondary">-</Button>
                        </InputGroup.Append> */}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Database Systems
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={databaseSystems}
                          valueType="Database Systems"
                          isSingle={false}
                        />
                        {dbSystemsList}
                        {/* <FormControl
                          placeholder={this.props.studentData[0].databaseSystem}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        /> */}
                        {/* <InputGroup.Append>
                          <Button variant="outline-secondary">+</Button>
                          <Button variant="outline-secondary">-</Button>
                        </InputGroup.Append> */}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </div>
            </Accordion.Collapse>
            {/* </Card>
          <Card className="card-setting"> */}
            <Accordion.Toggle
              as={Card.Header}
              eventKey="2"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <h3>Events Attended</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <div className="basic-information-form">
                <Form.Group>
                  <div className="data-row">
                    <Form.Row>
                      <Form.Label column lg={2}>
                        <div className="data-row-label">Events</div>
                      </Form.Label>
                      <Col>
                        <InputGroup className="mb-3">
                          <SelectOneOption
                            optionArray={eventsList}
                            valueType="Events"
                            isSingle={false}
                            //testingOut={eventListToView}
                          />

                          {eventListToView}
                          {/* <MultiSelect
                            optionArray={eventsList}
                            valueType="Events"
                          /> */}
                          {/* <FormControl
                            // placeholder={
                            //   this.props.studentData[0].eventsAttended
                            // }
                            as="select"
                            multiple="true"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          /> */}
                          {/* <InputGroup.Append>
                            <Button variant="outline-secondary">+</Button>
                            <Button variant="outline-secondary">-</Button>
                          </InputGroup.Append> */}
                        </InputGroup>
                      </Col>
                    </Form.Row>
                  </div>
                </Form.Group>
              </div>
            </Accordion.Collapse>
            {/* </Card> */}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default MyInformation;
