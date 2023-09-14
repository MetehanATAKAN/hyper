import React from 'react';
import { Accordion } from 'react-bootstrap';
import AdvantageRangeBar from './AdvantageRangeBar';

const AdvantageRate = (props) => {
    const { competitorProduct, competitorAdvantage } = props;
    return (
        <div id="acordion-container" key={3}>
            <Accordion defaultActiveKey={0}>
                {competitorProduct?.map((data, index) => (
                    <Accordion.Item eventKey={index} className="acordion-item">
                        <Accordion.Header>{data.competitorBrandName}</Accordion.Header>
                        <Accordion.Body>
                            {competitorAdvantage.length > 0 &&
                                competitorAdvantage
                                    ?.filter((el) => el.advantageName !== null && el.status !== false)
                                    ?.map(
                                        (item, index) =>
                                            data.competitorBrandId === item.competitorBrandId && (
                                                <AdvantageRangeBar
                                                    advantageRangeData={item}
                                                    advantageRangeIndex={index}
                                                />
                                            )
                                    )}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default AdvantageRate;
