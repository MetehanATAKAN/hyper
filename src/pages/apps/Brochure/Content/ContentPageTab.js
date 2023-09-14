import React, { useState } from 'react'
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Icon from '@mdi/react'
import { mdiFilterMenuOutline, mdiPlus } from '@mdi/js'

const ContentPageTab = ({ setSelectedTab, setFilterStatus, filterStatus, setContentOnModal }) => {

const [templateTabs, setTemplateTabs] = useState([
    {
        id: 0,
        title: 'Template',
        text: 'Template',
        disabled: false
    },
    {
        id: 1,
        title: 'Content',
        text: 'Content',
        disabled: false
    },
    {
        id: 2,
        title: 'Promo Subject',
        text: 'Promo Subject',
        disabled: false
    },
    {
        id: 3,
        title: 'Archive',
        text: 'Archive',
        disabled: false
    }
    ]);

  return (
    <div className='content-page-tab'>
        <Row>
                <Col lg={12}>
                    <div>
                            <Tab.Container  
                            defaultActiveKey={'Template'} 
                            >
                                <Nav variant="tabs" className="nav-bordered" as="ul">
                                    {templateTabs.map((tab, index) => {
                                        return (
                                            <Nav.Item key={index} as="li">
                                                <Nav.Link href="#" eventKey={tab.title} disabled={tab.disabled} onClick={() => setSelectedTab(tab.title)}>
                                                    <span>{tab.title}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                            <div className='d-flex' style={{columnGap: ".5rem"}} >

                                            <Nav.Item  as="li" style={{display: "flex", alignItems: "center"}} >
                                                <button onClick={() => setFilterStatus(prev => !prev)} className="content-page-tab__btn">
                                                    <Icon path={mdiFilterMenuOutline}
                                                        title="filter"
                                                        size={1}
                                                        />
                                                </button>
                                            </Nav.Item>
                                            <Nav.Item  as="li" style={{display: "flex", alignItems: "center"}} >
                                                <button onClick={() => setContentOnModal(true)} className="btn-primary content-page-tab__add-btn">
                                                    <Icon path={mdiPlus}
                                                        title="add"
                                                        size={1}
                                                        />
                                                </button>
                                            </Nav.Item>
                                            </div>
                                </Nav>
                            </Tab.Container>
                    
                    </div>
                </Col>
            </Row>
    </div>
  )
}

export default ContentPageTab