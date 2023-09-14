import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Row } from 'react-bootstrap'
import { useTable, useSortBy, usePagination, useAsyncDebounce, useFilters, useGlobalFilter,useBlockLayout, useResizeColumns } from 'react-table'
import { matchSorter } from 'match-sorter'
import makeData from './makeData';


const Styles = styled.div`
padding: 1rem;

table {
  display: inline-block;
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    ${'' /* In this example we use an absolutely position resizer,
     so this is required. */}
    position: relative;

    :last-child {
      border-right: 0;
    }

    .resizer {
      display: inline-block;
      background: blue;
      width: 10px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(50%);
      z-index: 1;
      ${'' /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;

      &.isResizing {
        background: red;
      }
    }
  }
}

// table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//     .resizer {
//     display: inline-block;
//     background: pink;
//     width: 10px;
//     height: 100%;
//     position: absolute;
//     right: 0;
//     top: 0;
//     transform: translateX(50%);
//     z-index: 1;
//     ${"" /* prevents from scrolling while dragging on touch devices */}
//     touch-action:none;

//     &.isResizing {
//       background: red;
//     }
//   }
//   }


// table {
//   border-spacing: 0;
//   border: 1px solid #E3E6E9;

//   tr {
//     :last-child {
//       td {
//         border-bottom: 0;
//       }
//     }
//   }

//   th,
//   td {
//     margin: 0;
//     padding: 0.5rem;
//     border-bottom: 1px solid #E3E6E9;
//     border-right: 1px solid #E3E6E9;

//     :last-child {
//       border-right: 0;
//     }
//   }
  // .resizer {
  //   display: inline-block;
  //   background: pink;
  //   width: 10px;
  //   height: 100%;
  //   position: absolute;
  //   right: 0;
  //   top: 0;
  //   transform: translateX(50%);
  //   z-index: 1;
  //   ${"" /* prevents from scrolling while dragging on touch devices */}
  //   touch-action:none;

  //   &.isResizing {
  //     background: red;
  //   }
  // }
}

// .table {
//   display: inline-block;
//   border-spacing: 0;
//   border: 1px solid black;
//   .tr {
//     :last-child {
//       .td {
//         border-bottom: 0;
//       }
//     }
//   }

//   .th,
//   .td {
//     margin: 0;
//     padding: 0.5rem;
//     border-bottom: 1px solid black;
//     border-right: 1px solid black;

//     ${"" /* In this example we use an absolutely position resizer,
//      so this is required. */}
//     position: relative;

//     :last-child {
//       border-right: 0;
//     }

//     .resizer {
//       display: inline-block;
//       background: pink;
//       width: 10px;
//       height: 100%;
//       position: absolute;
//       right: 0;
//       top: 0;
//       transform: translateX(50%);
//       z-index: 1;
//       ${"" /* prevents from scrolling while dragging on touch devices */}
//       touch-action:none;

//       &.isResizing {
//         background: red;
//       }
//     }
//   }
// }
`
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])


    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isSearchOpen
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    
      <input
      className={isSearchOpen===true ?"input-field transition" :"input-field"}
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        
      />
   
  )
}
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function Table({ columns, data }) {
  console.log(data);
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      minWidth: 150,
      width: 150,
      maxWidth: 800
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    //--*-//
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },

    /////
    allColumns,
    getToggleHideAllColumnsProps,
    ///
    
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  
  const [isSearchHıdden, setIsSearchHıdden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSelectDropdown, setIsSelectDropdown] = useState(false);

  console.log(
    page.map((data,index)=>(
      prepareRow(data),
      data.cells.map((item)=>(
        item
      ))
    ))
  );
  const mete=()=> {
    console.log('metedee');
  }
  console.log(allColumns);
  return (
    <>
    <div>
    {
              isSearchHıdden === true
                ? headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {/* Add a sort direction indicator */}
                        <div className='column_filter'> {column.canFilter ? column.render('Filter') : null}</div>
                      </th>
                    ))}
                  </tr>
                ))
                : null
            }
    </div>
      <div className='marketing_activity_header' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <i class="fa-solid fa-table-list"></i>
          Default view
        </div>
        <div style={{display:'flex'}}>
          <button className='marketing_activity_private_button'><i className="fa-solid fa-users"></i></button>
          <button className='marketing_activity_private_button'><i className="fa-solid fa-earth-africa"></i></button>
          <div class="input-container">
            <button onClick={()=>setIsSearchOpen(!isSearchOpen)}><i className="fa-solid fa-magnifying-glass"></i></button>
            {
              isSearchOpen && <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              isSearchOpen={isSearchOpen}
            />
              // <input class={isSearchOpen===true ?"input-field transition" :"input-field"} type="text" placeholder="Search" name="search" />
            }
          </div>
          <button><i className="fa-solid fa-filter"></i></button>
          <button><i className="fa-solid fa-sort"></i></button>
          <button onClick={()=>setIsSelectDropdown(!isSelectDropdown)}><i class="fa-regular fa-square-plus"></i></button>
          <button onClick={() => setIsSearchHıdden(!isSearchHıdden)}><i className="fa-solid fa-eye"></i></button>
          <button><i className="fa-solid fa-arrows-left-right-to-line"></i></button>
          <button><i class="fa-solid fa-arrow-down-up-across-line"></i></button>
        </div>
      </div>

            {
              isSelectDropdown && 
              <div className='select_dropdown_menu'>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} onClick={mete} />{' '}
              {column.Header}
            </label>
          </div>
        ))}
      </div>
            }
      
      <div className='marketing_activity_table' style={{ maxWidth: '100%', overflowX: 'scroll' }}>
        <table   {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr  style={{ color: '#98A6AD' }} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div>
                    {/* <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    /> */}
                      <i style={{ marginRight: '10px' }} class="fa-solid fa-sort"></i>
                      {column.render('Header')}
                     
                    </div>
                  </th>
                    
                ))}
              </tr>
            ))}
            {
              // isSearchHıdden === true
              //   ? headerGroups.map(headerGroup => (
              //     <tr {...headerGroup.getHeaderGroupProps()}>
              //       {headerGroup.headers.map(column => (
              //         // Add the sorting props to control sorting. For this example
              //         // we can add them into the header props
              //         <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              //           {/* Add a sort direction indicator */}
              //           <div className='column_filter'> {column.canFilter ? column.render('Filter') : null}</div>
              //         </th>
              //       ))}
              //     </tr>
              //   ))
              //   : null
            }


            {/* <tr>

              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: 'left',
                }}
              >
                
              </th>
            </tr> */}
          </thead>
          <tbody {...getTableBodyProps()}>
            {/* <tr style={{ backgroundColor: '#02A0DF', color: 'white' }}>
              {
                allColumns.map((data,index)=> (
                  <td>{index+1}</td>
                ))
              }
            </tr> */}
            {page.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td style={{color:'black'}} {...cell.getCellProps()}><span className={cell.value ==='Not Planned' ? 'planned_bg_pink' :cell.value==='Planned' ? 'planned_bg_green':null} >{cell.render('Cell')}</span></td>
                      )
                    })}
                    <td>
                      <div className='table_row_buttons'>
                        <button><i className="fa-solid fa-person-running"></i></button>
                        <button><i className="fa-solid fa-calculator"></i></button>
                        <button><i class="fa-solid fa-hand-holding-dollar"></i></button>
                        <button><i class="fa-solid fa-star"></i></button>
                        <button><i class="fa-solid fa-file-invoice-dollar"></i></button>
                        <button><i class="fa-solid fa-users-between-lines"></i></button>
                      </div>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
        <br />
        <div>Showing the first 20 results of {rows.length} rows</div>
        {/* pagination */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Start Date',
        accessor: 'startDate'
      },
      {
        Header: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Activity',
        accessor: 'activity'
      },
      {
        Header: 'Marketing Activity',
        accessor: 'marketingActivity'
      },
      {
        Header: 'Business Unite',
        accessor: 'businessUnıte'
      },
      {
        Header: 'Ar',
        accessor: 'ar'
      },
      {
        Header: 'Zone Id',
        accessor: 'zoneId'
      },
      {
        Header: 'Position',
        accessor: 'position'
      },
      {
        Header: 'Employee',
        accessor: 'employee'
      },
      {
        Header: 'Parcent',
        accessor: 'parcent'
      },
      {
        Header: 'Product',
        accessor: 'product'
      },
      {
        Header: '%',
        accessor: 'yuzde'
      },
      {
        Header: 'Specilization',
        accessor: 'specilization'
      },
      {
        Header: 'Indication',
        accessor: 'indication'
      },
      {
        Header: 'Progress',
        accessor: 'progress'
      },
      {
        Header: 'Current',
        accessor: 'current'
      },
      {
        Header: 'Clinic',
        accessor: 'clinic'
      },
      {
        Header: 'Cost Status',
        accessor: 'costStatus'
      },
      {
        Header: 'Planed',
        accessor: 'planed'
      },
      {
        Header: 'Actual Co...',
        accessor: 'actual'
      },
      {
        Header: 'Last 3',
        accessor: 'last3'
      },
      {
        Header: 'Next 3',
        accessor: 'next3'
      },
      {
        Header: 'Cur...',
        accessor: 'cur'
      },
      {
        Header: 'Res',
        accessor: 'res'
      },
      {
        Header: 'Actual S...',
        accessor: 'actualz'
      },
      {
        Header: 'Report Det...',
        accessor: 'report'
      },
      {
        Header: '???????',
        accessor: 'question'
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(100), [])

  const [item, setItem] = useState([
    { startDate: '2022.04.19', country: 'AB', activity: 'marketing', marketingActivity: 'Presentation', businessUnıte: 'Alpha', ar: 2, zoneId: 1, position: 'AM', employee: 'Ali Ömer', parcent: 21, product: 'TT', yuzde: 70, specilization: 1,indication:2, progress: 3, current: 25, clinic: 6, costStatus: 'Not Planned', planed: '1.2000.00', actual: '-', last3: '1.150,00', next3: '1.750,00', cur:'USD', res: '52%', actualz: 'planned', report: '2 types of wiew', question: 'Complited'       ,buttons:''},
    { startDate: '2022.04.19', country: 'CD', activity: 'marketing', marketingActivity: 'Seminer', businessUnıte: 'Beta', ar: 6, zoneId: 10, position: 'AM', employee: 'Ali Ömer', parcent: 140, product: 'AL , TT', yuzde: 60, specilization: 16,indication:3, progress: 12, current: 55, clinic: 'YILDIZ', costStatus: 'Planned', planed: '-', actual: '1.000,00', last3: '1.150,00', next3: '1.750,00', cur:'USD', res: '52%', actualz: 'Request', report: '2 types of wiew', question: 'auto Plan'    ,buttons:''},
    { startDate: '2022.04.19', country: 'EF', activity: 'marketing', marketingActivity: 'Congress', businessUnıte: 'Beta', ar: 11, zoneId: 12, position: 'AM', employee: 'Ali Ömer', parcent: 33, product: 'PRF', yuzde: 100, specilization: 11,indication:11, progress: 17, current: 63, clinic: 3, costStatus: 'Planned', planed: '1.2000,00', actual: '1.000,00', last3: '1.150,00', next3: '1.750,00',cur:'USD', res: '52%', actualz: 'Financial', report: '2 types of wiew', question: 'auto Plan' ,buttons:''}
  ]);

  //   useEffect(() => {
  //     fetch('https://jsonplaceholder.typicode.com/comments')
  // .then(response=>response.json())
  // .then(response=>setItem(response))
  // .catch(error=>console.log(error))
  //   }, [])


  console.log(item);

  return (
    <Styles>
      <Table columns={columns} data={item} />
    </Styles>
  )
}

export default App





// import React, { useRef } from 'react';
// import { render } from 'react-dom';

// import EmailEditor from 'react-email-editor';

// const App = (props) => {
//   const emailEditorRef = useRef(null);

//   const exportHtml = () => {
//     emailEditorRef.current.editor.exportHtml((data) => {
//       const { design, html } = data;
//       console.log('exportHtml', html);
//     });
//   };

//   const onLoad = () => {
//     // editor instance is created
//     // you can load your template here;
//     // const templateJson = {};
//     // emailEditorRef.current.editor.loadDesign(templateJson);
//   }

//   const onReady = () => {
//     // editor is ready
//     console.log('onReady');
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={exportHtml}>Export HTML</button>
//       </div>

//       <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
//     </div>
//   );
// };

// export default App
