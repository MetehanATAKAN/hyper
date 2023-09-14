import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

import { useHistory } from 'react-router-dom';
import PositionsIndex from './Positions';
import PositionLevels from './PositionLevels';
import Departments from './Departments';

import BreadCrumb from '../../../../components/BreadCrumb';
import Tab from '../../../../components/Tab';

// import TableLayout from '../../../../components/Tables/TableAccordion';

const CorporateIndex = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [selectTab, setSelectTab] = useState({
        key: 0,
        label: 'Departments',
    });

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'HR Management', url: '/hr/corporate' },
        { label: 'passport-of-products' },
    ];

    const tabProps = [
        {
            key: 0,
            label: t('Departments'),
        },
        {
            key: 1,
            label: t('Positions'),
        },
        {
            key: 2,
            label: t('Position Levels'),
        },
    ];

    return (
        <div>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />

            {selectTab.key === 0 && <Departments />}
            {selectTab.key === 1 && <PositionsIndex />}
            {selectTab.key === 2 && <PositionLevels />}
        </div>
    );
};

export default CorporateIndex;
