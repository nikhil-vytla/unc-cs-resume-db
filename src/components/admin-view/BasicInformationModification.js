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

  componentDidMount() {
    this.handleQueryAllData();
  }

  handleQueryAllData = async (e) => {};

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Accordion defaultActiveKey="0">
          <SchoolsCard />
          <MajorsCard />
          <GraduationYearCard />
        </Accordion>
      </div>
    );
  }
}

export default BasicInformationModification;
