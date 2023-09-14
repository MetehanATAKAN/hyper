import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { FetchApiPost } from '../../../../../utils/http.helper';

const Delete = ({ modalShow, setModalShow, contentId, brochuries, setBrochuries }) => {

    const { t } = useTranslation();
    console.log(contentId);
    const modifiedBy = localStorage.getItem('userName');
    const [informationData, setInformationData] = useState({});
    const onHide = () => {
        setModalShow(true);
    };

    const deleteNeed = () => {
        if (contentId === 0) return;
        const deletedData = {
            contentId: contentId,
            modifiedBy: modifiedBy,
        };
        FetchApiPost('services/Pages/ProductPage/DeletePageList', 'POST', deletedData).then((res) => {
            if (res.status === 200) {
                // const filteredArr = brochuries?.filter((el) => el.contentId !== Number(contentId));
                // setBrochuries(filteredArr);
                setModalShow(false);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        });
    };
    useEffect(() => {
        const findData = brochuries?.find((el) => el.contentId === Number(contentId));
        console.log(findData);
        setInformationData(findData);
    }, [brochuries, contentId]);

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
                                `You CAN NOT view this ${
                                    informationData && informationData.abb
                                } need in your list anymore if you delete.`
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

export default React.memo(Delete);
