import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./Static/RecruiterView.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import Firebase, { FirebaseContext } from './Firebase';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById("root"));
