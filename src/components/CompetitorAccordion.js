import React from 'react'
import { Accordion } from 'react-bootstrap';

const CompetitorAcordion = (props) => {
  const { componentData, children } = props;
  return (
    <div id='acordion-container' key={2}>
      <Accordion defaultActiveKey={0}>
              {componentData.map((data, index) => (
                <Accordion.Item eventKey={index} className='acordion-item'>
                  <Accordion.Header>{data.competitorBrandName}</Accordion.Header>
                  <Accordion.Body>
                    {children}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
      </Accordion>
    </div>
  )
}

export default CompetitorAcordion;