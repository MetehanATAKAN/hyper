import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FormInput } from '../../../../components';
import Loading from '../../../../components/Loading';


const Edit = ({ showModal, setShowModal, data, isApplyFilter }) => {


    console.log(data);
    const history = useHistory();
    const { t } =useTranslation();

    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState(
        {
            value:data?.brandId,
            label:data?.brandName
        }
    );
    const [productLoading, setProductLoading] = useState(false);

    // Org Type
    const [orgType, setOrgType] = useState([
        {
            value:1,label:'POLYCLINIC'
        },
        {
            value:2,label:'HOSPITAL'
        },
    ]);
    const [selectOrgType, setSelectOrgType] = useState(
        data?.organizationType?.map(data =>(
            data === 1 ?{
                value:1,label:'POLYCLINIC'
            }:{
                value:2,label:'HOSPITAL'
            }
        ))
    );

    console.log(selectOrgType);
    const [orgTypeLoading, setOrgTypeLoading] = useState(false);

    // Indication
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState(
        {
            value:data?.indicationId,
            label:data?.indicationName
        }
    );
    const [indicationLoading, setIndicationLoading] = useState(false);
        
    // Profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState(
        {
            value:data?.profileId,
            label:data?.profileName
        }
    );
    const [profileLoading, setProfileLoading] = useState(false);

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState(
        {
            value:data?.needResponses?.needId,
            label:data?.needResponses?.needName
        }
    );
    const [needLoading, setNeedLoading] = useState(false);

    // Benefit
    const [benefit, setBenefit] = useState([]);
    const [selectBenefit, setSelectBenefit] = useState(
        data?.benefit?.map(data =>(
            {
                value:data.id,
                label:data.benefitName
            }
        ))
    );
    const [benefitLoading, setBenefitLoading] = useState(false);

    // Promo Subject Name
    const [promoSubjectName, setPromoSubjectName] = useState(
        data?.promoSubjectName
    );
    
    const toggle = () => {
        setShowModal(false);
    }
    

    const addPromoSubject = () => {

        const body = {
            id:data.id,
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
            modifiedBy: localStorage.getItem('userName'),
            archiveStatus:false
        }

        FetchApiPost('services/Pages/PromoSubject/UpdatePromoSubject','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            isApplyFilter();
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

const selectReset = (value,label,name) => {
    console.log('mete');
    console.log(value,label,name);
    switch (name) {
        case 'product':
           return (
            setSelectIndication(),
            setSelectProfile(),
            setSelectNeed(),
            setSelectBenefit()
           )
           case 'indication':
           return (
            setSelectProfile(),
            setSelectNeed(),
            setSelectBenefit()
           )
           case 'profile':
           return (
            setSelectNeed(),
            setSelectBenefit()
           )
           case 'need':
           return (
            setSelectBenefit()
           )
    
        default:
            break;
    }
}
    // Selects reset
    // useEffect(() => {
    //   setSelectIndication();
    //   setSelectProfile();
    //   setSelectNeed();
    //   setSelectBenefit();
    // }, [selectProduct])

    // useEffect(() => {
    //     setSelectProfile();
    //     setSelectNeed();
    //     setSelectBenefit();
    //   }, [selectIndication])

    //   useEffect(() => {
    //     setSelectNeed();
    //     setSelectBenefit();
    //   }, [selectProfile])

    //   useEffect(() => {
    //     setSelectBenefit();
    //   }, [selectNeed])
    

    return (
        <div>
            <GlobalModal 
                header={t('Update Promo Subject')}
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
                                    handleChange={selectReset}
                                    headerName='product'
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
                                handleChange={selectReset}
                                headerName='indication'
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
                                handleChange={selectReset}
                                headerName='profile'
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
                                handleChange={selectReset}
                                headerName='need'
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
                                defaultValue={promoSubjectName}
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
                        variant="warning"
                        disabled={
                            selectProduct && selectOrgType && selectIndication && selectProfile && selectNeed && selectBenefit 
                            ?   false
                            :   true
                        }
                        onClick={addPromoSubject}
                        >
                            {t('update')}
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

export default Edit