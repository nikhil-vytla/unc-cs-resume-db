import React, { Component } from "react";
import {
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  Accordion,
  DropdownButton,
} from "react-bootstrap";
import Firebase from "../../Firebase";
import * as firebase from "firebase";

export class BasicInformationModification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventInput: "",
      collection: "",
      doc: "",
      field: "",
      graduationYear: [],
      majors: [],
      schools: [],
      schoolsRequest: [],
    };
  }

  componentDidMount() {
    this.handleQueryAllData();
  }
  handleQueryAllData = async (e) => {
    try {
      let data = await Firebase.getAllGraduationYear();
      this.setState({ graduationYear: data });
      data = await Firebase.getAllMajors();
      this.setState({ majors: data });
      data = await Firebase.getAllSchools();
      this.setState({ schools: data[1].schoolsList });
      this.setState({ schoolsRequest: data[0].schoolsList });
      //   {
      //     console.log("gradyr");
      //     console.log(this.state.graduationYear);
      //     console.log("majors");
      //     console.log(this.state.majors);
      //     console.log("schools");
      //     console.log(this.state.schools);
      //     console.log("schools Request");
      //     console.log(this.state.schoolsRequest);
      //   }
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="schools"
              style={{ backgroundColor: "#E5E5E5", color: "Black" }}
            >
              <h3 className="recruiter-name">Schools</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="schools">
              <div style={{ color: "Black" }}>
                <Card.Title
                  style={{ color: "Black", padding: "3%" }}
                ></Card.Title>
                <Card.Body>
                  <Form>
                    <Form.Group controlId="school modification">
                      <Form.Label>Current Schools</Form.Label>
                      <Form.Control
                        as="select"
                        //   onChange={(e) => console.log(e.currentTarget.value)}
                        onChange={(e) =>
                          this.setState({ eventInput: e.currentTarget.value })
                        }
                      >
                        {this.state.schools.map((eachOption) => (
                          <option>{eachOption}</option>
                        ))}
                      </Form.Control>
                      <FormControl
                        placeholder="Schools to Add/Remove"
                        value={this.state.eventInput}
                        aria-label="Schools to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="schools"
                        onChange={(e) =>
                          this.updateStates(
                            e.currentTarget.value,
                            "Schools",
                            "SchoolsList",
                            "schoolsList"
                          )
                        }
                      />
                    </Form.Group>
                    <InputGroup.Append>
                      <Button
                        variant="outline-success"
                        onClick={this.handleAdd}
                      >
                        Add
                      </Button>
                      <Button
                        variant="outline-danger"
                        // onClick={console.log(this.state.eventInput)}
                        onClick={this.handleRemove}
                      >
                        Remove
                      </Button>
                    </InputGroup.Append>
                    <Form.Group controlId="school request modification">
                      <Form.Label>Requested Schools</Form.Label>
                      <Form.Control
                        as="select"
                        //   onChange={(e) => console.log(e.currentTarget.value)}
                        onChange={(e) =>
                          this.setState({ eventInput: e.currentTarget.value })
                        }
                      >
                        {this.state.schoolsRequest.map((eachOption) => (
                          <option>{eachOption}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <InputGroup>
                      <InputGroup.Append>
                        <Button
                          variant="outline-success"
                          onClick={this.handleAdd}
                        >
                          Add
                        </Button>
                        <Button
                          variant="outline-danger"
                          // onClick={console.log(this.state.eventInput)}
                          onClick={this.handleRemove}
                        >
                          Remove
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form>
                </Card.Body>
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
  updateStates = (input, coll, docName, field) => {
    this.setState({ eventInput: input });
    this.setState({ doc: docName });
    this.setState({ collection: coll });
    this.setState({ field: field });
  };

  handleAdd = async (event) => {
    event.preventDefault();
    try {
      const res = await Firebase.db
        .collection(this.state.collection)
        .doc(this.state.doc)
        .update({
          [this.state.field]: firebase.firestore.FieldValue.arrayUnion(
            this.state.eventInput
          ),
        });
      this.handleUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    try {
      const res = await Firebase.db
        .collection(this.state.collection)
        .doc(this.state.doc)
        .update({
          [this.state.field]: firebase.firestore.FieldValue.arrayRemove(
            this.state.eventInput
          ),
        });
      this.handleUpdate();
    } catch (err) {
      console.log(err);
    }
  };
  handleUpdate = async () => {
    await this.handleQueryAllData();
  };
}

export default BasicInformationModification;
