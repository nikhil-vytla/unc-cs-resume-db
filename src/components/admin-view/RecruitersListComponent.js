import React, { Component, useState } from "react";
import { withFirebase } from "../Firebase";
import "./AdminView.css";
import { Button } from "react-bootstrap";
import RecruitersListRenderComponent from "./RecruitersListRenderComponent";
import NewRecruiter from "./NewRecruiter";

class RecruitersListComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = { recruitersList: [null], dataLoaded: null };
  }

  componentDidMount() {
    // this.handleQueryAllData();
  }

  handleQueryAllData = async (e) => {
    const recruitersListHolder = await this.Firebase.db
      .collection("recruiters")
      .get()
      .catch((err) => console.log(err));
    this.setState({
      recruitersList: recruitersListHolder.docs.map((doc) => doc.data()),
      dataLoaded: true,
    });
    // console.log(this.state.recruitersList);
    // console.log("this.state.recruitersList");
  };

  newRecruiterRender = () => {
    console.log("clicked");
    return <NewRecruiter />;
  };

  renderComponentAfterDataIsRetrieved() {
    if (this.state.dataLoaded === null) {
      this.handleQueryAllData();
      // console.log("it is null");
    } else {
      return (
        <div>
          {console.log(
            "ReruitersListComponent before gets sent to List Render"
          )}
          {console.log(this.state.recruitersList)}
          <RecruitersListRenderComponent
            list={this.state.recruitersList}
            updateResumeAccess={this.updateResumeAcces}
          />
        </div>
      );
    }
  }
  renderStudentListRenderComponent() {}
  render(props) {
    return (
      <div>
        <h2 className="admin-heading">
          {this.props.title}
          <Button
            className="admin-new-recruiter-button"
            onClick={this.newRecruiterRender}
          >
            New Recruiter
          </Button>
        </h2>

        {this.renderComponentAfterDataIsRetrieved()}
      </div>
    );
  }
  updateResumeAcces = async () => {
    await this.handleQueryAllData().catch((err) => console.log(err));
  };
}

export default withFirebase(RecruitersListComponent);
