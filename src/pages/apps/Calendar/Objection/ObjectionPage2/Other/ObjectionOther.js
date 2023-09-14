import React from 'react';
import { Accordion } from 'react-bootstrap';
import OtherRangeBar from './OtherRangeBar';
const ObjectionOther = (props) => {
    const { other, objectionInside, otherSave, setOtherSave, objectionDataOther } = props;
    return (
        <div id="acordion-container" key={1}>
            <Accordion defaultActiveKey={0}>
                {other?.map((data, index) => (
                    <Accordion.Item eventKey={index} className="acordion-item">
                        <Accordion.Header>{data.brandName}</Accordion.Header>
                        <Accordion.Body>
                            {objectionInside?.map((el, index) => (
                                <OtherRangeBar
                                    objectionRangeData={el}
                                    objectionRangeIndex={index}
                                    data={data}
                                    otherSave={otherSave}
                                    setOtherSave={setOtherSave}
                                    objectionDataOther={objectionDataOther?.filter(x => (el.id === x.objectionId && data.brandName === x.brandName))[0]}
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default React.memo(ObjectionOther);
