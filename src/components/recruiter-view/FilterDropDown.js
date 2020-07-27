import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove'; 
import FilterSearchBar from "./FilterSearchBar"
import FilterItem from "./FilterItem"

function FilterDropDown(props ) {
    const [collapsed, setColapsed] = useState(true)
    
    let inside;

    if (props.hasSearch === "true"){
        inside = <FilterSearchBar height="40px" title={props.title} /> 

    }



    if (collapsed) {
        return (
            <div className="d-flex justify-content-between filterDropDownHeader" onClick={() => setColapsed(false)}  >
                <h1 className="filterDropDownTitle"> {props.title}  </h1>
              
                    <AddIcon className='filterDropDownIcons' onClick={() => setColapsed(false)}/>
                
            </div>

        );
    } else {
        return (
            <div>
                <div className="d-flex justify-content-between filterDropDownHeader" onClick={() => setColapsed(true)} >
                <h1 className="filterDropDownTitle"> {props.title}  </h1>
                
                    <RemoveIcon className='filterDropDownIcons' onClick={() => setColapsed(true)}/>
                
                </ div>
                <ul className="filterList">
                    {props.inside.map( item =>{
                        return<li className="filterLi"><FilterItem  isCurrentFilter={(objToAdd) => props.isCurrentFilter(objToAdd)} removeFilter={(filterName) => props.removeFilter(filterName)}  addFilter={(filterName) => props.addFilter(filterName)} itemName={item} title={props.title} /></li>
                    })}
                </ul>
            </div>
        )
    }    
}
export default FilterDropDown