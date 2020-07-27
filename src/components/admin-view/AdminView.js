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
import {withFirebase} from "../Firebase";
import RecruiterListComponent from "./RecruiterListComponent";
import StudentListComponent from "./StudentListComponent";
import "./AdminView.css";

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      recruiters: [],
      students: [],
      value: "Recruiters",
    };
  }
  componentDidMount() {
    this.handleQueryAllRecruiters();
    this.handleQueryAllStudents();
  }

  handleQueryAllRecruiters = async (e) => {
    try {
      let data = await this.Firebase.getAllRecruiters();
      this.setState({ recruiters: data });
      // console.log(this.state.recruiters);
    } catch (err) {
      console.error(err);
    }
  };

  handleQueryAllStudents = async (e) => {
    try {
      let data = await this.Firebase.getAllStudents();
      this.setState({ students: data });
      // console.log(this.state.students);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const parentState = (e) => {
      e === "Recruiters"
        ? this.setState({ value: "Recruiters" })
        : this.setState({ value: "Students" });
      return this.state;
    };
    const parentStateRecruiters = () => {
      return this.state.recruiters;
    };
    const parentStateStudents = () => {
      return this.state.students;
    };

    function ToggleButtonGroup() {
      const [radioValue, setRadioValue] = useState("");
      const radios = [
        { name: "Recruiters", value: "Recruiters" },
        { name: "Students", value: "Students" },
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
                // onToggleQuery(e.currentTarget.value);
                parentState(e.currentTarget.value);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      );
    }
    function onToggleQuery(e) {
      e === "Recruiters"
        ? console.log(parentStateRecruiters())
        : console.log(parentStateStudents());
    }

    return (
      <div className="master-container">
        <ToggleButtonGroup />
        <Link to="/recruiter"></Link>
        <Button onClick={this.handleQuery} variant="info">
          Recruiter View
        </Button>
        {/* {console.log("state " + this.state.value)} */}
        <div className="full-panel">
          <Container fluid="true">
            <Row>
              <Col className="right-panel">
                {this.state.value === "Recruiters" ? (
                  <RecruiterListComponent
                    title={this.state.value}
                    datas={parentStateRecruiters()}
                  />
                ) : (
                  <StudentListComponent
                    title={this.state.value}
                    datas={parentStateStudents()}
                  />
                )}
                {/* <h2>{this.state.value}</h2> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  //  query handler
  handleQuery = async (e) => {
    try {
      // const result = await Firebase.runQuery();
      const result = await this.Firebase.getAllRecruiters();
      console.log(result);
      // alert("Check console for result");
    } catch (err) {
      console.log(err);
    }
  };
}

export default withFirebase(AdminView);
