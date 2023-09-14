import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = ({ cancelButton, buttonDisableStatus, setOnClickAddBtn }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button variant="light" onClick={() => cancelButton()}>
                {t('cancel')}
            </Button>
            <Button variant="warning" disabled={buttonDisableStatus} onClick={setOnClickAddBtn}>
                {t('update')}
            </Button>
        </>
    );
};

export default Footer;
