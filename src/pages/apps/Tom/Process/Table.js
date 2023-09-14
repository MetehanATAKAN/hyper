import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TableLayout from '../../../../components/Tables';
import { useTranslation } from 'react-i18next';
import CreateModal from './CreateModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { DropDowns } from '../../../../components/FormElements/DropDown/DropDowns';
import Filter from '../../../../components/Filter';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiLinkVariantOff } from '@mdi/js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import CustomBadge from '../../../../components/Badge';
import Status from '../../../../components/Status';

const Table = () => {
    const { t } = useTranslation();
    const history = useHistory()
    const [createModal, setCreateModal] = useState(false);

    const [loader, setLoader] = useState();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [errorModal, setErrorModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState();

    const [filterShow, setFilterShow] = useState(true)

    const actionOptions = [
        {
            key: 0,
            label: <span style={{color: '#FA5C7C'}}><i style={{ marginRight: '8px', width: '14px', height: '14px' }} className="fas fa-trash"></i><span>{t('Delete')}</span></span>
        },
        {
            key: 1,
            label: <span style={{color: '#6C757D'}}><i style={{ marginRight: '8px', fontSize: '14px' }} className="fas fa-pen"></i><span>{t('Edit')}</span></span>
        },
        {
          key: 2,
          label: <span style={{color: '#6C757D'}}><i style={{ marginRight: '8px', fontSize: '14px' }} class="fa-solid fa-circle-info"></i><span>{t('Detail')}</span></span>
        }
    ];

    const columns = [
      {
          header: t('Used'),
          accessorKey: 'used',
          size: '100',
          muiTableBodyCellProps: {
            align: 'center',
        },
        Cell: ({ cell }) => (
          <Icon
                            path={mdiLinkVariantOff}
                            size={0.85}
                            color={cell.getValue() === 'connect' ? '#00A0DF' : '#6C757D'}
                        />
        )
      },
        {
            header: t('ID'),
            accessorKey: 'id',
            size: '100',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
          header: t('Process Name'),
          accessorKey: 'processName',
          size: '626',
        },
        {
          header: t('Owner Department'),
          accessorKey: 'ownerDepartment',
        },
        {
          header: t('Priorty'),
          accessorKey: 'priorty',
          muiTableBodyCellProps: {
                align: 'center',
            },
          Cell: ({ cell }) => (
            <CustomBadge label={cell.getValue()} type={cell.getValue() === 'Low' ? 'blue' : cell.getValue() === 'Medium' ? 'orange' : 'red'} />
          )
        },
        {
          header: t('Time'),
          accessorKey: 'time'
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
            header: t('Business Process'),
            accessorKey: 'businessProcess',
            size: '626'
        },
        {
            header: t('Main Process'),
            accessorKey: 'mainProcess',
            size: '426'
        },
        {
          header: t('Sub Process'),
          accessorKey: 'subProcess',
          size: '426'
        },
        {
          header: t('Status'),
          accessorKey: 'status',
          size: '170',
          Cell: ({ cell, row }) => <Status approveStatus={cell.getValue()} />,
        },
        {
            header: '',
            accessorKey: 'action',
            size: '18',
            Cell: ({ row }) => {
                return (
                    <DropDowns
                        items={actionOptions}
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
        }else if(Number(statusId) === 2){
          history.push('/apps/tom/process/brochure-production')
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
    const [mainProcessOptions, setMainProcessOptions] = useState([]);

    const [businessProcessOptions, setBusinessProcessOptions] = useState([]);
    const [selectedBusinessProcess, setSelectedBusinessProcess] = useState([]);

    const [priortyOptions, setPriortyOptions] = useState([
      {
      value: 0,
      label: 'Low'
  },
  {
      value: 1,
      label: 'Medium'
  },
  {
      value: 2,
      label: 'High'
  }]);
    const [selectedPriorty, setSelectedPriorty] = useState([{
      value: 0,
      label: 'Low'
  },
  {
      value: 1,
      label: 'Medium'
  },
  {
      value: 2,
      label: 'High'
  }]);

    const [statusOptions, setStatusOptions] = useState([
      {
        value: 1,
        label: 'Redact'
      }
    ]);
    const [selectedStatus, setSelectedStatus] = useState([
      {
        value: 1,
        label: 'Redact'
      }
    ]);

    const filterComponentsData = [
        {
            label: 'pp type',
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
        {
          label: 'business process',
          state: selectedBusinessProcess,
          setState: setSelectedBusinessProcess,
          options: businessProcessOptions,
          type: 'multiselect',
      },
      {
        label: 'priorty',
          state: selectedPriorty,
          setState: setSelectedPriorty,
          options: priortyOptions,
          type: 'multiselect',
      },
      {
        label: 'status',
          state: selectedStatus,
          setState: setSelectedStatus,
          options: statusOptions,
          type: 'multiselect',
      }
    ]

    const deleteFilter = () => {
      selectedStatus([]);
      setSelectedPriorty([]);

      setSelectedBusinessProcess([])
      setBusinessProcessOptions([]);

      setSelectedMainProcess([]);
      setMainProcessOptions([]);

      setSelectedProcessType([]);
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

    useEffect(() => {
      if(selectedMainProcess.length === 0){
        setSelectedBusinessProcess([]);
        setBusinessProcessOptions([]);
        return;
      }
      setLoader(true)
      const body = {
        processProjectTypeIds: selectedProcessType.map(i => i.value),
        mainProcessIds: selectedMainProcess.map(i => i.value)
      }
      FetchApiPost('services/TaskManagement/BusinessProcess/GetBusinessProcessForApply', 'POST', body)
        .then(res => {
          if(res.status === 200 || res.status === 201){
              res.json().then(({ data }) => {
                setBusinessProcessOptions(data.map(i => ({ value:i.id ,label:i.businessProcessTitle})))
                setSelectedBusinessProcess(data.map(i => ({ value:i.id ,label:i.businessProcessTitle})))
              })
              setLoader(false)
          }
        })
    }, [selectedMainProcess])

    

    const handleGetAllData = () => {
        setLoader(true)
        const body = {
          processProjectTypeIds: selectedProcessType.map(i => i.value),
          mainProcessIds: selectedMainProcess.map(i => i.value),
          subProcessIds: [0],
          businessProcessIds: selectedBusinessProcess.map(i => i.value),
          priorityIds: selectedPriorty.map(i => i.value),
          statusIds: selectedStatus.map(i => i.value)
        }
          FetchApiPost('services/TaskManagement/ParentProcess/GetParentProcessForApply', 'POST', body).then((res) => {
              if (res.status === 200) {
                  res.json().then(({ data }) => {
                      setAllData(data);
                      setTableData(
                          data.map((item) => ({
                              id: item.parentProcessId,
                              processName: item.title,
                              ownerDepartment: item.processOwnerDepartmentName,
                              priorty: item.priorityId === 0 ? 'Low' : item.priorityId === 1 ? 'Medium' : 'High',
                              time: '-',
                              ppType: item.processProjectTypeName,
                              businessProcess: item.businessProcessName,
                              mainProcess: item.mainProcessName,
                              subProcess: '-',
                              status: item.approveStatus
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
                isCheckBox={true}
                columnPinningRight={['action']}
                handleNewButton={() => setCreateModal(true)}
                isLoading={loader}
                pageSize="100"
                handlApplyBtn={handleGetAllData}
                handlClearBtn={deleteFilter}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                columnVisibility={{mainProcess: false, subProcess: false}}
                filter={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        isFilterBtn={false}
                    />
                }
            />

            {createModal && <CreateModal show={createModal} setShow={setCreateModal} getData={handleGetAllData} />}
            {/* {showEditModal && <UpdateModal show={showEditModal} setShow={setShowEditModal} getData={handleGetAllData} selectedData={selectedData} />}
            {showDeleteModal && <ConfirmModal setShowModal={setShowDeleteModal} func={deleteType} message="Are you sure you want to delete this business process?" title="Delete" specialText={selectedData.businessProcessTitle} />}
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="This type is used on the system. You cannot delete this." title="Cannot be Deleted" />} */}
       
        </div>
    );
};

export default Table;
