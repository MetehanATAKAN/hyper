import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline,mdiArchive  } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../../utils/http.helper';

const DuplicateModal = ({ modalShow, setModalShow, data }) => {

    const { t } = useTranslation();
    const history = useHistory();

    const modifiedBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };

    const duplicateBenefit = () => {

        const benefitBody = {
            BenefitId   :   data.id,
            CreatedBy   :   modifiedBy
        }

        FetchApiPost('services/Pages/Benefit/CopyBenefit ','POST',benefitBody)
        .then((res) => {
            if (res.status === 200) {
                setTimeout(() => {
                    setModalShow(false);
                    window.location.reload();
                }, 1000);
            }
        })
        .catch((err) => console.log('Error', err));
    }
   
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" 
                        style={{
                             marginTop: '2px' ,
                             border:'2px solid #bd6710',
                             width:'max-content',
                             borderRadius:'100%',
                             padding:'10px',
                             margin:'auto'
                             }}>
                            <Icon path={mdiArchive} size={3} color="#bd6710" />
                        </div>
                        <div className="alert-modal-question">
                            {t(
                                `Do you want to duplicate the benefit "${data.benefitName}"?`
                            )}
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <button
                                style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    width: '75px',
                                    backgroundColor:'#bd6710'
                                }}
                                onClick={duplicateBenefit}
                                >
                                {t('Yes')}
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#EEF2F7',
                                    color: '#6C757C',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
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

export default DuplicateModal;
