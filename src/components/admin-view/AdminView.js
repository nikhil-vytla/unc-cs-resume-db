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
    };
  }

  render() {
    function ToggleButtonExample() {
      const [radioValue, setRadioValue] = useState("1");
      const radios = [
        { name: "Recruiters", value: "1" },
        { name: "Students", value: "2" },
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

        <div className="full-panel">
          <Container fluid="true">
            <Row>
              <Col className="right-panel"></Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
