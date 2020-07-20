import React from 'react';
import CandidateCard from "./CandidateCard"

function Candidates (props) {
    
    return (
        <div>
            <h1 className="recruiterViewHeader BreeSerif" style={{width: '50vw'}}> Candidates</h1>
            <div className="d-flex recruiterViewCardDiv">
                {props.candidateCards.map( Candidate =>(
                            <CandidateCard toggleResumeView={(candidate) => props.toggleResumeView(candidate)} key={Candidate.Email} info={Candidate}/>

                ))}
                
            </div>
            

        </div>
        
    );

}
export default Candidates