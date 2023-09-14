import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header.jsx';
import Icon from '@mdi/react';
import { mdiHomeOutline } from '@mdi/js';
import Table from './Table';
import { useTranslation } from 'react-i18next';

const Tom = () => {
    const { t } = useTranslation()
    const breadCrumb =[
        {
            label: <Link to="/apps/tom/process-and-project-type" style={{display: 'flex', alignItems: 'center', columnGap: '4px'}}> <Icon path={mdiHomeOutline} size={0.75} /><span>{t('PP Management')}</span></Link>
        },
        {
            label: t('Processes'),
            items: [
               {
                    key: 1,
                    label: <Link to="/apps/tom/main-process">{t('Main Process')}</Link>
               },
               {
                key: 2,
                label: <div>{t('Business Process')}</div>
               },
               {
                key: 3,
                label: <div>{t('Process')}</div>
               },
               {
                key: 4,
                label: <div>{t('Sub Process')}</div>
               }
            ]
        },
        {
            label: t('Business Process')
        }
    ]

  return (
    <div>
        <Header routes={breadCrumb} pageTitle={t('Business Process')} />
            <Table />
    </div>
  )
}

export default Tom