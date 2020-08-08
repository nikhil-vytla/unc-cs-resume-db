import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import MajorsCard from "./MajorsCard";
import SchoolsCard from "./SchoolsCard";
import GraduationYearCard from "./GraduationYearCard";

export class BasicInformationModification extends Component {
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
            <SchoolsCard />
            <MajorsCard />
            <GraduationYearCard />
          </Accordion>
        </div>
      </div>
    );
  }
}

export default BasicInformationModification;
