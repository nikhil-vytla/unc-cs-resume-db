import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import SideResumeBox from "./SideResumeBox.js";
import Button from "react-bootstrap/Button";
import "./SideCard.css";
import Profile from "./Profile.js";
//import FileUpload from "./FileUpload.js";
import Form from "react-bootstrap/Form";
import pdf from "../../Static/ResumeTemplate.jpg";
import Firebase from "../../Firebase.js";

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
      resumePDF: null,
      url: "",
    };
    this.handleNewUploadClick = this.handleNewUploadClick.bind(this);

    this.handlePdfChange = this.handlePdfChange.bind(this);
  }

  updateInformation = (url) => {
    this.state.resumePDF = url;
  };

  handleNewUploadClick = () => {
    // Prompt a screen to upload a pdf
    const { resumePDF } = this.state;
    const uploadFile = Firebase.storage
      .ref(`resumePDFs/${resumePDF.name}`)
      .put(resumePDF);

    uploadFile.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        Firebase.storage
          .ref("resumePDFs")
          .child(resumePDF.name)
          .getDownloadURL()
          .then((url) => {
            this.setState(() => ({ url }));
          });
      }
    );
  };

  handlePdfChange = (event) => {
    //this.state.resumePDF = document.getElementById("exampleFormControlFile1");
    // document.getElementById("resumeWindowImage").src = event.target.files[0];
    console.log(event.target.files[0]);
    console.log("7");

    const resumePDF = event.target.files[0];
    this.setState(() => ({ resumePDF }));

    // const file = event.target.files[0];
    // const storageRef = Firebase.storage().ref("resumePDFs/" + file.name);

    // storageRef.put(file);

    // const image = document.getElementById("resumeWindowImage");
    // image.src = URL.createObjectURL(this.state.resumePDF);
  };

  render() {
    return (
      <div>
        <Card id="SideCardCard">
          <Card.Header className="SideCardProfileHeader">
            <Profile />
          </Card.Header>
          <Card.Body className="SideCardBody">
            <div className="resumeBox">
              <Card
                className="SideResumeBoxCard"
                border="dark"
                style={{ height: "460px", width: "290px" }}
              >
                <img
                  id="resumeWindowImage"
                  src={this.state.url}
                  alt=""
                  height="460"
                  width="auto"
                ></img>
              </Card>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <form>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    onChange={this.handlePdfChange}
                  />
                </div>
              </form>
              <Button variant="primary" onClick={this.handleNewUploadClick}>
                Upload
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
