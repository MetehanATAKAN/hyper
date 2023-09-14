import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AddActivityTypeModal from './AddActivityTypeModal';
import ActivityTypeUpdateModal from './ActivityTypeUpdateModal';
import Dropdowns from '../../../../components/Dropdowns';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { ConfirmModal, ErrorModal } from '../../../../components/FormElements/InformationModal';


const ActivityTypeTable = () => {

    const { t } = useTranslation();

    const history = useHistory();

    const [tableData, setTableData] = useState([]);

    const [isApiCall, setisApiCall] = useState(true);

    /**add modal */
    const [addModal, setAddModal] = useState(false);

    const [updateActivityType, setUpdateActivityType] = useState({});
    const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });

    const [onModal, setOnModal] = useState(false);

    /**action click obj */

    const [obj, setObj] = useState();

    /**delete modal show */ 
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    /** update modal show */
    const [updateModalShow, setUpdateModalShow] = useState(false);

    /**error modal */
    const [errorModal, setErrorModal] = useState(false);

    const statusOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
            disabled:false
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
            disabled:true
        },
    ]

    const statusClick = (e,obj,el) => {
        const status = el.key ;
        const data = obj ;
       
       if(status === 'Edit') { // edit
        setUpdateModalShow(true);
        setObj(data);
       }
       else { // delete
        setDeleteModalShow(true);
        setObj(data);
       }
    }

    const selectOption = (e, row) => {
        const id = Number(e.key);
        setObj(row);
        if (id === 0) { // edit
            setUpdateModalShow(true);
        }
        else { // delete
            setDeleteModalShow(true);
        }
    }

    const deleteActivityType = () => {
        const body = {
            id:obj.id
        }
        FetchApiPost('services/TaskManagement/ActivityType/DeleteActivityType', 'POST',body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setisApiCall(true);
                        }
                        else if(res.status === 409) {

                        }
                        else if (res.status === 500 || res.status === 499) {

                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

    const columns = [
        {
            header: t('ID'),
            accessorKey: 'activityTypeId',
            size: '200'
        },
        {
            header: t('Activity Type'),
            accessorKey: 'activityType',
            size: '350',
            Cell: ({ cell, row }) => {
                const data = row.original.activityType;
                const color = row.original.color;
                if(data !== null ) {
                   return (
                    <span className='table-data-cell-background-color' style={{backgroundColor:color}}>
                    {
                        data
                    }
               </span>
                   )
                }
            }
        },
        {
            header: t('Description'),
            accessorKey: 'description',
            size: '350'
        },
         {
            header: '',
            accessorKey: 'action',
            size: '38',
            muiTableBodyCellProps: {
                align: 'center',
              },
              enableColumnActions: true,
             Cell: ({ cell, row }) => {
                 return (
                     <Dropdowns
                         option={statusOptions}
                         obj={row.original}
                         // option={getStatusOptions(cell.getValue(), row.original)}
                         onClick={statusClick}
                     />
                 )
             }
        }
    ];

    useEffect(() => {
        if(isApiCall) {
            FetchApiGet('services/TaskManagement/ActivityType/GetAllActivityTypes', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setisApiCall(false);
                            res.json().then(el => {
                                setTableData(el.data?.map(data => (
                                    {
                                        id : data.id,
                                        activityTypeId: data.activityTypeId,
                                        activityType: data.title,
                                        description:  data.description, 
                                        color:data.color
                                       
                                    }
                                )))
                            })

                        }
                        else if (res.status === 500 || res.status === 499) {

                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
        }
    }, [history, isApiCall])
    
  return (
    <div>
        <TableAccordion
                data={tableData}
                columns={columns}
                isShowNewBtn={true}
                isFilter={false}
                isCheckBox={false}
                enableExpanding={false}
                handleDropDownItemClick={selectOption}
                actionsSize={50}
                isBulkButtons={false}
                handleNewButton={()=>setAddModal(true)}
            />
            {
                addModal && (
                    <AddActivityTypeModal
                    show={addModal}
                    setShow={setAddModal}
                    setisApiCall={setisApiCall}
                    />
                )
            }

            {
                updateModalShow && (
                    <ActivityTypeUpdateModal
                    show={updateModalShow}
                    setShow={setUpdateModalShow}
                    setisApiCall={setisApiCall}
                    data={obj}
                    />
                )
            }
            {
            deleteModalShow && (
                <ConfirmModal 
                setShowModal={setDeleteModalShow} 
                func={deleteActivityType} 
                message="Are you sure you want to delete this activity type?" 
                title="Delete" 
                />
            )
            }
            {
            errorModal && (
                <ErrorModal 
                setShowModal={setErrorModal} 
                message="This activity type is used on the system. You cannot delete this." 
                title="Cannot be Deleted" 
                />
            )}
    </div>
  )
}

export default ActivityTypeTable