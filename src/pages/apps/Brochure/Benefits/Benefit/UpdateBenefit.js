import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FormInput } from '../../../../../components';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { useSelector } from 'react-redux';

const UpdateBenefit = ({ isShowUpdateModal, setIsShowUpdateModal, updateBenefitData, tableData, setTableData }) => {

    const history = useHistory();
    const { t } = useTranslation();
   

    const filterData = useSelector( state => state.Need.filterFunct);

    const toggle = () => {
        setIsShowUpdateModal(false);
    }

    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState({
        value: updateBenefitData.productId,
        label: updateBenefitData.productName
    });

    // Indication
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState(updateBenefitData?.indications.length !== 0 ? updateBenefitData.indications.map(data => (
        {
            value: data.indicationId,
            label: data.indication
        }
    ))
        : []);

    // Profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState(updateBenefitData?.profiles.length !== 0 ? updateBenefitData.profiles.map(data => (
        {
            value: data.profileId,
            label: data.profile
        }
    ))
        : []);

    //Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState(
        updateBenefitData?.needs.length !== 0 ? updateBenefitData.needs.map(data => (
            {
                value: data.needId,
                label: data.needName
            }
        ))
            : []
    );

    // Specialization
    const [specialization, setSpecialization] = useState([]);
    const [selectSpecialization, setselectSpecialization] = useState(
        updateBenefitData.specializations.map(data => (
            {
                value: data.specId,
                label: data.specName,
                specAbb: data.specAbb
            }
        ))
    );

    // Need Name
    const [needName, setNeedName] = useState(updateBenefitData.benefitName);

    const [content, setContent] = useState(updateBenefitData.content);
    
    const changeSelect = (value, label, name) => {
        console.log(name);
        switch (name) {
            case 'product':
                return (
                    setIndication([]),
                    setSelectIndication([]),

                    setProfile([]),
                    setSelectProfile([]),

                    setSpecialization([]),
                    setselectSpecialization([]),

                    setNeed([]),
                    setSelectNeed([])
                )
            case 'indication':
                return (
                    setProfile([]),
                    setSelectProfile([]),

                    setSpecialization([]),
                    setselectSpecialization([]),

                    setNeed([]),
                    setSelectNeed([])
                )
            case 'profile':
                return (
                    setSpecialization([]),
                    setselectSpecialization([]),

                    setNeed([]),
                    setSelectNeed([])
                )
            case 'specialization':
                return (
                    setNeed([]),
                    setSelectNeed([])
                )
            default:
                break;
        }
    }

    const benefitFilter = () => {

        const benefitBody = filterData;

        FetchApiPost('services/Pages/Benefit/ApplyForBenefitFilter','POST',benefitBody)
        .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setTableData(data.data)
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
    }

    const updateBenefit = async () => {
        const updateBody = {
            id: updateBenefitData?.id,
            productId: selectProduct.value,
            productName: selectProduct.label,
            indicationIds: selectIndication?.map(data => data.value),
            profileIds: selectProfile?.map(data => data.value),
            specIds: selectSpecialization?.map(data => data.value),
            needIds: selectNeed?.map(data => data.value),
            benefitName: needName.charAt(0).toUpperCase() + needName.slice(1).toLowerCase(),
            modifiedBy: localStorage.getItem('userName'),
            content: content.charAt(0).toUpperCase() + content.slice(1).toLowerCase()
        }

        FetchApiPost('services/Pages/Benefit/UpdateBenefit', 'POST', updateBody)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 201) {
                            await benefitFilter();
                            await setIsShowUpdateModal(false);
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

    // Product
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllGlobalBrands', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(data => {
                                return (
                                    setProduct(data.map(item => (
                                        {
                                            value: item.GlobalBrandId,
                                            label: item.GlobalBrandName,
                                            globalBrandAbb: item.GlobalBrandAbb
                                        }
                                    )))
                                )
                            })

                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
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
            const indicationBody = {
                brandIds: String(selectProduct.value)
            }
            FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST', indicationBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (
                                        setIndication(data.map(item => (
                                            {
                                                value: item.IndicationId,
                                                label: item.Indication
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
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
        if (selectProduct && selectIndication.length !== 0) {
            const profileBody = {
                brandIds: String(selectProduct.value),
                indicationIds: String(selectIndication?.map(data => data.value))
            }
            FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST', profileBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (
                                        setProfile(data.map(item => (
                                            {
                                                value: item.ProfileId,
                                                label: item.Profile
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }, [history, selectIndication, selectProduct])


    // Spec
    useEffect(() => {
        if (selectProduct && selectIndication.length !== 0 && selectProfile.length !== 0) {
            const specBody = {
                brandIds: String(selectProduct.value),
                indicationIds: String(selectIndication?.map(data => data.value)),
                profileIds: String(selectProfile?.map(data => data.value)),
            }
            FetchApiPost('api/OldSystem/GetSpecsForContent', 'POST', specBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (
                                        setSpecialization(data.map(item => (
                                            {
                                                value: item.SpecId,
                                                label: item.SpecName,
                                                specAbb: item.SpecAbb
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }, [history, selectIndication, selectProduct, selectProfile])

    // Need
    useEffect(() => {
        if (selectProduct && selectIndication.length !== 0 && selectProfile.length !== 0 && selectSpecialization.length !== 0) {
            const specBody = {
                productIds: [selectProduct?.value],
                indicationIds: selectIndication?.map(data => data.value),
                profileIds: selectProfile?.map(data => data.value),
                specIds: selectSpecialization?.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetNeedsByContentCreationDatas', 'POST', specBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setNeed(data.data.map(data => (
                                        {
                                            value: data.needId,
                                            label: data.needName
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }, [history, selectIndication, selectProduct, selectProfile, selectSpecialization])


    return (
        <>

            <Modal show={isShowUpdateModal} onHide={toggle} size={'md'} >
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }} >
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                        {t('Update Benefit')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3' >
                    <SingleSelects
                            options={product}
                            selectedItems={selectProduct}
                            setSelectedItems={setSelectProduct}
                            isStar={true}
                            label={'product'}
                            placeholder={'Select'}
                            headerName={'product'}
                            width={'100%'}
                            handleChange={changeSelect}
                            disabled={true}
                        />

                        <MultipleSelects
                            options={indication}
                            selectedItems={selectIndication}
                            setSelectedItems={setSelectIndication}
                            isStar={true}
                            label={'indication'}
                            placeholder={'Select'}
                            headerName={'indication'}
                            width={'100%'}
                            handleChange={changeSelect}
                            allSelect={()=>changeSelect(selectIndication,selectIndication,'indication')}
                            allClear={()=>changeSelect(selectIndication,selectIndication,'indication')}
                        />

                        <MultipleSelects
                            options={profile}
                            selectedItems={selectProfile}
                            setSelectedItems={setSelectProfile}
                            isStar={true}
                            label={'profile'}
                            placeholder={'Select'}
                            headerName={'profile'}
                            width={'100%'}
                            handleChange={changeSelect}
                            allSelect={()=>changeSelect(selectProfile,selectProfile,'profile')}
                            allClear={()=>changeSelect(selectProfile,selectProfile,'profile')}
                        />

                        <MultipleSelects
                            options={specialization}
                            selectedItems={selectSpecialization}
                            setSelectedItems={setselectSpecialization}
                            isStar={true}
                            label={'specialization'}
                            placeholder={'Select'}
                            headerName={'specialization'}
                            width={'100%'}
                            handleChange={changeSelect}
                            allSelect={()=>changeSelect(selectSpecialization,selectSpecialization,'specialization')}
                            allClear={()=>changeSelect(selectSpecialization,selectSpecialization,'specialization')}
                        />

                        <MultipleSelects
                            options={need}
                            selectedItems={selectNeed}
                            setSelectedItems={setSelectNeed}
                            isStar={true}
                            label={'need'}
                            placeholder={'Select'}
                            headerName={'need'}
                            width={'100%'}
                            handleChange={changeSelect}
                            allSelect={()=>changeSelect(selectNeed,selectNeed,'need')}
                            allClear={()=>changeSelect(selectNeed,selectNeed,'need')}
                        />

                        <div className='d-flex justify-content-between'>
                            <label className='label-text-field'> {t('benefit name')} </label>
                            <span style={{ color: 'red' }}>*</span>
                        </div>
                        <FormInput
                            type="textarea"
                            rows="1"
                            onChange={(e) => setNeedName(e.target.value)}
                            className={'new-textarea'}
                            defaultValue={needName}
                        />

                        <div className='d-flex justify-content-between'>
                            <label className='label-text-field'> {t('content')} </label>
                            <span style={{ color: 'red' }}>*</span>
                        </div>
                        <FormInput
                            type="textarea"
                            rows="1"
                            onChange={(e) => setContent(e.target.value)}
                            className={'new-textarea'}
                            defaultValue={content}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }} >
                    <Button
                        className='btn-light'
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={toggle}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className='btn-warning'
                        disabled={
                                selectProduct !== '' &&
                                selectProfile !== '' &&
                                selectIndication !== '' &&
                                selectSpecialization.length !== 0 &&
                                selectNeed.length !== 0 &&
                                needName !== '' &&
                                content !== ''
                                ? false
                                : true
                        }
                        onClick={updateBenefit}
                    >
                        {t('update')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateBenefit