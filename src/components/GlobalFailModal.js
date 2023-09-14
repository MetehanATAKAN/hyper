import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../utils/http.helper';
import { useRef } from 'react';
import { useEffect } from 'react';

const FailModal = ({ modalShow, setModalShow, item, applyFilter }) => {
    const { t } = useTranslation();
    const [failText, setFailText] = useState('');
    const failArea = useRef(0);
    const createdBy = localStorage.getItem('userName');

    const onHide = () => {
        setModalShow(true);
    };
    const toggle = () => {
        setModalShow(false);
    };

    const failBtn = () => {
        if (failText.trim().length > 0) {
            
        } else {
            failArea.current.style.borderColor = 'red';
        }
    };
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '5px' }}>
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '10px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                        </div>
                        <div style={{ marginBottom: '17px', marginTop: '10px' }} className="alert-modal-question">
                            {t('Are you sure you want to fail ?')} <br />
                        </div>
                        <div className="mb-3">
                            <span className="mb-1" style={{ float: 'left' }}>
                                {t('Fail')}{' '}
                            </span>
                            <Form.Control
                                as="textarea"
                                placeholder={t('Please enter a fail')}
                                style={{ maxHeight: '75px', margin: 0, borderColor: '#cecece' }}
                                ref={failArea}
                                onChange={(e) => setFailText(e.target.value)}
                            />
                        </div>

                        <div className="alert-modal-buttons">
                            <button
                                style={{
                                    backgroundColor: '#FA5C7C',
                                    color: '#fff',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={failBtn}
                                disabled={failText.trim().length === 0}
                                >
                                {t('Fail')}
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#EEF2F7',
                                    color: '#3B3B3B',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={toggle}>
                                {t('Go Back')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default React.memo(FailModal);
