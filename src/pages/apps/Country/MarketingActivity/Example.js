import React, { useState, useRef, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { alpha, styled } from '@mui/material/styles';
import DateRange from '@mui/icons-material/DateRange';
import * as PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import {
    SortingState,
    IntegratedSorting,
    PagingState,
    IntegratedPaging,
    FilteringState,
    IntegratedFiltering,
    DataTypeProvider,
    SearchState,
    GroupingState,
    IntegratedGrouping,
    SelectionState,
    SummaryState,
    IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableFilterRow,
    Toolbar,
    DragDropProvider,
    TableColumnReordering,
    TableColumnResizing,
    TableColumnVisibility,
    TableFixedColumns,
    TableGroupRow,
    GroupingPanel,
    TableSelection,
    VirtualTable,
    TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import { generateRows } from './demo-data/generator';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import saveAs from 'file-saver';
import FreezeDragDrop from './FreezeDragDrop';
import { MultiSelect } from 'react-multi-select-component';
import Dropdowns from '../../../../components/Dropdowns';
import TableLayout from '../../../../components/Tables/TableAccordion';
import AddModal from './AddModal';

const Example = () => {

    const [columns] = useState([
        { name: 'startDate', title: 'Start Date' },
        { name: 'country', title: 'Country' },
        { name: 'activity', title: 'Activity' },
        { name: 'marketingActivity', title: 'Marketing Activity' },
        { name: 'businessUnıte', title: 'Business Unite' },
        { name: 'ar', title: 'ar' },
        { name: 'zoneId', title: 'zoneId' },
        { name: 'position', title: 'position' },
        { name: 'employee', title: 'employee' },
        { name: 'parcent', title: 'parcent' },
        { name: 'product', title: 'product' },
        { name: 'yuzde', title: 'yuzde' },
        { name: 'specilization', title: 'specilization' },
        { name: 'indication', title: 'indication' },
        { name: 'progress', title: 'progress' },
        { name: 'current', title: 'current' },
        { name: 'clinic', title: 'clinic' },
        { name: 'costStatus', title: 'costStatus' },
        { name: 'planed', title: 'planed' },
        { name: 'actual', title: 'actual' },
        { name: 'last3', title: 'last3' },
        { name: 'next3', title: 'next3' },
        { name: 'cur', title: 'cur' },
        { name: 'res', title: 'res' },
        { name: 'actualz', title: 'actualz' },
        { name: 'report', title: 'report' },
        { name: 'question', title: 'question' },
        { name: 'buttons', title: 'Buttons' },
    ]);

    // Table Columns Resizing Width
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'startDate', width: 150 },
        { columnName: 'country', width: 150 },
        { columnName: 'activity', width: 150 },
        { columnName: 'marketingActivity', width: 150 },
        { columnName: 'businessUnıte', width: 150 },
        { columnName: 'ar', width: 150 },
        { columnName: 'zoneId', width: 150 },
        { columnName: 'position', width: 150 },
        { columnName: 'employee', width: 150 },
        { columnName: 'parcent', width: 150 },
        { columnName: 'product', width: 150 },
        { columnName: 'yuzde', width: 150 },
        { columnName: 'specilization', width: 150 },
        { columnName: 'indication', width: 150 },
        { columnName: 'progress', width: 150 },
        { columnName: 'current', width: 150 },
        { columnName: 'clinic', width: 150 },
        { columnName: 'costStatus', width: 150 },
        { columnName: 'planed', width: 150 },
        { columnName: 'actual', width: 150 },
        { columnName: 'last3', width: 150 },
        { columnName: 'next3', width: 150 },
        { columnName: 'cur', width: 150 },
        { columnName: 'res', width: 150 },
        { columnName: 'actualz', width: 150 },
        { columnName: 'report', width: 150 },
        { columnName: 'question', width: 150 },
        { columnName: 'buttons', width: 150 },
    ]);

    // Table show or hide items

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, isFreeze: false, name: 'startDate', title: 'Start Date' },
        { isShow: true, isFreeze: false, name: 'country', title: 'Country' },
        { isShow: true, isFreeze: false, name: 'activity', title: 'Activity' },
        { isShow: true, isFreeze: false, name: 'marketingActivity', title: 'Marketing Activity' },
        { isShow: true, isFreeze: false, name: 'businessUnıte', title: 'Business Unite' },
        { isShow: true, isFreeze: false, name: 'ar', title: 'ar' },
        { isShow: true, isFreeze: false, name: 'zoneId', title: 'zoneId' },
        { isShow: true, isFreeze: false, name: 'position', title: 'position' },
        { isShow: true, isFreeze: false, name: 'employee', title: 'employee' },
        { isShow: true, isFreeze: false, name: 'parcent', title: 'parcent' },
        { isShow: true, isFreeze: false, name: 'product', title: 'product' },
        { isShow: true, isFreeze: false, name: 'yuzde', title: 'yuzde' },
        { isShow: true, isFreeze: false, name: 'specilization', title: 'specilization' },
        { isShow: true, isFreeze: false, name: 'indication', title: 'indication' },
        { isShow: true, isFreeze: false, name: 'progress', title: 'progress' },
        { isShow: true, isFreeze: false, name: 'current', title: 'current' },
        { isShow: true, isFreeze: false, name: 'clinic', title: 'clinic' },
        { isShow: true, isFreeze: false, name: 'costStatus', title: 'costStatus' },
        { isShow: true, isFreeze: false, name: 'planed', title: 'planed' },
        { isShow: true, isFreeze: false, name: 'actual', title: 'actual' },
        { isShow: true, isFreeze: false, name: 'last3', title: 'last3' },
        { isShow: true, isFreeze: false, name: 'next3', title: 'next3' },
        { isShow: true, isFreeze: false, name: 'cur', title: 'cur' },
        { isShow: true, isFreeze: false, name: 'res', title: 'res' },
        { isShow: true, isFreeze: false, name: 'actualz', title: 'actualz' },
        { isShow: true, isFreeze: false, name: 'report', title: 'report' },
        { isShow: true, isFreeze: false, name: 'question', title: 'question' },
        { isShow: true, isFreeze: false, name: 'buttons', title: 'Buttons' },
    ])


    //Row selection
    const [selection, setSelection] = useState([]);

    //Columns Grouping
    const [grouping, setGrouping] = useState([]);

    //Global Search
    const [searchValue, setSearchState] = useState('');

    //Table Column Visibility
    const [hiddenColumnNames, setHiddenColumnNames] = useState([]);

    //Table Columns Fixed
    const [leftColumns, setLeftColumns] = useState([]);
    const [rightColumns, setRightColumns] = useState([]);

    //Table Column Reordering
    const [tableColumnExtensions] = useState([
        { columnName: 'startDate', width: 500 },
        { columnName: 'country', width: 150 },
        { columnName: 'activity', width: 150 },
        { columnName: 'marketingActivity', width: 150 },
        { columnName: 'businessUnıte', width: 150 },
        { columnName: 'ar', width: 150 },
        { columnName: 'zoneId', width: 150 },
        { columnName: 'position', width: 150 },
        { columnName: 'employee', width: 150 },
        { columnName: 'parcent', width: 150 },
        { columnName: 'product', width: 150 },
        { columnName: 'yuzde', width: 150 },
        { columnName: 'specilization', width: 150 },
        { columnName: 'indication', width: 150 },
        { columnName: 'progress', width: 150 },
        { columnName: 'current', width: 150 },
        { columnName: 'clinic', width: 150 },
        { columnName: 'costStatus', width: 150 },
        { columnName: 'planed', width: 150 },
        { columnName: 'actual', width: 150 },
        { columnName: 'last3', width: 150 },
        { columnName: 'next3', width: 150 },
        { columnName: 'cur', width: 150 },
        { columnName: 'res', width: 150 },
        { columnName: 'actualz', width: 150 },
        { columnName: 'report', width: 150 },
        { columnName: 'question', width: 150 },
        { columnName: 'buttons', width: 150 },
    ]);

    //Freeze Columns
    const itemsFromBackend = [
        { id: '1', isFreeze: false, columnName: 'startDate', content: 'Start Date' },
        { id: '2', isFreeze: false, columnName: 'country', content: 'Country' },
        { id: '3', isFreeze: false, columnName: 'activity', content: 'Activity' },
        { id: '4', isFreeze: false, columnName: 'marketingActivity', content: 'Marketing Activity' },
        { id: '5', isFreeze: false, columnName: 'businessUnıte', content: 'Business Unite' },
        { id: '6', isFreeze: false, columnName: 'ar', content: 'ar' },
        { id: '7', isFreeze: false, columnName: 'zoneId', content: 'zoneId' },
        { id: '8', isFreeze: false, columnName: 'position', content: 'position' },
        { id: '9', isFreeze: false, columnName: 'employee', content: 'employee' },
        { id: '11', isFreeze: false, columnName: 'parcent', content: 'metehan' },
        { id: '12', isFreeze: false, columnName: 'product', content: 'product' },
        { id: '13', isFreeze: false, columnName: 'buttons', content: 'Buttons' },
    ];

    const columnsFromBackend = {
        '100': {
            name: "Requested",
            items: itemsFromBackend
        },
        '101': {
            name: "To do",
            items: []
        },
    };

    const [columnsFreeze, setColumnsFreeze] = useState(columnsFromBackend);
    const [isColumnsFreeze, setIsColumnsFreeze] = useState(false);

    const freezeColumns = (columnName) => {

        showorHideColumnsItems.map(data => (
            data.name === columnName
                ? data.isFreeze = !data.isFreeze
                : null
        ))

        let columnsItem = leftColumns.includes(columnName);
        if (columnsItem === false) {
            setLeftColumns([...leftColumns, columnName])
        }
        else {
            let filterLeftColumns = leftColumns.filter(data => data !== columnName);
            setLeftColumns(filterLeftColumns);
        }
    }


    //Column order columnlar yer değiştirince bu state yer değiştiriyor
    const [columnOrder, setColumnOrder] = useState(['startDate', 'country', 'activity', 'marketingActivity', 'businessUnıte', 'ar', 'zoneId', 'position', 'employee', 'parcent', 'product', 'yuzde', 'specilization', 'indication', 'progress', 'current', 'clinic', 'costStatus', 'planed', 'actual', 'last3', 'next3', 'cur', 'res', 'actualz', 'report', 'question', 'buttons']);
    const [tableItems, setTableItems] = useState(generateRows);

    const [rows, setRows] = useState(generateRows({ length: 0 }));

    //Collapse Row
    const getChildRows = (row, rootRows) => {
        const childRows = rows.filter(r => r.parentId === (row ? row.id : null));
        return childRows.length ? childRows : null;
    };

    const [expandedRowIds, setExpandenRowIds] = useState([2, 2]);

    // const [dateColumns] = useState(['saleDate']);
    // const [dateFilterOperations] = useState(['month', 'contains', 'startsWith', 'endsWith']);
    // const [currencyColumns] = useState(['amount']);
    const [currencyFilterOperations] = useState([
        'equal',
        'notEqual',
        'greaterThan',
        'greaterThanOrEqual',
        'lessThan',
        'lessThanOrEqual',
    ]);
    const [filteringColumnExtensions] = useState([
        {
            columnName: 'saleDate',
            predicate: (value, filter, row) => {
                if (!filter.value.length) return true;
                if (filter && filter.operation === 'month') {
                    const month = parseInt(value.split('-')[1], 10);
                    return month === parseInt(filter.value, 10);
                }
                return IntegratedFiltering.defaultPredicate(value, filter, row);
            },
        },
    ]);

    //Sorting
    const [sorting, setSorting] = useState([{ columnName: 'city', direction: 'asc' }]);
    //PageSizes
    const [pageSizes] = useState([5, 10, 15, 0]);

    const FilterIcon = ({ type, ...restProps }) => {
        if (type === 'month') return <DateRange {...restProps} />;
        return <TableFilterRow.Icon type={type} {...restProps} />;
    };

    // Summary

    const CurrencyFormatter = ({ value }) => (
        value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    );

    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );

    const [totalSummaryItems] = useState([
        { type:'count',columnName: 'startDate', width: 150 },
        { type:'count',columnName: 'country', width: 150 },
        { type:'count',columnName: 'activity', width: 150 },
        { type:'count',columnName: 'marketingActivity', width: 150 },
        { type:'count',columnName: 'businessUnıte', width: 150 },
        { type:'count',columnName: 'ar', width: 150 },
        { type:'count',columnName: 'zoneId', width: 150 },
        { type:'count',columnName: 'position', width: 150 },
        { type:'count',columnName: 'employee', width: 150 },
        { type:'sum',columnName: 'parcent', width: 150 },
        { type:'count',columnName: 'product', width: 150 },
        { type:'count',columnName: 'yuzde', width: 150 },
        { type:'count',columnName: 'specilization', width: 150 },
        { type:'count',columnName: 'indication', width: 150 },
        { type:'count',columnName: 'progress', width: 150 },
        { type:'count',columnName: 'current', width: 150 },
        { type:'count',columnName: 'clinic', width: 150 },
        { type:'count',columnName: 'costStatus', width: 150 },
        { type:'count',columnName: 'planed', width: 150 },
        { type:'count',columnName: 'actual', width: 150 },
        { type:'count',columnName: 'last3', width: 150 },
        { type:'count',columnName: 'next3', width: 150 },
        { type:'count',columnName: 'cur', width: 150 },
        { type:'count',columnName: 'res', width: 150 },
        { type:'count',columnName: 'actualz', width: 150 },
        { type:'count',columnName: 'report', width: 150 },
        { type:'count',columnName: 'question', width: 150 },
        { type:'count',columnName: 'buttons', width: 150 },
        // { columnName: 'amount', type: 'sum' },
    ]);
    const [currencyColumns] = useState(['amount']);

    console.log(currencyColumns);

    const [groupSummaryItems] = useState([
        { type:'count',columnName: 'startDate', width: 150 },
        { type:'count',columnName: 'country', width: 150 },
        { type:'count',columnName: 'activity', width: 150 },
        { type:'count',columnName: 'marketingActivity', width: 150 },
        { type:'count',columnName: 'businessUnıte', width: 150 },
        { type:'count',columnName: 'ar', width: 150 },
        { type:'count',columnName: 'zoneId', width: 150 },
        { type:'count',columnName: 'position', width: 150 },
        { type:'count',columnName: 'employee', width: 150 },
        { type:'sum',columnName: 'parcent', width: 150 },
        { type:'count',columnName: 'product', width: 150 },
        { type:'count',columnName: 'yuzde', width: 150 },
        { type:'count',columnName: 'specilization', width: 150 },
        { type:'count',columnName: 'indication', width: 150 },
        { type:'count',columnName: 'progress', width: 150 },
        { type:'count',columnName: 'current', width: 150 },
        { type:'count',columnName: 'clinic', width: 150 },
        { type:'count',columnName: 'costStatus', width: 150 },
        { type:'count',columnName: 'planed', width: 150 },
        { type:'count',columnName: 'actual', width: 150 },
        { type:'count',columnName: 'last3', width: 150 },
        { type:'count',columnName: 'next3', width: 150 },
        { type:'count',columnName: 'cur', width: 150 },
        { type:'count',columnName: 'res', width: 150 },
        { type:'count',columnName: 'actualz', width: 150 },
        { type:'count',columnName: 'report', width: 150 },
        { type:'count',columnName: 'question', width: 150 },
        { type:'count',columnName: 'buttons', width: 150 },
    //   {
    //     columnName: 'amount', type: 'sum', showInGroupFooter: false,
    //   },
    //   {
    //     columnName: 'amount', type: 'max', showInGroupFooter: false, alignByColumn: true,
    //   },
    //   {
    //     columnName: 'units', type: 'sum', showInGroupFooter: false, alignByColumn: true,
    //   },
    ]);




    const PREFIX = 'Demo';
    const classes = {
        root: `${PREFIX}-root`,
        numericInput: `${PREFIX}-numericInput`,
    };
    const StyledInput = styled(Input)(({ theme }) => ({
        [`&.${classes.root}`]: {
            margin: theme.spacing(1),
        },
        [`& .${classes.numericInput}`]: {
            fontSize: '14px',
            textAlign: 'right',
            width: '100%',
        },
    }));

    const CurrencyEditor = ({ value, onValueChange }) => {
        const handleChange = (event) => {
            const { value: targetValue } = event.target;
            if (targetValue.trim() === '') {
                onValueChange();
                return;
            }
            onValueChange(parseInt(targetValue, 10));
        };
        return (
            <StyledInput
                type="number"
                classes={{
                    input: classes.numericInput,
                    root: classes.root,
                }}
                fullWidth
                value={value === undefined ? '' : value}
                inputProps={{
                    min: 0,
                    placeholder: 'Filter...',
                }}
                onChange={handleChange}
            />
        );
    };

    CurrencyEditor.propTypes = {
        value: PropTypes.number,
        onValueChange: PropTypes.func.isRequired,
    };

    CurrencyEditor.defaultProps = {
        value: undefined,
    };

    // Table Striped
    const [tableStriped, setTableStriped] = useState(false);
    const classesTable = {
        tableStriped: `${PREFIX}-tableStriped`,
    };

    const StyledTable = styled(Table.Table)(({ theme }) => ({
        [`&.${classesTable.tableStriped}`]: {
            '& tbody tr:nth-of-type(even)': {
                backgroundColor: alpha(theme.palette.primary.main, tableStriped === false ? 0 : 0.15),
            },
        },
    }));

    const TableComponent = props => (
        <StyledTable
            {...props}
            className={classesTable.tableStriped}
        />
    );


    const [hiddenGroupPanel, setHiddenGroupPanel] = useState(false);
    const [hiddenFilter, setHiddenFilter] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isSelectDropdown, setIsSelectDropdown] = useState(false);
    const [hiddenFreeze, setHiddenFreeze] = useState(false);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)

        if (searchValue !== '') {
            const filteredData = tableItems.filter((item) => {
                // console.log(Object.values(item).join(''));
                return Object.values(item).join('').toString().toLowerCase().includes(searchValue.toString().toLocaleLowerCase())
                // return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
            setRows(filteredData)
        }
        else {
            setFilteredResults(rows)
            setRows(tableItems)
        }
    }

    const hiddenColumns = (e) => {
        console.log(e);
        if (hiddenColumnNames.length === 0) {
            showorHideColumnsItems.map(data => (
                data.name === e
                    ? data.isShow = !data.isShow
                    : null
            ));
            setHiddenColumnNames([e]);
        }
        else {
            showorHideColumnsItems.map(data => (
                data.name === e
                    ? data.isShow = !data.isShow
                    : null
            ));
            hiddenColumnNames.includes(e)
                ? setHiddenColumnNames(prev => prev.filter(data => data !== e))
                : setHiddenColumnNames(prev => [...prev, e])
        }
    }

    const hiddenGroup = () => {
        setHiddenGroupPanel(!hiddenGroupPanel);
        if (hiddenGroupPanel === false) {
            document.querySelector('.MuiToolbar-gutters').style.minHeight = '50px';
        }
        else {
            document.querySelector('.MuiToolbar-gutters').style.minHeight = '0px';
        }
    }


    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [tableIsSettings, setTableIsSettings] = useState(false);
  // Export
  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  };
