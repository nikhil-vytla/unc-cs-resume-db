import React from "react";
import CandidateCard from "./CandidateCard";


// This component maps the list of students in the database, obtained in RecruiterView, to Candidate Cards
function Candidates(props) {
  return (
    <div style={{ width: "100%" }}>
      <h1 className="recruiterViewHeader BreeSerif" style={{ width: "100%" }}>
        {" "}
        Candidates
      </h1>
      <div className="d-flex justify-content-center recruiterViewCardWrapper">
        <div className="d-flex recruiterViewCardDiv">
          {props.candidateCards.filter((candidate) => {
            let name = candidate["First Name"] + " " + candidate["Last Name"];
            return name.toLowerCase().includes(props.currentStudentSearch.toLowerCase());
          }
          ).map((Candidate) => (
            <CandidateCard
              updateRecruiter={() => props.updateRecruiter()}
              recruiter={props.recruiter}
              toggleResumeView={(candidate) =>
                props.toggleResumeView(candidate)
              }
              key={Candidate.Email}
              info={Candidate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Candidates;
