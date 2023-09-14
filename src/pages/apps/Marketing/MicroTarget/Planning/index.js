import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { data, dataLeft } from './makeData';
import { useMemo } from 'react';
import MaterialReactTable, {
  MRT_FullScreenToggleButton,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
  MRT_ToolbarAlertBanner,
  MRT_ToolbarDropZone,
} from 'material-react-table';
import { Box, Button, IconButton, Menu, MenuItem, Divider, alpha, Collapse, Stack, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SaveIcon from '@mui/icons-material/Save';
// import { data } from './mockData';
// import '../../../../../assets/scss/custom/components/tableLayout.scss';
import Dropdowns from '../../../../../components/Dropdowns';
import { utils, writeFileXLSX } from 'xlsx';
import { useTranslation } from 'react-i18next';
import { Button as ButtonB } from 'react-bootstrap';

import Table from './Table';
import { useEffect } from 'react';
import Filter from './Filter';
import MicroZoneTable from './MicroZoneTable';
import { useSelector } from 'react-redux';
import WorkPlaceTable from './WorkplaceTable';
import ClientTable from './ClientTable';



const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(222,226,230,1) 0px 0px 0px 0px, rgba(222,226,230,1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(222,226,230,1) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));


const Planning = () => {


  const { t } = useTranslation();

  const microTargetRadio = useSelector(state => state.MicroTarget.radioValue);

  const [filterShow, setFilterShow] = useState(true);
  const [filterIcon, setFilterIcon] = useState(true);

  /**Columns microzone */
  const columnsMicrozone = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'targeted',
        header: 'Targeted',
        size:'75'
      },
      {
        accessorKey: 'days',
        header: 'Days',
        Cell: ({ cell, row }) => {
          if (cell.getValue()) {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#d1eff2',
                      color: '#83d3da',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          return (
            <Tooltip
              title={row.original.tip ? row.original.tip : cell.getValue()}
              placement="bottom-start"
              arrow>
              <span>{cell.getValue()}</span>
            </Tooltip>
          );
        }
      },
      {
        accessorKey: 'order',
        header: 'Order',
        size:'75'
      },
      {
        accessorKey: 'startTime',
        header: 'Start Time',
        size:'75'
      },
      {
        accessorKey: 'totalTime',
        header: 'Total Time',
        size:'75'
      },
      {
        accessorKey: 'travellingTime',
        header: 'Travelling Time',
        size:'75'
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size:'75'
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size:'75',
        Cell: ({ cell, row }) => {
          if (cell.getValue() === 'A') {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#d3f6ec',
                      color: '#46d9af',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          else if (cell.getValue() === 'B') {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#fff3d1',
                      color: '#ffd45d',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          else if (cell.getValue() === 'C') {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#fee2e7',
                      color: '#fa859c',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          return (
            <Tooltip
              title={row.original.tip ? row.original.tip : cell.getValue()}
              placement="bottom-start"
              arrow>
              <span>{cell.getValue()}</span>
            </Tooltip>
          );
        }
      },
      {
        accessorKey: 'potential',
        header: 'Potential',
        size:'75'
      },
      {
        accessorKey: 'avarageVisit',
        header: 'Avarage Visit',
        size:'75'
      },
      {
        accessorKey: 'actualSales',
        header: 'Actual Sales',
        size:'75'
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size:'75',
        Cell: ({ cell, row }) => {
          if (cell.getValue() === 'Doctor') {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#d1eef9',
                      color: '#76cbed',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          else if (cell.getValue() === 'Pharmacy') {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#e4e6e8',
                      color: '#b2b7bc',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          return (
            <Tooltip
              title={row.original.tip ? row.original.tip : cell.getValue()}
              placement="bottom-start"
              arrow>
              <span>{cell.getValue()}</span>
            </Tooltip>
          );
        }
      },
      {
        accessorKey: 'workPlace',
        header: 'Workplace',
        size:'75'
      },
      {
        accessorKey: 'a',
        header: 'A',
        size:'75'
      },
      {
        accessorKey: 'b',
        header: 'B',
        size:'75'
      },
      {
        accessorKey: 'c',
        header: 'C',
        size:'75'
      },
      {
        accessorKey: 'company',
        header: 'Company',
        size:'75'
      },
      {
        accessorKey: 'busUnit',
        header: 'Business Unit',
        size:'75'
      },
      {
        accessorKey: 'zone',
        header: 'Zone',
        size:'75'
      }
    ],
    [],
    //end
  );

  /**Right Table Columns microzone */
  const rightTableColumnsMicrozone = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'targeted',
        header: 'Targeted',
        size:'75'
      },
        {
          accessorKey: 'days',
          header: 'Days',
          Cell: ({ cell, row }) => {
            if (cell.getValue()) {
              const name = cell.getValue();
              return (
                <Tooltip
                  title={row.original.tip ? row.original.tip : cell.getValue()}
                  placement="bottom-start"
                  arrow>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <span
                      style={{
                        backgroundColor: '#d1eff2',
                        color: '#83d3da',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}>
                      {name}
                    </span>
                  </div>
                </Tooltip>
              );
            }
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <span>{cell.getValue()}</span>
              </Tooltip>
            );
          }
        },
        {
          accessorKey: 'order',
          header: 'Order',
          size:'75'
        },
        {
          accessorKey: 'startTime',
          header: 'Start Time',
          size:'75'
        },
        {
          accessorKey: 'totalTime',
          header: 'Total Time',
          size:'75'
        },
        {
          accessorKey: 'travellingTime',
          header: 'Travelling Time',
          size:'75'
        },
        {
          accessorKey: 'name',
          header: 'Name',
          size:'75'
        },
        {
          accessorKey: 'category',
          header: 'Category',
          size:'75',
          Cell: ({ cell, row }) => {
            if (cell.getValue() === 'A') {
              const name = cell.getValue();
              return (
                <Tooltip
                  title={row.original.tip ? row.original.tip : cell.getValue()}
                  placement="bottom-start"
                  arrow>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <span
                      style={{
                        backgroundColor: '#d3f6ec',
                        color: '#46d9af',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}>
                      {name}
                    </span>
                  </div>
                </Tooltip>
              );
            }
            else if (cell.getValue() === 'B') {
              const name = cell.getValue();
              return (
                <Tooltip
                  title={row.original.tip ? row.original.tip : cell.getValue()}
                  placement="bottom-start"
                  arrow>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <span
                      style={{
                        backgroundColor: '#fff3d1',
                        color: '#ffd45d',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}>
                      {name}
                    </span>
                  </div>
                </Tooltip>
              );
            }
            else if (cell.getValue() === 'C') {
              const name = cell.getValue();
              return (
                <Tooltip
                  title={row.original.tip ? row.original.tip : cell.getValue()}
                  placement="bottom-start"
                  arrow>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <span
                      style={{
                        backgroundColor: '#fee2e7',
                        color: '#fa859c',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}>
                      {name}
                    </span>
                  </div>
                </Tooltip>
              );
            }
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <span>{cell.getValue()}</span>
              </Tooltip>
            );
          }
        },
        {
          accessorKey: 'potential',
          header: 'Potential',
          size:'75'
        },
        {
          accessorKey: 'avarageVisit',
          header: 'Avarage Visit',
          size:'75'
        },
        {
          accessorKey: 'actualSale',
          header: 'Actual Sales',
          size:'75'
        },
        {
          accessorKey: 'type',
          header: 'Type',
          size:'75',
          Cell: ({ cell, row }) => {
            if (cell.getValue() === 'Doctor') {
              const name = cell.getValue();
              return (
                <Tooltip
                  title={row.original.tip ? row.original.tip : cell.getValue()}
                  placement="bottom-start"
                  arrow>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <span
                      style={{
                        backgroundColor: '#d1eef9',
                        color: '#76cbed',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}>
                      {name}
                    </span>
                  </div>
                </Tooltip>
              );
            }
            else if (cell.getValue() === 'Pharmacy') {
              const name = cell.getValue();
              return (
                <Tooltip
                  title={row.original.tip ? row.original.tip : cell.getValue()}
                  placement="bottom-start"
                  arrow>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    <span
                      style={{
                        backgroundColor: '#e4e6e8',
                        color: '#b2b7bc',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}>
                      {name}
                    </span>
                  </div>
                </Tooltip>
              );
            }
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <span>{cell.getValue()}</span>
              </Tooltip>
            );
          }
        },
        {
          accessorKey: 'workPlace',
          header: 'Workplace',
          size:'75'
        },
        {
          accessorKey: 'a',
          header: 'A',
          size:'75'
        },
        {
          accessorKey: 'b',
          header: 'B',
          size:'75'
        },
        {
          accessorKey: 'c',
          header: 'C',
          size:'75'
        },
        {
          accessorKey: 'company',
          header: 'Company',
          size:'75'
        },
        {
          accessorKey: 'busUnit',
          header: 'Business Unit',
          size:'75'
        },
        {
          accessorKey: 'zone',
          header: 'Zone',
          size:'75'
        }
      ],
    [],
    //end
  );

  /**Columns workplace */
  const columnsWorkplace = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'days',
        header: 'Days',
        Cell: ({ cell, row }) => {
          if (cell.getValue()) {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#d1eff2',
                      color: '#83d3da',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          return (
            <Tooltip
              title={row.original.tip ? row.original.tip : cell.getValue()}
              placement="bottom-start"
              arrow>
              <span>{cell.getValue()}</span>
            </Tooltip>
          );
        }
      },
      {
        accessorKey: 'order',
        header: 'Order',
        size:'75'
      },
      {
        accessorKey: 'startTime',
        header: 'Start Time',
        size:'75'
      },
      {
        accessorKey: 'totalTime',
        header: 'Total Time',
        size:'75'
      },
      {
        accessorKey: 'travellingTime',
        header: 'Travelling Time',
        size:'75'
      }
    ],
    [],
    //end
  );

  /**Right Table Columns microzone */
  const rightTableColumnsWorkplace = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'days',
        header: 'Days',
        Cell: ({ cell, row }) => {
          if (cell.getValue()) {
            const name = cell.getValue();
            return (
              <Tooltip
                title={row.original.tip ? row.original.tip : cell.getValue()}
                placement="bottom-start"
                arrow>
                <div style={{ display: 'flex', gap: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#d1eff2',
                      color: '#83d3da',
                      padding: '2px 8px',
                      borderRadius: '3px',
                    }}>
                    {name}
                  </span>
                </div>
              </Tooltip>
            );
          }
          return (
            <Tooltip
              title={row.original.tip ? row.original.tip : cell.getValue()}
              placement="bottom-start"
              arrow>
              <span>{cell.getValue()}</span>
            </Tooltip>
          );
        }
      },
      {
        accessorKey: 'order',
        header: 'Order',
        size:'75'
      },
      {
        accessorKey: 'startTime',
        header: 'Start Time',
        size:'75'
      },
      {
        accessorKey: 'totalTime',
        header: 'Total Time',
        size:'75'
      },
      {
        accessorKey: 'travellingTime',
        header: 'Travelling Time',
        size:'75'
      }
    ],
    [],
    //end
  );

  //microzone
  const [microzoneData1, setMicrozoneData1] = useState([]);
  const [microzoneData2, setMicrozoneData2] = useState([]);

  //workplace
  const [workplaceData1, setWorkplaceData1] = useState([]);
  const [workplaceData2, setWorkplaceData2] = useState([]);


  const [applyFilter, setApplyFilter] = useState(false);

  /** Original Data */
  const [originalData1, setOriginalData1] = useState(data);
  const [originalData2, setOriginalData2] = useState(dataLeft);
 
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  
  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);
    

    /**Loading */
  const [isLoading, setIsLoading] = useState(false);
    
  //Open right table
  const [rightTable, setRightTable] = useState(true);

  /**Days */
  const [days, setDays] = useState([
    {
      id: 1,
      name: 'Monday',
      abb: 'Mon',
      active: true
    },
    {
      id: 2,
      name: 'Tuesday',
      abb: 'Tue',
      active: false
    },
    {
      id: 3,
      name: 'Wednesday',
      abb: 'Wed',
      active: false
    },
    {
      id: 4,
      name: 'Thursday',
      abb: 'Thu',
      active: false
    },
    {
      id: 5,
      name: 'Friday',
      abb: 'Fri',
      active: false
    },
  ])


  /** On drag start Order Hospital */
  const orderHospital = (x) => {
    console.log('order hospital baş ta');
    console.log(x);
    if(x.id === 'table-1-undefined') {
      if(x !== null && x?.id !== 'table-2-undefined' && x?.original.connectedId !== 0) {
        // setOriginalData2(data2);
        const id = x?.original.connectedId;
        const typeId = x?.original.typeId;
    
        console.log('order hospital de',id);
        const filteredData = originalData2?.filter(el => el.connectedId === id && el.typeId === typeId);
        setData2(filteredData);
       }
    }
    else { 
    //table-2-undefined
      console.log('table-2-undefined da');

      if(x !== null && x?.id !== 'table-1-undefined' && x?.original.connectedId !== 0) {
        // setOriginalData2(data2);
        setOriginalData1(data1);
        const id = x?.original.connectedId;
        const typeId = x?.original.typeId;
    
        console.log('order hospital de',id);
        const filteredData = data1?.filter(el => el.connectedId === id && el.typeId === typeId);
        setData1(filteredData);
       }
    }
  
  }

  /**Left Table */
  const commonTableProps = {
    enableRowDragging: true,
    enableFullScreenToggle: false,
    muiTableContainerProps: {
      sx: {
        minHeight: '320px',
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow,isLoading },
  };

  /**Right Table */
  const commonTablePropsRightTable = {
    rightTableColumnsMicrozone,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    muiTableContainerProps: {
      sx: {
        minHeight: '320px',
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };
  
  /**Change active day */
  const changeActiveDay = (id) => {

    const newArr = days.map(data => {
      if (data.id === id) {
        data.active = true
      }
      else data.active = false
      return data
    })

    setDays(newArr);

  }

  const handleExportData = (datas) => {
    const headings = [columnsMicrozone.map((x) => x.header)];
    const allData = datas.map((row) => row.original);
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, allData, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'DATA');
    writeFileXLSX(wb, 'data.xlsx');
  };
  const handleExportRows = (rows) => {
    const headings = [columnsMicrozone.map((x) => x.header)];
    const selectedData = rows.map((row) => row.original);
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, selectedData, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'DATA');
    writeFileXLSX(wb, 'data.xlsx');
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isStripe, setIsStripe] = useState(false);
  // const [filterShow, setFilterShow] = useState(true);
  const openFilterBox = () => {
    setFilterShow(!filterShow);
    
  };

  useEffect(() => {
    if(draggingRow) {
      orderHospital(draggingRow);
    }
  }, [draggingRow])

  
  return (
  <>
   {/* <Box>
    <Grid container spacing={1}>
      <Grid xs={12} sm={rightTable === false ? 12 : 8} >
      <MaterialReactTable
            {...commonTableProps}
            columns={
              microTargetRadio === 1
              ?columnsMicrozone
              :microTargetRadio === 2
              ?columnsWorkplace
              :null
            }
            data={data1}
            autoResetPageIndex={false}
            enableRowOrdering
            enableSorting={false}
            enableColumnOrdering
            defaultColumn={{
              size: 100,
            }}
            getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
            // onHoveredRowChange={}
            muiTableBodyRowDragHandleProps={({ table }) => (
              {
                onDragEnd: () => {
                  const { draggingRow, hoveredRow } = table.getState();
                  console.log(draggingRow,hoveredRow);
                  if (hoveredRow && draggingRow) {

                    if (hoveredTable === 'table-1') {
                      if (draggingRow.original.disabled === false && hoveredRow.original.disabled === false && draggingRow.original.connectedId === hoveredRow.original.connectedId) {
                        data1.splice(
                          hoveredRow.index,
                          0,
                          data1.splice(draggingRow.index, 1)[0],
                        );
                        setData1([...data1]);
                      }
                      // setData2(originalData2);
                    }
                    else {
                      if (draggingRow.original.disabled === false) {
                        setData2((data2) => [...data2, draggingRow.original]);
                        setOriginalData2([...originalData2, draggingRow.original])
                        setData1((data1) =>
                          data1.filter((d) => d !== draggingRow.original),
                        );
                      }

                    }
                  }
                  setHoveredTable(null);
                },
              }
            )}
            muiTablePaperProps={({ table }) => (
              {
                onDragEnter: () => setHoveredTable('table-1')
              }
            )}
            muiTableContainerProps={{ sx: { minHeight: '500px',maxHeight:'500px' } }}
            enableDensityToggle={true}
            paginateExpandedRows={false}
            enableColumnFilterModes
            enablePinning
            filterFromLeafRows
            positionActionsColumn="last"
            muiTableHeadCellProps={{
              sx: {
                fontSize: {
                  xs: '10px',
                  sm: '11px',
                  md: '12px',
                  lg: '13px',
                  xl: '14px',
                },
              },
            }}
            // muiTableBodyProps={{
            //   sx: (theme) => ({
            //     '& tr:nth-of-type(odd)': {
            //       backgroundColor:'#eef2f7',
            //     },
            //   })
              
            // }}
            muiTableProps={{
              sx: {
                tableLayout: 'auto',
              },
              size: 'small',
            }}
            initialState={{
              density: 'compact',
              pagination: { pageIndex: 0, pageSize: 50 },
            }}
            displayColumnDefOptions={{
              'mrt-row-expand': {
                size: 30,
                maxSize: 30,
                minSize: 20,
                muiTableHeadCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
                muiTableBodyCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
              },
              'mrt-row-select': {
                size: 30,
                muiTableHeadCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
                muiTableBodyCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
              },
              'mrt-row-actions': {
                header: 'Actions', //change header text
                enableColumnOrdering: false,
                // size: 50, //make actions column wider
                sx: {
                  boxShadow: 'none',
                },
              },
            }}

            renderTopToolbar={({ table }) => {



              return (
                <>
                  <MRT_ToolbarAlertBanner table={table} />
                  <MRT_ToolbarDropZone table={table} />
                  <div className="table-top-toolbar-menu d-flex justify-content-between">
                    <div className='table-days'>
                      {
                        days.map(data => (
                          <button onClick={() => changeActiveDay(data.id)} className={data.active === true && 'active'} key={data.id}>
                            <span>
                              {
                                data.abb
                              }
                            </span>
                          </button>
                        ))
                      }
                    </div>
                    <div className="toolbar">
                      <div
                        className="item-1"
                        style={{
                          display: 'flex',
                          gap: '4px',
                          alignSelf: 'center',
                        }}>

                      </div>
                      <Box>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleGlobalFilterButton table={table} />
                        {filterIcon && (
                                            <Tooltip title="Table Filters" arrow>
                                                <IconButton
                                                    className={filterIcon && 'table-filter-btn-active'}
                                                    onClick={openFilterBox}>
                                                    {!filterShow ? <FilterAltIcon /> : <FilterAltOffIcon />}
                                                </IconButton>
                                            </Tooltip>
                                        )}
                        <>
                          <Tooltip title="Table Actions" arrow>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? 'long-menu' : undefined}
                              aria-expanded={open ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}>
                              <MoreHorizIcon />
                            </IconButton>
                          </Tooltip>

                          <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                              'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}>
                            <MenuItem
                              color="primary"
                              onClick={() =>
                                handleExportData(table.getPrePaginationRowModel().flatRows)
                              }
                              variant="contained"
                              disableRipple>
                              <DownloadIcon />
                              All Data
                            </MenuItem>
                            <MenuItem
                              disabled={
                                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                              }
                              onClick={() =>
                                handleExportRows(table.getSelectedRowModel().flatRows)
                              }
                              variant="contained"
                              disableRipple>
                              <DownloadIcon />
                              Selected Rows
                            </MenuItem>
                            <Divider
                              style={{
                                marginTop: '2px',
                                marginBottom: '2px',
                              }}
                              sx={{ my: 0.5, borderColor: '#6c757d' }}
                            />
                            <MenuItem onClick={() => setIsStripe(!isStripe)} disableRipple>
                              <ViewHeadlineIcon />
                              Stripe
                            </MenuItem>
                            <Divider
                              style={{
                                marginTop: '2px',
                                marginBottom: '2px',
                              }}
                              sx={{ my: 0.5, borderColor: '#6c757d' }}
                            />
                            <MenuItem
                              onClick={() => {
                                window.print();
                              }}
                              disableRipple>
                              <PrintIcon />
                              Print
                            </MenuItem>
                          </StyledMenu>
                        </>
                        <MRT_ToggleFiltersButton table={table} />
                        <MRT_ShowHideColumnsButton table={table} />
                        <MRT_ToggleDensePaddingButton table={table} />
                        <MRT_FullScreenToggleButton table={table} />
                        <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? 'long-menu' : undefined}
                              aria-expanded={open ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={()=>setRightTable(!rightTable)}>
                                {
                                  rightTable === true
                                  ? <KeyboardDoubleArrowRightIcon />
                                  : <KeyboardDoubleArrowLeftIcon />
                                }
                            </IconButton>
                      </Box>
                    </div>
                  </div>
                  {filterShow && (
                                    <div
                                        style={{
                                            gridColumn: 'span 2 / auto',
                                        }}>
                                        <div>
                                            <Collapse in={filterShow}>
                                                <div className="table-filter-area">
                                                  <Filter
                                                   setApplyFilter={setApplyFilter}
                                                   applyFilter={applyFilter}
                                                   setTableData1={setData1}
                                                   setTableData2={setData2}
                                                   orgData1={setOriginalData1}
                                                   orgData2={setOriginalData2}
                                                   setLoading={setIsLoading}
                                                  />
                                                  </div>
                                                <hr style={{ margin: 0, padding: 0, color: '#CED4DA', opacity: 1 }} />
                                                <div className="table-filter-buttons">
                                                    <ButtonB
                                                        onClick={() => setApplyFilter(true)}
                                                        className="filter-buttons-apply"
                                                        size="sm">
                                                        {t('Apply')}
                                                    </ButtonB>
                                                    <ButtonB
                                                        // onClick={handlClearBtn}
                                                        className="filter-buttons-clear"
                                                        size="sm">
                                                        {t('Clear')}
                                                    </ButtonB>
                                                    <ButtonB
                                                        onClick={openFilterBox}
                                                        className="filter-buttons-close"
                                                        size="sm">
                                                        {t('Close')}
                                                    </ButtonB>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                )}
                </>
              );
            }}
          />
      </Grid>

      <Grid xs={12} sm={4}>
        {
          rightTable &&
          <MaterialReactTable
            {...commonTableProps}
            columns={columnsMicrozone}
            data={data2}
            autoResetPageIndex={false}
            enableRowOrdering
            enableSorting={false}
            enableColumnOrdering
            defaultColumn={{
              size: 100,
            }}
            getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
            muiTableBodyRowDragHandleProps={({ table }) => (
              {
                onDragEnd: () => {
                  const { draggingRow, hoveredRow } = table.getState();
                  console.log(hoveredTable);
                  console.log(draggingRow, hoveredRow);
                  if (hoveredTable === 'table-1') {
                    setData1( [...originalData1, draggingRow.original]);
                    setOriginalData2(()=>originalData2.filter((d)=> d !== draggingRow.original));
                    setData2(()=>originalData2.filter((d)=> d !== draggingRow.original));
                  }
                  else {
                    console.log(draggingRow.original);
                    setData1(originalData1);
                    // setData2(()=>originalData2.filter((d)=> d !== draggingRow.original))
                  }
                  setHoveredTable(null);
                }
              }
            )}

            muiTablePaperProps={{
              onDragEnter: () => setHoveredTable('table-2')
            }}

            muiToolbarAlertBannerChipProps={{
              sx: {
                backgroundColor: '#00a0df',
                color: '#fff',
              },
            }}
            muiTableContainerProps={{ sx: { minHeight: '500px',maxHeight:'500px' } }}
            enableDensityToggle={true}
            paginateExpandedRows={false}
            enableColumnFilterModes
            enablePinning
            filterFromLeafRows
            positionActionsColumn="last"
            muiTableHeadCellProps={{
              sx: {
                fontSize: {
                  xs: '10px',
                  sm: '11px',
                  md: '12px',
                  lg: '13px',
                  xl: '14px',
                },
              },
            }}
            muiTableBodyProps={{
              sx: (theme) => ({
                '& tr:nth-of-type(odd)': {
                  backgroundColor: isStripe && '#eef2f7',
                },
              }),
            }}
            muiTableProps={{
              sx: {
                tableLayout: 'auto',
              },
              size: 'small',
            }}
            initialState={{
              density: 'compact',
              pagination: { pageIndex: 0, pageSize: 50 },
            }}
            displayColumnDefOptions={{
              'mrt-row-expand': {
                size: 30,
                maxSize: 30,
                minSize: 20,
                muiTableHeadCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
                muiTableBodyCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
              },
              'mrt-row-select': {
                size: 30,
                muiTableHeadCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
                muiTableBodyCellProps: {
                  align: 'center',
                  sx: {
                    boxShadow: 'none',
                  },
                },
              },
              'mrt-row-actions': {
                header: 'Actions', //change header text
                enableColumnOrdering: false,
                // size: 50, //make actions column wider
                sx: {
                  boxShadow: 'none',
                },
              },
            }}

            renderTopToolbar={({ table }) => {



              return (
                <>
                  <MRT_ToolbarAlertBanner table={table} />
                  <MRT_ToolbarDropZone table={table} />
                  <div className="table-top-toolbar-menu">
                    <div className="toolbar">
                      <div
                        className="item-1"
                        style={{
                          display: 'flex',
                          gap: '4px',
                          alignSelf: 'center',
                        }}>

                      </div>
                      <Box>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleGlobalFilterButton table={table} />

                        <>
                          <Tooltip title="Table Actions" arrow>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? 'long-menu' : undefined}
                              aria-expanded={open ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}>
                              <MoreHorizIcon />
                            </IconButton>
                          </Tooltip>

                          <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                              'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}>
                            <MenuItem
                              color="primary"
                              onClick={() =>
                                handleExportData(table.getPrePaginationRowModel().flatRows)
                              }
                              variant="contained"
                              disableRipple>
                              <DownloadIcon />
                              All Data
                            </MenuItem>
                            <MenuItem
                              disabled={
                                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                              }
                              onClick={() =>
                                handleExportRows(table.getSelectedRowModel().flatRows)
                              }
                              variant="contained"
                              disableRipple>
                              <DownloadIcon />
                              Selected Rows
                            </MenuItem>
                            <Divider
                              style={{
                                marginTop: '2px',
                                marginBottom: '2px',
                              }}
                              sx={{ my: 0.5, borderColor: '#6c757d' }}
                            />
                            <MenuItem onClick={() => setIsStripe(!isStripe)} disableRipple>
                              <ViewHeadlineIcon />
                              Stripe
                            </MenuItem>
                            <Divider
                              style={{
                                marginTop: '2px',
                                marginBottom: '2px',
                              }}
                              sx={{ my: 0.5, borderColor: '#6c757d' }}
                            />
                            <MenuItem
                              onClick={() => {
                                window.print();
                              }}
                              disableRipple>
                              <PrintIcon />
                              Print
                            </MenuItem>
                          </StyledMenu>
                        </>
                        <MRT_ToggleFiltersButton table={table} />
                        <MRT_ShowHideColumnsButton table={table} />
                        <MRT_ToggleDensePaddingButton table={table} />
                        <MRT_FullScreenToggleButton table={table} />

                      </Box>
                    </div>
                  </div>
                </>
              );
            }}
          />
        }

      </Grid>
    </Grid>
   </Box> */}
   {
    microTargetRadio === 1
    ?<MicroZoneTable/>
    :microTargetRadio === 2
    ?<WorkPlaceTable/>
    :<ClientTable/>
   }
   </>
  );
}


export default Planning