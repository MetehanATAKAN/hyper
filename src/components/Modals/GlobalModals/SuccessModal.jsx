import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { AiOutlineCheck } from 'react-icons/ai';
const SuccessModal = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    
    return (
      <div>
        <Modal show={show} onHide={handleClose} centered className='global-success-modal'>
            <Modal.Body className='text-center py-4'>
                <AiOutlineCheck className='global-success-icon' />
                <div className='fs-5 text-secondary mt-4'>
                  Success!
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

export default SuccessModal