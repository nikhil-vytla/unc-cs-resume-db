import React, { Component, useState } from "react";
import { withFirebase } from "../Firebase";
import "./AdminView.css";
import StudentListRenderComponent from "./StudentListRenderComponent";

class StudentListComponent extends Component {
  constructor(props) {
    super(props);
    this.Firebase = props.Firebase;
    this.state = { studentsList: [null], dataLoaded: null };
  }

  componentDidMount() {}

  handleQueryAllData = async (e) => {
    const studentsListHolder = await this.Firebase.db
      .collection("students")
      .get()
      .catch((err) => console.log(err));
    this.setState({
      studentsList: studentsListHolder.docs.map((doc) => doc.data()),
      dataLoaded: true,
    });
    console.log(this.state.studentsList);
    console.log("this.state.studentsList");
  };

  renderComponentAfterDataIsRetrieved() {
    if (this.state.dataLoaded === null) {
      this.handleQueryAllData();
      console.log("it is null");
    } else {
      return <StudentListRenderComponent list={this.state.studentsList} />;
    }
  }
  renderStudentListRenderComponent() {}
  render(props) {
    return (
      <div>
        <h2 className="admin-heading">{this.props.title}</h2>

        {this.renderComponentAfterDataIsRetrieved()}
      </div>
    );
  }
}

export default withFirebase(StudentListComponent);
