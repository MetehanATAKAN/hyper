import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { mdiLinkVariantOff } from '@mdi/js';
import Icon from '@mdi/react';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
const WhereLinkedModal = ({ modalShow, setModalShow, linkedData }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [needs, setNeeds] = useState('');

    const onHide = () => {
        setModalShow(false);
    }

    useEffect(() => {
        FetchApiPost('services/Pages/Need/GetNeedsForBenefitFilter', 'POST', {
            brandIds: [linkedData.brand.globalBrandId],
            indicationIds: [linkedData.indication.indicationId],
            specIds: linkedData.spec.map(s => s.specId),
            profileIds: [linkedData.profileId],
        }).then(res => {
            if(res.status === 200){
                res.json().then(({data}) => {
                   setNeeds(data.map(n => n.needName).join(', '))
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500');
            }
        })
    }, [])

    return (
        <>
            <div className="alert-modal">
                <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                    <Modal.Body>
                        <div className="alert-modal-items">
                            <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                                <Icon path={mdiLinkVariantOff} size={4.2} color={'#00A0DF'} />
                            </div>
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D', fontSize: '24px', fontWeight: '500' }}>{t('Where it Linked?')}</span>
                            </div>
                            <div className="alert-modal-question" style={{fontSize: '12px'}}>
                                <b>{t('NEED')}:</b> {needs}
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <button
                                    style={{
                                        backgroundColor: '#EEF2F7',
                                        color: '#6C757C',
                                        fontWeight: '500',
                                        width: 'min-content',
                                        whiteSpace: 'nowrap',
                                        padding: '8px 12px',
                                        margin: '0px!important',
                                        borderRadius: '2px',
                                        border: 'none',
                                    }}
                                    className="cancel"
                                    onClick={() => setModalShow(false)}>
                                    {t('go back')}
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default React.memo(WhereLinkedModal);
