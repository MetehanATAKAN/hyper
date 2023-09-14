import React from 'react'
import { Accordion } from 'react-bootstrap';
import ActivityRangeBars from './ActivityRangeBar';

const CompetitorActivity = (props) => {
  const { competitorProduct, competitorActivity } = props;

  console.log(competitorActivity);
    return (
    <div id='acordion-container' key={1}>
    <Accordion defaultActiveKey={0}>
        {competitorProduct?.map((data, index) => (
            <Accordion.Item eventKey={index} className='acordion-item'>
            <Accordion.Header>{data.competitorBrandName}</Accordion.Header>
            <Accordion.Body>
                {competitorActivity[index]?.competitorBrands?.map((data, index) => (
                    <ActivityRangeBars activityRangeData={data} activityRangeIndex={index} />
                ))}
            </Accordion.Body>
            </Accordion.Item>
        ))}
    </Accordion>
  </div>
  )
}

export default React.memo(CompetitorActivity);