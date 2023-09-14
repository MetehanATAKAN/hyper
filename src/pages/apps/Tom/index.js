import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header.jsx';
import Icon from '@mdi/react';
import { mdiHomeOutline } from '@mdi/js';
import ProcessProjectType from './ProcessProjectType/index.js';
import { useTranslation } from 'react-i18next';
import SubProcess from './SubProcess/index.js';
import ActivityType from './ActivityType/index.js';
const Tom = () => {
    const { t } = useTranslation();

    const breadCrumb = [
        {
            label: <Link to="/apps/tom/process-and-project-type" style={{display: 'flex', alignItems: 'center', columnGap: '4px'}}> <Icon path={mdiHomeOutline} size={0.75} /><span>{t('PP Management')}</span></Link>
        },
        {
            label: t('Types'),
            items: [
                {
                    key: 1,
                    label: <div>{t('PP Type')}</div>,
                },
                {
                    key: 2,
                    label: <div>{t('Activity Type')}</div>,
                },
            ],
        },
        {
            label: t('PP Type'),
        },
    ];

    return (
        <div>
            <Header routes={breadCrumb} pageTitle={t('Process & Project Type')} />
            <ProcessProjectType />
        </div>
    );
};

export default Tom;