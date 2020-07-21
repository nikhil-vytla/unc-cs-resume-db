import React, { Component, useState } from "react";
import {
  ToggleButton,
  ButtonGroup,
  Accordion,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import DetailedModal from "./DetailRecruiter";
import "./AdminView.css";

export class RecruiterListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { eventInput: "", uid: "" };
  }

  render(props) {
    let resumeAccess;
    const tempAllTheEvents = [
      "HackNC",
      "Pearl Hacks",
      "UNC Students",
      "Hackathon",
      "Carolina Data Challenge",
      "Queer_hack",
      "Global Game Jam",
      "HackReality",
      "AfroPix",
    ];

    function changeTwoStates(data, e) {
      this.setState({ uid: data.UID });
      this.setState({ eventInput: e.currentTarget.value });
    }

    function resumeChecker(data) {
      Object.entries(data).map((key, val) => {
        if (key.includes("Resume Access")) {
          resumeAccess = key[1];
          // console.log(key[1]);
          return key[1];
        }
      });
    }

    function ToggleButtonExample() {
      const [checked, setChecked] = useState(false);
      const [radioValue, setRadioValue] = useState("1");

      const radios = [
        { name: "Add", value: "1" },
        { name: "Remove", value: "2" },
      ];

      return (
        <div>
          <ButtonGroup toggle>
            <ToggleButton
              key="add"
              type="radio"
              variant="success"
              name="radio"
              value="add"
              checked={radioValue === radioValue.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              Add
            </ToggleButton>

            <ToggleButton
              key="remove"
              type="radio"
              variant="danger"
              name="radio"
              value="remove"
              checked={radioValue === radioValue.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              Remove
            </ToggleButton>
          </ButtonGroup>
        </div>
      );
    }

    return (
      <div>
        <Accordion defaultActiveKey="0">
          {this.props.datas.map((data, index) => (
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={data.UID}
                style={{ backgroundColor: "#E5E5E5", color: "Black" }}
              >
                <h3 className="recruiter-name">{data.Name}</h3>
                {resumeChecker(data)}
                {resumeAccess.map((item, inx) => (
                  // {data.(["Resume Access"]).map((item, inx) => (
                  <li className="resume-access-list" key={inx}>
                    {item}
                  </li>
                ))}
              </Accordion.Toggle>
              {/* <Accordion.Collapse eventKey="0"> */}
              <Accordion.Collapse eventKey={data.UID}>
                <div style={{ color: "Black" }}>
                  <Card.Title style={{ color: "Black", padding: "3%" }}>
                    <Form.Label>Email : {data.Email}</Form.Label>
                  </Card.Title>
                  <Card.Body>
                    <Form>
                      <InputGroup>
                        <FormControl
                          placeholder="Event to Add/Remove"
                          aria-label="Event to Add/Remove"
                          aria-describedby="basic-addon2"
                          onChange={(e) => changeTwoStates(data, e)}
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-success"
                            onClick={console.log(this.state.eventInput)}
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
          ))}
        </Accordion>
      </div>
    );
  }

  handleAdd = async (event) => {
    event.preventDefault();
    //add resume access
    // async removeResumeAccessToRecruiter {
    try {
      const FieldValue = this.db.firestore.FieldValue;
      const userRef = await this.db
        .collection("recruiters")
        .where("UID", "==", this.state.uid)
        .get();
      const res = await userRef.update({
        ["Resume Access"]: FieldValue.arrayUnion(this.state.eventInput),
      });
    } catch (err) {
      console.log(err);
    }
    // }
  };

  handleRemove = async (event) => {
    event.preventDefault();
    //Remove resume access
    // async removeResumeAccessToRecruiter(userID, resumeAccess) {
    try {
      const FieldValue = this.db.firestore.FieldValue;
      const userRef = await this.db
        .collection("recruiters")
        .where("UID", "==", this.state.uid)
        .get();
      const res = await userRef.update({
        ["Resume Access"]: FieldValue.arrayRemove(this.state.eventInput),
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export default RecruiterListComponent;
