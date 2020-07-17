import React from "react";
import "./App.css";
import Login from "./auth/Login";
import Nav from "./nav/Nav";
import Signup from "./auth/Signup";
import StudentView from "./student-view/StudentView";
import RecruiterView from "./recruiter-view/RecruiterView";
import AdminView from "./admin-view/AdminView";
import CardComponent from "./admin-view/CardComponent";
import ListComponent from "./admin-view/ListComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/student" exact component={StudentView} />
          <Route path="/recruiter" exact component={RecruiterView} />
          <Route path="/admin" exact component={AdminView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
