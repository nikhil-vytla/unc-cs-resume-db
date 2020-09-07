import React from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ClearIcon from "@material-ui/icons/Clear";
import ZoomInOutlinedIcon from "@material-ui/icons/ZoomInOutlined";
import { withFirebase } from "../Firebase";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";


function MyListsDropDownItem({ Firebase, ...props }) {
  async function handleZoom() {
    try {
      let data = await Firebase.getUserInfo(props.student.UID);
      props.toggleResumeView(data[0]);
    } catch {
      console.log("invalid uid");
    }
  }
  const handleDelete = async () => {
    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: props.listTitle,
      recruiterUID: Firebase.auth.currentUser.uid,
      currentRecruiterEmail: Firebase.auth.currentUser.email,
      student: {
        Email: props.student["Email"],
        "First Name": props.student["First Name"],
        "Last Name": props.student["Last Name"],
        UID: props.student["UID"],
        "Profile Image": props.student["Profile Image"],
      },
    };
    if (props.listTitle !== null && props.listTitle !== "") {
      await axios.put(
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/deleteStudent",
        objToSend
      );
    }
    props.updateRecruiter();
  };

  let profImg = null;
  if (props.student["Profile Image"] === "") {
    profImg = (
      <AccountCircleIcon
        className="rounded-circle myListsDropDownItemImg"
        style={{
          height: "36px",
          width: "36px",
        }}
      />
    );
  } else {
    profImg = (
      <img
        className="myListsDropDownItemImg"
        src={props.student["Profile Image"]}
        alt=""
      ></img>
    );
  }

  return (
    <div className="d-flex justify-content-between myListsItem">
      <div className="d-flex">
        {profImg}
        <h1 className="myListsDropDownItemName">
          {" "}
          {props.student["First Name"]} {props.student["Last Name"]}{" "}
        </h1>
      </div>
      <div>
        <ZoomInOutlinedIcon
          className="myListIcons"
          onClick={() => handleZoom()}
        />
        <a href={"mailto:" + props.student.Email} style={{ color: "#25282B" }}>
          <MailOutlineIcon className="myListIcons" />
        </a>
        <ClearIcon onClick={() => handleDelete()} className="myListIcons" />
      </div>
    </div>
  );
}
export default withFirebase(MyListsDropDownItem);
