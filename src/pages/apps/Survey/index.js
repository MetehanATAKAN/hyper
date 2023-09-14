import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import Categories from './Categories/index';
import Template from './Template';
import Share from './Share';
import '../../../assets/scss/custom/survey/survey.scss';
import { useHistory } from 'react-router';
import { FetchApiPost } from '../../../utils/http.helper';
const Survey = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [selectTab, setSelectTab] = useState({ key: 0, label: 'Template' });
    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Template', url: 'apps/survey' },
        { label: 'Survey' },
    ];
    const tabProps = [
        {
            label: t('Template'),
            key: 0,
        },
        {
            label: t('Share'),
            key: 1,
        },
        {
            label: t('Marketing Survey'),
            key: 2,
        },
        {
            label: t('Marketing Survey Report'),
            key: 3,
        },
        {
            label: t('Categories'),
            key: 4,
        },
        {
            label: t('Question bank'),
            key: 5,
        },
    ];

    return (
        <div id="survey-page">
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {selectTab.key === 0 && <Template setSelectTab={setSelectTab} />}
            {selectTab.key === 1 && <Share />}
            {selectTab.key === 4 && <Categories />}
        </div>
    );
};

export default Survey;
