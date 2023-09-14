import React, { useMemo, useState } from 'react';
import MaterialReactTable, { MRT_FullScreenToggleButton } from 'material-react-table';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    alpha,
    Collapse,
    Tooltip,
    ThemeProvider,
    createTheme,
    Button,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import '../../assets/scss/custom/components/tableLayout.scss';
import { utils, writeFileXLSX } from 'xlsx';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
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
const TableGant = ({
    isLoading = false,
    columnVisibility = {}, // { firstName: false }
    filter,
    data = [],
    columns = [],
    isAccordion = true,
    filterShow = true,
    setFilterShow,
    handleNewButton,
    columnPinning,
    handlApplyBtn,
    handlClearBtn,
}) => {
    const { t } = useTranslation();
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [isStripe, setIsStripe] = useState(false);

    const openFilterBox = () => {
        setFilterShow(!filterShow);
    };
    const theme = createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        // border: '1px solid black',
                    },
                },
            },
        },
    });
    return (
        <div id="new-gant-table-layout">
            <ThemeProvider theme={theme}>
                <MaterialReactTable
                    columns={columns ?? []}
                    data={data ?? []}
                    muiTableContainerProps={{ sx: { maxHeight: 'calc(100vh - 325px)' } }}
                    paginateExpandedRows={false}
                    enableExpanding={isAccordion}
                    enableSorting={false}
                    enableStickyHeader
                    enableStickyFooter
                    enableColumnActions={false}
                    state={{
                        isLoading,
                    }}
                    muiTableHeadCellProps={{
                        sx: {
                            color: '#6C757D',
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
                    muiTableBodyCellProps={{
                        align: 'left',
                        sx: {
                            boxShadow: 'none',
                            padding: 0,
                        },
                    }}
                    muiTableProps={{
                        sx: {
                            tableLayout: 'fixed',
                            border: 'none',
                        },
                        size: 'small',
                    }}
                    initialState={{
                        density: 'compact',
                        columnVisibility: { ...columnVisibility },
                        pagination: { pageIndex: 0, pageSize: 10 },
                        columnPinning: { ...columnPinning },
                    }}
                    defaultColumn={{
                        minSize: 75,
                        size: 100,
                        muiTableHeadCellProps: {
                            align: 'center',
                            sx: {
                                boxShadow: 'none',
                                color: '#6C757D',
                                // paddingBottom: '4px',
                            },
                        },
                    }}
                    displayColumnDefOptions={{
                        'mrt-row-expand': {
                            minSize: 30,
                            size: 100,
                            muiTableHeadCellProps: {
                                align: 'center',
                                sx: {
                                    boxShadow: 'none',
                                    color: '#6C757D',
                                },
                            },
                            muiTableBodyCellProps: {
                                align: 'center',
                                sx: {
                                    boxShadow: 'none',
                                },
                            },
                        },
                    }}
                    renderTopToolbar={({ table }) => {
                        return (
                            <>
                                <div className="table-top-toolbar-menu">
                                    <Box
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'flex-end',
                                            paddingRight: '24px',
                                        }}>
                                        <Tooltip title="Table Filters" arrow>
                                            <IconButton
                                                className={filterShow && 'table-filter-btn-active'}
                                                onClick={openFilterBox}>
                                                {!filterShow ? <FilterAltIcon /> : <FilterAltOffIcon />}
                                            </IconButton>
                                        </Tooltip>
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
                                        <MRT_FullScreenToggleButton table={table} />
                                        <Button
                                            className="table-new-button"
                                            style={{ color: '#fff' }}
                                            variant="contained"
                                            onClick={handleNewButton}
                                            endIcon={<AddIcon sx={{ width: 16, height: 16, marginLeft: 0 }} />}>
                                            {t('New')}
                                        </Button>
                                    </Box>
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
                                </div>
                            </>
                        );
                    }}
                />
            </ThemeProvider>
        </div>
    );
};

export default TableGant;
