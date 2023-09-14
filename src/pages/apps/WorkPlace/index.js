import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import { useTranslation } from 'react-i18next';
import WorkPlaceTab from './WorkPlaceTab';
import Client from './Client';

const WorkPlace = () => {
    const { t } = useTranslation();

    const [selectTab, setSelectTab] = useState({
        key: 0,
        label: 'Work Place',
    });

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'CRM', url: '/apps/CRM/WorkPlace' },
        { label: 'Work Place' },
    ];

    const tabProps = [
        {
            key: 0,
            label: t('Work Place'),
        },
        {
            key: 1,
            label: t('Client'),
        },
    ];

    return (
        <div>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />

            {selectTab.key === 0 && <WorkPlaceTab />}
            {selectTab.key === 1 && <Client />}
        </div>
    );
};

export default WorkPlace;
