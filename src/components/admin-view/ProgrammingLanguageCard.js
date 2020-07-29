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

class ProgrammingLanguageCard extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventInput: "",
      reqSchoolName: "",
      collection: "",
      doc: "",
      field: "",
      progLanguage: [],
    };
  }

  componentDidMount() {
    this.handleQueryAllData();
  }

  handleQueryAllData = async (e) => {
    const data = await this.Firebase.getAllProgrammingLanguages().catch((err) =>
      console.log(err)
    );
    this.setState({ progLanguage: data[0].progLanguages });
    // console.log(data);
  };

  render() {
    return (
      <div>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="programLanguage"
            style={{ backgroundColor: "#E5E5E5", color: "Black" }}
          >
            <h3 className="card-name">Programming Languages</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="programLanguage">
            <div style={{ color: "Black" }}>
              <Card.Title style={{ color: "Black", padding: "3%" }}>
                {/* {console.log(this.props.datas)} */}
                {this.state.progLanguage.map((dat, ind) => (
                  <li key={ind}>{dat}</li>
                ))}
              </Card.Title>
              <Card.Body>
                <Form>
                  <InputGroup>
                    <FormControl
                      placeholder="Programming Language to Add/Remove"
                      aria-label="Programming Language to Add/Remove"
                      aria-describedby="basic-addon2"
                      // key={data.UID}
                      key="progLang"
                      onChange={(e) =>
                        this.updateStates(e.currentTarget.value, "eventsList")
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

export default withFirebase(ProgrammingLanguageCard);
