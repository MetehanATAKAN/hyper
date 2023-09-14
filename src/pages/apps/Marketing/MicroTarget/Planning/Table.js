import React, { useMemo, useState } from 'react';
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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SaveIcon from '@mui/icons-material/Save';
// import { data } from './mockData';
// import '../../../../../assets/scss/custom/components/tableLayout.scss';
import Dropdowns from '../../../../../components/Dropdowns';
import { utils, writeFileXLSX } from 'xlsx';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Button as ButtonB } from 'react-bootstrap';
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
const Table = ({
    isLoading = false,
    isCheckBox = true,
    isShowNewBtn = true,
    dropdownOptions,
    handleDropDownItemClick,
    columnVisibility = {}, // { firstName: false }
    columnPinningLeft = [], // left: ['firstName']
    columnPinningRight = [], // right: ['lastName']
    handleApprovalBtn, // (values) => { console.log(values) }
    handleApprovedBtn, // (values) => { console.log(values) }
    handleDeleteBtn, // (values) => { console.log(values) }
    handleNewButton,
    handlApplyBtn,
    handlClearBtn,
    isRowActions = false,
    isHasStatus = false,
    filter,
    isFilter = true,
    data = [],
    filterShow = true,
    setFilterShow,
    isSaveIcon = false,
    saveBtn,
    prePlanButton,
    prePlanFunc,
}) => {
    const { t } = useTranslation();

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },
        ],
        []
        //end
    );

    const [data1, setData1] = useState(() => data.slice(0, 3));
    const [data2, setData2] = useState(() => data.slice(3, 5));

    const [draggingRow, setDraggingRow] = useState(null);
    const [hoveredTable, setHoveredTable] = useState(null);

    const commonTableProps = {
        columns,
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

    const handleExportData = (datas) => {
        const headings = [columns.map((x) => x.header)];
        const allData = datas.map((row) => row.original);
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, allData, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'DATA');
        writeFileXLSX(wb, 'data.xlsx');
    };
    const handleExportRows = (rows) => {
        const headings = [columns.map((x) => x.header)];
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

    return (
        <div id="new-table-layout">
            <MaterialReactTable
                {...commonTableProps}
                data={data}
                autoResetPageIndex={false}
                enableRowOrdering
                enableSorting={false}
                defaultColumn={{
                    size: 100,
                }}
                getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
                muiTableBodyRowDragHandleProps={({ table }) => ({
                    onDragEnd: () => {
                        const { draggingRow, hoveredRow } = table.getState();
                        console.log(hoveredTable);
                        console.log(draggingRow, hoveredRow);
                        if (hoveredRow && draggingRow) {
                            data1.splice(hoveredRow.index, 0, data1.splice(draggingRow.index, 1)[0]);
                            console.log(data1);
                            setData1([...data1]);
                        }

                        if (hoveredTable === 'table-2') {
                            setData2((data2) => [...data2, draggingRow.original]);
                            setData1((data1) => data1.filter((d) => d !== draggingRow.original));
                        }
                        setHoveredTable(null);
                    },
                })}
                muiTablePaperProps={{
                    onDragEnter: () => setHoveredTable('table-1'),
                    sx: {
                        outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
                    },
                }}
                muiToolbarAlertBannerChipProps={{
                    sx: {
                        backgroundColor: '#00a0df',
                        color: '#fff',
                    },
                }}
                muiTableContainerProps={{ sx: { maxHeight: 'calc(100vh - 325px)' } }}
                enableDensityToggle={true}
                enableRowSelection={isCheckBox}
                enableExpanding={true}
                paginateExpandedRows={false}
                enableColumnResizing
                enableGrouping
                enableStickyHeader
                enableStickyFooter
                enableColumnFilterModes
                enableColumnOrdering
                enablePinning
                filterFromLeafRows
                positionActionsColumn="last"
                enableRowActions={isRowActions}
                state={{
                    isLoading,
                }}
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
                    columnVisibility: { ...columnVisibility },
                    columnPinning: { left: ['mrt-row-select', ...columnPinningLeft], right: [...columnPinningRight] },
                    pagination: { pageIndex: 0, pageSize: 10 },
                }}
                defaultColumn={{
                    maxSize: 400,
                    minSize: 50,
                    size: 150,
                    muiTableHeadCellProps: {
                        align: 'left',
                        sx: {
                            boxShadow: 'none',
                            color: '#6C757D',
                            paddingBottom: '4px',
                        },
                    },
                    muiTableBodyCellProps: {
                        align: 'left',
                        sx: {
                            boxShadow: 'none',
                        },
                    },
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
                renderRowActions={({ row }) => (
                    <Box>
                        <Dropdowns
                            option={dropdownOptions ?? []}
                            onClick={(e) => handleDropDownItemClick(e, row.original)}
                        />
                    </Box>
                )}
                renderTopToolbar={({ table }) => {
                    const handleDeactivate = () => {
                        let ids = [];
                        table.getSelectedRowModel().flatRows.map((row) => {
                            // handleApprovalBtn && handleApprovalBtn(row.getValue('id'));
                            handleDeleteBtn && ids.push(row.getValue('id'));
                        });
                        handleDeleteBtn && handleDeleteBtn(ids);
                    };

                    const handleActivate = () => {
                        let ids = [];
                        table.getSelectedRowModel().flatRows.map((row) => {
                            // handleApprovedBtn && handleApprovedBtn(row.getValue('id'));
                            handleDeleteBtn && ids.push(row.getValue('id'));
                        });
                        handleDeleteBtn && handleDeleteBtn(ids);
                    };

                    const handleContact = () => {
                        let ids = [];
                        table.getSelectedRowModel().flatRows.map((row) => {
                            // handleDeleteBtn && handleDeleteBtn(row.getValue('id'));
                            handleDeleteBtn && ids.push(row.getValue('id'));
                        });
                        handleDeleteBtn && handleDeleteBtn(ids);
                    };
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
                                        {isCheckBox && (
                                            <>
                                                {isHasStatus && (
                                                    <>
                                                        <ButtonB
                                                            disabled={
                                                                table.getSelectedRowModel().flatRows.length === 0
                                                                    ? true
                                                                    : false
                                                            }
                                                            onClick={handleDeactivate}
                                                            className="table-bulk-action-button-approval"
                                                            size="sm">
                                                            Send to Approval
                                                        </ButtonB>
                                                        <ButtonB
                                                            disabled={
                                                                table.getSelectedRowModel().flatRows.length === 0
                                                                    ? true
                                                                    : false
                                                            }
                                                            onClick={handleActivate}
                                                            className="table-bulk-action-button-approved"
                                                            size="sm">
                                                            Approved
                                                        </ButtonB>
                                                    </>
                                                )}

                                                <ButtonB
                                                    disabled={
                                                        table.getSelectedRowModel().flatRows.length === 0 ? true : false
                                                    }
                                                    className="table-bulk-action-button-delete"
                                                    size="sm"
                                                    onClick={handleContact}>
                                                    {t('Delete')}
                                                </ButtonB>
                                            </>
                                        )}
                                    </div>
                                    <Box>
                                        <MRT_GlobalFilterTextField table={table} />
                                        <MRT_ToggleGlobalFilterButton table={table} />
                                        {isFilter && (
                                            <Tooltip title="Table Filters" arrow>
                                                <IconButton
                                                    className={filterShow && 'table-filter-btn-active'}
                                                    onClick={openFilterBox}>
                                                    {!filterShow ? <FilterAltIcon /> : <FilterAltOffIcon />}
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {isSaveIcon && (
                                            <Tooltip title={t('Save')} arrow>
                                                <IconButton onClick={saveBtn}>
                                                    {/* sx={{ color: '#00a0df' }} */}
                                                    <SaveIcon />
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
                                        {isShowNewBtn && (
                                            <Button
                                                className="table-new-button"
                                                variant="contained"
                                                onClick={handleNewButton}
                                                endIcon={<AddIcon sx={{ width: 16, height: 16, marginLeft: 0 }} />}>
                                                {t('New')}
                                            </Button>
                                        )}
                                        {prePlanButton && (
                                            <Button
                                                className="table-new-button"
                                                variant="contained"
                                                onClick={prePlanFunc}>
                                                {t('Pre Plan')}
                                            </Button>
                                        )}
                                    </Box>
                                </div>
                                {isFilter && (
                                    <div
                                        style={{
                                            gridColumn: 'span 2 / auto',
                                        }}>
                                        <div>
                                            <Collapse in={filterShow}>
                                                <div className="table-filter-area">{filter}</div>
                                                <hr style={{ margin: 0, padding: 0, color: '#CED4DA', opacity: 1 }} />
                                                <div className="table-filter-buttons">
                                                    <ButtonB
                                                        onClick={handlApplyBtn}
                                                        className="filter-buttons-apply"
                                                        size="sm">
                                                        {t('Apply')}
                                                    </ButtonB>
                                                    <ButtonB
                                                        onClick={handlClearBtn}
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
                            </div>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default Table;
