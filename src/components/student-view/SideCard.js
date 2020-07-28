import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SideCard.css";
import { withFirebase } from "../Firebase";
import SideResumeBox from "./SideResumeBox";
import PublishIcon from "@material-ui/icons/Publish";

// 320 by 780
class SideCard extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = {
      profileImageFile: null,
      profileURL: "",
      resumePDF: null,
      url: "",
    };
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
      this.Firebase.storage
        .ref(`resumePDFs/${this.Firebase.auth.currentUser.uid}`)
        .delete();
    }

    // reference to the location of where the file should be placed
    const uploadFile = this.Firebase.storage
      .ref(`resumePDFs/${this.Firebase.auth.currentUser.uid}`)
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
        this.Firebase.storage
          .ref("resumePDFs")
          .child(`${this.Firebase.auth.currentUser.uid}`)
          .getDownloadURL()
          .then((url) => {
            this.setState(() => ({ url }));

            this.Firebase.db
              .collection("students")
              .doc(this.Firebase.auth.currentUser.uid)
              .update({
                "Resume PDF": url,
              });
          });
      }
    );
  };

  handlePdfChange = async (event) => {
    const resumePDF = event.target.files[0];
    this.setState(() => ({ resumePDF }));
    const profileImageFile = event.target.files[0];
    this.setState(() => ({ profileImageFile }));
  };

  handleNewPicUpload = () => {
    if (this.state.profileImageFile == null) {
      alert("Please select a PDF to upload");
      return;
    }
    const { profileImageFile } = this.state;

    // checks if you have a file url in the database already
    if (
      this.props.profileImgURL !== "" &&
      this.props.profileImgURL !==
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png"
    ) {
      // Delete current file in storage
      // Send request to delete current file
      this.Firebase.storage
        .ref(`profilePictures/${this.Firebase.auth.currentUser.uid}`)
        .delete();
    }

    // reference to the location of where the file should be placed
    const uploadFile = this.Firebase.storage
      .ref(`profilePictures/${this.Firebase.auth.currentUser.uid}`)
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
        this.Firebase.storage
          .ref("profilePictures")
          .child(`${this.Firebase.auth.currentUser.uid}`)
          .getDownloadURL()
          .then((profileURL) => {
            this.setState(() => ({ profileURL }));

            this.Firebase.db
              .collection("students")
              .doc(this.Firebase.auth.currentUser.uid)
              .update({
                "Profile Image": profileURL,
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

  // now allows pdfs
  render() {
    return (
      <div>
        <Card id="SideCardCard">
          <Card.Header className="SideCardProfileHeader">
            <div className="d-block justify-content-center" id="ProfileDiv">
              <div className="d-flex justify-content-center">
                <div className="imgDiv">
                  <img
                    className="SideResumePdfImage"
                    src={this.state.profileURL}
                    alt=""
                  />
                </div>

                <div className="nameDiv">
                  <h2 className="nameText"> {this.props.firstName} </h2>
                  <h2 className="nameText"> {this.props.lastName} </h2>
                </div>
              </div>
              <div className="emailDiv">{this.props.emailAddress}</div>
            </div>
          </Card.Header>
          <Card.Body className="SideCardBody">
            <div className="resumeBox">
              <SideResumeBox currentPhoto={this.state.url} />
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
                    <label>
                      <input
                        type="file"
                        accept="image/*, application/pdf"
                        className="form-control-file"
                        id="exampleFormControlFile1"
                        onChange={this.handlePdfChange}
                        style={{ color: "#000000" }}
                      />
                    </label>
                  </div>
                </form>
              </div>
              <div className="d-flex justify-content-center">
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    className="uploadButton"
                    onClick={this.handleNewUploadClick}
                  >
                    <PublishIcon /> Resume
                  </Button>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    className="uploadButton"
                    onClick={this.handleNewPicUpload}
                  >
                    <PublishIcon /> Profile Picture
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withFirebase(SideCard);
