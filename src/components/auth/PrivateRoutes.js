import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Firebase from "../Firebase";
// import { render } from "@testing-library/react";

const getClaims = async () => {
    return (await Firebase.auth.currentUser.getIdTokenResult(true)
    .catch(err => console.log(err)))
    .claims;
}

export class AdminRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: null,
        }
    }

    async componentDidMount() {
        // move getclaims to const and catch errors?
        this.setState({ isAdmin: (await getClaims()).admin });
    }

    render() {
        const { component: RouteComponent, ...rest } = this.props;
        const { isAdmin } = this.state;

        if (isAdmin === null) return "Loading screen";

        return (
            <Route
                {...rest} 
                render={ props => {
                    return isAdmin ?
                    <RouteComponent {...props}/> : 
                    <Redirect to={"/"} />;
                }}
            />
        );
    }
}

export class RecruiterRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecruiter: null,
        }
    }

    async componentDidMount() {
        this.setState({ isRecruiter: (await getClaims()).recruiter });
    }

    render() {
        const {component: RouteComponent, ...rest} = this.props;
        const {isRecruiter} = this.state;

        if (isRecruiter === null) return "Loading screen";

        return (
            <Route
                {...rest} 
                render={ props => {
                    return isRecruiter ?
                    <RouteComponent {...props}/> : 
                    <Redirect to={"/"} />;
                }}
            />
        );
    }
}

export class StudentRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStudent: null,
        }
    }

    async componentDidMount() {
        this.setState({ isStudent: ( await getClaims() ).student });
    }

    render() {
        const { component: RouteComponent, ...rest } = this.props;
        const { isStudent } = this.state;

        if (isStudent === null) return "Loading screen";

        return (
            <Route
                {...rest}
                render={ props => {
                    return isStudent ?
                    <RouteComponent {...props}/> : 
                    <Redirect to={"/"} />;
                }}
            />
        );
    }
}