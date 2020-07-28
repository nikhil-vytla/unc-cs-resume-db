import React, { Component } from "react";
import {
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Accordion,
} from "react-bootstrap";
import { withFirebase } from "../Firebase";

class GraduationYearCard extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventInput: "",
      reqSchoolName: "",
      collection: "",
      doc: "",
      field: "",
      gradyr: [],
    };
  }

  componentDidMount() {
    this.handleQueryAllData();
  }

  handleQueryAllData = async (e) => {
    const data = await this.Firebase.getAllGraduationYear();
    this.setState({ gradyr: data[0].gradYearList }).catch((err) =>
      console.log(err)
    );
  };

  render() {
    return (
      <div>
        <Card key="gradyr">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="gradyr"
            style={{ backgroundColor: "#E5E5E5", color: "Black" }}
          >
            <h3 className="card-name">Graduation Year</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="gradyr">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    <Form.Control
                      as="select"
                      onChange={(e) =>
                        this.updateStates(
                          e.currentTarget.value,
                          "Graduation Year",
                          "gradYears",
                          "gradYearList"
                        )
                      }
                    >
                      <option>Select Graduation Year</option>
                      {this.state.gradyr.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <FormControl
                      placeholder="Graduation year to Add/Remove"
                      value={this.state.eventInput}
                      aria-label="Graduation year to Add/Remove"
                      aria-describedby="basic-addon2"
                      // key={data.UID}
                      key="gradyr"
                      onChange={(e) =>
                        this.updateStates(
                          e.currentTarget.value,
                          "Graduation Year",
                          "gradYears",
                          "gradYearList"
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

export default withFirebase(GraduationYearCard);
