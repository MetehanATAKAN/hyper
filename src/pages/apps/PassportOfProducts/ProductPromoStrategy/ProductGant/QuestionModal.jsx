import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const QuestionModal = ({ modalShow, setModalShow, setPage }) => {
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
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                        </div>
                        <p style={{ marginTop: '25px', whiteSpace: 'pre-wrap' }}>
                            {t('Are you sure you want to return to the previous page ?')}
                            <br />
                            {t('If you return to the previous page, the order you made will be deleted.')}
                        </p>
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
                            <button
                                style={{
                                    backgroundColor: '#FA5C7C',
                                    color: '#fff',
                                    fontWeight: '500',
                                }}
                                className="cancel"
                                onClick={() => {
                                    setModalShow(false);
                                    setPage(2);
                                }}>
                                {t('go to previous page')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default QuestionModal;
