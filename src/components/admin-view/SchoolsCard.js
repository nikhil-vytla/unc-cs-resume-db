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
import { withFirebase } from "../Firebase";

class SchoolsCard extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventInput: "",
      reqSchoolName: "",
      collection: "",
      doc: "",
      field: "",
      schools: [],
      schoolsRequest: [],
    };
  }

  componentDidMount() {
    this.handleQueryAllData();
  }

  handleQueryAllData = async (e) => {
    const data = await this.Firebase.getAllSchools().catch((err) =>
      console.log(err)
    );
    this.setState({ schools: data[1].schoolsList });
    this.setState({ schoolsRequest: data[0].schoolsList });
  };

  render() {
    return (
      <div>
        <div>
          <h2>{this.props.title}</h2>
          <Card key="currentSchool">
            <Accordion.Toggle
              as={Card.Header}
              eventKey="schools"
              style={{ backgroundColor: "#E5E5E5", color: "Black" }}
            >
              <h3 className="recruiter-name">Schools</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="schools">
              <div style={{ color: "Black" }}>
                <Card.Body>
                  <Form>
                    <Form.Group controlId="school modification">
                      <Form.Label>Current Schools</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) =>
                          this.updateStates(
                            e.currentTarget.value,
                            "Schools",
                            "SchoolsList",
                            "schoolsList"
                          )
                        }
                      >
                        <option>Select School</option>
                        {this.state.schools.map((eachOption) => (
                          <option key={eachOption}>{eachOption}</option>
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
                        onChange={(e) =>
                          this.setState({
                            reqSchoolName: e.currentTarget.value,
                          })
                        }
                      >
                        <option>Select School</option>
                        {this.state.schoolsRequest.map((eachOption) => (
                          <option key={eachOption}>{eachOption}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <InputGroup>
                      <InputGroup.Append>
                        <Button
                          variant="outline-success"
                          //   onClick={this.handleAdd}
                          onClick={this.handleAddRequest}
                        >
                          Add
                        </Button>
                        <Button
                          variant="outline-danger"
                          // onClick={console.log(this.state.eventInput)}
                          onClick={this.handleRemoveRequest}
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
        </div>
      </div>
    );
  }

  updateStates = (input, coll, docName, field) => {
    this.setState({ eventInput: input });
    this.setState({ collection: coll });
    this.setState({ doc: docName });
    this.setState({ field: field });
    // {
    //   console.log("schools");
    //   console.log(this.state.schools);
    //   console.log("schools Request");
    //   console.log(this.state.schoolsRequest);
    // }
  };

  handleAddRequest = async (event) => {
    event.preventDefault();
    console.log(this.state.reqSchoolName);
    await this.Firebase.db
      .collection("Schools")
      .doc("SchoolsList")
      .update({
        ["schoolsList"]: this.Firebase.firestore.FieldValue.arrayUnion(
          this.state.reqSchoolName
        ),
      })
      .catch((err) => console.log(err));

    await this.Firebase.db
      .collection("Schools")
      .doc("RequestedSchools")
      .update({
        ["schoolsList"]: this.Firebase.firestore.FieldValue.arrayRemove(
          this.state.reqSchoolName
        ),
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  handleRemoveRequest = async (event) => {
    event.preventDefault();
    console.log(this.state.reqSchoolName);
    await this.Firebase.db
      .collection("Schools")
      .doc("RequestedSchools")
      .update({
        ["schoolsList"]: this.Firebase.firestore.FieldValue.arrayRemove(
          this.state.reqSchoolName
        ),
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  handleAdd = async (event) => {
    event.preventDefault();
    await this.Firebase.db
      .collection(this.state.collection)
      .doc(this.state.doc)
      .update({
        [this.state.field]: this.Firebase.firestore.FieldValue.arrayUnion(
          this.state.eventInput
        ),
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    await this.Firebase.db
      .collection(this.state.collection)
      .doc(this.state.doc)
      .update({
        [this.state.field]: this.Firebase.firestore.FieldValue.arrayRemove(
          this.state.eventInput
        ),
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(SchoolsCard);
