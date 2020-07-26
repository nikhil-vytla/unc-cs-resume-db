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
import PrivateRoute from "./auth/PrivateRoute";
import Firebase, { FirebaseContext } from './Firebase';

const App = () => {
  return (
    <div className="App">
      <FirebaseContext.Provider value={new Firebase()}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/admin" claimKey="admin" component={AdminView} />
            <PrivateRoute exact path="/recruiter" claimKey="recruiter" component={RecruiterView} />
            <PrivateRoute exact path="/student" claimKey="student" component={StudentView} />
          </Switch>
        </Router>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
