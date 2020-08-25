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

class FrameworksAndTools extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      frameworkAndToolsInput: "",
      collection: "",
      doc: "",
      field: "",
      fAndtArr: [],
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
    const frameworksAndToolsHolder = await this.getListArrays(
      "Frameworks and Tools",
      "frameworksAndTools"
    );
    this.setState({
      fAndtArr: frameworksAndToolsHolder.frameworksAndTools,
    });
  };

  render() {
    return (
      <div>
        <Card key="frameworkAndToolsArr">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="frameworkAndToolsArr"
            style={{ backgroundColor: "#E5E5E5", color: "Black" }}
          >
            <h3 className="admin-card-name">Frameworks And Tools</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="frameworkAndToolsArr">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    <Form.Control
                      className="admin-input-box"
                      as="select"
                      onChange={(e) =>
                        this.setState({
                          frameworkAndToolsInput: e.currentTarget.value,
                        })
                      }
                    >
                      <option>Select Frameworks And Tools</option>
                      {this.state.fAndtArr.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <InputGroup>
                      <FormControl
                        className="admin-input-box"
                        placeholder="Frameworks And Tools to Add/Remove"
                        value={this.state.frameworkAndToolsInput}
                        aria-label="Frameworks And Tools to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="frameworkAndToolsArr"
                        onChange={(e) =>
                          this.setState({
                            frameworkAndToolsInput: e.currentTarget.value,
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
                          // onClick={console.log(this.state.frameworkAndToolsInput)}
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
    const index = this.state.fAndtArr.indexOf(
      this.state.frameworkAndToolsInput
    );
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.fAndtArr.push(this.state.frameworkAndToolsInput);
    // console.log(this.state.fAndtArr);
    await this.Firebase.db
      .collection("Frameworks and Tools")
      .doc("frameworksAndTools")
      .update({
        ["frameworksAndTools"]: this.state.fAndtArr,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.fAndtArr.indexOf(
      this.state.frameworkAndToolsInput
    );
    if (index > -1) {
      this.state.fAndtArr.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Frameworks and Tools")
      .doc("frameworksAndTools")
      .update({
        ["frameworksAndTools"]: this.state.fAndtArr,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(FrameworksAndTools);