const exporterRef = useRef(null);

const startExport = useCallback(() => {
  exporterRef.current.exportGrid();
}, [exporterRef]);


    const [options, setoptions] = useState([
        { value: 'mehmet', label: 'mehmet' }
    ])

    const [value, setvalue] = useState([]);

const handleCloseActions =(type)=> {
    
    switch (type) {
        case 'search':
            return(
                setIsSearchOpen(!isSearchOpen)
            )
        case 'freeze':
            return(
                setHiddenFreeze(!hiddenFreeze)
            )
    
        default:
            break;
    }
}


const getStatusOptions = (status, item) => {
    return statusOptions

};

const [showAddModal, setShowAddModal] = useState(false);

const [tableData, setTableData] = useState([
    {
        header:'Place',
        abb:'PLC',
        description:'Lorem ipsum',
        language:'EN',
        action:'null',
        subRows:[
            {
                header: 'Place',
                abb: 'PLC',
                description: 'Lorem ipsum',
                language: 'EN',
                action: 1,
            }
        ]
    },
    {
        header:'Categorie',
        abb:'CAT',
        description:'Lorem ipsum',
        language:'EN',
        action:'null',
        subRows:[
            {
                header: 'Place',
                abb: 'PLC',
                description: 'Lorem ipsum',
                language: 'EN',
                action: 1,
            }
        ]
    }
])

