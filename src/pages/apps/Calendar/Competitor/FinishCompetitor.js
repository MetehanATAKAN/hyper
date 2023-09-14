import React from 'react';
import { useTranslation } from 'react-i18next';

const FinishCompetitor = () => {
    const { t } = useTranslation();
    return (
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
            {t('Are you sure you want to complete ?')}
        </div>
    );
};

export default FinishCompetitor;
