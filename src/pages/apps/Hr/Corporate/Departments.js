import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import Dropdowns from '../../../../components/Dropdowns';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';

import Tippy from '@tippyjs/react';

import AddModal from './AddDepartmantModal';

import TableLayout from '../../../../components/Tables';

const Departments = () => {

  const { t } = useTranslation();
  const history = useHistory();

  const [showAddModal, setShowAddModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const [allTable, setAllTable] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [updateModal, setUpdateModal] = useState(false);
  const [tableItem, setTableItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [dataforAddModal, setDataforAddModal] = useState([]);

  const statusOptions = [
    {
        id: 1,
        key: 'Edit',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    }
]

const statusClick = (e) => {
    const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
        '?'
    );
    const statusId = Number(getIds[0]);
    const itemId = Number(getIds[1]);

    let selectedItem = allTable.filter(i => i.id === itemId)[0]
    setTableItem(selectedItem);
    switch (statusId) {
        case 0:
            setDeleteModal(true);
            break;
        case 1:
            setUpdateModal(true);
            break;
        default:
            break;
    }
};

  const columns = [
    {
        header: t('Departments'),
        accessorKey: 'departments',
    },
    {
        header: t('Department Overview'),
        accessorKey: 'departmentOverview'
    },
    {
        header: t('Positions'),
        accessorKey: 'positions',
        Cell: ({ cell, row }) => (
            <>
                <Tippy
                        placement="bottom"
                        content={
                          cell.getValue().join(', ')
                        }
                      >
                        <span>
                          {
                            cell.getValue().map((el, index) => (

                              <span
                                className="task-management-activity-background"
                                style={{
                                  backgroundColor: getPositionColor(row.original.id, 'background'),
                                  color: getPositionColor(row.original.id, 'color'),
                                  padding: '3px 6px',
                                  fontSize: '.7rem',
                                  fontWeight: 700,
                                  whiteSpace: 'nowrap',
                                  marginRight: '5px',
                                }}>
                                {el}
                              </span>
                            ))
                          }
                        </span>
                      </Tippy>
            </>
        )
    },
    {
        header: t('Additional Positions'),
        accessorKey: 'additionalPositions',
        Cell: ({ cell, row }) => (
            <>
                <Tippy
                        placement="bottom"
                        content={
                          cell.getValue().join(', ')
                        }
                      >
                        <span>
                          {
                            cell.getValue().map((el, index) => (

                              <span
                                className="task-management-activity-background"
                                style={{
                                  backgroundColor: getPositionColor(row.original.id, 'background'),
                                  color: getPositionColor(row.original.id, 'color'),
                                  padding: '3px 6px',
                                  fontSize: '.7rem',
                                  fontWeight: 700,
                                  whiteSpace: 'nowrap',
                                  marginRight: '5px',
                                }}>
                                {el}
                              </span>
                            ))
                          }
                        </span>
                      </Tippy>
            </>
        )
    },
    {
        header: t('Abbreviation'),
        accessorKey: 'abbreviation',
        Cell: ({ cell, row }) => (
            <>
                <Tippy
                        placement="bottom"
                        content={
                          cell.getValue()
                        }
                      >
                        <span>
                          {
                              <span
                                className="task-management-activity-background"
                                style={{
                                  backgroundColor: getPositionColor(row.original.id, 'background'),
                                  color: getPositionColor(row.original.id, 'color'),
                                  padding: '3px 6px',
                                  fontSize: '.7rem',
                                  fontWeight: 700,
                                  whiteSpace: 'nowrap',
                                  marginRight: '5px',
                                }}>
                                {cell.getValue()}
                              </span>
                          }
                        </span>
                      </Tippy>
            </>
        )
    },
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
]

const getPositionColor = (id, colorType) => {
    if(allTable.length === 0) return;
    const itemRow = allTable.find(i => i.id === id);

    if(colorType === 'background'){
        return itemRow.color + '50'
    }else{
        return itemRow.color
    }
}
  

  const getAllDepartments = () => {
    FetchApiGet('services/Hr/Department/GetAllDepartments', 'GET')
    .then((res) =>
      (async () => {
        try {
          if (res.status === 200) {
            res.json().then(item => {

                setTableData(item.data.map(i => ({
                    id: i?.id,
                    departments: i?.departmentName,
                    departmentOverview:i?.departmentOverview,
                    positions: i.position.map(el => el.abbreviation),
                    additionalPositions: i?.additionalPosition.map(el => el.abbreviation),
                    abbreviation: i?.abbreviation
                })))
                
                setAllTable(item.data.map(data => (data)))

                setDataforAddModal(item.data.map(data => (
                    {
                      id: data?.id,
                      departments:data?.departmentName,
                      departmentOverview:(
                        <Tippy
                          placement='bottom'
                          content={
                            <span>
                              {data?.departmentOverview}
                            </span>
                          }
                        >
                          <span>
                            {data?.departmentOverview}
                          </span>
                        </Tippy>
                      ) ,
                      positions: (
                        <Tippy
                          placement="right"
                          content={
                            data?.position.map((el, index) => (
  
                              <span>
                                {el?.abbreviation}
                                {index !== el.length - 1 && ', '}
                              </span>
                            ))
                          }
                        >
                          <span>
                            {
                              data?.position.map((el, index) => (
  
                                <span
                                  className="task-management-activity-background"
                                  style={{
                                    backgroundColor: el?.abbreviation !== '' && data?.color + '50',
                                    color: el?.abbreviation !== '' && data?.color,
                                    padding: '3px 6px',
                                    fontSize: '.7rem',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap',
                                    marginRight: '5px',
                                  }}>
                                  {el?.abbreviation}
                                </span>
  
                              ))
                            }
                          </span>
                        </Tippy>
                        
                      ),
                      additionalPositions: (
                        <Tippy
                          placement="bottom"
                          content={
                            data?.additionalPosition.map((el, index) => (
  
                              <span>
                                {el?.abbreviation}
                                {index !== data?.additionalPosition.length - 1 && ','}
                              </span>
                            ))
                          }
                        >
                          <span>
                            {
                             data?.additionalPosition.map((el, index) => (
  
                              <span
                                className="task-management-activity-background"
                                style={{
                                  backgroundColor: data?.color + '50',
                                  color: data?.color,
                                  padding: '3px 6px',
                                  fontSize: '.7rem',
                                  fontWeight: 700,
                                  whiteSpace: 'nowrap',
                                  marginRight: '5px',
                                }}>
                                {el?.abbreviation}
                              </span>
    
                            ))
                            }
                          </span>
                        </Tippy>
                      ),
                      abbreviation: (
                        <Tippy
                        placement="left"
                        content={data?.abbreviation}
                      >
                         <span
                          className="task-management-activity-background"
                          style={{
                            backgroundColor: data?.color + '50',
                            color: data?.color,
                            padding: '3px 6px',
                            fontSize: '.7rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            marginRight: '5px',
                          }}>
                          {data?.abbreviation}
                        </span>
                      </Tippy>
                       
                      ),
                      
                    }
                  )))
            })
          }
          else if (res.status === 500) {
            history.push('/error-500');
          }
          else {
            console.log('hata');
          }

        } catch (error) {
          console.log('error', error);
        }
      })()
    )
  }

  useEffect(() => {
    window.onclick = (event) => {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content1");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show-mete')) {
            openDropdown.classList.remove('show-mete');
          }
        }
      }
    }
  }, [])

  // Get all table data
  useEffect(() => {
   getAllDepartments();
  }, [])

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
                handleNewButton={() => setShowAddModal(true)}
                isLoading={loader}
                isFilter={false}
                filterShow={false}
                setFilterShow={() => {}}
            />

      {
        updateModal &&
        <UpdateModal
          isShow={updateModal}
          setIsShow={setUpdateModal}
          tableData={tableData}
          setTableData={setTableData}
          data={tableItem}
          allTable={allTable}
          getAllDepartments={getAllDepartments}
        />
      }

      {
        deleteModal &&
        <DeleteModal
          modalShow={deleteModal}
          setModalShow={setDeleteModal}
          data={tableItem}
        />
      }

      {
        showAddModal && (
            <AddModal 
                isShow={showAddModal}
                setIsShow={setShowAddModal}
                tableData={dataforAddModal}
            />
        )
      }
    </div>
  )
}

export default Departments