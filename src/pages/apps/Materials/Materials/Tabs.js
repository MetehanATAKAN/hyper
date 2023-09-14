import React from 'react';
import { mdiFormatListBulleted } from '@mdi/js';
import Icon from '@mdi/react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const Tabs = ({ selectedTab, setSelectedTab }) => {
    const { t } = useTranslation();
    const needTabs = [
        {
            tabName: 'Main Category',
            icon: <Icon path={mdiFormatListBulleted} size={1} color="#6F6F6F" />,
            disabled: false,
        },
        {
            tabName: 'Category',
            icon: <Icon path={mdiFormatListBulleted} size={1} color="#6F6F6F" />,
            disabled: false,
        },
        {
            tabName: 'Category Sub 1',
            icon: <Icon path={mdiFormatListBulleted} size={1} color="#6F6F6F" />,
            disabled: false,
        },
        {
            tabName: 'Category Sub 2',
            icon: <Icon path={mdiFormatListBulleted} size={1} color="#6F6F6F" />,
            disabled: false,
        },
        {
            tabName: 'Category Sub 3',
            icon: <Icon path={mdiFormatListBulleted} size={1} color="#6F6F6F" />,
            disabled: false,
        },
        {
            tabName: 'Materials or Services',
            icon: <Icon path={mdiFormatListBulleted} size={1} color="#6F6F6F" />,
            disabled: false,
        },
        {
            tabName: 'Materials or Services Type',
            icon: <Icon path={mdiFormatListBulleted} size={1} color="#6F6F6F" />,
            disabled: false,
        },
    ];

    return (
        <div className="brochure-templates">
            <Row>
                <Col lg={12}>
                    <div>
                        <Tab.Container defaultActiveKey={selectedTab}>
                            <Nav variant="tabs" className="nav-bordered brochure-nav-tabs" as="ul">
                                {needTabs.map((tab, index) => {
                                    return (
                                        <Nav.Item key={index} as="li">
                                            <Nav.Link
                                                href="#"
                                                eventKey={tab.tabName}
                                                disabled={tab.disabled}
                                                onClick={() => setSelectedTab(tab.tabName)}>
                                                <div className="need-tab-link">
                                                    <span
                                                        className="need-tab-link__icon"
                                                        style={{ display: 'grid', gridTemplateColumns: 'center' }}>
                                                        {tab.icon}
                                                    </span>
                                                    <span>{t(tab.tabName)}</span>
                                                </div>
                                            </Nav.Link>
                                        </Nav.Item>
                                    );
                                })}
                            </Nav>
                        </Tab.Container>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Tabs;
