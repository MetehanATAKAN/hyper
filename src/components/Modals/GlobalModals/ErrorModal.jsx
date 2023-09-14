import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { VscError } from 'react-icons/vsc';
const ErrorModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
          Error Modal
        </Button>
  
        <Modal show={show} onHide={handleClose} centered className='global-error-modal'>
            <Modal.Body className='text-center py-4'>
              <VscError className='global-error-icon' />
              <div className='fs-5 text-secondary mt-4'>
                Something went wrong!
              </div>
            </Modal.Body>
          <Modal.Footer className='border-top-0 py-4'>
            <Button className='m-auto global-modal-button' onClick={handleClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default ErrorModal