import React from "react"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


function FilterDummyColumn(props){
    return (
    <div className="filterDummyColumn">
         <div className="dummyArrowDiv" onClick={() => props.setFilterToggle()}>
                <ArrowForwardIcon className="filterArrowIcon" />

            </div>
        <div className="filterDummyHeader">

        </div>
    </div>
    )
} export default FilterDummyColumn