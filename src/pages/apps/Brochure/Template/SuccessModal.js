import React,{ useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { mdiDeleteOutline  } from '@mdi/js';
import Icon from '@mdi/react';

const SuccessModal = ({
    handleDelete,
    modalShow,
    setModalShow

}) => {

    const { t } = useTranslation();

    const onHide = () => {
        setModalShow(true);
    }

    const toggle = () => {
        setModalShow(false);
    }
  return (
    <div className='templates-modal'>
        <Modal
      size="md"
      centered
      show={true}
      onHide={onHide}
      className='templates-modal'
    >
      
      <Modal.Body>
        <div className='copy-modal-items'>
            <div className='modal-icon'>
            <Icon path={mdiDeleteOutline}
                  size={3}
                  color="#FA5C7C"
                />
            </div>

            <div className='modal-info'>
                {t('delete')}
            </div>

            <div className='modal-question'>
                {t('Are you sure you want to delete this template?')}
            </div>

            <div className='modal-buttons'>
                <button className='delete' onClick={handleDelete}>
                    delete
                </button>
                <button className='cancel' onClick={toggle}>
                    cancel
                </button>
            </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default SuccessModal