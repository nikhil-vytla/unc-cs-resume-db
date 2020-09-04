import React, { useState, useEffect } from "react";
import { useTransition } from "react-spring";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { withFirebase } from "../Firebase";

function ResumeViewNotes({ Firebase, ...props }) {
  // Identical to the ResumeViewDropDowns Component except it displays a note section instead of a students skills
  const [collapsed, setCollapsed] = useState(false);

  const transitions = useTransition(collapsed, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });

  let icon = <AddIcon className="resumeViewDropDownIcon" />;
  let expandedView = null;

  useEffect(() => {
    async function sendingNotes() {
      console.log(props.sendNotes);
      if (props.sendNotes) {
        await axios.put(
          "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/addNotes",
          {
            currentRecruiterEmail: Firebase.auth.currentUser.email,
            studentID: props.studentUID,
            recruiterID: Firebase.auth.currentUser.uid,
            currentNotes: document.getElementById("notesTextArea").value,
          }
        );
      }
    }
    sendingNotes();
  }, []);

  if (!collapsed) {
    expandedView = (
      <div className="d-flex justify-content-start ">
        <textarea
          className="resumeViewNotes"
          id="notesTextArea"
          //onChange={(event) => setNotes(event.target.value)}
        >
          {props.recruiterNotes}
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
