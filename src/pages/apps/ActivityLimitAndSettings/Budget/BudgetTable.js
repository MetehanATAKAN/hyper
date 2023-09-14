import React, { useState, useEffect } from 'react'
import MainTable from '../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import { FetchApiGet } from '../../../../utils/http.helper';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

const BudgetTable = ({ tableData, setTableData }) => {

  const { t } = useTranslation();
  const activityId = useSelector(state => state.ActivityLimit.activityId);

  const partcipiantsTable = useSelector(state => state.ActivityLimit.participantTableDatas);
  const ownerTable = useSelector(state => state.ActivityLimit.ownersTableDatas);
  const exceptThisSymbols = ["e", "E", "+", "-" , "*", "/", " "];


  // const [filterData, setfilterData] = useState([
  //     { headerName: 'Company' },
  //     { headerName: 'Position' },
  //     { headerName: 'Business Unite' },
  //     { headerName: 'Product/Zone or Area' },
  //     { headerName: 'Client' },
  //     { headerName: 'Budget' },
  //     { headerName: 'KOL' },
  //     { headerName: 'Company2' },
  //     { headerName: 'Guest' },
  // ])


  const [tableHeaderName, setTableHeaderName] = useState([
    { name: '.', title: '.' },
    { name: 'kol', title: 'KOL' },
    { name: 'performer', title: 'Performer' },
    { name: 'oSubordinator', title: 'O.Subordinator' },
    { name: 'fSubordinator', title: 'F.Subordinator' },
    { name: 'oSupervisor', title: 'O.Supervisor' },
    { name: 'fSupervisor', title: 'F.Supervisor' },
    { name: 'spainFS', title: 'Spain FS' },
    { name: 'client', title: 'Client' },
    { name: 'total', title: 'Total' },
  ])

  const [table, setTable] = useState([
    {
      id: 0,
      headerName: 'PM / ALPHA / Uzbekistan RO',
      isCollapsed: true,
    }
  ])

  const [totalHeader, setTotalHeader] = useState([
    { total: 10, name: '.', title: '.' },
    { total: 10, name: 'kol', title: 'KOL' },
    { total: 10, name: 'performer', title: 'Performer' },
    { total: 10, name: 'oSubordinator', title: 'O.Subordinator' },
    { total: 10, name: 'fSubordinator', title: 'F.Subordinator' },
    { total: 10, name: 'oSupervisor', title: 'O.Supervisor' },
    { total: 10, name: 'fSupervisor', title: 'F.Supervisor' },
    { total: 10, name: 'spainFS', title: 'Spain FS' },
    { total: 10, name: 'client', title: 'Client' },
    { total: 10, name: 'total', title: 'Total' },
  ])

  const [tableDatas, setTableDatas] = useState([
    // {
    //   quantity: 'Quantity',
    //   kol: 10,
    //   performer: 10,
    //   oSubordinator: 10,
    //   fSubordinator: 10,
    //   oSupervisor: 10,
    //   fSupervisor: 10,
    //   spainFS: 10,
    //   spainFSBudget: false,
    //   client: 10,
    //   total: 90,
    // },
    // {
    //   quantity: 'ACC1',
    //   kol: 10,
    //   performer: 10,
    //   oSubordinator: 10,
    //   fSubordinator: 10,
    //   oSupervisor: 10,
    //   fSupervisor: 10,
    //   spainFS: 10,
    //   spainFSBudget: false,
    //   client: 10,
    //   total: 90,
    // },
    // {
    //   quantity: 'ACC2',
    //   kol: 10,
    //   performer: 10,
    //   oSubordinator: 10,
    //   fSubordinator: 10,
    //   oSupervisor: 10,
    //   fSupervisor: 10,
    //   spainFS: 10,
    //   spainFSBudget: false,
    //   client: 10,
    //   total: 90,
    // },
    // {
    //   quantity: 'ACC3',
    //   kol: 10,
    //   performer: 10,
    //   oSubordinator: 10,
    //   fSubordinator: 10,
    //   oSupervisor: 10,
    //   fSupervisor: 10,
    //   spainFS: 10,
    //   spainFSBudget: false,
    //   client: 10,
    //   total: 90,
    // },
  ])

  console.log(tableDatas);

  const spainFSBudget = (name,id,dataId) => {

    if (name === 'quantity') {
    
     setTableDatas(prev=>{
      const newState=prev.map(item=> {
        if(item.id === id) {
           item.getQuantityResponses[0].isForeignCompany = !item.getQuantityResponses[0].isForeignCompany
        }
        return item
      })
      return newState
     })
    }

    else {
      setTableDatas(prev => {
        const newState=prev.map(item=>{
          if(item.id === id) {
            item.accResponses.map(data=>{
              if(data.accUniqId === dataId){
                return(
                  data.isForeignCompany = !data.isForeignCompany
                )
              }
              return data
            })
          }
          return item
        })
        return newState
      })
    }

    // setTableDatas(prevState => {
    //   return prevState.map(item => {
    //     if (item.quantity === quantity) {
    //       item.spainFSBudget = !item.spainFSBudget
    //     }
    //     return item
    //   }
    //   )
    // }
    // )
  }
 
  useEffect(() => {
    if (activityId !== 0 && partcipiantsTable.length !== 0 && ownerTable.length !== 0) {
      FetchApiGet(`services/Settings/ActivityBudget/GetBudgetByActivityId?id=${activityId}`, 'GET')
        .then(response => response.json())
        .then(response => setTableDatas(response.data.map(data => (
          {
            accResponses: data.accResponses,
            activityId: data.activityId,
            businessUnitId: data.businessUnitId,
            businessUnitName: data.businessUnitName,
            companyId: data.companyId,
            companyName: data.companyName,
            getQuantityResponses: data.getQuantityResponses,
            header: data.header,
            id: data.id,
            positionId: data.positionId,
            positionName: data.positionName,
            isCollapsed: false
          }
        ))))
        .catch(error => console.log(error))
    }
  }, [activityId, ownerTable, partcipiantsTable])

  const isCollapsed = (id) => {
    setTableDatas(prev => {
      const newState = prev.map(data => {
        if (data.id === id) {
          return {
            ...data, isCollapsed: !data.isCollapsed
          }
        }
        return data;
      })

      return newState;
    })
  }


  return (
    // <>
    // <Table striped bordered hover>
    //   <thead>
    //     <tr>
    //       <th>#</th>
    //       <th>First Name</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //       <th>Last Name</th>
    //       <th>Username</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td>1</td>
    //       <td>Mark</td>
    //       <td>Otto</td>
    //       <td>@mdo</td>
    //     </tr>
    //     <tr>
    //       <td>2</td>
    //       <td>Jacob</td>
    //       <td>Thornton</td>
    //       <td>@fat</td>
    //     </tr>
    //     <tr>
    //       <td>3</td>
    //       <td colSpan={2}>Larry the Bird</td>
    //       <td>@twitter</td>
    //     </tr>
        
    //   </tbody>
    // </Table>
    // </>
    <div className='budget-table' >
      <br />
      <table>
        <tr style={{ backgroundColor: '#F1F3FA', color: '#6C757D' }}>
          {
            tableHeaderName.map(item => (
              <th>{t(item.title)}</th>
            ))
          }
        </tr>

        <tr style={{ backgroundColor: '#02A0DF', color: '#FFFFFF' }} >
          {
            totalHeader.map((item, index) => (
              <td className='text-center p-0'>{item.total}</td>
            ))
          }
        </tr>


        {
          tableDatas?.map((item, i) => (
            <>

              <tr onClick={() => isCollapsed(item.id)} style={{ cursor: 'pointer' }} >
                <th colSpan={10}>
                  <span><i className="fa-solid fa-caret-down"></i></span>
                  <span>{item.header} </span>
                </th>
              </tr>

              {
                item.isCollapsed === true &&
                item.getQuantityResponses?.map((data, i) => (
                  <tr key={i}>
                    <td style={{ backgroundColor: '#F1F3FA' }} > Quantity </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.kol} style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}  onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}/>
                    </td>
                    <td className='text-center p-0' > {t(data.performer)} </td>
                    <td className='text-center p-0' > {t(data.operationalSubordinators)} </td>
                    <td className='text-center p-0' > {t(data.functionalSubordinators)} </td>
                    <td className='text-center p-0' > {t(data.operationalSupervisor)} </td>
                    <td className='text-center p-0' > {t(data.functionalSupervisor)} </td>
                    <td className='text-center p-0' > {t(data.foreignCompany)}
                      <span onClick={() => spainFSBudget('quantity',item.id)} style={data.isForeignCompany === false ? { color: 'black', cursor: 'pointer' } : { color: 'green', cursor: 'pointer' }} >
                        <i class="fa-solid fa-sack-dollar"  ></i>
                      </span>
                    </td>
                    <td className='text-center p-0' >
                      <input 
                      className='m-0 text-center' 
                      type={'number'} 
                      defaultValue={data.client} 
                      style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }} 
                      onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}
                      />
                    </td>
                    <td className='text-center p-0' > {data.performer} </td>
                  </tr>
                ))
              }


              {
                item.isCollapsed === true &&
                item.accResponses?.map((data, i) => (
                  <tr key={i}>
                    <td style={{ backgroundColor: '#F1F3FA' }} > {data.accName} </td>
                    <td className='text-center p-0' >
                      <input 
                      className='m-0 text-center' 
                      type={'number'} 
                      defaultValue={data.kol} 
                      style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}
                      onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}
                       />
                    </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.performer} style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}   onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}/>

                    </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.operationalSubordinators} style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}  onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()} />

                    </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.functionalSubordinators} style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}  onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()} />

                    </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.operationalSupervisor} style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}   onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}/>

                    </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.functionalSupervisor} style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}  onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()} />

                    </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.foreignCompany} style={{ width: '50px', border: '1px solid #DFE2E6', borderRadius: '5px',margin:'auto' }}  onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()} />

                      <span onClick={() => spainFSBudget('acc',item.id,data.accUniqId)} style={data.isForeignCompany === false ? { color: 'black', cursor: 'pointer', margin:'auto' } : { color: 'green', cursor: 'pointer', margin:'auto' }} >
                        <i class="fa-solid fa-sack-dollar"  ></i>
                      </span>
                    </td>
                    <td className='text-center p-0' >
                      <input className='m-0 text-center' type={'number'} defaultValue={data.client} style={{ width: '110px', border: '1px solid #DFE2E6', borderRadius: '5px' }}   onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()}/>
                    </td>
                    <td className='text-center p-0' > {data.performer} </td>
                  </tr>
                ))
              }
            </>

          ))
        }
      </table>
    </div>
  )
}

export default BudgetTable