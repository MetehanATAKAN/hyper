import React, { useState, useEffect } from 'react'
import { mdiFormatListBulleted, mdiImageOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Tabs = ({ selectedTab, setSelectedTab }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [companyTab, setCompanyTab] = useState([
    {
      tabName: 'Our Company Type',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Main Type',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Type',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Assets Type',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Duties Type',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Material Usage Facility',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Companies',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    }
  ]);
  
  const changeTab = (e) => {
    setSelectedTab(e);
  }

  return (
    <div className='brochure-templates'>
      <Row>
        <Col lg={12}>
          <div>
            <Tab.Container
              defaultActiveKey={selectedTab}
              onSelect={(e)=>changeTab(e)}
            >
              <Nav variant="tabs" className="nav-bordered brochure-nav-tabs" as="ul">
                {companyTab.map((tab, index) => {
                  return (
                    <Nav.Item key={index} as="li">
                      <Nav.Link href="#" eventKey={tab.tabName} disabled={tab.disabled} onClick={() => setSelectedTab(tab.tabName)}>
                        <div className='need-tab-link'>
                          <span className='need-tab-link__icon' style={{display: "grid", gridTemplateColumns: "center"}}>{tab.icon}</span>
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
  )
}

export default Tabs;