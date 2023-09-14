import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

const ErrorModal = ({modalShow, setModalShow,messages}) => {

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
                                <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                            </div>
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Error')}</span>
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

export default ErrorModal