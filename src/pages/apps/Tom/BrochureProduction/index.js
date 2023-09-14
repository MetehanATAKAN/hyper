import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header.jsx';
import Icon from '@mdi/react';
import { mdiHomeOutline, mdiFileTreeOutline, mdiMagnify, mdiFileDocumentCheckOutline } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import LeftBar from '../../../../components/FormElements/LeftBar';
import General from './General';

const BrochureProduction = () => {
  const { t } = useTranslation();
    const breadCrumb =[
        {
            label: <Link to="/apps/tom/process-and-project-type" style={{display: 'flex', alignItems: 'center', columnGap: '4px'}}> <Icon path={mdiHomeOutline} size={0.75} /><span>{t('PP Management')}</span></Link>
        },
        {
            label: t('Processes'),
            items: [
               {
                    key: 1,
                    label: <div>{t('Main Process')}</div>
               },
               {
                key: 2,
                label: <Link to="/apps/tom/business-process">{t('Business Process')}</Link>
               },
               {
                key: 3,
                label: <div>{t('Process')}</div>
               },
               {
                key: 3,
                label: <div>{t('Sub Process')}</div>
               }
            ]
        },
        {
            label: t('Process')
        },
        {
          label: t('Brochure Production')
        }
    ]

    const leftBar = [
        {
          icon: <Icon path={mdiFileTreeOutline} size={0.75} />,
          label: t('General'),
          key: 0,
          checked: true

        },
        {
          icon: <Icon path={mdiMagnify} size={0.75} />,
          label: t('SOP'),
          key: 1,
          checked: false
        },
        {
          icon: <Icon path={mdiFileDocumentCheckOutline} size={0.75} />,
          label: t('Sub Processes'),
          key: 2,
          checked: false
        }
    ]
    const [selectedBar, setSelectedBar] = useState({ key: 0, label: 'General'});

  return (
    <div>
      <Header routes={breadCrumb} pageTitle={t('Process')} />
      <div style={{display: 'grid', gridTemplateColumns: '1fr 4fr', padding: '12px 24px 24px 24px', columnGap: '24px', }}>
        <LeftBar 
          options={leftBar}
          setValue={setSelectedBar}
        />
        {
          selectedBar.label === 'General' && (
            <General />
          )
        }
      </div>
    </div>
  )
}

export default BrochureProduction