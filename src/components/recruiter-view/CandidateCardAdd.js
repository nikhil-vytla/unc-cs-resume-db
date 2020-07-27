import React from "react"
import AddIcon from '@material-ui/icons/Add';
import Dropdown from 'react-bootstrap/Dropdown'
import {withFirebase} from "../Firebase"
import axios from "axios"


function CandidateCardAdd({Firebase, ...props}) {
    
    const  handleChange = async (listName) => {
        // Checks if listName is empty then sends to endpoint
        const objToSend = {
          nameOfList: listName,
          recruiterUID: Firebase.auth.currentUser.uid,
          student: {
              Email: props.student["Email"],
              "First Name": props.student["First Name"],
              "Last Name": props.student["Last Name"],
              "UID": props.student["UID"],
              "Profile Image":props.student["Profile Image"]
          }
        };

        // Adds a recruiter to a list then updates the myLists
        if (listName !== null && listName !== "") {
          await axios.put(
            "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/addStudent",
            objToSend
          );
        }
        props.updateRecruiter();
      };


    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <AddIcon

            className="recruiterViewIcon"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
          &#x25bc;
        </AddIcon>
    ));

    return ( 
            <Dropdown className="candidateDropDown">
                <Dropdown.Toggle as={CustomToggle}>
                    Dropdown Button
                        </Dropdown.Toggle>

                <Dropdown.Menu>
                    {Object.keys(props.recruiter[0]["Lists"]).map(list =>
                        <Dropdown.Item onClick={() => handleChange(list)} >{list}</Dropdown.Item>
                        
                        )}
                </Dropdown.Menu>
            </Dropdown>



    )





} export default withFirebase(CandidateCardAdd)