import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const PharmacyShouldSave = ({messages,show,handleClose}) => {
  const { t } = useTranslation();

  return (
    <div className='split-error'>
        <Modal show={show} onHide={handleClose} centered className='split-error-modal'>
            <Modal.Body className='text-center'>
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
             {messages}
            </div>
            </Modal.Body>
          <Modal.Footer className='border-top-0 split-error-modal__footer'>
            <button className='m-auto split-back-btn' onClick={handleClose}>
              {t('close')}
            </button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}


export default PharmacyShouldSave