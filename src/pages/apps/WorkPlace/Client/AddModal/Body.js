import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { Col, Row } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DatePicker, Checkbox } from 'antd';
import moment from 'moment';

import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import AddchartIcon from '@mui/icons-material/Addchart';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import Check from '@mui/icons-material/Check';
import { Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled } from '@mui/material';
import FailModal from '../../../../../components/FailModal';

const Body = ({
    clientTypeName,
    modalTabValue,
    setModalTabValue,
    setNextButtonDisableStatus,
    setAddButtonDisableStatus,
    isClickAdd,
    setIsClickAdd,
    setShow,
    getFilterData
}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const steps = ['Client', 'Work Place'];

    const [failModal, setFailModal] = useState(false);
    const [message, setMessage] = useState('');

    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 23,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#00a0df',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#00a0df',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundColor: '#00a0df',
            // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundColor: '#00a0df',
        }),
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;
    
        const icons = {
            1: <SettingsIcon />,
            2: <MapIcon />,
            3: <PersonIcon />,
            4: <AddchartIcon />,
            5: <CategoryIcon />,
            6: <StoreIcon />,
        };
    
        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {completed ? <Check /> : icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    const [workPlaceTableHeader, setWorkPlaceTableHeader] = useState();

    const [clientType, setClientType] = useState();
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [allClientTypes, setAllClientTypes] = useState([]);

    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const [specialization, setSpecialization] = useState();
    const [specializationOptions, setSpecializationOptions] = useState([]);

    const [gender, setGender] = useState();
    const [genderOptions, setGenderOptions] = useState([
        {
            value: 1,
            label: t('Male'),
        },
        {
            value: 2,
            label: t('Female'),
        },
    ]);

    const [birthday, setBirthday] = useState();

    const [email, setEmail] = useState('');
    const [workPhone, setWorkPhone] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');

    const [degree, setDegree] = useState();
    const [degreeOptions, setDegreeOptions] = useState([]);

    const [keyOpinion, setKeyOpinion] = useState(false);
    const [decisionMaker, setDecisionMaker] = useState(false);

    /* -------------------------------------------------------------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------------------------------------------------------------- */ /* -------------------------------------------------------------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------------------------------------------------------------- */

    const [country, setCountry] = useState();
    const [countryOptions, setCountryOptions] = useState([]);

    const [company, setCompany] = useState();
    const [companyOptions, setCompanyOptions] = useState([]);

    const [region, setRegion] = useState();
    const [regionOptions, setRegionOptions] = useState([]);

    const [area, setArea] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);

    const [zone, setZone] = useState([]);
    const [zoneOptions, setZoneOptions] = useState([]);

    const [city, setCity] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const [district, setDistrict] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);

    const [workPlaceType, setWorkPlaceType] = useState();
    const [workPlaceTypeOptions, setWorkPlaceTypeOptions] = useState([]);

    const [workPlace, setWorkPlace] = useState();
    const [workPlaceOptions, setWorkPlaceOptions] = useState([]);

    const [category, setCategory] = useState({
        value: 3,
        label: 'C',
    });

    const [categoryOptions, setCategoryOptions] = useState([
        {
            value: 1,
            label: 'A',
        },
        {
            value: 2,
            label: 'B',
        },
        {
            value: 3,
            label: 'C',
        },
    ]);

    const [position, setPosition] = useState();
    const [positionOptions, setPositionOptions] = useState([]);

    const [allPositionOptions, setAllPositionOptions] = useState([]);

    const addButtonStyle = {
        width: 'fit-content',
        height: 'auto',
        border: 'none',
        padding: '0',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'transparent'
    };

    const addDeleteButtonStyle = {
        width: 'fit-content',
        height: '32px',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0',
        display: 'grid',
        placeItems: 'center',
    };

    const [copyDataContainer, setCopyDataContainer] = useState([]);

    const addCopyData = () => {
        setCopyDataContainer([
            ...copyDataContainer,
            {
                workPlace: undefined,
                workPlaceType: undefined,
                category: {
                    value: 3,
                    label: 'C',
                },
                position: undefined,
                workPlaceOptions: [],
            },
        ]);
    };

    const deleteCopyData = (index) => {
        let copyDataContainerCopy = [...copyDataContainer];
        copyDataContainerCopy.splice(index, 1);
        setCopyDataContainer(copyDataContainerCopy);
    };

    const onChangeDate = (dates) => {
        if (dates) {
            setBirthday(moment(dates).format());
        }
    };

    useEffect(() => {
        if (clientType && surname.trim().length > 0 && name.trim().length > 0 && specialization) {
            setNextButtonDisableStatus(false);
        } else {
            setNextButtonDisableStatus(true);
        }
    }, [clientType, surname, name, specialization]);

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllDegree', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setDegreeOptions(data.map(i => ({ value: i.DegreeId, label: i.DegreeName })))
                    })
                }
            })
    }, [])

    useEffect(() => {
        if (copyDataContainer.length === 0) {
            if (country && company && zone.length > 0 && city.length > 0 && workPlace && workPlaceType && position) {
                setAddButtonDisableStatus(false);
            } else {
                setAddButtonDisableStatus(true);
            }
        } else {
            if (country && company && zone.length > 0 && city.length > 0 && workPlace && workPlaceType && position) {
                let isAllDataFilled = false;
                copyDataContainer.map((item) => {
                    if (
                        item.workPlace === undefined ||
                        item.workPlaceType === undefined ||
                        item.position === undefined
                    ) {
                        isAllDataFilled = true;
                    }
                });
                setAddButtonDisableStatus(isAllDataFilled);
            } else {
                setAddButtonDisableStatus(true);
            }
        }
    }, [country, company, zone, city, workPlace, workPlaceType, position, copyDataContainer]);

    useEffect(() => {
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
            countryId: Number(localStorage.getItem('countryId')),
            id: clientTypeName[0].id,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setAllClientTypes(data);
                    setClientTypeOptions(data.map((item) => ({ value: item.definationId !== 0 ? item.definationId : item.id, label: item.definationName })));
                    if (data.length === 1) {
                        setClientType({ value: data[0].definationId !== 0 ? data[0].definationId : data[0].id, label: data[0].definationName });
                    }
                });
            }
        });
    }, [history]);

    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetAllCountriesList/${Number(localStorage.getItem('userEmpId'))}`, 'GET').then(
            (res) => {
                if(res.status === 200){
                    res.json().then((data) => {
                        setCountryOptions(data.map((item) => ({ label: item.CountryName, value: item.CountryId })));
                        if (data.length === 1) {
                            setCountry({ label: data[0].CountryName, value: data[0].CountryId });
                        }
                    });
                }
                
            }
        );
    }, [history]);

    useEffect(() => {
        if (country) {

            FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${country.value}`, 'GET').then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCompanyOptions(data.map((item) => ({ label: item.CompanyName, value: item.CompanyId })));
                        if (data.length === 1) {
                            setCompany({ label: data[0].CompanyName, value: data[0].CompanyId });
                        }
                    });
                } else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                } else {
                    setCompanyOptions([]);
                    setCompany();
                }
            });
        } 
    }, [country]);

    useEffect(() => {

        if (!country) return;
        FetchApiPost('api/OldSystem/GetZoneListByCountryIds', 'POST', {
            empId: Number(localStorage.getItem('userEmpId')),
            ids: [country.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setZoneOptions(data.map((item) => ({ label: item.Name, value: item.Id })));
                    if (data.length === 1) {
                        setZone([{ label: data[0].Name, value: data[0].Id }]);
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setZoneOptions([]);
                setZone([]);
            }
        });
    }, [country]);

    useEffect(() => {
        if(!country) return ;
        
        FetchApiPost('services/CRM/City/GetCitiesByCountryIds', 'POST', {
            countryIds: [country.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    let clearNulls = data.filter(item => item !== null)
                    setCityOptions([ {value: 0, label: 'N/A'}, ...clearNulls.map(item => ({ label: item.cityName, value: item.id }))])
                            // setCity();
                            if(clearNulls.length === 1){
                                setCity([{ label: clearNulls[0].cityName, value: clearNulls[0].id }])
                            }else if(clearNulls.length === 0){
                                setCity([{value: 0, label: 'N/A'}])
                            }
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500');
            }else{
                setCityOptions([]);
                setCity([]);
            }
        })
    }, [country])

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllSpecs', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSpecializationOptions(data.map((item) => ({ label: item.SpecName, value: item.SpecId })));
                    if (data.length === 1) {
                        setSpecialization({ label: data[0].SpecName, value: data[0].SpecId });
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setSpecialization();
                setSpecializationOptions([]);
            }
        });
    }, [history]);

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllPositions', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setAllPositionOptions(data);
                });
            }
        });
    }, [history]);

    useEffect(() => {
        if (!country || !company || zone.length === 0) return;
        FetchApiPost('services/CRM/WorkPlace/GetDistrictWorkPlace', 'POST', {
            countryId: country?.value,
            companyId: company?.value,
            zoneIds: zone?.map((item) => item.value),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setDistrictOptions(data.map((item, index) => ({ label: item, value: index })));
                    if (data.length === 1) {
                        setDistrict([{ label: data[0], value: 0 }]);
                    }
                });
            }
        });
    }, [country, company, zone]);

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
                    setWorkPlaceTableHeader(arr);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setWorkPlaceTableHeader();
            }
        });
    }, [history, companyId]);

    useEffect(() => {
        if (workPlaceTableHeader) {

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceTableHeader.pt.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setWorkPlaceTypeOptions(data.map((item) => ({ label: item.definationName, value: item.definationId !== 0 ? item.definationId : item.id })));
                        if (data.length === 1) {
                            setWorkPlaceType({ label: data[0].definationName, value: data[0].definationId !== 0 ? data[0].definationId : data[0].id });
                        }
                    });
                }
            });
        } else {
            setWorkPlaceTypeOptions([]);
            setWorkPlaceType();
        }
    }, [workPlaceTableHeader]);

    useEffect(() => {
        if (!workPlaceType || !country || !company || zone.length === 0 || district.length === 0) return;
        FetchApiPost('services/CRM/WorkPlace/GetWorkPlacesForClientAddPopUp', 'POST', {
            countryId: country?.value,
            companyId: company?.value,
            zoneIds: zone?.map((item) => item.value),
            district: district?.map((i) => i.label),
            WorkPlaceTypeId: workPlaceType?.value,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    // setWorkPlaceOptions(data.map((i) => ({ label: i.name, value: i.definationId !== 0 ? i.definationId : i.id })));
                    setWorkPlaceOptions(data.map((i) => ({ label: i.name, value: i.id })));
                    if (data.length === 1) {
                        setWorkPlace({ label: data[0].name, value: data[0].id });
                    }
                });
            }
        });
    }, [country, company, zone, district, workPlaceType]);
    // Position filter

    useEffect(() => {
        if (!clientType || allPositionOptions.length === 0) return;
        let selectedClient = allClientTypes.find((item) => item.definationId === clientType?.value);

        if (selectedClient.abbrevation === 'PHRM') {
            let filteredPosition = allPositionOptions.filter((item) => item.Type === 'PharmacistPosition');
            setPositionOptions(filteredPosition.map((item) => ({ label: item.Name, value: item.Id })));
            if (filteredPosition.length === 1) {
                setPosition({ label: filteredPosition[0].Name, value: filteredPosition[0].Id });
            }
        } else if (selectedClient.abbrevation === 'PHYC') {
            let filteredPosition = allPositionOptions.filter((item) => item.Type === 'CustomerPosition');
            setPositionOptions(filteredPosition.map((item) => ({ label: item.Name, value: item.Id })));
            if (filteredPosition.length === 1) {
                setPosition({ label: filteredPosition[0].Name, value: filteredPosition[0].Id });
            }
        }
    }, [clientType, allPositionOptions]);

    useEffect(() => {
        if (!isClickAdd) return;
        const body = {
            createdBy: localStorage.getItem('userName'),
            surname: surname.trim(),
            name: name.trim(),
            middleName: middleName.trim(),
            specializationId: specialization?.value,
            clientTypeId: clientType?.value,
            gender: gender?.label ?? '',
            birthday: birthday ?? '1000-10-10T10:10:10+03:00',
            email: email.trim(),
            workPhone: workPhone.trim(),
            mobilePhone: mobilePhone.trim(),
            degreeId: degree ? degree.value : 0,
            companyId: company?.value,
            countryId: country?.value,
            keyOpinionLeader: keyOpinion,
            decisionMaker: decisionMaker,
            workPlaces:
                copyDataContainer.length === 0
                    ? [
                          {
                              workPlaceId: workPlace?.value,
                              category: category?.label,
                              positionId: position?.value,
                          },
                      ]
                    : [
                          {
                              workPlaceId: workPlace?.value,
                              category: category?.label,
                              positionId: position?.value,
                          },
                          ...copyDataContainer.map((item) => ({
                              workPlaceId: item.workPlace?.value,
                              category: item.category?.label,
                              positionId: item.position?.value,
                          })),
                      ],
        };
        FetchApiPost('services/CRM/Client/CreateClient', 'POST', body)
            .then(res => {
                if(res.status === 201){
                    setShow(false)
                    getFilterData();
                }else if(res.status === 409){
                    res.json().then(({ errors }) => {
                        setFailModal(true);
                        setMessage("Same work place cannot be added twice");
                        setIsClickAdd(false);
                    })
                }
            })
        setIsClickAdd(false);
    }, [isClickAdd]);

    useEffect(() => {
        if(!company || !country || zone.length === 0 || district.length === 0){
            let newCopyData = copyDataContainer.map(i => {
                return{
                    ...i,
                    workPlaceOptions: [],
                    workPlace: undefined
                }
            })
            setCopyDataContainer(newCopyData)
        }else{
            let newCopyData = copyDataContainer.map((i, iIndex) => 
                    handleGetWorkPlaceForCopyData(iIndex, i.workPlaceType)
            )
            console.log(newCopyData)
            // setCopyDataContainer(newCopyData)
        }
        
    }, [country, company, zone, district])

    const handleSetCopyData = (index, objectName, value) => {
        if (objectName === 'workPlaceType') {
            handleGetWorkPlaceForCopyData(index, value)
        } else {
            let newCopyData = copyDataContainer.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [objectName]: value,
                    };
                } else {
                    return item;
                }
            });
            setCopyDataContainer(newCopyData);
        }
    };

    const handleGetWorkPlaceForCopyData = (index, workPlaceType) => {
        if (!country || !company || zone.length === 0 || district.length === 0) return;
        if(!workPlaceType){
            let newCopyData = copyDataContainer.map((i, iIndex) => {
                if(index === iIndex){
                    return {
                        ...i,
                        workPlace: undefined,
                        workPlaceOptions: [],
                    }
                }else{
                    return i
                }
            })
            setCopyDataContainer(newCopyData);
            return;
        }
        FetchApiPost('services/CRM/WorkPlace/GetWorkPlacesForClientAddPopUp', 'POST', {
            countryId: country?.value,
            companyId: company?.value,
            zoneIds: zone?.map((item) => item.value),
            district: district?.map((i) => i.label),
            WorkPlaceTypeId: workPlaceType.value,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    let copyDataWorkPlaceOptions = data.map((i) => ({ value: i.id, label: i.name }));
                    let newCopyData = copyDataContainer.map((item, i) => {
                        if (i === index) {
                            if (copyDataWorkPlaceOptions.length === 1) {
                                return {
                                    ...item,
                                    workPlaceType: workPlaceType,
                                    workPlaceOptions: copyDataWorkPlaceOptions,
                                    workPlace: copyDataWorkPlaceOptions[0],
                                };
                            } else {
                                return {
                                    ...item,
                                    workPlaceType: workPlaceType,
                                    workPlaceOptions: copyDataWorkPlaceOptions,
                                    workPlace: undefined
                                };
                            }
                        } else {
                            return {
                                ...item,
                                workPlaceOptions: copyDataWorkPlaceOptions,
                            }
                        }
                    });
                    setCopyDataContainer(newCopyData);
                });
            }
        });
    };

    const disabledDate = (current) => {
        // Can not select days before today
        return current && current > moment().startOf('day');
    };

    const handleChange = (name) => {
        switch (name){
            case 'country':
                setCompany()
                setCompanyOptions([]);
                setZone([]);
                setZoneOptions([])
                setCity([]);
                setCityOptions([]);
                setDistrict([]);
                setDistrictOptions([]);
                setWorkPlace();
                setWorkPlaceOptions([]);
                return;
            case 'company':
                setDistrict([]);
                setDistrictOptions([]);
                setWorkPlace();
                setWorkPlaceOptions([]);
                return;
            case 'zone': 
                setDistrict([]);
                setDistrictOptions([]);
                setWorkPlace();
                setWorkPlaceOptions([]);
                return;
            case 'district':
                setWorkPlace();
                setWorkPlaceOptions([]);
                return;
            case 'workPlaceType':
                setWorkPlace();
                setWorkPlaceOptions([]);
                return;
            default:
                break;
        }
    }

    return (
        <div>
            <Stepper
                            activeStep={modalTabValue}
                            alternativeLabel
                            connector={<QontoConnector />}
                            style={{ margin: '5px' }}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
                                            {t(label)}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

            {modalTabValue === 0 ? (
                <>
                    <div>
                        <SingleSelects
                            label={clientTypeName ? clientTypeName[0].headerName : 'client type'}
                            selectedItems={clientType}
                            setSelectedItems={setClientType}
                            options={clientTypeOptions}
                            width="100%"
                            isStar={true}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <NewInput
                                value={surname}
                                setValue={setSurname}
                                label="surname"
                                isStar={true}
                                placeholder="surname"
                                width="100%"
                            />
                        </div>
                        <div>
                            <NewInput
                                value={name}
                                setValue={setName}
                                label="name"
                                isStar={true}
                                placeholder="name"
                                width="100%"
                            />
                        </div>
                        <div>
                            <NewInput
                                value={middleName}
                                setValue={setMiddleName}
                                label="middle name"
                                placeholder="middle name"
                                width="100%"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <SingleSelects
                                label="specialization"
                                selectedItems={specialization}
                                setSelectedItems={setSpecialization}
                                options={specializationOptions}
                                width="217px"
                                isStar={true}
                            />
                        </div>
                        <div>
                            <SingleSelects
                                label="gender"
                                selectedItems={gender}
                                setSelectedItems={setGender}
                                options={genderOptions}
                                width="217px"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <label style={{ marginBottom: '2px' }}>{t('birthday')}</label>
                            <DatePicker
                                style={{
                                    width: '217px',
                                }}
                                onChange={onChangeDate}
                                placeholder={t('Select Date')}
                                disabledDate={disabledDate}
                                format="DD/MM/YYYY"
                                separator={
                                    <i
                                        style={{ color: '#c7c7c7', paddingTop: '3px' }}
                                        className="fas fa-arrow-right"></i>
                                }
                            />
                        </div>
                        <div>
                            <div>
                                <NewInput
                                    value={email}
                                    setValue={setEmail}
                                    label="e-mail"
                                    placeholder="e-mail"
                                    width="217px"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <NewInput
                                value={workPhone}
                                setValue={setWorkPhone}
                                label="work phone"
                                placeholder="work phone"
                                width="217px"
                            />
                        </div>
                        <div>
                            <NewInput
                                value={mobilePhone}
                                setValue={setMobilePhone}
                                label="mobile phone"
                                placeholder="mobile phone"
                                width="217px"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <SingleSelects
                                label="degree"
                                selectedItems={degree}
                                setSelectedItems={setDegree}
                                options={degreeOptions}
                                width="139.33px"
                            />
                        </div>
                        <div style={{ display: 'grid' }}>
                            <label></label>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    columnGap: '2px',
                                    marginTop: '2px',
                                }}>
                                <Checkbox onChange={(e) => setKeyOpinion(e.target.checked)} />
                                <label style={{whiteSpace: 'nowrap'}}>{t('Key Opinion Leader')}</label>
                            </div>
                        </div>
                        <div style={{ display: 'grid' }}>
                            <label></label>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    columnGap: '2px',
                                    marginTop: '2px',
                                }}>
                                <Checkbox onChange={(e) => setDecisionMaker(e.target.checked)} />
                                <label style={{whiteSpace: 'nowrap'}}>{t('Decision Maker')}</label>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <SingleSelects
                                label="country"
                                selectedItems={country}
                                setSelectedItems={setCountry}
                                options={countryOptions}
                                width="217px"
                                isStar={true}
                                handleChange={() => handleChange('country')}
                            />
                        </div>
                        <div>
                            <SingleSelects
                                label="company"
                                selectedItems={company}
                                setSelectedItems={setCompany}
                                options={companyOptions}
                                width="217px"
                                isStar={true}
                                handleChange={() => handleChange('company')}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <MultipleSelects
                                label="region"
                                selectedItems={region}
                                setSelectedItems={setRegion}
                                options={regionOptions}
                                width="217px"
                                isStar={true}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <MultipleSelects
                                label="area"
                                selectedItems={area}
                                setSelectedItems={setArea}
                                options={areaOptions}
                                width="217px"
                                isStar={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                        <div>
                            <MultipleSelects
                                label="zone"
                                selectedItems={zone}
                                setSelectedItems={setZone}
                                options={zoneOptions}
                                width="217px"
                                isStar={true}
                                handleChange={() => handleChange('zone')}
                            />
                        </div>
                        <div>
                            <MultipleSelects
                                label="city"
                                selectedItems={city}
                                setSelectedItems={setCity}
                                options={cityOptions}
                                width="217px"
                                isStar={true}
                                handleChange={() => handleChange('city')}
                            />
                        </div>
                    </div>
                    <div>
                        <MultipleSelects
                            label="district"
                            selectedItems={district}
                            setSelectedItems={setDistrict}
                            options={districtOptions}
                            width="100%"
                            isStar={true}
                            handleChange={() => handleChange('district')}
                        />
                    </div>
                    <hr />
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                        <div>
                            <SingleSelects
                                label={workPlaceTableHeader ? workPlaceTableHeader.pt.headerName : 'work place type'}
                                selectedItems={workPlaceType}
                                setSelectedItems={setWorkPlaceType}
                                options={workPlaceTypeOptions}
                                width="206px"
                                isStar={true}
                                handleChange={() => handleChange('workPlaceType')}
                            />
                        </div>
                        <div style={{marginLeft: '1rem'}}>
                            <SingleSelects
                                label={workPlaceTableHeader ? workPlaceTableHeader.pl.headerName : 'work place'}
                                selectedItems={workPlace}
                                setSelectedItems={setWorkPlace}
                                options={workPlaceOptions}
                                width="206px"
                                isStar={true}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                        <div>
                            <SingleSelects
                                label="category"
                                selectedItems={category}
                                setSelectedItems={setCategory}
                                options={categoryOptions}
                                width="206px"
                            />
                        </div>
                        <div style={{marginLeft: '1rem'}}>
                            <SingleSelects
                                label="position"
                                selectedItems={position}
                                setSelectedItems={setPosition}
                                options={positionOptions}
                                width="206px"
                                isStar={true}
                            />
                        </div>
                    </div>
                    {copyDataContainer.map((item, index) => (
                        <React.Fragment key={index}>
                            <hr />
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                                <div>
                                    <SingleSelects
                                        label={workPlaceTableHeader ? workPlaceTableHeader.pt.headerName : 'work place type'}
                                        selectedItems={item.workPlaceType}
                                        setSelectedItems={(value) => handleSetCopyData(index, 'workPlaceType', value)}
                                        options={workPlaceTypeOptions}
                                        width="206px"
                                        isStar={true}
                                    />
                                </div>
                                <div style={{marginLeft: '1rem'}}>
                                    <SingleSelects
                                        label={workPlaceTableHeader ? workPlaceTableHeader.pl.headerName : 'work place'}
                                        selectedItems={item.workPlace}
                                        setSelectedItems={(value) => handleSetCopyData(index, 'workPlace', value)}
                                        options={item.workPlaceOptions}
                                        width="206px"
                                        isStar={true}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <SingleSelects
                                        label="category"
                                        selectedItems={item.category}
                                        setSelectedItems={(value) => handleSetCopyData(index, 'category', value)}
                                        options={categoryOptions}
                                        width="206px"
                                    />
                                </div>
                                <div style={{marginLeft: '1rem'}}>
                                    <SingleSelects
                                        label="position"
                                        selectedItems={item.position}
                                        setSelectedItems={(value) => handleSetCopyData(index, 'position', value)}
                                        options={positionOptions}
                                        width="206px"
                                        isStar={true}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginLeft: '8px', alignSelf: 'end' }}>
                                    <button style={addDeleteButtonStyle} onClick={() => deleteCopyData()}>
                                        <i style={{fontSize: '14px'}} className="fa-solid fa-circle-minus"></i>
                                    </button>
                                </div>
                            </div>
                            
                        </React.Fragment>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', columnGap: '.5rem' }}>
                        <button style={addButtonStyle} onClick={() => addCopyData()}>
                            <i style={{color: '#44badc'}} class="fa-solid fa-circle-plus"></i>
                        </button>
                        <label style={{fontSize: '12px'}}>{t('add')}</label>
                    </div>
                </>
            )}

            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={message} />}

        </div>
    );
};

export default Body;
