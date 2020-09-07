
import React, { useState, useEffect } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import RecruiterViewDropDown from "./RecruiterViewDropDown";
import ResumeViewDropDownText from "./ResumeViewDropDownText";
import { withFirebase } from "../Firebase";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";


import ResumeViewNotes from "./ResumeViewNotes";

function ResumeView({ Firebase, ...props }) {
  const frameWorks = props.candidate["Frameworks and Tools"];
  const databaseSystems = props.candidate["Database System"];
  const programmingLanguages = props.candidate["Programming Languages"];
  const operatingSystems = props.candidate["Operating Systems"];
  const events = props.candidate["Events"];
  const primaryMajor = props.candidate["Primary Major"];
  const secondaryMajor = props.candidate["Secondary Major"];
  const minors = [props.candidate.Minors];
  const notesUID = props.candidate["UID"];



  let star;
  if (props.recruiterInfo.Lists.Favorites.filter((item) => item["Email"] === props.candidate["Email"]).length === 0) {
    star = (
      <StarBorderOutlinedIcon
        fontSize="large"
        onClick={() => addFavorite()}
      />
    );
  } else {
    star = (
      <StarIcon
        onClick={() => removeFavorite()}
        fontSize="large"
        style={{ color: "#4B9CD3" }}
      />
    );
  }

  //adds a student to favorites list
  async function addFavorite() {
    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: "Favorites",
      recruiterUID: Firebase.auth.currentUser.uid,
      currentRecruiterEmail: Firebase.auth.currentUser.email,
      student: {
        Email: props.candidate["Email"],
        "First Name": props.candidate["First Name"],
        "Last Name": props.candidate["Last Name"],
        UID: props.candidate["UID"],
        "Profile Image": props.candidate["Profile Image"],
      },


    };


    // Adds a student to the list if the list does not already have a student
    if (props.recruiterInfo.Lists.Favorites.filter((item) => item["Email"] === props.candidate["Email"]).length === 0) {
      await axios.put(
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/addStudent",
        objToSend
      );
    }
    props.updateRecruiter();

  }


  async function removeFavorite() {

    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: "Favorites",
      recruiterUID: Firebase.auth.currentUser.uid,
      currentRecruiterEmail: Firebase.auth.currentUser.email,
      student: {
        Email: props.candidate["Email"],
        "First Name": props.candidate["First Name"],
        "Last Name": props.candidate["Last Name"],
        UID: props.candidate["UID"],
        "Profile Image": props.candidate["Profile Image"],
      },
    };

    if (props.recruiterInfo.Lists.Favorites.filter((item) => item["Email"] === props.candidate["Email"]).length === 1) {
      await axios.put(
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/deleteStudent",
        objToSend
      );
    }
    props.updateRecruiter();
  }



  return (
    <div className="resumeViewDiv">
      <div className="d-flex justify-content-end ">
        <div className=" resumeViewNav">
          {star}
          <a
            href={"mailto:" + props.candidate["Email"]}
            style={{ color: "black" }}
          >
            <MailOutlineIcon fontSize="large" />
          </a>
          <ClearIcon
            fontSize="large"
            onClick={() => props.toggleResumeView(props.candidate)}
          />
        </div>
      </div>
      <div className="w-100 d-flex">
        <div className="resumeViewImageDiv">
          <iframe
            className="resumeImage"
            src={props.candidate["Resume PDF"]}
            alt=""
          ></iframe>
        </div>
        <div className="resumeViewRightPanel">
          <div className="resumeViewHeader">
            <h1
              style={{
                fontSize: "30px",
                lineHeigt: "40px",
                marginBottom: "0px",
              }}
              className="BreeSerif"
            >
              {props.candidate["First Name"]} {props.candidate["Last Name"]}
            </h1>
            <div className="d-flex justify-content-between classInfoDiv">
              <h1
                style={{
                  fontSize: "25px",
                  color: "#000000",
                  lineHeight: "40px",
                  paddingLeft: "5px",
                }}
              >
                {" "}
                {props.candidate["Graduation Year"]}{" "}
              </h1>
              <h1
                style={{
                  fontSize: "25px",
                  color: "#000000",
                  lineHeight: "40px",
                  paddingRight: "5px",
                }}
              >
                {" "}
                {props.candidate.School}{" "}
              </h1>
            </div>
          </div>
          <div className="resumeViewDropDowns">
            {/* provides a view of a students different attributes */}
            <RecruiterViewDropDown
              text="Frameworks and Tools"
              items={frameWorks}
            />
            <RecruiterViewDropDown
              text="Database Systems"
              items={databaseSystems}
            />
            <RecruiterViewDropDown
              text="Programming Languages"
              items={programmingLanguages}
            />
            <RecruiterViewDropDown
              text="Operating Systems"
              items={operatingSystems}
            />

            <RecruiterViewDropDown text="Events" items={events} />
            <ResumeViewDropDownText text="Primary Major" items={primaryMajor} />
            <ResumeViewDropDownText
              text="Secondary Major"
              items={secondaryMajor}
            />
            <RecruiterViewDropDown text="Minors" items={minors} />
            <ResumeViewNotes
              text="Notes"
              studentUID={notesUID}
              recruiterNotes={
                props.recruiterInfo["Notes"] == null
                  ? ""
                  : props.recruiterInfo["Notes"][notesUID] == null
                    ? ""
                    : props.recruiterInfo["Notes"][notesUID]
              }
              updateRecruiter={() => props.updateRecruiter()}
            //   condition1 ? value1
            //  : condition2 ? value2
            //  : condition3 ? value3
            //     : value4;
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(ResumeView);
