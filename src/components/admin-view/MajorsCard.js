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

class MajorsCard extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      majorInput: "",
      collection: "",
      doc: "",
      field: "",
      majors: [],
    };
  }

  componentDidMount() {
    this.handleQueryAllData();
  }

  getListArrays = async (collection, doc) => {
    const data = await this.Firebase.db.collection(collection).doc(doc).get();
    return data.data();
  };
  handleQueryAllData = async (e) => {
    const majorsHolder = await this.getListArrays("Majors", "majorsList");
    this.setState({
      majors: majorsHolder.majorsList,
    });
  };

  render() {
    return (
      <div>
        <Card key="majors">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="majors"
            style={{ backgroundColor: "#E5E5E5", color: "Black" }}
          >
            <h3 className="admin-card-name">Majors</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="majors">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    {/* <Form.Label>Majors</Form.Label> */}
                    <Form.Control
                      className="admin-input-box"
                      as="select"
                      onChange={(e) =>
                        this.setState({ majorInput: e.currentTarget.value })
                      }
                    >
                      <option>Select Major</option>
                      {this.state.majors.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <InputGroup>
                      <FormControl
                        className="admin-input-box"
                        placeholder="Majors to Add/Remove"
                        value={this.state.majorInput}
                        aria-label="Majors to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="majors"
                        onChange={(e) =>
                          this.setState({ majorInput: e.currentTarget.value })
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
                  </Form.Group>
                </Form>
              </Card.Body>
            </div>
          </Accordion.Collapse>
        </Card>
      </div>
    );
  }

  handleAdd = async (event) => {
    event.preventDefault();
    //check if same item exist in the array before adding
    const index = this.state.majors.indexOf(this.state.majorInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.majors.push(this.state.majorInput);
    await this.Firebase.db
      .collection("Majors")
      .doc("majorsList")
      .update({
        ["majorsList"]: this.state.majors,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.majors.indexOf(this.state.majorInput);
    if (index > -1) {
      this.state.majors.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Majors")
      .doc("majorsList")
      .update({
        ["majorsList"]: this.state.majors,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(MajorsCard);
