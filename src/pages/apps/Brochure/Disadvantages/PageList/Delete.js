import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { FetchApiPost } from '../../../../../utils/http.helper';

const Delete = ({ modalShow, setModalShow, deleteItem, pageListFilteredDatas, setPageListFilteredDatas }) => {
    const { t } = useTranslation();
    const modifiedBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };

    const deletePageList = () => {
        if (deleteItem.id === 0) return;
        const deletedData = {
            contentId: Number(deleteItem.contentId),
            modifiedBy: modifiedBy,
        };
        FetchApiPost('services/Pages/ProductPage/DeletePageList', 'POST', deletedData).then((res) => {
            if (res.status === 200) {
                const filteredArr = pageListFilteredDatas?.filter((el) => el.contentId !== Number(deleteItem.contentId));
                setPageListFilteredDatas(filteredArr);
                setModalShow(false);
            }
        });
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
                            "{deleteItem.passportOfProductName}" {t('Are you sure you want to delete this disadvantage?')}
                            
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <button
                                style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    width: '125px',
                                }}
                                className="delete"
                                onClick={deletePageList}>
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
