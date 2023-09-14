import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from '../../../../components/Filter';
import TableLayout from '../../../../components/Tables/TableAccordion';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import Dropdowns from '../../../../components/Dropdowns';
import AddModal from './AddModal/AddModal';
import EditModal from './EditModal/EditModal';
import Delete from './Delete';
import PreferredTime from './PreferredTime/PreferredModal';
import { Form } from 'react-bootstrap';
import WorkingTime from './WorkingTime/WorkingTime';

import ViewModal from './ViewModal';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { Paper, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const Client = () => {
    const { t } = useTranslation();
    const history = useHistory();

    /*
    <ToggleButton color="success" id={el.value} value="A" aria-label="A">
                                                A
                                            </ToggleButton>
    */

                                        //     <StyledToggleButtonGroup
                                        //     color="primary"
                                        //     size="medium"
                                        //     value={el.category}
                                        //     onChange={handleFormat}>
                                        //     <ToggleButton color="success" id={el.value} value="A" aria-label="A">
                                        //         A
                                        //     </ToggleButton>
                                        //     <ToggleButton color="warning" id={el.value} value="B" aria-label="B">
                                        //         B
                                        //     </ToggleButton>
                                        //     <ToggleButton color="error" id={el.value} value="C" aria-label="C">
                                        //         C
                                        //     </ToggleButton>
                                        // </StyledToggleButtonGroup>


// const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
//     '& .MuiToggleButtonGroup-grouped': {
//         margin: theme.spacing(0.5),
//         border: 0,
//         '&.Mui-disabled': {
//             border: 0,
//         },
//         '&:not(:first-of-type)': {
//             borderRadius: theme.shape.borderRadius,
//         },
//         '&:first-of-type': {
//             borderRadius: theme.shape.borderRadius,
//         },
//     },
// }));



    const [filterShow, setFilterShow] = useState(true);
    const [selectedItem, setSelectedItem] = useState();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [clientTypeName, setClientTypeName] = useState();

    const [preferredModal, setPreferredModal] = useState(false);
    const [workingModal, setWorkingModal] = useState(false);

    const [filterData, setFilterData] = useState([])
    const [tableData, setTableData] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const [viewModal, setViewModal] = useState(false);

    const statusOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
        {
            id: 1,
            key: 'View',
            icon: <i style={{ marginRight: '8px' }} className="fa-regular fa-eye"></i>,
            color: '#6C757D',
        },
    ]

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        let workPlaceItem = filterData.find((x) => x.id === Number(itemId));
        setSelectedItem(workPlaceItem);

        switch (statusId) {
            case 0:
                setShowDeleteModal(true);
                break;
            case 9:
                setShowEditModal(true);
                break;
            case 1:
                setViewModal(true);
                break;
            default:
                break;
        }
    };

    const getRemainingDayforBirthday = (date) => {
        let day = Number(date.split("/")[0])
        let month = Number(date.split("/")[1])
        let year = Number(date.split("/")[2])

        const thisYear = new Date().getFullYear();
        // let d = new Date();
        // if (d.getMonth() + 1 > birthMonth || (d.getMonth() + 1 == birthMonth && d.getDate() + 1 > birthDate)) {
        // nextYear = new Date().getFullYear() + 1;
        // }
        // console.log("date", date , Math.floor((new Date(thisYear, month - 1, day) - new Date()) / (1000 * 60 * 60 * 24)) )
        // console.log(new Date().setHours(0,0,0,0))
        // console.log(new Date().getFullYear())
        let styles = {}
        let result = Math.floor((new Date(thisYear, month - 1, day) - new Date()) / (1000 * 60 * 60 * 24))
        
        if(result === -1){
            styles = {
                backgroundColor: 'rgba(10, 207, 151, 0.15)',
                color: 'rgb(10, 207, 151)',
                borderRadius: '3px'
            }
        }else if ((result < 30 && result > -1) || result === 30){
            styles = {
                backgroundColor: 'rgba(253, 126, 20, 0.15)',
                color: 'rgb(253, 126, 20)',
                borderRadius: '3px'
            }
        }else{
            styles = {
                backgroundColor: 'rgba(108, 117, 125,0.15)',
                color: 'rgb(108, 117, 125)',
                borderRadius: '3px'
            }
        }

        return styles
    }

    const columns = [
        {
            header: t('Valid'),
            accessorKey: 'valid',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                if(row.originalSubRows){
                    return (
                        <Form.Check
                        type="switch"
                        checked={cell.getValue()}
                        // onChange={() => changeValidStatus(row.original, cell.getValue())}
                    />
                    )
                }else{
                    return (
                        <></>
                    )
                }
            }
        },
        {
            header: t('ID'),
            accessorKey: 'id',
        },
        {
            header: t('Owner Company'),
            accessorKey: 'ownerCompany',
        },
        {
            header: clientTypeName ? clientTypeName[0].headerName : t('Client Type'),
            accessorKey: 'clientType',
        },
        {
            header: t('Name'),
            accessorKey: 'name',
        },
        {
            header: t('Surname'),
            accessorKey: 'surname',
        },
        {
            header: t('Middle Name'),
            accessorKey: 'middleName',
        },
        {
            header: t('Work Place Name'),
            accessorKey: 'wpName',
            size: '275',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Specialization'),
            accessorKey: 'specialization',
        },
        {
            header: t('Category'),
            accessorKey: 'category',
            muiTableBodyCellProps: {
                align: 'center',
            },
            size: '130',
            Cell: ({ cell }) => {
                if(cell.getValue()){
                    return (
                        <span
                                    style={{
                                        backgroundColor:
                                        cell.getValue() === 'A'
                                                    ? 'rgba(10, 207, 151, 0.15)'
                                                    : cell.getValue() === 'B'
                                                    ? 'rgba(253, 126, 20, 0.15)'
                                                    : cell.getValue() === 'C'
                                                    ? 'rgba(250, 92, 124,0.15)'
                                                    : 'rgba(10, 207, 151, 0.15)'
                                               ,
                                        color:
                                        
                                        cell.getValue() === 'A'
                                                    ? 'rgb(10, 207, 151)'
                                                    : cell.getValue() === 'B'
                                                    ? 'rgb(253, 126, 20)'
                                                    : cell.getValue() === 'C'
                                                    ? 'rgb(250, 92, 124)'
                                                    : 'rgb(10, 207, 151)'
                                                ,
                                        padding: '2px 4px',
                                        borderRadius: '3px',
                                    }}>
                                    {cell.getValue()}
                                </span>
            
                    )
                }else{
                    return <></>
                }
            }
                
        },
        {
            header: t('Degree'),
            accessorKey: 'degree',
        },
        {
            header: t('KOL'),
            accessorKey: 'kol',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                if(row.originalSubRows){
                    return (
                        <Form.Check
                        type="switch"
                        checked={cell.getValue()}
                        // onChange={() => changeValidStatus(row.original, cell.getValue())}
                    />
                    )
                }else{
                    return (
                        <></>
                    )
                }
            }
        },
        {
            header: t('Decision Maker'),
            accessorKey: 'decisionMaker',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                if(row.originalSubRows){
                    return (
                        <Form.Check
                        type="switch"
                        checked={cell.getValue()}
                        // onChange={() => changeValidStatus(row.original, cell.getValue())}
                    />
                    )
                }else{
                    return (
                        <></>
                    )
                }
            }
        },
        {
            header: t('WP'),
            accessorKey: 'wp',
        },
        {
            header: t('Country'), // hide ----------------------------
            accessorKey: 'country', 
        },
        {
            header: t('City'),
            accessorKey: 'city',
        },
        {
            header: t('District'),
            accessorKey: 'district',
        },
        {
            header: t('Address'),
            accessorKey: 'address',
        },
        {
            header: t('Region'),
            accessorKey: 'region',
        },
        {
            header: t('Area'),
            accessorKey: 'area',
        },
        {
            header: t('Zone'),
            accessorKey: 'zone', // hide ----------------------------
        },
        { // 	255, 192, 203  (0, 128, 254)
            header: t('Gender'),
            accessorKey: 'gender',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell }) => {
                if(cell.getValue() === "Male"){
                    return (
                        <div style={{color: 'rgb(0, 128, 254)', backgroundColor: 'rgba(0, 128, 254, .15)', borderRadius: '3px'}}>
                            {
                                cell.getValue()
                            }
                        </div>
                    )
                }else if(cell.getValue() === 'Female'){
                    return (
                        <div style={{color: 'rgb(219,112,147)', backgroundColor: 'rgba(219,112,147, .15)', borderRadius: '3px'}}>
                            {
                                cell.getValue()
                            }
                        </div>
                    )
                }else{
                    return ""
                }
            }
        },
        {
            header: t('Work Phone'),
            accessorKey: 'workPhone',
        },
        {
            header: t('Mobile Phone'),
            accessorKey: 'mobilePhone',
        },
        {
            header: t('Birthday'),
            accessorKey: 'birthday',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell }) => {
                console.log(cell.getValue())
                if(cell.getValue() === "" || !cell.getValue()){
                    return ""
                }else{
                    console.log(cell.getValue(),getRemainingDayforBirthday(cell.getValue()))
                    return (
                        <div style={getRemainingDayforBirthday(cell.getValue())}>
                            {cell.getValue()}
                        </div>
                        
                    )
                }
                
            }
        },
        {
            header: t('Email'),
            accessorKey: 'email',
        },
        {
            header: t('Working Time'),
            accessorKey: 'workingTime',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ row }) => {
                if(row.originalSubRows){
                    return <></>
                }else{
                    return (
                        <button style={{border: 'none', background: 'none'}} onClick={() => (setPreferredModal(true), findData(row))}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    )
                }
            }
        },
        {
            header: t('Preferred Time'),
            accessorKey: 'referredTime',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ row }) => {
                if(row.originalSubRows){
                    return <></>
                }else{
                    return (
                        <button style={{border: 'none', background: 'none'}} onClick={() => (setWorkingModal(true), findData(row))}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    )
                }
            }
            
        },
        {
            header: t('Chaine Type'),
            accessorKey: 'chaineType',
        },
        {
            header: '',
            accessorKey: 'action',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell: ({ cell, row }) => {
                if(row.originalSubRows){
                    return (
                        <Dropdowns
                            item={`?${row.original.id}`}
                            option={statusOptions}
                            onClick={statusClick}
                        />
                    )
                }else{
                    return (
                        <></>
                    )
                }
                
            }
        }
    ];

    const [selectedItemForTimes, setSelectedItemForTimes] = useState();
    const findData = (row) => {
        let data;
            filterData.map(c => {
                c.workPlaces.map(w => {
                    if(row.original.id === w.id){
                        data = { client: c, workPlace: w}
                        return;
                    }
                })
            })

        // seçilmiş olan saat için yeni state oluştur onu at !! bu daha yapılmadı ekle
        setSelectedItemForTimes(data)
    }

    const [clientType, setClientType] = useState([]);
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [country, setCountry] = useState();
    const [countryOptions, setCountryOptions] = useState([]);

    const [company, setCompany] = useState();
    const [companyOptions, setCompanyOptions] = useState([]);

    const [region, setRegion] = useState([]);
    const [regionOptions, setRegionOptions] = useState([]);

    const [zone, setZone] = useState([]);
    const [zoneOptions, setZoneOptions] = useState([]);

    const [city, setCity] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const [specialization, setSpecialization] = useState([]);
    const [specializationOptions, setSpecializationOptions] = useState([]);

    const [category, setCategory] = useState([
        {
            value: 0,
            label: 'A'
        },
        {
            value: 1,
            label: 'B'
        },
        {
            value: 2,
            label: 'C'
        }
    ]);
    const [categoryOptions, setCategoryOptions] = useState([
        {
            value: 0,
            label: 'A'
        },
        {
            value: 1,
            label: 'B'
        },
        {
            value: 2,
            label: 'C'
        }
    ]);

    const [validStatus, setValidStatus] = useState([
        { value: 0, label: t('Valid') },
        { value: 1, label: t('Not Valid') },
    ]);
    const [validStatusOptions, setValidStatusOptions] = useState([
        { value: 0, label: t('Valid') },
        { value: 1, label: t('Not Valid') },
    ]);

    const filterComponentsData = [
        {
            label: clientTypeName ? clientTypeName[0].headerName : t('client type'),
            type: 'multiselect',
            state: clientType,
            setState: setClientType,
            options: clientTypeOptions,
        },
        {
            label: t('country'),
            type: 'singleselect',
            state: country,
            setState: setCountry,
            options: countryOptions,
        },
        {
            label: t('company'),
            type: 'singleselect',
            state: company,
            setState: setCompany,
            options: companyOptions,
        },
        {
            label: t('region'),
            type: 'multiSelect',
            state: region,
            setState: setRegion,
            options: regionOptions,
        },
        {
            label: t('zone'),
            type: 'multiSelect',
            state: zone,
            setState: setZone,
            options: zoneOptions,
        },
        {
            label: t('city'),
            type: 'multiSelect',
            state: city,
            setState: setCity,
            options: cityOptions,
        },
        {
            label: t('specialization'),
            type: 'multiselect',
            state: specialization,
            setState: setSpecialization,
            options: specializationOptions
        },
        {
            label: t('category'),
            type: 'multiselect',
            state: category,
            setState: setCategory,
            options: categoryOptions
        },
        {
            label: t('valid status'),
            type: 'multiSelect',
            state: validStatus,
            setState: setValidStatus,
            options: validStatusOptions,
        }
    ];

    const handleGetDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const getFilterData = () => {
        if(clientType.length === 0 || !country || !company || zone.length === 0
             || city.length === 0 || validStatus.length === 0 
             || specialization.length === 0 || category.length === 0) return;
        const body = {
            clientTypeIds: clientType.map(c => c.value),
            countryIds: [country.value],
            companyIds: [company.value],
            zoneIds: zone.map(z => z.value),
            cityIds: city.map(c => c.value),
            specIds: specialization.map(s => s.value),
            categories: category.map(c => c.label),
            validStatuses: validStatus.length === 2
            ? [true, false]
            : validStatus[0].value === 1
            ? [false]
            : [true]
        }
        setLoader(true)
        FetchApiPost('services/CRM/Client/GetAllClientForApply', 'POST', body)
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setLoader(false)
                        setFilterData(data);
                        setFilterShow(false);
                        setTableData(data?.map((item, index) => ({
                            id: item.id,
                            valid: item.validStatus,
                            ownerCompany: item.company ? item.company.companyName : '',
                            clientType: item.clientType.definationName,
                            name: item.name,
                            surname: item.surname,
                            middleName: item.middleName,
                            specialization: item.specialization ? item.specialization.specName : '',
                            category: item.workPlaces[item.workPlaces.length -1]?.category,
                            zone: item.workPlaces[item.workPlaces.length -1]?.zone?.name,
                            degree: item.degreeId === 1 ? 'Male' : 'Female',
                            kol: item.keyOpinionLeader,
                            decisionMaker: item.decisionMaker,
                            country: item.country.countryName,
                            region: '',
                            area: '',
                            gender: item.gender,
                            workPhone: item.workPhone,
                            mobilePhone: item.mobilePhone,
                            birthday: item.birthday === "1000-10-10T10:10:10" ? "" : handleGetDate(item.birthday),
                            email: item.email,
                            workingTime: '',
                            referredTime: '',
                            chaineType: '',
                            wpName: item.workPlaces[0].name,
                            subRows: item.workPlaces.map(workPlaceItem => ({
                                id: workPlaceItem.id,
                                zone: workPlaceItem.zone.name ?? '',
                                wp: '',
                                wpName: '',
                                address: workPlaceItem.adress,
                                city: workPlaceItem.city ? workPlaceItem.city.cityName : '',
                                district: workPlaceItem.district ?? '',
                                validStatus: workPlaceItem.validStatus,
                                id: workPlaceItem.id,
                                ownerCompany: workPlaceItem.ownerCompany.companyName,
                                name: workPlaceItem.name,
                                category: workPlaceItem.category,
                                country: workPlaceItem.country.countryName
                            }))
                        })))
                    })
                }
            })

    }


    useEffect(() => {
        setLoader(true)
        FetchApiGet('api/OldSystem/GetAllSpecs', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSpecializationOptions(data.map((item) => ({ label: item.SpecName, value: item.SpecId })));
                    setSpecialization(data.map((item) => ({ label: item.SpecName, value: item.SpecId })));
                    setLoader(false)
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setSpecialization();
                setSpecializationOptions([]);
                setLoader(false)
            }
        });
    }, [history]);

    useEffect(() => {
        setLoader(true);
        FetchApiGet(`api/OldSystem/GetAllCountriesList/${Number(localStorage.getItem('userEmpId'))}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setCountryOptions(data.map((item) => ({ label: item.CountryName, value: item.CountryId })));
                    setCountry({ label: data[0].CountryName, value: data[0].CountryId });
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setCountryOptions([]);
                setCountry();
                setLoader(false);
            }
        });
    }, [history]);

    useEffect(() => {
        if(country){
            setLoader(true);
        FetchApiPost('api/OldSystem/GetCompaniesByCountryIds', 'POST', {
            countrIds: [country.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setCompanyOptions(data.map(item => ({label: item.CompanyName, value: item.CompanyId})))
                    setCompany({label: data[0].CompanyName, value: data[0].CompanyId})
                    setLoader(false)
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500')
            }else{
                setCompanyOptions([])
                setCompany()
                setLoader(false)
            }
        })
        }else{
            setCompanyOptions([])
            setCompany()
            setLoader(false)
        }
    }, [country])

    useEffect(() => {
        if(!country){
            setZoneOptions([])
            setZone([])
            return;
        }
        setLoader(true);
        FetchApiPost('api/OldSystem/GetZoneListByCountryIds', 'POST', {
            empId: Number(localStorage.getItem('userEmpId')),
            ids: [country.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setZoneOptions(data.map(item => ({label: item.Name, value: item.Id})))
                    setZone(data.map(item => ({label: item.Name, value: item.Id})))
                    setLoader(false)
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500')
            }else{
                setZoneOptions([])
                setZone([])
                setLoader(false)
            }
        })
    }, [country])

    useEffect(() => {
        if(!country){
            setCityOptions([]);
                setCity([]);
                return ;
        }
        FetchApiPost('services/CRM/City/GetCitiesByCountryIds', 'POST', {
            countryIds: [country.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    let cities = data.filter(item => item !== null)
                    setCityOptions([ {value: 0, label: 'N/A'}, ...cities.map(item => ({ label: item.cityName, value: item.id }))])
                    setCity([ {value: 0, label: 'N/A'}, ...cities.map(item => ({ label: item.cityName, value: item.id }))])
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500');
            }else{
                setCityOptions([]);
                setCity([]);
            }
        })
    }, [country])

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

    useEffect(() => {
        if(!clientTypeName) return;
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
            countryId: Number(localStorage.getItem('countryId')),
            id: clientTypeName[0].id
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setClientTypeOptions(data.map(item => ({ value: item.definationId !== 0 ? item.definationId : item.id, label: item.definationName})))
                    setClientType(data.map(item => ({ value: item.definationId !== 0 ? item.definationId : item.id, label: item.definationName})))
                })
            }
        })
    }, [clientTypeName])

    const deleteFilter = () => {
        setClientType([]);
        setCountry()
        setCompany()
        setCompanyOptions([]);
        setZone([])
        setZoneOptions([]);
        setCity([]);
        setCityOptions([]);
        setValidStatus([]);
    }

  return (
    <div>
        <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={true}
                handleApprovalBtn={false}
                isHasStatus={false}
                columnPinningRight={['action']}
                handleNewButton={() => setShowAddModal(true)}
                isLoading={loader}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                handlApplyBtn={getFilterData}
                handlClearBtn={deleteFilter}
                columnVisibility={{id: false}}
                pageSize="100"
                filter={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        isFilterBtn={false}
                    />
                }
            />

            {
                showAddModal && (
                    <AddModal 
                        show={showAddModal}
                        setShow={setShowAddModal}
                        getFilterData={getFilterData}
                        clientTypeName={clientTypeName}
                    />
                )
            }

            {
                showEditModal && (
                    <EditModal 
                        show={showEditModal}
                        setShow={setShowEditModal}
                        selectedItem={selectedItem}
                        clientTypeName={clientTypeName}
                    />
                )
            }

            {
                showDeleteModal && (
                    <Delete 
                        modalShow={showDeleteModal}
                        setModalShow={setShowDeleteModal}
                        item={selectedItem}
                    />
                )
            }

            {
                preferredModal && (
                    <PreferredTime 
                        show={preferredModal}
                        setShow={setPreferredModal}
                        selectedItem={selectedItemForTimes}
                        getFilterData={getFilterData}
                    />
                )
            }

            {
                workingModal && (
                    <WorkingTime 
                        show={workingModal}
                        setShow={setWorkingModal}
                        selectedItem={selectedItemForTimes}
                        getFilterData={getFilterData}
                    />
                )
            }

            {
                viewModal && (
                    <ViewModal 
                        show={viewModal}
                        setShow={setViewModal}
                        selectedItem={selectedItem}
                    />
                )
            }
    </div>
  )
}

export default Client