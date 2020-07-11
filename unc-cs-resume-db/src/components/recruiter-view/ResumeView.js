import React from "react"
import ClearIcon from '@material-ui/icons/Clear';
import PrintIcon from '@material-ui/icons/Print';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import RecruiterViewDropDown from "./RecruiterViewDropDown"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';



function ResumeView (props) {
    const skills = ["HTML", "CSS", "SQL"]
    const events = ["UNC CS Carrer Fair", "Hack NC"]
    const primaryMajor = ["Computer Science"]
    const secondaryMajor = ["Mathematics"]
    const minors = ["Stor"]

    return(
        <div className="resumeViewDiv">
            <div className="d-flex justify-content-end ">
                <div className=" resumeViewNav">
                    <StarBorderOutlinedIcon fontSize="large" />
                    <PrintIcon fontSize="large"/>
                    <MailOutlineIcon fontSize="large"/>
                    <ClearIcon fontSize="large" onClick={() => props.toggleResumeView()}/>
                    
                </div>
            </div>
            <div className="w-100 d-flex" >
                <img className="resumeImage" src={require('../../Static/ResumeTemplate.jpg')}  alt=""></img>
                <div>
                    <div className='resumeViewHeader' >
                        <h1 style={{ fontSize: '30px' }} className="BreeSerif">Adam Winek</h1>
                        <div className='d-flex justify-content-between classInfoDiv'>
                            <h1 style={{ fontSize: "25px", color:"#000000",lineHeight: "40px", paddingLeft:'5px'}} > Class of 2022 </h1>
                            <h1 style={{ fontSize: "25px",  color:"#000000", lineHeight: "40px", paddingRight:'5px'}} > Unc Chapel Hill </h1>

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
                    <RecruiterViewDropDown  type="ResumeView" text="Minor" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={minors}/>  
                    <RecruiterViewDropDown  type="Notes" text="Notes" collapsedIcon={ <AddIcon  className="resumeViewDropDownIcon" /> } 
                        expandedIcon={ <RemoveIcon className="resumeViewDropDownIcon"/> }  items={minors}/>
                </div>
            </div>
        </div>
    )

}

export default ResumeView