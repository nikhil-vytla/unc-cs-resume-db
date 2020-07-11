import React, {props} from 'react';
import CandidateCard from "./CandidateCard"

function Candidates (props) {
    
    return (
        <div>
            <h1 className="recruiterViewHeader BreeSerif" style={{width: '50vw'}}> Candidates</h1>
            <div className="d-flex cardDiv">
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                <CandidateCard toggleResumeView={() => props.toggleResumeView()}/>
                
            </div>
            

        </div>
        
    );

}
export default Candidates