import React, {Component} from 'react';
import './App.css'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            data: "state data"
        }
    }
    render() {
        return (
            <div className="App">
                <h1>App component</h1>
                <p>Data: {this.state.data}</p>
            </div>
        );
    }
}