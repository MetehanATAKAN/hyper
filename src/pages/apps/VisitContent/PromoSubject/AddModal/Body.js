import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import '../../../../../assets/scss/custom/visitContent/promoSubject.scss';
import FailModal from '../../../../../components/FailModal';

const Body = ({ setShowAddModal, setAddButtonDisableStatus, isClickAdd, setIsClickAdd, getFilterData }) => {
    const { RangePicker } = DatePicker;

    const history = useHistory();
    const { t } = useTranslation();

    const [workPlaceHeader, setWorkPlaceHeader] = useState();

    const [clientTypeName, setClientTypeName] = useState();

    const [place, setPlace] = useState();
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [typeOfPriorityOptions, setTypeOfPriorityOptions] = useState([]);

    const [clientType, setClientType] = useState([]);
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [brandOptions, setBrandOptions] = useState([]);
    const [brand, setBrand] = useState();

    const [indicationOptions, setIndicationOptions] = useState([]);
    const [indication, setIndication] = useState();

    const [profileOptions, setProfileOptions] = useState([]);
    const [profile, setProfile] = useState();

    const [needOptions, setNeedOptions] = useState([]);
    const [need, setNeed] = useState();

    const [benefitOptions, setBenefitOptions] = useState([]);
    const [benefit, setBenefit] = useState([]);

    const [specializationOptions, setSpecializationOptions] = useState([]);
    const [specialization, setSpecialization] = useState([]);

    const [typeOptions, setTypeOptions] = useState([
        { value: 0, label: t('Child') },
        { value: 1, label: t('Parent') },
    ]);
    const [type, setType] = useState();

    const [promoSubjectName, setPromoSubjectName] = useState('');

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [message, setMessage] = useState('');
    const [failModal, setFailModal] = useState(false);




    const disabledDate = (current) => {
        // Can not select days before today
        return current && current < moment().startOf('day');
    };

    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(moment(start).format());
            setEndDate(moment(end).format());
        } else {
            setStartDate([]);
            setEndDate([]);
        }
    };

    const [companyId, setCompanyId] = useState();
    useEffect(() => {
        let empId = localStorage.getItem('userEmpId');
        FetchApiGet(`api/OldSystem/GetCompanies/{empId}?empId=${empId}`, 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                    if (data.length === 1) {
                        setCompanyId(data[0].CompanyId)
                    } else if (data.length > 1 && data.find((item) => item.CompanyId === 238)) {
                        setCompanyId(238)
                    } else {
                        setCompanyId(data[0].CompanyId)
                    }
                    })
                }
            })
    }, [])

    useEffect(() => {
        if(!companyId) return;
        let countryId = localStorage.getItem('countryId');
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', {
            headerIds: [0],
            countryId: countryId,
            companyId: companyId
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    let arr = { pl: {}, pt: {}, tp: {} };
                    data.map((item, index) => {
                        if (item.abbrevation === 'PL') {
                            arr.pl = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PT') {
                            arr.pt = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PRT') {
                            arr.tp = item;
                        }
                    });
                    setWorkPlaceHeader(arr);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setWorkPlaceHeader();
            }
        });
    }, [history, companyId]);


        // work place optionları çekmke için
    useEffect(() => {
        if (workPlaceHeader) {
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pl.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        if (data.length === 1) {
                            setPlace({ label: data[0].definationName, value: data[0].definationId });
                        }
                    });
                }
            });

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pt.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPlaceTypeOptions(
                            data.map((item) => ({ label: item.definationName, value: item.definationId }))
                        );
                        if (data.length === 1) {
                            setPlaceType([{ label: data[0].definationName, value: data[0].definationId }]);
                        }
                    });
                }
            });

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.tp.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setTypeOfPriorityOptions(
                            data.map((item) => ({ label: item.definationName, value: item.definationId }))
                        );
                        if (data.length === 1) {
                            setTypeOfPriority([{ label: data[0].definationName, value: data[0].definationId }]);
                        }
                    });
                }
            });
        } else {
            setPlace();
            setPlaceOptions([]);
            setPlaceType([]);
            setPlaceTypeOptions([]);
            setTypeOfPriority([]);
            setTypeOfPriorityOptions([]);
        }
    }, [workPlaceHeader]);


    useEffect(() => {
        if(!companyId) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyId
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setClientTypeName(data)
                    })
                }else{
                    setClientTypeName()
                }
            })
    }, [companyId])

           // client type optionları
    useEffect(() => {
        if (!clientTypeName) return;
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
            countryId: Number(localStorage.getItem('countryId')),
            id: clientTypeName[0].id,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setClientTypeOptions(
                        data.map((item) => ({ value: item.definationId, label: item.definationName }))
                    );
                    if (data.length === 1) {
                        setClientType([{ value: data[0].definationId, label: data[0].definationName }]);
                    }
                });
            }
        });
    }, [history, clientTypeName]);

    useEffect(() => {
        if (!place || placeType.length === 0 || typeOfPriority.length === 0) return;
        FetchApiPost('services/Pages/Need/GetBrandsForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.length > 0 ? clientType.map(i => i.value) : [0],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setBrandOptions(
                        data.map((item) => ({ value: item.globalBrandId, label: item.globalBrandName }))
                    );
                    if (data.length === 1) {
                        setBrand({ value: data[0].globalBrandId, label: data[0].globalBrandName });
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, place, placeType, typeOfPriority, clientType]);

    useEffect(() => {
        if (!place || placeType.length === 0 || typeOfPriority.length === 0 || !brand) return;
        FetchApiPost('services/Pages/Need/GetIndicationsForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.length > 0 ? clientType.map(i => i.value) : [0],
            brandIds: [brand.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setIndicationOptions(
                        data.map((item) => ({ label: item.indicationName, value: item.indicationId }))
                    );
                    if (data.length === 1) {
                        setIndication({ value: data[0].indicationId, label: data[0].indicationName });
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, brand]);

    useEffect(() => {
        if (!place || placeType.length === 0 || typeOfPriority.length === 0 || !brand || !indication) return;
        FetchApiPost('services/Pages/Need/GetProfileForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.length > 0 ? clientType.map(i => i.value) : [0],
            brandIds: [brand.value],
            indicationIds: [indication.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setProfileOptions(data.map((item) => ({ label: item.profileName, value: item.profileId })));
                    if (data.length === 1) {
                        setProfile({ value: data[0].profileId, label: data[0].profileName });
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, indication]);

    useEffect(() => {
        if (!place || placeType.length === 0 || typeOfPriority.length === 0 || !brand || !indication || !profile || clientType.length === 0) return;
        FetchApiPost('services/Pages/Need/GetSpecForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.length > 0 ? clientType.map(i => i.value) : [0],
            brandIds: [brand.value],
            indicationIds: [indication.value],
            profileIds: [profile.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setSpecializationOptions(data.map((item) => ({ label: item.specName, value: item.specId })));
                    if (data.length === 1) {
                        setSpecialization([{ value: data[0].specId, label: data[0].specName }]);
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, profile, clientType]);
    
    useEffect(() => {
        if(!place || placeType.length === 0 || typeOfPriority.length === 0 || !profile) return;
        FetchApiPost('services/Pages/Need/GetNeedsForBenefitFilter', 'POST', {
            SpecIds: specialization.length > 0 ? specialization.map(i => i.value) : [0],
                IndicationIds: [indication.value],
                ProfileIds: [profile.value],
                PlaceIds: [place.value],
                PlaceTypeIds: placeType.map(i => i.value),
                TypeOfPriorityIds: typeOfPriority.map(i => i.value),
                ClientTypeIds: clientType.length > 0 ? clientType.map(i => i.value) : [0],
                BrandIds: [brand.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({data}) => {
                    setNeedOptions(data.map(item => {
                        return {
                            value: item.id,
                            label: item.needName
                        }
                    }))
                    if(data.length === 1){
                        setNeed({ value: data[0].id, label: data[0].needName })
                    }
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500');
            }
        })
    
}, [history, place, placeType, clientType, profile])

useEffect(() => {
    if(!indication || !profile || !place || placeType.length === 0 || typeOfPriority.length === 0 || !need ){
        setBenefit([]);
        setBenefitOptions([]);
        return;
    } 
    FetchApiPost('services/Pages/Benefit/GetBenefitForPromoSubject', 'POST', {
        SpecIds: [],
        IndicationIds: [indication.value],
        ProfileIds: [profile.value],
        PlaceIds: [place.value],
        PlaceTypeIds: placeType.map(i => i.value),
        TypeOfPriorityIds: typeOfPriority.map(i => i.value),
        ClientTypeIds: clientType.length > 0 ? clientType.map(i => i.value) : [0],
        BrandIds: [brand.value],
        NeedIds: [need.value]
    }).then(res => {
        if(res.status === 200){
            res.json().then(({ data }) => {
                setBenefitOptions(data.map(i => ({ label: i.benefitName, value: i.id })))
                if(data.length === 1){
                    setBenefit([{ label: data[0].benefitName, value: data[0].id }])
                }
            })
        }
    })
}, [profile, need])

useEffect(() => {
    if (
        startDate &&
        endDate &&
        startDate.length > 0 && endDate.length > 0 &&
        type &&
        place &&
        placeType.length > 0 &&
        typeOfPriority.length > 0 &&
        brand &&
        indication &&
        profile &&
        need &&
        benefit.length > 0 &&
        promoSubjectName.trim().length > 0
    ) {
        if (clientType.length > 0) {
            if (specialization.length > 0) {
                setAddButtonDisableStatus(false);
            } else {
                setAddButtonDisableStatus(true);
            }
        } else {
            setAddButtonDisableStatus(false);
        }
    } else {
        setAddButtonDisableStatus(true);
    }
}, [
    startDate,
    endDate,
    brand,
    type,
    indication,
    profile,
    specialization,
    need,
    benefit,
    place,
    placeType,
    typeOfPriority,
    clientType,
    promoSubjectName
]);

    useEffect(() => {
        if(isClickAdd){
            const words = promoSubjectName.trim().split(" ");

            let newPromoName = words.map((word) => { 
                return word[0].toUpperCase() + word.substring(1); 
            }).join(" ")
            
            FetchApiPost('services/Pages/PromoSubject/CreatePromoSubject', 'POST', {
                name: newPromoName.trim(),
                organizationTypeIds: [0],
                profileId: profile.value,
                needId: need.value,
                specIds: specialization.length > 0 ? specialization.map((spec) => spec.value) : [0],
                benefitIds: benefit.map((benefit) => benefit.value),
                type: type.value,
                createdBy: localStorage.getItem('userName'),
                startDate: startDate,
                endDate: endDate,
                languageId: 42,
                placeId: place.value,
                placeTypeIds: placeType.map(i => i.value),
                typeOfPriorityIds: typeOfPriority.map(i => i.value),
                clientTypeIds: clientType.map(i => i.value)
            }).then(res => {
                if(res.status === 201){
                    // filtreye getAll istek atılacak
                    setShowAddModal(false);
                    getFilterData();
                }else if(res.status === 409){
                    setMessage('Promo subject name already exist')
                    setFailModal(true);
                    setIsClickAdd(false)
                }else{
                    history.push('/error-500');
                }
            })
        }
    }, [isClickAdd])

    const handleChangeSelect = (name) => {
        switch (name) {
            case 'place':
                setBrand();
                setBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                setNeed();
                setNeedOptions([]);
                setBenefitOptions([])
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'place type':
                setBrand();
                setBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                setNeed();
                setNeedOptions([]);
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'priority':
                setBrand();
                setBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                setNeed();
                setNeedOptions([]);
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'client':
                setBrand();
                setBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                setNeed();
                setNeedOptions([]);
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'brand':
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                setNeed();
                setNeedOptions([]);
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'indication':
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                setNeed();
                setNeedOptions([]);
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'profile':
                setSpecialization([]);
                setSpecializationOptions([]);
                setNeed();
                setNeedOptions([]);
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'need':
                setBenefit([])
                setBenefitOptions([])
                break;
            case 'specialization':
                // setNeed();
                // setNeedOptions([]);
                // setBenefit([])
                // setBenefitOptions([])
                break;
            default:
                break;
        }
    };

    return (
        <div className="promo-subject-add-modal">
            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <SingleSelects
                    label={workPlaceHeader?.pl ? workPlaceHeader?.pl?.headerName : 'place'}
                    width={'217px'}
                    options={placeOptions}
                    selectedItems={place}
                    setSelectedItems={setPlace}
                    isStar={true}
                    handleChange={() => handleChangeSelect('place')}
                />
                <MultipleSelects
                    label={workPlaceHeader?.pt ? workPlaceHeader?.pt?.headerName : 'place type'}
                    width={'217px'}
                    options={placeTypeOptions}
                    selectedItems={placeType}
                    setSelectedItems={setPlaceType}
                    isStar={true}
                    handleChange={() => handleChangeSelect('place type')}
                />
            </div>

            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <MultipleSelects
                    label={workPlaceHeader?.tp ? workPlaceHeader?.tp?.headerName : 'type of priority'}
                    width={'217px'}
                    options={typeOfPriorityOptions}
                    selectedItems={typeOfPriority}
                    setSelectedItems={setTypeOfPriority}
                    isStar={true}
                    handleChange={() => handleChangeSelect('priority')}
                />
                <MultipleSelects
                    label={clientTypeName ? clientTypeName[0].headerName : 'client type'}
                    width={'217px'}
                    options={clientTypeOptions}
                    selectedItems={clientType}
                    setSelectedItems={setClientType}
                    handleChange={() => handleChangeSelect('client')}
                />
            </div>

            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <SingleSelects
                    label="global brand"
                    width={'100%'}
                    options={brandOptions}
                    selectedItems={brand}
                    setSelectedItems={setBrand}
                    isStar={true}
                    handleChange={() => handleChangeSelect('brand')}
                />
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <SingleSelects
                    label="indication"
                    width={'217px'}
                    options={indicationOptions}
                    selectedItems={indication}
                    setSelectedItems={setIndication}
                    isStar={true}
                    handleChange={() => handleChangeSelect('indication')}
                />
                <SingleSelects
                    label="profile"
                    width={'217px'}
                    options={profileOptions}
                    selectedItems={profile}
                    setSelectedItems={setProfile}
                    isStar={true}
                    handleChange={() => handleChangeSelect('profile')}
                />
            </div>
            <div style={{ display: 'flex', columnGap: '1rem'}}>
                <SingleSelects
                    label="need"
                    width={'217px'}
                    options={needOptions}
                    selectedItems={need}
                    setSelectedItems={setNeed}
                    isStar={true}
                    handleChange={() => handleChangeSelect('need')}
                />
                <MultipleSelects
                    label="benefit"
                    width={'217px'}
                    options={benefitOptions}
                    selectedItems={benefit}
                    setSelectedItems={setBenefit}
                    isStar={true}
                />
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <MultipleSelects
                    label="specialization"
                    width={'217px'}
                    options={specializationOptions}
                    selectedItems={specialization}
                    setSelectedItems={setSpecialization}
                    isStar={clientType ? true : false}
                    disabled={clientType ? false : true}
                    handleChange={() => handleChangeSelect('specialization')}
                />
                <SingleSelects
                    label="type"
                    width={'217px'}
                    options={typeOptions}
                    selectedItems={type}
                    setSelectedItems={setType}
                    isStar={true}
                />
            </div>

            <NewTextArea
                label="promo subject name"
                width={'100%'}
                value={promoSubjectName}
                setValue={setPromoSubjectName}
                isStar={true}
                placeholder="promo subject name"
            />

            <div className="promo-subject-datepicker">
                <label>
                    {t('start end date')}
                    <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                </label>
                <RangePicker
                    className="promo-subject-datepicker__date-picker"
                    style={{
                        borderRadius: '15px',
                        width: '100%',
                        height: '26px',
                        margin: '0 8px 26px 0',
                        borderColor: '#aaa',
                    }}
                    onChange={onChangeDate}
                    format="DD/MM/YYYY"
                    separator={<i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>}
                    disabledDate={disabledDate}
                    placeholder={[t('Start Date'), t('End Date')]}
                />
            </div>
            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={message} />}
        </div>
    );
};

export default Body;
