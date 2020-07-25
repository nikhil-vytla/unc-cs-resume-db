import React from "react"
import MyListDropDown from "./MyListsDropDown"

function MyListsDropDownWrapper(props){
    if(props.list){
        return props.list.map(listItem =>
            <MyListDropDown key={listItem.Name} listTitle={listItem.Name} students={listItem.Students} toggleResumeView={(candidate) => props.toggleResumeView(candidate)}/>
            )
    } else{
        return null
    }


} export default MyListsDropDownWrapper