import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  TreeDataState,
  CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  defaultColumnValues,
} from './MarketingActivity/demo-data/generator';

const getChildRows = (row, rootRows) => {

    console.log(row);
    console.log(rootRows);
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  console.log(childRows);
  return childRows.length ? childRows : null;
};

const Example2 = () => {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);

  const [data, setData] = useState(
  [
    {id: 0, parentId: null, gender: 'Female', name: 'Sandra', city: 'Las Vegas',     car:'mete'},
    {id: 1, parentId: 0, gender: 'Female', name: 'Sharon', city: 'Tokyo',            car:'mete'},
    {id: 2, parentId: 0, gender: 'Female', name: 'Maria', city: 'Chicago',           car:'mete'},
    {id: 3, parentId: 1, gender: 'Female', name: 'Betty', city: 'Los Angeles',       car:'mete'},
    {id: 4, parentId: 0, gender: 'Male', name: 'Robert', city: 'Las Vegas',          car:'mete'},
    {id: 5, parentId: 2, gender: 'Male', name: 'Paul', city: 'Paris',                car:'mete'},
    {id: 6, parentId: 2, gender: 'Male', name: 'John', city: 'Los Angeles',          car:'mete'},
    {id: 7, parentId: 2, gender: 'Male', name: 'John', city: 'Chicago',              car:'mete'},
    {id: 8, parentId: 0, gender: 'Female', name: 'Betty', city: 'Paris',             car:'mete'},
    {id: 9, parentId: 1, gender: 'Male', name: 'John', city: 'Austin',               car:'mete'},
    {id: 10, parentId: 2, gender: 'Male', name: 'James', city: 'Las Vegas',          car:'mete'},
    {id: 11, parentId: 2, gender: 'Female', name: 'Betty', city: 'New York',         car:'mete'},
    {id: 12, parentId: 5, gender: 'Female', name: 'Barbara', city: 'Paris',          car:'mete'},
    {id: 13, parentId: 1, gender: 'Male', name: 'David', city: 'Chicago',            car:'mete'},
    {id: 14, parentId: 6, gender: 'Male', name: 'Richard', city: 'Tokyo',            car:'mete'},
    {id: 15, parentId: 3, gender: 'Male', name: 'David', city: 'Chicago',            car:'mete'},
    {id: 16, parentId: 6, gender: 'Male', name: 'David', city: 'Austin',             car:'mete'},
    {id: 17, parentId: 5, gender: 'Male', name: 'Robert', city: 'London',            car:'mete'},
    {id: 18, parentId: 6, gender: 'Female', name: 'Lisa', city: 'New York',          car:'mete'},
    {id: 19, parentId: 0, gender: 'Male', name: 'John', city: 'Chicago',             car:'mete'},

    {id: 20, parentId: null, gender: 'Female', name: 'ali', city: 'Las Vegas',     car:'mete'},
    {id: 21, parentId: 20, gender: 'Female', name: 'veli', city: 'Tokyo',            car:'mete'},
    {id: 22, parentId: 20, gender: 'Female', name: 'deli', city: 'Chicago',           car:'mete'},
    {id: 23, parentId: 22, gender: 'Female', name: 'elli', city: 'Los Angeles',       car:'mete'},
  ]
  )
//   const [data] = useState(generateRows({
//     columnValues: {
//       id: ({ index }) => index,
//       parentId: ({ index, random }) => (index > 0 ? Math.trunc((random() * index) / 2) : null),
//       ...defaultColumnValues,
//     },
//     length: 20,
//   }));
  const [tableColumnExtensions] = useState([
    { columnName: 'name', width: 300 },
  ]);
  const [expandedRowIds, setExpandenRowIds] = useState([0, 0]);
console.log(data);
  return (
    <Paper>
      <Grid
        rows={data}
        columns={columns}
      >
        <TreeDataState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandenRowIds}
        />
        <CustomTreeData
          getChildRows={getChildRows}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableTreeColumn
          for="name"
        />
      </Grid>
    </Paper>
  );
};
export default Example2