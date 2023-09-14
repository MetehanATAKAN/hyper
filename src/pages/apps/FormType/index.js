import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import FormIndex from './Form';
import PackingForm from './PackingForm';
import UnitIndex from './Unit';
import UnitsFormIndex from './UnitsForm';
import { FetchApiPost } from '../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { Header } from '../../../components/Header';

const FormType = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [selectTab, setSelectTab] = useState({ key: 0, label: 'Form' });
    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Production', url: '/apps/competitor' },
        { label: 'Pharmaceutical Forms' },
    ];
    const tabProps = [
        {
            label: t('Form'),
            key: 0,
        },
        {
            label: t('Unit'),
            key: 1,
        },
        {
            label: t('Units of Form'),
            key: 2,
        },
        {
            label: t('Packing Form'),
            key: 3,
        },
    ];

    return (
        <div>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {selectTab.key === 0 && <FormIndex />}
            {selectTab.key === 1 && <UnitIndex />}
            {selectTab.key === 2 && <UnitsFormIndex />}
            {selectTab.key === 3 && <PackingForm />}
        </div>
    );
};

export default FormType;
