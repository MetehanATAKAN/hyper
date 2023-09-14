import React, { useState, useEffect, useCallback, useMemo } from 'react'
import MainTable from '../../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import '../../../../../assets/scss/custom/components/pageList.scss';
import Filter from './Filter';
import '../../../../../assets/scss/custom/budget/budgetTab.scss';
import DeleteModal from '../DeleteModal';
import Update from './Update';
import { useHistory } from 'react-router-dom';
import PharmacySplitPercentProblem from '../../../../../components/Modals/PharmacySplitPercentProblem';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

const Companies = ({ handleAddModal, handleAddModalStatus, setHandleAddModalStatus }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('')

    const [closeFilter, setCloseFilter] = useState(false);

    const [filterData, setFilterData] = useState([]);

    const [filterCountry, setFilterCountry] = useState([]);
    const [filterCountryOptions, setFilterCountryOptions] = useState([])
    const [filterCity, setFilterCity] = useState([]);
    const [filterCityOptions, setFilterCityOptions] = useState([])
    const [filterMainType, setFilterMainType] = useState([]);
    const [filterMainTypeOptions, setFilterMainTypeOptions] = useState([])
    const [filterType, setFilterType] = useState([]);
    const [filterTypeOptions, setFilterTypeOptions] = useState([])
    const [filterAssetsType, setFilterAssetsType] = useState([]);
    const [filterAssetsTypeOptions, setFilterAssetsTypeOptions] = useState([])
    const [filterDutiesType, setFilterDutiesType] = useState([]);
    const [filterDutiesTypeOptions, setFilterDutiesTypeOptions] = useState([])
    const [filterMaterialUsage, setFilterMaterialUsage] = useState([]);
    const [filterMaterialUsageOptions, setFilterMaterialUsageOptions] = useState([])

    const filterComponentsData = [
        { label: 'Country', options: filterCountryOptions, state: filterCountry, setState: setFilterCountry },
        // { label: 'City', options: filterCityOptions, state: filterCity, setState: setFilterCity },
        { label: 'Main Type', options: filterMainTypeOptions, state: filterMainType, setState: setFilterMainType },
        { label: 'Type', options: filterTypeOptions, state: filterType, setState: setFilterType },
        { label: 'Assets Type', options: filterAssetsTypeOptions, state: filterAssetsType, setState: setFilterAssetsType },
        { label: 'Duties Type', options: filterDutiesTypeOptions, state: filterDutiesType, setState: setFilterDutiesType },
        { label: 'Material Usage', options: filterMaterialUsageOptions, state: filterMaterialUsage, setState: setFilterMaterialUsage }
    ];

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllCountries', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterCountryOptions(data.map(c =>{
                        return { id: c.CountryId, title: c.CountryName }
                    }))
                    setFilterCountry(data.map(c =>{
                        return { id: c.CountryId, value: c.CountryName, label: c.CountryName }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
        FetchApiGet('services/Material/MainType/GetAllMainType', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterMainTypeOptions(data.data.map(m => {
                        return { id: m.id, title: m.name }
                    }))
                    setFilterMainType(data.data.map(m => {
                        return { id: m.id, value: m.name, label: m.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
        FetchApiGet('services/Material/MaterialType/GetAllMaterialType', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterTypeOptions(data.data.map(m => {
                        return { id: m.id, title: m.name }
                    }))
                    setFilterType(data.data.map(m => {
                        return { id: m.id, value: m.name, label: m.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })

        FetchApiGet('services/Material/AssetsType/GetAllAssetsType', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterAssetsTypeOptions(data.data.map(m => {
                        return { id: m.id, title: m.name }
                    }))
                    setFilterAssetsType(data.data.map(m => {
                        return { id: m.id, value: m.name, label: m.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })


            FetchApiGet('services/Material/DutiesType/GetAllDutiesType', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setFilterDutiesTypeOptions(data.data.map(m => {
                            return { id: m.id, title: m.name }
                        }))
                        setFilterDutiesType(data.data.map(m => {
                            return { id: m.id, value: m.name, label: m.name }
                        }))
                    })
                } else if(res.status === 500){
                    history.push('/error-500');
                }
            })

        FetchApiGet('services/Material/Facility/GetAllFacility', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterMaterialUsageOptions(data.data.map(m => {
                        return { id: m.id, title: m.name }
                    }))
                    setFilterMaterialUsage(data.data.map(m => {
                        return { id: m.id, value: m.name, label: m.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })

    }, [history])

    const deleteFilter = () => {
        setFilterCountry([]);
        setFilterCity([]);
        setFilterMainType([]);
        setFilterType([]);
        setFilterAssetsType([]);
        setFilterDutiesType([]);
        setFilterMaterialUsage([]);
    }

    const applyFilter = () => {
        const countryIds = filterCountry.map(c => c.id);
        const mainTypeIds = filterMainType.map(c => c.id);
        const typeIds = filterType.map(c => c.id);
        const assetsTypeIds = filterAssetsType.map(c => c.id);
        const dutiesTypeIds = filterDutiesType.map(c => c.id);
        const materialUsageIds = filterMaterialUsage.map(c => c.id);
        FetchApiPost('services/Material/Company/GetAllCompany', 'POST', {
            countryIds: countryIds,
            mainTypeIds: mainTypeIds,
            typeIds: typeIds,
            assetsTypeIds: assetsTypeIds,
            dutiesTypeIds: dutiesTypeIds,
            facilityIds: materialUsageIds
        })
        .then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setFilterData(data.data)
                ))
            }
        })
        setCloseFilter(true);
    }

    // useEffect(() => {
        // if(filterCountryOptions.length !== 0 && filterCountry.length === 0){
        //     setFilterCountry([])
        //     setFilterMainType([])
        //     setFilterType([])
        //     setFilterAssetsType([])
        //     setFilterDutiesType([])
        //     setFilterMaterialUsage([])
        // }else if (filterMainTypeOptions.length !== 0 && filterMainType.length === 0){
        //     setFilterMainType([])
        //     setFilterType([])
        //     setFilterAssetsType([])
        //     setFilterDutiesType([])
        //     setFilterMaterialUsage([])
        // }else if (filterTypeOptions.length !== 0 && filterType.length === 0){
        //     setFilterType([])
        //     setFilterAssetsType([])
        //     setFilterDutiesType([])
        //     setFilterMaterialUsage([])
        // }else if(filterAssetsTypeOptions.length !== 0 && filterAssetsType.length === 0){
        //     setFilterAssetsType([])
        //     setFilterDutiesType([])
        //     setFilterMaterialUsage([])
        // }else if(filterDutiesTypeOptions.length !== 0 && filterDutiesType.length === 0){
        //     setFilterDutiesType([])
        //     setFilterMaterialUsage([])
        // }
    // }, [filterCountry, filterMainType, filterType, filterAssetsType, filterDutiesType])

    const [columns] = useState([
        { name: 'organizationName', title: t('Organization Name') },
        { name: 'country', title: t('Country') },
        { name: 'city', title: t('City') },
        { name: 'organizationAddress', title: t('Organization Address') },
        { name: 'zipNumber', title: t('ZIP Number') },
        { name: 'contactPerson', title: t('Contact Person') },
        { name: 'contactPhone', title: t('Contact Phone') },
        { name: 'contactEmail', title: t('Contact E-mail') },
        { name: 'companyRegNo', title: t('Company reg. no') },
        { name: 'taxNumber', title: t('Tax Number') },
        { name: 'vatNumber', title: t('VAT Number') },
        { name: 'mainType', title: t('Main Type') },
        { name: 'type', title: t('Type') },
        { name: 'assetsType', title: t('Assets Type') },
        { name: 'dutiesType', title: t('Duties Type') },
        { name: 'materialUsage', title: t('Material Usage Facility') },
        { name: 'actions', title: ' ' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'organizationName', width: "10%" },
        { columnName: 'country', width: "10%" },
        { columnName: 'city', width: "10%" },
        { columnName: 'organizationAddress', width: "10%" },
        { columnName: 'zipNumber', width: "10%" },
        { columnName: 'contactPerson', width: "10%" },
        { columnName: 'contactPhone', width: "10%" },
        { columnName: 'contactEmail', width: "10%" },
        { columnName: 'companyRegNo', width: "10%" },
        { columnName: 'taxNumber', width: "10%" },
        { columnName: 'vatNumber', width: "10%" },
        { columnName: 'mainType', width: "10%" },
        { columnName: 'type', width: "10%" },
        { columnName: 'assetsType', width: "10%" },
        { columnName: 'dutiesType', width: "10%" },
        { columnName: 'materialUsage', width: "10%" },
        { columnName: 'actions', width: "4%" },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'organizationName', width: 150 },
        { columnName: 'country', width: 150 },
        { columnName: 'city', width: 150 },
        { columnName: 'organizationAddress', width: 150 },
        { columnName: 'zipNumber', width: 150 },
        { columnName: 'contactPerson', width: 150 },
        { columnName: 'contactPhone', width: 150 },
        { columnName: 'contactEmail', width: 150 },
        { columnName: 'companyRegNo', width: 150 },
        { columnName: 'taxNumber', width: 150 },
        { columnName: 'vatNumber', width: 150 },
        { columnName: 'mainType', width: 150 },
        { columnName: 'type', width: 150 },
        { columnName: 'assetsType', width: 150 },
        { columnName: 'dutiesType', width: 150 },
        { columnName: 'materialUsage', width: 150 },
        { columnName: 'actions', width: 150 },
    ]);

    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Organization Name', columnName: 'organizationName', width: 100 },
        { id: '2', isFreeze: false, content: 'Country', columnName: 'country', width: 100 },
        { id: '3', isFreeze: false, content: 'City', columnName: 'city', width: 100 },
        { id: '4', isFreeze: false, content: 'Organization Address', columnName: 'organizationAddress', width: 100 },
        { id: '5', isFreeze: false, content: 'ZIP Number', columnName: 'zipNumber', width: 100 },
        { id: '6', isFreeze: false, content: 'Contact Person', columnName: 'contactPerson', width: 100 },
        { id: '7', isFreeze: false, content: 'Contact Phone', columnName: 'contactPhone', width: 100 },
        { id: '8', isFreeze: false, content: 'Contact E-mail', columnName: 'contactEmail', width: 100 },
        { id: '9', isFreeze: false, content: 'Company reg. no', columnName: 'companyRegNo', width: 100 },
        { id: '10', isFreeze: false, content: 'Tax Number', columnName: 'taxNumber', width: 100 },
        { id: '11', isFreeze: false, content: 'VAT Number', columnName: 'vatNumber', width: 100 },
        { id: '12', isFreeze: false, content: 'Main Type', columnName: 'mainType', width: 100 },
        { id: '13', isFreeze: false, content: 'Type', columnName: 'type', width: 100 },
        { id: '14', isFreeze: false, content: 'Assets Type', columnName: 'assetsType', width: 100 },
        { id: '15', isFreeze: false, content: 'Duties Type', columnName: 'dutiesType', width: 100 },
        { id: '16', isFreeze: false, content: 'Material Usage Facility', columnName: 'materialUsage', width: 100 },
    ];

    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'organizationName', content: t('Organization Name') },
        { id: '1', isShow: true, columnName: 'country', content: t('Country') },
        { id: '2', isShow: true, columnName: 'city', content: t('City') },
        { id: '3', isShow: true, columnName: 'organizationAddress', content: t('Organization Address') },
        { id: '4', isShow: true, columnName: 'zipNumber', content: t('ZIP Number') },
        { id: '5', isShow: true, columnName: 'contactPerson', content: t('Contact Person') },
        { id: '6', isShow: true, columnName: 'contactPhone', content: t('Contact Phone') },
        { id: '7', isShow: true, columnName: 'contactEmail', content: t('Contact E-mail') },
        { id: '8', isShow: true, columnName: 'companyRegNo', content: t('Company reg. no') },
        { id: '9', isShow: true, columnName: 'taxNumber', content: t('Tax Number') },
        { id: '10', isShow: true, columnName: 'vatNumber', content: t('VAT Number') },
        { id: '11', isShow: true, columnName: 'mainType', content: t('Main Type') },
        { id: '12', isShow: true, columnName: 'type', content: t('Type') },
        { id: '13', isShow: true, columnName: 'assetsType', content: t('Assets Type') },
        { id: '14', isShow: true, columnName: 'dutiesType', content: t('Duties Type') },
        { id: '15', isShow: true, columnName: 'materialUsage', content: t('Material Usage Facility') },
    ]);

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'organizationName', title: t('Organization Name') },
        { isShow: true, name: 'country', title: t('Country') },
        { isShow: true, name: 'city', title: t('City') },
        { isShow: true, name: 'organizationAddress', title: t('Organization Address') },
        { isShow: true, name: 'zipNumber', title: t('ZIP Number') },
        { isShow: true, name: 'contactPerson', title: t('Contact Person') },
        { isShow: true, name: 'contactPhone', title: t('Contact Phone') },
        { isShow: true, name: 'contactEmail', title: t('Contact E-mail') },
        { isShow: true, name: 'companyRegNo', title: t('Company reg. no') },
        { isShow: true, name: 'taxNumber', title: t('Tax Number') },
        { isShow: true, name: 'vatNumber', title: t('VAT Number') },
        { isShow: true, name: 'mainType', title: t('Main Type') },
        { isShow: true, name: 'type', title: t('Type') },
        { isShow: true, name: 'assetsType', title: t('Assets Type') },
        { isShow: true, name: 'dutiesType', title: t('Duties Type') },
        { isShow: true, name: 'materialUsage', title: t('Material Usage Facility') },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'organizationName', columnName: 'Organization Name', width: 150 },
        { type: 'country', columnName: 'Country', width: 150 },
        { type: 'city', columnName: 'City', width: 150 },
        { type: 'organizationAddress', columnName: 'Organization Address', width: 150 },
        { type: 'zipNumber', columnName: 'ZIP Number', width: 150 },
        { type: 'contactPerson', columnName: 'Contact Person', width: 150 },
        { type: 'contactPhone', columnName: 'Contact Phone', width: 150 },
        { type: 'contactEmail', columnName: 'Contact E-mail', width: 150 },
        { type: 'companyRegNo', columnName: 'Company reg. no', width: 150 },
        { type: 'taxNumber', columnName: 'Tax Number', width: 150 },
        { type: 'vatNumber', columnName: 'VAT Number', width: 150 },
        { type: 'mainType', columnName: 'Main Type', width: 150 },
        { type: 'type', columnName: 'Type', width: 150 },
        { type: 'assetsType', columnName: 'Assets Type', width: 150 },
        { type: 'dutiesType', columnName: 'Duties Type', width: 150 },
        { type: 'materialUsage', columnName: 'Material Usage Facility', width: 150 },
        { type: 'actions', columnName: 'Actions', width: 150 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'organizationName', width: 150 },
        { type: 'count', columnName: 'country', width: 150 },
        { type: 'count', columnName: 'city', width: 150 },
        { type: 'count', columnName: 'organizationAddress', width: 150 },
        { type: 'count', columnName: 'zipNumber', width: 150 },
        { type: 'count', columnName: 'contactPerson', width: 150 },
        { type: 'count', columnName: 'contactPhone', width: 150 },
        { type: 'count', columnName: 'contactEmail', width: 150 },
        { type: 'count', columnName: 'companyRegNo', width: 150 },
        { type: 'count', columnName: 'taxNumber', width: 150 },
        { type: 'count', columnName: 'vatNumber', width: 150 },
        { type: 'count', columnName: 'mainType', width: 150 },
        { type: 'count', columnName: 'type', width: 150 },
        { type: 'count', columnName: 'assetsType', width: 150 },
        { type: 'count', columnName: 'dutiesType', width: 150 },
        { type: 'count', columnName: 'materialUsage', width: 150 },
        { type: 'count', columnName: 'actions', width: 150 },
    ]);

    const [columnOrders, setColumnOrders] = useState(['organizationName', 'country', 'city', 'organizationAddress', 'zipNumber', 'contactPerson', 'contactPhone', 'contactEmail', 'companyRegNo', 'taxNumber', 'vatNumber', 'mainType', 'type', 'assetsType', 'dutiesType', 'materialUsage', 'actions']);

    const statusOptions = [
        { id: 0, value: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
        {
            id: 1,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        }
    ];

    const dropDownItemClick = (e) => {
        const ids = e.target.id.split(' ');
        const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));

        if (selectedStatus.value === 'Edit') {
            const item = filterData.find((el) => el.id === Number(ids[0]));
            setUpdateItem(item);
            setUpdateModalIsShow(true);
        }
        if (selectedStatus.value === 'Delete') {
            const item = filterData.find((el) => el.id === Number(ids[0]));
            setDeleteItem(item);
            setDeleteModalIsShow(true);
        }
    };

    const action = filterData.map((el, i) => ({
        id: el.id,
        content: (
            <span className="table-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {
                            statusOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 1 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        ),
    }));


    const tableData = filterData.map((item, index) => ({
        id: item.id,
        organizationName: item.name,
        country: item.countryName,
        city: item.cityName,
        organizationAddress: item.organizationAddress,
        zipNumber: item.zipNumber,
        contactPerson: item.contactPerson,
        contactPhone: item.contactPhone,
        contactEmail: item.contactEmail,
        companyRegNo: item.companyRegistrationNumber,
        taxNumber: item.taxNumber,
        vatNumber: item.vatNumber,
        mainType: item.mainTypeNames,
        type: item.typeNames,
        assetsType: item.assetsTypeNames,
        dutiesType: item.dutiesTypeNames,
        materialUsage: item.facilityNames,
        actions: action[index].content
    }))

    const handleClickDeleteButton = () => {
        FetchApiPost('services/Material/Company/DeleteCompany', 'POST', {
            companyId: deleteItem.id,
            modifiedBy: localStorage.getItem('userName')
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    const newFilterData = filterData.filter(item => item.id !== deleteItem.id)
                    setFilterData(newFilterData); 
                    setDeleteModalIsShow(false)
                })
            }else{
                    setShowErrorModal(true)
                    setErrorModalMessage('It is not possible to delete it because it is connected to the agreement.')
            }
        })
    }

    const handleUpdate = (data) => {
        FetchApiPost('services/Material/Company/UpdateCompany', 'POST', {
            ...data
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterData(filterData.map(item => {
                        if(item.id === updateItem.id){
                            return data.data
                        } else {
                            return item;
                        }
                    }))
                })
                setUpdateModalIsShow(false);
            }else{
                res.json().then(err => {
                    setShowErrorModal(true)
                    setErrorModalMessage(err.errors[0])
                    console.log(err.errors[0])
                })
            }
        })
    }
    
    const handleErrorModal = () => {
        setShowErrorModal(false);
        setErrorModalMessage('')
    }

    

  return (
    <div id="disadvantage-table" >
        <MainTable 
                tableData={tableData}
                columns={columns}
                columnWidths={columnWidths}
                setColumnWidths={setColumnWidths}
                tableColumnExtensions={tableColumnExtensions}
                itemsFromBackend={itemsFromBackend}
                columnOrders={columnOrders}
                setColumnOrders={setColumnOrders}
                disableFreeze={true}
                groupByItems={groupByItems}
                setGroupByItems={setGroupByItems}
                showorHideColumnsItems={showorHideColumnsItems}
                totalSummaryItems={totalSummaryItems}
                groupSummaryItems={groupSummaryItems}
                addButtonFunction={handleAddModal}
                isAddButton={true}
                setCloseFilter={setCloseFilter}
                closeFilter={closeFilter}
                filters={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        applyFilter={applyFilter}
                        setCloseFilter={setCloseFilter}
                        deleteFilter={deleteFilter}
                    />
                }
                isFilters={true}
            />

        {
            deleteModalIsShow && (
                <DeleteModal modalShow={deleteModalIsShow} setModalShow={setDeleteModalIsShow} handleClickDeleteButton={handleClickDeleteButton} selectedValue={deleteItem}/>
            )
        }
        {
            updateModalIsShow && (
                <Update handleUpdate={handleUpdate} selectedValue={updateItem} isShow={updateModalIsShow} setIsShow={setUpdateModalIsShow} />
            )
        }
        {
            showErrorModal && (
                <PharmacySplitPercentProblem messages={errorModalMessage} show={showErrorModal} handleClose={handleErrorModal} />
            )
        }
    </div>
  )
}

export default Companies