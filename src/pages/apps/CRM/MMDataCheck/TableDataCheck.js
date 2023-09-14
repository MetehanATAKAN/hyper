import React, { useState } from 'react'
import TableAccordion from '../../../../components/Tables/TableAccordion'
import Filter from './Filter';

const TableDataCheck = () => {

    const [data, setData] = useState([]);
  return (
    <div>
        <TableAccordion
        data={data}
        filter={
        <Filter

        />
    }
        />
    </div>
  )
}

export default TableDataCheck