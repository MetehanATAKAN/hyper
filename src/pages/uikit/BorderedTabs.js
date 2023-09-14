// @flow
import React from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';


const BorderedTabs = ({tabContents,defaultActiveKey}): React$Element<React$FragmentType> => {

   
    
    return (
        <React.Fragment>
            {/* Bordered Tabs */}
            <Row>
                <Col lg={12}>
                    <div>
                        
                            <Tab.Container  
                            defaultActiveKey={
                                localStorage.getItem('i18nextLng') === 'en' 
                                ? 'Activity' 
                                :localStorage.getItem('i18nextLng') === 'tr'
                                ? 'Aktivite'
                                :localStorage.getItem('i18nextLng') === 'ru'
                                ? 'Мероприятия'
                                :null
                            } 
                            >
                                <Nav variant="tabs" className="nav-bordered" as="ul">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Nav.Item key={index} as="li">
                                                <Nav.Link href="#" eventKey={tab.title} disabled={tab.disabled}>
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
                                                        <p className="mt-3 mb-2">{tab.text}</p>
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
        </React.Fragment>
    );
};

export default BorderedTabs;
