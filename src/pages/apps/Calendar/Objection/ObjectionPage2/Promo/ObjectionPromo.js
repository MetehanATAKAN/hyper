import React from 'react';
import { Accordion } from 'react-bootstrap';
import PromoRangeBar from './PromoRangeBar';

const ObjectionPromo = (props) => {
    const { promo, objectionInside, promoSave, setPromoSave, objectionDataPromo } = props;
    return (
        <div id="acordion-container" key={1}>
            <Accordion defaultActiveKey={0}>
                {promo?.map((data, index) => (
                    <Accordion.Item eventKey={index} className="acordion-item">
                        <Accordion.Header>{data.brandName}</Accordion.Header>
                        <Accordion.Body>
                            {objectionInside?.map((el, index) => (
                                <PromoRangeBar
                                    objectionRangeData={el}
                                    objectionRangeIndex={index}
                                    data={data}
                                    promoSave={promoSave}
                                    setPromoSave={setPromoSave}
                                    objectionDataPromo={objectionDataPromo?.filter(x => (el.id === x.objectionId && data.brandName === x.brandName))[0]}
                                />
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default ObjectionPromo;
