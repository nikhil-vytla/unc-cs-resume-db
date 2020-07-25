import React from "react"
import ClearIcon from '@material-ui/icons/Clear';
import PrintIcon from '@material-ui/icons/Print';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import RecruiterViewDropDown from "./RecruiterViewDropDown"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';



function ResumeView (props) {
    const skills = props.candidate.Skills
    const events = props.candidate["Resume Access"]
    const primaryMajor = [props.candidate.Majors[0]]
    const secondaryMajor = [props.candidate.Majors[1]]
    const minors = [props.candidate.Minors]

    return(
        <div className="resumeViewDiv">
            <div className="d-flex justify-content-end ">
                <div className=" resumeViewNav">
                    <StarBorderOutlinedIcon fontSize="large" />
                    <PrintIcon fontSize="large"/>
                    <MailOutlineIcon fontSize="large"/>
                    <ClearIcon fontSize="large" onClick={() => props.toggleResumeView(props.candidate)}/>
                    
                </div>
            </div>
            <div className="w-100 d-flex" >
                <img className="resumeImage" src={require('../../Static/ResumeTemplate.jpg')}  alt=""></img>
                <div>
                    <div className='resumeViewHeader' >
                            <h1 style={{ fontSize: '30px' }} className="BreeSerif">{props.candidate["First Name"]}  {props.candidate["Last Name"]}</h1>
                        <div className='d-flex justify-content-between classInfoDiv'>
                            <h1 style={{ fontSize: "25px", color:"#000000",lineHeight: "40px", paddingLeft:'5px'}} > {props.candidate["Graduation Year"]} </h1>
                            <h1 style={{ fontSize: "25px",  color:"#000000", lineHeight: "40px", paddingRight:'5px'}} > {props.candidate.School} </h1>

                        </div>
                        
                    </div>
                    <RecruiterViewDropDown  type="ResumeView" text="Skills" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={skills}/>
                    <RecruiterViewDropDown  type="ResumeView" text="Events" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={events}/>
                    <RecruiterViewDropDown  type="ResumeView" text="Primary Major" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={primaryMajor}/>
                    <RecruiterViewDropDown  type="ResumeView" text="Secondary Major" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={secondaryMajor}/> 
                    <RecruiterViewDropDown  type="ResumeView" text="Minors" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={minors}/>  
                    <RecruiterViewDropDown  type="Notes" text="Notes" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={minors}/>
                </div>
            </div>
        </div>
    )

}

export default ResumeView