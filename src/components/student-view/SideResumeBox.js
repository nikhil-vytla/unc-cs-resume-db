import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import pdf from "../../Static/ResumeTemplate.jpg";

export default class SideResumeBox extends Component {
  render() {
    this.state = {
      resumePDF: "",
    };
    return (
      // 290 by 460

      <Card
        className="SideResumeBoxCard"
        border="dark"
        style={{ height: "460px", width: "290px" }}
      >
        <img src={pdf} alt="" height="460" width="auto"></img>
      </Card>
    );
  }
}
