import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
const CompetitorsTutukonDelete = () => {
    const [showModal, setShowModal] = useState(false)
    const name = 'Aspirax'
  return (
    <div className='split-error'>
        <Button variant="primary" onClick={() => setShowModal(true)}>
            Competitors Tutukon Delete
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
                Are you sure want to delete <span className='competitors-tutukon-name'>{name}</span> competitor for Tutukon?
            </div>
            </Modal.Body>
            <Modal.Footer className='border-top-0 split-error-modal__footer'>
              <div className='split-error-modal__button-container m-auto'>
                <button className='back' onClick={()=> setShowModal(false)}>
                    back
                </button>
                <button className='m-auto split-not-save-btn' onClick={()=> setShowModal(false)}>
                    delete
                </button>
              </div>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default CompetitorsTutukonDelete

// PAGE 26