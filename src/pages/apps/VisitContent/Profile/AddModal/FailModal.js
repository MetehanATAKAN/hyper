import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FailModal = ({ modalShow, setModalShow, error }) => {
    const { t } = useTranslation();
    const onHide = () => {
        setModalShow(true);
    };
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon">
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FFBC00" />
                        </div>
                        <p style={{ marginTop: '25px', whiteSpace: 'pre-wrap' }}>{error}</p>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <button
                                style={{
                                    backgroundColor: '#EEF2F7',
                                    color: '#6C757C',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={() => setModalShow(false)}>
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FailModal;
