import React, { useState } from "react"
import Card from 'react-bootstrap/Card'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
import CandidateCardTag from "./CandidateCardTag";
import "../../Static/candidates.css"


function CandidateCard(props) {
    const [starToggle, setStarToggle] = useState(false);
    let primaryMajor
    if (props.info["Primary Major"] !== ""){
        primaryMajor  = (<p className="recruiterViewTag BreeSerif"> {props.info["Primary Major"]}</p>)

    } else{
        primaryMajor = null
    }

    let secondaryMajor
    if (props.info["Secondary Major"] !== ""){
        secondaryMajor  = (<p className="recruiterViewTag BreeSerif"> {props.info["Secondary Major"]}</p>)

    } else{
        secondaryMajor = null
    }





    var star
    if (!starToggle) {
        star = <StarBorderOutlinedIcon className="recruiterViewIcon" onClick={() => setStarToggle(true)} />
    } else {
        star = <StarIcon onClick={() => setStarToggle(false)} className="recruiterViewIcon" style={{ color: '#4B9CD3' }} />
    }

    if (props.info["Hide Resume"] === true) {
        return null;
    } else {
        return (
            <Card className="candidateCard " >
                <Card.Header className=" bg-white m-0 p-0 " style={{ borderRadius: "15px" }}>
                    <div className="d-flex" >
                        <img className="rounded-circle cardImg" src={props.info["Profile Image"]} height="75px" width="75px" alt="" ></img>
                        <div style={{ width: '75px', overflow:"hidden" }} >
                            <div className="cardHeaderTextDiv">
                                <h1 className='cardHeaderText BreeSerif' style={{ color: '#000000' }}>{props.info["First Name"]}</h1>
                                <h1 className='cardHeaderText BreeSerif' style={{ color: '#000000' }}>{props.info["Last Name"]}</h1>
                                <h2 className='cardHeaderText'>{props.info["Graduation Year"]}</h2>
                            </div>

                        </div>
                    </div>


                    <div className="cardHeader d-flex justify-content-center">
                        <p className="cardSchoolHeaderText BreeSerif" >{props.info["School"]}</p>

                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    <div className="bg-white BreeSerif d-flex justify-content-start w-100 flex-wrap cardTagContainer" >

                        <CandidateCardTag items={props.info["Frame Works and Tools"]}></CandidateCardTag>
                        <CandidateCardTag items={props.info["Database Systems"]}></CandidateCardTag>
                        <CandidateCardTag items={props.info["Programming Languages"]}></CandidateCardTag>
                        <CandidateCardTag items={props.info["Operating Systems"]}></CandidateCardTag>

                        <CandidateCardTag items={props.info["Events"]}></CandidateCardTag>
                        {primaryMajor}
                        {secondaryMajor}
                        <CandidateCardTag items={props.info["Minors"]}></CandidateCardTag>

                        

                        {/* {props.info.Skills.map(skill =>
                                    
                                    <p className="recruiterViewTag BreeSerif" key={skill}> {skill}</p>
                                )}
                            {props.info["Resume Access"] && props.info["Resume Acess"].map(event =>
                                <p className="recruiterViewTag BreeSerif" key={event}> {event}</p>
                            )}
                            
                            <p className="recruiterViewTag BreeSerif" > {props.info.PrimaryMajor}</p>,
                            <p className="recruiterViewTag BreeSerif"> {props.info.SecondaryMajor}</p>,
                            {props.info["Minors"] && props.info["Minors"].map(minor =>
                                <p className="recruiterViewTag BreeSerif" key={minor}> {minor}</p>
                            ) } */}



                    </div>
                    <div className=" d-flex justify-content-around cardIconDiv">
                        {star}
                        <a href={"mailto:" + props.info.Email} style={{ color: "#25282B" }}>
                            <MailOutlineIcon className="recruiterViewIcon" />

                        </a>

                        <ZoomInOutlinedIcon className="recruiterViewIcon" onClick={() => props.toggleResumeView(props.info)} />
                    </div>
                </Card.Body>
            </Card>

        )
    }
}
export default CandidateCard