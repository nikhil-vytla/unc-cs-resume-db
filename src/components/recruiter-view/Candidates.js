import React from "react";
import CandidateCard from "./CandidateCard";
import { Modal, Spinner } from "react-bootstrap"


// This component maps the list of students in the database, obtained in RecruiterView, to Candidate Cards
function Candidates(props) {
  let spinner = null;

  if (props.spinnerView) {
    spinner = (
      <Spinner
        animation="border"
        role="status"
        className="candidateSpinner"
      >
        {" "}
        <span className="sr-only">Loading...</span>{" "}
      </Spinner>
    )
  }




  return (
    <div style={{ width: "100%", position: "relative" }}>
      {spinner}
      <h1 className="recruiterViewHeader BreeSerif" style={{ width: "100%" }}>
        {" "}
        Candidates
      </h1>
      <div className="d-flex justify-content-center recruiterViewCardWrapper">
        <div className="d-flex recruiterViewCardDiv">
          {props.candidateCards.filter((candidate) => {
            let name = candidate["First Name"] + " " + candidate["Last Name"];
            return name.toLowerCase().includes(props.currentStudentSearch.toLowerCase()) && candidate != null;
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
