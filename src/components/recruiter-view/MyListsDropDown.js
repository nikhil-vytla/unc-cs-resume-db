import React from "react";
import { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import MyListsDropDownItem from "./MyListsDropDownItem";
import Dropdown from "react-bootstrap/Dropdown";
import { withFirebase } from "../Firebase";
import axios from "axios";

function MyListsDropDown({ Firebase, ...props }) {
  //Current state of the dropdown
  const [collapsed, setColapsed] = useState(true);

  // Required for bootsrap so we can display the drop down as the more Vert Icon
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <MoreVertIcon
      className="myListIcons"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </MoreVertIcon>
  ));

  // Exports my list to csv
  const handleExport = async () => {
    const recruiterPreData = await Firebase.db
      .collection("recruiters")
      .doc(Firebase.auth.currentUser.uid)
      .get();
    const recruiterData = recruiterPreData.data();

    const listArr = recruiterData[`Lists`][props.listTitle].reduce(
      (acc, val) => {
        acc.push([val["First Name"], val["Last Name"], val["Email"]]);
        return acc;
      },
      []
    );

    const rows = [["First Name", "Last Name", "Email"], ...listArr];

    let csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${props.listTitle}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file
  };

  // Deletes a list from a recruiters my list section
  const handleDelete = async () => {
    // Checks if listName is empty then sends to endpoint
    const objToSend = {
      nameOfList: props.listTitle,
      recruiterUID: Firebase.auth.currentUser.uid,
      currentRecruiterEmail: Firebase.auth.currentUser.email,
    };
    //deletes the current list if the list name is not null
    if (props.listTitle !== null && props.listTitle !== "") {
      await axios.put(
        "https://us-central1-unc-cs-resume-database-af14e.cloudfunctions.net/api/removeList",
        objToSend
      );
    }
    props.updateRecruiter();
  };
  if (collapsed) {
    return (
      <div className="d-flex justify-content-between myListTitleHeader">
        <h1 className="myListTitle"> {props.listTitle} </h1>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>Dropdown Button</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleDelete()}>
                Delete List
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleExport()}>
                Export List to CSV
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <AddIcon className="myListIcons" onClick={() => setColapsed(false)} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="d-flex justify-content-between myListTitleHeader">
          <h1 className="myListTitle"> {props.listTitle} </h1>
          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleDelete()}>
                  Delete List
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleExport()}>
                  Export List to CSV
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <RemoveIcon
              className="myListIcons"
              onClick={() => setColapsed(true)}
            />
          </div>
        </div>
        {/* Displays the students in a particular list */}
        {props.students.map((currentStudent) => (
          <MyListsDropDownItem
            updateRecruiter={() => props.updateRecruiter()}
            listTitle={props.listTitle}
            student={currentStudent}
            toggleResumeView={(candidate) => props.toggleResumeView(candidate)}
          />
        ))}
      </div>
    );
  }
}
export default withFirebase(MyListsDropDown);
