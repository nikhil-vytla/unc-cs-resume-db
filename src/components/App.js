import React, {Component} from 'react';
import './App.css'
import '../Static/RecruiterView.css'
import RecruiterView from './recruiter-view/RecruiterView'
import 'bootstrap/dist/css/bootstrap.min.css';


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
                <RecruiterView />
            </div>
        );
    }
}