import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const UpdateFooter = ({ updateBtn, cancelBtn }) => {
    const { t } = useTranslation();
    return (
        <>
            <Button onClick={cancelBtn} variant="light">
                {t('cancel')}
            </Button>
            <Button onClick={updateBtn} variant="warning">
                {t('update')}
            </Button>
        </>
    );
};

export default React.memo(UpdateFooter);
