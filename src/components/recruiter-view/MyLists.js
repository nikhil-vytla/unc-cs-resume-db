import React from 'react';
import "../../Static/MyList.css"
import MyListDropDown from "./MyListsDropDown"
import lists from "../../Static/MyLists.json"

function MyLists(props) {

    
    return (
        <div>
            <div className="d-block">
                <h1 className="recruiterViewHeader BreeSerif"  style={{width: '25vw'}}>My Lists</h1>
            </div>
            <div>
                {lists.MyList.map((list) => (
                    <MyListDropDown key={list.Title} listTitle={list.Title} students={list.Students} toggleResumeView={(candidate) => props.toggleResumeView(candidate)}/>
                ))}
                

            </div>
        </div>

    );
}

export default MyLists