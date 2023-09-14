import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

//PharmacySplitPercentProblem
const PharmacySplitPercentProblem = ({messages,show,handleClose, message2=null}) => {
  const { t } = useTranslation();

  return (
    <div className='split-error'>
        {/* <Button variant="primary" onClick={() => setShowModal(true)}>
          Pharmacy Split Percent Problem
        </Button> */}
  
        <Modal show={show} onHide={handleClose} centered className='split-error-modal'>
            <Modal.Body className='text-center m-auto'>
            <button className='split-close-button' onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className='split-error-modal__icon'>
              <i className="fa-solid fa-circle-exclamation"></i>
              <div>
                {t('WARNING')}
              </div>
            </div>
            <div className='split-error-modal__message'>
             {t(messages)}
             {
              message2 !== null && (
                <div>{message2}</div>
              )
             }
            </div>
            </Modal.Body>
          <Modal.Footer className='border-top-0 split-error-modal__footer'>
            <button className='m-auto split-back-btn' onClick={handleClose}>
              {t('Ok')}
            </button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default PharmacySplitPercentProblem

// PAGE 6