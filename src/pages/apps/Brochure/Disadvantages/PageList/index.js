import React, { useState } from 'react'
import Table from './Table';
const PageList = ({ setSelectedTab }) => {
    const [pageListFilteredDatas, setPageListFilteredDatas] = useState([]);
    const [handleAddNewPageList, setHandleAddNewPageList] = useState(false);

  return (
    <div className='need-page'>
        <Table 
            pageListFilteredDatas={pageListFilteredDatas}
            setPageListFilteredDatas={setPageListFilteredDatas}
            handleAddNewPageList={handleAddNewPageList}
            setHandleAddNewPageList={setHandleAddNewPageList}
            setSelectedTab={setSelectedTab}
        />
    </div>
  )
}

export default PageList