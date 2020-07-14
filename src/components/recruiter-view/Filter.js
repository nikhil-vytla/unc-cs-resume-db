import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import FilterSearchBar from './FilterSearchBar'
import "../../Static/Filter.css"
import FilterDropDown from "./FilterDropDown"
import FilterItem from "./FilterItem"

function Filter() {
    const Priority = ["Favorited", "Contacted", "Notes On Profile"]
    const GradYear = ["2020" ,"2021", "20"]
    const School = ["UNC", "Duke", "App State", "State"]
    const Skills = ["Java", "Python", "C#", "C++", "Javascript", "HTML", "CSS"]
    const Events = ["Hack NC", "Queer_Hack", "GLobal Game Jam", "Pearl Hacks"]
    const PrimraryMaj = ["Computer Science", "Mathematics", "Econ"]
    const SecondaryMaj = ["Computer Science", "Mathematics", "Econ"]
    const Minors = ["Computer Science", "Mathematics", "Econ"]


    return (
        <div className="filter d-block">
            <h1 className="recruiterViewHeader filterHeader BreeSerif" style={{width:'15vw'}}>New Search</h1>
            <FilterSearchBar filterName="Name" height="80px"/>
            <FilterDropDown  title="Priority" hasSearch="true" inside={Priority} />
            <FilterDropDown  title="Grad Year" hasSearch="false" inside={GradYear} />
            <FilterDropDown  title="School" hasSearch="false" inside={School} />
            <FilterDropDown  title="Skills" hasSearch="false" inside={Skills} />
            <FilterDropDown  title="Events" hasSearch="false" inside={Events} />
            <FilterDropDown  title="Primary Major" hasSearch="false" inside={PrimraryMaj} />
           


        </div>
        
    );
   
} export default Filter