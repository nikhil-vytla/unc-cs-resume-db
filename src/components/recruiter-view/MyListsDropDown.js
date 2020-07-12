import React from 'react'
import { useState } from "react"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import MyListsDropDownItem from "./MyListsDropDownItem"


function MyListsDropDown( props){
    const [collapsed, setColapsed] = useState(true)

    if (collapsed) {
        return (
            <div className="d-flex justify-content-between myListTitleHeader" onClick={() => setColapsed(false)}  >
                <h1 className="myListTitle"> {props.listTitle}  </h1>
                <div >
                    <MoreVertIcon className="myListIcons" />
                    <AddIcon className='myListIcons' onClick={() => setColapsed(false)}/>
                </div>
            </div>

        );
    } else {
        return (
            <div>
                <div className="d-flex justify-content-between myListTitleHeader" onClick={() => setColapsed(true)} >
                <h1 className="myListTitle"> {props.listTitle}  </h1>
                <div >
                    <MoreVertIcon className="myListIcons" />
                    <RemoveIcon className='myListIcons' onClick={() => setColapsed(true)}/>
                </div>

            </div>
                {props.names.map( name =>(
                    <MyListsDropDownItem  name={name}/>
                ))}


            </div>

        );
    }
    
} 
export default MyListsDropDown