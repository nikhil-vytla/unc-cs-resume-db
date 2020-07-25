import React from 'react';
import CandidateCard from "./CandidateCard"

function Candidates (props) {
    
    console.log(props.candidateCards)
    return (
        <div style={{width:'100%'}}>
            <h1 className="recruiterViewHeader BreeSerif" style={{width: '100%'}}> Candidates</h1>
            
                    <div className="d-flex recruiterViewCardDiv">
                        {props.candidateCards.map( Candidate =>(
                                    <CandidateCard recruiter={props.recruiter} toggleResumeView={(candidate) => props.toggleResumeView(candidate)} key={Candidate.Email} info={Candidate}/>

                        ))}
                    </div>
        </div>
        
    );

}
export default Candidates