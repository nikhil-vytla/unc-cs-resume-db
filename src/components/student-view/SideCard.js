import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SideCard.css";
import Firebase from "../../Firebase.js";
import profileImage from "../../Static/BlankUser.jpg";
import SideResumeBox from "./SideResumeBox";

// 320 by 780
export default class SideCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: this.props.emailAddress,
      // fName: this.props.firstName,
      //lName: this.props.lastName,
      profileImageFile: null,
      profileURL: "",
      resumePDF: null,
      url: "",
    };
    this.handleNewUploadClick = this.handleNewUploadClick.bind(this);
    this.handlePdfChange = this.handlePdfChange.bind(this);
    this.handleNewPicUpload = this.handleNewPicUpload.bind(this);
  }

  handleNewUploadClick = () => {
    if (this.state.resumePDF == null) {
      alert("Please select a PDF to upload");
      return;
    }
    const { resumePDF } = this.state;

    // checks if you have a file url in the database already
    if (this.props.resURL !== "") {
      // Delete current file in storage
      // Send request to delete current file
      Firebase.storage
        .ref(`resumePDFs/${Firebase.auth.currentUser.uid}`)
        .delete();
    }

    // reference to the location of where the file should be placed
    const uploadFile = Firebase.storage
      .ref(`resumePDFs/${Firebase.auth.currentUser.uid}`)
      .put(resumePDF);

    // Uploads file to firebase
    // Gets the file url from storage and displays on screen through setting the state.url
    // then it updates the Resume PDF field in the database

    uploadFile.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        Firebase.storage
          .ref("resumePDFs")
          .child(`${Firebase.auth.currentUser.uid}`)
          .getDownloadURL()
          .then((url) => {
            this.setState(() => ({ url }));

            Firebase.db
              .collection("students")
              .doc(Firebase.auth.currentUser.uid)
              .update({
                ["Resume PDF"]: url,
              });
          });
      }
    );
  };

  handlePdfChange = async (event) => {
    const resumePDF = event.target.files[0];
    this.setState(() => ({ resumePDF }));
    console.log(resumePDF);
    const profileImageFile = event.target.files[0];
    this.setState(() => ({ profileImageFile }));
    console.log(profileImageFile);
  };

  handleNewPicUpload = () => {
    if (this.state.profileImageFile == null) {
      alert("Please select a PDF to upload");
      return;
    }
    const { profileImageFile } = this.state;

    // checks if you have a file url in the database already
    if (this.props.profileImgURL !== "") {
      // Delete current file in storage
      // Send request to delete current file
      Firebase.storage
        .ref(`profilePictures/${Firebase.auth.currentUser.uid}`)
        .delete();
    }

    // reference to the location of where the file should be placed
    const uploadFile = Firebase.storage
      .ref(`profilePictures/${Firebase.auth.currentUser.uid}`)
      .put(profileImageFile);

    // Uploads file to firebase
    // Gets the file url from storage and displays on screen through setting the state.url
    // then it updates the Resume PDF field in the database

    uploadFile.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        Firebase.storage
          .ref("profilePictures")
          .child(`${Firebase.auth.currentUser.uid}`)
          .getDownloadURL()
          .then((profileURL) => {
            this.setState(() => ({ profileURL }));

            Firebase.db
              .collection("students")
              .doc(Firebase.auth.currentUser.uid)
              .update({
                ["Profile Image"]: profileURL,
              });
          });
      }
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.resURL !== prevProps.resURL) {
      this.setState({
        url: this.props.resURL,
      });
    }
    if (this.props.profileImgURL !== prevProps.profileImgURL) {
      this.setState({
        profileURL: this.props.profileImgURL,
      });
    }
  }

  render() {
    return (
      <div>
        <Card id="SideCardCard">
          <Card.Header className="SideCardProfileHeader">
            <div
              className="d-flex"
              id="ProfileDiv"
              style={{ height: "190px", width: "320px", flexWrap: "wrap" }}
            >
              <div className="imgDiv" style={{ padding: ".75rem 1.25rem" }}>
                <img
                  className="SideResumePdfImage"
                  src={this.state.profileURL}
                  style={{ borderRadius: "50%" }}
                  height="100px"
                  width="100px"
                  alt=""
                />
              </div>

              <div style={{ width: "200" }}>
                <div
                  className="nameDiv"
                  style={{
                    width: "180px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: ".75rem 1.25rem",
                  }}
                >
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
                    {this.props.firstName}
                  </h2>
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
                      marginTop: "0px",
                    }}
                  >
                    {this.props.lastName}
                  </h2>
                </div>
              </div>

              <div
                className="emailDiv"
                // style={{
                //   // width: "inherit",
                //   // display: "flex",
                //   // justifyContent: "center",
                //   // fontFamily: "Droid Sans",
                //   // fontStyle: "normal",
                //   // fontWeight: "normal",
                //   // fontSize: "20px",
                //   // lineHeight: "25px",
                // }}
              >
                {this.props.emailAddress}
              </div>
            </div>

            {/* <Profile
              firstName={this.state.fName}
              lastName={this.state.lName}
              emailAddress={this.state.email}
            /> */}
          </Card.Header>
          <Card.Body className="SideCardBody">
            <div className="resumeBox">
              <h2 style={{ textAlign: "center", color: "white" }}>Resume</h2>
              <SideResumeBox currentPhoto={this.state.url} />
              {/* <Card
                className="SideResumeBoxCard"
                border="dark"
                style={{ height: "460px", width: "290px" }}
              >
                <img
                  id="resumeWindowImage"
                  src={this.state.url}
                  alt={this.props.resURL}
                  height="460"
                  width="auto"
                ></img>
              </Card> */}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "0px",
                marginBottom: "0px",
                flexDirection: "column",
              }}
            >
              <div>
                <form>
                  <div className="form-group">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={this.handlePdfChange}
                    />
                  </div>
                </form>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button variant="primary" onClick={this.handleNewUploadClick}>
                  Upload Resume
                </Button>
              </div>
              <div style={{ textAlign: "center", marginTop: "5%" }}>
                <Button variant="primary" onClick={this.handleNewPicUpload}>
                  Upload Profile Picture
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
