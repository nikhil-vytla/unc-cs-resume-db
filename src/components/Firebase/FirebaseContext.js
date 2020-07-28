import React from "react";

const FirebaseContext = React.createContext(null);

// Component wrapper for Firebase context consumer
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {Firebase => 
            <Component {...props} Firebase={Firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;