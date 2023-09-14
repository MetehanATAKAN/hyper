import React, { useState, useEffect, useRef, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { alpha, styled } from '@mui/material/styles';
import DateRange from '@mui/icons-material/DateRange';
import * as PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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
    SummaryState,
    IntegratedSummary,
    SelectionState,
    IntegratedSelection,
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
    VirtualTable,
    TableSummaryRow,
    TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import FreezeDragDrop from '../pages/apps/Country/MarketingActivity/FreezeDragDrop';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import saveAs from 'file-saver';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { isTotalMainTable, setFilterShow } from '../redux/actions';
import Icon from '@mdi/react';
import {
    mdiMagnify,
    mdiFilterMenuOutline,
    mdiLayersTripleOutline,
    mdiArrowSplitVertical,
    mdiDotsHorizontal,
    mdiPlus,
    mdiEyeOutline,
} from '@mdi/js';

import { Dropdown, Menu } from 'antd';

const MainTable = ({
    totalSummaryItems,
    groupSummaryItems,
    tableData,
    exportTableData,
    columns,
    exportColumns,
    columnWidths,
    tableColumnExtensions,
    itemsFromBackend,
    columnOrders,
    setColumnOrders,
    setColumnWidths,
    showorHideColumnsItems,
    groupByItems,
    setGroupByItems,
    disableFreeze = false,
    isAddButton,
    addButtonFunction,
    filters,
    isFilters = false,
    setIsFilters,
    closeFilter,
    setCloseFilter,
    isOptions = true,
    isSelection = false,
    setSelectionItems,
    selectionItems,
    disableSorting,
    defaultSorting,
    isOptionSearch = false,
}) => {
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

    const btnRef = useRef();
    // Localization
    const { t } = useTranslation();
    const tableMessages = {
        noData: t('No data'),
    };
    const pagingPanelMessages = {
        showAll: t('All'),
        rowsPerPage: t('Rows per page'),
        noData: t('No data'),
        info:
            localStorage.getItem('i18nextLng') === 'en'
                ? '{from} - {to} of more than {count}'
                : localStorage.getItem('i18nextLng') === 'tr'
                ? "{from} - {to} {count} 'dan fazla"
                : localStorage.getItem('i18nextLng') === 'ru'
                ? '{from} - {to} из более {count}'
                : '{from} - {to} of more than {count}',
    };
    const groupingPanelMessages = {
        groupByColumn: t('Drag a column header here to group by that column'),
    };
    const filterRowMessages = {
        filterPlaceholder: t('Filter...'),
    };
    
    // Table Selection
    const [selection, setSelection] = useState(selectionItems);
    
    //Columns Grouping
    const [grouping, setGrouping] = useState([]);

    //Global Search
    const [searchValue, setSearchState] = useState('');

    //Table Column Visibility
    const [hiddenColumnNames, setHiddenColumnNames] = useState([]);

    //Table Columns Fixed
    const [leftColumns, setLeftColumns] = useState([]);
    const [rightColumns, setRightColumns] = useState([]);

    const columnsFromBackend = {
        100: {
            name: 'Requested',
            items: itemsFromBackend,
        },
        101: {
            name: 'To do',
            items: [],
        },
    };

    const [columnsFreeze, setColumnsFreeze] = useState(columnsFromBackend);
    const [isColumnsFreeze, setIsColumnsFreeze] = useState(false);

    const freezeColumns = (columnName) => {
        showorHideColumnsItems.map((data) => (data.name === columnName ? (data.isFreeze = !data.isFreeze) : null));

        let columnsItem = leftColumns.includes(columnName);
        if (columnsItem === false) {
            setLeftColumns([...leftColumns, columnName]);
        } else {
            let filterLeftColumns = leftColumns.filter((data) => data !== columnName);
            setLeftColumns(filterLeftColumns);
        }
    };

    const [tableItems, setTableItems] = useState(tableData);
    const getRowId = (row) => row.id;
    const [rows, setRows] = useState(tableData);

    //Collapse Row
    const getChildRows = (row, rootRows) => {
        const childRows = rows.filter((r) => r.parentId === (row ? row.id : null));
        return childRows.length ? childRows : null;
    };

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
    const [pageSizes] = useState([25, 50, 75, 100, 0]);

    const FilterIcon = ({ type, ...restProps }) => {
        if (type === 'month') return <DateRange {...restProps} />;
        return <TableFilterRow.Icon type={type} {...restProps} />;
    };

    // Summary
    const CurrencyFormatter = ({ value }) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const CurrencyTypeProvider = (props) => <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />;

    const [isTotal, setIsTotal] = useState(false);

    const [currencyColumns] = useState(['amount']);

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

    const TableComponent = (props) => <StyledTable {...props} className={classesTable.tableStriped} />;

    const [hiddenGroupPanel, setHiddenGroupPanel] = useState(false);
    const [hiddenFilter, setHiddenFilter] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isSelectDropdown, setIsSelectDropdown] = useState(false);
    const [hiddenFreeze, setHiddenFreeze] = useState(false);

    // table search
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

        if (searchValue !== '') {
            const filteredData = tableItems.filter((item) => {
                // console.log(Object.values(item).join(''));
                return Object.values(item)
                    .join('')
                    .toString()
                    .toLowerCase()
                    .includes(searchValue.toString().toLocaleLowerCase());
                // return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            });
            setFilteredResults(filteredData);
            setRows(filteredData);
        } else {
            setFilteredResults(rows);
            setRows(tableItems);
        }
    };

    const selectionDatas = () => {
        return setSelectionItems(selection);
    };

    const hiddenColumns = (e) => {
        if (hiddenColumnNames.length === 0) {
            showorHideColumnsItems.map((data) => (data.name === e ? (data.isShow = !data.isShow) : null));
            setHiddenColumnNames([e]);
        } else {
            showorHideColumnsItems.map((data) => (data.name === e ? (data.isShow = !data.isShow) : null));
            hiddenColumnNames.includes(e)
                ? setHiddenColumnNames((prev) => prev.filter((data) => data !== e))
                : setHiddenColumnNames((prev) => [...prev, e]);
        }
    };

    const hiddenGroup = (settingsName) => {
        if (settingsName === 'main group by') {
            setHiddenGroupPanel(!hiddenGroupPanel);
        } else {
            setIsTableOptionsGroupBy(!isTableOptionsGroupBy);
        }
        setIsSearchOpen(false);
        setHiddenFreeze(false);
        setTableIsSettings(false);
        setIsColumnsFreeze(false);
        setIsSelectDropdown(false);
        // if (hiddenGroupPanel === false) {
        //     document.querySelector('.MuiToolbar-gutters').style.minHeight = '50px';
        // }
        // else {
        //     document.querySelector('.MuiToolbar-gutters').style.minHeight = '0px';
        // }
    };

    // is open filter
    const isOpenFilter = () => {
        if (isFilters === true) setisFilter((prev) => !prev);
    };

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [tableIsSettings, setTableIsSettings] = useState(false);

    useEffect(() => {
        setTableItems(tableData);
        setRows(tableData);
    }, [tableData]);

    const [isTableOptionsGroupBy, setIsTableOptionsGroupBy] = useState(false);

    const handleCloseActions = (type) => {
        switch (type) {
            case 'search':
                return (
                    setIsSearchOpen(!isSearchOpen),
                    setHiddenFreeze(false),
                    setTableIsSettings(false),
                    setHiddenGroupPanel(false),
                    (document.querySelector('.MuiToolbar-gutters').style.minHeight = '0px'),
                    setIsColumnsFreeze(false),
                    setIsSelectDropdown(false)
                );
            case 'freeze':
                return (
                    hiddenFreeze === false ? setHiddenFreeze(true) : hiddenFreeze === true ? null : null,
                    setIsSearchOpen(false),
                    setTableIsSettings(false),
                    setHiddenGroupPanel(false),
                    (document.querySelector('.MuiToolbar-gutters').style.minHeight = '0px'),
                    setIsColumnsFreeze(false),
                    setIsSelectDropdown(false)
                );
            case 'settings':
                return (
                    setTableIsSettings(!tableIsSettings),
                    setHiddenFreeze(false),
                    setIsSearchOpen(false),
                    setHiddenGroupPanel(false),
                    (document.querySelector('.MuiToolbar-gutters').style.minHeight = '0px'),
                    setIsColumnsFreeze(false),
                    setIsSelectDropdown(false)
                );

            default:
                break;
        }
    };
    const dispatch = useDispatch();

    const [isFilter, setisFilter] = useState(isFilters);
    useEffect(() => {
        dispatch(setFilterShow(isFilter));
    }, [dispatch, isFilter]);

    //Confort Display
    const [isConfortDisplay, setIsConfortDisplay] = useState(false);

    const tableStripedSettings = () => {
        setTableStriped(!tableStriped);
        if (tableStriped === false) {
            var element = document.querySelector('.MuiTableBody-root');
            element.classList.add('table-striped');
        } else {
            document.querySelector('.MuiTableBody-root').classList.remove('table-striped');
        }
    };

    useEffect(() => {
        dispatch(isTotalMainTable(isTotal));
    }, [dispatch, isTotal]);

    //Freeze Columns
    const settingsColumnsFreeze = [
        { id: '1', isFreeze: false, columnName: 'position', content: 'Position' },
        { id: '2', isFreeze: false, columnName: 'activity', content: 'Activity' },
        { id: '3', isFreeze: false, columnName: 'businessUnıte', content: 'Business Unite' },
        { id: '4', isFreeze: false, columnName: 'productarea', content: 'Product Zone or Area' },
        { id: '5', isFreeze: false, columnName: 'client', content: 'Client' },
        { id: '6', isFreeze: false, columnName: 'budget', content: 'Budget' },
        { id: '7', isFreeze: false, columnName: 'kol', content: 'KOL' },
        { id: '8', isFreeze: false, columnName: 'companyParticipant', content: 'Company Participan' },
        { id: '9', isFreeze: false, columnName: 'guest', content: 'Guest' },
    ];

    const settingsColumnsFreezeDragDrop = {
        100: {
            name: 'Requested',
            items: settingsColumnsFreeze,
        },
        101: {
            name: 'To do',
            items: [],
        },
    };

    const freezeItems = {
        main: groupByItems,
        // { id: '1', isFreeze: false, columnName: 'position', content: 'Position' },
        // { id: '2', isFreeze: false, columnName: 'activity', content: 'Activity' },
        // { id: '3', isFreeze: false, columnName: 'businessUnıte', content: 'Business Unite' },
        // { id: '4', isFreeze: false, columnName: 'productarea', content: 'Product Zone or Area' },
        // { id: '5', isFreeze: false, columnName: 'client', content: 'Client' },
        // { id: '6', isFreeze: false, columnName: 'budget', content: 'Budget' },
        // { id: '7', isFreeze: false, columnName: 'kol', content: 'KOL' },
        // { id: '8', isFreeze: false, columnName: 'companyParticipant', content: 'Company Participan' },
        // { id: '9', isFreeze: false, columnName: 'guest', content: 'Guest' },
        sub: [],
    };

    const [first, setfirst] = useState(freezeItems);

    const onDragEnd2 = (result, columns, destColumns) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (source.droppableId === '1') {
                const sourceItems = [...columns];
                const destItems = [...destColumns];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);

                setfirst({
                    ...first,
                    sub: destItems,
                    main: sourceItems,
                });
                setGrouping(
                    destItems.map((item) => {
                        return { columnName: item.columnName };
                    })
                );
            } else if (source.droppableId === '2') {
                const sourceItems = [...destColumns];
                const destItems = [...columns];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);

                setfirst({
                    ...first,
                    sub: sourceItems,
                    main: destItems,
                });
                setGrouping(
                    sourceItems?.map((item) => {
                        return { columnName: item.columnName };
                    })
                );
            }
        } else {
            if (source.droppableId === '1' && destination.droppableId === '1') {
                const copiedItems = [...columns];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);

                setfirst({
                    ...first,
                    main: copiedItems,
                });
            } else if (source.droppableId === '2' && destination.droppableId === '2') {
                const copiedDestColumns = [...destColumns];
                const [removed] = copiedDestColumns.splice(source.index, 1);
                copiedDestColumns.splice(destination.index, 0, removed);

                setfirst({
                    ...first,
                    sub: copiedDestColumns,
                });
            }
        }
    };

    const deleteDragGroupItem = (data, mainGroupItem) => {
        setfirst({
            ...first,
            sub: first.sub.filter((item) => item.columnName !== data.columnName),
            main: [...first.main, data],
        });
    };

    const option = [
        {
            icon: <Icon path={mdiArrowSplitVertical} size={0.7} />,
            title: 'Freeze',
            click: () => setIsColumnsFreeze(true),
        },
        {
            icon: <Icon path={mdiPlus} size={0.7} />,
            title: 'Group By',
            click: hiddenGroup,
        },
        {
            icon: <Icon path={mdiEyeOutline} size={0.7} />,
            title: 'Show / Hide Columns',
            click: () => setIsSelectDropdown((prev) => !prev),
        },
    ];

    const settingsMenu = (
        <Menu>
            {option?.map((data, i) => (
                <Menu.Item style={{ paddingTop: 0, paddingBottom: 0, marginBottom: '5px' }} onClick={data.click}>
                    <span>{data.icon}</span>

                    <span>{t(data.title)}</span>
                </Menu.Item>
            ))}
        </Menu>
    );

    useEffect(() => {
        setGrouping(
            first.sub?.map((item) => {
                return { columnName: item.columnName };
            })
        );
    }, [first]);

    const freezeRef = useRef();
    // Outside click to close settings
    // useEffect(() => {
    //     const closeSearch = (e) => {
    //         if (!btnRef.current.contains(e.target)) {
    //             setIsSearchOpen(false);
    //         }
    //     };

    //     document.body.addEventListener('mousedown', closeSearch);

    //     return () => {
    //         document.body.removeEventListener('mousedown', closeSearch);
    //     };
    // }, []);

    useEffect(() => {
        if (closeFilter === true) {
            setCloseFilter(false);
            setisFilter(false);
        }
    }, [closeFilter]);

    useEffect(() => {
        if (isSelection === true) {
            selectionDatas();
        }
    }, [isSelection, selection]);

    useEffect(() => {
      setSelection(selectionItems)
    }, [selectionItems])
    

    return (
        <div id="old-table" className="card">
            <div className="card-body">
                {isOptionSearch === true && (
                    <div className="table-topbar">
                        <div className="table-topbar-right">
                            <div
                                // ref={btnRef}
                                className={'search'}
                                style={{ position: 'relative' }}>
                                <input placeholder={t('search...')} onChange={(e) => searchItems(e.target.value)} />
                                <Icon path={mdiMagnify} color={'#6C757D'} title="Search" />
                            </div>
                        </div>
                    </div>
                )}
                {isOptions && (
                    <div className="table-topbar">
                        <div className="table-topbar-right" style={{ position: 'relative' }}>
                            <div className="item" onClick={isOpenFilter}>
                                <Icon path={mdiFilterMenuOutline} title="Filter" />
                                <label> {t('filter')} </label>
                            </div>

                            <button
                                id="group-button"
                                style={{ background: 'transparent', border: 'none', color: '#6c757d' }}
                                disabled={disableFreeze}
                                className="item"
                                onClick={() => hiddenGroup('main group by')}>
                                <Icon path={mdiLayersTripleOutline} title="Group By" />
                                <label> {t('group by')} </label>
                            </button>

                            <div className="item" onClick={() => handleCloseActions('freeze')} sty>
                                <Icon path={mdiArrowSplitVertical} title="Freeze" />
                                <label> {t('freeze')} </label>
                            </div>

                            <div className="item">
                                <Icon path={mdiEyeOutline} />
                                <label> {t('show')} </label>
                            </div>

                            <div
                                // ref={btnRef}
                                className={'search'}
                                style={{ position: 'relative' }}>
                                <input placeholder={t('search...')} onChange={(e) => searchItems(e.target.value)} />
                                <Icon path={mdiMagnify} color={'#6C757D'} title="Search" />
                            </div>
                        </div>
                        <div className="table-topbar-right">
                            <div className="item">
                                <Icon
                                    path={mdiDotsHorizontal}
                                    color={'#6C757D'}
                                    onClick={() => setTableIsSettings((prev) => !prev)}
                                />
                                {/* <i className="fa-solid fa-sliders"></i> */}
                                {/* <Dropdown overlayStyle={{ minWidth: '155px' }} trigger={'click'} overlay={settingsMenu} placement="bottom">
                    <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
                </Dropdown> */}
                            </div>
                            {isAddButton && (
                                <>
                                    <div className="item new-button" onClick={() => addButtonFunction('lg')}>
                                        <div className="items">
                                            <label>{t('new')}</label>
                                            <span id="new-button-border"></span>
                                            <Icon path={mdiPlus} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
                {isFilter && (
                    <>
                        {/* <hr style={{ margin: '0 0 1rem 0' }} /> */}
                        {filters}
                    </>
                )}
                {tableIsSettings && (
                    //     <Dropdown overlayStyle={{ minWidth: '155px' }} trigger={'click'} overlay={settingsMenu} placement="bottom">
                    //     <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
                    // </Dropdown>
                    <div className="table-settings">
                        <div className="header">
                            <div>Table Options</div>
                            <div className="close" onClick={() => setTableIsSettings(false)}>
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>

                        <div className="item">
                            <input type="text" placeholder="Table Name" />
                        </div>

                        <div className="item" onClick={() => setisFilter((prev) => !prev)}>
                            <div>
                                <i className="fa-solid fa-filter"></i>Filter
                            </div>
                        </div>
                        <div className="item" onClick={() => setIsColumnsFreeze(true)}>
                            <div>
                                <i className="fa-solid fa-arrows-left-right-to-line"></i>Freeze
                            </div>
                        </div>
                        <div className="item" onClick={hiddenGroup}>
                            <div>
                                <i className="fa-regular fa-square-plus"></i>Group by
                            </div>
                        </div>
                        <div className="item" onClick={() => setHiddenFilter(!hiddenFilter)}>
                            <div>
                                <i className="fa-brands fa-searchengin"></i>Search / sort in columns
                            </div>
                        </div>
                        <hr />

                        <div className="item" onClick={() => setIsSelectDropdown(!isSelectDropdown)}>
                            <div>
                                <i className="fa-solid fa-eye"></i>Show / hide columns
                            </div>
                        </div>
                        <div className="item" onClick={() => setIsConfortDisplay(!isConfortDisplay)}>
                            <div>
                                <i className="fa-solid fa-arrow-down-up-across-line"></i>Comfort display
                            </div>
                        </div>
                        <hr />

                        <div className="item">
                            <div>
                                <i className="fa-solid fa-arrows-to-circle"></i>Focus
                            </div>

                            <div>
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        </div>
                        <div className="item">
                            <div>
                                <i class="fa-brands fa-gitter"></i>
                                Table Striped
                            </div>
                            <div onClick={() => tableStripedSettings()}>
                                {tableStriped === false ? (
                                    <i class="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                            </div>
                        </div>
                        <div className="item">
                            <div>
                                <i class="fa-solid fa-plus"></i>Total
                            </div>

                            <div onClick={() => setIsTotal(!isTotal)}>
                                {isTotal === false ? (
                                    <i class="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                            </div>
                        </div>

                        <hr />
                        <div className="item" onClick={startExport}>
                            <div>
                                <i class="fa-solid fa-file-arrow-up"></i>Export
                            </div>
                        </div>
                        <div className="item">
                            <div>
                                <i class="fa-solid fa-file-arrow-down"></i>Import
                            </div>
                        </div>

                        <hr />

                        <div className="item">
                            <div style={{ color: '#BD6710' }}>
                                <i class="fa-solid fa-box-archive"></i>Archive
                            </div>
                        </div>
                    </div>
                )}

                {isSelectDropdown && (
                    <div className="table-settings">
                        <div className="header">
                            <div>Show / hide columns</div>
                            <div onClick={() => setIsSelectDropdown(false)}>
                                {' '}
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>
                        {showorHideColumnsItems.map((data) => (
                            <div className="show-hide-item">
                                <div className="title">{data.title}</div>
                                <div className="icon" onClick={() => hiddenColumns(data.name)}>
                                    {data.isShow === true ? (
                                        <i className="fa-solid fa-eye"></i>
                                    ) : (
                                        <i class="fa-solid fa-eye-slash"></i>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isColumnsFreeze && (
                    <div className="table-settings">
                        <div className="header">
                            <div className="back-close" onClick={() => setIsColumnsFreeze(false)}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                            <div>Table Options</div>
                            <div className="back-close" onClick={() => setIsColumnsFreeze(false)}>
                                {' '}
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>

                        <div className="item">
                            <input className="text-input mb-1" type="text" placeholder="search for column" />
                        </div>

                        <div className="settings-table-name">Freeze</div>
                        {showorHideColumnsItems.map((data, id) => (
                            <div key={id} className="show-hide-item item">
                                {/* <div><i className="fa-solid fa-grip-dots-vertical"></i></div> */}
                                <div className="title">{data.title}</div>
                                <div className="icon" onClick={() => freezeColumns(data.name)}>
                                    {data.isFreeze === true ? (
                                        <i className="fa-solid fa-eye"></i>
                                    ) : (
                                        <i class="fa-solid fa-eye-slash"></i>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isTableOptionsGroupBy && (
                    <div className="table-settings">
                        <div className="header">
                            <div className="back-close" onClick={() => setIsTableOptionsGroupBy(false)}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                            <div>Table Options</div>
                            <div className="text-end" onClick={() => setIsTableOptionsGroupBy(false)}>
                                {' '}
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>

                        <div className="item">
                            <input className="text-input mb-1" type="text" placeholder="search for column" />
                        </div>

                        <div className="settings-table-name header">Group by</div>

                        <DragDropContext onDragEnd={(result) => onDragEnd2(result, first.main, first.sub)}>
                            <Droppable droppableId="1">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {first.main.map((data, index) => (
                                            <Draggable key={data.id} draggableId={data.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="show-hide-item"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <div>
                                                            <i class="fa-solid fa-grip-vertical"></i>
                                                        </div>
                                                        <div className="title">{data.content}</div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <hr />
                            <Droppable droppableId="2">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{ border: '1px solid white', height: 'auto' }}>
                                        {first.sub.map((data, index) => (
                                            <Draggable key={data.id} draggableId={data.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="show-hide-item2"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <div>
                                                            <i
                                                                style={{ color: '#D8DADD' }}
                                                                class="fa-solid fa-grip-vertical"></i>
                                                        </div>
                                                        <div className="title">{data.content}</div>
                                                        <div className="text-end" style={{ width: '100%' }}>
                                                            <i
                                                                style={{ cursor: 'pointer', width: 'minContent' }}
                                                                onClick={() => deleteDragGroupItem(data, first.main)}
                                                                className="fa-solid fa-xmark"></i>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                )}

                {isConfortDisplay && (
                    <div className="table-settings">
                        <div className="header">
                            <div className="back-close" onClick={() => setIsConfortDisplay(false)}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </div>
                            <div>Table Options</div>
                            <div className=" text-right back-close" onClick={() => setIsConfortDisplay(false)}>
                                {' '}
                                <i className="fa-solid fa-x"></i>
                            </div>
                        </div>

                        <div className="item">
                            <input className="text-input mb-1" type="text" placeholder="search for column" />
                        </div>

                        <div className="settings-table-name mb-2">Density</div>
                        <div>
                            <Form.Check type="radio" name="mete" label="Default" />
                            <Form.Check type="radio" name="mete" label="Small" />
                            <Form.Check type="radio" name="mete" label="XSmall" />
                            <Form.Check type="radio" name="mete" label="Large" />
                        </div>
                    </div>
                )}

                <Paper>
                    <Grid rows={rows} columns={columns} getRowId={getRowId}>
                        <VirtualTable />
                        <SearchState value={searchValue} onValueChange={setSearchState} />
                        <DragDropProvider />
                        {/* <DataTypeProvider
                        for={dateColumns}
                        availableFilterOperations={dateFilterOperations}
                    /> */}
                        <DataTypeProvider
                            for={currencyColumns}
                            availableFilterOperations={currencyFilterOperations}
                            editorComponent={CurrencyEditor}
                        />
                        <FilteringState defaultFilters={[]} />
                        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
                        <SortingState sorting={sorting} onSortingChange={setSorting} />
                        <PagingState defaultCurrentPage={0} defaultPageSize={50} />
                        <SelectionState selection={selection} onSelectionChange={setSelection} />
                        <IntegratedFiltering />
                        <IntegratedSorting />
                        <IntegratedPaging />
                        <IntegratedSelection />

                        <DragDropProvider />
                        <GroupingState grouping={grouping} onGroupingChange={setGrouping} />
                        <IntegratedGrouping />

                        <Table columnExtensions={tableColumnExtensions} messages={tableMessages} />
                        <TableColumnReordering order={columnOrders} onOrderChange={setColumnOrders} />
                        {hiddenFilter && (
                            <TableFilterRow
                                showFilterSelector
                                iconComponent={FilterIcon}
                                messages={filterRowMessages}
                            />
                        )}
                        <TableColumnResizing
                            columnWidths={columnWidths}
                            onColumnWidthsChange={setColumnWidths}
                            minColumnWidth={100}
                            maxColumnWidth={500}
                            resizingMode="nextColumn"
                        />

                        <TableHeaderRow showSortingControls />

                        {isTotal && <CurrencyTypeProvider for={currencyColumns} />}
                        {isTotal && <SummaryState totalItems={totalSummaryItems} groupItems={groupSummaryItems} />}
                        {isTotal && <IntegratedGrouping />}
                        {isTotal && <IntegratedSummary />}
                        {isTotal && <TableSummaryRow />}

                        <TableColumnVisibility
                            hiddenColumnNames={hiddenColumnNames}
                            onHiddenColumnNamesChange={setHiddenColumnNames}
                        />

                        <TableSelection showSelectAll />
                        <TableGroupRow />
                        <TableFixedColumns leftColumns={leftColumns} rightColumns={rightColumns} />
                        <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
                        <Toolbar />

                        {/* Drag a column header here to group by that column */}
                        {hiddenGroupPanel === true ? (
                            <GroupingPanel showGroupingControls messages={groupingPanelMessages} />
                        ) : null}
                        {hiddenFreeze && (
                            <FreezeDragDrop
                                freezeRef={freezeRef}
                                leftColumns={leftColumns}
                                setLeftColumns={setLeftColumns}
                                columnsFreeze={columnsFreeze}
                                setColumnsFreeze={setColumnsFreeze}
                                setHiddenFreeze={setHiddenFreeze}
                                freeze={hiddenFreeze}
                            />
                        )}
                        {/* <VirtualTable
     estimatedRowHeight={49}
     height={530}
      /> */}
                    </Grid>
                    <GridExporter ref={exporterRef} rows={exportTableData} columns={exportColumns} onSave={onSave} />
                </Paper>
            </div>
        </div>
    );
};
export default MainTable;
