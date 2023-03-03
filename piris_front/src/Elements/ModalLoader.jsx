import React from "react";
import { Spinner, Modal } from "react-bootstrap";


const ModalLoader = ({ show }) => {

    return (
        <Modal show={show} centered animation={false} contentClassName="modal-container">
            <Modal.Body className='modal-loader'>
                <Spinner animation="grow" variant="success" className="mx-1" />
                <Spinner animation="grow" variant="success" className="mx-1" />
                <Spinner animation="grow" variant="success" className="mx-1" />
            </Modal.Body>
        </Modal>
    )
}

export default ModalLoader;