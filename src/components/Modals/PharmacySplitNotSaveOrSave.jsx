import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
const PharmacySplitPercentProblem = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='split-error'>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Pharmacy Split Not Save or Save
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
              You want to close this series before it ends. The changes you make will not be saved. 
              Do you want to save and continue?
            </div>
            </Modal.Body>
            <Modal.Footer className='border-top-0 split-error-modal__footer'>
              <div className='split-error-modal__button-container m-auto'>
                <button className='split-back-btn' onClick={()=> setShowModal(false)}>
                    back
                </button>
                <button className='split-save-btn' onClick={()=> setShowModal(false)}>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
              </div>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default PharmacySplitPercentProblem

// PAGE 9