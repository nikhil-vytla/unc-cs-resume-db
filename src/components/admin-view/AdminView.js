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
import CardComponent from "./CardComponent";
import ListComponent from "./ListComponent";

export default class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      value: "",
    };
  }

  render() {
    let val;
    function ToggleButtonExample() {
      const [radioValue, setRadioValue] = useState("Recruiters");
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
                console.log(e.currentTarget.value);
                val = e.currentTarget.value;
                setStateValue(e.currentTarget.value);
                setRadioValue(e.currentTarget.value);
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
        <ToggleButtonExample />
        <Link to="/recruiter">
          <Button variant="info">Recruiter View</Button>
        </Link>
        {console.log(this.state.value)}
        <div className="full-panel">
          <Container fluid="true">
            <Row>
              <Col className="right-panel">
                <h2>{val}</h2>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
