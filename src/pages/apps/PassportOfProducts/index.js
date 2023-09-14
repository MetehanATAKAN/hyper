import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BreadCrumb } from '../../uikit/Breadcrumb'
import PromoSubjectIndex from './PromoSubject';

const PassportOfProductIndex = () => {

    const { t } = useTranslation();

    const breadCrumbItem = [
        {
            name: 'Home',
            href: '/apps/calendar',
            active: false
        },
        {
            name: 'Passport Of Products',
            href: '/passport-of-products',
            active: false
        },
        {
            name: 'Promo Subject',
            href: '/passport-of-products',
            active: true
        },
    ]

    const tabContents = [
        {
            id: '1',
            title: t('Promo Subject'),
            text: <PromoSubjectIndex/>,
            disabled: false,
            ariaSelected: false
        },
    ];
    return (
        <div>
            <BreadCrumb
                title={t('Promo Subject')}
                data={breadCrumbItem}
            />
            <Row>
                <Col lg={12}>
                    <div>
                        <Tab.Container
                            defaultActiveKey={
                                localStorage.getItem('i18nextLng') === 'en' 
                                ? 'Promo Subject' 
                                :localStorage.getItem('i18nextLng') === 'tr'
                                ? 'Promosyon Konusu'
                                :localStorage.getItem('i18nextLng') === 'ru'
                                ? 'Тема промо'
                                :null
                            }

                        >
                            <Nav variant="tabs" className="nav-bordered" as="ul">
                                {tabContents.map((tab, index) => {
                                    return (
                                        <Nav.Item key={index} as="li">
                                            <Nav.Link href="#" className='mete' eventKey={tab.title} disabled={tab.disabled}  >
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
    )
}

export default PassportOfProductIndex