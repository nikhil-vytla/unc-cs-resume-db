import React, { Component } from "react";
import profileImage from "../../Static/BlankUser.jpg";
import "./Profile.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: this.props.firstName,
      lName: this.props.lastName,
      email: this.props.emailAddress,
    };

    this.updateRender = this.updateRender.bind(this);
  }

  render() {
    return (
      //320 by 190
      <div
        className="d-flex"
        style={{ height: "190px", width: "320px", flexWrap: "wrap" }}
      >
        <div className="imgDiv" style={{ padding: ".75rem 1.25rem" }}>
          <img
            className="SideResumePdfImage"
            src={profileImage}
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
    );
  }
}
