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
      gradYearInput: "",
      collection: "",
      doc: "",
      field: "",
      gradyr: [],
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
    const gradYearHolder = await this.getListArrays(
      "Graduation Year",
      "gradYears"
    );
    this.setState({
      gradyr: gradYearHolder.gradYearList,
    });
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
            <h3 className="admin-card-name">Graduation Year</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="gradyr">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    <Form.Control
                      className="admin-input-box"
                      as="select"
                      onChange={(e) =>
                        this.setState({
                          gradYearInput: e.currentTarget.value,
                        })
                      }
                    >
                      <option>Select Graduation Year</option>
                      {this.state.gradyr.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <InputGroup>
                      <FormControl
                        className="admin-input-box"
                        placeholder="Graduation year to Add/Remove"
                        value={this.state.gradYearInput}
                        aria-label="Graduation year to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="gradyr"
                        onChange={(e) =>
                          this.setState({
                            gradYearInput: e.currentTarget.value,
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
                          // onClick={console.log(this.state.gradYearInput)}
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
    const index = this.state.gradyr.indexOf(this.state.gradYearInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.gradyr.push(this.state.gradYearInput);
    console.log(this.state.gradyr);
    await this.Firebase.db
      .collection("Graduation Year")
      .doc("gradYears")
      .update({
        ["gradYearList"]: this.state.gradyr,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.gradyr.indexOf(this.state.gradYearInput);
    if (index > -1) {
      this.state.gradyr.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Graduation Year")
      .doc("gradYears")
      .update({
        ["gradYearList"]: this.state.gradyr,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(GraduationYearCard);
