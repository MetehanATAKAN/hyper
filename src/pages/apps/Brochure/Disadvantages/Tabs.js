import React, { useState, useEffect } from 'react'
import { mdiFormatListBulleted, mdiImageOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { disadvantageTab } from '../../../../redux/actions';
import { useTranslation } from 'react-i18next';

const Tabs = ({ selectedTab, setSelectedTab }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const disadvantageTabName = useSelector((state) => state.Need.disadvantageTabName);

  const [needTabs, setNeedTabs] = useState([
    {
      tabName: 'Disadvantages',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Page List',
      icon: <Icon path={mdiFormatListBulleted}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Page Gallery',
      icon: <Icon path={mdiImageOutline}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    },
    {
      tabName: 'Templates',
      icon: <Icon path={mdiImageOutline}
        size={1}
        color="#6F6F6F"
      />,
      disabled: false
    }
  ]);
  
  const changeTab = (e) => {
    dispatch(disadvantageTab(e));
    setSelectedTab(e);
  }

  useEffect(() => {
    let nav = document.getElementsByClassName('brochure-nav-tabs');
    for (let index = 0; index < 4; index++) {
      let element = nav[0].children[index];
        element.children[0].classList.remove('active')
      if(t(element.children[0].innerText) === t(disadvantageTabName)){
        element.children[0].classList.add('active');
      }
    }
  }, [disadvantageTabName]);

  return (
    <div className='brochure-templates'>
      <Row>
        <Col lg={12}>
          <div>
            <Tab.Container
              defaultActiveKey={disadvantageTabName}
              onSelect={(e)=>changeTab(e)}
            >
              <Nav variant="tabs" className="nav-bordered brochure-nav-tabs" as="ul">
                {needTabs.map((tab, index) => {
                  return (
                    <Nav.Item key={index} as="li">
                      <Nav.Link href="#" eventKey={tab.tabName} disabled={tab.disabled} onClick={() => setSelectedTab(tab.tabName)}>
                        <div className='need-tab-link'>
                          <span className='need-tab-link__icon'>{tab.icon}</span>
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