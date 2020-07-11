import React, {Component} from 'react';
import "../../Static/MyList.css"
import MyListDropDown from "./MyListsDropDown"
function MyLists() {
    const names = ["Lebron James", "Kevin Gurkowitz", "Dwayne Johsnon"]

    
    return (
        <div>
            <h1 className="recruiterViewHeader BreeSerif"  style={{width: '25vw'}}>My Lists</h1>
            <div>
                <MyListDropDown  listTitle="Frontend" names={names}/>
                <MyListDropDown  listTitle="CyberSecurity" names={names}/>
                <MyListDropDown  listTitle="Backend" names={names}/>
                <MyListDropDown  listTitle="Fin Tech" names={names}/>

            </div>
        </div>

    );
}

export default MyLists