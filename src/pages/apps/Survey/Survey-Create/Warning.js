import { mdiAlertCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Warning = ({modalShow,setModalShow,alert}) => {

    const {t } = useTranslation();
   

    const onHide = () => {
        setModalShow(true);
    };
  return (
    <>
    <div className="alert-modal">
                <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                    <Modal.Body>
                        <div className="alert-modal-items">
                            <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                                <Icon path={mdiAlertCircleOutline} size={3} color="#ffbc01" />
                            </div>
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Warning!')}</span>
                            </div>
                            <div className="alert-modal-question">
                                {t(alert)}
                            </div>
                            <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                                
                                <button
                                    style={{
                                        backgroundColor: '#ffbc01',
                                        color: '#000000',
                                        fontWeight: '600',
                                        width: '75px',
                                    }}
                                    className="cancel"
                                    onClick={() => setModalShow(false)}>
                                    {t('go back')}
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
    </>
  )
}

export default Warning