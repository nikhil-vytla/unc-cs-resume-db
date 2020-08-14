import React from "react"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// Simple component that displays when the filter view is pushed off screen using the arrow buttons
function FilterDummyColum(props){
    return (
    <div className="filterDummyColumn">
         <div className="dummyArrowDiv" onClick={() => props.setFilterToggle()}>
                <ArrowForwardIcon className="filterArrowIcon" />

            </div>
        <div className="filterDummyHeader">

        </div>
    </div>
    )
} export default FilterDummyColum