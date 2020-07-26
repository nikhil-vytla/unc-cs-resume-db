import React, { Component } from "react";
import Firebase from "./Firebase";

const { Provider, Consumer } = React.createContext();

class FirebaseContext extends Component {
  constructor() {
    super()
    this.state.firebase = new Firebase();
  }

  render() {
    return <Provider value={this.state.firebase}></Provider>
  }
}

export { FirebaseContext, Consumer as FirebaseConsumer };