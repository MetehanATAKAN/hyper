import React,{ useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { mdiDeleteOutline  } from '@mdi/js';
import Icon from '@mdi/react';

const DeleteModal = ({
    handleDelete,
    modalShow,
    setModalShow,
    isButton = true,
    messages
}) => {

    const { t } = useTranslation();

    const onHide = () => {
        setModalShow(false);
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
      {/* <Modal.Header onHide={toggle}   closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className='copy-modal-items'>
            <div className='modal-icon'>
            <Icon path={mdiDeleteOutline}
                  size={3}
                  color="#FA5C7C"
                />
            </div>

            <div className='modal-info'>
                {
                  isButton === true
                  ?t('delete')
                  :t('error')
                }
            </div>

            <div className='modal-question'>
                {t(messages)}
            </div>

            <div className='modal-buttons'>
               {
                isButton &&
                <button className='delete' onClick={handleDelete}>
                {t('delete')}
            </button>
               }
                <button className='cancel' onClick={toggle}>
                    {t('cancel')}
                </button>
            </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        metehan atakan
      </Modal.Footer> */}
    </Modal>
    </div>
  )
}

export default DeleteModal