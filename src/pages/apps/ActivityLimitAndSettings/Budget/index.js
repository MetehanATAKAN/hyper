import React,{ useState } from 'react'
import BudgetTable from './BudgetTable'

const BudgetIndex = () => {

    const [tableData, setTableData] = useState([
        { id:0,parentId:null, company: 'Uzbekistan RO',  position: 'AB', businessUnıte: 'marketing', kol: 'Presentation',performer:'metehan',oSubordinator:'oSubordinator',fSubordinator:'fSubordinator',oSupervisor:'oSupervisor',fSupervisor:'fSupervisor',spainFS:'spainFS',client:'client',total:23},
        { id:5,parentId:null, company: 'Uzbekistan RO',  position: 'AB', businessUnıte: 'marketing', kol: 'Presentation',performer:'metehan',oSubordinator:'oSubordinator',fSubordinator:'fSubordinator',oSupervisor:'oSupervisor',fSupervisor:'fSupervisor',spainFS:'spainFS',client:'client',total:23}
      ])
  return (
    <div>
        <BudgetTable tableData={tableData} setTableData={setTableData} />
    </div>
  )
}

export default BudgetIndex