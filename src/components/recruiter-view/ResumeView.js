import React from "react"
import ClearIcon from '@material-ui/icons/Clear';
import PrintIcon from '@material-ui/icons/Print';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import RecruiterViewDropDown from "./RecruiterViewDropDown"
import ResumeViewDropDownText from "./ResumeViewDropDownText"

import ResumeViewNotes from "./ResumeViewNotes"




function ResumeView (props) {
    const frameWorks = props.candidate["Frameworks and Tools"]
    const databaseSystems = props.candidate["Database System"]
    const programmingLanguages = props.candidate["Programming Languages"]
    const operatingSystems = props.candidate["Operating Systems"]
    const events = props.candidate["Events"]
    const primaryMajor = props.candidate["Primary Major"]
    const secondaryMajor = props.candidate["Secondary Major"]
    const minors = [props.candidate.Minors]

    return(
        <div className="resumeViewDiv">
            <div className="d-flex justify-content-end ">
                <div className=" resumeViewNav">
                    <StarBorderOutlinedIcon fontSize="large" />
                    <PrintIcon fontSize="large"/>
                    <a href={"mailto:" + props.candidate["Email"]} style={{color:"black"}}>
                        <MailOutlineIcon fontSize="large" />

                    </a>
                    <ClearIcon fontSize="large" onClick={() => props.toggleResumeView(props.candidate)}/>
                    
                </div>
            </div>
            <div className="w-100 d-flex" >
                <div className="resumeViewImageDiv">
                    <img className="resumeImage" src={props.candidate["Resume PDF"]}  alt=""></img>

                </div>
                <div className="resumeViewRightPanel">
                    <div className='resumeViewHeader' >
                            <h1 style={{ fontSize: '30px' , lineHeigt: "40px", marginBottom: "0px"}} className="BreeSerif">{props.candidate["First Name"]}  {props.candidate["Last Name"]}</h1>
                        <div className='d-flex justify-content-between classInfoDiv'>
                            <h1 style={{ fontSize: "25px", color:"#000000",lineHeight: "40px", paddingLeft:'5px'}} > {props.candidate["Graduation Year"]} </h1>
                            <h1 style={{ fontSize: "25px",  color:"#000000", lineHeight: "40px", paddingRight:'5px'}} > {props.candidate.School} </h1>

                        </div>
                        
                    </div>
                    <div className="resumeViewDropDowns">
                        <RecruiterViewDropDown   text="Frameworks and Tools" items={frameWorks}/>
                        <RecruiterViewDropDown   text="Database Systems" items={databaseSystems}/>
                        <RecruiterViewDropDown   text="Programming Languages" items={programmingLanguages}/>
                        <RecruiterViewDropDown   text="Operating Systems" items={operatingSystems}/>

                        <RecruiterViewDropDown   text="Events"    items={events}/>
                        <ResumeViewDropDownText   text="Primary Major" items={primaryMajor}/>
                        <ResumeViewDropDownText   text="Secondary Major"   items={secondaryMajor}/> 
                        <RecruiterViewDropDown   text="Minors"   items={minors}/>  
                        <ResumeViewNotes   text="Notes"  />
                    </div>
                   
                </div>
            </div>
        </div>
    )

}

export default ResumeView