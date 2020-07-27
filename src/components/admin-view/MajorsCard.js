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

export class MajorsCard extends Component {
  constructor(props) {
    super(props);
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
    try {
      let data = await Firebase.getAllMajors();
      this.setState({ majors: data[0].majorsList });
      // console.log(this.state.majors);
    } catch (err) {
      console.error(err);
    }
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

export default MajorsCard;
