import React, { useState } from 'react'
import Dropdowns from '../../../../components/Dropdowns';
import { useTranslation } from 'react-i18next';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import { DropDowns } from '../../../../components/FormElements/DropDown/DropDowns';

const ActivityTypeTable = () => {

    const { t } = useTranslation();

    const [tableData, setTableData] = useState([
        {
            id:123456,
            activityType:'metehan',
            description:'atakan'
        }
    ]);

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

    const statusClick = (e,obj,status) => {
          
       if(status.id === 0) { // delete
        setDeleteModal({ modalStatus: true, item: obj })
       }
       else { // edit
        setUpdateActivityType(obj);
        setOnModal(true);
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
            accessorKey: 'id',
            size: '200'
        },
        {
            header: t('Activity Type'),
            accessorKey: 'activityType',
            size: '500'
        },
        {
            header: t('Description'),
            accessorKey: 'description',
            size: '500'
        },
        {
            header: t(' '),
            accessorKey: 'actions',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell: ({ cell, row }) => {
                return (
                    <DropDowns
                       items={items}
                        onClick={onclick}
                        child
                    />
                )
            }
        }
    ];
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
            />
    </div>
  )
}

export default ActivityTypeTable