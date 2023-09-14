import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Tab from '../../../../components/Tab';
import Header from './Header';
import Defination from './Defination';
import BreadCrumb from '../../../../components/BreadCrumb';

const TableSettings = () => {

  const [selectTab, setSelectTab] = useState({ key: 0, label: 'Header' });

 

  const { t } = useTranslation();

  const tabProps = [
    {
      label: t('Header'),
      key: 0,
    },
    {
      label: t('Defination'),
      key: 1,
    }
  ];

  const breadCrumbProps = [
    { label: 'Home', url: '/apps/calendar' },
    { label: 'Settings'},
    { label: 'Table Settings '},
];

  return (
    <>
    <BreadCrumb breadCrumbProps={breadCrumbProps} />
      <Tab
        selectTab={selectTab}
        setSelectTab={setSelectTab}
        tabProps={tabProps}
      />
      {
        selectTab.key === 0 && <Header/>
      }
      {
        selectTab.key === 1 && <Defination/>
      }
    </>
  )
}

export default TableSettings