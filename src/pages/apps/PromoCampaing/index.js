import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import Promo from './Promo';
import PromoRes from './PromoRes';
import CampaingSettings from './Settings';

const PromoCampaing = () => {
    const { t } = useTranslation();
    const [selectTab, setSelectTab] = useState({ key: 0, label: 'Promo Campaing' });
    const breadCrumbProps = [{ label: 'Home', url: '/apps/calendar' }, { label: 'Promo Campaing' }];
    const tabProps = [
        {
            label: t('Promo Campaign'),
            key: 0,
        },
        {
            label: t('Promo Campaign Zone'),
            key: 1,
        },
        {
            label: t('Campaign Settings'),
            key: 2,
        },
    ];
    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {selectTab.key === 0 && <Promo />}
            {selectTab.key === 1 && <PromoRes />}
            {selectTab.key === 2 && <CampaingSettings />}
        </>
    );
};

export default PromoCampaing;
