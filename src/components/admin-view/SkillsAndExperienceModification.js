import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import ProgrammingLanguageCard from "./ProgrammingLanguageCard";

export class SkillsAndExperienceModification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.handleQueryAllData();
  }

  handleQueryAllData = async (e) => {};

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Accordion defaultActiveKey="0">
          <ProgrammingLanguageCard />
        </Accordion>
      </div>
    );
  }
}

export default SkillsAndExperienceModification;
