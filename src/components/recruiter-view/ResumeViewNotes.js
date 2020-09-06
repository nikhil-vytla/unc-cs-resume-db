import React, { useState, useEffect } from "react";
import { useTransition } from "react-spring";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { withFirebase } from "../Firebase";

function ResumeViewNotes({ Firebase, ...props }) {
  // Identical to the ResumeViewDropDowns Component except it displays a note section instead of a students skills
  const [collapsed, setCollapsed] = useState(false);
  const [notes, setNotes] = useState(props.recruiterNotes);
  const transitions = useTransition(collapsed, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });

  let icon = <AddIcon className="resumeViewDropDownIcon" />;
  let expandedView = null;

  let saveBar = null;

  async function sendNotes() {
    await axios.put(
      "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/addNotes",
      {
        currentRecruiterEmail: Firebase.auth.currentUser.email,
        studentID: props.studentUID,
        recruiterUID: Firebase.auth.currentUser.uid,
        currentNotes: notes,
      }
    );
    saveBar = null;
    props.updateRecruiter();
  }

  if (escape(notes) !== escape(props.recruiterNotes)) {
    saveBar = (
      <div
        className="savingNotesDiv"
        style={{
          backgroundColor: "#EF426F",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
        }}
      >
        <SaveIcon onClick={() => sendNotes()} style={{ color: "white" }} />
        <div className="unsavedSpanDiv" style={{ marginRight: "1vw" }}>
          <span style={{ color: "white" }}>You have unsaved changes</span>
        </div>
      </div>
    );
  } else {
    saveBar = null;
  }

  if (!collapsed) {
    expandedView = (
      <div
        className="d-flex justify-content-start "
        style={{ flexDirection: "column" }}
      >
        {saveBar}
        <textarea
          className="resumeViewNotes"
          id="notesTextArea"
          onChange={(event) => setNotes(event.target.value)}
        >
          {notes}
        </textarea>
      </div>
    );
    icon = <RemoveIcon className="resumeViewDropDownIcon" />;
  }

  return (
    <div>
      <div
        className="resumeViewDropDownDiv"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h1 className="BreeSerif resumeViewDropDownText"> {props.text} </h1>
        {icon}
      </div>
      {expandedView}
    </div>
  );
}
export default withFirebase(ResumeViewNotes);
