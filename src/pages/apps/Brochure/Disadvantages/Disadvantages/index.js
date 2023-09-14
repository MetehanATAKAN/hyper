import React, { useState } from 'react'
import Table from './Table'

const DisadvantagesPage = ({ setSelectedTab }) => {
    const [disadvantagesFilteredDatas, setDisadvantagesFilteredDatas] = useState([]);
    const [handleAddNewDisadvantages, setHandleAddNewDisadvantages] = useState(false);

    console.log("mac")
  return (
    <div className='need-page'>
        <Table
          disadvantagesFilteredDatas={disadvantagesFilteredDatas}
          setDisadvantagesFilteredDatas={setDisadvantagesFilteredDatas}
          handleAddNewDisadvantages={handleAddNewDisadvantages}
          setHandleAddNewDisadvantages={setHandleAddNewDisadvantages}
          setSelectedTab={setSelectedTab}
        />
    </div>
  )
}

export default DisadvantagesPage