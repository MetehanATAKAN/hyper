import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';

const Delete = ({ modalShow, setModalShow, needId, tableData, setTableData }) => {
    const { t } = useTranslation();
    const history = useHistory();

    console.log(needId);
    const modifiedBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };

    const deleteNeed = () => {
        if (needId === 0) return;
        const body = {
            id: needId,
            modifiedBy: modifiedBy,
        };
     
        FetchApiPost('services/Pages/PromoSubject/DeletePromoSubject','POST',body)
        .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setModalShow(false)
                                res.json().then(item => {
                                  
                                })
                            }
                            else if (res.status === 409) {
                                history.push('/error-500');
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else {
                                console.log('hata');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
    };
    return (
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
                            {t(
                                "you won't be able to revert this! You CAN NOT view this need in your list anymore if you delete."
                            )}
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
    );
};

export default Delete;
