import React, { Component, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import Firebase from "../../Firebase";
import RecruiterListComponent from "./RecruiterListComponent";
import StudentListComponent from "./StudentListComponent";
import "./AdminView.css";
import EventModification from "./EventModification";
import BasicInformationModification from "./BasicInformationModification";
import SkillsAndExperienceModification from "./SkillsAndExperienceModification";

export default class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recruiters: [],
      students: [],
      events: [],
      value: "Recruiters",
    };
    this.handleQueryAll = this.handleQueryAll(this);
    this.handleQueryAllRecruiters = this.handleQueryAllRecruiters.bind(this);
    this.handleQueryAllStudents = this.handleQueryAllStudents.bind(this);
    this.handleQueryAllEvents = this.handleQueryAllEvents.bind(this);
  }
  componentDidMount() {
    // this.handleQueryAll();
    this.handleQueryAllRecruiters();
    this.handleQueryAllStudents();
    this.handleQueryAllEvents();
  }

  handleQueryAll = async (e) => {
    try {
      let data = await Firebase.getAllRecruiters();
      this.setState({ recruiters: data });
      data = await Firebase.getAllStudents();
      this.setState({ students: data });
      data = await Firebase.getAllEvents();
      this.setState({ events: data });
    } catch (err) {
      console.error(err);
    }
  };
  handleQueryAllRecruiters = async (e) => {
    try {
      let data = await Firebase.getAllRecruiters();
      this.setState({ recruiters: data });
      // console.log(this.state.recruiters);
    } catch (err) {
      console.error(err);
    }
  };
  handleQueryAllStudents = async (e) => {
    try {
      let data = await Firebase.getAllStudents();
      this.setState({ students: data });
      // console.log(this.state.students);
    } catch (err) {
      console.error(err);
    }
  };
  handleQueryAllEvents = async (e) => {
    try {
      let data = await Firebase.getAllEvents();
      this.setState({ events: data });
      // console.log(this.state.students);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const parentState = (e) => {
      this.setState({ value: e });
      console.log(this.state.value);
    };

    function ToggleButtonGroup() {
      const [radioValue, setRadioValue] = useState("");
      const radios = [
        { name: "Recruiters", value: "Recruiters" },
        { name: "Students", value: "Students" },
        { name: "Event Modification", value: "Event Modification" },
        {
          name: "Basic Information Modification",
          value: "Basic Information Modification",
        },
        {
          name: "Skills & Experience Modification",
          value: "Skills & Experience Modification",
        },
      ];

      return (
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="primary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value);
                parentState(e.currentTarget.value);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      );
    }

    return (
      <div className="master-container">
        <ToggleButtonGroup />
        <Link to="/recruiter"></Link>
        {/* <Button onClick={this.handleQuery} variant="info">
          Recruiter View
        </Button> */}
        {/* {console.log("state " + this.state.value)} */}
        <div className="full-panel">
          <Container fluid="true">
            <Row>
              <Col className="right-panel">
                {this.RenderCorrectComponents()}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  RenderCorrectComponents = () => {
    switch (this.state.value) {
      case "Recruiters":
        // console.log("in recruiters switch");
        return (
          <RecruiterListComponent
            title={this.state.value}
            datas={this.state.recruiters}
            // datas={parentStateRecruiters()}
            updateRecruitersx={this.updateRecruiters}
            // updateRecruitersx={this.updateQueryAll}
          />
        );
      case "Students":
        return (
          <StudentListComponent
            title={this.state.value}
            datas={this.state.students}
          />
        );
      case "Event Modification":
        return (
          <EventModification
            title={this.state.value}
            datas={this.state.events}
            updateEventsx={this.updateEvents}
          />
        );
      case "Basic Information Modification":
        // return console.log("Basic Info Component");
        return <BasicInformationModification title={this.state.value} />;
      case "Skills & Experience Modification":
        return <SkillsAndExperienceModification title={this.state.value} />;
      // return console.log("Skills & Experience Modification");
    }
  };

  updateQueryAll = async () => {
    await this.handleQueryAll();
  };

  updateRecruiters = async () => {
    await this.handleQueryAllRecruiters();
  };
  updateEvents = async () => {
    await this.handleQueryAllEvents();
  };
}
