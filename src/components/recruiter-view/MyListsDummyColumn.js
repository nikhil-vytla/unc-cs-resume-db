import React from "react"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Component that displays if My Lists component is hidden from view
function MyListsDummyColum(props){
    return (
    <div className="myListsDummyColumn">
         <div className="myListsDummyArrowDiv" onClick={() => props.setMyListsToggle()}>
                <ArrowBackIcon className="filterArrowIcon" />

            </div>
        <div className="myListsDummyHeader">

        </div>
    </div>
    )
} export default MyListsDummyColum