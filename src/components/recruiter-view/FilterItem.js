import React, { useState } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useTransition, animated } from "react-spring";
import StopIcon from "@material-ui/icons/Stop";

function FilterItem(props) {
  var text = props.itemName;
  const [checked, setChecked] = useState(props.itemName.Active);
  const multNames = [
    "Database Systems",
    "Frameworks and Tools",
    "Operating Systems",
    "Programming Languages",
    "Events",
  ];

  function handleCheck() {
    // checked = "true";
    setChecked(true);
    if (multNames.includes(props.title)) {
      const nameTitle = `${props.title}.${text}`;
      const objToAdd = { name: nameTitle, value: true };
      props.addFilter(objToAdd);
    } else {
      const objToAdd = {
        name: props.title,
        value: text,
      };
      props.addFilter(objToAdd);
    }
  }

  function handleUncheck() {}

  const transitions = useTransition(checked, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return transitions.map(({ item, key, props }) =>
    item ? (
      <animated.div
        className="d-flex justify-content-between filterItem"
        style={props}
        onClick={() => setChecked(false)}
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
