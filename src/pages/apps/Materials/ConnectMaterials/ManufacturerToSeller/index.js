import React, { useState, useEffect } from 'react'
import MainTable from '../../../../../components/MainTable';
import { Dropdown, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import AddModal from './AddModal/AddModal';
import Delete from './Delete';

import Filter from '../Filter';
import Update from './UpdateModal/Update';

const ManufacturerToSeller = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [addModal, setAddModal] = useState(false);

  const [closeFilter, setCloseFilter] = useState(false);

  const [updateItem, setUpdateItem] = useState();
  const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

  const [deleteItem, setDeleteItem] = useState();
  const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);

  const [columns] = useState([
    { name: 'country', title: t('Country') },
    { name: 'seller', title: t('Seller') },
    { name: 'materialOrService', title: t('Material or Service') },
    { name: 'materialOrServiceType', title: t('Material or Service Type') },
    { name: 'modelOrForm', title: t('Model or Form') },
    { name: 'manufacturer', title: t('Manufacturer') },
    { name: 'technicalInfo', title: t('Technical Info') },
    { name: 'status', title: t('Status') },
    { name: 'actions', title: ' ' },
]);

const [columnWidths, setColumnWidths] = useState([
    { columnName: 'country', width: "8%" },
    { columnName: 'seller', width: "12%" },
    { columnName: 'materialOrService', width: "15%" },
    { columnName: 'materialOrServiceType', width: "14%" },
    { columnName: 'modelOrForm', width: "12%" },
    { columnName: 'manufacturer', width: "13%" },
    { columnName: 'technicalInfo', width: "12%" },
    { columnName: 'status', width: "7%" },
    { columnName: 'actions', width: "4%" },
]);

const [tableColumnExtensions] = useState([
    { columnName: 'country', width: 100 },
    { columnName: 'seller', width: 100 },
    { columnName: 'materialOrService', width: 100 },
    { columnName: 'materialOrServiceType', width: 100 },
    { columnName: 'modelOrForm', width: 100 },
    { columnName: 'manufacturer', width: 100 },
    { columnName: 'technicalInfo', width: 100 },
    { columnName: 'status', width: 100 },
    { columnName: 'actions', width: 100 },
]);

const itemsFromBackend = [
    { id: '1', isFreeze: false, content: 'Country', columnName: 'country', width: 100 },
    { id: '2', isFreeze: false, content: 'Seller', columnName: 'seller', width: 100 },
    { id: '3', isFreeze: false, content: 'Material or Service', columnName: 'materialOrService', width: 100 },
    { id: '4', isFreeze: false, content: 'Material or Service Type', columnName: 'materialOrServiceType', width: 100 },
    { id: '5', isFreeze: false, content: 'Model or Form', columnName: 'modelOrForm', width: 100 },
    { id: '6', isFreeze: false, content: 'Manufacturer', columnName: 'manufacturer', width: 100 },
    { id: '7', isFreeze: false, content: 'Technical Info', columnName: 'technicalInfo', width: 100 },
    { id: '8', isFreeze: false, content: 'Status', columnName: 'status', width: 100 },
];

const [groupByItems, setGroupByItems] = useState([
    { id: '0', isShow: true, columnName: 'country', content: t('Country') },
    { id: '1', isShow: true, columnName: 'seller', content: t('Seller') },
    { id: '2', isShow: true, columnName: 'materialOrService', content: t('Material or Service') },
    { id: '3', isShow: true, columnName: 'materialOrServiceType', content: t('Material or Service Type') },
    { id: '4', isShow: true, columnName: 'modelOrForm', content: t('Model or Form') },
    { id: '5', isShow: true, columnName: 'manufacturer', content: t('Manufacturer') },
    { id: '6', isShow: true, columnName: 'technicalInfo', content: t('Technical Info') },
    { id: '7', isShow: true, columnName: 'status', content: t('Status') },
]);

