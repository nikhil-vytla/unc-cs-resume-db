import React, { useState } from 'react';
import "../../Static/MyList.css"
import MyListsDropDownWrapper from "./MyListsDropDownWrapper"
import MyListsHeader from "./MyListsHeader"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';




function MyLists(props) {

    const [myLists, setMyLists] = useState(props.myListsRecruiter);
    // "My Lists":[
    //     {
    //         "Name":"FrontEnd",
    //         "Students":[
    //             {
    //                 "First Name":"Adam",
    //                 "Last Name":"Winek",
    //                 "Email":"AdamWinek@gmail.com",
    //                 "UID":"1nyuPOBqirZ2GsLDkIcR3iaPZfu2"
    //             },
    //             {
    //                 "First Name":"Sai",
    //                 "Last Name":"Gongidi",
    //                 "Email":"Sai@gmail.com",
    //                 "UID":"1nyuPOBqirZ2GsLDkIcR3iaPZfu2"
    //             },
    //             {
    //                 "First Name":"Tucker",
    //                 "Last Name":"Resig",
    //                 "Email":"Tucker@gmail.com",
    //                 "UID":"JFN2bkEL16bMjXDeM8Ol6lg4rJ62"
    //             }

    //         ]
    //     },
    //     {
    //         "Name":"BackEnd",
    //         "Students":[
    //             {
    //                 "First Name":"Adam",
    //                 "Last Name":"Winek",
    //                 "Email":"AdamWinek@gmail.com",
    //                 "UID":"1nyuPOBqirZ2GsLDkIcR3iaPZfu2"
    //             },
    //             {
    //                 "First Name":"Sai",
    //                 "Last Name":"Gongidi",
    //                 "Email":"Sai@gmail.com",
    //                 "UID":"1nyuPOBqirZ2GsLDkIcR3iaPZfu2"
    //             },
    //             {
    //                 "First Name":"Tucker",
    //                 "Last Name":"Resig",
    //                 "Email":"Tucker@gmail.com",
    //                 "UID":"JFN2bkEL16bMjXDeM8Ol6lg4rJ62"
    //             }

    //         ]
    //     }

    // ]
    // });

    let listWrapper = null;
    if (myLists !== null && myLists !== undefined) {
        listWrapper = (<MyListsDropDownWrapper list={myLists[0]["My Lists"]} toggleResumeView={(candidate) => props.toggleResumeView(candidate)} />);

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