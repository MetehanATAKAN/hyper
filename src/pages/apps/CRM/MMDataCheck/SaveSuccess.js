import { mdiCheck  } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

const SaveSuccess = ({modalShow, setModalShow,messages}) => {

    const { t } = useTranslation();

    const onHide = () => {
        setModalShow(false);
    };

  return (
    <>
 <div className="alert-modal">
                <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                    <Modal.Body>
                        <div className="alert-modal-items">
                            <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                                <Icon path={mdiCheck } size={3} color='green' />
                            </div>
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Save')}</span>
                            </div>
                            <div className="alert-modal-question">
                                {t(messages)}
                            </div>
                            <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                        backgroundColor:'green'
                                    }}
                                    className="delete"
                                    onClick={()=> setModalShow(false)}
                                    >
                                    {t('close')}
                                </button>
                               
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
    </>
  )
}

export default SaveSuccess