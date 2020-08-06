import React from "react"


// This component is a simple wrapper for the Tags located inside the Student Cards
function CandidateCardTag(props) {
    let itemArray = []

    //Loops through all the Keys supplied in props.items and displays those which the have a value true
    if (props.items !== null && props.items !== undefined) {
        Object.keys(props.items).forEach((key, index) => {
            if (props.items[key] === true) {
                itemArray.push(key);
            }

        })

    }
    if (props.items === null || props.items === undefined) {
        return null;
    } else if (itemArray !== []) {
        return itemArray.map(item =>
            <p className="recruiterViewTag BreeSerif" key={item}> {item}</p>
        )
    }


    return null;

}
export default CandidateCardTag