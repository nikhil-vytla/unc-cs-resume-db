import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import SideResumeBox from "./SideResumeBox.js";
import Button from "react-bootstrap/Button";
import "./SideCard.css";
import Profile from "./Profile.js";
import "bootstrap/dist/css/bootstrap.min.css";

/*export default class SideCard extends Component {
  render() {
    return (
      <div className="SideCardDiv">
        <div className="flex-container">
          <div className="profilePictureDiv">
            <img src="../../Static/BlankUser.jpg" />
          </div>
        </div>
      </div>
    );
  }
}
*/
// 320 by 780

export default class SideCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "student@live.unc.edu",
      fName: "Johnny",
      lName: "Appleseed",
      profileImage: "",
      resumePDF: "",
    };
  }

  updateInformation = (url) => {
    this.state.resumePDF = url;
  };

  handleNewUploadClick = () => {
    // Prompt a screen to upload a pdf
  };

  render() {
    return (
      <Card id="SideCardCard">
        <Card.Header className="SideCardProfileHeader">
          <Profile />
        </Card.Header>
        <Card.Body className="SideCardBody">
          <SideResumeBox />
          <Button
            className="UploadNewButton"
            variant="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            onClick={this.handleNewUploadClick}
          >
            {" "}
            Upload New{" "}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

/* <img
            className="cardImg"
            //Add a function for the image
            src={require("../../Static/BlankUser.jpg")}
            style={{ padding: "20px 20px 0px 0px", borderRadius: "100px" }}
            height="90px"
            width="90px"
            alt=""
          ></img>
          <h2
            style={{
              fontFamily: "Droid Sans",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "30px",
              lineHeight: "35px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            Tucker Reisig
          </h2>
          <h6
            style={{
              fontFamily: "Droid Sans",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "25px",
              lineHeight: "29px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            tucker17@live.unc.edu
          </h6> */
