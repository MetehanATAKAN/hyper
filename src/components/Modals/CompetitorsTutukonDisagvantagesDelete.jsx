import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ModalHeader from './ModalHeader'
const CompetitorsTutukonDisagvantagesDelete = () => {
    const [showModal, setShowModal] = useState(false)
    const name = 'Aspirax Disadvantages 1';
    const colonName = 'Aspirax';
  return (
    <div className='split-error'>
        <Button variant="primary" onClick={() => setShowModal(true)}>
            Competitors Tutukon Disagvantages Delete
        </Button>
  
        <Modal show={showModal} centered className='split-error-modal'>
            <Modal.Body className='text-center'>
            <ModalHeader setShowModal={setShowModal} />
            <div className='split-error-modal__message'>
              Are you sure want to delete <span className='competitors-tutukon-disadvantages-name'>{name}</span> for <span>{colonName}</span> ?
            </div>
            </Modal.Body>
          <Modal.Footer className='border-top-0 split-error-modal__footer'>
              <div className='split-error-modal__button-container m-auto'>
                <button className='split-cancel-btn' onClick={()=> setShowModal(false)}>
                    cancel
                </button>
                <button className='split-delete-btn' onClick={()=> setShowModal(false)}>
                    delete
                </button>
              </div>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default CompetitorsTutukonDisagvantagesDelete

// PAGE 38