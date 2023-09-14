import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import Bank from './Bank';
import Branch from './Branch';
import Accounts from './Accounts';
import { InputDefault } from '../../../components/FormElements/Input';

const Finance = () => {

    const { t } = useTranslation();

    //Select Tab
    const [selectTab, setSelectTab] = useState(
        {
            label: t('Bank'),
            key: 0
        }
    );

    const tabsProps = [
        {
            label: t('Bank'),
            key: 0
        },
        {
            label: t('Branch'),
            key: 1
        },
        {
            label: t('Accounts'),
            key: 2
        },
    ]

    const breadCrumbProps = [
        {
            label: 'Home',
            url: '/apps/calendar'
        },
        {
            label: 'Finance',
            url:'/apps/finance'
        },
        {
            label: selectTab.label
        }
    ];

  return (
    <div>
          <BreadCrumb breadCrumbProps={breadCrumbProps}  />
            <Tab
                selectTab={selectTab}
                setSelectTab={setSelectTab}
                tabProps={tabsProps}
            />
            <InputDefault/>
            {
                selectTab.key === 0 && <Bank/>
            }
            {
                selectTab.key === 1 && <Branch/>
            }
            {
                selectTab.key === 2 && <Accounts/>
            }
    </div>
  )
}

export default Finance