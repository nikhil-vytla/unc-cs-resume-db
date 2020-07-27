import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FirebaseContext } from '../Firebase';
import axios from "axios";

export default class MultiSelect extends Component {
  static contextType = FirebaseContext;
  constructor(props) {
    super(props);
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
    //console.log(updatedOBJ);

    const objToSend = {
      //arrayList: array,
      uid: this.context.auth.currentUser.uid,
      valueToSend: this.props.valueType,
      //typeToSend: type,
      update: updatedOBJ,
    };

    // console.log(objToSend);

    await axios.put(
      "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/checkboxV2",
      objToSend
    );
    // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    // array.forEach(async (eachUpdate) => {
    //   try {
    //     const valuePlaceHolder = this.props.valueType;
    //     const currentState = eachUpdate;
    //     const currentObjString = `${valuePlaceHolder}.${currentState}`;

    //     await Firebase.db
    //       .collection("students")
    //       .doc(Firebase.auth.currentUser.uid)
    //       .update({
    //         [currentObjString]: type,
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   await delay(100);
    // });
  };

  handleUpload = async () => {
    // Goes through all of your toggled events
    // updates them in Firebase
    // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await this.firebaseUpdates(this.state.eventsToggled, true);
    // await delay(250);
    this.props.monitorChanges();
  };

  // removes items
  handleDelete = async () => {
    // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await this.firebaseUpdates(this.state.eventsToggled, false);
    //await delay(250);
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
      <InputGroup className="mb-3">
        <Form.Group controlId="ControlSelect1 checkBoxes">
          <div key={`default-checkbox`} className="mb-3 checkBoxes" >
            {optionOptions}
          </div>
          <Button variant="primary" className="multiBtn " onClick={this.handleUpload}>
            Update
          </Button>
        </Form.Group>
        
        <InputGroup.Append>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
