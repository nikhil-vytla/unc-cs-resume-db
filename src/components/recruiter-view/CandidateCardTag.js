import React from "react"



function CandidateCardTag(props) {
    let itemArray = []

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