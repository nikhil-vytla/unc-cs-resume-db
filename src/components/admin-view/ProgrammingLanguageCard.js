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
      progLangInput: "",
      collection: "",
      doc: "",
      field: "",
      progLang: [],
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
    const progLangHolder = await this.getListArrays(
      "Programming Languages",
      "progLanguages"
    );
    this.setState({
      progLang: progLangHolder.progLanguages,
    });
  };

  render() {
    return (
      <div>
        <Card key="progLang">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="progLang"
            style={{ backgroundColor: "#E5E5E5", color: "Black" }}
          >
            <h3 className="admin-card-name">Programming Languages</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="progLang">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    <Form.Control
                      className="admin-input-box"
                      as="select"
                      onChange={(e) =>
                        this.setState({
                          progLangInput: e.currentTarget.value,
                        })
                      }
                    >
                      <option>Select Programming Languages</option>
                      {this.state.progLang.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <InputGroup>
                      <FormControl
                        className="admin-input-box"
                        placeholder="Programming Languages to Add/Remove"
                        value={this.state.progLangInput}
                        aria-label="Programming Languages to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="progLang"
                        onChange={(e) =>
                          this.setState({
                            progLangInput: e.currentTarget.value,
                          })
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
                          // onClick={console.log(this.state.progLangInput)}
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
    const index = this.state.progLang.indexOf(this.state.progLangInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.progLang.push(this.state.progLangInput);
    console.log(this.state.progLang);
    await this.Firebase.db
      .collection("Programming Languages")
      .doc("progLanguages")
      .update({
        ["progLanguages"]: this.state.progLang,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.progLang.indexOf(this.state.progLangInput);
    if (index > -1) {
      this.state.progLang.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Programming Languages")
      .doc("progLanguages")
      .update({
        ["progLanguages"]: this.state.progLang,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(ProgrammingLanguageCard);
