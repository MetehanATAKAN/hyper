import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
const EventDeleteModal = ({modal, toggle, noButton, yesButton}) => {
  const { t } = useTranslation();
  return (
    <div className='split-error'>
      <Modal show={modal} onHide={toggle} centered className='split-error-modal' backdrop='static' >
        <Modal.Body className='text-center'>
          <button className='split-close-button' onClick={noButton}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className='split-error-modal__icon'>
            <i className="fa-solid fa-circle-exclamation"></i>
            <div>
              {t('WARNING')}
            </div>
          </div>
          <div className='split-error-modal__message'>
              {t('Are you sure you want to delete this event ?')}
          </div>
        </Modal.Body>
        <Modal.Footer className='border-top-0 split-error-modal__footer'>
          <div className='split-error-modal__button-container m-auto'>
            <button className='split-back-btn' onClick={noButton}>
              {t('No')}
            </button>
            <button className='split-delete-btn' onClick={yesButton}>
              {t('Yes')}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EventDeleteModal