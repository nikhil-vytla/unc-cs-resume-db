import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SideCard.css";
import Firebase from "../../Firebase.js";
import profileImage from "../../Static/BlankUser.jpg";

// 320 by 780
export default class SideCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fName: "",
      lName: "",
      profileImageFile: profileImage,
      profileURL: "",
      resumePDF: null,
      url: "",
    };
    this.handleNewUploadClick = this.handleNewUploadClick.bind(this);
    this.handlePdfChange = this.handlePdfChange.bind(this);
  }

  handleNewUploadClick = () => {
    if (this.state.resumePDF == null) {
      alert("Please select a PDF to upload");
      return;
    }
    const { resumePDF } = this.state;

    // checks if you have a file url in the database already
    if (this.state.url !== "") {
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

    const user = Firebase.auth.currentUser;
    const userid = user.uid;

    if (user != null) {
      const userDataOBJ = await Firebase.getUserInfo(userid);

      // Updating the state so it diplays in the object
      this.setState({
        email: userDataOBJ[0]["Email"],
        fName: userDataOBJ[0]["First Name"],
        lName: userDataOBJ[0]["Last Name"],
        url: userDataOBJ[0]["Resume PDF"],
      });
    }
  };

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
                  src={this.profileURL}
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
                    {this.state.fName}
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
                    {this.state.lName}
                  </h2>
                </div>
              </div>

              <div
                className="emailDiv"
                style={{
                  width: "inherit",
                  display: "flex",
                  justifyContent: "center",
                  fontFamily: "Droid Sans",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "20px",
                  lineHeight: "25px",
                }}
              >
                {this.state.email}
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
                    accept="image/*"
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
