import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "../../Static/CSLogo.png";

export class Nav extends Component {
  render() {
    return (
      <div className="navContainer">
        <div className="nav">
          <Link to="/">
            <img src={logo} alt="logo" height="60px" width="auto" />
          </Link>

          <Link to="/student" style={{"color": "white"}}>Student View</Link>
          <Link to="/recruiter" style={{"color": "white"}}>Recruiter View</Link>
          <Link to="/admin" style={{"color": "white"}}>Admin View</Link>

          <h3>Resume Database</h3>
        </div>
        <ul className="nav-links"></ul>
      </div>
    );
  }
}

export default Nav;
