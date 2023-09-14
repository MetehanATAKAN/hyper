import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import { useTranslation } from 'react-i18next';
import Profile from './Profile';
import Templates from './Templates';
import Need from './Need';
import Benefit from './Benefit';
import PromoSubject from './PromoSubject';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useHistory, useLocation } from 'react-router-dom';
import PromoSubjectGrouping from './PromoSubjectGrouping';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const VisitContent = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const pageTabs = useSelector((state) => state.UserPermission.pageTabs);
    const [tabProps, setTabProps] = useState([]);
    const [loading, setLoading] = useState(true);
    let location = useLocation();

    const [selectTab, setSelectTab] = useState(
        location.search.includes('?tab=Promo%20Subject')
            ? {
                  key: 3,
                  label: t('Promo Subject'),
              }
            : {
                  key: 0,
                  label: 'Profile',
              }
    );

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Marketing', url: '/apps/visit-content' },
        { label: 'Visit Contents' },
    ];
    useEffect(() => {
        const tabsArr = pageTabs?.map((tab, index) => ({
            key: index,
            label: t(tab.tabName),
        }));
        setTabProps(tabsArr);
    }, [pageTabs]);
    useEffect(() => {
        if (pageTabs) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [pageTabs]);

    if (loading)
        return <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} spinning={loading} />;
    return (
        <div className="visit-content">
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {selectTab.key === 0 && <Profile selectTab={selectTab} setSelectTab={setSelectTab} />}
            {selectTab.key === 1 && <Need />}
            {selectTab.key === 2 && <Benefit />}
            {selectTab.key === 3 && <PromoSubject />}
            {selectTab.key === 4 && <PromoSubjectGrouping />}
        </div>
    );
};

export default VisitContent;
