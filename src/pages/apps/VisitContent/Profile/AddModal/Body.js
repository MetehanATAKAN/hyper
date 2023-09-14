import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import 'antd/dist/antd.css';
import '../../../../../assets/scss/custom/visitContent/promoSubject.scss';
import FailModal from './FailModal';

const Body = ({ setShowAddModal, setAddButtonDisableStatus, isClickAdd, setIsClickAdd, getFilterData, companyIdForFilter }) => {

    const history = useHistory();
    const { t } = useTranslation();

    const [workPlaceHeader, setWorkPlaceHeader] = useState();

    const [clientTypeName, setClientTypeName] = useState();

    const [failModal, setFailModal] = useState(false);
    const [message, setMessage] = useState('');

    const [place, setPlace] = useState();
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState();
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [typeOfPriority, setTypeOfPriority] = useState();
    const [typeOfPriorityOptions, setTypeOfPriorityOptions] = useState([]);

    const [clientType, setClientType] = useState();
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [globalBrand, setGlobalBrand] = useState();
    const [globalBrandOptions, setGlobalBrandOptions] = useState([]);

    const [specialization, setSpecialization] = useState([]);
    const [specializationOptions, setSpecializationOptions] = useState([]);

    const [indication, setIndication] = useState();
    const [indicationOptions, setIndicationOptions] = useState([]);

    const [profile, setProfile] = useState();
    const [profileOptions, setProfileOptions] = useState([])


    // work place lerin header ını çekmek için
    useEffect(() => {
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyIdForFilter
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
    }, [history, companyIdForFilter]);

    // work place optionları çekmke için
    useEffect(() => {
        if(workPlaceHeader){
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pl.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        if(data.length === 1){
                            setPlace({ label: data[0].definationName, value: data[0].definationId })
                        }
                    })
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pt.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceTypeOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        if(data.length === 1){
                            setPlaceType({ label: data[0].definationName, value: data[0].definationId })
                        }
                    })
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.tp.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setTypeOfPriorityOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        if(data.length === 1){
                            setTypeOfPriority({ label: data[0].definationName, value: data[0].definationId })
                        }
                    })
                }
            })
        }else{
            setPlace();
            setPlaceOptions([]);
            setPlaceType();
            setPlaceTypeOptions([]);
            setTypeOfPriority();
            setTypeOfPriorityOptions([]);
        }
    }, [workPlaceHeader])

    // client type ın header ını çekmek için
    useEffect(() => {
        if(!companyIdForFilter) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyIdForFilter
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
    }, [companyIdForFilter])

    // client type optionları
    useEffect(() => {
        if(!clientTypeName) return;
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
            countryId: Number(localStorage.getItem('countryId')),
            id: clientTypeName[0].id
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setClientTypeOptions(data.map(item => ({ value: item.definationId, label: item.definationName})))
                    if(data.length === 1){
                        setClientType({ value: data[0].definationId, label: data[0].definationName})
                    }
                })
            }
        })
    }, [history, clientTypeName])

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllGlobalBrands', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setGlobalBrandOptions(
                        data.map((brand) => {
                            return {
                                value: brand.GlobalBrandId,
                                label: brand.GlobalBrandName,
                            };
                        })
                    );
                    if(data.length === 1){
                        setGlobalBrand(
                            data.map((brand) => {
                                return {
                                    value: brand.GlobalBrandId,
                                    label: brand.GlobalBrandName,
                                };
                            })
                        );
                    }
                    
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history])

    useEffect(() => {
        setIndication();
        setIndicationOptions([]);
        setProfile();
        setProfileOptions([]);
        setSpecialization([]);
        setSpecializationOptions([]);
        if (!globalBrand) return;
        FetchApiPost('api/OldSystem/GetIndicationsByBrandIds', 'POST', {
            brandIds: [globalBrand.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setIndicationOptions(
                        data.map((i) => {
                            return {
                                value: i.IndicationId,
                                label: i.IndicationName,
                            };
                        })
                    );
                    if (data.length === 1) {
                        setIndication({ value: data[0].IndicationId, label: data[0].IndicationName });
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [globalBrand]);

    useEffect(() => {
        setProfile();
        setProfileOptions([]);
        setSpecialization([]);
        setSpecializationOptions([]);

        if (!globalBrand || !indication) return;

        FetchApiPost('api/OldSystem/GetProfileByIndicationIds', 'POST', {
            IndicationIds: [indication.value],
            PageControl: 0,
            CompanyId: companyIdForFilter
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setProfileOptions(data.map(p => ({ value: p.ProfileId, label: p.ProfileName })))
                    if(data.length === 1){
                        setProfile({value: data[0].ProfileId, label: data[0].ProfileName})
                    }
                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [indication]);

    useEffect(() => {
        setSpecialization([]);
        setSpecializationOptions([]);

        if (!globalBrand || !indication || !profile || !clientType) return;

        FetchApiPost('api/OldSystem/GetSpecsByGlobalBrandIdsandIndicationIdsandProfileIds', 'POST', {
            brandIds: `${globalBrand.value}`,
            indicationIds: `${indication.value}`,
            profileIds: `${profile.value}`,
            clientTypeIds: `${clientType.value}`
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(data => {
                    setSpecializationOptions(data.map(i => ({ value: i.spec_id, label: i.spec_name })))
                    if(data.length === 1){
                        setSpecialization([{ value: data[0].spec_id, label: data[0].spec_name }])
                    }
                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [profile, globalBrand, indication, clientType]);

    useEffect(() => {
        if(place && placeType && typeOfPriority && globalBrand && indication && profile){
            if(!clientType){
                setAddButtonDisableStatus(false);
            }else{
                if(specialization.length > 0){
                    setAddButtonDisableStatus(false)
                }else{
                    setAddButtonDisableStatus(true)
                }
            }
        }else{
            setAddButtonDisableStatus(true);
        }
    }, [place, placeType, typeOfPriority, clientType, globalBrand, indication, profile, specialization])

    useEffect(() => {
        if(!isClickAdd) return;

        const body = {
            placeId: place.value,
            placeName: place.label,
            placeTypeId: placeType.value,
            placeTypeName: placeType.label,
            typeofPriorityId: typeOfPriority.value,
            typeofPriorityName: typeOfPriority.label,
            clientTypeId: clientType ? clientType.value : 0,
            brandId: globalBrand.value,
            brandName: globalBrand.label,
            specIds: clientType ? specialization.map(i => i.value) : [0],
            indicationId: indication.value,
            indicationName: indication.label,
            profileId: profile.value,
            profileName: profile.label
        }

        FetchApiPost('services/Pages/Profile/SaveProfileConnection', 'POST', body)  
            .then(res => {
                if(res.status === 200){
                    setShowAddModal(false)
                    getFilterData();
                }else{
                    res.json().then(({ errors }) => {
                        setFailModal(true);
                        setMessage(`${t('Already have the same')} \n "${errors[0]}"`);
                        setIsClickAdd(false);
                    })
                }
            })
    }, [isClickAdd])
    

    return (
        <div className="promo-subject-add-modal">
            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr'}}>
                <SingleSelects
                    label={workPlaceHeader?.pl ? workPlaceHeader?.pl?.headerName: "place"}
                    width={'217px'}
                    options={placeOptions}
                    selectedItems={place}
                    setSelectedItems={setPlace}
                    isStar={true}
                />
                <SingleSelects
                    label={workPlaceHeader?.pt ? workPlaceHeader?.pt?.headerName: "place type"}
                    width={'217px'}
                    options={placeTypeOptions}
                    selectedItems={placeType}
                    setSelectedItems={setPlaceType}
                    isStar={true}
                />
            </div>

            <div style={{display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr'}}>
                <SingleSelects
                    label={workPlaceHeader?.tp ? workPlaceHeader?.tp?.headerName: "type of priority"}
                    width={'217px'}
                    options={typeOfPriorityOptions}
                    selectedItems={typeOfPriority}
                    setSelectedItems={setTypeOfPriority}
                    isStar={true}
                />
                <SingleSelects
                    label={clientTypeName ? clientTypeName[0].headerName : 'client type'}
                    width={'217px'}
                    options={clientTypeOptions}
                    selectedItems={clientType}
                    setSelectedItems={setClientType}
                />
            </div>

            <div>
                <SingleSelects
                    label="global brand"
                    width={'100%'}
                    options={globalBrandOptions}
                    selectedItems={globalBrand}
                    setSelectedItems={setGlobalBrand}
                    isStar={true}
                />
            </div>

            <div>
                <SingleSelects
                    label="indication"
                    width={'100%'}
                    options={indicationOptions}
                    selectedItems={indication}
                    setSelectedItems={setIndication}
                    isStar={true}
                />
            </div>
            <div>
                <SingleSelects
                    label="profile"
                    width={'100%'}
                    options={profileOptions}
                    selectedItems={profile}
                    setSelectedItems={setProfile}
                    isStar={true}
                />
            </div>

            <div>
                <MultipleSelects
                    label="specialization"
                    width={'100%'}
                    options={specializationOptions}
                    selectedItems={specialization}
                    setSelectedItems={setSpecialization}
                    isStar={clientType ? true : false}
                    disabled={clientType ? false : true}
                />
            </div>

            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={message} />}
        </div>
    );
};

export default Body;
