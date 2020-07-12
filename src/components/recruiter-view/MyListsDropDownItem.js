import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ClearIcon from '@material-ui/icons/Clear';

function MyListsDropDownItem(props){


    return (
        <div className="d-flex justify-content-between myListsItem">
            <div className="d-flex">
                <img src={require('../../Static/BlankUser.jpg')} className="myListsDropDownItemImg"></img>
                <h1 className="myListsDropDownItemName"> {props.name} </h1>
            </div>
            <div>
                <MailOutlineIcon className="myListIcons"/>
                <ClearIcon className="myListIcons"/>
            </div>

        </div>
    )
}
export default MyListsDropDownItem