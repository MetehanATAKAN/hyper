import React, { useState } from 'react'
import TableAccordion from '../../../../components/Tables/TableAccordion'
import Filter from './Filter';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import ErrorInput from './ErrorInput';

const TableVisitEvaluation = ({
  reportType,
  selectReportType,
  setSelectReportType,
  setIsApply,
  isApply,
  setIsDelete,
  isDelete
}) => {

  const { t } = useTranslation();

  const exceptThisSymbols = ["e", "E", "+", "-", ".", "," , "*", "/", " "];

  const [data, setData] = useState([]);

  const [errorModalShow, setErrorModalShow] = useState(false);

  /**save */
  const [saveVisitEvaluation, setSaveVisitEvaluation] = useState(false);

  const [firstValue, setFirstValue] = useState(null);

  const [filterShow, setFilterShow] = useState(true);

  const changeNumberOfPatients = async (e, cell, row) => {
    const value = Number(e.target.value);
    const rowId = row.original.id;

    const newArray = data?.map(el => {
      if (el.id === rowId) {
        return { ...el, evaluationPercent: value }
      }
      return el;
    });
    setData(newArray);
  }

  const blurNumberOfPatients = async (e,cell,row) => {
    const value = Number(e.target.value);
    const rowId = row.original.id;
    if(value >100) {
      console.log('if');
        setErrorModalShow(true);
        const newArray = data?.map(el =>{
            if(el.id === rowId) {
                return {...el, evaluationPercent:firstValue}
            }
            return el;
        });
        setData(newArray);
    }
    else {
      if(value % 20 !== 0) {
        setErrorModalShow(true);
        const newArray = data?.map(el =>{
          if(el.id === rowId) {
              return {...el, evaluationPercent:firstValue}
          }
          return el;
      });
      setData(newArray);
      }
      else {
        const newArray = data?.map(el =>{
          if(el.id === rowId) {
              return {...el, evaluationPercent:value}
          }
          return el;
      });
      setData(newArray);
      }
    }
    
  }

  const columns = [
    {
      header: t('Client Type'),
      accessorKey: 'clientType',
      size: '120'
    },
    {
      header: t('Report Type'),
      accessorKey: 'reportType',
      size: '150'
    },
    {
      header: t('Business Unite'),
      accessorKey: 'businessUnite',
      size: '150'
    },
    {
      header: t('Workplace'),
      accessorKey: 'workPlace',
      size: '150'
    },
    {
      header: t('Specialization'),
      accessorKey: 'specialization',
      size: '150'
    },
    {
      header: t('Client'),
      accessorKey: 'client',
      size: '150'
    },
    {
      header: t('Category'),
      accessorKey: 'category',
      size: '150',
      muiTableBodyCellProps: {
        align: 'center',
    },
      Cell: ({ cell, row }) => {
        if(row.original.category === 'A') {
          return(
            <span
            style={{
                backgroundColor: 'rgba(10, 207, 151, 0.15)',
                color: 'rgb(10, 207, 151)',
                padding: '2px 8px',
                borderRadius: '3px',
            }}
            >
                {cell.getValue()}
            </span>
          )
        }
       else if(row.original.category === 'B') {
            return(
              <span
              style={{
                  backgroundColor: 'rgba(253, 126, 20, 0.15)',
                  color: 'rgb(253, 126, 20)',
                  padding: '2px 8px',
                  borderRadius: '3px',
              }}
              >
                  {cell.getValue()}
              </span>
            )
          }
         else if(row.original.category === 'C') {
            return(
              <span
              style={{
                  backgroundColor: 'rgba(250, 92, 124,0.15)',
                  color: 'rgb(250, 92, 124)',
                  padding: '2px 8px',
                  borderRadius: '3px',
              }}
              >
                  {cell.getValue()}
              </span>
            )
          }
          else  {
            return(
              <span>
                  {cell.getValue()}
              </span>
            )
          }
      }
      
    },
    {
      header: t('Product'),
      accessorKey: 'product',
      size: '150'
    },
    {
      header: t('%'),
      accessorKey: 'evaluationPercent',
      size: '150',
      Cell: ({ cell, row }) => (
        <Input
          placeholder="-"
          type="number"
          name={cell.column.id}
          value={cell.getValue()}
          id={row.original.rowId}
          onBlur={(e) => blurNumberOfPatients(e,cell,row)}
          onChange={(e) => changeNumberOfPatients(e,cell,row)}
          // disabled={!disable}
          size="small"
          style={{ textAlign: 'right' }}
          onFocus={(e)=>setFirstValue(e.target.value)}
          onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}
        />
      )
    }
  ]

  return (
    <div>
      <TableAccordion
      data={data}
      columns={columns}
      filter={
        <Filter
        reportType={reportType}
        selectReportType={selectReportType}
        setSelectReportType={setSelectReportType}
        setTableData={setData}
        tableData={data}
        setIsApply={setIsApply}
        isApply={isApply}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        setIsSave={setSaveVisitEvaluation}
        isSave={saveVisitEvaluation}
        />
      }
      isCheckBox={false}
      filterShow={filterShow}
      setFilterShow={setFilterShow}
      isShowNewBtn={false}
      enableExpanding={false}
      isBulkButtons={false}
      handlApplyBtn={()=>setIsApply(true)}
      isSaveIcon={true}
      saveBtn={()=>setSaveVisitEvaluation(true)}
      />

{
        errorModalShow &&
        <ErrorInput
          messages={'The value entered cannot be greater than 100 and must be a multiple of 10.'}
          modalShow={errorModalShow}
          setModalShow={setErrorModalShow}
        />
      }
    </div>
  )
}

export default TableVisitEvaluation