import React, { useState } from "react";
import { useTransition} from 'react-spring'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';



function ResumeViewNotes( props) {


    // Identical to the ResumeViewDropDowns Component except it displays a note section instead of a students skills
    const [collapsed, setCollapsed] = useState(false)

    const transitions = useTransition(collapsed, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 1 },
    })


    let icon = <AddIcon  className="resumeViewDropDownIcon" />;
    let expandedView = null

    if (!collapsed) {
        expandedView = (

            <div className="d-flex justify-content-start ">
                <textarea className='resumeViewNotes' > </textarea>
            </div>


        );
        icon = <RemoveIcon className="resumeViewDropDownIcon"/> 

    }



    return (
        <div>
            <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(!collapsed)}>
                <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
                {icon}
            </div>
            {expandedView}
        </div>


    )



} export default ResumeViewNotes