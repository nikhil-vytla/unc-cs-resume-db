import React from 'react'
import { useState } from "react"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import MyListsDropDownItem from "./MyListsDropDownItem"
import Dropdown from "react-bootstrap/Dropdown"
import {withFirebase} from "../Firebase"
import axios from "axios"


function MyListsDropDown( {Firebase, ...props} ){
    const [collapsed, setColapsed] = useState(true)
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <MoreVertIcon

            className="myListIcons"
            ref={ref}
            onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          &#x25bc;
        </MoreVertIcon>
      ));


    const handleDelete = async () => {
        // Checks if listName is empty then sends to endpoint
        const objToSend = {
            nameOfList: props.listTitle,
            recruiterUID: Firebase.auth.currentUser.uid,
        };
        //deletes the current list if the list name is not null
        if (props.listTitle !== null && props.listTitle !== "") {
           await axios.put(
                "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/removeList",
                objToSend
            );
        }
        props.updateRecruiter();
    };
    if (collapsed) {
        return (
            <div className="d-flex justify-content-between myListTitleHeader"   >
                <h1 className="myListTitle"> {props.listTitle}  </h1>
                <div className="d-flex">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleDelete()}>Delete List</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
    
                    <AddIcon className='myListIcons' onClick={() => setColapsed(false)}/>
                </div>
            </div>

        );
    } else {
        return (
            <div>
                <div className="d-flex justify-content-between myListTitleHeader"  >
                <h1 className="myListTitle"> {props.listTitle}  </h1>
                <div className="d-flex">
                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item  onClick={() => handleDelete()}>Delete List</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                   
                    <RemoveIcon className='myListIcons' onClick={() => setColapsed(true)}/>
                </div>



             
            </div>
                {props.students.map( currentStudent =>(
                    <MyListsDropDownItem  updateRecruiter={() => props.updateRecruiter()} listTitle={props.listTitle} student={currentStudent} toggleResumeView={(candidate) => props.toggleResumeView(candidate)} />
                ))}


            </div>

        );
    }
    
} 
export default withFirebase(MyListsDropDown)