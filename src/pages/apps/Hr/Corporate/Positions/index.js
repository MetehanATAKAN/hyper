import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { FetchApiGet } from '../../../../../utils/http.helper';
import Table from './Table'
import Icon from '@mdi/react'
import { mdiDotsVertical } from '@mdi/js';

const PositionsIndex = () => {

  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  
  

  return (
    <div>
      <Table
      />
    </div>
  )
}

export default PositionsIndex