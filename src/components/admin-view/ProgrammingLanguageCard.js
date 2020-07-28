import React, { Component } from "react";
import {
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Accordion,
} from "react-bootstrap";
import Firebase from "../../Firebase";
import * as firebase from "firebase";

export class ProgrammingLanguageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventInput: "",
    };
  }
  componentDidMount() {
    this.handleQueryAllData();
  }
  handleQueryAllData = async (e) => {
    try {
      let data = await Firebase.getAllGraduationYear();
      this.setState({ gradyr: data[0].gradYearList });
      //   console.log(this.state.gradyr);
    } catch (err) {
      console.error(err);
    }
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
                {this.props.datas[1].eventsList.map((event, ind) => (
                  <li key={ind}>{event}</li>
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

export default ProgrammingLanguageCard;
