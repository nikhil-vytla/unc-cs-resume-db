import React, { useState } from "react";
import FilterSearchBar from "./FilterSearchBar";
import "../../Static/Filter.css";
import FilterDropDown from "./FilterDropDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { propTypes } from "react-bootstrap/esm/Image";

function Filter(props) {

  //Sets the initial filter search state to empty string
  const [filterSearch, setFilterSearch] = useState("")
  return (
    <div className="filter d-block">
      <h1
        className="recruiterViewHeader filterHeader BreeSerif"
        style={{ width: "15vw" }}
      >
        New Search
      </h1>
      <div className="filterScroll">
        <FilterSearchBar height="80px" filterName="Name" setFilterSearch={(text) => setFilterSearch(text)}  filterSearch={filterSearch}/>
        <div className="filterArrowDiv" onClick={() => props.setFilterToggle()}>
          <ArrowBackIcon className="filterArrowIcon" />
        </div>
        {Object.keys(props.filters)
          .filter((item) => {
            return item !== "Active Filters";
          })
          .map(
            (filter) => (
              <FilterDropDown
                filterSearch={filterSearch}
                isCurrentFilter={(objToAdd) => props.isCurrentFilter(objToAdd)}
                removeFilter={(filterName) => props.removeFilter(filterName)}
                key={filter}
                inside={props.filters[filter]}
                addFilter={(filterName) => props.addFilter(filterName)}
                title={filter}
              />
            )
        
          )}





      </div>
      
    </div>
  );
}
export default Filter;
