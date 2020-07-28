import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withFirebase } from '../Firebase';

// Route wrapper to check auth claims
class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.Firebase = props.Firebase;
        this.state = {
            claim: null,
        };
    }

    async getClaims() {
        return (await this.Firebase.auth.currentUser
            .getIdTokenResult(true)
            .catch(err => console.log(err)))
            .claims
    }

    async componentDidMount() {
        const { claimKey } = this.props;
        const claim = await this.getClaims()
            .catch((err) => console.log(err));
        console.log(claim)
        this.setState({ claim: claim[claimKey] });
    }

    render() {
        console.log(this.context)

        const { component: RouteComponent, ...rest } = this.props;
        const { claim } = this.state;

        if (claim === null) return "Loading screen";

        return (
            <Route
                {...rest} 
                render={ props => {
                    return claim ?
                    <RouteComponent {...props}/> : 
                    <Redirect to={"/"} />;
                }}
            />
        );
    }
}

export default withFirebase(PrivateRoute);