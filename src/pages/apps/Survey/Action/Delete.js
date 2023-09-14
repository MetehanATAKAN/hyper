import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import { FetchApiPost } from '../../../../utils/http.helper';
import FailModal from '../../../../components/FailModal';

const Delete = ({ modalShow, setModalShow, item, apply }) => {
    const { t } = useTranslation();
    const modifiedBy = localStorage.getItem('userName');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const onHide = () => {
        setModalShow(true);
    };

    const deleteNeed = () => {
        const deletedData = {
            id: item.id,
            modifiedBy: modifiedBy,
        };
        FetchApiPost('services/SurveySystem/Survey/DeleteSurvey', 'POST', deletedData).then((res) => {
            if (res.status === 201) {
                apply();
                setModalShow(false);
            }
            if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => (setErrorModal(true), setError(errors)));
            }
        });
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
                                <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                            </div>
                            <div className="alert-modal-question">
                                {t('Are you sure you want to delete this need?')} <br /> "{item.name}"
                            </div>
                            <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                    }}
                                    className="delete"
                                    onClick={deleteNeed}>
                                    {t('Yes, delete it!')}
                                </button>
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
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
        </>
    );
};

export default Delete;
