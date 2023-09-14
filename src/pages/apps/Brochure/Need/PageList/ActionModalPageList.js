import React, { useEffect, useState } from 'react';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

const ActionModalPageList = (props) => {
    const { modalShow, setModalShow, item, brochuries, setBrochuries, applyFilter } = props;
    const { t } = useTranslation();
    const [selectedData, setSelectedData] = useState([]);
    const onHide = () => {
        setModalShow(true);
    };
    useEffect(() => {
        brochuries?.find((el) => Number(el.contentId) === Number(item.itemId) && setSelectedData(el));
    }, [brochuries, item]);
    const createdBy = localStorage.getItem('userName');
    const handleClick = () => {
        const changedData = {
            contentId: item.itemId,
            status: item.selectedStatus.id,
            approverName: createdBy,
            RejectReason: '',
        };
        FetchApiPost('services/Pages/ProductPage/ApprovePageList', 'POST', changedData)
            .then((res) => {
                if (res.status === 200) {
                    applyFilter();
                    setModalShow(false);
                }
            })
            .catch((err) => console.log('Error', err));
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
                            <span style={{ color: '#6C757D' }}>
                                {selectedData?.jsonFile !== null && t(`Are you sure ? `)}
                            </span>
                        </div>
                        <div className="alert-modal-question">
                            {selectedData?.jsonFile === null
                                ? t('you can not send to approval because there is no page')
                                : t(`Are you sure want to send ${selectedData.abb} for ${item.selectedStatus.value} `)}
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            {selectedData?.jsonFile !== null && (
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                    }}
                                    className="delete"
                                    onClick={handleClick}>
                                    {item.selectedStatus.value === 'Editable'
                                        ? t('Yes, Editable it!')
                                        : item.selectedStatus.value === 'Approval'
                                        ? t('Yes, Approval it!')
                                        : item.selectedStatus.value === 'Approved'
                                        ? t('Yes, Approved it!')
                                        : null}
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

export default React.memo(ActionModalPageList);
