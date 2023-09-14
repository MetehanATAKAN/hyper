import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import FailModal from '../../../../components/FailModal';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Delete = ({ modalShow, setModalShow, item = '', applyFilter, fetchData, rowName }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const onHide = () => {
        setModalShow(true);
    };

    const deleteSpec = () => {
        if (item.title === 'spec') {
            FetchApiPost(
                'services/Organization/Organization/BusinessUnitCampaignCalendar/DeleteBusinessUnitCampaingCalendarSpecialization',
                'POST',
                fetchData
            )
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        setModalShow(false);
                        applyFilter();
                    }
                    if (res.status === 400 || res.status === 404 || res.status === 409) {
                        res.json().then(({ errors }) => {
                            setErrorModal(true);
                            setError(errors);
                        });
                    }
                    if (res.status === 500 || res.status === 502) {
                        history.push('/error-500');
                    }
                })
                .catch((err) => console.log(err));
        }

        if (item.title === 'category') {
            FetchApiPost(
                'services/Organization/Organization/BusinessUnitCampaignCalendar/DeleteBusinessUnitCampaingCalendarSpecializationCategory',
                'POST',
                fetchData
            )
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        setModalShow(false);
                        applyFilter();
                    }
                    if (res.status === 400 || res.status === 404 || res.status === 409) {
                        res.json().then(({ errors }) => {
                            setErrorModal(true);
                            setError(errors);
                        });
                    }
                    if (res.status === 500 || res.status === 502) {
                        history.push('/error-500');
                    }
                })
                .catch((err) => console.log(err));
        }
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
                                {t('Are you sure you want to delete ?')} <br /> {rowName && rowName} <br /> "
                                {item.label}"
                            </div>
                            <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                    }}
                                    className="delete"
                                    onClick={deleteSpec}>
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

export default React.memo(Delete);
