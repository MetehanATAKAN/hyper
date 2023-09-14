import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import ErrorInput from './ErrorInput';
import PaginationTable from '../../../../components/PaginationTable';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';

const Table2 = ({ 
  tableData, 
  setTableData, 
  tableItem, 
  setTableItem,
  setSelectReportTypeName,
   selectReportTypeName,
   totalItems,
   currentPage,
   itemsPerPage,
   setItemsPerPage,
   setCurrentPage,
   setTotalItems,
   isFilter,
   noDataModalShow,
   setNoDataModalShow
   }) => {

  const { t } = useTranslation();
  const history = useHistory();

  const [first, setfirst] = useState(null);
  const employeeId = localStorage.getItem('userEmpId');

 
  const exceptThisSymbols = ["e", "E", "+", "-", ".", "," , "*", "/", " "];

  const [errorModalShow, setErrorModalShow] = useState(false);

  const [count, setCount] = useState(null);
  
  const [searchValue, setSearchValue] = useState('');
   
  const findPatientNumber = (item, data) => {

    let patientNumber = data.profiles.find(x => x.profileId === item.id);
    if (patientNumber !== undefined) {
      return patientNumber.patientNumber
    }
    else {
      return 0
    }
  }

  const searchTable = async (value) => {

    await setSearchValue(value);
    let tableDatas = tableItem.slice((currentPage * itemsPerPage - itemsPerPage), itemsPerPage * currentPage);
    const filterData = tableDatas.filter((person) => {
      return Object.keys(person).some((key) =>
        person[key]
          .toString()
          .toLowerCase()
          .includes(value.toString().toLocaleLowerCase())
      )
    })

    setTableData(filterData);
  }

  const changeTableInput = (value, eventId, headId,oldValue) => {
    
   
     
    const newItem = tableItem.find(data => data.eventId === eventId);
  
    const x = newItem.headers.map(item => {
      if (item.id === headId) {

        if(value === '') return { ...item, patientNumber: '' };
        if(value >100){
          setErrorModalShow(true);
        }
        else {
          if(value.charAt(0) === '0' && value.length !== 1) {
            setErrorModalShow(true);
            return { ...item, patientNumber: first }
          }
          else {
            return { ...item, patientNumber: Number(value) }
          }
        }
     
      }
      return item
    })

    const newState = tableItem.map(obj => {
      if (obj.eventId === eventId) {
        return { ...obj, headers: x }
      }
      return obj
    })

    setTableItem(newState);
  }

  const profiles = (data) => {
    const filter = data.headers.filter( item => item.isProfile === true && item.id !== 0 );

    const newProfiles = filter.map ( item => {
      return {
        eventId: data.eventId,
        profileId: item.id,
        profileName: item.profileName,
        patientNumber: item.patientNumber === '' ? 0 : item.patientNumber,
        indicationId  : item.indicationId,
        indicationName  : item.indicationName
      }
    })

    return newProfiles;
   
  }

  const save = () => {

    const body = {
      patientNumber: tableItem.map(data => (
        {
          employeeId: employeeId,
          reportType: data?.typeId,
          businessUnitId: data?.businessUnitId,
          businessUnitName: data?.businessUnitName,
          customerId: data?.clientId,
          customerName: data?.clientName,
          specId: data?.specId,
          specName: data?.specName,
          clinicId: data?.clinicId,
          clinicName: data?.clinicName,
          brandId: data.productId,
          brandName: data.productName,
          event: {
            id: data.event.id,
            eventName: data.event.eventName,
            description: data.event.description,
            title: data.event.title,
            deleteReason: data.event.deleteReason,
            employeeId: data.event.employeeId,
            employeeName: data.event.employeeName,
            creatorId: data.event.creatorId,
            creatorName: data.event.creatorName,
            color: data.event.color,
            status: data.event.status,
            appStatus: data.event.appStatus,
            activityType: {
              id: data.activityType?.id,
              activityTypeName: data.activityType?.activityTypeName,
              color: data.activityType?.color
            }
          },
          profiles: profiles(data)
        }
      ))
    }

    

    FetchApiPost('services/Daywork/MMDataCheck/SavePatientNumber', 'POST', body)
      .then((res) =>
        (async () => {
          try {
            if (res.status === 201) {
              res.json().then(data => {

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

  useEffect(() => {
    if (tableData.length !== 0) {
      setCount(49 / (tableData[0]?.headers.length - 6))
    }
  }, [tableData])

  useEffect(() => {
    setTableData(
      tableItem.slice((currentPage * itemsPerPage - itemsPerPage), itemsPerPage * currentPage)
    )
  }, [currentPage, itemsPerPage, tableItem])

  useEffect(() => {
    setTotalItems(tableItem?.length)
  }, [tableItem])

  useEffect(() => {
    if (searchValue !== '') {
      searchTable(searchValue);
    }
  }, [currentPage])



  return (
    <div className='mm-data-check-table'>
      {
        tableData.length !== 0 &&
        <>
        <div>

        {/* <div
          className={'search'}
          style={{ position: 'relative' }}>
          <input placeholder={t('search...')} onChange={(e) => searchTable(e.target.value)} defaultValue={searchValue} />
          <Icon path={mdiMagnify} color={'#6C757D'} title="Search" />
        </div> */}

        <div className='d-flex justify-content-end'>
          <Button variant="success" disabled={tableItem.length !== 0 ? false : true} onClick={save} >{t('save')}</Button>
        </div>
      </div>
        <div className='table-reserve'>
        <Table className='table-profile-strategy' bordered>
          <thead>
            <tr id='header2'>
              {
                tableData[0].headers.map(head => (
                  head.id === 0
                    ? <th style={{ width: '500' }} id={head.name}> <div className={`header-name`}> {t(head.title)} </div> </th>
                    : <th style={{ width: `200` }} id={head.name}> 
                    <OverlayTrigger
                    key={head.id}
                    placement='bottom'
                    overlay={
                      <Tooltip id={head.id} >
                        {head.profileName}
                      </Tooltip>
                    }
                    >
                    <div className={`header-name`}>{head.title}</div> 
                    </OverlayTrigger>
                    </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              tableData.map(data => (
                <tr>
                  <td id="businessUnit">
                    <div className='body-data'>
                      {data.businessUnitName}
                    </div>
                  </td>
                  <td id="category">
                    <div className='body-data'>
                      {data.category}
                    </div>
                  </td>
                  <td id="clients">
                    <div className='body-data'>
                      {data.clientName}
                    </div>
                  </td>
                  <td id="product"> 
                  <div className='body-data'>
                  {data.productName}
                  </div>
                   </td>
                  <td id="reportType">
                    <div className='body-data'>
                    {
                      data.reportTypeId === 1
                        ? 'Number of Patient'
                        : 'Loyalty'
                    }
                    </div>
                  </td>
                  <td id="specialization"> 
                  <div className='body-data'>
                  {data.specName}
                  </div>
                   </td>
                  <td id="visitType">
                    <div className='body-data'>
                    {
                      data.visitTypeId === 1
                        ? 'Physician'
                        : 'Pharmaciest'
                    }
                    </div>
                  </td>
                  {
                    data.headers.filter(head => head.id !== 0).map(item => (
                      <td style={{ width: `${count}%` }} >
                        <div className='body-data'>
                        <input 
                        disabled={!item.isProfile} 
                        type={'number'} 
                        onChange={(e) => changeTableInput(e.target.value, data.eventId, item.id,item.patientNumber)} 
                        onFocus={(e)=>setfirst(e.target.value)}
                        value={item.patientNumber} 
                        onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}
                        />
                        </div>
                      </td>
                    ))

                  }
                </tr>
              ))
            }
          </tbody>
        </Table>
        </div>
        <PaginationTable
                    total={totalItems}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
        {/* <PaginationComponent
        total={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}

      {
        errorModalShow &&
        <ErrorInput
        messages={'The entered value cannot be greater than 100.'}
        modalShow={errorModalShow}
        setModalShow={setErrorModalShow}
        />
      }

        </>
      }
       {
     noDataModalShow &&
        <ErrorInput
        messages={'No Data'}
        modalShow={noDataModalShow}
        setModalShow={setNoDataModalShow}

        />
      }
    </div>
  )
}

export default Table2