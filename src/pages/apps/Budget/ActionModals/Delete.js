import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../../../../utils/http.helper';

const Delete = ({ modalShow, setModalShow, budgetId, setBudgetData, budgetData }) => {
    const { t } = useTranslation();
    const [budgetDataById, setBudgetDataById] = useState(null);
    const onHide = () => {
        setModalShow(true);
    };
    useEffect(() => {
        if (budgetId === 0) return;
        const postData = { budgetId: Number(budgetId) };
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
                }
            })
            .catch((err) => console.log(err));
    }, [budgetId]);
    const deleteNeed = () => {
        if (budgetId === 0) return;
        const deletedData = {
            budgetId: budgetId,
            budgetStatus: 0,
        };
        FetchApiPost('services/Budget/Budget/DeleteBudget', 'POST', deletedData).then((res) => {
            if (res.status === 200) {
                const filteredArr = budgetData?.filter((el) => el.budgetId !== Number(budgetId));
                setBudgetData(filteredArr);
                setModalShow(false);
            }
        });
    };
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '5px' }}>
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                        </div>
                        <div className="alert-modal-question" style={{ marginTop: '25px' }}>
                            {t(`Are you sure you want to delete this budget ?`)}
                            {budgetDataById !== null &&
                                `${budgetDataById.year} - ${budgetDataById.company} / ${budgetDataById.department} / ${budgetDataById.center}`}
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '50px' }}>
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

export default React.memo(Delete);
