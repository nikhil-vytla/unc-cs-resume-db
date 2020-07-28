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
import { withFirebase } from "../../Firebase";

class MajorsCard extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventInput: "",
      reqSchoolName: "",
      collection: "",
      doc: "",
      field: "",
      majors: [],
    };
  }

  componentDidMount() {
    this.handleQueryAllData();
  }

  handleQueryAllData = async (e) => {
    const data = await this.Firebase.getAllMajors().catch((err) =>
      console.log(err)
    );
    this.setState({ majors: data[0].majorsList });
    // console.log(this.state.majors);
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
            <h3 className="recruiter-name">Majors</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="majors">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    {/* <Form.Label>Majors</Form.Label> */}
                    <Form.Control
                      as="select"
                      onChange={(e) =>
                        this.updateStates(
                          e.currentTarget.value,
                          "Majors",
                          "majorsList",
                          "majorsList"
                        )
                      }
                    >
                      <option>Select Major</option>
                      {this.state.majors.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <FormControl
                      placeholder="Majors to Add/Remove"
                      value={this.state.eventInput}
                      aria-label="Majors to Add/Remove"
                      aria-describedby="basic-addon2"
                      // key={data.UID}
                      key="majors"
                      onChange={(e) =>
                        this.updateStates(
                          e.currentTarget.value,
                          "Majors",
                          "majorsList",
                          "majorsList"
                        )
                      }
                    />
                  </Form.Group>
                  <InputGroup.Append>
                    <Button variant="outline-success" onClick={this.handleAdd}>
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
                </Form>
              </Card.Body>
            </div>
          </Accordion.Collapse>
        </Card>
      </div>
    );
  }

  updateStates = (input, coll, docName, field) => {
    this.setState({ eventInput: input });
    this.setState({ collection: coll });
    this.setState({ doc: docName });
    this.setState({ field: field });
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

export default withFirebase(MajorsCard);
