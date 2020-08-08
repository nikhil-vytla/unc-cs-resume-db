import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { withFirebase } from "../Firebase";
import axios from "axios";

class MinorsCheckboxes extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      eventsToggled: [],
    };
  }

  // intermediate function to help facilitate updates
  firebaseUpdates = async (array, type) => {
    let updatedOBJ = {};
    array.forEach((element) => {
      updatedOBJ[element] = type;
    });

    const objToSend = {
      uid: this.Firebase.auth.currentUser.uid,
      valueToSend: this.props.valueType,
      update: updatedOBJ,
    };

    await axios.put(
      "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/checkboxV2",
      objToSend
    );
  };

  handleUpload = async () => {
    // Goes through all of your toggled events
    // updates them in Firebase
    await this.firebaseUpdates(this.state.eventsToggled, true);
    this.props.monitorChanges();
  };

  // removes items
  handleDelete = async () => {
    await this.firebaseUpdates(this.state.eventsToggled, false);
    this.props.monitorChanges();
  };

  handleCheck = (event) => {
    if (event.target.checked) {
      let currentList = this.state.eventsToggled;
      currentList.push(event.target.value);
      this.setState({
        eventsToggled: currentList,
      });
    } else if (event.target.checked === false) {
      let currentList = this.state.eventsToggled;
      const indexToRemove = currentList.indexOf(event.target.value);
      if (indexToRemove > -1) {
        currentList.splice(indexToRemove, 1);
      }
      this.setState({
        eventsToggled: currentList,
      });
    }
  };

  render() {
    const optionOptions = this.props.optionArray.map((eachOption) => (
      <Form.Check
        type="checkbox"
        id={`default-checkbox`}
        value={eachOption}
        label={eachOption}
        onClick={this.handleCheck}
      />
    ));

    return (
      // <div>
      <InputGroup
        className="mb-3"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Group
          controlId="ControlSelect1 checkBoxes"
          style={{ maxHeight: "40vh", overflowY: "scroll" }}
        >
          <div key={`default-checkbox`} className="mb-3 checkBoxes">
            {optionOptions}
          </div>
        </Form.Group>
        <Button
          variant="primary"
          className="multiBtn"
          onClick={this.handleUpload}
        >
          Update
        </Button>
      </InputGroup>

      // {/* </div> */}
    );
  }
}

export default withFirebase(MinorsCheckboxes);
