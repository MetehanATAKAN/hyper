import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../../components/BreadCrumb';
import { useTranslation } from 'react-i18next';
import Tab from '../../../../components/Tab';
import GeneralOverview from './GeneralOverview';
import ProfileStrategy from './ProfileStrategy';
import { useDispatch } from 'react-redux';
import { tabOrDetails } from '../../../../redux/annualProductMix/actions';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import ProductGant from './ProductGant';

const ProductPromoStrategy = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const [selectTab, setSelectTab] = useState({ key: 0, label: 'Template' });

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Marketing' },
        { label: 'Annual Product Mix' },
    ];

    const tabProps = [
        {
            label: t('General Overview'),
            key: 0,
        },
        {
            label: t('Promo Strategy'),
            key: 1,
        },
    ];

    useEffect(() => {
        if (selectTab.key === 0) dispatch(tabOrDetails('tab'));
    }, [dispatch, selectTab]);

    return (
        <div>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {selectTab.key === 0 && <GeneralOverview setSelectTab={setSelectTab} />}
            {selectTab.key === 1 && <ProductGant />}
            {/* {selectTab.key === 1 && <ProfileStrategy setSelectTab={setSelectTab} />} */}
        </div>
    );
};

export default ProductPromoStrategy;
