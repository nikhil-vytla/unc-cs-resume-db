import React, { useState } from "react"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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


    // let collapsedView = (
    //     <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(true)} >
    //         <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
    //         {props.collapsedIcon}
    //     </div>
    // );


    // let expandedView = (
    //     <div>
    //         <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(false)}>
    //             <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
    //         </div>
    //     </div>
    // );

  
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