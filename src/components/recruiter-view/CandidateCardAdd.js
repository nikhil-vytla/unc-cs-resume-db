import React from "react"
import AddIcon from '@material-ui/icons/Add';
import Dropdown from 'react-bootstrap/Dropdown'


function CandidateCardAdd(props) {
    
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
                        <Dropdown.Item >{list}</Dropdown.Item>
                        
                        )}
                </Dropdown.Menu>
            </Dropdown>



    )





} export default CandidateCardAdd