const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
    { isShow: true, name: 'country', title: t('Country') },
    { isShow: true, name: 'seller', title: t('Seller') },
    { isShow: true, name: 'materialOrService', title: t('Material or Service') },
    { isShow: true, name: 'materialOrServiceType', title: t('Material or Service Type') },
    { isShow: true, name: 'modelOrForm', title: t('Model or Form') },
    { isShow: true, name: 'manufacturer', title: t('Manufacturer') },
    { isShow: true, name: 'technicalInfo', title: t('Technical Info') },
    { isShow: true, name: 'status', title: t('Status') },
]);

const [totalSummaryItems, setTotalSummaryItems] = useState([
    { type: 'country', columnName: 'Country', width: 150 },
    { type: 'seller', columnName: 'Seller', width: 150 },
    { type: 'materialOrService', columnName: 'Material or Service', width: 150 },
    { type: 'materialOrServiceType', columnName: 'Material or Service Type', width: 150 },
    { type: 'modelOrForm', columnName: 'Model or Form', width: 150 },
    { type: 'manufacturer', columnName: 'Manufacturer', width: 150 },
    { type: 'technicalInfo', columnName: 'Technical Info', width: 150 },
    { type: 'status', columnName: 'Status', width: 150 },
    { type: 'actions', columnName: 'Actions', width: 150 },
]);

const [groupSummaryItems, setGroupSummaryItems] = useState([
    { type: 'count', columnName: 'country', width: 150 },
    { type: 'count', columnName: 'seller', width: 150 },
    { type: 'count', columnName: 'materialOrService', width: 150 },
    { type: 'count', columnName: 'materialOrServiceType', width: 150 },
    { type: 'count', columnName: 'modelOrForm', width: 150 },
    { type: 'count', columnName: 'manufacturer', width: 150 },
    { type: 'count', columnName: 'technicalInfo', width: 150 },
    { type: 'count', columnName: 'status', width: 150 },
    { type: 'count', columnName: 'actions', width: 150 },
]);

const [columnOrders, setColumnOrders] = useState(['country', 'seller', 'materialOrService', 'materialOrServiceType', 'modelOrForm', 'manufacturer', 'technicalInfo', 'status', 'actions']);

const [countryOptions, setCountryOptions] = useState([]);
const [selectedCountry, setSelectedCountry] = useState([]);
const [sellerOptions, setSellerOptions] = useState([]);
const [selectedSeller, setSelectedSeller] = useState([]);
const [materialOrServiceOptions, setMaterialOrServiceOptions] = useState([]);
const [selectedMaterialOrService, setSelectedMaterialOrService] = useState([]);
const [materialOrServiceTypeOptions, setMaterialOrServiceTypeOptions] = useState([]);
const [selectedMaterialOrServiceType, setSelectedMaterialOrServiceType] = useState([]);
const [modelOrFormOptions, setModelOrFormOptions] = useState([]);
const [selectedModelOrForm, setSelectedModelOrForm] = useState([]);
const [manufacturerOptions, setManufacturerOptions] = useState([]);
const [selectedManufacturer, setSelectedManufacturer] = useState([]);

const filterComponentsData = [
  { label: 'Country', options: countryOptions, state: selectedCountry, setState: setSelectedCountry },
  { label: 'Seller', options: sellerOptions, state: selectedSeller, setState: setSelectedSeller },
  { label: 'Material or Service', options: materialOrServiceOptions, state: selectedMaterialOrService, setState: setSelectedMaterialOrService },
  { label: 'Material or Service Type', options: materialOrServiceTypeOptions, state: selectedMaterialOrServiceType, setState: setSelectedMaterialOrServiceType },
  { label: 'Model or Form', options: modelOrFormOptions, state: selectedModelOrForm, setState: setSelectedModelOrForm },
  { label: 'Manufacturer', options: manufacturerOptions, state: selectedManufacturer, setState: setSelectedManufacturer }
]

