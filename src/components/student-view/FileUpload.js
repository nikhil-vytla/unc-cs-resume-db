import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import SideResumeBox from "./SideResumeBox.js";
import Button from "react-bootstrap/Button";
import "./SideCard.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import MDBFileupload from "mdb-react-fileupload";

export default class FileUpload extends Component {
  render() {
    return (
      <div>
        <input type="file" id="file" ref="fileUploader" />
      </div>
    );
  }
}
