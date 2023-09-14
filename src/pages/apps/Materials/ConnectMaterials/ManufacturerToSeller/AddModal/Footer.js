import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = ({ addBtn, cancelBtn, addButtonDisableStatus }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button onClick={cancelBtn} variant="light">
                {t('cancel')}
            </Button>
            <Button onClick={addBtn} disabled={addButtonDisableStatus} variant="primary">
                {t('add')}
            </Button>
        </>
    );
};

export default Footer;