const statusOptions = [
    {
        id: 9,
        key: 'Edit',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    },
]

const columnsx = [
    {
        header: 'Header',
        accessorKey: 'header',
        size: '170'
    },
    {
        header: 'Abb',
        accessorKey: 'abb',
        size: '75'
    },
    {
        header: 'Description',
        accessorKey: 'description',
        size: '170'
    },
    {
        header: 'Language',
        accessorKey: 'language',
        size: '75'
    },
    {
        header: '',
        accessorKey: 'action',
        size: '50',
        muiTableBodyCellProps: {
            align: 'center',
          },
        Cell: ({ cell, row }) => {
            console.log(cell);
            console.log("bura cell",cell.getValue())
            console.log("burası row",row)
            return (
                <Dropdowns
                    item={`?${row.original.id}?${row.original.promoSubjectName}`}
                    option={getStatusOptions(cell.getValue(), row.original)}
                />
            )
        }
    }
]

    return (
    //     <>
    //         <div className='table-topbar'>
    //             {/* <div className='table-topbar-left'>
    //                 <div className='tab'>
    //                     <i class="fa-solid fa-list">
    //                         <label>metehan</label>
    //                     </i>
    //                 </div>

    //                 <div className='tab'>
    //                     <i class="fa-solid fa-list">
    //                         <label>atakan</label>
    //                     </i>
    //                 </div>

    //             </div> */}
    //             <div className='table-topbar-right'>
    //                 <div className='item search'>
    //                     <i onClick={() => handleCloseActions('search')} className="fa-solid fa-magnifying-glass"></i>
    //                     {
    //                         isSearchOpen && <input type='search' placeholder=' Search' onChange={(e) => searchItems(e.target.value)} />
    //                     }
    //                 </div>
    //                 <div className='item'>
    //                     <i className="fa-solid fa-filter"></i>
    //                 </div>
    //                 <div className='item' onClick={() => handleCloseActions()}>
    //                     <i className="fa-solid fa-arrows-left-right-to-line"></i>
    //                 </div>
    //                 <div className='item' onClick={hiddenGroup}>
    //                     <i className="fa-regular fa-square-plus"></i>
    //                 </div>
    //                 <div onClick={() => setTableIsSettings(!tableIsSettings)} className='item'>
    //                     <i className="fa-solid fa-sliders"></i>
    //                 </div>
    //                 {/* <div className='item add'>
    //                     <i className="fa-solid fa-plus"></i>
    //                 </div> */}
    //             </div>
    //         </div>

    //         {
    //             tableIsSettings &&
    //             <div className='table-settings'>
    //                 <div className='header'>
    //                     <div>Table Options</div>
    //                     <div className='close' onClick={() => setTableIsSettings(false)}><i className="fa-solid fa-x"></i></div>
    //                 </div>

    //                 <div className='item'>
    //                     <input type='text' placeholder='Table Name' />
    //                 </div>

    //                 <div className='item'>
    //                     <div>
    //                         <i className="fa-solid fa-filter"></i>Filter
    //                     </div>
    //                 </div>
    //                 <div className='item' onClick={() => setIsColumnsFreeze(true)}>
    //                     <div>
    //                         <i className="fa-solid fa-arrows-left-right-to-line"></i>Freeze
    //                     </div>
    //                 </div>
    //                 <div className='item' onClick={hiddenGroup}>
    //                     <div>
    //                         <i className="fa-regular fa-square-plus"></i>Group by
    //                     </div>
    //                 </div>
    //                 <div className='item' onClick={() => setHiddenFilter(!hiddenFilter)}>
    //                     <div>
    //                         <i className="fa-brands fa-searchengin"></i>Search / sort in columns
    //                     </div>
    //                 </div>
    //                 <hr />

    //                 <div className='item' onClick={() => setIsSelectDropdown(!isSelectDropdown)} >
    //                     <div>
    //                         <i className="fa-solid fa-eye"></i>Show / hide columns
    //                     </div>
    //                 </div>
    //                 <div className='item'>
    //                     <div>
    //                         <i className="fa-solid fa-arrow-down-up-across-line"></i>Comfort display
    //                     </div>
    //                 </div>
    //                 <hr />

    //                 <div className='item'>
    //                     <div>
    //                         <i className="fa-solid fa-arrows-to-circle"></i>Focus
    //                     </div>

    //                     <div>
    //                         <i className="fa-solid fa-eye"></i>
    //                     </div>

    //                 </div>
    //                 <div className='item' >
    //                     <div>
    //                         <i class="fa-brands fa-gitter"></i>
    //                         Table Striped
    //                     </div>
    //                     <div onClick={() => setTableStriped(!tableStriped)}>
    //                         {
    //                             tableStriped === false
    //                                 ? <i class="fa-solid fa-eye-slash"></i>
    //                                 : <i className="fa-solid fa-eye"></i>
    //                         }
    //                     </div>
    //                 </div>
    //                 <div className='item'>
    //                     <div>
    //                         <i class="fa-solid fa-plus"></i>Total
    //                     </div>

    //                     <div>
    //                         <i className="fa-solid fa-eye"></i>
    //                     </div>

    //                 </div>

    //                 <hr />
    //                 <div className='item' onClick={onSave}>
    //                     <div>
    //                         <i class="fa-solid fa-file-arrow-up"></i>Export
    //                     </div>
    //                 </div>
    //                 <div className='item'>
    //                     <div>
    //                         <i class="fa-solid fa-file-arrow-down"></i>Import
    //                     </div>
    //                 </div>
    //             </div>
    //         }

    //         {
    //             isSelectDropdown && <div className='table-settings'>
    //                 <div className='header'>
    //                     <div>Show / hide columns</div>
    //                     <div onClick={() => setIsSelectDropdown(false)} > <i className="fa-solid fa-x"></i></div>
    //                 </div>
    //                 {
    //                     showorHideColumnsItems.map(data => (
    //                         <div className='show-hide-item'>
    //                             <div className='title'>{data.title}</div>
    //                             <div className='icon' onClick={() => hiddenColumns(data.name)}>
    //                                 {
    //                                     data.isShow === true
    //                                         ? <i className="fa-solid fa-eye"></i>
    //                                         : <i class="fa-solid fa-eye-slash"></i>
    //                                 }
    //                             </div>
    //                         </div>
    //                     ))
    //                 }
    //             </div>

    //         }

    //         {
    //             isColumnsFreeze && <div className='table-settings'>
    //                 <div className='header'>
    //                     <div>Freeze</div>
    //                     <div onClick={() => setIsColumnsFreeze(false)} > <i className="fa-solid fa-x"></i></div>
    //                 </div>
    //                 {
    //                     showorHideColumnsItems.map((data, id) => (
    //                         <div key={id} className='show-hide-item'>
    //                             <div className='title'>{data.title}</div>
    //                             <div className='icon' onClick={() => freezeColumns(data.name)}>
    //                                 {
    //                                     data.isFreeze === true
    //                                         ? <i className="fa-solid fa-eye"></i>
    //                                         : <i class="fa-solid fa-eye-slash"></i>
    //                                 }
    //                             </div>
    //                         </div>
    //                     ))
    //                 }
    //             </div>
    //         }

    //         <div className='table-filter'>
    //             <Row>
    //                 <Col>
    //                     <h5>metehan</h5>
    //                     <MultiSelect
    //                         options={options}
    //                         value={value}
    //                         onChange={setvalue}
    //                         labelledBy={'select'}

    //                     />
    //                 </Col>

    //                 <Col>
    //                     <MultiSelect
    //                         options={options}
    //                         value={value}
    //                         onChange={setvalue}
    //                         labelledBy={'select'}

    //                     />
    //                 </Col>

    //                 <Col>
    //                     <MultiSelect
    //                         options={options}
    //                         value={value}
    //                         onChange={setvalue}
    //                         labelledBy={'select'}

    //                     />
    //                 </Col>

    //                 <Col>
    //                     <MultiSelect
    //                         options={options}
    //                         value={value}
    //                         onChange={setvalue}
    //                         labelledBy={'select'}

    //                     />
    //                 </Col>

    //                 <Col>
    //                     <MultiSelect
    //                         options={options}
    //                         value={value}
    //                         onChange={setvalue}
    //                         labelledBy={'select'}

    //                     />
    //                 </Col>

    //                 <Col>
    //                     <MultiSelect
    //                         options={options}
    //                         value={value}
    //                         onChange={setvalue}
    //                         labelledBy={'select'}

    //                     />
    //                 </Col>
    //             </Row>

    //         </div>
    //         <Paper>
    //             <Grid
    //                 rows={rows}
    //                 columns={columns}
    //             >
    //                 <VirtualTable />
    //                 <SearchState
    //                     value={searchValue}
    //                     onValueChange={setSearchState}
    //                 />
    //                 <DragDropProvider />
    //                 {/* <DataTypeProvider
    //                     for={dateColumns}
    //                     availableFilterOperations={dateFilterOperations}
    //                 /> */}
    //                 <DataTypeProvider
    //                     for={currencyColumns}
    //                     availableFilterOperations={currencyFilterOperations}
    //                     editorComponent={CurrencyEditor}
    //                 />
    //                 <FilteringState defaultFilters={[]} />
    //                 <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
    //                 <SortingState
    //                     sorting={sorting}
    //                     onSortingChange={setSorting}
    //                 />
    //                 <PagingState
    //                     defaultCurrentPage={0}
    //                     defaultPageSize={5}
    //                 />

    //                 <IntegratedFiltering />
    //                 <IntegratedSorting />
    //                 <IntegratedPaging />
    //                 {/* <TreeDataState
    //                 expandedRowIds={expandedRowIds}
    //                 onExpandedRowIdsChange={setExpandenRowIds}
    //             />
    //             <CustomTreeData
    //                 getChildRows={getChildRows}
    //             /> */}
    //                 <DragDropProvider />
    //                 <GroupingState
    //                     grouping={grouping}
    //                     onGroupingChange={setGrouping}
    //                 />
    //                 <IntegratedGrouping />
    //                 <SelectionState
    //                     selection={selection}
    //                     onSelectionChange={setSelection}
    //                 />
    //                 <Table columnExtensions={tableColumnExtensions} tableComponent={TableComponent} />
    //                 <TableColumnReordering
    //                     order={columnOrder}
    //                     onOrderChange={setColumnOrder}
    //                 />
    //                 {
    //                     hiddenFilter &&
    //                     <TableFilterRow
    //                         showFilterSelector
    //                         iconComponent={FilterIcon}
    //                         messages={{ month: 'Month equals' }}
    //                     />
    //                 }
    //                 <TableColumnResizing
    //                     columnWidths={columnWidths}
    //                     onColumnWidthsChange={setColumnWidths}
    //                     minColumnWidth={100}
    //                     maxColumnWidth={500}
    //                 />
    //                 {/* <TableTreeColumn
    //                 for="startDate"
    //             /> */}
    //                 <TableHeaderRow showSortingControls />
    //                 <TableSelection
    //                     selectByRowClick
    //                     highlightRow
    //                     showSelectionColumn={false}
    //                 />
    //                   <CurrencyTypeProvider
    //                     for={currencyColumns}
    //                 />
    //                 <SummaryState
    //                     totalItems={totalSummaryItems}
    //                     groupItems={groupSummaryItems}
    //                 />
    //                  <IntegratedGrouping />
    //                 <IntegratedSummary />
    //                 <TableSummaryRow />
    //                 <TableGroupRow />
    //                 <TableColumnVisibility
    //                     hiddenColumnNames={hiddenColumnNames}
    //                     onHiddenColumnNamesChange={setHiddenColumnNames}
    //                 />
                    
    //                 <TableFixedColumns
    //                     leftColumns={leftColumns}
    //                     rightColumns={rightColumns}
    //                 />
    //                 <PagingPanel
    //                     pageSizes={pageSizes}
    //                 />
    //                 <Toolbar />
                    

    //                 {/* Drag a column header here to group by that column */}
    //                 {
    //                     hiddenGroupPanel === true
    //                         ? <GroupingPanel showGroupingControls />
    //                         : null
    //                 }

    //                 {/* <div>
    //             <input type='search' placeholder='search' onChange={(e) => searchItems(e.target.value) }  />
    //                 <button onClick={()=>setHiddenGroupPanel(!hiddenGroupPanel)} >group</button>
    //             </div> */}

    //                 {/* <div className='marketing_activity_header' style={{ display: 'flex', justifyContent: 'end' }}>
    //                 <button className='marketing_activity_private_button '><i className="fa-solid fa-users"></i></button>
    //                 <button  className='marketing_activity_private_button '><i className="fa-solid fa-earth-africa"></i></button>
    //                 <button onClick={()=>setHiddenFilter(!hiddenFilter)} ><i className="fa-solid fa-filter"></i></button>
    //                 <button><i className="fa-solid fa-sort"></i></button>
    //                 <button onClick={hiddenGroup} ><i class="fa-regular fa-square-plus"></i></button>
    //                 <button onClick={() => setIsSelectDropdown(!isSelectDropdown)} ><i className="fa-solid fa-eye"></i></button>
    //                 <button onClick={()=>setHiddenFreeze(!hiddenFreeze)} ><i className="fa-solid fa-arrows-left-right-to-line"></i></button>
    //                 <button><i class="fa-solid fa-arrow-down-up-across-line"></i></button>
    //                 <input type='search' placeholder='search' onChange={(e) => searchItems(e.target.value)} />
    //             </div> */}

    //                 {/* {
    //                     isSelectDropdown &&
    //                     <div className='select_dropdown_menu'>
    //                         {columns.map(column => (
    //                             <div key={column.id}>
    //                                 <label>
    //                                     <input type="checkbox" id={column.name} onClick={hiddenColumns} />{' '}
    //                                     {column.title}
    //                                 </label>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 } */}
    //                 {
    //                     hiddenFreeze && <FreezeDragDrop leftColumns={leftColumns} setLeftColumns={setLeftColumns} columnsFreeze={columnsFreeze} setColumnsFreeze={setColumnsFreeze} />
    //                 }

    //                 {/* <ColumnChooser  />
    //             <SearchPanel /> */}
    //             </Grid>
    //             <GridExporter
    //     ref={exporterRef}
    //     rows={rows}
    //     columns={columns}
    //     onSave={onSave}
    //   />
    //         </Paper>
    //     </>
    <>
    <div>
    <TableLayout 
            data={tableData}
            columns={columnsx} 
            isAccordion={true} 
            dropdownOptions={statusOptions}
            columnPinningRight={['action']}
            handleNewButton={() => setShowAddModal(true)}
        />
    </div>
    {
        showAddModal &&
        <AddModal
        show={showAddModal}
        setShow={setShowAddModal}
        />
    }
    </>
    );
};
export default Example