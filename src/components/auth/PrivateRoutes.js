import React from "react";
import { Route, Redirect } from "react-router-dom";
import Firebase from "../../Firebase";

const getClaims = async () => {
    return (await Firebase.auth.currentUser.getIdTokenResult(true)
    .catch(err => console.log(err)))
    .claims;
}

// Trying to combine all private 
export const PrivateRoute = ({path}, {component: RouteComponent}, ...rest) => {
    console.log(path);
    return (
        <Route
            render={(props) => {
                return (async () => {
                    switch(path) {
                        case "/admin":
                            console.log("case admin");
                            return await getClaims.admin;
                        case "/recruiter":
                            return await getClaims.recruiter;
                        case "/student":
                            return await getClaims.student;
                        default:
                            return false;
                    }
                }) ?
                <RouteComponent {...props}/> : 
                <Redirect to={"/"} />;
            }}
            {...rest}
        />
    );
}

export const AdminRoute = ({component: RouteComponent, ...rest}) => {
    return (
        <Route
            exact path="/admin" 
            render={(props) => {
                return (async () => {
                    return await getClaims.admin
                    .catch(err => {
                        console.log(err);
                        return false;
                    })
                }) ?
                <RouteComponent {...props}/> : 
                <Redirect to={"/"} />;
            }}
            {...rest}
        />
    );
}

export const RecruiterRoute = ({component: RouteComponent, ...rest}) => {
    return (
        <Route
            exact path="/recruiter" 
            render={(props) => {
                return (async () => {
                    await getClaims.recruiter
                }) ?
                <RouteComponent {...props}/> : 
                <Redirect to={"/"} />;
            }}
            {...rest}
        />
    );
}

export const StudentRoute = ({component: RouteComponent, ...rest}) => {
    const type = "student"
    return (
        <Route
            exact path={`/${type}`} 
            render={(props) => {
                return (async () => {
                    await getClaims.student
                }) ?
                <RouteComponent {...props}/> : 
                <Redirect to={"/"} />;
            }}
            {...rest}
        />
    );
}