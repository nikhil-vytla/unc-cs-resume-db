import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddIcon from "@material-ui/icons/Add";
import { withFirebase } from "../Firebase";

import axios from "axios";

// This component is responsible for adding a new list to a rectuiters my list section
// This component is only visible when a recruiter clicks the plus icon next to the MyLists Header
function MyListsForm({ Firebase, ...props }) {

  //Sets the initial list name to empty string 
  const [listName, setListName] = useState("");
  
  const handleChange = async (evt) => {
    evt.preventDefault();
    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: listName,
      recruiterUID: Firebase.auth.currentUser.uid,
    };
    if (listName !== null && listName !== "") {
      await axios.put(
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/newList",
        objToSend
      );
    }
    props.updateRecruiter();
  };

  return (
    <form
      className="d-flex justify-content-center align-items-center myListForm"
      onSubmit={handleChange}
    >
      <div>
        <div className="myListFormDiv d-flex justify-content-center">
          <label className="myListLabel">
            List Name
            <input
              className="myListInput"
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            ></input>
          </label>
          <Button className="myListSubmit" type="submit">
            <AddIcon className="submitIcon" />
          </Button>
        </div>
      </div>
    </form>
  );
}
export default withFirebase(MyListsForm);
