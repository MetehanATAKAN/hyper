import React from 'react';
import { Accordion } from 'react-bootstrap';
import NonPromoRange from './NonPromoRange';
const ObjectionNonPromo = (props) => {
    const { nonPromo, objectionInside, nonPromoSave, setNonPromoSave, objectionDataNonPromo } = props;
    return (
        <div id="acordion-container" key={1}>
            <Accordion defaultActiveKey={0}>
                {nonPromo?.map((data, index) => (
                    <Accordion.Item eventKey={index} className="acordion-item">
                        <Accordion.Header>{data.brandName}</Accordion.Header>
                        <Accordion.Body>
                            {objectionInside?.map((el, index) => (
                                <NonPromoRange
                                    objectionRangeData={el}
                                    objectionRangeIndex={index}
                                    data={data}
                                    nonPromoSave={nonPromoSave}
                                    setNonPromoSave={setNonPromoSave}
                                    objectionDataNonPromo={objectionDataNonPromo?.filter(x => (el.id === x.objectionId && data.brandName === x.brandName))[0]}
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default React.memo(ObjectionNonPromo);
