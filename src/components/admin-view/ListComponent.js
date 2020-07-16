import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

export class ListComponent extends Component {
  render() {
    function alertClicked() {
      alert("you cliekced.. ");
    }
    return (
      <div>
        <h3> Some Name </h3>
        <ListGroup defaultActiveKey="#link1">
          <ListGroup.Item action href="#link1">
            Link 1
          </ListGroup.Item>
          <ListGroup.Item action href="#link2" disabled>
            Link 2
          </ListGroup.Item>
          <ListGroup.Item action onClick={alertClicked}>
            This one is a button
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default ListComponent;
