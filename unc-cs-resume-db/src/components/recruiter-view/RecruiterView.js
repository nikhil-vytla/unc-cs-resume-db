import React, { useState } from 'react';
import Candidates from "./Candidates"
import Filter from "./Filter"
import MyList from "./MyList"
import Logo from "../Logo"
import ResumeView from "./ResumeView"
import { useTransition, animated } from 'react-spring'

import { Col, Row, Container } from "react-bootstrap"

function RecruiterView() {
    const [resumeView, setResumeView] = useState(true)

    function toggleResumeView() {
        setResumeView(!resumeView)
        ;
    }
    const transitions = useTransition(resumeView, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })
    return transitions.map(({ item, key, props }) =>
        item
            ? <animated.div style={props}>
                <Container fluid className="p-0 vw-100" style={{ backgroundColor: '#13294B' }}>
                    <Row className="mb-30">
                        <Logo isLarge="false" />
                    </Row>
                    <Row className="vw-100">
                        <Col md="auto">
                            <Filter />
                        </Col>
                        <Col md="auto">
                            <Candidates toggleResumeView={() => toggleResumeView()} />
                        </Col>
                        <Col md="auto">
                            <MyList />
                        </Col>
                    </Row>
                </ Container >
            </animated.div>
            : <animated.div style={props}>
                <Container fluid className="p-0 vw-100" style={{ backgroundColor: '#13294B' }}>
                    <Row>
                        <Logo isLarge="false" />
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <ResumeView toggleResumeView={() => toggleResumeView()} />
                        </Col>
                    </Row>

                </Container>
            </animated.div>
    )




}
export default RecruiterView