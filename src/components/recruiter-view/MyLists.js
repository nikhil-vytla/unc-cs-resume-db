import React, { useState } from 'react';
import "./recruiterViewCss/MyList.css"
import MyListsDropDownWrapper from "./MyListsDropDownWrapper"
import MyListsHeader from "./MyListsHeader"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';




function MyLists(props) {
    //outer most component for the MyLists Section


    let listWrapper = null;
    if (props.myListsRecruiter !== null && props.myListsRecruiter !== undefined) {
        listWrapper = (<MyListsDropDownWrapper updateRecruiter={() => props.updateRecruiter()} list={props.myListsRecruiter[0]["Lists"]} toggleResumeView={(candidate) => props.toggleResumeView(candidate)} />);

    }

    return (
        <div className="myListsContainerDiv">
            <div className="myListsArrowDiv" onClick={() => props.setMyListsToggle()}>
                <ArrowForwardIcon className="myListsArrowIcon" />

            </div>
            <MyListsHeader updateRecruiter={() => props.updateRecruiter()} />

            <div className="myListsScroll">
                {listWrapper}



            </div>
        </div>

    );
}

export default MyLists