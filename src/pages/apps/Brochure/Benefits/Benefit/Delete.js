import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { async } from 'regenerator-runtime';

const Delete = ({ modalShow, setModalShow, needId, tableData, setTableData }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const filterData = useSelector( state => state.Need.filterFunct);
    console.log(modalShow, needId, tableData);

    const [name, setName] = useState(null);

    console.log('name',name);
    const modifiedBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };

    useEffect(() => {
      setName(tableData?.find(data =>data.id === needId.id))
    }, [needId.id, tableData])
    
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

    const deleteNeed = async () => {
        if (needId === 0) return;
        const deletedData = {
            id: needId.id,
            trash:30,
            modifiedBy: modifiedBy,
        };
        FetchApiPost('services/Pages/Benefit/DeleteBenefit', 'POST', deletedData).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                       await benefitFilter();
                       await setModalShow(false);
                    } 
                    else if (res.status === 500) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
        // .then((res) => {
        //     if (res.status === 200) {
        //         const filteredArr = tableData?.filter((el) => el.id !== Number(needId));
        //         setTableData(filteredArr);
        //         setModalShow(false);
        //     }
        // });
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
                                'Are you sure you want to delete this benefit?'
                            )}
                            <br/>
                            {
                               `"${name?.benefitName}"`
                            }
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
