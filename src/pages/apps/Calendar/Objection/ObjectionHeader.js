import React from 'react'
import { Col, Row } from 'react-bootstrap';

const ObjectionHeader = (props) => {
  const {customer } = props;

  return (
      <Row className='competitor-page2-header'>
          <Col>{customer.map(data => (data.specName))} {customer.map(data => (data.customerName))} </Col>
      </Row>
    )
}

export default React.memo(ObjectionHeader);