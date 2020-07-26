import React, { useState } from 'react';
import FilterSearchBar from './FilterSearchBar'
import "../../Static/Filter.css"
import FilterDropDown from "./FilterDropDown"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { propTypes } from 'react-bootstrap/esm/Image';



function Filter( props) {
    console.log(props.filters)

    return (
        <div className="filter d-block">
            <h1 className="recruiterViewHeader filterHeader BreeSerif" style={{ width: '15vw' }}>New Search</h1>
            
            <FilterSearchBar height="80px" filterName="Name"/>
            <div className="filterArrowDiv" onClick={() => props.setFilterToggle()}>
                <ArrowBackIcon className="filterArrowIcon" />

            </div>
            {Object.keys(props.filters).map( filter => {

                if (filter !== "Active Filters") {
                    <FilterDropDown key={filter} inside={props.filters[filter]} addFilter={(filterName) => props.addFilter(filterName)} title={filter} />
                }
            })}



        </div>

    );

} export default Filter


// {
//     "Filters": [
//         {
//             "FilterName": "Priority",
//             "Items": [
//                 {
//                     "Name": "Favoited",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Contacted",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Notes On Profile",
//                     "Active": false
//                 }
//             ]
//         },
//         {
//             "FilterName": "Grad Year",
//             "Items": [
//                 {
//                     "Name": "2020",
//                     "Active": false
//                 },
//                 {
//                     "Name": "2021",
//                     "Active": false
//                 },
//                 {
//                     "Name": "2022",
//                     "Active": false
//                 },
//                 {
//                     "Name": "2023",
//                     "Active": false
//                 }
//             ]
//         },
//         {
//             "FilterName": "School",
//             "Items": [
//                 {
//                     "Name": "UNC",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Duke",
//                     "Active": false
//                 },
//                 {
//                     "Name": "App State",
//                     "Active": false
//                 },
//                 {
//                     "Name": "NC State",
//                     "Active": false
//                 }
//             ]
//         },
//         {
//             "FilterName": "Skills",
//             "Items": [
//                 {
//                     "Name": "Java",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Python",
//                     "Active": false
//                 },
//                 {
//                     "Name": "C#",
//                     "Active": false
//                 },
//                 {
//                     "Name": "C++",
//                     "Active": false
//                 },
//                 {
//                     "Name": "JavaScript",
//                     "Active": false
//                 },
//                 {
//                     "Name": "HTMl",
//                     "Active": false
//                 },
//                 {
//                     "Name": "CSS",
//                     "Active": false
//                 }
//             ]
//         },
//         {
//             "FilterName": "Events",
//             "Items": [
//                 {
//                     "Name": "Hack NC",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Queer_Hack",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Global Game Jam",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Carolina Data Chalenge",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Pearl Hacks",
//                     "Active": false
//                 }
//             ]
//         },
//         {
//             "FilterName": "Primary Major",
//             "Items": [
//                 {
//                     "Name": "Computer Science",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Mathematics",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Economics",
//                     "Active": false
//                 }
//             ]
//         },
//         {
//             "FilterName": "Secondary Major",
//             "Items": [
//                 {
//                     "Name": "Computer Science",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Mathematics",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Economics",
//                     "Active": false
//                 }
//             ]
//         },
//         {
//             "FilterName": "Minors",
//             "Items": [
//                 {
//                     "Name": "Computer Science",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Mathematics",
//                     "Active": false
//                 },
//                 {
//                     "Name": "Economics",
//                     "Active": false
//                 }
//             ]
//         },
//     ]
// }
// )
// const Priority = ["Favorited", "Contacted", "Notes On Profile"]
// const GradYear = ["2020", "2021", "2022, 2023"]
// const School = ["UNC", "Duke", "App State", "State"]
// const Skills = ["Java", "Python", "C#", "C++", "Javascript", "HTML", "CSS"]
// const Events = ["Hack NC", "Queer_Hack", "GLobal Game Jam", "Pearl Hacks"]
// const PrimraryMaj = ["Computer Science", "Mathematics", "Econ"]
// const SecondaryMaj = ["Computer Science", "Mathematics", "Econ"]
// const Minors = ["Computer Science", "Mathematics", "Econ"]
