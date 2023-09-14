import React, { useState } from 'react'
import Filter from './Filter'
import TableProfileStrategy from './Table'
import TableActions from '../TableActions';

const ProfileStrategy = ({ setSelectTab }) => {

  const [tableData, setTableData] = useState([]);
  const [tableItems, setTableItems] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');


  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [totalItems, setTotalItems] = useState(0);

  // filter 
  const [isFilter, setIsFilter] = useState(true);

  return (
    <div>
      <TableActions
        tableData={tableData}
        setTableData={setTableData}
        tableItems={tableItems}
        setTableItems={setTableItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        setIsFilter={setIsFilter}
        isSaveButton={true}
      />
      <Filter
      tableData={tableData}
        setTableData={setTableData}
        setTableItems={setTableItems}
        tableItems={tableItems}
        isFilter={isFilter}
      />
      <TableProfileStrategy
        tableData={tableData}
        setTableData={setTableData}
        tableItems={tableItems}
        setTableItems={setTableItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        setSelectTab={setSelectTab}
      />
    </div>
  )
}

export default ProfileStrategy