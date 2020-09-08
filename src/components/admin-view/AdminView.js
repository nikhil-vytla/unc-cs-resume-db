import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import SettingsIcon from "@material-ui/icons/Settings";

import { withFirebase } from "../Firebase";
import RecruiterListComponent from "./RecruiterListComponent";
import StudentListComponent from "./StudentListComponent";
import "./AdminView.css";
import EventModification from "./EventModification";
import BasicInformationModification from "./BasicInformationModification";
import SkillsAndExperienceModification from "./SkillsAndExperienceModification";

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      recruiters: [],
      students: [],
      events: [],
      value: "Recruiters",
      prevValue: "Recruiters",
    };
  }

  componentDidMount() {
    this.handleQueryAllRecruiters();
  }

  handleQueryAllRecruiters = async (e) => {
    const data = await this.Firebase.getAllRecruiters().catch((err) =>
      console.log(err)
    );
    this.setState({ recruiters: data });
  };
  render() {
    const parentState = (e) => {
      this.setState({ value: e });
    };

    const getParentState = () => {
      return this.state.value;
    };
    function ToggleButtonGroup() {
      const [radioValue, setRadioValue] = useState(getParentState());
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
        <div>
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
          <Link to="/adminAccountSettings">
            <SettingsIcon
              style={{ color: "white" }}
              className="settingsIcon"
              fontSize="large"
            />
          </Link>
          {/* <Button className="admin-setting"> Setting </Button> */}
        </div>
      );
    }

    return (
      <div className="admin-master-container">
        <ToggleButtonGroup />
        <Link to="/recruiter"></Link>
        <div className="admin-full-panel">
          <Container fluid="true">
            <Row>
              <Col className="admin-panel">
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
        // return <RecruitersListComponent title={this.state.value} />;
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
        return <BasicInformationModification title={this.state.value} />;
      case "Skills & Experience Modification":
        return <SkillsAndExperienceModification title={this.state.value} />;
      default:
        return;
    }
  };

  updateQueryAll = async () => {
    await this.handleQueryAll().catch((err) => console.log(err));
  };

  updateRecruiters = async () => {
    await this.handleQueryAllRecruiters().catch((err) => console.log(err));
  };

  updateEvents = async () => {
    await this.handleQueryAllEvents().catch((err) => console.log(err));
  };
}

export default withFirebase(AdminView);
