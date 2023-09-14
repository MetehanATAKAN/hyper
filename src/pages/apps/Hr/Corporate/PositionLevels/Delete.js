import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../../utils/http.helper';

const Delete = ({ modalShow, setModalShow, selectedValue, filterData, setFilterData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const user = localStorage.getItem('userName');
    const [error, setError] = useState('');
    const onHide = () => {
        setModalShow(true);
    };
    console.log('selectedValue', selectedValue)
    const deleteBtn = () => {
        FetchApiPost('services/Hr/PositionLevel/DeletePositionLevel', 'POST', {
            id: selectedValue.id,
            modifiedBy: localStorage.getItem('userName')
        })
            .then((res) => {
                if (res.status === 201) {
                    let newData = filterData.filter((item) => item.id !== selectedValue.id);
                    setFilterData(newData);
                    setModalShow(false);
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => setError(errors));
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon">
                            <Icon path={mdiAlertCircleOutline} size={3} color={error === '' ? '#FA5C7C' : '#FFBC00'} />
                        </div>
                        {error === '' && (
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                            </div>
                        )}
                        <div className="alert-modal-question" style={{ marginTop: '25px' }}>
                            {error === '' ? (
                                <>
                                    {t(`Are you sure you want to delete ?`)}
                                    <br />
                                    "{selectedValue.position}" / "{selectedValue.levelName}"
                                </>
                            ) : (
                                t(error)
                            )}
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '50px' }}>
                            {error === '' && (
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                    }}
                                    onClick={() => deleteBtn()}
                                    className="delete">
                                    {t('Yes, delete it!')}
                                </button>
                            )}
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

export default Delete;
