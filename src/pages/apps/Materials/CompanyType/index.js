import React, { useState, useEffect } from 'react';
// import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Tabs from './Tabs';
import OurCompanyType from './OurCompanyType';
import MainType from './MainType';
import Type from './Type';
import AssetsType from './AssetsType';
import DutiesType from './DutiesType';
import MaterialUsageFacility from './MaterialUsageFacility';
import Companies from './Companies';
import AddModals from './AddModals';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';

import BreadCrumb from '../../../../components/BreadCrumb';
import Tab from '../../../../components/Tab';

import Agreements from './Agreements';

const CompanyType = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [selectedTab, setSelectedTab] = useState('Our Company Type');
    const [modalTabValue, setModalTabValue] = useState(0);
    const [addModal, setAddModal] = useState(false);
    const [handleAddModalStatus, setHandleAddModalStatus] = useState({ clickAdd: false, tabName: '', item: null });

    const [selectTab, setSelectTab] = useState({
        key: 0,
        label: t('Our Company Type'),
    });

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Business Development', url: '/apps/company-type' },
        { label: 'Companies and Agreements' },
    ];

    const tabProps = [
        {
            key: 0,
            label: t('Our Company Type'),
        },
        {
            key: 1,
            label: t('Main Type'),
        },
        {
            key: 2,
            label: t('Type'),
        },
        {
            key: 3,
            label: t('Assets Type'),
        },
        {
            key: 4,
            label: t('Duties Type'),
        },
        {
            key: 5,
            label: t('Material Usage Facility'),
        },
        {
            key: 6,
            label: t('Companies'),
        },
        {
            key: 7,
            label: t('Agreements'),
        },
    ];

    const handleAddModal = () => {
        setAddModal(true);
        switch (selectTab.key) {
            case 0:
                setModalTabValue(0);
                break;
            case 1:
                setModalTabValue(1);
                break;
            case 2:
                setModalTabValue(2);
                break;
            case 3:
                setModalTabValue(3);
                break;
            case 4:
                setModalTabValue(4);
                break;
            case 5:
                setModalTabValue(5);
                break;
            case 6:
                setModalTabValue(6);
                break;
            default:
                break;
        }
    };

    return (
        <div className="company-type">
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />

            {selectTab.key === 0 && (
                <OurCompanyType
                    modalTabValue={modalTabValue}
                    setModalTabValue={setModalTabValue}
                    handleAddModal={handleAddModal}
                    handleAddModalStatus={handleAddModalStatus}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}

            {selectTab.key === 1 && (
                <MainType
                    handleAddModal={handleAddModal}
                    handleAddModalStatus={handleAddModalStatus}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}

            {selectTab.key === 2 && (
                <Type
                    handleAddModal={handleAddModal}
                    handleAddModalStatus={handleAddModalStatus}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}

            {selectTab.key === 3 && (
                <AssetsType
                    handleAddModal={handleAddModal}
                    handleAddModalStatus={handleAddModalStatus}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}

            {selectTab.key === 4 && (
                <DutiesType
                    handleAddModal={handleAddModal}
                    handleAddModalStatus={handleAddModalStatus}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}

            {selectTab.key === 5 && (
                <MaterialUsageFacility
                    handleAddModal={handleAddModal}
                    handleAddModalStatus={handleAddModalStatus}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}

            {selectTab.key === 6 && (
                <Companies
                    handleAddModal={handleAddModal}
                    handleAddModalStatus={handleAddModalStatus}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}

            {selectTab.key === 7 && <Agreements />}

            {addModal && (
                <AddModals
                    modalTabValue={modalTabValue}
                    setModalTabValue={setModalTabValue}
                    isShow={addModal}
                    setIsShow={setAddModal}
                    setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}
        </div>
    );
};

export default CompanyType;