useEffect(() => {
  FetchApiGet('api/OldSystem/GetAllCountries', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setSelectedCountry(data.map(c =>{
                        return { value: c.CountryId, label: c.CountryName }
                    }))
                    setCountryOptions(data.map(c =>{
                        return { value: c.CountryId, label: c.CountryName }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
}, [])

// seller 
useEffect(() => {
    const countryIds = selectedCountry.map(c => c.value);
    if(countryIds.length !== 0){
        FetchApiPost('services/Material/ManufacturerToSeller/GetSellersByCountryIds', 'POST', {
            countryIds: countryIds
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setSelectedSeller(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                    setSellerOptions(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                        
                    }
                )
            }
        })
    }else{
        setSelectedSeller([]);
        setSellerOptions([]);
        setSelectedMaterialOrService([]);
        setMaterialOrServiceOptions([]);
        setSelectedMaterialOrServiceType([]);
        setMaterialOrServiceTypeOptions([]);
        setSelectedModelOrForm([]);
        setModelOrFormOptions([]);
        setSelectedManufacturer([]);
        setManufacturerOptions([]);
    }
}, [selectedCountry])

// material or service
useEffect(() => {
    const sellerIds = selectedSeller.map(c => c.value);
    if(sellerIds.length !== 0){
        FetchApiPost('services/Material/ManufacturerToSeller/GetMaterialsBySellerIds', 'POST', {
            sellerIds: sellerIds
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setSelectedMaterialOrService(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                    setMaterialOrServiceOptions(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                })
            }
        })
    }else{
        setSelectedMaterialOrService([]);
        setMaterialOrServiceOptions([]);
        setSelectedMaterialOrServiceType([]);
        setMaterialOrServiceTypeOptions([]);
        setSelectedModelOrForm([]);
        setModelOrFormOptions([]);
        setSelectedManufacturer([]);
        setManufacturerOptions([]);
    }
}, [selectedSeller])

// material or service type
useEffect(() => {
    const materialOrServiceIds = selectedMaterialOrService.map(c => c.value);
    if(materialOrServiceIds.length !== 0){
        FetchApiPost('services/Material/ManufacturerToSeller/GetMaterialTypesByMaterialIds', 'POST', {
            materialIds: materialOrServiceIds
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setSelectedMaterialOrServiceType(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                    setMaterialOrServiceTypeOptions(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                })
            }
        })
    }else{
        setSelectedMaterialOrServiceType([]);
        setMaterialOrServiceTypeOptions([]);
        setSelectedModelOrForm([]);
        setModelOrFormOptions([]);
        setSelectedManufacturer([]);
        setManufacturerOptions([]);
    }
}, [selectedMaterialOrService])

// model or form
useEffect(() => {
    const materialOrServiceIds = selectedMaterialOrService.map(c => c.value);
    const materialOrServiceTypeIds = selectedMaterialOrServiceType.map(c => c.value);
    if(materialOrServiceIds.length !== 0 && materialOrServiceTypeIds.length !== 0){
        FetchApiPost('services/Material/ManufacturerToSeller/GetModelOrFormForFilter', 'POST', {
            materialIds: materialOrServiceIds,
            materialTypeIds: materialOrServiceTypeIds
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setSelectedModelOrForm(data.data.map((c, index) =>{
                        return { value: index, label: c }
                    }))
                    setModelOrFormOptions(data.data.map((c, index) =>{
                        return { value: index, label: c }
                    }))
                })
            }
        })
    }else{
        setSelectedModelOrForm([]);
        setModelOrFormOptions([]);
        setSelectedManufacturer([]);
        setManufacturerOptions([]);
    }
}, [selectedMaterialOrServiceType])

// manufacturer
useEffect(() => {
    const sellerIds = selectedSeller.map(c => c.value);
    const materialOrServiceIds = selectedMaterialOrService.map(c => c.value);
    const materialOrServiceTypeIds = selectedMaterialOrServiceType.map(c => c.value);
    const modalOrFormLabels = selectedModelOrForm.map(c => c.label);
    if(materialOrServiceIds.length !== 0 && materialOrServiceTypeIds.length !== 0){
        FetchApiPost('services/Material/ManufacturerToSeller/GetManufacturerForFilter', 'POST', {
            sellerIds: sellerIds,
            materialIds: materialOrServiceIds,
            materialTypeIds: materialOrServiceTypeIds,
            modelOrForms: modalOrFormLabels
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setSelectedManufacturer(data.data.map((c) =>{
                        return { value: c.id, label: c.name }
                    }))
                    setManufacturerOptions(data.data.map((c) =>{
                        return { value: c.id, label: c.name }
                    }))
                })
            }
        })
    }else{
        setSelectedManufacturer([]);
        setManufacturerOptions([]);
    }
}, [selectedModelOrForm])


