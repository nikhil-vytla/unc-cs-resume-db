import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class FileUpload extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      >
        <Form>
          <Form.Group>
            <Form.File id="exampleFormControlFile1" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
