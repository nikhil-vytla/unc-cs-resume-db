import React, {useState} from "react"
import { preProcessFile } from "typescript";

// The type property allows you to switch between "ResumeView" and "Notes" dropdowns 
//The primary difference between these two is the type of content that goes inside the expanded container
// The Notes type container contains an <textfield> tag allowing recruiters to leave comments on a profile
// The ResumeView type container contains <h1> tags
// The text prop controls the content of the dropdown header
// the collapsedIcon and expandedIcon  props allow you to pass in custom icons which change along with the state of the container
// the items prop (expects an array) is used to control the inner content of the dropdown down for the "ResumeView" dropdown


function RecruiterViewDropDown (props) {
    const [collapsed, setCollapsed] = useState(true);

    if(props.items === null || props.items ===undefined || props.items === [] || props.items[0] === undefined){
        return null
    }

    if (props.type === "ResumeView"){
        if(!collapsed){
            return(
                <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(true)} >
                    <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
                    {props.collapsedIcon}
                </div>
            );
        }  else {
            return(
                <div>
                    <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(false)}>
                        <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
                        {props.expandedIcon}
                    </div>
                    <div className="d-flex justify-content-start p-10px"> 
                        {props.items.map(item => (
                        
                            <h1 className="recruiterViewItems BreeSerif "> {item} </h1>
                            
                        ))}
                    </div>
                </div>
                
                )
        }
    } else if (props.type === "Notes") {
        if(!collapsed){
            return(
                <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(true)} >
                    <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
                    {props.collapsedIcon}
                </div>
            );
        }  else {
            return(
                <div>
                    <div className="resumeViewDropDownDiv" onClick={() => setCollapsed(false)}>
                        <h1 className="BreeSerif resumeViewDropDownText" > {props.text} </h1>
                        {props.expandedIcon}
                    </div>
                    <div className="d-flex justify-content-start "> 
                        {props.items.map(item => (
                        
                            <textarea className='resumeViewNotes' > </textarea>
                            
                        ))}
                    </div>
                </div>
                
                )
        }
    }
        
}  

export default RecruiterViewDropDown