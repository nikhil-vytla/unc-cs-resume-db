import React, { useState } from "react"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


// Identical to the resumeViewDropDown component except it handles single items instead of a list of items
function ResumeViewDropDownText(props) {
    const [collapsed, setCollapsed] = useState(false);
    let expandedView = null;
    let icon = <AddIcon  className="resumeViewDropDownIcon" />


    if (!collapsed) {
        expandedView = (

            <div className="d-flex justify-content-start resumeViewItems">
                    <h1 className="recruiterViewItems BreeSerif "> {props.items} </h1>
            </div>


        );
        icon = (
        <RemoveIcon className="resumeViewDropDownIcon"/>        
            )
    }

  
    if (props.items === null || props.items === "") {
        return null
    } else {
        return (
            <div>
                <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(!collapsed)} >
                    <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
                    {icon}
                </div>
                {expandedView}
            </div>


        )
    }
}
export default ResumeViewDropDownText