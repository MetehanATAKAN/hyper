import React from 'react';
import { Button, Divider, Tabs } from 'antd';
import 'antd/dist/antd.css';
import '../assets/scss/custom/components/tabNav.scss';
import { useTranslation } from 'react-i18next';
const Tab = ({ selectTab, setSelectTab, tabProps, isNewBtn = false, newBtnClick }) => {
    const { t } = useTranslation();
    const onChange = (key) => {
        setSelectTab(tabProps[key]);
    };
    return (
        <Tabs
            defaultActiveKey={selectTab && selectTab.key}
            activeKey={selectTab.key}
            type="card"
            onChange={onChange}
            items={tabProps}
            tabBarExtraContent={{
                right: (
                    <div style={{ display: 'flex', columnGap: '8px', alignItems: 'center' }}>
                        {isNewBtn === true && (
                            <Button
                                onClick={newBtnClick}
                                size="middle"
                                type="primary"
                                style={{
                                    backgroundColor: '#00a0df',
                                    padding: '1px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                {t('new')}
                                <Divider type="vertical" className="new-btn-divider" />
                                <i style={{ fontSize: '12px' }} className="fas fa-plus" />
                            </Button>
                        )}
                    </div>
                ),
            }}
            tabBarGutter={0}
            className="new-tab-nav"
        />
    );
};
export default Tab;
