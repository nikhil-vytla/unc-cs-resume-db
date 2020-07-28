import React, { useState, useEffect } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useTransition, animated } from "react-spring";
import StopIcon from "@material-ui/icons/Stop";

function FilterItem(props) {
    const multNames = [
        "Database Systems",
        "Frameworks and Tools",
        "Operating Systems",
        "Programming Languages",
        "Events",
    ];
    const text = props.itemName;
    const [checked, setChecked] = useState(props.isCurrentFilter(computeFilterName()));
    // useEffect(() => {
    //     setChecked(props.isCurrentFilter(computeFilterName()));

    // })

    //Creates the filter name to be used in the filter object
    function computeFilterName() {
        if (multNames.includes(props.title)) {
            const nameTitle = `${props.title}.${text}`;
            const objToAdd = { name: nameTitle, value: true };
            return objToAdd;
        } else {
            const objToAdd = {
                name: props.title,
                value: text,
            };
            return objToAdd;
        }


    }

    //wrapper for checking
    function handleCheck() {
        props.addFilter(computeFilterName());
        setChecked(true);

    }
    //wrapper for unChecking
    function handleUncheck() {
        props.removeFilter(computeFilterName());
        setChecked(false);

    }


    const transitions = useTransition(checked, null, {
        from: { position: "relative", opacity: 0 },
        enter: {position: "relative", opacity: 1 },
        leave: { position: "relative", opacity: 0 },
    });
    return transitions.map(({ item, key, props }) =>
        item ? (
            <animated.div
                className="d-flex justify-content-between filterItem"
                style={props}
                onClick={() => handleUncheck()}
            >
                <h1 className="filterItemText">{text}</h1>
                <CheckBoxIcon className="filterCheck" />
            </animated.div>
        ) : (
                <animated.div
                    className="d-flex justify-content-between filterItem"
                    style={props}
                    onClick={() => handleCheck()}
                >
                    <h1 className="filterItemText ">{text}</h1>
                    <StopIcon className="filterGrey" />
                </animated.div>
            )
    );
}
export default FilterItem;
