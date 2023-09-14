import React, { useState, useEffect } from 'react';
import TableLayout from '../../../../components/Tables';
import { useTranslation } from 'react-i18next';
import CreateModal from './CreateModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { DropDowns } from '../../../../components/FormElements/DropDown/DropDowns';
import Dropdowns from '../../../../components/Dropdowns';
import UpdateModal from './UpdateModal';
import { ConfirmModal, ErrorModal } from '../../../../components/FormElements/InformationModal';
import Filter from '../../../../components/Filter';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Table = () => {
    const { t } = useTranslation();

    const [createModal, setCreateModal] = useState(false);

    const [loader, setLoader] = useState();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [errorModal, setErrorModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState();

    const [filterShow, setFilterShow] = useState(true)

    const statusOptions = [
        {
            key: 0,
            label: <span style={{color: '#FA5C7C'}}><i style={{ marginRight: '8px', width: '14px', height: '14px' }} className="fas fa-trash"></i><span>{t('Delete')}</span></span>
        },
        {
            key: 1,
            label: <span style={{color: '#6C757D'}}><i style={{ marginRight: '8px', fontSize: '14px' }} className="fas fa-pen"></i><span>{t('Edit')}</span></span>
        }
    ];

    const columns = [
        {
            header: t('ID'),
            accessorKey: 'id',
            size: '100',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Business Process'),
            accessorKey: 'businessProcess',
            size: '626'
        },
        {
            header: t('Description'),
            accessorKey: 'description',
            size: '626',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Main Process'),
            accessorKey: 'mainProcess',
            size: '626'
        },
        {
            header: t('PP Type'),
            accessorKey: 'ppType',
            size: '300',
            Cell: ({ cell, row }) => (
                <span className='table-data-cell-background-color' style={{backgroundColor:row.original.color}}>
                    {
                        cell.getValue()
                    }
               </span>
            )
        },
        {
            header: '',
            accessorKey: 'action',
            size: '18',
            Cell: ({ row }) => {
                return (
                    <DropDowns
                        items={statusOptions}
                        onClick={({ key }) => statusClick(key, row.original.id)}
                        child={<button className='tom-tables-action-color'><Icon path={mdiDotsHorizontal} /></button>}
                    />
                    // <Dropdowns
                    //     item={`?${row.original.id}?`}
                    //     option={statusOptions}
                    //     // option={getStatusOptions(1)}
                    //     onClick={statusClick}
                    // />
                );
            },
        },
    ];

    const statusClick = (statusId, itemId) => {
        setSelectedData(allData.find(i => i.businesProcessId === itemId))
        if (Number(statusId) === 0) {
          setShowDeleteModal(true)
        } else if (Number(statusId) === 1) {
          setShowEditModal(true)
        }
    };

    const deleteType = () => {
      const body = {
        id: Number(selectedData.id)
      }
      FetchApiPost('services/TaskManagement/BusinessProcess/DeleteBusinessProcess', 'POST', body)
      
        .then(res => {
          if(res.status === 200 || res.status === 201 || res.status === 202){
            handleGetAllData();
          }else if(res.status === 409){
            setErrorModal(true)
          }
        })
    }

    const [processTypeOptions, setProcessTypeOptions] = useState([]);
    const [selectedProcessType, setSelectedProcessType] = useState([]);

    const [selectedMainProcess, setSelectedMainProcess] = useState([]);
    const [mainProcessOptions, setMainProcessOptions] = useState([])

    const filterComponentsData = [
        {
            label: 'process & project type',
            state: selectedProcessType,
            setState: setSelectedProcessType,
            options: processTypeOptions,
            type: 'multiselect',
        },
        {
            label: 'main process',
            state: selectedMainProcess,
            setState: setSelectedMainProcess,
            options: mainProcessOptions,
            type: 'multiselect',
        },
    ]

    const deleteFilter = () => {
        setSelectedProcessType([]);
        setSelectedMainProcess([]);
        setMainProcessOptions([]);
    }

    useEffect(() => {
        setLoader(true)
        FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setProcessTypeOptions(
                        data.map((item) => ({
                            value: item.id,
                            label: item.title,
                        }))
                    );
                    setSelectedProcessType(
                        data.map((item) => ({
                            value: item.id,
                            label: item.title,
                        }))
                    );
                    setLoader(false)
                });
            }else{
              setLoader(false)
            }
        });
    }, [])

    useEffect(() => {
        if(selectedProcessType.length === 0){
            setMainProcessOptions([]);
            setSelectedMainProcess([]);
            return;
        }
        setLoader(true)
        const body = {
            processProjectTypeIds: selectedProcessType.map(i => i.value)
        }
        FetchApiPost('services/TaskManagement/JobDescription/GetJobDescriptionForApply', 'POST', body)
            .then(res => {
                if(res.status === 200 || res.status === 201){
                    res.json().then(({ data }) => {
                        setMainProcessOptions(data.map(i => ({ value: i.id, label: i.mainProcess })))
                        setSelectedMainProcess(data.map(i => ({ value: i.id, label: i.mainProcess })))
                    })
                }
                setLoader(false)
            })
        
    }, [selectedProcessType])

    

    const handleGetAllData = () => {
        setLoader(true)
        const body = {
          processProjectTypeIds: selectedProcessType.map(i => i.value),
          mainProcessIds: selectedMainProcess.map(i => i.value)
        }
          FetchApiPost('services/TaskManagement/BusinessProcess/GetBusinessProcessForApply', 'POST', body).then((res) => {
              if (res.status === 200) {
                  res.json().then(({ data }) => {
                      setAllData(data);
                      setTableData(
                          data.map((item) => ({
                              id: item.businesProcessId,
                              businessProcess: item.businessProcessTitle,
                              description: item.description,
                              mainProcess: item.mainProcessName,
                              ppType: item.processTypeName,
                              color: item.processTypeColor
                          }))
                      );
                      setLoader(false)
                  });
              }else{
                setLoader(false)
              }
          });
      };
      
    return (
        <div>
            <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={false}
                isCheckBox={false}
                columnPinningRight={['action']}
                handleNewButton={() => setCreateModal(true)}
                isLoading={loader}
                pageSize="100"
                handlApplyBtn={handleGetAllData}
                handlClearBtn={deleteFilter}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                filter={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        isFilterBtn={false}
                    />
                }
            />

            {createModal && <CreateModal show={createModal} setShow={setCreateModal} getData={handleGetAllData} />}
            {showEditModal && <UpdateModal show={showEditModal} setShow={setShowEditModal} getData={handleGetAllData} selectedData={selectedData} />}
            {showDeleteModal && <ConfirmModal setShowModal={setShowDeleteModal} func={deleteType} message="Are you sure you want to delete this business process?" title="Delete" specialText={selectedData.businessProcessTitle} />}
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="This type is used on the system. You cannot delete this." title="Cannot be Deleted" />}
       
        </div>
    );
};

export default Table;
