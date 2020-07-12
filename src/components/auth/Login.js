import React, { Component } from "react";
import Firebase from "../../Firebase";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: "", password: ""};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  render() {
    return (
      <div className="LoginComponent container">
        <form className="form-signin" onSubmit={this.handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Login</h1>
          <input className="form-control" type="email" placeholder="Email Address" 
            value={this.state.email} onChange={this.handleEmailChange} />
          <input className="form-control" type="password" placeholder="Password" 
            value={this.state.password} onChange={this.handlePasswordChange} />
          <button className="LoginBtn btn btn-primary" type="submit" value="Submit">Login</button>
        </form>
      </div>
    );
  }

  handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await Firebase.login(this.state.email, this.state.password);
      console.log('Logged in!');
      console.log(user);
    } catch(err) {console.log(err)};
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }
}
