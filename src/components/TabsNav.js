import { Tab } from 'bootstrap'
import React from 'react'
import { Tabs } from 'react-bootstrap'

const TabsNav = (props) => {
    const{ link1, link2, link3, children} = props;
  return (
    <Tabs defaultActiveKey={link1} id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey={link1} title={link1}>
            {children}
        </Tab>
        <Tab eventKey={link2} title={link2}>
            {children}
        </Tab>
        <Tab eventKey={link3} title={link3}>
            {children}
        </Tab>
    </Tabs>
  )
}

export default TabsNav;