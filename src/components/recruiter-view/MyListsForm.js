import React, { useState } from "react";
import Button from "react-bootstrap/Button"
import AddIcon from '@material-ui/icons/Add';



function MyListsForm (){
    const [listName, setListName] = useState("");
    const handleChange = ( evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${listName}`)
    }

    

    return(
        
        <form className="d-flex justify-content-center align-items-center myListForm" onSubmit={handleChange}>
            <div>

           
                <div className="myListFormDiv d-flex justify-content-center">
                    <label className="myListLabel">
                        List Name

                        <input 
                        className="myListInput"
                        type="text"
                        value={listName}
                        onChange={(e)=> setListName(e.target.value)}
                        ></input>
                    </label>
                    <Button className="myListSubmit"type="submit" ><AddIcon className="submitIcon" /></Button>

                </div>
               
            </div>
        </form>
    )


} export default MyListsForm