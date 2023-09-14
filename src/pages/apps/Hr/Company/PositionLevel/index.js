import React, { useEffect, useState } from 'react'
import MainTable from '../../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import AddModal from './AddModal/AddModal';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import Filter from './Filter';
import 'antd/dist/antd.css';
import UpdateModal from './UpdateModal/UpdateModal';
import Dropdowns from '../../../../../components/Dropdowns';
import Delete from './Delete';

const PositionLevel = () => {
    const { t } = useTranslation();
    const empId = localStorage.getItem('userEmpId');
    const [closeFilter, setCloseFilter] = useState(false);

    const [isShow, setIsShow] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);


    const [filterData, setFilterData] = useState([]);

    const [columns] = useState([
        { name: 'company', title: t('Company') },
        { name: 'department', title: t('Department') },
        { name: 'position', title: t('Position') },
        { name: 'levelName', title: t('Level Name') },
        { name: 'comment', title: t('Comment') },
        { name: 'rank', title: t('Rank') },
        { name: 'score', title: t('Score') },
        { name: 'rangeI', title: t('Range I') },
        { name: 'rangeII', title: t('Range II') },
        { name: 'actions', title: ' ' },
      ]);
    
    
      //Export Columns
      const [exportColumns] = useState([
        { name: 'company', title: t('Company') },
        { name: 'department', title: t('Department') },
        { name: 'position', title: t('Position') },
        { name: 'levelName', title: t('Level Name') },
        { name: 'comment', title: t('Comment') },
        { name: 'rank', title: t('Rank') },
        { name: 'score', title: t('Score') },
        { name: 'rangeI', title: t('Range I') },
        { name: 'rangeII', title: t('Range II') }
    ])
    
      // Table Columns Resizing Width
      const [columnWidths, setColumnWidths] = useState([
        { columnName: 'company', width: '14%' },
        { columnName: 'department', width: '14%' },
        { columnName: 'position', width: '14%' },
        { columnName: 'levelName', width: '14%' },
        { columnName: 'comment', width: '14%' },
        { columnName: 'rank', width: '14%' },
        { columnName: 'score', width: '14%' },
        { columnName: 'rangeI', width: '14%' },
        { columnName: 'rangeII', width: '14%' },
        { columnName: 'actions', width: '4%' },
      ]);
    
      //Table Column Reordering
      const [tableColumnExtensions] = useState([
        { columnName: 'company', width: '15%' },
        { columnName: 'department', width: '15%' },
        { columnName: 'position', width: '15%' },
        { columnName: 'levelName', width: '15%' },
        { columnName: 'comment', width: '15%' },
        { columnName: 'rank', width: '15%' },
        { columnName: 'score', width: '15%' },
        { columnName: 'rangeI', width: '15%' },
        { columnName: 'rangeII', width: '15%' },
        { columnName: 'actions', width: '5%' },
      ]);
    
      //Freeze Columns
      const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Company', columnName: 'company', width: 150 },
        { id: '2', isFreeze: false, content: 'Department', columnName: 'department', width: 150 },
        { id: '3', isFreeze: false, content: 'Position', columnName: 'position', width: 150 },
        { id: '4', isFreeze: false, content: 'Level Name', columnName: 'levelName', width: 150 },
        { id: '5', isFreeze: false, content: 'Comment', columnName: 'comment', width: 150 },
        { id: '6', isFreeze: false, content: 'Rank', columnName: 'rank', width: 150 },
        { id: '7', isFreeze: false, content: 'Score', columnName: 'score', width: 150 },
        { id: '8', isFreeze: false, content: 'Range I', columnName: 'rangeI', width: 150 },
        { id: '9', isFreeze: false, content: 'Range II', columnName: 'rangeII', width: 150 },
      ];
    
      // Table show or hide items
      const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'company', title: 'Company' },
        { isShow: true, name: 'department', title: 'Department' },
        { isShow: true, name: 'position', title: 'Position' },
        { isShow: true, name: 'levelName', title: 'Level Name' },
        { isShow: true, name: 'comment', title: 'Comment' },
        { isShow: true, name: 'rank', title: 'Rank' },
        { isShow: true, name: 'score', title: 'Score' },
        { isShow: true, name: 'rangeI', title: 'Range I' },
        { isShow: true, name: 'rangeII', title: 'Range II' }
      ])
    
      // Group By Items
      const [groupByItems, setGroupByItems] = useState([
        { id:'0',isShow: true, content: 'Company', columnName: 'company' },
        { id:'1',isShow: true, content: 'Department', columnName: 'department' },
        { id:'2',isShow: true, content: 'Position', columnName: 'position' },
        { id:'3',isShow: true, content: 'Level Name', columnName: 'levelName' },
        { id:'4',isShow: true, content: 'Comment', columnName: 'comment' },
        { id:'5',isShow: true, content: 'Rank', columnName: 'rank' },
        { id:'6',isShow: true, content: 'Score', columnName: 'score' },
        { id:'7',isShow: true, content: 'Range I', columnName: 'rangeI' },
        { id:'8',isShow: true, content: 'Range II', columnName: 'rangeII' },
      ])
    
      // Summary
      const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'Company', width: 150 },
        { type: 'count', columnName: 'Department', width: 150 },
        { type: 'count', columnName: 'Position', width: 150 },
        { type: 'count', columnName: 'Level Name', width: 150 },
        { type: 'count', columnName: 'Comment', width: 150 },
        { type: 'count', columnName: 'Rank', width: 150 },
        { type: 'count', columnName: 'Score', width: 150 },
        { type: 'count', columnName: 'Range I', width: 150 },
        { type: 'count', columnName: 'Range II', width: 150 },
      ])
    
      const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'Company', width: 150 },
        { type: 'count', columnName: 'Department', width: 150 },
        { type: 'count', columnName: 'Position', width: 150 },
        { type: 'count', columnName: 'Level Name', width: 150 },
        { type: 'count', columnName: 'Comment', width: 150 },
        { type: 'count', columnName: 'Rank', width: 150 },
        { type: 'count', columnName: 'Score', width: 150 },
        { type: 'count', columnName: 'Range I', width: 150 },
        { type: 'count', columnName: 'Range II', width: 150 },
      ])
      
      const [columnOrders, setColumnOrders] = useState(['company', 'department', 'position', 'levelName', 'comment', 'rank', 'score', 'rangeI', 'rangeII' ,'actions']);

      const positionModal = () => {
        setIsShow(true);
      }

      const [companyOptions, setCompanyOptions] = useState([]);
      const [selectedCompany, setSelectedCompany] = useState([]);

      const [departmentOptions, setDepartmentOptions] = useState([]);
      const [selectedDepartment, setSelectedDepartment] = useState([]);

      const [positionOptions, setPositionOptions] = useState([]);
      const [selectedPosition, setSelectedPosition] = useState([]);

      const [levelNameOptions, setLevelNameOptions] = useState([]);
      const [selectedLevelName, setSelectedLevelName] = useState([]);

      const filterComponentsData = [
        { label: 'Company', options: companyOptions, state: selectedCompany, setState: setSelectedCompany },
        { label: 'Department', options: departmentOptions, state: selectedDepartment, setState: setSelectedDepartment },
        { label: 'Position', options: positionOptions, state: selectedPosition, setState: setSelectedPosition },
        { label: 'Level Name', options: levelNameOptions, state: selectedLevelName, setState: setSelectedLevelName },
      ]

      const deleteFilter = () => {
        setSelectedDepartment([]);
        setSelectedPosition([]);
        setPositionOptions([]);
      }

      useEffect(() => {
        // FetchApiGet('api/OldSystem/GetAllCompanies', 'GET')
        //   .then(res => {
        //       if(res.status === 200){
        //           res.json().then(data => {
        //               setCompanyOptions(data.map(item => ({
        //                   label: item.CompanyName,
        //                   value: item.CompanyId
        //               })))
        //               setSelectedCompany(data.map(item => ({
        //                 label: item.CompanyName,
        //                 value: item.CompanyId
        //             })))
        //           })
        //       }
        //   })
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
          .then(res => {
            if(res.status === 200){
              res.json().then(item => {
                setCompanyOptions(item?.map(data => (
                  {
                      value:data.CompanyId,
                      label:data.CompanyName
                  }
                )))
                setSelectedCompany(item?.map(data => (
                    {
                        value:data.CompanyId,
                        label:data.CompanyName
                    }
                )))
              })
            }
          })
      }, [])

      useEffect(() => {
          let selectedCompanyIds = selectedCompany.map(item => item.value);
          FetchApiPost('services/Hr/CompanyDepartment/GetDepartmentsByCompanyIds', 'POST', {
            companyIds: selectedCompanyIds
          }).then(res => {
              if(res.status === 200){
                  res.json().then(data => {
                      setDepartmentOptions(data.data.map(item => ({
                          label: item.departmentName,
                          value: item.id
                      })))
                      setSelectedDepartment(data.data.map(item => ({
                        label: item.departmentName,
                        value: item.id
                    })))
                  })
              }
          })
      }, [selectedCompany])

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

      useEffect(() => {
        let selectedPositionIds = selectedPosition.map(item => item.value);
        FetchApiPost('services/Hr/PositionLevel/GetAllPositionLevelByPositionIds', 'POST', {
          positionIds: selectedPositionIds
        })
        .then(res => {
            if(res.status === 201){
                res.json().then(data => {
                    setLevelNameOptions(data.data.map(item => ({
                        label: item.positionLevelName,
                        value: item.id
                        }))
                    )
                    setSelectedLevelName(data.data.map(item => ({
                        label: item.positionLevelName,
                        value: item.id
                        }))
                    )
                })
            }else{
                setLevelNameOptions([]);
                setSelectedLevelName([]);
            }
        })
      }, [selectedPosition])

      const getAllFilterData = () => {
        let selectedCompanyIds = selectedCompany.map(item => item.value);
        let selectedDepartmentIds = selectedDepartment.map(item => item.value);
        let selectedPositionIds = selectedPosition.map(item => item.value);
        let selectedLevelNameIds = selectedLevelName.map(item => item.value);
        FetchApiPost('services/Hr/CompanyPositionLevel/GetAllCompanyPositionLevelByFilter', 'POST', {
            companyIds: selectedCompanyIds,
            departmantIds: selectedDepartmentIds,
            positionIds: selectedPositionIds,
            positionLevelIds: selectedLevelNameIds
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setFilterData(data.data.map(item => ({
                            id: item.id,
                            company: item.company.companyName,
                            companyId: item.company.companyId,
                            department: item.departmant.departmentName,
                            departmentId: item.departmant.id,
                            position: item.position.positionName,
                            positionId: item.position.id,
                            levelName: item.positionLevel.positionLevelName,
                            levelNameId: item.positionLevel.id,
                            comment: item.comment,
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

      const tableData = filterData.map((item, index) => ({
        id: item.id,
        company: item.company,
        companyId: item.companyId,
        department: item.department,
        departmentId: item.departmentId,
        position: item.position,
        positionId: item.positionId,
        levelName: item.levelName,
        levelNameId: item.levelNameId,
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
                <AddModal getAllFilterData={getAllFilterData} isShow={isShow} setIsShow={setIsShow} filterData={filterData} setFilterData={setFilterData} />
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

export default PositionLevel