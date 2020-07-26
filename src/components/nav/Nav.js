import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import logo from "../../Static/CSLogo.png";
import Firebase from "../../Firebase";
import { Button } from "react-bootstrap";

export class Nav extends Component {
  handleSignOut = async(e) => {
    try {
      await Firebase.signout();
      console.log("Sign out successfull");
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/">
            <img src={logo} alt="logo" width="400" height="auto" />
          </Link>

          {/* Nav links for testing */}
          <Link to="/student" style={{"color": "white"}}>Student View</Link>
          <Link to="/recruiter" style={{"color": "white"}}>Recruiter View</Link>
          <Link to="/admin" style={{"color": "white"}}>Admin View</Link>

          {/* <Button onclick={this.handleSignOut}>Sign Out</Button> */}

          <h3>Resume Database</h3>
        </div>
        <ul className="nav-links"></ul>
      </div>
    );
  }
}

export default Nav;
