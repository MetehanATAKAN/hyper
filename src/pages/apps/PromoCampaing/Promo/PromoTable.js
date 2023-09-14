import React, { useState } from 'react';
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
import { Box, IconButton, Menu, MenuItem, Divider, alpha, Collapse, Tooltip, Switch } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Button as CustomButton } from '../../../../components/FormElements/Button';
// import '../../../../assets/scss/custom/components/tableLayout.scss';
import { utils, writeFileXLSX } from 'xlsx';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-bootstrap';
import Dropdowns from '../../../../components/Dropdowns';
import { MRT_Localization_TR } from 'material-react-table/locales/tr';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
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
const PromoTable = ({
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
    handleCopyBtn,
    handleSaveBtn,
    handleCreateCycleMeeting,
    checkedSwitchCopy,
    setCheckedSwitchCopy,
    isRowActions = false,
    isHasStatus = false,
    filter,
    isFilter = true,
    data = [],
    columns = [],
    filterShow = true,
    setFilterShow,
    showAlert,
}) => {
    const { t } = useTranslation();
    const language = localStorage.getItem('i18nextLng');
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
    const handleChangeSwitch = (event) => {
        setCheckedSwitchCopy(event.target.checked);
    };
    return (
        <div id="new-table-layout">
            <MaterialReactTable
                columns={columns ?? []}
                data={data ?? []}
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
                localization={
                    language === 'en'
                        ? MRT_Localization_EN
                        : language === 'tr'
                        ? MRT_Localization_TR
                        : MRT_Localization_RU
                }
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
                muiTableBodyProps={{
                    sx: (theme) => ({
                        '& tr:nth-of-type(odd)': {
                            backgroundColor: isStripe && '#eef2f7',
                        },
                    }),
                }}
                muiTableProps={{
                    sx: {
                        tableLayout: 'fixed',
                    },
                    size: 'small',
                }}
                initialState={{
                    density: 'compact',
                    columnVisibility: { ...columnVisibility },
                    columnPinning: { left: ['mrt-row-select', ...columnPinningLeft], right: [...columnPinningRight] },
                    pagination: { pageIndex: 0, pageSize: 100 },
                }}
                defaultColumn={{
                    maxSize: 450,
                    minSize: 50,
                    size: 150,
                    muiTableHeadCellProps: {
                        align: 'left',
                        sx: {
                            boxShadow: 'none',
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
                        size: 80,
                        maxSize: 80,
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
                        table.getSelectedRowModel().flatRows.map((row) => {
                            handleApprovalBtn && handleApprovalBtn(row.getValue('id'));
                        });
                    };

                    const handleActivate = () => {
                        table.getSelectedRowModel().flatRows.map((row) => {
                            handleApprovedBtn && handleApprovedBtn(row.getValue('id'));
                        });
                    };

                    const handleContact = () => {
                        table.getSelectedRowModel().flatRows.map((row) => {
                            handleDeleteBtn && handleDeleteBtn(row.getValue('id'));
                        });
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
                                                        <CustomButton
                                                            onClick={handleDeactivate}
                                                            disabled={
                                                                table.getSelectedRowModel().flatRows.length === 0
                                                                    ? true
                                                                    : false
                                                            }
                                                            className="table-bulk-action-button-approval">
                                                            {t('Send to Approval')}
                                                        </CustomButton>
                                                        <CustomButton
                                                            onClick={handleActivate}
                                                            disabled={
                                                                table.getSelectedRowModel().flatRows.length === 0
                                                                    ? true
                                                                    : false
                                                            }
                                                            className="table-bulk-action-button-approved">
                                                            {t('Approved')}
                                                        </CustomButton>
                                                    </>
                                                )}

                                                <CustomButton
                                                    disabled={
                                                        table.getSelectedRowModel().flatRows.length === 0 ? true : false
                                                    }
                                                    className="table-bulk-action-button-delete"
                                                    onClick={handleContact}>
                                                    {t('Delete')}
                                                </CustomButton>
                                            </>
                                        )}
                                    </div>
                                    <Box>
                                        <MRT_GlobalFilterTextField table={table} />
                                        <MRT_ToggleGlobalFilterButton table={table} />
                                        {isFilter && (
                                            <Tooltip title={t('Table Filters')} arrow>
                                                <IconButton
                                                    className={filterShow && 'table-filter-btn-active'}
                                                    onClick={openFilterBox}>
                                                    {!filterShow ? <FilterAltIcon /> : <FilterAltOffIcon />}
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title={t('Copy Data')} arrow>
                                            <Switch
                                                checked={checkedSwitchCopy}
                                                onChange={handleChangeSwitch}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </Tooltip>
                                        <Tooltip title={t('Duplicate')} arrow>
                                            <IconButton onClick={handleCopyBtn}>
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={t('Save')} arrow>
                                            <IconButton onClick={handleSaveBtn}>
                                                <SaveIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={t('Cycle Meeting')} arrow>
                                            <CustomButton
                                                type="text"
                                                style={{
                                                    width: '35px',
                                                    display: 'inline-flex',
                                                    border: 'none',
                                                    borderRadius: '25px',
                                                }}
                                                onClick={handleCreateCycleMeeting}>
                                                CM
                                            </CustomButton>
                                        </Tooltip>
                                        <>
                                            <Tooltip title={t('Table Actions')} arrow>
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
                                                    {t('All Data')}
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
                                                    {t('Stripe')}
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
                                                    {t('Print')}
                                                </MenuItem>
                                            </StyledMenu>
                                        </>
                                        <MRT_ToggleFiltersButton table={table} />
                                        <MRT_ShowHideColumnsButton table={table} />
                                        <MRT_ToggleDensePaddingButton table={table} />
                                        <MRT_FullScreenToggleButton table={table} />
                                        {isShowNewBtn && (
                                            <CustomButton
                                                className="table-new-button"
                                                onClick={handleNewButton}
                                                size="small"
                                                icon={<AddIcon sx={{ width: 16, height: 16 }} />}
                                            />
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
                                                    <CustomButton
                                                        onClick={handlApplyBtn}
                                                        className="filter-buttons-apply">
                                                        {t('Apply')}
                                                    </CustomButton>
                                                    <CustomButton
                                                        onClick={handlClearBtn}
                                                        className="filter-buttons-clear">
                                                        {t('Clear')}
                                                    </CustomButton>
                                                    <CustomButton
                                                        onClick={openFilterBox}
                                                        className="filter-buttons-close">
                                                        {t('Close')}
                                                    </CustomButton>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </div>
                                )}
                                {showAlert && (
                                    <Alert style={{ margin: 0 }} variant="primary">
                                        {t("If you don't save your change, it will be lost.")}
                                    </Alert>
                                )}
                            </div>
                        </>
                    );
                }}
            />
        </div>
    );
};

export default PromoTable;
