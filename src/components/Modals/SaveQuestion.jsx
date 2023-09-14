import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
const SaveQuestion = ({modal, toggle, noButton, yesButton, message}) => {
  const { t } = useTranslation();
  return (
    <div className='split-error'>
      <Modal show={modal} onHide={toggle} centered className='split-error-modal' backdrop='static' >
        <Modal.Body className='text-center'>
          <button className='split-close-button' onClick={noButton}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className='split-error-modal__icon-save'>
          <i className="fas fa-question-circle"></i>
          </div>
          <div className='split-error-modal__message'>
              {t(`${message}`)}
          </div>
        </Modal.Body>
        <Modal.Footer className='border-top-0 split-error-modal__footer'>
          <div className='split-error-modal__button-container m-auto'>
            <button className='split-back-btn' onClick={noButton}>
              {t('No')}
            </button>
            <Button variant='primary' onClick={yesButton}>
                {t('Yes')}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SaveQuestion