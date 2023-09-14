import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DisadvantageRangeBar from './DisadvantageRangeBar';

const DisadvantageRate = (props) => {
    const { competitorProduct, competitorDisadvantage } = props;
    const sameDisadv = useSelector((state) => state.Calendar.competitorDisadvantageData);
    return (
        <div id="acordion-container" key={3}>
            <Accordion defaultActiveKey={0}>
                {competitorDisadvantage?.map((data, index) => (
                    <Accordion.Item eventKey={index} className="acordion-item">
                        <Accordion.Header>{data.competitorBrandName}</Accordion.Header>
                        <Accordion.Body>
                            {competitorDisadvantage[index].competitors
                                .filter((el) => el.isChecked === true)
                                ?.map((disadv, index) => (
                                    <DisadvantageRangeBar advantageRangeData={disadv} advantageRangeIndex={index} />
                                ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
                {sameDisadv?.map((data, index) => (
                    <Accordion.Item eventKey={index + 50} className="acordion-item">
                        <Accordion.Header>{data.competitorBrandName}</Accordion.Header>
                        <Accordion.Body>
                            {data.items
                                .filter((el) => el.isChecked === true)
                                ?.map((disadv, index) => (
                                    <DisadvantageRangeBar advantageRangeData={disadv} advantageRangeIndex={index} />
                                ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default DisadvantageRate;
