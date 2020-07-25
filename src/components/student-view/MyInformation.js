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
import NameSection from "./NameSection.js";
import SelectOneOption from "./SelectOneOption";
import MultiSelect from "./MultiSelect";
import Firebase from "../../Firebase.js";

export class MyInformation extends Component {
  // function MyInformation(props) {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
    };
  }

  handlePropsUpdate = () => {
    this.props.onStudentDataChange();
  };

  handleFullTime = async () => {
    await Firebase.db
      .collection("students")
      .doc(Firebase.auth.currentUser.uid)
      .update({ Seeking: "Full Time" });
    this.props.onStudentDataChange();
  };

  handleInternship = async () => {
    await Firebase.db
      .collection("students")
      .doc(Firebase.auth.currentUser.uid)
      .update({ Seeking: "Internship" });
    this.props.onStudentDataChange();
  };

  render() {
    // Eventually link these lists to firebase and allow clients
    // to edit them to their liking
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
      "Aerospace Engineering",
      "Anthropology",
      "Apparel/Textile Design",
      "Applied Science",
      "Architecture",
      "Arts Management",
      "Astronomy",
      "Athletic Training",
      "Aviation/Aeronautics",
      "Biology",
      "Biomedical Engineering",
      "Business/Finance",
      "Chemical Engineering",
      "Chemistry",
      "Civil Engineering",
      "Communication Studies",
      "Computer Engineering",
      "Computer Science",
      "Construction Management",
      "Dance",
      "Data Science",
      "Dentistry",
      "Dramatic Arts",
      "Economics",
      "Education",
      "Electrical Engineering",
      "Engineering",
      "English/Writing",
      "Entertainment Management",
      "Environmental Studies",
      "Exercise Science/Kinesiology",
      "Family/Consumer Science",
      "Film/Broadcast",
      "Fine/Studio Art",
      "Fisheries and Wildlife",
      "Food Science",
      "Forensic Science",
      "Forest Management",
      "Geography/Global Studies",
      "Graphic Design",
      "Health Policy and Management",
      "History",
      "Industrial Design",
      "Industrial Engineering",
      "Information Science",
      "Journalism",
      "Landscape Architecture",
      "Language Studies",
      "Linguistics",
      "Marine Science",
      "Materials Science",
      "Mathematics",
      "Mechanical Engineering",
      "Military Science/ROTC",
      "Music",
      "Neuroscience",
      "Non-ProfitManagement",
      "Nursing (RN/BSN)",
      "Peace/Conflict Studies",
      "Pharmacy",
      "Philosophy",
      "Physics",
      "Political Science",
      "Pre-Dental",
      "Pre-Medical",
      "Pre-Veterinary",
      "Medicine",
      "Psychology",
      "Public Health",
      "Recreation & Tourism Management",
      "Social Science",
      "Sport Management",
      "Statistics",
      "Studio Art",
      "Theatre",
      "Urban Planning",
      "Video Game Design",
      "Web Design/Digital Media",
      "Women/Gender Studies",
      "Other",
    ];

    const eventsList = [
      "HackNC",
      "Queer_Hack",
      "Global Game Jam",
      "AfroPix",
      "Carolina Data Challenge",
      "Pearl Hacks",
      "HackReality",
    ];
    // {
    //   Programming languages
    //   Java
    //   Python
    //   C (#,++)
    //   Swift
    //   Javascript
    //   HTML
    //   CSS

    //   Frameworks/Tools
    //   React
    //   Angular
    //   Ruby on Rails
    //   Vue.js
    //   Django

    //   Database Systems
    //   SQL
    //   Oracle
    //   MongoDB

    //   Operating Systems
    //   macOS
    //   Linux
    //   Windows
    //   Unix
    // }

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
      "Vue",
      "Django",
    ];

    const operatingSystems = ["macOS", "Linux", "Windows", "Unix"];

    const databaseSystems = ["SQL", "Oracle", "MongoDB"];

    let schoolDataList;

    if (this.props.schoolData !== "") {
      schoolDataList = (
        <li className="list-group-item list-group-item-primary">
          {this.props.schoolData}
        </li>
      );
    } else {
      schoolDataList = <> </>;
    }

    let gradYearDataList;

    if (this.props.gradData !== "") {
      gradYearDataList = (
        <li className="list-group-item list-group-item-primary">
          {this.props.gradData}
        </li>
      );
    } else {
      gradYearDataList = <> </>;
    }

    let primMajorDataList;

    if (this.props.primMajorData !== "") {
      primMajorDataList = (
        <li className="list-group-item list-group-item-primary">
          {this.props.primMajorData}
        </li>
      );
    } else {
      primMajorDataList = <> </>;
    }

    let secMajorDataList;

    if (this.props.secMajorData !== "") {
      secMajorDataList = (
        <li className="list-group-item list-group-item-primary">
          {this.props.secMajorData}
        </li>
      );
    } else {
      secMajorDataList = <> </>;
    }

    let eventListStuff = [];

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

    let proLangArray = [];

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

    let opSystemsArray = [];

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

    let dbSystemsArray = [];

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

    let frameAndToolsArray = [];

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

    // Minors
    let minorsArray = [];
    if (this.props.minorsData !== null && this.props.minorsData != null) {
      Object.keys(this.props.minorsData).forEach((key, index) => {
        if (this.props.minorsData[key]) {
          minorsArray.push(key);
        }
      });
    }

    let minorsList;

    if (this.props.minorsData !== null && this.props.minorsData != null) {
      minorsList = minorsArray.map((eachLang) => (
        <li className="list-group-item list-group-item-primary">{eachLang}</li>
      ));
    } else {
      minorsList = <li>Please update your information!</li>;
    }

    // New Header above the right panel
    // If the user is new say "New User, Welcome to the UNC Resume Database! Please update your information below"
    // Otherwise it says "{Your Name}, Welcome to the UNC Resume Database"

    let nameHeader;
    if (this.props.fNameData !== "" && this.props.lNameData !== "") {
      nameHeader = (
        <h3
          style={{ textAlign: "center" }}
        >{`${this.props.fNameData} ${this.props.lNameData}`}</h3>
      );
    } else {
      nameHeader = (
        <h3
          style={{ textAlign: "center" }}
        >{`Please update your information below!`}</h3>
      );
    }

    return (
      <div>
        {nameHeader}
        <div className="my-information-container">
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle
              as={Card.Header}
              eventKey="0"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <h3 className="headersForEachType">Basic Information</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div className="basic-information-form">
                <Form.Group>
                  <NameSection monitorChanges={this.handlePropsUpdate} />
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      <div className="data-row-label">Position Seeking</div>
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="customRadioInline3"
                            name="customRadioInline1"
                            className="custom-control-input"
                            onClick={this.handleInternship}
                          />
                          <label
                            className="custom-control-label"
                            for="customRadioInline3"
                          >
                            Internship
                          </label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            id="customRadioInline4"
                            name="customRadioInline1"
                            className="custom-control-input"
                            onClick={this.handleFullTime}
                          />
                          <label
                            className="custom-control-label"
                            for="customRadioInline4"
                          >
                            Full Time
                          </label>
                        </div>
                        <h6>{`You are currently seeking ${
                          this.props.seekingData == "Internship" ? "an" : "a"
                        } ${this.props.seekingData} position!`}</h6>
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <br />
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
                          needInput={true}
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {schoolDataList}
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
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {gradYearDataList}
                        {/* <li className="list-group-item list-group-item-primary">
                          {this.props.gradData}
                        </li> */}
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
                          valueType="Primary Major"
                          isSingle={true}
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {primMajorDataList}
                        {/* <li className="list-group-item list-group-item-primary">
                          {this.props.primMajorData}
                        </li> */}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Secondary Major
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={majorsList}
                          valueType="Secondary Major"
                          isSingle={true}
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {secMajorDataList}
                        {/* <li className="list-group-item list-group-item-primary">
                          {this.props.secMajorData}
                        </li> */}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Minors
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        {/* <MultiSelect
                          optionArray={majorsList}
                          valueType={"Minors"}
                          monitorChanges={this.handlePropsUpdate}
                        /> */}
                        <SelectOneOption
                          optionArray={majorsList}
                          valueType="Minors"
                          isSingle={false}
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {minorsList}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </div>
            </Accordion.Collapse>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="1"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <h3 className="headersForEachType">Skills / Experience</h3>
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
                        <InputGroup className="mb-3">
                          <MultiSelect
                            optionArray={progLangauges}
                            valueType={"Programming Languages"}
                            monitorChanges={this.handlePropsUpdate}
                          />
                          {/* <SelectOneOption
                            optionArray={progLangauges}
                            valueType="Programming Languages"
                            isSingle={false}
                            monitorChanges={this.handlePropsUpdate}
                          /> */}
                          {progLangList}
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
                        <MultiSelect
                          optionArray={frameworksAndTools}
                          valueType={"Frameworks and Tools"}
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {/* <SelectOneOption
                          optionArray={frameworksAndTools}
                          valueType="Frameworks and Tools"
                          isSingle={false}
                          monitorChanges={this.handlePropsUpdate}
                        /> */}
                        {frameAndToolsList}
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
                        <MultiSelect
                          optionArray={operatingSystems}
                          valueType={"Operating Systems"}
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {/* <SelectOneOption
                          optionArray={operatingSystems}
                          valueType="Operating Systems"
                          isSingle={false}
                          monitorChanges={this.handlePropsUpdate}
                        /> */}
                        {opSystemsList}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Database Systems
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <MultiSelect
                          optionArray={databaseSystems}
                          valueType={"Database Systems"}
                          monitorChanges={this.handlePropsUpdate}
                        />
                        {/* <SelectOneOption
                          optionArray={databaseSystems}
                          valueType="Database Systems"
                          isSingle={false}
                          monitorChanges={this.handlePropsUpdate}
                        /> */}
                        {dbSystemsList}
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </div>
            </Accordion.Collapse>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="2"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <h3 className="headersForEachType">Events Attended</h3>
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
                          {/* <SelectOneOption
                            optionArray={eventsList}
                            valueType="Events"
                            isSingle={false}
                            monitorChanges={this.handlePropsUpdate}
                          /> */}

                          <MultiSelect
                            optionArray={eventsList}
                            valueType="Events"
                            monitorChanges={this.handlePropsUpdate}
                          />
                          {eventListToView}
                        </InputGroup>
                      </Col>
                    </Form.Row>
                  </div>
                </Form.Group>
              </div>
            </Accordion.Collapse>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default MyInformation;
