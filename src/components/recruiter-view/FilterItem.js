import React, { useState } from "react"
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useTransition, animated } from 'react-spring'
import StopIcon from '@material-ui/icons/Stop';

function FilterItem(props) {
    var text = props.itemName;
    const [checked, setChecked] = useState(props.itemName.Active)
    const multNames = [ "Database Systems", "Frameworks and Tools", "Operating Systems", "Programming Languages", "Events"];
    props.addFilters()


    function handleCheck(){
        checked="true"
        const filterName = ""
        if(multNames.includes(props.title)){
            
        }

    }


    function handleUncheck(){

    }

    const transitions = useTransition(checked, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })
    return transitions.map(({ item, key, props }) =>
        item
            
            ? <animated.div className="d-flex justify-content-between filterItem"  style={props} onClick={() => setChecked(false)}>

                <h1 className="filterItemText">{text}</h1>
                <CheckBoxIcon className="filterCheck" />
            </animated.div>
            : <animated.div className="d-flex justify-content-between filterItem" style={props} onClick={() => setChecked(true)}>
                <h1 className="filterItemText ">{text}</h1>
                <StopIcon className="filterGrey" />

            </animated.div>
    )


   

}
export default FilterItem