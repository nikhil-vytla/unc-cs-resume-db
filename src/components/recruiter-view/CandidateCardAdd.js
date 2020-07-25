import React from "react"
import AddIcon from '@material-ui/icons/Add';



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
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    Dropdown Button
                        </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>



    )





} export default CandidateCardAdd