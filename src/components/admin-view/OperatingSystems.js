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

class OperatingSystems extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      opSystemInput: "",
      collection: "",
      doc: "",
      field: "",
      opSysArr: [],
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
    const opSysHolder = await this.getListArrays(
      "Operating Systems",
      "operatingSystems"
    );
    this.setState({
      opSysArr: opSysHolder.operatingSystems,
    });
  };

  render() {
    return (
      <div>
        <Card key="opSys">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="opSys"
            style={{ backgroundColor: "#E5E5E5", color: "Black" }}
          >
            <h3 className="admin-card-name">Operating Systems</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="opSys">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    <Form.Control
                      className="admin-input-box"
                      as="select"
                      onChange={(e) =>
                        this.setState({
                          opSystemInput: e.currentTarget.value,
                        })
                      }
                    >
                      <option>Select Operating Systems</option>
                      {this.state.opSysArr.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <InputGroup>
                      <FormControl
                        className="admin-input-box"
                        placeholder="Operating Systems to Add/Remove"
                        value={this.state.opSystemInput}
                        aria-label="Operating Systems to Add/Remove"
                        aria-describedby="basic-addon2"
                        // key={data.UID}
                        key="opSys"
                        onChange={(e) =>
                          this.setState({
                            opSystemInput: e.currentTarget.value,
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
    const index = this.state.opSysArr.indexOf(this.state.opSystemInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.opSysArr.push(this.state.opSystemInput);
    await this.Firebase.db
      .collection("Operating Systems")
      .doc("operatingSystems")
      .update({
        ["operatingSystems"]: this.state.opSysArr,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.opSysArr.indexOf(this.state.opSystemInput);
    if (index > -1) {
      this.state.opSysArr.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Operating Systems")
      .doc("operatingSystems")
      .update({
        ["operatingSystems"]: this.state.opSysArr,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(OperatingSystems);
