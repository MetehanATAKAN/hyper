import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import PageList from './PageList';
import NeedTab from './NeedTab/index';
import Templates from './TemplatesTab';
import PageGallery from '../PageGallery/index';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../../components/BreadCrumb';

const Need = () => {
    const [selectedTab, setSelectedTab] = useState('Need');
    const needTabName = useSelector((state) => state.Need.needTypeName);

    useEffect(() => {
        setSelectedTab(needTabName);
    }, [needTabName]);
    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Page Design', url: '/apps/calendar' },
        { label: 'Need' },
    ];
    return (
        <div>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'Need' && <NeedTab setSelectedTab={setSelectedTab} />}
            {selectedTab === 'Page List' && <PageList setSelectedTab={setSelectedTab} />}
            {selectedTab === 'Page Gallery' && <PageGallery />}
            {selectedTab === 'Templates' && <Templates />}
        </div>
    );
};

export default Need;
