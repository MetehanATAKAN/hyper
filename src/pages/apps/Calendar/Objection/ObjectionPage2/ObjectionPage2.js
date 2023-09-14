import React, { useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';
import ObjectionHeader from '../ObjectionHeader';
import ObjectionNonPromo from './NonPromo/ObjectionNonPromo';
import ObjectionOther from './Other/ObjectionOther';
import ObjectionPromo from './Promo/ObjectionPromo';

const ObjectionPage2 = (props) => {
    const {
        activeTab,
        customer,
        setObjectionTitle,
        objectionInside,
        objectionPromo,
        objectionNonPromo,
        objectionOther,
        promoSave,
        setPromoSave,
        nonPromoSave,
        setNonPromoSave,
        otherSave,
        setOtherSave,
        objectionDataPromo,
        objectionDataNonPromo,
        objectionDataOther,
        setObjectionDataPromo,
        setObjectionDataNonPromo,
        setObjectionDataOther,
        eventId,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
        if (activeTab === 'Promo') {
            setObjectionTitle('OBJECTIONS PROMO');
        }
    }, [activeTab, setObjectionTitle]);
    // AFTER SAVE GET PRODUCTS
    useEffect(() => {
        if (objectionDataPromo.length !== 0) return;
        (async () => {
            try {
                const total = await objectionPromo.concat(objectionNonPromo, objectionOther);
                const data = await { brandIdList: total.map((data) => data.brandId), eventId: eventId };
                const response = await FetchApiPost('services/Daywork/EventDetail/GetObjectionByBrandId', 'POST', data);
                const json = await response.json();
                await json.data.objections.map(
                    (data) => (
                        data.isPromo === true &&
                            data.isAdditional === false &&
                            setObjectionDataPromo((prev) => [...prev, data]),
                        data.isPromo === false &&
                            data.isAdditional === false &&
                            setObjectionDataNonPromo((prev) => [...prev, data]),
                        data.isAdditional === true && setObjectionDataOther((prev) => [...prev, data])
                    )
                );
            } catch (error) {
                console.log(error);
            }
        })();
    }, [
        objectionDataPromo,
        objectionNonPromo,
        objectionOther,
        objectionPromo,
        setObjectionDataNonPromo,
        setObjectionDataOther,
        setObjectionDataPromo,
        eventId,
    ]);

    return (
        <>
            <ObjectionHeader customer={customer} />
            <Tabs
                defaultActiveKey="Promo"
                activeKey={activeTab}
                id="uncontrolled-tab-example"
                className="mb-3 comp-tabs"
                key={0}>
                <Tab eventKey="Promo" title={t('Promo')} disabled key={1}>
                    <ObjectionPromo
                        promo={objectionPromo}
                        objectionInside={objectionInside}
                        promoSave={promoSave}
                        setPromoSave={setPromoSave}
                        objectionDataPromo={objectionDataPromo}
                    />
                </Tab>
                <Tab eventKey="Non-Promo" title={t('Non-Promo')} disabled key={2}>
                    <ObjectionNonPromo
                        nonPromo={objectionNonPromo}
                        objectionInside={objectionInside}
                        nonPromoSave={nonPromoSave}
                        setNonPromoSave={setNonPromoSave}
                        objectionDataNonPromo={objectionDataNonPromo}
                    />
                </Tab>
                <Tab eventKey="Other" title={t('Other')} disabled key={3}>
                    <ObjectionOther
                        other={objectionOther}
                        objectionInside={objectionInside}
                        otherSave={otherSave}
                        setOtherSave={setOtherSave}
                        objectionDataOther={objectionDataOther}
                    />
                </Tab>
            </Tabs>
        </>
    );
};

export default React.memo(ObjectionPage2);
