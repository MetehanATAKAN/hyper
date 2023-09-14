import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../../../../components/GlobalNew/Modal';
import { MultipleSelects, SingleSelects } from '../../../../../../../components/GlobalNew/Selects';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const AddPromoSubject = ({ showModal, setShowModal, profile, setPage4TableData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const { profileId, typeId } = profile;
    const [selectNeed, setSelectNeed] = useState();
    const [selectBenefit, setSelectBenefit] = useState([]);
    const [selectPromoSubject, setSelectPromoSubject] = useState();
    const [optionsNeed, setOptionsNeed] = useState([]);
    const [optionsBenefit, setOptionsBenefit] = useState([]);
    const [optionsPromoSubject, setOptionsPromoSubject] = useState([]);

    useEffect(() => {
        const body = {
            profileId: Number(profileId),
            type: typeId,
        };
        FetchApiPost('services/Pages/PromoStrategy/GetPromoStrategyNeed', 'POST', body).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    if (data.length === 0) return;
                    if (data.length === 1) {
                        setSelectNeed({ value: data[0].needId, label: data[0].needName });
                        setOptionsNeed([{ value: data[0].needId, label: data[0].needName }]);
                        return;
                    }
                    const needs = data?.map((x) => ({ value: x.needId, label: x.needName }));
                    setOptionsNeed(needs);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, profileId, typeId]);

    useEffect(() => {
        if (!selectNeed) return;
        const body = {
            profileId: Number(profileId),
            type: typeId,
            needId: selectNeed.value,
        };
        FetchApiPost('services/Pages/PromoStrategy/GetPromoStrategyBenefit', 'POST', body).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    if (data.length === 1) {
                        setOptionsBenefit([{ value: data[0].benefitId, label: data[0].benefitName }]);
                        setSelectBenefit([{ value: data[0].benefitId, label: data[0].benefitName }]);
                        return;
                    }
                    const benefits = data?.map((x) => ({ value: x.benefitId, label: x.benefitName }));
                    setOptionsBenefit(benefits);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, profileId, typeId, selectNeed]);

    useEffect(() => {
        if (!selectNeed) return;
        if (selectBenefit.length === 0) return;
        const body = {
            profileId: Number(profileId),
            type: typeId,
            needId: selectNeed.value,
            benefitIds: selectBenefit.map((x) => x.value),
        };
        FetchApiPost('services/Pages/PromoStrategy/GetPromoSubjectsByNeedIdsandBenefitIds', 'POST', body).then(
            (res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then(({ data }) => {
                        if (data.length === 1) {
                            setOptionsPromoSubject([
                                {
                                    value: data[0].promoSubjectId,
                                    label: data[0].promoSubjectName,
                                    pageDetails: data[0].pageDetails,
                                },
                            ]);
                            setSelectPromoSubject({ value: data[0].promoSubjectId, label: data[0].promoSubjectName });
                            return;
                        }
                        const pSubject = data?.map((x) => ({
                            value: x.promoSubjectId,
                            label: x.promoSubjectName,
                            pageDetails: x.pageDetails,
                        }));
                        setOptionsPromoSubject(pSubject);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            }
        );
    }, [history, profileId, typeId, selectNeed, selectBenefit]);
    const handleSelectPromoSubject = () => {
        if (!selectPromoSubject) return;
        const findPageByPromoSubject = optionsPromoSubject.find((x) => x.value === selectPromoSubject.value);
        setPage4TableData((prevItems) =>
            prevItems.map((item) => {
                if (item.no === profile.no) {
                    return {
                        ...item,
                        need: selectNeed.label,
                        needId: selectNeed.value,
                        benefit: selectBenefit.map((x) => x.label),
                        benefitId: selectBenefit.map((x) => x.value),
                        promoSubject: selectPromoSubject.label,
                        promoSubjectId: selectPromoSubject.value,
                        pageDetail: findPageByPromoSubject.pageDetails,
                    };
                }
                return item;
            })
        );
        setShowModal(false);
    };
    return (
        <GlobalModal
            header={t('Select Promo Subject')}
            showModal={showModal}
            setShowModal={setShowModal}
            toggle={() => setShowModal(!showModal)}
            body={
                <div>
                    <SingleSelects
                        label="need"
                        selectedItems={selectNeed}
                        setSelectedItems={setSelectNeed}
                        options={optionsNeed}
                        width="100%"
                    />
                    <MultipleSelects
                        label="benefit"
                        selectedItems={selectBenefit}
                        setSelectedItems={setSelectBenefit}
                        options={optionsBenefit}
                        width="100%"
                    />
                    <SingleSelects
                        label="promo subject"
                        selectedItems={selectPromoSubject}
                        setSelectedItems={setSelectPromoSubject}
                        options={optionsPromoSubject}
                        width="100%"
                    />
                </div>
            }
            footer={
                <>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleSelectPromoSubject} variant="primary">
                        {t('select')}
                    </Button>
                </>
            }
        />
    );
};

export default AddPromoSubject;
