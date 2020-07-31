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

class DatabaseSystems extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      dbSysInput: "",
      collection: "",
      doc: "",
      field: "",
      dbArr: [],
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
    const databaseSystemsHolder = await this.getListArrays(
      "Database Systems",
      "databaseSystems"
    );
    this.setState({
      dbArr: databaseSystemsHolder.databaseSystems,
    });
  };

  render() {
    return (
      <div>
        <Card key="dbSystems">
          <Accordion.Toggle
            as={Card.Header}
            eventKey="dbSystems"
            style={{ backgroundColor: "#E5E5E5", color: "Black" }}
          >
            <h3 className="card-name">Database Systems</h3>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="dbSystems">
            <div style={{ color: "Black" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="school modification">
                    <Form.Control
                      as="select"
                      onChange={(e) =>
                        this.setState({
                          dbSysInput: e.currentTarget.value,
                        })
                      }
                    >
                      <option>Select Database Systems</option>
                      {this.state.dbArr.map((eachOption) => (
                        <option key={eachOption}>{eachOption}</option>
                      ))}
                    </Form.Control>
                    <FormControl
                      placeholder="Database Systems to Add/Remove"
                      value={this.state.dbSysInput}
                      aria-label="Database Systems to Add/Remove"
                      aria-describedby="basic-addon2"
                      // key={data.UID}
                      key="dbSystems"
                      onChange={(e) =>
                        this.setState({
                          dbSysInput: e.currentTarget.value,
                        })
                      }
                    />
                  </Form.Group>
                  <InputGroup.Append>
                    <Button variant="outline-success" onClick={this.handleAdd}>
                      Add
                    </Button>
                    <Button
                      variant="outline-danger"
                      // onClick={console.log(this.state.dbSysInput)}
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

  handleAdd = async (event) => {
    event.preventDefault();
    //check if same item exist in the array before adding
    const index = this.state.dbArr.indexOf(this.state.dbSysInput);
    if (index > -1) {
      alert("exists at " + index);
      return;
    }
    this.state.dbArr.push(this.state.dbSysInput);
    console.log(this.state.dbArr);
    await this.Firebase.db
      .collection("Database Systems")
      .doc("databaseSystems")
      .update({
        ["databaseSystems"]: this.state.dbArr,
      })
      .catch((err) => console.log(err));
    this.handleUpdate();
  };

  //Remove resume access
  handleRemove = async (event) => {
    event.preventDefault();
    const index = this.state.dbArr.indexOf(this.state.dbSysInput);
    if (index > -1) {
      this.state.dbArr.splice(index, 1);
    }

    await this.Firebase.db
      .collection("Database Systems")
      .doc("databaseSystems")
      .update({
        ["databaseSystems"]: this.state.dbArr,
      })
      .catch((err) => console.log(err));

    this.handleUpdate();
  };

  handleUpdate = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(DatabaseSystems);
