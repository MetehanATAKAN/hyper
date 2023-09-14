import React from 'react'
import { Modal } from 'react-bootstrap'
import { AiOutlineCheck } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const SuccessModal = ({messages,modalShow,handleClose,show}) => {
  
  const { t } = useTranslation();
  const handleCloseModal = async () => {
    let element = document.querySelectorAll(".split-success-modal")
    element[0].children[0].children[0].classList.add("modal-close-animation");
    //  handleClose(false);
    setTimeout(async () => handleClose(false), 400)
    // setShowModal(true);
  }
  return (
    <div className='split-error'>
      <Modal show={show} onHide={handleCloseModal} centered className='split-success-modal'>
        <Modal.Body className='text-center'>
          <button className='split-close-button' onClick={handleCloseModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <AiOutlineCheck className='global-success-icon' />
          <div className='fs-5 text-secondary mt-4'>
            {t(messages)}
          </div>
        </Modal.Body>
        <Modal.Footer className='border-top-0 split-error-modal__footer'>
          <div className='split-error-modal__button-container m-auto'>
            <button className='split-back-btn' onClick={handleCloseModal}>
              {t('close')}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SuccessModal

// Success