import React, { useState, useEffect } from "react";
import { useTransition, animated } from 'react-spring'
import Filter from "./Filter"
import MyLists from "./MyLists"
import Candidates from "./Candidates"
import { Col, Row, Container } from "react-bootstrap"
import FilterDummyColumn from "./FilterDummyColumn"
import MyListsDummyColumn from "./MyListsDummyColumn"


// This component allows recruiters to expand the canidate section using the arrows located in the Mylists and Filter sections

function RecruiterViewColumns(props) {
    const [myListsToggle, setMyListsToggle] = useState(true);
    const [filterToggle, setFilterToggle] = useState(true);
    const recruiterObj = props.recruiterObj
    let leftColumn = "recruiterViewColumn"
    let filters = props.filters



    // determines the width of columns by the currently toggled views
    let cardWidth = "recruiterViewColumn50vw";


    if (!filterToggle && !myListsToggle) {
        cardWidth = "recruiterViewColumn95vw";
        leftColumn = "recruiterViewLeftColumn";
    } else if (!filterToggle) {
        cardWidth = "recruiterViewColumn65vw";
        leftColumn = "recruiterViewLeftColumn";
    } else if (!myListsToggle) {
        cardWidth = "recruiterViewColumn75vw"

    }
    let toggleResumeView = props.toggleResumeView;

    const filterTransitions = useTransition(filterToggle, null, {
        from: { opacity: 1, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 1, transform: 'translateX(0%)' },
    })
    const myListsTransitions = useTransition(myListsToggle, null, {
        from: { opacity: 1, transform: 'translateX(100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 1, transform: 'translateX(0%)' },
    })


    //solution to a weird bug not allowing props to pass into animated divs
    let updateRecruiterOutside = () => props.updateRecruiter();
    let addFilter = (filterName) => props.addFilter(filterName);
    let removeFilter = (filterName) => props.removeFilter(filterName);
    let isCurrentFilter = (objToAdd) => props.isCurrentFilter(objToAdd);
    let setCurrentStudentSearch = (name) => props.setCurrentStudentSearch(name);
    let currentStudentSearch = props.currentStudentSearch;
    return (
        <Container fluid className="p-0 vw-100 recruiterViewContainer" style={{ backgroundColor: '#13294B' }}>
            <Row className="vw-100 recruiterViewRow">
                <Col md="auto" className={leftColumn}>
                    {filterTransitions.map(({ item, key, props }) =>
                        item
                            ? <animated.div className="filterAnimatedDiv" style={props}>
                                <Filter
                                    isCurrentFilter={(objToAdd) => isCurrentFilter(objToAdd)}
                                    addFilter={addFilter}
                                    filters={filters}
                                    removeFilter={(filterName) => removeFilter(filterName)}
                                    setFilterToggle={() => setFilterToggle(!filterToggle)}
                                    setCurrentStudentSearch={setCurrentStudentSearch}
                                    currentStudentSearch={currentStudentSearch}
                                />
                            </animated.div>
                            : <animated.div className="filterAnimatedDiv" style={props}><FilterDummyColumn setFilterToggle={() => setFilterToggle(!filterToggle)} /></animated.div>
                    )
                    }
                </Col>
                <Col md="auto" className={cardWidth}  >
                    <Candidates
                        candidateCards={props.cards}
                        style={{ width: "100%" }}
                        updateRecruiter={() => props.updateRecruiter()}
                        recruiter={recruiterObj}
                        toggleResumeView={(candidate) => props.toggleResumeView(candidate)}
                        currentStudentSearch={currentStudentSearch}
                    />
                </Col>
                <Col md="auto" className="recruiterViewColumn">
                    {myListsTransitions.map(({ item, key, props }) =>
                        item
                            ? <animated.div className="filterAnimatedDiv" style={props}><MyLists myListsRecruiter={recruiterObj} updateRecruiter={() => updateRecruiterOutside()} toggleResumeView={(candidate) => toggleResumeView(candidate)} setMyListsToggle={() => setMyListsToggle(!myListsToggle)} /></animated.div>
                            : <animated.div className="filterAnimatedDiv" style={props}><MyListsDummyColumn setMyListsToggle={() => setMyListsToggle(!myListsToggle)} /></animated.div>
                    )
                    }
                </Col>
            </Row>
        </ Container >)



} export default RecruiterViewColumns