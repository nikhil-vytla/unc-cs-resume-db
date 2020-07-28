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
import { withFirebase } from "../Firebase";
import EventsEnterBox from "./EventsEnterBox";

class MyInformation extends Component {
  // function MyInformation(props) {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      fName: "",
      lName: "",
      languagesState: [],
      gradYearState: [],
      dbSystemsState: [],
      opSystemsState: [],
      majorsState: [],
      frameworksAndToolsState: [],
      schoolsState: [],
    };
  }

  handlePropsUpdate = () => {
    this.props.onStudentDataChange();
  };

  handleFullTime = async () => {
    await this.Firebase.db
      .collection("students")
      .doc(this.Firebase.auth.currentUser.uid)
      .update({ Seeking: "Full Time" });
    this.props.onStudentDataChange();
  };

  handleInternship = async () => {
    await this.Firebase.db
      .collection("students")
      .doc(this.Firebase.auth.currentUser.uid)
      .update({ Seeking: "Internship" });
    this.props.onStudentDataChange();
  };

  getListArrays = async (collection, doc) => {
    const data = await this.Firebase.db.collection(collection).doc(doc).get();
    return data.data();
  };

  async componentDidMount() {
    const gradHolder = await this.getListArrays("Graduation Year", "gradYears");
    const languageHolder = await this.getListArrays(
      "Programming Languages",
      "progLanguages"
    );
    const dbSystemHolder = await this.getListArrays(
      "Database Systems",
      "databaseSystems"
    );
    const opSystemHolder = await this.getListArrays(
      "Operating Systems",
      "operatingSystems"
    );
    const majorsHolder = await this.getListArrays("Majors", "majorsList");
    const frameworksHolder = await this.getListArrays(
      "Frameworks and Tools",
      "frameworksAndTools"
    );
    const schoolsHolder = await this.getListArrays("Schools", "SchoolsList");

    this.setState({
      gradYearState: gradHolder.gradYearList,
      languagesState: languageHolder.progLanguages,
      dbSystemsState: dbSystemHolder.databaseSystems,
      opSystemsState: opSystemHolder.operatingSystems,
      majorsState: majorsHolder.majorsList,
      frameworksAndToolsState: frameworksHolder.frameworksAndTools,
      schoolsState: schoolsHolder.schoolsList,
    });
  }
  render() {
    let schoolDataList;

    if (this.props.schoolData !== "") {
      schoolDataList = (
        <li className="list-group-item list-group-item-primary">
          {this.props.schoolData}
        </li>
      );
    } else {
      schoolDataList = <></>;
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

    // let nameHeader;
    // if (this.props.fNameData !== "" && this.props.lNameData !== "") {
    //   nameHeader = (
    //     <h3
    //       style={{ textAlign: "center" }}
    //     >{`${this.props.fNameData} ${this.props.lNameData}`}</h3>
    //   );
    // } else {
    //   nameHeader = (
    //     <h3
    //       style={{ textAlign: "center" }}
    //     >{`Please update your information below!`}</h3>
    //   );
    // }

    return (
      <div>
        {/* {nameHeader} */}
        <div className="my-information-container">
          <Accordion defaultActiveKey="0" className="my-information-accordion">
            <Accordion.Toggle
              className="accordionHeader"
              as={Card.Header}
              eventKey="0"
              style={{ backgroundColor: "#4B9CD3" }}
            >
              <h3 className="headersForEachType">Basic Information</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div className="basic-information-form">
                <Form.Group>
                  <NameSection monitorChanges={this.handlePropsUpdate} />
                  <br />
                  <Form.Row>
                    <Form.Label column className="data-row-label ">
                      Position Seeking
                    </Form.Label>
                    {/* <Col> */}
                    <InputGroup className="mb-3 radioInput">
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
                      <h6 className="currentlySeeking">{`You are currently seeking ${
                        this.props.seekingData == "Internship" ? "an" : "a"
                      } ${this.props.seekingData} position!`}</h6>
                    </InputGroup>
                    {/* </Col> */}
                  </Form.Row>
                  <br />
                  <div className="data-row">
                    <Form.Row className="formRow">
                      <Form.Label className="data-row-label " column lg={2}>
                        School
                      </Form.Label>
                      <Col>
                        <SelectOneOption
                          optionArray={this.state.schoolsState}
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
                  <Form.Row className="formRow">
                    <Form.Label className="data-row-label " column lg={2}>
                      Graduation Year
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={this.state.gradYearState}
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
                  <Form.Row className="formRow">
                    <Form.Label className="data-row-label " column lg={2}>
                      Primary Major
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={this.state.majorsState}
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
                  <Form.Row className="formRow">
                    <Form.Label className="data-row-label " column lg={2}>
                      Secondary Major
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <SelectOneOption
                          optionArray={this.state.majorsState}
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
                  <Form.Row className="formRow">
                    <Form.Label className="data-row-label " column lg={2}>
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
                          optionArray={this.state.majorsState}
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
              className="accordionHeader"
              as={Card.Header}
              eventKey="1"
              style={{ backgroundColor: "#4B9CD3" }}
            >
              <h3 className="headersForEachType">Skills / Experience</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <div className="basic-information-form">
                <Form.Group>
                  <div className="data-row">
                    <Form.Row className="formRow">
                      <Form.Label className="data-row-label " column lg={2}>
                        Programming Languages
                      </Form.Label>
                      <Col>
                        <InputGroup className="mb-3">
                          <MultiSelect
                            optionArray={this.state.languagesState}
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
                  <Form.Row className="formRow">
                    <Form.Label className="data-row-label " column lg={2}>
                      Frameworks / Tools
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <MultiSelect
                          optionArray={this.state.frameworksAndToolsState}
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
                  <Form.Row className="formRow">
                    <Form.Label className="data-row-label " column lg={2}>
                      Operating Systems
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <MultiSelect
                          optionArray={this.state.opSystemsState}
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
                  <Form.Row className="formRow">
                    <Form.Label className="data-row-label " column lg={2}>
                      Database Systems
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <MultiSelect
                          optionArray={this.state.dbSystemsState}
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
              className="accordionHeader"
              as={Card.Header}
              eventKey="2"
              style={{ backgroundColor: "#4B9CD3" }}
            >
              <h3 className="headersForEachType">Events Attended</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <div className="basic-information-form">
                <Form.Group>
                  <div className="data-row">
                    <Form.Row className="formRow">
                      <Form.Label className="data-row-label " column lg={2}>
                        Events
                      </Form.Label>
                      <Col>
                        <InputGroup className="mb-3">
                          {/* <MultiSelect
                            optionArray={eventsList}
                            valueType="Events"
                            monitorChanges={this.handlePropsUpdate}
                          /> */}
                          <EventsEnterBox
                            monitorChanges={this.handlePropsUpdate}
                          />
                          {/* {eventlistToView} */}
                        </InputGroup>
                      </Col>
                      {eventListToView}
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

export default withFirebase(MyInformation);
