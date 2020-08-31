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
      schoolInput: "",
      reqSchoolName: "",
      schools: [],
      schoolsRequest: [],
    };
  }

  async componentDidMount() {
    this.handleQueryAllData();
  }

  getListArrays = async (collection, doc) => {
    const data = await this.Firebase.db.collection(collection).doc(doc).get();
    return data.data();
  };
  handleQueryAllData = async (e) => {
    const schoolsHolder = await this.getListArrays("Schools", "SchoolsList");
    this.setState({
      schools: schoolsHolder.schoolsList,
    });
    const requestedSchoolsHolder = await this.getListArrays(
      "Schools",
      "RequestedSchools"
    );
    this.setState({
      schoolsRequest: requestedSchoolsHolder.schoolsList,
    });
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
              <h3 className="admin-card-name">Schools</h3>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="schools">
              <div style={{ color: "Black" }}>
                <Card.Body>
                  <Form>
                    <Form.Group controlId="school modification">
                      <Form.Label>Current Schools</Form.Label>
                      <Form.Control
                        className="admin-input-box"
                        as="select"
                        onChange={(e) =>
                          this.setState({ schoolInput: e.currentTarget.value })
                        }
                      >
                        <option>Select School</option>
                        {this.state.schools.map((eachOption) => (
                          <option key={eachOption}>{eachOption}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <InputGroup>
                      <FormControl
                        className="admin-input-box"
                        placeholder="Schools to Add/Remove"
                        value={this.state.schoolInput}
                        aria-label="Schools to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="schools"
                        onChange={(e) =>
                          this.setState({ schoolInput: e.currentTarget.value })
                        }
                      />

                      <InputGroup.Append>
                        <Button
                          variant="outline-success"
                          onClick={this.handleAdd}
                        >
                          Add
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={this.handleRemove}
                        >
                          Remove
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>

                    <Form.Group controlId="school request modification">
                      <Form.Label>Requested Schools</Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="admin-input-box"
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

                        <InputGroup.Append>
                          <Button
                            variant="outline-success"
                            //   onClick={this.handleAdd}
                            onClick={this.handleRequestAdd}
                          >
                            Add
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={this.handleRequestRemove}
                          >
                            Remove
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </div>
            </Accordion.Collapse>
          </Card>
        </div>
      </div>
    );
  }

  handleRequestAdd = async (event) => {
    event.preventDefault();
    //adding requested schhol to current schhol list
    this.state.schools.push(this.state.reqSchoolName);
    await this.Firebase.db
      .collection("Schools")
      .doc("SchoolsList")
      .update({
        ["schoolsList"]: this.state.schools,
      })
      .catch((err) => console.log(err));
    //removing recently added school from requested schhool list
    this.handleRequestRemove();

    this.handleUpdate();
  };

  handleRequestRemove = async () => {
    const index = this.state.schoolsRequest.indexOf(this.state.reqSchoolName);
    if (index > -1) {
      this.state.schoolsRequest.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Schools")
      .doc("RequestedSchools")
      .update({
        ["schoolsList"]: this.state.schoolsRequest,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  handleAdd = async (event) => {
    event.preventDefault();
    //check if same item exist in the array before adding
    const index = this.state.schools.indexOf(this.state.schoolInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.schools.push(this.state.schoolInput);
    await this.Firebase.db
      .collection("Schools")
      .doc("SchoolsList")
      .update({
        ["schoolsList"]: this.state.schools,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.schools.indexOf(this.state.schoolInput);
    if (index > -1) {
      this.state.schools.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Schools")
      .doc("SchoolsList")
      .update({
        ["schoolsList"]: this.state.schools,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(SchoolsCard);
