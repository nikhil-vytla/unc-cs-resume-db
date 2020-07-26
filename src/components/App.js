import React from "react";
import "./App.css";
import Login from "./auth/Login";
import Nav from "./nav/Nav";
import Signup from "./auth/Signup";
import { FirebaseContext } from "./FirebaseContext";
import StudentView from "./student-view/StudentView";
import RecruiterView from "./recruiter-view/RecruiterView";
import AdminView from "./admin-view/AdminView";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AdminRoute, RecruiterRoute, StudentRoute } from "./auth/PrivateRoutes";

const App = () => {
  return (
    <div className="App">
      <FirebaseContext.Provider>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <AdminRoute exact path="/admin" component={AdminView} />
            <RecruiterRoute exact path="/recruiter" component={RecruiterView} />
            <StudentRoute exact path="/student" component={StudentView} />
          </Switch>
        </Router>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
