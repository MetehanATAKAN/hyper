import React, { useEffect, useState } from 'react'
import MainTable from '../../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import AddModal from './AddModal/AddModal';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import Filter from './Filter';
import { mdiEyeOutline } from '@mdi/js';
import Icon from '@mdi/react'
import 'antd/dist/antd.css';
import UpdateModal from './UpdateModal/UpdateModal';
import { Dropdown } from 'react-bootstrap';
import Dropdowns from '../../../../../components/Dropdowns';
import Delete from './Delete';

const PositionLevels = () => {
    const { t } = useTranslation();
    const [closeFilter, setCloseFilter] = useState(false);

    const [isShow, setIsShow] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);


    const [filterData, setFilterData] = useState([]);

    const [columns] = useState([
        { name: 'position', title: t('Position') },
        { name: 'levelName', title: t('Level Name') },
        { name: 'comment', title: t('Comment') },
        { name: 'rank', title: t('Rank') },
        { name: 'score', title: t('Score') },
        { name: 'rangeI', title: t('Range I') },
        { name: 'rangeII', title: t('Range II') },
        { name: 'detail', title: t('Detail') },
        { name: 'actions', title: ' ' },
      ]);
    
    
      //Export Columns
      const [exportColumns] = useState([
        { name: 'position', title: t('Position') },
        { name: 'levelName', title: t('Level Name') },
        { name: 'comment', title: t('Comment') },
        { name: 'rank', title: t('Rank') },
        { name: 'score', title: t('Score') },
        { name: 'rangeI', title: t('Range I') },
        { name: 'rangeII', title: t('Range II') },
        { name: 'detail', title: t('Detail') },
    ])
    
      // Table Columns Resizing Width
      const [columnWidths, setColumnWidths] = useState([
        { columnName: 'position', width: '14%' },
        { columnName: 'levelName', width: '12%' },
        { columnName: 'comment', width: '14%' },
        { columnName: 'rank', width: '10%'},
        { columnName: 'score', width: '10%' },
        { columnName: 'rangeI', width: '10%' },
        { columnName: 'rangeII', width: '10%' },
        { columnName: 'detail', width: '13%' },
        { columnName: 'actions', width: '4%' },
      ]);
    
      //Table Column Reordering
      const [tableColumnExtensions] = useState([
        { columnName: 'position', width: '15%' },
        { columnName: 'levelName', width: '15%' },
        { columnName: 'comment', width: '15%' },
        { columnName: 'rank', width: '15%' },
        { columnName: 'score', width: '15%' },
        { columnName: 'rangeI', width: '15%' },
        { columnName: 'rangeII', width: '15%' },
        { columnName: 'detail', width: '15%' },
        { columnName: 'actions', width: '5%' },
      ]);
    
      //Freeze Columns
      const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Position', columnName: 'position', width: 150 },
        { id: '2', isFreeze: false, content: 'Level Name', columnName: 'levelName', width: 150 },
        { id: '3', isFreeze: false, content: 'Comment', columnName: 'comment', width: 150 },
        { id: '4', isFreeze: false, content: 'Rank', columnName: 'rank', width: 150 },
        { id: '5', isFreeze: false, content: 'Score', columnName: 'score', width: 150 },
        { id: '6', isFreeze: false, content: 'Range I', columnName: 'rangeI', width: 150 },
        { id: '7', isFreeze: false, content: 'Range II', columnName: 'rangeII', width: 150 },
        { id: '8', isFreeze: false, content: 'Detail', columnName: 'detail', width: 150 },
      ];
    
      // Table show or hide items
      const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'position', title: 'Position' },
        { isShow: true, name: 'levelName', title: 'Level Name' },
        { isShow: true, name: 'comment', title: 'Comment' },
        { isShow: true, name: 'rank', title: 'Rank' },
        { isShow: true, name: 'score', title: 'Score' },
        { isShow: true, name: 'rangeI', title: 'Range I' },
        { isShow: true, name: 'rangeII', title: 'Range II' },
        { isShow: true, name: 'detail', title: 'Detail' },
      ])
    
      // Group By Items
      const [groupByItems, setGroupByItems] = useState([
        { id:'0',isShow: true, content: 'Position', columnName: 'position' },
        { id:'1',isShow: true, content: 'Level Name', columnName: 'levelName' },
        { id:'2',isShow: true, content: 'Comment', columnName: 'comment' },
        { id:'3',isShow: true, content: 'Rank', columnName: 'rank' },
        { id:'4',isShow: true, content: 'Score', columnName: 'score' },
        { id:'5',isShow: true, content: 'Range I', columnName: 'rangeI' },
        { id:'6',isShow: true, content: 'Range II', columnName: 'rangeII' },
        { id:'7',isShow: true, content: 'Detail', columnName: 'detail' },
      ])
    
      // Summary
      const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'position', width: 150 },
        { type: 'count', columnName: 'levelName', width: 150 },
        { type: 'count', columnName: 'comment', width: 150 },
        { type: 'count', columnName: 'rank', width: 150 },
        { type: 'count', columnName: 'score', width: 150 },
        { type: 'count', columnName: 'rangeI', width: 150 },
        { type: 'count', columnName: 'rangeII', width: 150 },
        { type: 'count', columnName: 'detail', width: 150 },
      ])
    
      const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'position', width: 150 },
        { type: 'count', columnName: 'levelName', width: 150 },
        { type: 'count', columnName: 'comment', width: 150 },
        { type: 'count', columnName: 'rank', width: 150 },
        { type: 'count', columnName: 'score', width: 150 },
        { type: 'count', columnName: 'rangeI', width: 150 },
        { type: 'count', columnName: 'rangeII', width: 150 },
        { type: 'count', columnName: 'detail', width: 150 },
      ])
      
      const [columnOrders, setColumnOrders] = useState(['position', 'levelName', 'comment', 'rank', 'score', 'rangeI', 'rangeII', 'detail' ,'actions']);

      const positionModal = () => {
        setIsShow(true);
      }

      const [departmentOptions, setDepartmentOptions] = useState([]);
      const [selectedDepartment, setSelectedDepartment] = useState([]);

      const [positionOptions, setPositionOptions] = useState([]);
      const [selectedPosition, setSelectedPosition] = useState([]);

      const filterComponentsData = [
        { label: 'Departments', options: departmentOptions, state: selectedDepartment, setState: setSelectedDepartment },
        { label: 'Positions', options: positionOptions, state: selectedPosition, setState: setSelectedPosition }
      ]

      const deleteFilter = () => {
        setSelectedDepartment([]);
        setSelectedPosition([]);
        setPositionOptions([]);
      }

      useEffect(() => {
        FetchApiGet('services/Hr/Department/GetAllDepartments', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setDepartmentOptions(data.data.map(item => ({ value: item.id, label: item.departmentName })));
                        setSelectedDepartment(data.data.map(item => ({ value: item.id, label: item.departmentName })));
                    })
                }
            })
      }, [])

      useEffect(() => {
        let selectedDepartmentIds = selectedDepartment.map(item => item.value);
        FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds', 'POST', selectedDepartmentIds)
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setPositionOptions(data.data.map(item => ({ value: item.id, label: item.positionName })));
                        setSelectedPosition(data.data.map(item => ({ value: item.id, label: item.positionName })));
                    })
                }
            })
      }, [selectedDepartment])

      const getAllFilterData = () => {
        let selectedPositionIds = selectedPosition.map(item => item.value);
        FetchApiPost('services/Hr/PositionLevel/GetAllPositionLevelByPositionIds', 'POST', {
            positionIds: selectedPositionIds
        })
            .then(res => {
                if(res.status === 201){
                    res.json().then(data => {
                        setFilterData(data.data.map(item => ({
                            id: item.id,
                            position: item.position.positionName,
                            levelName: item.positionLevelName,
                            comment: item.comments,
                            rank: item.rank,
                            score: item.score,
                            rangeI: item.rangeI,
                            rangeII: item.rangeII
                        })
                        ))
                        setCloseFilter(true);
                    })
                }
            })
      }

      const statusOptions = [
        { id: 0, key: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
        {
            id: 1,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        }
    ];

    const dropDownItemClick = (e) => {
        // const ids = e.target.id.split(' ');
        // const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
        const ids = e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id
        const ids2 = ids.split(' ');
        // ilk sayı option id 
        // ikinci sayı selectedValue id
        console.log(ids2)

        // Edit
        if (ids2[0] === "0") {
            const item = filterData.find((el) => el.id === Number(ids2[1]));
            setUpdateItem(item);
            setUpdateModalIsShow(true);
        }
        // Delete
        else if (ids2[0] === "1") {
            const item = filterData.find((el) => el.id === Number(ids2[1]));
            setDeleteItem(item);
            setDeleteModalIsShow(true);
        }
    };

    // const action = filterData.map((el, i) => ({
    //     id: el.id,
    //     content: (
    //         <span className="table-dropdown">
    //             <Dropdown>
    //                 <Dropdown.Toggle variant="light" id="dropdown-basic">
    //                     <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
    //                 </Dropdown.Toggle>
    //                 <Dropdown.Menu className="dropdown-menu-container">
    //                     {
    //                         statusOptions.map((item, i) => (
    //                             <Dropdown.Item
    //                                 as="button"
    //                                 eventKey={item.id}
    //                                 id={`${el.id} ${item.id}`}
    //                                 onClick={dropDownItemClick}
    //                                 style={item.id === 1 ? { color: `${item.color}` } : {}}>
    //                                 {item.icon} {t(item.value)}
    //                             </Dropdown.Item>
    //                         ))}
    //                 </Dropdown.Menu>
    //             </Dropdown>
    //         </span>
    //     ),
    // }));
      

      const tableData = filterData.map((item, index) => ({
        id: item.id,
        position: item.position,
        levelName: item.levelName,
        comment: item.comment,
        rank: <div className='position-level-center-item'>
            {item.rank}
        </div>,
        score: <div className='position-level-center-item'>
            {item.score}
        </div>,
        rangeI: <div className='position-level-end-item'>
            {item.rangeI} %
        </div>,
        rangeII: <div className='position-level-end-item'>
            {item.rangeII} %
        </div>,
        detail: <div className='position-level-center-item'>
            <Icon
                path={mdiEyeOutline}
                size={1}
            />
        </div>,
        actions: <Dropdowns
            item={`${item.id}`}
            option={statusOptions}
            onClick={dropDownItemClick}
        />,
      }))

  return (
    <div id="position-levels">
         <MainTable
              tableData={tableData}
              columns={columns}
              exportColumns={exportColumns}
              columnWidths={columnWidths}
              setColumnWidths={setColumnWidths}
              tableColumnExtensions={tableColumnExtensions}
              itemsFromBackend={itemsFromBackend}
              columnOrders={columnOrders}
              setColumnOrders={setColumnOrders}
              showorHideColumnsItems={showorHideColumnsItems}
              totalSummaryItems={totalSummaryItems}
              groupSummaryItems={groupSummaryItems}
              groupByItems={groupByItems}
              setGroupByItems={setGroupByItems}
              isAddButton={true}
              addButtonFunction={positionModal}
              isFilters={true}
              setCloseFilter={setCloseFilter}
              closeFilter={closeFilter}
              filters={<Filter 
                filterComponentsData={filterComponentsData}  
                getAllFilterData={getAllFilterData}
                setCloseFilter={setCloseFilter}
                deleteFilter={deleteFilter}
              />}
          />

          {
            isShow && (
                <AddModal isShow={isShow} setIsShow={setIsShow} filterData={filterData} setFilterData={setFilterData} getAllFilterData={getAllFilterData} />
            )
          }

          {
            updateModalIsShow && (
                <UpdateModal
                    isShow={updateModalIsShow}
                    setIsShow={setUpdateModalIsShow}
                    selectedValue={updateItem}
                    filterData={filterData}
                    setFilterData={setFilterData}
                />
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
    </div>
  )
}

export default PositionLevels