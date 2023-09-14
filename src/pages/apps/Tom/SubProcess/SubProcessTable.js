import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TableAccordion from '../../../../components/Tables/TableAccordion';
import Filter from './Filter';
import NewSubProcess from './NewSubProcess';
import Status from '../../../../components/Status';
import Dropdowns from '../../../../components/Dropdowns';
import { ConfirmModal } from '../../../../components/FormElements/InformationModal';

const SubProcessTable = () => {

    const { t } = useTranslation();

    const [tableData, setTableData] = useState([]);

  /**table filter show */
  const [filterShow, setFilterShow] = useState(true);

  /**add button show */
  const [addButtonShow, setAddButtonShow] = useState(false);

  /**action click obj */
  const [obj, setObj] = useState();

  /**delete modal show */
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  /** update modal show */
  const [updateModalShow, setUpdateModalShow] = useState(false);

  /**table loading */
  const [tableLoading, setTableLoading] = useState(false);

  /**is apply */
  const [isApply, setIsApply] = useState(false);

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

  const columns = [
    {
      header: t('ID'),
      accessorKey: 'subProcessId',
      size: '120'
    },
    {
      header: t('Sub Process name'),
      accessorKey: 'subProcessName',
      size: '120'
    },
    {
      header: t('Day'),
      accessorKey: 'day',
      size: '120'
    },
    {
      header: t('Activity Type'),
      accessorKey: 'activityType',
      size: '120'
    },
    {
      header: t('Mix Type'),
      accessorKey: 'mixType',
      size: '120'
    },
    {
      header: t('Process'),
      accessorKey: 'process',
      size: '120'
    },
    {
      header: t('Status'),
      accessorKey: 'status',
      size: '120',
      Cell: ({ cell }) => (
        <Status approveStatus={cell.getValue() === 'Missing' ? 0 : cell.getValue() === 'Redact' ? 1 : 3} />
      ),
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
  ]


  const deleteSubProcess = () => {

  }
      
  return (
    <>

    <TableAccordion
    filter={<Filter setTableData={setTableData} setTableLoading={setTableLoading} isApply={isApply} setIsApply={setIsApply}/>}
    columns={columns}
    data={tableData}
    isBulkButtons={false}
    isCheckBox={false}
    enableExpanding={false}
    filterShow={filterShow}
    setFilterShow={setFilterShow}
    handleNewButton={()=>setAddButtonShow(true)}
    handlApplyBtn={()=>setIsApply(true)}
    isLoading={tableLoading}
    />

    {
        addButtonShow && (
            <NewSubProcess
            show={addButtonShow}
            setShow={setAddButtonShow}
            />
        )
    }

      {
        deleteModalShow && (
          <ConfirmModal
            setShowModal={setDeleteModalShow}
            func={deleteSubProcess}
            message="Are you sure you want to delete this sub process?"
            title="Delete"
          />
        )
      }
    </>
  )
}

export default SubProcessTable