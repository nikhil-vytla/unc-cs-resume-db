import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ClearIcon from '@material-ui/icons/Clear';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import firebase from "../../Firebase"


function MyListsDropDownItem(props){
    async function handleZoom() {
        try{
            let data = await firebase.getUserInfo(props.student.UID)
            props.toggleResumeView(data[0]);
        } catch{
            console.log("invalid uid");
        }
        
    
    }

    return (
        <div className="d-flex justify-content-between myListsItem">
            <div className="d-flex">
                <img src={require('../../Static/BlankUser.jpg')} alt=" "className="myListsDropDownItemImg"></img>
                <h1 className="myListsDropDownItemName"> {props.student["First Name"]} {props.student["Last Name"]} </h1>
            </div>
            <div>
                <ZoomInOutlinedIcon  className="myListIcons" onClick={() => handleZoom()}/>
                <a href={"mailto:" + props.student.Email} style={{color:"#25282B"}}>
                     <MailOutlineIcon className="myListIcons"/>
                </ a>
                <ClearIcon className="myListIcons"/>
            </div>

        </div>
    )
}
export default MyListsDropDownItem