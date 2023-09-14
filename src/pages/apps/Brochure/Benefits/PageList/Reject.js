import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';

const Reject = ({ modalShow, setModalShow }) => {
    const { t } = useTranslation();

    const onHide = () => {
        setModalShow(true);
    };

    const toggle = () => {
        setModalShow(false);
    };
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon">
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FFBC00" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Warning')}</span>
                        </div>
                        <div className="alert-modal-question">{t('Are you sure you want to reject this need ?')}</div>
                        <div className="alert-modal-buttons">
                            <button
                                style={{
                                    backgroundColor: '#FFBC00',
                                    color: '#3B3B3B',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={toggle}>
                                Go Back
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Reject;
