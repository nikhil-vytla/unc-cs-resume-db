import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import ProgrammingLanguageCard from "./ProgrammingLanguageCard";
import FrameworksAndTools from "./FrameworksAndTools";
import OperatingSystems from "./OperatingSystems";
import DatabaseSystems from "./DatabaseSystems";

export class SkillsAndExperienceModification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2 className="admin-heading">{this.props.title}</h2>
        <div className="admin-card-accordion-toggle">
          <Accordion defaultActiveKey="0">
            <ProgrammingLanguageCard />
            <FrameworksAndTools />
            <OperatingSystems />
            <DatabaseSystems />
          </Accordion>
        </div>
      </div>
    );
  }
}

export default SkillsAndExperienceModification;
