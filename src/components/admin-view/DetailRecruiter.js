import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DetailRecruiter(props) {
  //   const [handleShow, setShow] = useState(false);

  return (
    <div>
      {console.log(props)}
      <Modal
        show={props.show}
        // onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.recruiterData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Understood
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailRecruiter;
