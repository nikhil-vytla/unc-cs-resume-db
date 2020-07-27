import React from "react";
import FilterSearchBar from "./FilterSearchBar";
import "../../Static/Filter.css";
import FilterDropDown from "./FilterDropDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Filter(props) {
  //console.log(props.filters);

  return (
    <div className="filter d-block">
      <h1
        className="recruiterViewHeader filterHeader BreeSerif"
        style={{ width: "15vw" }}
      >
        New Search
      </h1>

      <FilterSearchBar height="80px" filterName="Name" />
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
  );
}
export default Filter;

// const Priority = ["Favorited", "Contacted", "Notes On Profile"]
// const GradYear = ["2020", "2021", "2022, 2023"]
// const School = ["UNC", "Duke", "App State", "State"]
// const Skills = ["Java", "Python", "C#", "C++", "Javascript", "HTML", "CSS"]
// const Events = ["Hack NC", "Queer_Hack", "GLobal Game Jam", "Pearl Hacks"]
// const PrimraryMaj = ["Computer Science", "Mathematics", "Econ"]
// const SecondaryMaj = ["Computer Science", "Mathematics", "Econ"]
// const Minors = ["Computer Science", "Mathematics", "Econ"]
