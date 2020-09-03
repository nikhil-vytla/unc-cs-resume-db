import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/Star";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CandidateCardTag from "./CandidateCardTag";
import "../../Static/candidates.css";
import CandidateCardAdd from "./CandidateCardAdd";

function CandidateCard(props) {
  const [starToggle, setStarToggle] = useState(false);
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

  //Displays a blue star if star toggle is active
  if (!starToggle) {
    star = (
      <StarBorderOutlinedIcon
        className="recruiterViewIcon"
        onClick={() => setStarToggle(true)}
      />
    );
  } else {
    star = (
      <StarIcon
        onClick={() => setStarToggle(false)}
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
export default CandidateCard;
