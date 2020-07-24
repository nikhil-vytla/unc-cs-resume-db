import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Firebase from "../../Firebase.js";

export default class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsToggled: [],
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.firebaseUpdates = this.firebaseUpdates.bind(this);
  }

  // handleUpdate = (event) => {
  //   const currentVal = event.target.value;
  //   this.setState({
  //     update: currentVal,
  //   });
  //   console.log(currentVal);
  // };

  // intermediate function to help facilitate updates
  firebaseUpdates = async (array) => {
    array.forEach(async (eachUpdate) => {
      try {
        setTimeout(2500);
        const valuePlaceHolder = this.props.valueType;
        const currentState = eachUpdate;
        const currentObjString = `${valuePlaceHolder}.${currentState}`;

        await Firebase.db
          .collection("students")
          .doc(Firebase.auth.currentUser.uid)
          .update({
            [currentObjString]: true,
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  handleUpload = async () => {
    // checks to see if the stuff is nothing is toggled
    // if (this.state.eventsToggled == []) {
    //   alert(`Please select ${this.props.valueType} before pressing +`);
    //   return;
    // }

    // Goes through all of your toggled events
    // updates them in Firebase
    await this.firebaseUpdates(this.state.eventsToggled);
    this.props.monitorChanges();
  };

  // handleChangeForCheckbox = (event) => {
  //   if (event.target.checked) {
  //     const optionCheckboxList = this.props.optionArray.map((eachThing) => {
  //       return { name: eachThing, value: false };
  //     });
  //     this.setState({});
  //   } else if (event.target.checked == false) {
  //   }
  // };

  handleCheck = (event) => {
    if (event.target.checked) {
      let currentList = this.state.eventsToggled;
      currentList.push(event.target.value);
      this.setState({
        eventsToggled: currentList,
      });
    } else if (event.target.checked == false) {
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

  // componentDidMount() {
  //   const optionCheckboxList = this.props.optionArray.map((eachThing) => {
  //     return { name: eachThing, value: false };
  //   });
  //   //console.log(optionCheckboxList);
  //   this.setState({
  //     eventsToggled: optionCheckboxList,
  //   });
  // }

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
        <Form.Group controlId="ControlSelect1">
          <div key={`default-checkbox`} className="mb-3">
            {optionOptions}
          </div>
        </Form.Group>
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={this.handleUpload}>
            +
          </Button>
          {/* <Button variant="outline-secondary">-</Button> */}
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
