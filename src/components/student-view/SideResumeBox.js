// import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./SideResumeBox.css";

// Changed this to functional so I can use
// hooks to show resume when you click on it
// Had to switch to embed so you can see pdfs
function SideResumeBox(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    // 290 by 460
    <>
      <Card
        className="SideResumeBoxCard"
        border="dark"
        style={{ height: "60vh", width: "22vw" }}
      >
        <iframe
          src={props.currentPhoto}
          style={{ height: "100%" }}
          onClick={handleShow}
        ></iframe>
      </Card>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "0" }}>
        <iframe
          src={props.currentPhoto}
          style={{ width: "50vw", height: "auto" }}
        ></iframe>
      </Modal>
    </>
  );
}

export default SideResumeBox;
