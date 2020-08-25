import React, { Component, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { withFirebase } from "../Firebase";
import axios from "axios";
import { isThisTypeNode } from "typescript";

export class NewRecruiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recruiterName: "",
      recruiterEmail: "",
    };
  }
  render(props) {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Recruiter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="admin-new-recruiter-modal-form">
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="admin-new-recruiter-modal-form-input"
                type="name"
                onChange={(e) =>
                  this.setState({ recruiterName: e.currentTarget.value })
                }
                placeholder="Recruiter's Name"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="admin-new-recruiter-modal-form-input"
                type="email"
                onChange={(e) =>
                  this.setState({ recruiterEmail: e.currentTarget.value })
                }
                placeholder="Recruiter's email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleCreate = async () => {
    await axios
      .post(
        "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/newRecruiter",
        { email: this.state.recruiterEmail, name: this.state.recruiterName }
      )
      .catch((err) => console.log(err));

    this.props.update();
    this.props.onHide();
  };
}

export default withFirebase(NewRecruiter);
