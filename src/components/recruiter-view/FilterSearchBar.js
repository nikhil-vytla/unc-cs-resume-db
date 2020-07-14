import React from "react"
import SearchIcon from '@material-ui/icons/Search';

function FilterSearchBar (props){

    return (
        <div className=" filterSearchBar " style={{height: props.height}}>
            <div className="filterVertical d-flex justify-content-center">
                <h1 className="filterSearchName" >{props.filterName}</h1>
                <div>
                    <input className="filterInput"/>
                    <SearchIcon className="filterIcon"/>

                </div>
            </div>
            
        </div>
    )


}
export default FilterSearchBar