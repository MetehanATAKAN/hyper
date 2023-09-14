import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BreadCrumb } from '../../../uikit/Breadcrumb';
import CompanyDepartmentIndex from './CompanyDepartments';
import OrganizationPlanIndex from './OrganizationPlan';
import TeamsIndex from './Teams';
import PositionLevel from './PositionLevel';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';

const CompanyIndex = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [selectTab, setselectTab] = useState('Company’s Departments');

    const breadCrumbItem = [
        {
            name: 'Home',
            href: '/apps/calendar',
            active: false,
        },
        {
            name: 'HR Management',
            href: '/hr/company-departmant',
            active: false,
        },
        {
            name: selectTab,
            href: '/passport-of-products',
            active: true,
        },
    ];

    const tabContents = [
        {
            id: '1',
            title: t('Company’s Departments'),
            text: <CompanyDepartmentIndex />,
            disabled: false,
            ariaSelected: false,
        },
        {
            id: '2',
            title: t('Position Level'),
            text: <PositionLevel />,
            disabled: false,
            ariaSelected: false,
        },
        {
            id: '3',
            title: t('Organization Plan'),
            text: <OrganizationPlanIndex />,
            disabled: false,
            ariaSelected: true,
            // tabsDısabled.ownersIsDisabled
        },
        {
            id: '4',
            title: t('Teams'),
            text: <TeamsIndex />,
            disabled: false,
            ariaSelected: false,
            // tabsDısabled.participantsIsDisabled
        },
    ];

    return (
        <div>
            <BreadCrumb title={t('Company Organization Planing')} data={breadCrumbItem} />
            <Row>
                <Col lg={12}>
                    <div>
                        <Tab.Container
                            defaultActiveKey={
                                localStorage.getItem('i18nextLng') === 'en'
                                    ? 'Company’s Departments'
                                    : localStorage.getItem('i18nextLng') === 'tr'
                                    ? 'Şirket Departmanları'
                                    : localStorage.getItem('i18nextLng') === 'ru'
                                    ? 'Отделы компании'
                                    : null
                            }
                            onSelect={(e) => setselectTab(e)}>
                            <Nav variant="tabs" className="nav-bordered" as="ul">
                                {tabContents.map((tab, index) => {
                                    return (
                                        <Nav.Item key={index} as="li">
                                            <Nav.Link
                                                href="#"
                                                className="mete"
                                                eventKey={tab.title}
                                                disabled={tab.disabled}>
                                                <span>{tab.title}</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    );
                                })}
                            </Nav>

                            <Tab.Content>
                                {tabContents.map((tab, index) => {
                                    return (
                                        <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                                            <Row>
                                                <Col sm="12">
                                                    <p className="mb-2">{tab.text}</p>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                    );
                                })}
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CompanyIndex;
