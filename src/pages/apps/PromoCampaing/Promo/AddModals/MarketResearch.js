import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

const MarketResearch = ({ setCheckResearchMarket }) => {
    const { t } = useTranslation();
    const onChange = (e) => {
        setCheckResearchMarket(e.target.checked);
    };
    return (
        <Checkbox style={{ margin: '2rem 5rem' }} autoFocus onChange={onChange}>
            {t('Do you want to research the market ?')}
        </Checkbox>
    );
};

export default React.memo(MarketResearch);
