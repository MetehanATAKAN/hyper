import React, { useState, useEffect } from 'react'
import MainTable from '../../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import '../../../../../assets/scss/custom/components/pageList.scss';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import DeleteModal from '../DeleteModal';
import Update from './Update';
import PharmacySplitPercentProblem from '../../../../../components/Modals/PharmacySplitPercentProblem';

const Type = ({ handleAddModal, handleAddModalStatus, setHandleAddModalStatus }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [filterData, setFilterData] = useState([]);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    useEffect(() => {
        if(handleAddModalStatus.clickAdd === true && handleAddModalStatus.tabName === 'Type'){
            setFilterData(prev => [handleAddModalStatus.item, ...prev])
            setHandleAddModalStatus({clickAdd: false, tabName: '', item: null})
        }
    }, [handleAddModalStatus])

    const [columns] = useState([
        { name: 'type', title: t('Type') },
        { name: 'description', title: t('Description') },
        { name: 'actions', title: ' ' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'type', width: "48%" },
        { columnName: 'description', width: "48%" },
        { columnName: 'actions', width: "4%" },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'type', width: 150 },
        { columnName: 'description', width: 150 },
        { columnName: 'actions', width: 150 },
    ]);

    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Type', columnName: 'type', width: 100 },
        { id: '2', isFreeze: false, content: 'Description', columnName: 'description', width: 100 }
    ];

    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'type', content: t('Type') },
        { id: '1', isShow: true, columnName: 'description', content: t('Description') }
    ]);

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'type', title: t('Type') },
        { isShow: true, name: 'description', title: t('Description') }
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'type', columnName: 'Type', width: 150 },
        { type: 'description', columnName: 'Description', width: 150 },
        { type: 'actions', columnName: 'Actions', width: 150 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'type', width: 150 },
        { type: 'count', columnName: 'description', width: 150 },
        { type: 'count', columnName: 'actions', width: 150 },
    ]);

    const [columnOrders, setColumnOrders] = useState(['type', 'description', 'actions']);

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
        type: item.name,
        description: item.description,
        actions: action[index].content
    }))

    useEffect(() => {
        FetchApiPost('services/Material/MaterialType/GetAllMaterialType', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setFilterData(data.data)
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
    }, [history])

    const handleClickDeleteButton = () => {
        FetchApiPost('services/Material/MaterialType/DeleteMaterialType', 'POST', {
            materialTypeId: deleteItem.id,
            modifiedBy: localStorage.getItem('userName')
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    const newFilterData = filterData.filter(item => item.id !== deleteItem.id)
                    setFilterData(newFilterData); 
                    setDeleteModalIsShow(false)
                })
            }else{
                res.json().then(err => {
                    setShowErrorModal(true)
                    setErrorModalMessage('It is not possible to delete it because it is connected to the company.')
                })
            }
        })
    }

    const handleUpdate = (name, description) => {
        FetchApiPost('services/Material/MaterialType/UpdateMaterialType', 'POST', {
            id: updateItem.id,
            name: name,
            description: description,
            modifiedBy: localStorage.getItem('userName')
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
                isFilters={false}
            />
    </div>

        {
            deleteModalIsShow && (
                <DeleteModal modalShow={deleteModalIsShow} setModalShow={setDeleteModalIsShow} handleClickDeleteButton={handleClickDeleteButton} selectedValue={deleteItem} />
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
    </>
  )
}

export default Type