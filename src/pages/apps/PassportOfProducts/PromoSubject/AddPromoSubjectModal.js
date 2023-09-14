import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FormInput } from '../../../../components';
import GlobalModal from '../../../../components/GlobalNew/Modal'
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useTranslation } from 'react-i18next';


const AddPromoSubjectModal = ({ showModal, setShowModal,applyFilter }) => {


    const history = useHistory();
    const { t } =useTranslation();

    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState();
    const [productLoading, setProductLoading] = useState(false);

    // Org Type
    const [orgType, setOrgType] = useState([
        {
            value:1,label:'clinic'
        },
        {
            value:2,label:'hospital'
        },
    ]);
    const [selectOrgType, setSelectOrgType] = useState([]);
    const [orgTypeLoading, setOrgTypeLoading] = useState(false);

    // Indication
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState();
    const [indicationLoading, setIndicationLoading] = useState(false);

    // Profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState();
    const [profileLoading, setProfileLoading] = useState(false);

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState();
    const [needLoading, setNeedLoading] = useState(false);

    // Benefit
    const [benefit, setBenefit] = useState([]);
    const [selectBenefit, setSelectBenefit] = useState([]);
    const [benefitLoading, setBenefitLoading] = useState(false);

    // Promo Subject Name
    const [promoSubjectName, setPromoSubjectName] = useState('');
    
    const toggle = () => {
        setShowModal(false);
    }

    const addPromoSubject = () => {

        const body = {
            promoSubjectName: promoSubjectName,
            brandId: selectProduct.value,
            brandName: selectProduct.label,
            organizationType: selectOrgType.map(data => data.value),
            profileId: selectProfile.value,
            profileName: selectProfile.label,
            indicationId: selectIndication.value,
            indicationName: selectIndication.label,
            needId: selectNeed.value,
            benefitIds: selectBenefit.map(data => data.value),
            createdBy: localStorage.getItem('userName')
        }

        FetchApiPost('services/Pages/PromoSubject/CreatePromoSubject ','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 201) {
                                applyFilter();
                              setShowModal(false);
                        }
                        else if (res.status === 409) {
                            history.push('/error-500');
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }
    
    useEffect(() => {

        setProductLoading(true);

        FetchApiGet('services/Pages/Page/GetGlobalBrandList ', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setProductLoading(false);
                            res.json().then(item => {
                                return (
                                    setProduct(item?.data?.map(data => (
                                        {
                                            value: data.globalBrandId,
                                            label: data.globalBrandName,
                                            globalBrandAbb: data.globalBrandAbb
                                        }
                                    )))
                                )
                            })
                        }
                        else if (res.status === 409) {
                            history.push('/error-500');
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [history])


    // Indication
    useEffect(() => {

        if (selectProduct) {
            setIndicationLoading(true);
            FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectIndicationByBrandId?brandId=${selectProduct.value} `, 'GET')
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setIndicationLoading(false);
                                res.json().then(item => {
                                    setIndication(item.data.map(data => (
                                        {
                                            value: data.indicationId,
                                            label: data.indication
                                        }
                                    )))
                                })
                            }
                            else if (res.status === 409) {
                                history.push('/error-500');
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else {
                                console.log('hata');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }

    }, [history, selectProduct])

    // Profile
    useEffect(() => {
      
        if(selectProduct && selectIndication) {

            setProfileLoading(true);
            const body = {
                ProductId : selectProduct.value,
                IndicationId : selectIndication.value
            }
            FetchApiPost('services/Pages/PromoSubject/GetPromoSubjectProfiles','POST',body)
            .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setProfileLoading(false);
                                res.json().then(item => {
                                    setProfile(item?.data.map(data => (
                                        {
                                            value:data.profileId,
                                            label:data.profile
                                        }
                                    )))
                                })
                            }
                            else if (res.status === 409) {
                                history.push('/error-500');
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else {
                                console.log('hata');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }, [history, selectIndication, selectProduct])

    // Need
    useEffect(() => {
      
        if(selectProduct && selectIndication && selectProfile) {

            setNeedLoading(true);
            const body = {
                ProductId : selectProduct.value,
                IndicationId : selectIndication.value,
                ProfileId:  selectProfile.value
            }
            FetchApiPost('services/Pages/PromoSubject/GetPromoSubjectNeeds ','POST',body)
            .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setNeedLoading(false);
                                res.json().then(item => {
                                   setNeed(item.data.map(data => (
                                    {
                                        value:data.needId,
                                        label:data.needName
                                    }
                                   )))
                                })
                            }
                            else if (res.status === 409) {
                                history.push('/error-500');
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else {
                                console.log('hata');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }, [history, selectIndication, selectProduct, selectProfile])
    

    // Benefit
    useEffect(() => {
      
        if(selectProduct && selectIndication && selectProfile && selectNeed) {

            setBenefitLoading(true);
            const body = {
                ProductId : selectProduct.value,
                IndicationId : selectIndication.value,
                ProfileId:  selectProfile.value,
                NeedId: selectNeed.value
            }
            FetchApiPost('services/Pages/PromoSubject/GetPromoSubjectBenefits','POST',body)
            .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setBenefitLoading(false);
                                res.json().then(item => {
                                   setBenefit(item.data.map(data =>(
                                    {
                                        value:data.benefitId,
                                        label:data.benefitName
                                    }
                                   )))
                                })
                            }
                            else if (res.status === 409) {
                                history.push('/error-500');
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else {
                                console.log('hata');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }, [history, selectIndication, selectNeed, selectProduct, selectProfile])


    // Selects reset
    useEffect(() => {
      setSelectIndication();
      setSelectProfile();
      setSelectNeed();
      setSelectBenefit();
    }, [selectProduct])

    useEffect(() => {
        setSelectProfile();
        setSelectNeed();
        setSelectBenefit();
      }, [selectIndication])

      useEffect(() => {
        setSelectNeed();
        setSelectBenefit();
      }, [selectProfile])

      useEffect(() => {
        setSelectBenefit();
      }, [selectNeed])
    

    return (
        <div>
            <GlobalModal
                header={t('Add Promo Subject')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={toggle}
                body={
                    <>
                        <Row>
                            <Col>
                                <SingleSelects
                                    selectedItems={selectProduct}
                                    setSelectedItems={setSelectProduct}
                                    options={product}
                                    label='product'
                                    placeholder='Select...'
                                    isStar={true}
                                    width={'100%'}
                                    labelStyle={{ color: '#6c757d' }}
                                />
                            </Col>

                            <Col>
                                <MultipleSelects
                                    selectedItems={selectOrgType}
                                    setSelectedItems={setSelectOrgType}
                                    options={orgType}
                                    label='organization type'
                                    placeholder='Select...'
                                    isStar={true}
                                    width={'100%'}
                                    labelStyle={{ color: '#6c757d' }}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <SingleSelects
                                selectedItems={selectIndication}
                                setSelectedItems={setSelectIndication}
                                options={indication}
                                label='indication'
                                placeholder='Select...'
                                isStar={true}
                                width={'100%'}
                                labelStyle={{ color: '#6c757d' }}
                            />
                        </Row>
                        <Row>
                            <SingleSelects
                                selectedItems={selectProfile}
                                setSelectedItems={setSelectProfile}
                                options={profile}
                                label='profile'
                                placeholder='Select...'
                                isStar={true}
                                width={'100%'}
                                labelStyle={{ color: '#6c757d' }}
                            />
                        </Row>
                        <Row>
                            <SingleSelects
                                selectedItems={selectNeed}
                                setSelectedItems={setSelectNeed}
                                options={need}
                                label='need'
                                placeholder='Select...'
                                isStar={true}
                                width={'100%'}
                                labelStyle={{ color: '#6c757d' }}
                            />
                        </Row>
                        <Row>
                            <MultipleSelects
                                selectedItems={selectBenefit}
                                setSelectedItems={setSelectBenefit}
                                options={benefit}
                                label='benefits'
                                placeholder='Select...'
                                isStar={true}
                                width={'100%'}
                                labelStyle={{ color: '#6c757d' }}
                            />
                        </Row>
                        <Row>
                            <FormInput
                                label={<div className='d-flex justify-content-between' >
                                    <span>{t('promo subject name')}</span>
                                    <span style={{ color: 'red' }} >*</span>
                                </div>}
                                type="textarea"
                                name="textarea"
                                rows="5"
                                containerClass={'mb-3'}
                                key="textarea"
                                onChange={(e)=>setPromoSubjectName(e.target.value)}
                            />
                        </Row>
                    </>
                }
                footer={
                    <>
                        <Button
                            className='btn-light'
                            style={{ backgroundColor: '#EBEBEB' }}
                            onClick={() => setShowModal(false)}
                        >
                            {t('cancel')}
                        </Button>
                        <Button 
                        variant="primary"
                        disabled={
                            selectProduct && selectOrgType && selectIndication && selectProfile && selectNeed && selectBenefit 
                            ?   false
                            :   true
                        }
                        onClick={addPromoSubject}
                        >
                            {t('add')}
                        </Button></>
                }
            />

            <Loading loading={productLoading} />
            <Loading loading={indicationLoading} />
            <Loading loading={profileLoading} />
            <Loading loading={needLoading} />
            <Loading loading={benefitLoading} />
        </div>
    )
}

export default AddPromoSubjectModal