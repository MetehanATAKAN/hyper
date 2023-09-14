import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { AiOutlineQuestion } from 'react-icons/ai';
import { BiQuestionMark } from 'react-icons/bi';
const InformationModal = () => {
  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
        <Button variant="primary" onClick={handleShow}>
          Information Modal
        </Button>
  
        <Modal show={show} onHide={handleClose} centered className='global-information-modal'>
            <Modal.Body className='text-center py-4'>
              <BiQuestionMark className='global-information-circle' />
              <AiOutlineQuestion className='global-information-icon' />
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
  )
}

export default InformationModal

