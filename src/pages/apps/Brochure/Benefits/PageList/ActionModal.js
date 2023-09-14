import React, { useEffect, useState } from 'react'

import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const ActionModal = ({ modalShow, setModalShow, item, tableData, setTableData }) => {

    const { t } = useTranslation();
    const history = useHistory();
    
    const [selectedData, setSelectedData] = useState();
    console.log(selectedData);
    
    const onHide = () => {
        setModalShow(true);
    };

    console.log(tableData);
    console.log(item);
    // useEffect(() => {
    //     tableData?.map((el, i) => {
    //         if (Number(el.contentId) === Number(item.itemId)) {
    //             setSelectedData(el);
    //         }
    //     });
    // }, [tableData, item])

    useEffect(() => {
        tableData?.find((el) => Number(el.contentId) === Number(item.itemId) && setSelectedData(el));
    }, [tableData, item]);

    const handleClick = () => {
        let changedData = {};
        const arr = tableData.map((el, i) => {
            if (el.contentId === item.itemId) {
                changedData = {
                     ContentId: el.contentId,
                     Status: item.selectedStatus.value === "Editable" ? 1 : item.selectedStatus.value === "Approval" ? 2 : item.selectedStatus.value === "Approved" ? 3 : null,
                     ApproverName: el.createdBy,
                     RejectReason: null,
                };
                return { ...el, isApprovedContent: item.selectedStatus.id };
            }
            return el;
        });
        FetchApiPost('services/Pages/Benefit/ApproveBenefitPageList ', 'POST', changedData)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setModalShow(false);
                            setTableData(arr);
                            // setTimeout(() => {
                            //     window.location.reload();
                            // }, 1500);
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
                                {
                                    selectedData?.pageId === 0
                                    ?null
                                    :t('Are you sure ?')
                                }
                            </span>
                        </div>
                        <div className="alert-modal-question">
                          {
                              selectedData?.pageId === 0
                                  ? t('you can not send to approval because there is no page')
                                  : t(`Are you sure want to send ${selectedData?.abb} for ${item?.selectedStatus?.value} `)
                          }
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                        {selectedData?.pageId !== 0 && (
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                    }}
                                    className="delete"
                                    onClick={handleClick}>
                                    {item?.selectedStatus?.value === 'Editable'
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
  )
}

export default ActionModal