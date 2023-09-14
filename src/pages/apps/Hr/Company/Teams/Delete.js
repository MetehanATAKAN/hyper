import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useSelector } from 'react-redux';


const Delete = ({ modalShow, setModalShow,data,setIsFilters,setTableData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const tableFilter = useSelector(state => state.Need.filterFunct);

    const modifiedBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };

    const deleteNeed = () => {
        if (data === 0) return;
        const deletedData = {
            id: data.teamId,
            modifiedBy: modifiedBy,
        };
        
        FetchApiPost('services/Hr/Team/DeleteTeam', 'POST', deletedData).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setTimeout(() => {
                                setModalShow(false);
                                FetchApiPost('services/Hr/Team/ApplyForTeamFilter','POST',tableFilter)
                                .then((res) =>
                                        (async () => {
                                            try {
                                                if (res.status === 200) {
                                                    setIsFilters(false);
                                                    res.json().then(item => {
                                                        return (
                                                            setTableData(item.data.map(data =>(data)))
                                                        )
                                                    })
                                                }
                                                else if (res.status === 500) {
                                                    history.push('/error-500');
                                                }
                                                else if (res.status === 499) {
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
                            }, 1000);
                            
                        });
                    } else if (res.status === 500) {
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
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                        </div>
                        <div className="alert-modal-question">
                            {
                                data?.teamName
                            }
                            <br/>
                            {
                                t('Are you sure you want to delete ?') 
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
