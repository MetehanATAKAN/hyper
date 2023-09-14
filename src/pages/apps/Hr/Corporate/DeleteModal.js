import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';

import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';

const DeleteModal = ({ modalShow, setModalShow, data }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [errorMessages, setErrorMessages] = useState('');

    const modifiedBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };

    const deleteNeed = () => {
        if (data === 0) return;
        const deletedData = {
            Id: data.id,
            ModifiedBy: modifiedBy,
        };
        FetchApiPost('services/Hr/Department/DeleteDepartment', 'POST', deletedData).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setTimeout(() => {
                                setModalShow(false);
                                window.location.reload();
                            }, 1000);

                        });
                    }
                    else if (res.status === 409) {
                        res.json().then((data) => {
                            setErrorMessages(data.errors[0])
                        });
                    }
                    else if (res.status === 500) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                            <Icon path={mdiAlertCircleOutline} size={3} color={errorMessages === '' ? "#FA5C7C" : '#FFBC00'} />
                        </div>
                        {
                            errorMessages === '' &&
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                            </div>
                        }
                        <div className="alert-modal-question">
                            {
                                errorMessages === ''
                                    ? <>
                                        {t('Are you sure you want to delete this department?')} <br /> {data.departmentName}
                                    </>
                                    : errorMessages
                            }
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            {
                                errorMessages === '' &&
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
                            }
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

export default DeleteModal;
