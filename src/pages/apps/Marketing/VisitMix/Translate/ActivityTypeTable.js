import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import TableAccordion from '../../../../../components/Tables/TableAccordion';
import { DropDowns } from '../../../../../components/FormElements/DropDown/DropDowns';
import { FetchApiGet } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AddActivityTypeModal from './AddActivityTypeModal';
import Dropdowns from '../../../../../components/Dropdowns';
import ActivityTypeUpdateModal from './ActivityTypeUpdateModal';


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

    const selectRow = (id) => {
       const obj = tableData?.find(data => data?.id === id);
       return obj;
    }

     const items = [
        {
            key: 1,
            label: '1st menu item',
        },
        {
            key: 2,
            label: ' 2nd menu item',
            children: [
                {
                    key: 6,
                    label: '3rd menu item',
                    danger: true,
                },
                {
                    key: 8,
                    label: '4th menu item',
                },
            ],
        },
        {
            key: 3,
            label: ' 3rd menu item (disabled)',
            disabled: true,
        },
        {
            key: 4,
            danger: true,
            label: 'a danger item',
        },
    ];



    const onClick = ({ key }) => {
        console.log(`Click on item ${key}`);
    };

    const columns = [
        {
            header: t('ID'),
            accessorKey: 'activityTypeId',
            size: '200'
        },
        {
            header: t('Activity Type'),
            accessorKey: 'activityType',
            size: '350'
        },
        {
            header: t('Description'),
            accessorKey: 'description',
            size: '350',
            Cell: ({ cell, row }) => {
                const data = row.original.description;
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
            header: '',
            accessorKey: 'action',
            size: '50',
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
    </div>
  )
}

export default ActivityTypeTable