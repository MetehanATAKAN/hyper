import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../components/GlobalNew/Modal';

const ResetModal = ({ showModal, setShowModal }) => {
    const { t } = useTranslation();
    return (
        <GlobalModal
            header={t('Reset to Default')}
            toggle={() => setShowModal(!showModal)}
            showModal={showModal}
            setShowModal={setShowModal}
            body={
                <div className="reset-container">
                    <span style={{ fontSize: '12px' }}>
                        Resetting to the default layout will change the left navigation bar in these ways:
                    </span>
                    <div className="reset-container__rules">
                        <span style={{ fontSize: '12px' }}>- Order of groups and pages will be reset to default</span>
                        <span style={{ fontSize: '12px' }}>- Names of groups will be reset to default</span>
                        <span style={{ fontSize: '12px' }}>- Visibility of groups and pages will not be reset</span>
                    </div>
                    <span style={{ fontSize: '12px' }}>Go ahead ?</span>
                </div>
            }
            footer={
                <>
                    <Button onClick={() => setShowModal(false)} variant="light">
                        {t('No')}
                    </Button>
                    <Button variant="primary">{t('Yes')}</Button>
                </>
            }
        />
    );
};

export default ResetModal;
