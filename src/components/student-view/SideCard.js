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
      email: "user.email",
      fName: "Johnny",
      lName: "Appleseed",
      profileImage: "",
      resumePDF: null,
      url: "",
    };
    this.handleNewUploadClick = this.handleNewUploadClick.bind(this);
    this.handlePdfChange = this.handlePdfChange.bind(this);
  }

  updateInformation = () => {
    const user = Firebase.auth.currentUser;
    if (user != null) {
      const userid = user.uid;
      const data = Firebase.db
        .collection("users")
        .where("User UID" == userid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        });
      data();
    }
  };

  handleNewUploadClick = () => {
    // Prompt a screen to upload a pdf

    if (this.state.resumePDF != null) {
      // Delete current file in storage
      // Send request to delete current file
      // if there is an error break??
    }

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

  handlePdfChange = async (event) => {
    //this.state.resumePDF = document.getElementById("exampleFormControlFile1");
    // document.getElementById("resumeWindowImage").src = event.target.files[0];

    console.log(event.target.files[0]);
    console.log("7");

    const resumePDF = event.target.files[0];
    this.setState(() => ({ resumePDF }));

    const user = Firebase.auth.currentUser;
    const userid = user.uid;

    let dataJSON = {};
    let realData = {};
    //let data = null;
    if (user != null) {
      //dataJSON = await Firebase.getUserInfo(userid);

      const test = await Firebase.getUserInfo(userid);
      console.log(test);

      //.then((data) => (dataJSON = data))
      // .then((realData = JSON.parse(dataJSON)))
      //.then(console.log(`${realData} and ${dataJSON}`))
      // .then((data) =>
      //   this.setState({
      //     email: data.Email,
      //   })
      // );
      //.then((data) => console.log(data));

      // data = JSON.parse(dataJSON);
      // this.setState({
      //   email: data.Email,
      // });
    }

    //console.log(userid);

    // Gets user info
    // const data = null;
    // Firebase.db
    //   .collection("users")
    //   .where("User UID", "==", userid)
    //   .get()
    //   .then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data());
    //       data = JSON.parse(doc.data());
    //       console.log(data);
    //       this.setState({
    //         email: data.email,
    //       });
    //     });
    //   })
    // .catch(function (error) {
    //   console.log("Error getting documents: ", error);
    // });

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
            <Profile
              firstName={this.state.fName}
              lastName={this.state.lName}
              emailAddress={this.state.email}
            />
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
