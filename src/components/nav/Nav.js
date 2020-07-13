import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "../../Static/CSLogo.png";

export class Nav extends Component {
  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/">
            <img src={logo} alt="logo" width="400" height="auto" />
          </Link>
          <h3>Resume Database</h3>
        </div>

        <ul className="nav-links">
          {/* <Link className="router-link" to="/student">
              <li>Student</li>
            </Link>
            <Link className="router-link" to="/recruiter">
              <li>Recruiter</li>
            </Link>
            <Link className="router-link" to="/administrator">
              <li>Administrator</li>
            </Link> */}
        </ul>
      </div>
    );
  }
}

export default Nav;
