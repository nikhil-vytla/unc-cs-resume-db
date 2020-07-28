import React from "react"
import SearchIcon from '@material-ui/icons/Search';

function FilterSearchBar (props){

    return (
        <div className=" filterSearchBar " style={{height: props.height}}>
            <div className="filterVertical d-flex justify-content-center">
                <h1 className="filterSearchName" >{props.filterName}</h1>
                <form>

                    <label>
                        
                        <input 

                        type="text"
                        value={props.filterSearch}
                        onChange={(e) => props.setFilterSearch(e.target.value)}
                        className="filterInput"/>
                        <SearchIcon className="filterIcon"/>
        

                    </label>
                </form>
                    {/* <div>
                        
                       

                    </div> */}
            </div>
            
        </div>
    )


}
export default FilterSearchBar