import React, { useState, useEffect } from 'react';
import TableLayout from '../../../../components/Tables';
import { useTranslation } from 'react-i18next';
import CreateModal from './CreateModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { DropDowns } from '../../../../components/FormElements/DropDown/DropDowns';
import Dropdowns from '../../../../components/Dropdowns';
import UpdateModal from './UpdateModal';
import { ConfirmModal, ErrorModal } from '../../../../components/FormElements/InformationModal';

import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const ProcessProjectType = () => {
    const { t } = useTranslation();

    const [createModal, setCreateModal] = useState(false);

    const [loader, setLoader] = useState();
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState();
    const [errorModal, setErrorModal] = useState(false);

    const handleColor = (id) => {
        let itemColor = allData.find(i => id === i.processTypeId).color;
        let a = itemColor.slice(5).split(')')[0].split(',')
        
        const style = {
            color: itemColor,
            background: `rgba(${Number(a[0].trim())}, ${Number(a[1].trim())}, ${Number(a[2].trim())}, 0.25)`,
            borderRadius: '4px',
            padding: '0 4px',
            textAlign: 'center'
        }
        return style
    }

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
            header: t('Process & Project Type'),
            accessorKey: 'process',
            size: '10000',
            Cell: ({ row, cell }) => (
                <span className='table-data-cell-background-color' style={{backgroundColor:row.original.color}}>
                    {
                        cell.getValue()
                    }
               </span>
            )
        },
        {
            header: t('Description'),
            accessorKey: 'description',
            size: '10000',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: '',
            accessorKey: 'action',
            size: '38',
            muiTableBodyCellProps: {
                align: 'center',
            },
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
        setSelectedData(allData.find(i => i.processTypeId === itemId))
        if (Number(statusId) === 0) {
          setShowDeleteModal(true)
        } else if (Number(statusId) === 1) {
          setShowEditModal(true)
        }
    };

    const handleGetAllData = () => {
      setLoader(true)
        FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setAllData(data);
                    setTableData(
                        data.map((item) => ({
                            id: item.processTypeId,
                            process: item.title,
                            description: item.description,
                            color: item.color
                        }))
                    );
                    setLoader(false)
                });
            }else{
              setLoader(false)
            }
        });
    };

    useEffect(() => {
        handleGetAllData();
    }, []);

    const deleteType = () => {
      const body = {
        id: Number(selectedData.id)
      }
      FetchApiPost('services/TaskManagement/ProcessType/DeleteProcessType', 'POST', body)
      
        .then(res => {
          if(res.status === 200 || res.status === 201){
            handleGetAllData();
          }else if(res.status === 409){
            setErrorModal(true)
          }
        })
    }

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
                filterShow={false}
                setFilterShow={() => {}}
                isFilterBtnShow={false}
            />

            {createModal && <CreateModal show={createModal} setShow={setCreateModal} getData={handleGetAllData} />}

            {showEditModal && <UpdateModal show={showEditModal} setShow={setShowEditModal} getData={handleGetAllData} selectedData={selectedData} />}
            {showDeleteModal && <ConfirmModal setShowModal={setShowDeleteModal} func={deleteType} message="Are you sure you want to delete this process project type?" title="Delete" specialText={selectedData.title} />}
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="This process project type is used on the system. You cannot delete this." title="Cannot be Deleted" />}
        </div>
    );
};

export default ProcessProjectType;
