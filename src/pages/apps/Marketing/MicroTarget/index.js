import React, { useState } from 'react';
import Tab from '../../../../components/Tab';
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../../components/BreadCrumb';
import Planning from './Planning';

const MicroTarget = () => {

    const { t } = useTranslation();

    //Select Tab
    const [selectTab, setSelectTab] = useState(
        {
            label: t('Planning'),
            key: 0
        }
    );

    const tabsProps = [
        {
            label: t('Planning'),
            key: 0
        },
        {
            label: t('Week'),
            key: 1
        },
    ]

    const breadCrumbProps = [
        {
            label: 'Home',
            url: '/apps/calendar'
        },
        {
            label: 'Marketing',
        },
        {
            label: selectTab.label
        }
    ];
    return (
        <div className='micro-target drag-drop-tables'>

            <BreadCrumb breadCrumbProps={breadCrumbProps}  />
            <Tab
                selectTab={selectTab}
                setSelectTab={setSelectTab}
                tabProps={tabsProps}
            />
            {
                selectTab.key === 0 && <Planning />
            }
        </div>
    )
}

export default MicroTarget