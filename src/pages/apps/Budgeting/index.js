import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import { useTranslation } from 'react-i18next';
import AccountGroup from './AccountGroup';
import AccountSubGroup from './AccountSubGroup';
import AccountName from './AccountName';
import AccountCostGroup from './AccountCostGroup';
import AccSettings from './ACCSettings';
import { FetchApiPost } from '../../../utils/http.helper';
import { useHistory } from 'react-router';

const Budgeting = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [selectTab, setSelectTab] = useState({
        key: 0,
        label: 'Account Group',
    });

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Budgeting', url: '/apps/budgeting' },
        { label: selectTab.label },
    ];

    const tabProps = [
        {
            key: 0,
            label: t('Account Group'),
        },
        {
            key: 1,
            label: t('Account Sub Group'),
        },
        {
            key: 2,
            label: t('Account Name'),
        },
        {
            key: 3,
            label: t('Account Cost Center'),
        },
        {
            key: 4,
            label: t('ACC Settings'),
        },
    ];

    return (
        <div className="budgeting-page">
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {selectTab.key === 0 && <AccountGroup />}
            {selectTab.key === 1 && <AccountSubGroup />}
            {selectTab.key === 2 && <AccountName />}
            {selectTab.key === 3 && <AccountCostGroup />}
            {selectTab.key === 4 && <AccSettings />}
        </div>
    );
};

export default Budgeting;
