import React,{ useState } from 'react'
import PartcipiantsSelect from './PartcipiantsSelect'
import ParticipiantsTable from './ParticipiantsTable'

const PartcipiantsIndex = () => {

  //Export Table Data
  const [exportTableData, setExportTableData] = useState([]);

  const [tableData, setTableData] = useState([
    // { id:0,parentId:null, company: 10,  position: 20,areaorBusinessUnıte:23, performer: 30, checklist: 40},
    // { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB',areaorBusinessUnıte:23, performer: 'marketing', checklist: 'Presentation'},
    // { id:1,parentId:null, company: 'Uzbekistan RO',  position: 'AB',areaorBusinessUnıte:23, performer: 'marketing', checklist: 'Presentation'}
  ])

  return (
    <div className='partcipiants'>
        <PartcipiantsSelect 
        tableData={tableData} 
        setTableData={setTableData}
        exportTableData={exportTableData}
        setExportTableData={setExportTableData}
         />
        {/* <ParticipiantsTable tableData={tableData} setTableData={setTableData}/> */}
    </div>
  )
}

export default PartcipiantsIndex