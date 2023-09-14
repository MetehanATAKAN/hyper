import React from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import {  mdiContentCopy   } from '@mdi/js';
import Icon from '@mdi/react';

const CopyModal = ({
    handleCopy,
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
      show={modalShow}
      onHide={onHide}
      className='templates-modal'
    >
      <Modal.Body>
        <div className='copy-modal-items'>
            <div className='modal-icon'>
            <Icon path={mdiContentCopy}
                  size={3}
                  color="#FFBC00"
                />
            </div>

            <div className='modal-info-copy'>
                {t('copy')}
            </div>

            <div className='modal-question'>
                {t('Are you sure you want to copy this work?')}
            </div>

            <div className='modal-buttons'>
                <button className='copy' onClick={handleCopy}>
                    copy
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

export default CopyModal