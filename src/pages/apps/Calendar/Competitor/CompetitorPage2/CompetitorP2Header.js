import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FetchApiGet } from '../../../../../utils/http.helper';

const CompetitorP2Header = (props) => {
  const { brandName, customer } = props;

  return (
      <Row className='competitor-page2-header'>
          <Col xs={2} className='brannd'><span className='competitor-page2-header_brand'>{brandName}</span></Col>
          <Col>for {customer.data.map(data => (data.specName))} {customer.data.map(data => (data.customerName))} </Col>
      </Row>
    )
}

export default React.memo(CompetitorP2Header);