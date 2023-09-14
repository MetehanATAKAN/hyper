import React, { useEffect, useState } from 'react'

import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline,mdiCheckCircleOutline,mdiPencilCircleOutline, mdiSendCheck, } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { async } from 'regenerator-runtime';

const ActionModal = ({ modalShow, setModalShow, item, tableData, setTableData }) => {

    const { t } = useTranslation();

    const history = useHistory();

    const [name, setName] = useState(null);
    const createdBy = localStorage.getItem('userName');
    const [btnColor, setBtnColor] = useState('#6C757D');

    const filterData = useSelector( state => state.Need.filterFunct);

    const [selectedData, setSelectedData] = useState();
    const onHide = () => {
        setModalShow(true);
    };

    useEffect(() => {
        tableData?.map((el, i) => {
            if (Number(el.id) === Number(item.itemId)) {
                setSelectedData(el);
            }
        });
    }, [tableData, item])

    const benefitFilter = () => {

        const benefitBody = filterData;

        FetchApiPost('services/Pages/Benefit/ApplyForBenefitFilter','POST',benefitBody)
        .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setTableData(data.data)
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
    }

    const handleClick = async () => {
        const changedData = {
            id: item.id,
            approveStatus: item.statusId,
            approverName: createdBy,
            rejectReason: null,
        };
        FetchApiPost('services/Pages/Benefit/ApproveBenefit', 'POST', changedData)
        .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                               await benefitFilter();
                               await setModalShow(false);
                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        
    }

    useEffect(() => {
        if (item.statusId === 2) {
            setBtnColor('#FFBC00');
        } else if (item.statusId === 3) {
            setBtnColor('#0ACF97');
        } else {
            setBtnColor('#6C757D');
        }
    }, [item]);

    useEffect(() => {
     let data = tableData.find(data => data.id === item.id);
     setName(data);
    }, [item, tableData])
    
    
  return (
    <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                        {item.statusId === 1 && ( // redact
                                    <Icon path={mdiPencilCircleOutline} size={3} color="#6C757D" />
                                )}
                                {item.statusId === 2 && ( // send to approval
                                    <Icon path={mdiSendCheck} size={3} color="#FFBC00" />
                                )}
                                {item.statusId === 3 && ( // approved
                                    <Icon path={mdiCheckCircleOutline} size={3} color="#0ACF97" />
                                )}
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                        </div>
                        <div className="alert-modal-question">
                        {t(
                                    `Are you sure you want to send this need for ${
                                        item.statusId === 1
                                            ? 'redact'
                                            : item.statusId === 2
                                            ? 'approval'
                                            : item.statusId === 3
                                            ? 'approved'
                                            : ''
                                    } ?`
                                )}
                                <br />
                                {name?.benefitName}
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
                                    {item.statusId === 1
                                        ? t('Yes, Editable it!')
                                        : item.statusId === 2
                                        ? t('Yes, Approval it!')
                                        : item.statusId === 3
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
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
  )
}

export default ActionModal