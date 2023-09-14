import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
const PharmacySplitNotSave = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='split-error'>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Pharmacy Split Not Save
        </Button>
  
        <Modal show={showModal} centered className='split-error-modal'>
            <Modal.Body className='text-center'>
            <button className='split-close-button' onClick={()=> setShowModal(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className='split-error-modal__icon'>
              <i className="fa-solid fa-circle-exclamation"></i>
              <div>
                WARNING
              </div>
            </div>
            <div className='split-error-modal__message'>
              The last change you made was not saved. Do you want to continue?
            </div>
            </Modal.Body>
          <Modal.Footer className='border-top-0 split-error-modal__footer'>
            <button className='m-auto split-not-save-btn' onClick={()=> setShowModal(false)}>
              not save
            </button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default PharmacySplitNotSave


// PAGE 5