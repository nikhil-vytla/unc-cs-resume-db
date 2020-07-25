import React, { useState } from "react"
import MyListDropDown from "./MyListsDropDown"

function MyListsDropDownWrapper(props){
    const[list , setList] = useState(props.list)
    console.log(list)
    if(list){
        return list.map(listItem =>
            <MyListDropDown key={listItem.Name} listTitle={listItem.Name} students={listItem.Students} toggleResumeView={(candidate) => props.toggleResumeView(candidate)}/>
            )
    } else{
        return null
    }


} export default MyListsDropDownWrapper