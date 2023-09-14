import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ownersTableData, ownersTableDataMain, participantsIsDisabled } from '../../../../redux/actions';
import OwnersSelect from './OwnersSelect'

const OwnersIndex = () => {

  const dispatch=useDispatch();
  const dataMain=useSelector(state=>state.ActivityLimit.ownersTableDataMain);


  const [tableData, setTableData] = useState([
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={0} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={0} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={0} checked={false}/>,guestStatus:false},
    // { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB',vacancyId:23, businessUnıte: 'marketing', productZoneorArea: 'Presentation',client:'metehan',budget:<Form.Check type='checkbox'/>,budgetStatus:false,kol:<Switches2  switchName={'kol'} disabled={false} id={5} checked={false}/>,kolStatus:false,companyParticipants:<Switches2  switchName={'company2'} disabled={false} id={5} checked={false}/>,companyParticipantsStatus:false,guest:<Switches2  switchName={'guest'} disabled={false} id={5} checked={false}/>,guestStatus:false},
  ])

//Export Table Date
const [exportTableData, setExportTableData] = useState([]);

  const changeSwitch =(name,id)=> {

    console.log(tableData);

    console.log(dataMain);
  
    dataMain?.map(tableItem=>(
      tableItem.id === id && name === 'budget'
      ?tableItem.budgetStatus = !tableItem.budgetStatus 
      :tableItem.id === id && name === 'kol'
      ?tableItem.kolStatus = !tableItem.kolStatus
      :tableItem.id === id && name === 'company2'
      ?tableItem.companyParticipantsStatus = !tableItem.companyParticipantsStatus
      :tableItem.id === id && name === 'guest'
      ?tableItem.guestStatus = !tableItem.guestStatus
      :null
    
    ))
  }

  // Redux owners table data
  useEffect(() => {
    dispatch(ownersTableData(tableData.map(data=>(
     {value:data.position,label:data.position,vacancyId:data.vacancyId}
    ))))
    dispatch(ownersTableDataMain(tableData))
  }, [dispatch, tableData])


  useEffect(() => {
    if(tableData.length !== 0){
      dispatch(participantsIsDisabled(false))
    }
    else {
      dispatch(participantsIsDisabled(true))
    }
  }, [dispatch, tableData.length])
  
  return (
    <div className='owners'>
        <OwnersSelect 
        tableData={tableData} 
        setTableData={setTableData} 
        changeSwitch={changeSwitch} 
        exportTableData={exportTableData}
        setExportTableData={setExportTableData}
        />
        {/* <CustomRadios/> */}
    </div>
  )
}

export default OwnersIndex