import React from "react";
import "./App.css";
import Login from "./auth/Login";
import Nav from "./nav/Nav";
import Signup from "./auth/Signup";
import StudentView from "./student-view/StudentView";
import RecruiterView from "./recruiter-view/RecruiterView";
import AdminView from "./admin-view/AdminView";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StudentRoute, RecruiterRoute, AdminRoute, PrivateRoute } from "./auth/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <StudentRoute exact path="/student" component={StudentView} />
          <AdminRoute exact path="/admin" component={AdminView} />
          <RecruiterRoute exact path="/recruiter" component={RecruiterView} />
          {/* <PrivateRoute exact path="/admin" component={AdminView} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
