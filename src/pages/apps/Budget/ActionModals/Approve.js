import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiCheckCircleOutline, mdiPencilCircleOutline, mdiSendCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../../../../utils/http.helper';
import SendIcon from '../../../../components/Icons/SendIcon';

const Approve = (props) => {
    const { modalShow, setModalShow, item, applyBudgetFilter } = props;
    const { t } = useTranslation();
    const [budgetDataById, setBudgetDataById] = useState(null);
    const createdBy = localStorage.getItem('userName');
    const [btnColor, setBtnColor] = useState('#6C757D');
    const [spinner, setSpinner] = useState(false);
    const onHide = () => {
        setModalShow(true);
    };
    useEffect(() => {
        if (item.selectedStatus.key === 'Approval') {
            setBtnColor('#FFBC00');
        } else if (item.selectedStatus.key === 'Approved') {
            setBtnColor('#0ACF97');
        } else {
            setBtnColor('#6C757D');
        }
    }, [item]);

    useEffect(() => {
        if (item.itemId === 0) return;
        setSpinner(true);
        const postData = { budgetId: Number(item.itemId) };
        FetchApiPost('services/Budget/Budget/GetBudgetById', 'POST', postData)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) =>
                        setBudgetDataById({
                            year: data.yearId,
                            company: data.companyName,
                            department: data.departmentName,
                            center: data.accountCostCenterName,
                        })
                    );
                    setSpinner(false);
                }
            })
            .catch((err) => console.log(err));
    }, [item]);
    const handleClick = () => {
        const data = {
            budgetId: item.itemId,
            approveStatus: item.selectedStatus.id,
            approverName: createdBy,
            RejectReason: '',
        };
        FetchApiPost('services/Budget/Budget/ApproveBudget', 'POST', data).then((res) => {
            if (res.status === 200) {
                applyBudgetFilter();
                setModalShow(false);
            }
        });
    };
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        {spinner === true ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '300px',
                                }}>
                                <Spinner animation="border" variant="primary" />
                            </div>
                        ) : (
                            <>
                                {' '}
                                <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                                    {item.selectedStatus.key === 'Redact' && (
                                        <Icon path={mdiPencilCircleOutline} size={3} color="#6C757D" />
                                    )}
                                    {item.selectedStatus.key === 'Approval' && (
                                        <Icon path={mdiSendCheck} size={3} color="#FFBC00" />
                                    )}
                                    {item.selectedStatus.key === 'Approved' && (
                                        <Icon path={mdiCheckCircleOutline} size={3} color="#0ACF97" />
                                    )}
                                </div>
                                <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                    <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                                </div>
                                <div className="alert-modal-question">
                                    {t(`Are you sure you want to send this budget for ${item.selectedStatus.key}`)}{' '}
                                    {budgetDataById !== null &&
                                        `${budgetDataById.year} - ${budgetDataById.company} / ${budgetDataById.department} / ${budgetDataById.center}`}
                                </div>
                                <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                                    <button
                                        style={{
                                            backgroundColor: btnColor,
                                            color: '#fff',
                                            fontWeight: '600',
                                            width: '150px',
                                        }}
                                        className="delete"
                                        onClick={handleClick}>
                                        {item.selectedStatus.key === 'Redact'
                                            ? t('Yes, Editable it!')
                                            : item.selectedStatus.key === 'Approval'
                                            ? t('Yes, Approval it!')
                                            : item.selectedStatus.key === 'Approved'
                                            ? t('Yes, Approved it!')
                                            : null}
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
                                </div>{' '}
                            </>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default React.memo(Approve);
