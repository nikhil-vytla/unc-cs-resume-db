import React, { useState, useEffect } from 'react';
import Candidates from "./Candidates"
import Filter from "./Filter"
import MyLists from "./MyLists"
import ResumeView from "./ResumeView"
import { useTransition, animated } from 'react-spring'
import '../../Static/RecruiterView.css';
import CandidatesList from "../../Static/Candidates.json"
import firebase from "../../Firebase"
import Spinner from 'react-bootstrap/Spinner'



import { Col, Row, Container } from "react-bootstrap"

function RecruiterView() {
    const [resumeView, setResumeView] = useState(true)
    const [candidate, setCandidate] = useState(CandidatesList.CandidatesList[0])
    function toggleResumeView(info) {
        setResumeView(!resumeView);
        setCandidate(info);
    }
    const [cards, setCards] = useState(null)


    useEffect(() => {
        async function fetchUsers() {
            const data = firebase.getAllUsers();
            data.then((data) => {
                setCards(data);
            })
        }
        fetchUsers()


    }, []);


    const transitions = useTransition(resumeView, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })


    if (cards && cards[0].Skills) {

        return transitions.map(({ item, key, props }) =>
            item
                ? <animated.div style={props}>
                    <Container fluid className="p-0 vw-100 recruiterViewContainer" style={{ backgroundColor: '#13294B' }}>
                        <Row className="vw-100">
                            <Col md="auto">
                                <Filter />
                            </Col>
                            <Col md="auto">
                                <Candidates candidateCards={cards} toggleResumeView={(candidate) => toggleResumeView(candidate)} />
                            </Col>
                            <Col md="auto">
                                <MyLists toggleResumeView={(candidate) => toggleResumeView(candidate)} />
                            </Col>
                        </Row>
                    </ Container >
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