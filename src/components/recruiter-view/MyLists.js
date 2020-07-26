import React, { useState } from 'react';
import "../../Static/MyList.css"
import MyListsDropDownWrapper from "./MyListsDropDownWrapper"
import MyListsHeader from "./MyListsHeader"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';




function MyLists(props) {

    const [myLists, setMyLists] = useState(props.myListsRecruiter);

    let listWrapper = null;
    if (myLists !== null && myLists !== undefined) {
        listWrapper = (<MyListsDropDownWrapper list={myLists[0]["Lists"]} toggleResumeView={(candidate) => props.toggleResumeView(candidate)} />);

    }

    return (
        <div>
            <div className="myListsArrowDiv" onClick={() => props.setMyListsToggle()}>
                <ArrowForwardIcon className="myListsArrowIcon" />

            </div>
            <MyListsHeader />

            <div>
                {listWrapper}



            </div>
        </div>

    );
}

export default MyLists