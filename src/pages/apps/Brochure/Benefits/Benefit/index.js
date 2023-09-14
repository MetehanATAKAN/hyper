import React, { useState } from 'react'
import Table from './Table'

const BenefitIndex = () => {

  const [tableData, setTableData] = useState([
  //   {
  //     id: 4,
  //     needName: "Оптимизация лечения синдрома задержки роста плода",
  //     order: 7,
  //     country: "Corporate",
  //     approveStatus: 2,
  //     approverName: "Admin",
  //     abb: "N-07",
  //     brandId: 2,
  //     brandName: "ALMIBA",
  //     profileId: 433,
  //     profileName: "БЕРЕМЕННАЯ С СИНДРОМОМ ЗАДЕРЖКИ РАЗВИТИЯ ПЛОДА (СЗРП)",
  //     indicationId: 114,
  //     indicationName: "ПЕРВИЧНАЯ КАРНИТИНОВАЯ НЕДОСТАТОЧНОСТЬ",
  //     specializations: [
  //         {
  //             specId: 25,
  //             specName: "GYNECOLOGIST",
  //             specAbb: "GN"
  //         }
  //     ],
  //     structure: null,
  //     createdBy: "Admin",
  //     createdDate: "2022-10-27T11:47:10.464295",
  //     archiveStatus: false,
  //     status: true
  // }
  ])

  console.log('table data =>',tableData);
  return (
    <div><Table tableData={tableData}  setTableData={setTableData} /></div>
  )
}

export default BenefitIndex