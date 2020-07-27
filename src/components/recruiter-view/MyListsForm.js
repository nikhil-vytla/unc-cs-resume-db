import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import AddIcon from "@material-ui/icons/Add";
import {FirebaseContext} from "../Firebase";
import axios from "axios";

function MyListsForm(props) {
  const Firebase = useContext(FirebaseContext);
  const [listName, setListName] = useState("");
  const handleChange = async (evt) => {
    evt.preventDefault();
    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: listName,
      recruiterUID: Firebase.auth.currentUser.uid,
    };
    //console.log(objToSend);
    if (listName !== null && listName !== "") {
      await axios.put(
        "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/newList",
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
export default MyListsForm;
