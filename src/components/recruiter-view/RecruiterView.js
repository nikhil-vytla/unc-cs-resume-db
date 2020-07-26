import React, { useState, useEffect } from 'react';
import Candidates from "./Candidates"

import ResumeView from "./ResumeView"
import { useTransition, animated } from 'react-spring'
import '../../Static/RecruiterView.css';
import CandidatesList from "../../Static/Candidates.json"
import Spinner from 'react-bootstrap/Spinner'
import RecruiterViewColumns from "./RecruiterViewColumns"
import { Col, Row, Container } from "react-bootstrap"
import Firebase from "../../Firebase"

function RecruiterView() {
    const [resumeView, setResumeView] = useState(true)
    const [recruiter, setRecruiter] = useState(null)
    const [candidate, setCandidate] = useState(CandidatesList.CandidatesList[0])
    const [filters, setFilters] = useState(null)
    function toggleResumeView(info) {
        setResumeView(!resumeView);
        setCandidate(info);
    }

    async function getListArrays(collection, doc) {
        const data = await Firebase.db.collection(collection).doc(doc).get();
        return data.data();
    };
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

        
        setFilters(
            {
            "Graduation Year": gradHolder.gradYearList,
            "Programming Languages": languageHolder.progLanguages,
            "Database Systems": dbSystemHolder.databaseSystems,
            "Operating Systems": opSystemHolder.operatingSystems,
            "Primary Major": majorsHolder.majorsList,
            "Secondary Major": majorsHolder.majorsList,
            "Minors": majorsHolder.majorsList,
            "Frameworks and Tools": frameworksHolder.frameworksAndTools,
            "School": schoolsHolder.schoolsList,
            "Events":eventHolder.eventsList,
            "Active Filters": [],
            }


        )


    }

    function addFilter( filterName) {
        let filterArr = filters["Active Filters"]
        if(!filterArr.includes(filterName)){
            setFilters(prev => (
                {

                ...prev,
                "Active Filters":filterArr.push(filterName),
                }
            ))     
        }
    }



    const [cards, setCards] = useState(null)
    async function updateRecruiter() {
        const data = await Firebase.getRecruiterInfo(Firebase.auth.currentUser.uid);
        setRecruiter(data)
    }

    useEffect(() => {
        async function fetchUsers() {
            const data = await Firebase.getAllUsers();
            const recruiter = await Firebase.getRecruiterInfo(Firebase.auth.currentUser.uid);
            setRecruiter(recruiter)
            setCards(data);

        }
        fetchUsers();
        collectData();


    }, []);


    const transitions = useTransition(resumeView, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })


    if (cards && cards[0] && filters !== null && recruiter !== null ) {

        return transitions.map(({ item, key, props }) =>
            item
                ? <animated.div style={props}>
                    <RecruiterViewColumns addFilter={(filterName) => addFilter(filterName)} filters={filters} updateRecruiter={() => updateRecruiter()} cards={cards} recruiterObj={recruiter} toggleResumeView={(candidate) => toggleResumeView(candidate)} />
                </animated.div>
                : <animated.div style={props}>
                    <Container fluid className="p-0 vw-100 recruiterViewContainer" style={{ backgroundColor: '#13294B' }}>
                        <Row>
                            <Col className="d-flex justify-content-center resumeViewContainer">
                                <ResumeView candidate={candidate} toggleResumeView={(candidate) => toggleResumeView(candidate)} />
                            </Col>
                        </Row>

                    </Container>
                </animated.div>
        )
    } else {

        return (
            <div className="d-flex justify-content-center recruiterSpinnerDiv">
                <Spinner animation="border" role="status" className="recruiterSpinner"> <span className="sr-only">Loading...</span> </Spinner>
            </div>
        );

    }











}
export default RecruiterView