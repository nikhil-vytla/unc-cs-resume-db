import React, { useState } from "react"
import MyListDropDown from "./MyListsDropDown"

function MyListsDropDownWrapper(props) {
    const [list, setList] = useState(props.list)

    

console.log(list)
if (list !== null && list !== undefined) {
    return Object.keys(list).map(item => (
        <MyListDropDown key={item} listTitle={item} students={list[item]} toggleResumeView={(candidate) => props.toggleResumeView(candidate)} />
    ))
} else {
    return null
}


} export default MyListsDropDownWrapper