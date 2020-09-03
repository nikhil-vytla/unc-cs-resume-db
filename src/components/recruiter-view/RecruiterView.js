import React, { useState, useEffect } from "react";

import ResumeView from "./ResumeView";
import { useTransition, animated } from "react-spring";
import "../../Static/RecruiterView.css";
import CandidatesList from "../../Static/Candidates.json";
import Spinner from "react-bootstrap/Spinner";
import RecruiterViewColumns from "./RecruiterViewColumns";
import { Col, Row, Container } from "react-bootstrap";
import { withFirebase } from "../Firebase";
import axios from "axios";

function RecruiterView({ Firebase, ...props }) {
  const [resumeView, setResumeView] = useState(true);
  const [recruiter, setRecruiter] = useState(null);
  const [candidate, setCandidate] = useState(CandidatesList.CandidatesList[0]);
  const [filters, setFilters] = useState(null);
  const [queries, setQueries] = useState(null);
  const [currentResumeAccess, setResumeAccess] = useState(null);
  function toggleResumeView(info) {
    setResumeView(!resumeView);
    setCandidate(info);
  }

  async function getListArrays(collection, doc) {
    const data = await Firebase.db.collection(collection).doc(doc).get();
    return data.data();
  }
  async function collectData() {
    const gradHolder = await getListArrays("Graduation Year", "gradYears");
    const languageHolder = await getListArrays(
      "Programming Languages",
      "progLanguages"
    );
    const dbSystemHolder = await getListArrays(
      "Database Systems",
      "databaseSystems"
    );
    const opSystemHolder = await getListArrays(
      "Operating Systems",
      "operatingSystems"
    );
    const majorsHolder = await getListArrays("Majors", "majorsList");
    const frameworksHolder = await getListArrays(
      "Frameworks and Tools",
      "frameworksAndTools"
    );
    const schoolsHolder = await getListArrays("Schools", "SchoolsList");

    const eventHolder = await getListArrays("Events", "eventsList");

    const recruiterResumeAccessData = await Firebase.db
      .collection("recruiters")
      .doc(Firebase.auth.currentUser.uid)
      .get();

    const recruiterResumeAccess = recruiterResumeAccessData.data();

    setFilters({
      "Graduation Year": gradHolder.gradYearList,
      "Programming Languages": languageHolder.progLanguages,
      "Database Systems": dbSystemHolder.databaseSystems,
      "Operating Systems": opSystemHolder.operatingSystems,
      "Primary Major": majorsHolder.majorsList,
      "Secondary Major": majorsHolder.majorsList,
      Minors: majorsHolder.majorsList,
      "Frameworks and Tools": frameworksHolder.frameworksAndTools,
      School: schoolsHolder.schoolsList,
      // Events: eventHolder.eventsList,
      Events: recruiterResumeAccess["Resume Access"],
      "Active Filters": {
        "Programming Languages": [],
        "Frameworks and Tools": [],
        School: [],
        Events: [],
        "Primary Major": [],
        "Secondary Major": [],
        Minors: [],
        "Operating Systems": [],
        "Database Systems": [],
        "Graduation Year": [],
      },
    });

    // Gets the prev query data to make queries more efficient
    setQueries({
      "Active Queries": {
        "Programming Languages": { prevFilters: [], prevQuery: [] },
        "Frameworks and Tools": { prevFilters: [], prevQuery: [] },
        School: { prevFilters: [], prevQuery: [] },
        Events: { prevFilters: [], prevQuery: [] },
        "Primary Major": { prevFilters: [], prevQuery: [] },
        "Secondary Major": { prevFilters: [], prevQuery: [] },
        Minors: { prevFilters: [], prevQuery: [] },
        "Operating Systems": { prevFilters: [], prevQuery: [] },
        "Database Systems": { prevFilters: [], prevQuery: [] },
        "Graduation Year": { prevFilters: [], prevQuery: [] },
      },
    });
  }

  async function addFilter(filterName) {
    let filterArr = filters["Active Filters"];
    const queryObj = queries["Active Queries"];
    let specificFilter = "";

    if (filterName.name.includes(".")) {
      const index = filterName.name.indexOf(".");
      specificFilter = filterName.name.slice(0, index);
    } else {
      specificFilter = filterName.name;
    }

    // Adds filter to the correct list
    filterArr[specificFilter].push(filterName);
    setFilters((prev) => ({
      ...prev,
      "Active Filters": filterArr,
    }));
    const preData = await axios.post(
      //"https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/queryV3",
      "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/queryV3",
      {
        filtersForQuery: filterArr,
        empty: false,
        resumeAccess: currentResumeAccess,
        currentRecruiterEmail: Firebase.auth.currentUser.email,
        currentQueries: queryObj,
        newFilter: { [specificFilter]: [filterName] },
      }
    );

    // References student part of the data
    const data = preData.data.students;
    setCards(data);
    // References query part of the data
    const queryData = preData.data.queries;
    setQueries(queryData);
    console.log(queries);
    console.log(queryData);
    // console.log();
    // console.log(data);
  }
  async function removeFilter(filterName) {
    let filterArr = filters["Active Filters"];

    let specificFilter = "";

    if (filterName.name.includes(".")) {
      const index = filterName.name.indexOf(".");
      specificFilter = filterName.name.slice(0, index);
    } else {
      specificFilter = filterName.name;
    }

    let indexForSplice = 0;
    for (let i = 0; i < filterArr[specificFilter].length; i++) {
      if (
        filterArr[specificFilter][i].name === filterName.name &&
        filterArr[specificFilter][i].value === filterName.value
      ) {
        indexForSplice = i;
        break;
      }
    }

    filterArr[specificFilter].splice(indexForSplice, 1);
    setFilters((prev) => ({
      ...prev,
      "Active Filters": filterArr,
    }));

    let isEmpty = true;

    Object.keys(filterArr).forEach((eachFilter) => {
      if (filterArr[eachFilter].length !== 0) {
        isEmpty = false;
      }
    });

    const preData = await axios.post(
      // "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/queryV3",
      "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/queryV3",
      {
        filtersForQuery: filterArr,
        empty: isEmpty,
        //resumeAccess: recruiterResumeAccessObjArray,
        resumeAccess: currentResumeAccess,
        currentRecruiterEmail: Firebase.auth.currentUser.email,
      }
    );

    const data = preData.data;
    setCards(data);
  }
  // Checks the list of current filters for a filter passed from the Filter Item component
  function isCurrentFilter(objToAdd) {
    let exitCondition = false;
    const filterArr = filters["Active Filters"];
    Object.keys(filterArr).forEach((keyName) => {
      filterArr[keyName].forEach((item) => {
        if (item.name === objToAdd.name && item.value === objToAdd.value) {
          exitCondition = true;
          return;
        }
      });
    });
    return exitCondition;
  }
  // The current state of cards displayed in the Candidates section
  const [cards, setCards] = useState(null);

  // gets the newest recruiter object stored in firebase
  // This function is called to display changes made in MyLists
  async function updateRecruiter() {
    const data = await Firebase.getRecruiterInfo(Firebase.auth.currentUser.uid);
    setRecruiter(data);
  }
  // Makes API calls to get all the current cards and the recruiter object from the DB
  useEffect(() => {
    async function fetchUsers() {
      //const data = await Firebase.getAllStudents();
      const recruiterResumeAccessData = await Firebase.db
        .collection("recruiters")
        .doc(Firebase.auth.currentUser.uid)
        .get();

      const recruiterResumeAccess = recruiterResumeAccessData.data();

      console.log(recruiterResumeAccessData);
      console.log(recruiterResumeAccess["Resume Access"]);

      let recruiterResumeAccessObjArray = [];

      recruiterResumeAccess["Resume Access"].forEach((eachEvent) => {
        recruiterResumeAccessObjArray.push({
          name: `Events.${eachEvent}`,
          value: true,
        });
      });

      const data = await axios.post(
        "http://localhost:5001/unc-cs-resume-database-af14e/us-central1/api/resumeAccessStudents",
        { resumeAccess: recruiterResumeAccessObjArray }
      );
      const recruiter = await Firebase.getRecruiterInfo(
        Firebase.auth.currentUser.uid
      );
      setRecruiter(recruiter);
      setCards(data.data);
      setResumeAccess(data.data);
    }
    fetchUsers();
    collectData();
  }, []);

  // Animation for displaying the expanded resume view
  const transitions = useTransition(resumeView, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  if (filters !== null && recruiter !== null && cards !== null) {
    return transitions.map(({ item, key, props }) =>
      item ? (
        <animated.div style={props}>
          <RecruiterViewColumns
            addFilter={(filterName) => addFilter(filterName)}
            isCurrentFilter={(objToAdd) => isCurrentFilter(objToAdd)}
            removeFilter={(filterName) => removeFilter(filterName)}
            filters={filters}
            updateRecruiter={() => updateRecruiter()}
            cards={cards}
            recruiterObj={recruiter}
            toggleResumeView={(candidate) => toggleResumeView(candidate)}
          />
        </animated.div>
      ) : (
        <animated.div style={props}>
          <Container
            fluid
            className="p-0 vw-100 recruiterViewContainer"
            style={{ backgroundColor: "#13294B" }}
          >
            <Row>
              <Col className="d-flex justify-content-center resumeViewContainer">
                <ResumeView
                  candidate={candidate}
                  toggleResumeView={(candidate) => toggleResumeView(candidate)}
                />
              </Col>
            </Row>
          </Container>
        </animated.div>
      )
    );
  } else {
    // loads a spinner if all the api calls are not complete
    return (
      <div className="d-flex justify-content-center recruiterSpinnerDiv">
        <Spinner animation="border" role="status" className="recruiterSpinner">
          {" "}
          <span className="sr-only">Loading...</span>{" "}
        </Spinner>
      </div>
    );
  }
}
export default withFirebase(RecruiterView);
