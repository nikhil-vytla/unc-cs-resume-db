import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/Star";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CandidateCardTag from "./CandidateCardTag";
import "./recruiterViewCss/candidates.css";
import CandidateCardAdd from "./CandidateCardAdd";
import { withFirebase } from "../Firebase";
import axios from "axios";


function CandidateCard({ Firebase, ...props }) {




  const [starToggle, setStarToggle] = useState(props.recruiter[0].Lists.Favorites.filter((item) => item["Email"] === props.info["Email"]).length === 1);


  let primaryMajor;
  if (props.info["Primary Major"] !== "") {
    primaryMajor = (
      <p className="recruiterViewTag BreeSerif">
        {" "}
        {props.info["Primary Major"]}
      </p>
    );
  } else {
    primaryMajor = null;
  }

  let secondaryMajor;
  if (props.info["Secondary Major"] !== "") {
    secondaryMajor = (
      <p className="recruiterViewTag BreeSerif">
        {" "}
        {props.info["Secondary Major"]}
      </p>
    );
  } else {
    secondaryMajor = null;
  }
  let schoolName;
  if (props.info["School"] === "UNC Chapel Hill") {
    schoolName = (
      <div className="cardHeaderUNC d-flex justify-content-center">
        <p className="cardHeaderTextUNC BreeSerif">{props.info["School"]}</p>
      </div>
    );
  } else {
    schoolName = (
      <div className="cardHeaderOther d-flex justify-content-center">
        <p className="cardHeaderTextOther BreeSerif">{props.info["School"]}</p>
      </div>
    );
  }

  let star;



  //adds a student to favorites list
  async function addFavorite() {
    setStarToggle(true);
    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: "Favorites",
      recruiterUID: Firebase.auth.currentUser.uid,
      currentRecruiterEmail: Firebase.auth.currentUser.email,
      student: {
        Email: props.info["Email"],
        "First Name": props.info["First Name"],
        "Last Name": props.info["Last Name"],
        UID: props.info["UID"],
        "Profile Image": props.info["Profile Image"],
      },
    };

    // Adds a student to the list if the list does not already have a student
    if (props.recruiter[0].Lists.Favorites.filter((item) => item["Email"] === props.info["Email"]).length === 0) {
      await axios.put(
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/addStudent",
        objToSend
      );
    }
    props.updateRecruiter();


  }


  // removes student from favorites list
  async function removeFavorite() {
    setStarToggle(false);
    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: "Favorites",
      recruiterUID: Firebase.auth.currentUser.uid,
      currentRecruiterEmail: Firebase.auth.currentUser.email,
      student: {
        Email: props.info["Email"],
        "First Name": props.info["First Name"],
        "Last Name": props.info["Last Name"],
        UID: props.info["UID"],
        "Profile Image": props.info["Profile Image"],
      },
    };

    if (props.recruiter[0].Lists.Favorites.filter((item) => item["Email"] === props.info["Email"]).length === 1) {
      await axios.put(
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/deleteStudent",
        objToSend
      );
    }
    props.updateRecruiter();
  }


  //Displays a blue star if star toggle is active

  if (!starToggle) {
    star = (
      <StarBorderOutlinedIcon
        className="recruiterViewIcon"
        onClick={() => addFavorite()}
      />
    );
  } else {
    star = (
      <StarIcon
        onClick={() => removeFavorite()}
        className="recruiterViewIcon"
        style={{ color: "#4B9CD3" }}
      />
    );
  }

  let profImg = null;
  if (props.info["Profile Image"] === "") {
    profImg = (
      <AccountCircleIcon
        className="rounded-circle cardImg"
        style={{
          height: "75px",
          width: "75px",
        }}
      />
    );
  } else {
    profImg = (
      <img
        className="rounded-circle cardImg"
        src={props.info["Profile Image"]}
        height="75px"
        width="75px"
        alt=""
      ></img>
    );
  }

  //does not display student cards that are hidden
  if (props.info["Hide Resume"] === true) {
    return null;
  } else {
    return (
      <Card className="candidateCard ">
        <Card.Header
          className=" bg-white m-0 p-0 "
          style={{ borderRadius: "15px" }}
          onClick={() => props.toggleResumeView(props.info)}
        >
          <div className="d-flex">
            {profImg}
            {/* <img
              className="rounded-circle cardImg"
              src={props.info["Profile Image"]}
              height="75px"
              width="75px"
              alt=""
            ></img> */}
            <div style={{ width: "75px", overflow: "hidden" }}>
              <div className="cardHeaderTextDiv">
                <h1
                  className="cardHeaderText BreeSerif"
                  style={{ color: "#000000" }}
                >
                  {props.info["First Name"]}
                </h1>
                <h1
                  className="cardHeaderText BreeSerif"
                  style={{ color: "#000000" }}
                >
                  {props.info["Last Name"]}
                </h1>
                <h2 className="cardHeaderText">
                  {props.info["Graduation Year"]}
                </h2>
              </div>
            </div>
          </div>

          {schoolName}
        </Card.Header>
        <Card.Body className="p-0">
          <div
            className="bg-white BreeSerif d-flex justify-content-start w-100 flex-wrap cardTagContainer"
            onClick={() => props.toggleResumeView(props.info)}
          >
            {/*Maps a list of item to a tag component
                           does not render anything if a property is undefined
                        */}
            <CandidateCardTag
              items={props.info["Frame Works and Tools"]}
            ></CandidateCardTag>
            <CandidateCardTag
              items={props.info["Database Systems"]}
            ></CandidateCardTag>
            <CandidateCardTag
              items={props.info["Programming Languages"]}
            ></CandidateCardTag>
            <CandidateCardTag
              items={props.info["Operating Systems"]}
            ></CandidateCardTag>

            <CandidateCardTag items={props.info["Events"]}></CandidateCardTag>
            {primaryMajor}
            {secondaryMajor}
            <CandidateCardTag items={props.info["Minors"]}></CandidateCardTag>
          </div>
          <div className=" d-flex justify-content-around cardIconDiv">
            {star}
            <a href={"mailto:" + props.info.Email} style={{ color: "#25282B" }}>
              <MailOutlineIcon className="recruiterViewIcon" />
            </a>

            <CandidateCardAdd
              updateRecruiter={() => props.updateRecruiter()}
              recruiter={props.recruiter}
              student={props.info}
            />
          </div>
        </Card.Body>
      </Card>
    );
  }
}
export default withFirebase(CandidateCard);
