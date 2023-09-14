import React, { useState } from 'react'
import TableAccordion from '../../../../components/Tables/TableAccordion'
import Filter from './Filter';
import { useTranslation } from 'react-i18next';
import { Input } from 'antd';
import ErrorInput from './ErrorInput';

const TableLoyalty = ({
  reportType,
  selectReportType,
  setSelectReportType,
  setIsApply,
  isApply,
  setIsDelete,
  isDelete
}) => {

  const { t } = useTranslation();

  const [data, setData] = useState([]);

  const exceptThisSymbols = ["e", "E", "+", "-", ".", "," , "*", "/", " "];

  const [firstValue, setFirstValue] = useState(null);

  const [filterShow, setFilterShow] = useState(true);

   /**save */
  const [saveLoyalty, setSaveLoyalty] = useState(false);

  const [errorModalShow, setErrorModalShow] = useState(false);

  /**loading */
  const [loyaltyLoading, setLoyaltyLoading] = useState(false);

  const changeLoyalty = async (e,cell,row) => {
    const value = Number(e.target.value);
    const rowId = row.original.id;
    
    if(value >100) {
        setErrorModalShow(true);
        const newArray = data?.map(el =>{
            if(el.id === rowId) {
                return {...el, loyalty:firstValue}
            }
            return el;
        });
        setData(newArray);
    }
    else {
        const newArray = data?.map(el =>{
            if(el.id === rowId) {
                return {...el, loyalty:value}
            }
            return el;
        });
        setData(newArray);
    }
    
  }

  const columns = [
    {
      header: t('Client Type'),
      accessorKey: 'clientType',
      size: '130'
    },
    {
      header: t('Report Type'),
      accessorKey: 'reportType',
      size: '130'
    },
    {
      header: t('Business Unite'),
      accessorKey: 'businessUnite',
      size: '130'
    },
    {
      header: t('Workplace'),
      accessorKey: 'workPlace',
      size: '130'
    },
    {
      header: t('Specialization'),
      accessorKey: 'specialization',
      size: '130'
    },
    {
      header: t('Client'),
      accessorKey: 'client',
      size: '130'
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
      size: '130'
    },
    {
      header: t('Indication'),
      accessorKey: 'indication',
      size: '130'
    },
    {
      header: t('Profile'),
      accessorKey: 'profile',
      size: '130'
    },
    {
      header: t('Global Sku'),
      accessorKey: 'globalSku',
      size: '130'
    },
    {
      header: t('%'),
      accessorKey: 'loyalty',
      size: '130',
      Cell: ({ cell, row }) => (
        <Input
          placeholder="-"
          type="number"
          name={cell.column.id}
          value={cell.getValue()}
          id={row.original.rowId}
          onChange={(e) => changeLoyalty(e,cell,row)}
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
        setIsApply={setIsApply}
        isApply={isApply}
        setLoading={setLoyaltyLoading}
        setTableData={setData}
        tableData={data}
        setIsSave={setSaveLoyalty}
        isSave={saveLoyalty}
        />
      }
      isCheckBox={false}
      filterShow={filterShow}
      setFilterShow={setFilterShow}
      isShowNewBtn={false}
      enableExpanding={false}
      isBulkButtons={false}
      handlApplyBtn={()=>setIsApply(true)}
      isLoading={loyaltyLoading}
      handlClearBtn={()=>setIsDelete(true)} 
      isSaveIcon={true}
      saveBtn={()=>setSaveLoyalty(true)}
      />

{
        errorModalShow &&
        <ErrorInput
          messages={'The entered value cannot be greater than 100.'}
          modalShow={errorModalShow}
          setModalShow={setErrorModalShow}
        />
      }
    </div>
  )
}

export default TableLoyalty