import React, { useState } from 'react'
import Table from './Table'

const TeamsIndex = () => {
  const [tableData, setTableData] = useState([]);
  return (
    <div>
        <Table tableData={tableData} setTableData={setTableData} />
    </div>
  )
}

export default TeamsIndex