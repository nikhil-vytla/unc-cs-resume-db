import React from "react"
import MyListDropDown from "./MyListsDropDown"

function MyListsDropDownWrapper(props) {

    

if (props.list !== null && props.list !== undefined) {
    return Object.keys(props.list).map(item => (
        <MyListDropDown key={item} listTitle={item} students={props.list[item]}  updateRecruiter={() => props.updateRecruiter()} toggleResumeView={(candidate) => props.toggleResumeView(candidate)} />
    ))
} else {
    return null
}


} export default MyListsDropDownWrapper