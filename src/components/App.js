import React, {Component} from 'react';
import './App.css';

import Login from './auth/Login';
// import Signup from './auth/Signup';
// import RecruiterView from './recruiter-view/RecruiterView';

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
                <Login />
                {/* <Signup /> */}
                {/* <RecruiterView /> */}
            </div>
        );
    }
}