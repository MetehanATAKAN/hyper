import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { Form, Col, Row } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FailModal from '../../../../../components/FailModal';

import AddCityModal from '../AddCityModal/AddCityModal';


const Body = ({ tableHeader, setAddButtonDisableStatus, isClickAdd, setIsClickAdd, getFilterData, setShow, filterCountry, filterZone }) => {
    const { t } = useTranslation();


    const [failModal, setFailModal] = useState(false);
    const [failMessage, setFailMessage] = useState('');

    const [addCityModal, setAddCityModal] = useState(false);


    const history = useHistory(); 
    const [place, setPlace] = useState();
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState();
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [typesOfPriporty, setTypesOfPriporty] = useState();
    const [typesOfPriportyOptions, setTypesOfPriportyOptions] = useState([]);

    const [name, setName] = useState('');

    const [country, setCountry] = useState();
    const [countryOptions, setCountryOptions] = useState([]);

    const [zone, setZone] = useState();
    const [zoneOptions, setZoneOptions] = useState([]);

    const [city, setCity] = useState();
    const [cityOptions, setCityOptions] = useState([]);

    const [district, setDistrict] = useState('');
    const [uniqId, setUniqId] = useState('');
    const [postCode, setPostCode] = useState('');

    const [adress, setAdress] = useState(''); // textarea

    const [ownerCompany, setOwnerCompany] = useState();
    const [ownerCompanyOptions, setOwnerCompanyOptions] = useState([]);

    const [responsiblePerson, setResponsiblePerson] = useState('');
    const [responsiblePersonPhone, setResponsiblePersonPhone] = useState('');

    const [personQuantity, setPersonQuantity] = useState('');
    const [bedNumber, setBedNumber] = useState('');

    const [detailsSwitch, setDetailsSwitch] = useState(false);

    const [infoModal, setInfoModal] = useState(false);

    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const addButtonStyle = {
        width: 'fit-content',
        height: 'auto',
        border: 'none',
        paddingLeft: '0',
        paddingRight: '0',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'transparent',
        marginTop: '0',
        marginBottom: '0'
    };

    useEffect(() => {
        if(tableHeader){
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: tableHeader.pl.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map(item => ({ label: item.definationName, value: item.definationId !== 0 ? item.definationId : item.id })))
                        if(data.length === 1){
                            setPlace({ label: data[0].definationName, value: data[0].definationId !== 0 ? data[0].definationId : data[0].id })
                        }
                    })
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: tableHeader.pt.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceTypeOptions(data.map(item => ({ label: item.definationName, value: item.definationId !== 0 ? item.definationId : item.id })))
                        if(data.length === 1){
                            setPlaceType({ label: data[0].definationName, value: data[0].definationId !== 0 ? data[0].definationId : data[0].id })
                        }
                    })
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: tableHeader.tp.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setTypesOfPriportyOptions(data.map(item => ({ label: item.definationName, value: item.definationId !== 0 ? item.definationId : item.id })))
                        if(data.length === 1){
                            setTypesOfPriporty({ label: data[0].definationName, value: data[0].definationId !== 0 ? data[0].definationId : data[0].id })
                        }
                    })
                }
            })
        }
    }, [tableHeader])

    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetAllCountriesList/${Number(localStorage.getItem('userEmpId'))}`, 'GET')
            .then(res => {
                res.json().then(data => {
                    setCountryOptions(data.map(item => ({ label: item.CountryName, value: item.CountryId })))
                    if(data.length === 1){
                        setCountry({ label: data[0].CountryName, value: data[0].CountryId })
                    }else if(data.length > 1){
                        if(filterCountry.length === 1){
                            setCountry({ label: filterCountry[0].label, value: filterCountry[0].value })
                        }
                    }
                })
            })
    }, [history])

    useEffect(() => {
        if(country){
            FetchApiPost('api/OldSystem/GetZoneListByCountryId', 'POST', {
                empId: Number(localStorage.getItem('userEmpId')),
                id: country.value
            })
                .then(res => {
                    if(res.status === 200){
                        res.json().then(data => {
                            setZoneOptions(data.map(item => ({ label: item.Name, value: item.Id })))
                            setZone();
                            if(data.length === 1){
                                setZone({ label: data[0].Name, value: data[0].Id })
                            }else if(data.length > 1){
                                if(filterZone.length === 1){
                                    setZone({ label: filterZone[0].label, value: filterZone[0].value })
                                }
                            }
                        })
                    }else if(res.status === 500 || res.status === 502){
                        history.push('/error-500');
                    }else{
                        setZoneOptions([]);
                        setZone();
                    }
                })
        }
    }, [country])

    useEffect(() => {
        if(!country){
            setCityOptions([]);
                setCity();
                return ;
        }
        FetchApiPost('services/CRM/City/GetCitiesByCountryIds', 'POST', {
            countryIds: [country.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setCityOptions([ {value: 0, label: 'N/A'}, ...data.map(item => ({ label: item.cityName, value: item.id }))])
                            // setCity();
                            if(data.length === 1){
                                setCity({ label: data[0].cityName, value: data[0].id })
                            }else if(data.length === 0){
                                setCity({value: 0, label: 'N/A'})
                            }
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500');
            }else{
                setCityOptions([]);
                setCity();
            }
        })
    }, [country])

    useEffect(() => {
        if(country){
            FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${country.value}`, 'GET')
                .then(res => {
                    if(res.status === 200){
                        res.json().then(data => {
                            setOwnerCompanyOptions(data.map(item => ({ label: item.CompanyName, value: item.CompanyId })))
                            setOwnerCompany();
                            if(data.length === 1){
                                setOwnerCompany({ label: data[0].CompanyName, value: data[0].CompanyId })
                            }
                        })
                    }else if(res.status === 500 || res.status === 502){
                        history.push('/error-500');
                    }else{
                        setOwnerCompanyOptions([]);
                        setOwnerCompany();
                    }
                })
        }else{
            setOwnerCompany();
            setOwnerCompanyOptions([]);
        }
        
    }, [country])

    useEffect(() => {
            if(place && placeType && typesOfPriporty && zone && name.trim().length > 0 && country && city && district.trim().length > 0 && adress.trim().length > 0 && ownerCompany){
                setAddButtonDisableStatus(false);
            }else{
                setAddButtonDisableStatus(true);
            }
        
    }, [detailsSwitch, place, placeType, typesOfPriporty, zone, name, country, city, district, adress, ownerCompany])

    useEffect(() => {
        if(!isClickAdd) return;

        let nameArr = name.trim().split(" ");

        for (var i = 0; i < nameArr.length; i++) {
            nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
        
        }

        const nameStr = nameArr.join(" ");


        const body = {
            definationId1: place.value,
            definationId2: placeType.value,
            definationId3: typesOfPriporty.value,
            zoneId: zone.value,
            name: nameStr.trim(),
            countryId: country.value,
            cityId: city.value,
            district: district.trim(),
            uniqeId: uniqId.trim(),
            postCode: postCode.trim(),
            adress: adress.trim(),
            ownerCompanyId: ownerCompany.value,
            responsiblePerson: detailsSwitch ? responsiblePerson.trim() : '',
            responsiblePersonPhone: detailsSwitch ? responsiblePersonPhone.trim() : '',
            personalQuantity: detailsSwitch ? personQuantity.trim() : '',
            bedNumber: detailsSwitch ? bedNumber.trim() : '',
            createdBy: localStorage.getItem('userName')
        }
        FetchApiPost('services/CRM/WorkPlace/CreateWorkPlace', 'POST', body)
            .then(res => {
                if(res.status === 201){
                    getFilterData();
                    setShow(false);
                }else if(res.status === 500 || res.status === 502){
                    history.push('/error-500');
                }else{
                    res.json().then(({ errors }) => {
                        setIsClickAdd(false);
                        setFailModal(true);
                        setFailMessage(errors[0]);
                    });
                }
            })
    }, [isClickAdd])

    const handleChange = (name) => {
        switch (name) {
            case 'country':
                setCityOptions([]);
                setCity();
                break;
        
            default:
                break;
        }
    }


    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '1rem' }}>
                <div>
                    <SingleSelects
                        label={tableHeader?.pl?.headerName}
                        selectedItems={place}
                        setSelectedItems={setPlace}
                        options={placeOptions}
                        width="139.33px"
                        isStar={true}
                    />
                </div>
                <div>
                    <SingleSelects
                        label={tableHeader?.pt?.headerName}
                        selectedItems={placeType}
                        setSelectedItems={setPlaceType}
                        options={placeTypeOptions}
                        width="139.33px"
                        isStar={true}
                    />
                </div>
                <div>
                    <SingleSelects
                        label={tableHeader?.tp?.headerName}
                        selectedItems={typesOfPriporty}
                        setSelectedItems={setTypesOfPriporty}
                        options={typesOfPriportyOptions}
                        width="139.33px"
                        isStar={true}
                    />
                </div>
            </div>

            <div>
                <NewInput label="name" placeholder="name" value={name} setValue={setName} width="100%" isStar={true} />
            </div>

            <div style={{ display: 'flex', columnGap: '1rem' }}>

                    <SingleSelects
                        label="country"
                        selectedItems={country}
                        setSelectedItems={setCountry}
                        options={countryOptions}
                        width="139.33px"
                        isStar={true}
                        handleChange={() => handleChange('country')}
                    />
         
                    <SingleSelects
                        label="zone"
                        selectedItems={zone}
                        setSelectedItems={setZone}
                        options={zoneOptions}
                        width="139.33px"
                        isStar={true}
                    />
             
                    <SingleSelects
                        label="city"
                        selectedItems={city}
                        setSelectedItems={setCity}
                        options={cityOptions}
                        width="139.33px"
                        isStar={true}
                    />
             
            </div>

            <div style={{ display: 'grid', placeItems: 'end', columnGap: '.5rem', gridTemplateColumns: '1fr min-content' }}>
                        <button style={addButtonStyle} onClick={() => setAddCityModal(true)} disabled={(country && zone) ? false : true}>
                            <i style={{color: '#44badc'}} class="fa-solid fa-circle-plus"></i>
                        </button>
                        <label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>add city</label>
                    </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '1rem' }}>
                <div>
                    <NewInput
                        label="district"
                        placeholder="district"
                        value={district}
                        setValue={setDistrict}
                        width="100%"
                        isStar={true}
                    />
                </div>
                <div>
                    <NewInput
                        label={`uniq ID`}
                        placeholder="uniq ID"
                        value={uniqId}
                        setValue={setUniqId}
                        width="100%"
                    />
                </div>
                <div>
                    <NewInput
                        label="post code"
                        placeholder="post code"
                        value={postCode}
                        setValue={setPostCode}
                        width="100%"
                        maxLength={10}
                    />
                </div>
            </div>

            <div>
                <NewTextArea value={adress} setValue={setAdress} label="address" isStar={true} placeholder="address" />
            </div>

            <div style={{display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr'}}>
                <div>
                <NewInput 
                    label="longitude"
                    placeholder="longitude"
                    value={longitude}
                    setValue={setLongitude}
                    width="217px"
                />
                </div>
                <div>
                <NewInput 
                    label="latitude"
                    placeholder="latitude"
                    value={latitude}
                    setValue={setLatitude}
                    width="217px"
                />
                </div>
            </div>

            <div>
                <SingleSelects
                    label="owner company"
                    selectedItems={ownerCompany}
                    setSelectedItems={setOwnerCompany}
                    options={ownerCompanyOptions}
                    width="100%"
                    isStar={true}
                    // placeholder="owner company"
                />
            </div>

            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 8px',
                    }}>
                    <label>{t('details')}</label>
                    <Form.Check type="switch" onChange={(e) => setDetailsSwitch(e.target.checked)} />
                </div>
            </div>

            {
                detailsSwitch && (
                  <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                <div>
                    <NewInput
                        value={responsiblePerson}
                        setValue={setResponsiblePerson}
                        label="responsible person"
                        placeholder="responsible person"
                        width="100%"
                    />
                </div>
                <div>
                    <NewInput
                        value={responsiblePersonPhone}
                        setValue={setResponsiblePersonPhone}
                        label="responsible person phone"
                        placeholder="responsible person phone"
                        width="100%"
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                <div>
                    <NewInput
                        value={personQuantity}
                        setValue={setPersonQuantity}
                        label="person quantity"
                        placeholder="person quantity"
                        width="100%"
                    />
                </div>
                <div>
                    <NewInput
                        value={bedNumber}
                        setValue={setBedNumber}
                        label="bed number"
                        placeholder="bed number"
                        width="100%"
                    />
                </div>
            </div>
                  </>
                )
            }

    {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={failMessage} />}

    {
        addCityModal && <AddCityModal zone={zone} country={country} show={addCityModal} setShow={setAddCityModal} setCityOptions={setCityOptions} />
    }
        </div>
    );
};

export default Body;