const [filterData, setFilterData] = useState([]);

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

const statusOptions = [
    { id: 0, value: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
    {
        id: 1,
        value: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    }
];

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

const handleChangeValidCheck = (e, id) => {
    console.log(e.target.checked)
    FetchApiPost('services/Material/ManufacturerToSeller/StatusChangeManufacturerToSeller', 'POST', {
        id: id,
        validStatus: e.target.checked,
        modifiedBy: localStorage.getItem('userName')
    })
    let newData = filterData.map((item, index) => {
        if(item.id === id){
            item.validStatus = e.target.checked
        }
        return item
    })
    setFilterData(newData)
}

  const tableData = filterData.map((el, index) => ({
    id: el.id,
    country: el.country,
    seller: el.sellerName,
    materialOrService: el.materialOrServices.name,
    materialOrServiceType: el.materialOrServicesType.name,
    modelOrForm: el.modelOrForm,
    manufacturer: el.manufacturer,
    manufacturerMainTypeId: el.manufacturerMainTypeId,
    technicalInfo: el.materialOrServices.technicalInfo,
    status: <div style={{display: 'grid', placeItems: 'center'}}>
      <Form.Check type="switch" id={index*15} defaultValue={el.validStatus} value={el.validStatus} checked={el.validStatus} style={{fontSize: '1.05rem'}} onChange={(e) => handleChangeValidCheck(e, el.id)}  />
    </div>,
    actions: action[index].content
  }))

  console.log("filterData",filterData)

    const handleAddModal = () => {
        setAddModal(true);
    }

    const getAllFilterData = () => {
        const data = {
            sellerIds: selectedSeller.map(c => c.value),
            materialOrServicesIds: selectedMaterialOrService.map(c => c.value),
            materialOrServicesTypeIds: selectedMaterialOrServiceType.map(c => c.value),
            modelOrForms: selectedModelOrForm.map(c => c.label),
            manufacturerIds: selectedManufacturer.map(c => c.value)
        }

        FetchApiPost('services/Material/ManufacturerToSeller/GetAllManufacturerToSeller', 'POST', {
            ...data,
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterData(data.data)
                    setCloseFilter(true);
                })
            }
        })
      }

      const deleteFilter = () => {
        setSelectedCountry([]);
        setSelectedSeller([]);
        setSellerOptions([]);
        setSelectedMaterialOrService([]);
        setMaterialOrServiceOptions([]);
        setSelectedMaterialOrServiceType([]);
        setMaterialOrServiceTypeOptions([]);
        setSelectedModelOrForm([]);
        setModelOrFormOptions([]);
        setSelectedManufacturer([]);
        setManufacturerOptions([]);
    }

    const handleUpdate = (data) => {
        // setFilterData(filterData.map((el) => (el.id === data.id ? data : el)));
    }

  return (
    <>
         <div id="disadvantage-table">
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
                isFilters={true}
                setCloseFilter={setCloseFilter}
                closeFilter={closeFilter}
                filters={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        getAllFilterData={getAllFilterData}
                        deleteFilter={deleteFilter}
                        setCloseFilter={setCloseFilter}
                    />
                }
            />
        </div>

        {
            addModal && (
                <AddModal 
                    isShow={addModal}
                    setIsShow={setAddModal}
                    setFilterData={setFilterData}
                    getAllFilterData={getAllFilterData}
                    filterData={filterData}
                />
            )
        }

        {
            updateModalIsShow && (
                <Update handleUpdate={handleUpdate} selectedValue={updateItem} isShow={updateModalIsShow} setIsShow={setUpdateModalIsShow} setFilterData={setFilterData} filterData={filterData} />
            )
        }

        {
            deleteModalIsShow && (
                <Delete 
                    modalShow={deleteModalIsShow}
                    setModalShow={setDeleteModalIsShow}
                    selectedValue={deleteItem}
                    filterData={filterData}
                    setFilterData={setFilterData}
                />
            )
        }

    </>
  )
}

export default ManufacturerToSeller