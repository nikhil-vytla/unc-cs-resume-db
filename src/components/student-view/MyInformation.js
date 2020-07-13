import React, { Component } from "react";
import {
  Accordion,
  Card,
  Form,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./StudentView.css";

// export class MyInformation2 extends Component {
function MyInformation(props) {
  // render() {
  console.log(props);
  return (
    <div>
      <h3>My Information</h3>
      <div className="my-information-container">
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <h3>Basic Information</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div className="basic-information-form">
                <Form.Group>
                  <div className="data-row">
                    <Form.Row>
                      <Form.Label column lg={2}>
                        <div className="data-row-label">School</div>
                      </Form.Label>
                      <Col>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder={props.studentData[0].school}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                          />
                          <InputGroup.Append>
                            <Button variant="outline-secondary">+</Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Row>
                  </div>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Graduation Year
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder={props.studentData[0].graduatingyear}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                          <Button variant="outline-secondary">+</Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Label column lg={2}>
                      Major(s)
                    </Form.Label>
                    <Col>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder={props.studentData[0].major}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                          <Button variant="outline-secondary">+</Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </div>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <h3>Skills / Experience</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <h3>Events Attended</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
  // }
}

export default MyInformation;
