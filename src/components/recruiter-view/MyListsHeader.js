import React, { useState } from "react"
import { useTransition, animated } from 'react-spring'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MyListsForm from "./MyListsForm"


// This component visually displays the blue header above the my Lists section
// Handles the logic for toggling the MyListsForm Section
function MyListsHeader(props) {
    const [collapsed, setCollapsed] = useState(true)
    
    // Animation for MyListsForm Section
    const divTransitions = useTransition(!collapsed, null, {
        from: { opacity: 0, transform: 'translate(100%, 0%)'},
        enter: { opacity: 1, transform: 'translate(0%, 0%)'},
        leave: { opacity: 1 },
    })

    let icon = null

    if (collapsed){
        icon = (<div className="newListDiv">< AddIcon className="newListIcons"/> </div>)
    } else {
        icon = (<div className="newListDiv">< RemoveIcon className="newListIcons"/> </div>)
    }


    // this is a quirk of the react spring library for some reason you cannot pass props on the inside of <animated.div> elements
    // thus update recruiter outside is passed instead of the props
    // this should have no effect on functionality
    let updateRecruiterOutside = () => props.updateRecruiter();

    return (
        <div className="d-block">
            <div className="d-flex myListHeaderDiv justify-content-center" style={{ width: '25vw' }} onClick={() => setCollapsed(!collapsed)}>
                <h1 style={{position: "absolute"}}className="recruiterViewHeader BreeSerif" >My Lists</h1>
                {icon}


            </div>
            {divTransitions.map(({ item, key, props }) =>
                item && <animated.div key={key} style={props}>
                    <div className="d-block" style={{backgroundColor : "#ffffff"}}>
                        <MyListsForm updateRecruiter={() => updateRecruiterOutside()} />
                    </div>
                </animated.div>)}
        </div>
    );



} export default MyListsHeader