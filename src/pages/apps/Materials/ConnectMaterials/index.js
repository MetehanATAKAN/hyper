import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MaterialsOrServices from './MaterialsOrServices';
import ManufacturerToSeller from './ManufacturerToSeller';
import Tabs from './Tabs';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';

const ConnectMaterials = () => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState('Materials or Services to Company');
    const history = useHistory();

    return (
        <div className="company-type">
            <div className="company-type-breadcrumb">
                <h4 style={{ color: '#6C757D' }}>{t('Connect Materials to Companies')}</h4>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to="/apps/calendar" style={{ color: '#00A0DF', fontSize: '15px' }}>
                            {t('Home')}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ fontSize: '15px' }}>
                        {t('Connect Materials to Companies')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{ fontSize: '15px' }}>{t(selectedTab)}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'Materials or Services to Company' && (
                <MaterialsOrServices
                // modalTabValue={modalTabValue}
                // setModalTabValue={setModalTabValue}
                // handleAddModal={handleAddModal}
                // handleAddModalStatus={handleAddModalStatus}
                // setHandleAddModalStatus={setHandleAddModalStatus}
                />
            )}
            {selectedTab === 'Manufacturer to Seller' && <ManufacturerToSeller />}
        </div>
    );
};

export default ConnectMaterials;
