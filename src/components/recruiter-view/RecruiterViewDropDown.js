import React, { useState } from "react"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function RecruiterViewDropDown(props) {
    const [collapsed, setCollapsed] = useState(false);
    let itemArray = []

    if (props.items !== null && props.items !== undefined) {
        Object.keys(props.items).forEach((key, index) => {
            if (props.items[key] === true) {
                itemArray.push(key);
            }

        })

    }
    let expandedView = null;
    let icon = <AddIcon  className="resumeViewDropDownIcon" />


    if (!collapsed) {
        expandedView = (

            <div className="d-flex justify-content-start resumeViewItems">

                {itemArray.map(item => (

                    <h1 className="recruiterViewItems BreeSerif "> {item} </h1>

                ))}
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

    console.log(itemArray)
    if (props.items === null || itemArray.length === 0) {
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

export default RecruiterViewDropDown