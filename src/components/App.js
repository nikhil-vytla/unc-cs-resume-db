import React, { Component } from "react";
import "./App.css";
import Homepage from "./homepage/Homepage";
import Nav from "./nav/Nav";
import StudentLogin from "./login/Login";
import RecruiterLogin from "./login/Login";
import StudentView from "./student-view/StudentView";
import RecruiterView from "./recruiter-view/RecruiterView";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: "state data",
    };
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Nav />
          </div>
          <Switch>
            <Route path="/studentlogin" exact component={StudentLogin} />
            <Route path="/recruiterlogin" exact component={RecruiterLogin} />
            <Route path="/student" exact component={StudentView} />
            <Route path="/recruiter" exact component={RecruiterView} />
            <Route path="/" exact component={Homepage} />
          </Switch>
        </div>
      </Router>
    );
  }
}