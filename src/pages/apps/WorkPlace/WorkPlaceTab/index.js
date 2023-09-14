import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from '../../../../components/Filter';
// import TableLayout from '../../../../components/Tables/TableAccordion';
import TableLayout from '../../../../components/Tables';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import WorkPlaceAddModal from './WorkPlaceAddModal/WorkPlaceAddModal';
// import ClientAddModal from './ClientAddModal/ClientAddModal';
// import WorkPlaceViewModal from './WorkPlaceViewModal/WorkPlaceViewModal';
import { useHistory } from 'react-router-dom';
import EditWorkPlace from './EditWorkPlace/EditWorkPlace';
import Dropdowns from '../../../../components/Dropdowns';
import DeleteModal from './Delete';
import { Form } from 'react-bootstrap';
import ViewModal from './ViewModal';

const WorkPlaceTab = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [filterShow, setFilterShow] = useState(true);

    const [viewModal, setViewModal] = useState(false);

    const [workPlaceAddModal, setWorkPlaceAddModal] = useState(false);
    const [clientAddModal, setClientAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [filterData, setFilterData] = useState([]);

    const [infoModal, setInfoModal] = useState(false);

    const [tableHeader, setTableHeader] = useState();

    const [tableData, setTableData] = useState([]);

    const [selectedItem, setSelectedItem] = useState();

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

    const changeValidStatus = (item, valid) => {
        let selectedItem = filterData.filter(x => x.id === item.id)[0];
        const body = {
            id: selectedItem.id,
            definationId1: selectedItem.defination1.definationId === 0 ? selectedItem.defination1.id : selectedItem.defination1.definationId,
            definationId2: selectedItem.defination2.definationId === 0 ? selectedItem.defination2.id : selectedItem.defination2.definationId,
            definationId3: selectedItem.defination3.definationId === 0 ? selectedItem.defination3.id : selectedItem.defination3.definationId,
            zoneId: selectedItem.zone.id,
            name: selectedItem.name,
            countryId: selectedItem.country.countryId,
            cityId: selectedItem.city.id,
            district: selectedItem.district,
            uniqeId: selectedItem.uniqeId,
            postCode: selectedItem.postCode,
            adress: selectedItem.adress,
            ownerCompanyId: selectedItem.ownerCompany.companyId,
            responsiblePerson: selectedItem.responsiblePerson,
            responsiblePersonPhone: selectedItem.responsiblePersonPhone,
            personalQuantity: selectedItem.personalQuantity,
            bedNumber: selectedItem.bedNumber,
            modifiedBy: localStorage.getItem('userName'),
            validStatus: !valid
        }
        FetchApiPost('services/CRM/WorkPlace/UpdateWorkPlace', 'POST', body)
            .then(res => {
                if(res.status === 201){
                    getFilterData();
                }else if(res.status === 500 || res.status === 502){
                    history.push('/error-500');
                }
            })
    }
    const columns = [
        {
            header: t('ID'),
            accessorKey: 'id',
        },
        {
            header: t('Uniq ID'),
            accessorKey: 'uniqId',
        },
        {
            header: t('Owner Company'),
            accessorKey: 'ownerCompany',
        },
        {
            header: tableHeader?.pl ? tableHeader.pl.headerName : t('Place'),
            accessorKey: 'place',
        },
        {
            header: tableHeader?.pt ? tableHeader.pt.headerName : t('Place Type'),
            accessorKey: 'placeType',
        },
        {
            header: tableHeader?.tp ? tableHeader.tp.headerName : t('Types of Priporty'),
            accessorKey: 'typesOfPriporty',
        },
        {
            header: t('Name'),
            accessorKey: 'name',
        },
        {
            header: t('Country'),
            accessorKey: 'country',
        },
        {
            header: t('Zone'),
            accessorKey: 'zone'
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
            header: t('Adress'),
            accessorKey: 'adress',
        },
        {
            header: t('Post Code'),
            accessorKey: 'postCode',
        },
        {
            header: t('Responsible Person'),
            accessorKey: 'responsiblePerson',
        },
        {
            header: t('Responsible Phone'),
            accessorKey: 'rpPhone',
        },
        {
            header: t('Personel Quantity'),
            accessorKey: 'personelQuantity',
        },
        {
            header: t('Bed Number'),
            accessorKey: 'bedNumber',
        },
        {
            header: t('Create Date'),
            accessorKey: 'createDate',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Valid'),
            accessorKey: 'valid',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => (
                <Form.Check
                    type="switch"
                    checked={cell.getValue()}
                    onChange={() => changeValidStatus(row.original, cell.getValue())}
                />
            )
        },
        // {
        //     id: 'Work Place',
        //     header: t('Work Place'),

        //     columns: [
        //         {
        //             header: t('View'),
        //             accessorKey: 'view',
        //             muiTableBodyCellProps: {
        //                 align: 'center',
        //             },
        //             Cell: ({ cell }) => (
        //                 <button
        //                     style={{ border: 'none', background: 'transparent' }}
        //                     onClick={() => setInfoModal(true)}>
        //                     <Icon path={mdiPencilBoxOutline} size={0.85} />
        //                 </button>
        //             ),
        //         },
        //     ],
        // },
        // {
        //     id: 'Workers',
        //     header: t('Client'),
        //     columns: [
        //         {
        //             header: t('View'),
        //             accessorKey: 'view',
        //             muiTableBodyCellProps: {
        //                 align: 'center',
        //             },
        //             Cell: ({ cell }) => (
        //                 <button
        //                     style={{ border: 'none', background: 'transparent' }}
        //                     onClick={() => setClientAddModal(true)}>
        //                     <Icon path={mdiPencilBoxOutline} size={0.85} />
        //                 </button>
        //             ),
        //         },
        //     ],
        // },
        {
            header: '',
            accessorKey: 'action',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell: ({ cell, row }) => {
                return (
                    <Dropdowns
                        item={`?${row.original.id}`}
                        option={statusOptions}
                        onClick={statusClick}
                    />
                )
            }
        }
    ];

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

    const [place, setPlace] = useState([]);
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [typesOfPriporty, setTypesOfPriporty] = useState([]);
    const [typesOfPriportyOptions, setTypesOfPriportyOptions] = useState([]);

    const [country, setCountry] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);

    const [company, setCompany] = useState([]);
    const [companyOptions, setCompanyOptions] = useState([]);

    const [zone, setZone] = useState([]);
    const [zoneOptions, setZoneOptions] = useState([]);

    const [city, setCity] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

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
            label: tableHeader?.pl ? tableHeader.pl.headerName : t('place'),
            type: 'multiselect',
            state: place,
            setState: setPlace,
            options: placeOptions,
            size: 1,
        },
        {
            label: tableHeader?.pt ? tableHeader.pt.headerName : t('place type'),
            type: 'multiselect',
            state: placeType,
            setState: setPlaceType,
            options: placeTypeOptions,
            size: 1,
        },
        {
            label: tableHeader?.tp ? tableHeader.tp.headerName : t('types of priporty'),
            type: 'multiselect',
            state: typesOfPriporty,
            setState: setTypesOfPriporty,
            options: typesOfPriportyOptions,
            size: 1,
        },
        {
            label: t('country'),
            type: 'multiselect',
            state: country,
            setState: setCountry,
            options: countryOptions,
            size: 2,
        },
        {
            label: t('company'),
            type: 'multiselect',
            state: company,
            setState: setCompany,
            options: companyOptions,
            size: 2,
        },
        {
            label: t('zone'),
            type: 'multiselect',
            state: zone,
            setState: setZone,
            options: zoneOptions,
            size: 2,
        },
        {
            label: t('city'),
            type: 'multiselect',
            state: city,
            setState: setCity,
            options: cityOptions,
            size: 2,
        },
        {
            label: t('valid status'),
            type: 'multiselect',
            state: validStatus,
            setState: setValidStatus,
            options: validStatusOptions,
            size: 1,
        },
    ];

    const handleGetDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const getFilterData = () => {
        if(place.length === 0 || placeType.length === 0 || country.length === 0 || company.length === 0 || zone.length === 0 || city.length === 0 || validStatus.length === 0)
            return;
        setLoader(true);
        const body = {
            placeDefinationIds: place.map((item) => item.value),
            placeTypeDefinationIds: placeType.map((item) => item.value),
            countryIds: country.map((item) => item.value),
            companyIds: company.map((item) => item.value),
            zoneIds: zone.map((item) => item.value),
            cityIds: city.map((item) => item.value),
            validStatuses: validStatus.length === 2
            ? [true, false]
            : validStatus[0].value === 1
            ? [false]
            : [true],
            empId: Number(localStorage.getItem('userEmpId'))
        }

        FetchApiPost('services/CRM/WorkPlace/GetAllWorkPlaceForTableApply', 'POST', body)
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setFilterData(data);
                        setTableData(data.map(item => {
                            return {
                                id: item.id,
                                uniqId: item.uniqeId,
                                ownerCompany: item?.ownerCompany?.companyName ?? 'null',
                                place: item.defination1.definationName,
                                placeType: item.defination2.definationName,
                                typesOfPriporty: item.defination3.definationName,
                                name: item.name,
                                country: item.country.countryName,
                                zone: item.zone.name,
                                city: item.city ? item.city.cityName : '',
                                district: item.district,
                                adress: item.adress,
                                postCode: item.postCode,
                                responsiblePerson: item.responsiblePerson,
                                rpPhone: item.responsiblePersonPhone,
                                personelQuantity: item.personalQuantity,
                                bedNumber: item.bedNumber,
                                createDate: handleGetDate(item.createdDate),
                                valid: item.validStatus
                            }
                        }))
                        setLoader(false);
                    })
                }
            })
    };

    const deleteFilter = () => {
        setPlace([]);
        setPlaceType([]);
        setTypesOfPriporty([]);
        setCountry([]);
        setCompany([]);
        setCompanyOptions([]);
        setZone([]);
        setZoneOptions([]);
        setCity([]);
        setCityOptions([]);
        setValidStatus([]);
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
        setLoader(true);
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
                    setTableHeader(arr);
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setTableHeader();
                setLoader(false);
            }
        });
    }, [history, companyId]);

    useEffect(() => {
        if (tableHeader) {
            setLoader(true);
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: tableHeader?.pl?.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        setPlace(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        setLoader(false);
                    });
                }
            });

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: tableHeader?.pt?.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPlaceTypeOptions(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        setPlaceType(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        setLoader(false);
                    });
                }
            });

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: tableHeader?.tp?.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setTypesOfPriportyOptions(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        setTypesOfPriporty(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        setLoader(false);
                    });
                }
            });
        }
    }, [tableHeader]);

    useEffect(() => {
        setLoader(true);
        FetchApiGet(`api/OldSystem/GetAllCountriesList/${Number(localStorage.getItem('userEmpId'))}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setCountryOptions(data.map((item) => ({ label: item.CountryName, value: item.CountryId })));
                    setCountry(data.map((item) => ({ label: item.CountryName, value: item.CountryId })));
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setCountryOptions([]);
                setCountry([]);
                setLoader(false);
            }
        });
    }, [history]);

    // Country yeni api
    useEffect(() => {
        if(country.length > 0){
            setLoader(true);
        FetchApiPost('api/OldSystem/GetCompaniesByCountryIds', 'POST', {
            countrIds: country.map(item => item.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setCompanyOptions(data.map(item => ({label: item.CompanyName, value: item.CompanyId})))
                    setCompany(data.map(item => ({label: item.CompanyName, value: item.CompanyId})))
                    setLoader(false)
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500')
            }else{
                setCompanyOptions([])
                setCompany([])
                setLoader(false)
            }
        })
        }else{
            setCompanyOptions([])
            setCompany([])
            setLoader(false);
        }
    }, [country])

    useEffect(() => {
        if(country.length === 0){
            setZoneOptions([])
            setZone([])
            return;
        }
        setLoader(true);
        FetchApiPost('api/OldSystem/GetZoneListByCountryIds', 'POST', {
            empId: Number(localStorage.getItem('userEmpId')),
            ids: country.map(item => item.value)
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
        if(country.length === 0){
            setCityOptions([]);
                setCity([]);
                return ;
        }
        FetchApiPost('services/CRM/City/GetCitiesByCountryIds', 'POST', {
            countryIds: country.map(i => i.value)
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
    
    const handleDeleteBtn = (ids) => {
        setShowDeleteModal(true);
        setSelectedItem(ids);
    }

    return (
        <div>
            <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={false}
                isCheckBox={false}
                // handleDropDownItemClick={statusClick}
                // dropdownOptions={statusOptions}
                columnPinningRight={['action']}
                handleNewButton={() => setWorkPlaceAddModal(true)}
                isLoading={loader}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                handlApplyBtn={getFilterData}
                handlClearBtn={deleteFilter}
                handleDeleteBtn={handleDeleteBtn}
                pageSize="100"
                filter={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        isFilterBtn={false}
                    />
                }
            />

            {workPlaceAddModal && (
                <WorkPlaceAddModal
                    show={workPlaceAddModal}
                    setShow={setWorkPlaceAddModal}
                    tableHeader={tableHeader}
                    getFilterData={getFilterData}
                    country={country}
                    zone={zone}
                />
            )}
{/* 
            {clientAddModal && <ClientAddModal show={clientAddModal} setShow={setClientAddModal} />}

            {infoModal && <WorkPlaceViewModal show={infoModal} setShow={setInfoModal} />} */}

            {showEditModal && (
                <EditWorkPlace
                    show={showEditModal}
                    setShow={setShowEditModal}
                    getFilterData={getFilterData}
                    tableHeader={tableHeader}
                    selectedItem={selectedItem}
                />
            )}

            {
                showDeleteModal && 
                    <DeleteModal 
                        modalShow={showDeleteModal}
                        setModalShow={setShowDeleteModal}
                        item={selectedItem}
                        getFilterData={getFilterData}
                    />
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
    );
};

export default WorkPlaceTab;