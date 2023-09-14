import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from './Filter';
import TableAccordion from '../../../components/Tables/TableAccordion';
import { useSelector } from 'react-redux';
import { FetchApiPost } from '../../../utils/http.helper';
import { useHistory } from 'react-router';
import Loading from '../../../components/Loading';
import { Tooltip } from '@mui/material';

const Table = ({
  tableData,
  setTableData
}) => {

    const { t } = useTranslation();

    const history = useHistory();

    const [show, setShow] = useState(true);
    const [applyLoading, setApplyLoading] = useState(false);

    /**emp Id */
    const empId = localStorage.getItem('userEmpId');

    const filterData = useSelector(state => state.Reconciliation.filterData);

  const columnsx = [
    {
      header: t('Type of Contractor'),
      accessorKey: 'typeOfContractor',
      size: '175'
    },
    {
      header: t('Agreement'),
      accessorKey: 'agreement',
      size: '150'
    },
    {
      header: t('Seller'),
      accessorKey: 'seller',
      size: '75'
    },
    {
      header: t('Buyer'),
      accessorKey: 'buyer',
      size: '300'
    },
    {
      header: t('Doc Type'),
      accessorKey: 'docType',
      size: '200',
      Cell: ({ cell, row }) => {
        if (cell.getValue()) {
          const name = cell.row.original.docType;
      
         const changeColor = (colorName,name) => {
          if(colorName === 'bgColor') {
            if(name === 'Out Invoice') {
              return 'rgba(253, 126, 20, 0.15)'
            }
            else if(name === 'Bank Transaction') {
              return 'rgba(10, 207, 151, 0.15)'
            }
            else if(name === 'Credit Note') {
              return 'rgba(255, 188, 0, 0.15)'
            }
            else if(name === 'Total'){
              return 'rgba(0, 160, 223, 0.15)'
            }
          }
          else if(colorName === 'textColor') {
            if(name === 'Out Invoice') {
              return 'rgb(253, 126, 20)'
            }
            else if(name === 'Bank Transaction') {
              return 'rgb(10, 207, 151)'
            }
            else if(name === 'Credit Note') {
              return 'rgb(255, 188, 0)'
            }
            else if(name === 'Total'){
              return 'rgb(0, 160, 223)'
            }
          }
          
         } 
         return (
          <Tooltip
            title={row.original.tip ? row.original.tip : cell.getValue()}
            placement="bottom-start"
            arrow>
            <div style={{ display: 'flex', gap: '3px',justifyContent:'center' }}>
              <span
                style={{
                  backgroundColor: changeColor('bgColor',name),
                  color: changeColor('textColor',name),
                  padding: '2px 8px',
                  borderRadius: '3px',
                }}>
                {name}
              </span>
            </div>
          </Tooltip>
        );
        }
        
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: t('Document No'),
      accessorKey: 'documentNo',
      size: '150'
    },
    {
      header: t('Date'),
      accessorKey: 'date',
      size: '150'
    },
    {
      header: t('Debit'),
      accessorKey: 'debit',
      muiTableBodyCellProps: {
        align: 'right',
      },
      size: '150'
    },
    {
      header: t('Debit Currency'),
      accessorKey: 'debitCurrency',
      muiTableBodyCellProps: {
        align: 'center',
      },
      size: '150'
    },
    {
      header: t('Credit'),
      accessorKey: 'credit',
      muiTableBodyCellProps: {
        align: 'right',
      },
      size: '150'
    },
    {
      header: t('Credit Currency'),
      accessorKey: 'creditCurrency',
      muiTableBodyCellProps: {
        align: 'center',
      },
      size: '150'
    },
    {
      header: t('Balance'),
      accessorKey: 'balance',
      muiTableBodyCellProps: {
        align: 'right',
      },
      size: '150'
    },
    {
      header: t('Balance Currency'),
      accessorKey: 'balanceCurrency',
      muiTableBodyCellProps: {
        align: 'center',
      },
      size: '150'
    },
    {
      header: t('Exchange Range'),
      accessorKey: 'exchangeRange',
      muiTableBodyCellProps: {
        align: 'right',
      },
      size: '150'
    },
    {
      header: t('Connection'),
      accessorKey: 'connection',
      size: '150'
    },
  ]

   
    /**Date today */
    const todayDay = `${new Date().toLocaleDateString('tr-TR')}T00:00:00.000Z` ;

    /**Apply Filter */
    const applyFilter = () => {

      let counter = 0 ;
      Object.keys(filterData).forEach((property,index) => {
        if(filterData[property] === undefined || filterData[property]?.length === 0) counter++ ;
      })

  
      if(counter === 0) {
        const body = {
          EmpId: empId,
          SellerCountryId: String(filterData?.seller.CountryId),
          SellerType: filterData?.sellerType.value,
          SellerId: filterData?.seller.value,
          TypeOfContract:String( filterData?.typeOfContractor.map(data => data.value)),
          BuyerCountryId: String(filterData?.country.value),
          BuyerId: filterData?.buyer.value,
          Aggrement: String(filterData?.aggrement.map(data => data.value)),
          Status: "1",
          StartDate: filterData?.startDate.length === 0 ? todayDay : filterData.startDate,
          FinishDate: filterData.endDate.length === 0 ? todayDay : filterData.endDate,
          Currency: String(filterData.currency?.value)
      }

      setApplyLoading(true);
      FetchApiPost('api/Reconcilation/GetReconcilationData','POST',body)
      .then((res) =>
      (async () => {
          try {
              if (res.status === 200) {
                  res.json().then(data => {
                      setApplyLoading(false);
                      setTableData(data?.map((item,index) =>(
                          {
                              id:index,
                              typeOfContractor:item.TypeOfContract === null ? '-' : item.TypeOfContract,
                              agreement:item.Aggrement === null ? '-' : item.Aggrement,
                              seller:item.Seller === null ? '-' : item.Seller,
                              buyer:item.Buyer === null ? '-' : item.Buyer,
                              docType:item.DocType,
                              documentNo:item.DocumentNumber === null ? '-' : item.DocumentNumber,
                              date:item.DateStr,
                              debit:parseFloat(item.Debit.toFixed(2)),
                              debitCurrency:item.Currency,
                              credit:parseFloat(item.Credit.toFixed(2)),
                              creditCurrency:item.Currency,
                              balance:parseFloat(item.Balance.toFixed(2)),
                              balanceCurrency:item.Currency,
                              exchangeRange:item.Rate,
                              connection:item.Connect === null ? '-' : item.Connect
                          }
                      )))
                     
                  })

              }
              else if (res.status === 500 || res.status === 499) {
                  setApplyLoading(false);
                  history.push('/error-500');

              }
              else {
                  setApplyLoading(false);
              }

          } catch (error) {
              console.log('error', error);
          }
      })()
  )
      }
    }
    
    /**Clear Filter */
    const clearFilter = () => {
      console.log('clear filter da');
    }

  return (
    <div>
      <TableAccordion
      data={tableData}
      columns={columnsx}
      filter={<Filter/>}
      handlApplyBtn={applyFilter}
      isCheckBox={false}
      filterShow={show}
      setFilterShow={setShow}
      pageSize={100}
      />
        {/* <MainTable
              tableData={tableData}
              columns={columns}
              exportColumns={exportColumns}
              columnWidths={columnWidths}
              setColumnWidths={setColumnWidths}
              tableColumnExtensions={tableColumnExtensions}
              itemsFromBackend={itemsFromBackend}
              columnOrders={columnOrders}
              setColumnOrders={setColumnOrders}
              showorHideColumnsItems={showorHideColumnsItems}
              totalSummaryItems={totalSummaryItems}
              groupSummaryItems={groupSummaryItems}
              groupByItems={groupByItems}
              setGroupByItems={setGroupByItems}
              isAddButton={false}
              isFilters={true}
              filters={<Filter
              tableData={tableData}
              setTableData={setTableData}
              />}
          /> */}
          <Loading loading={applyLoading} />
    </div>
  )
}

export default Table