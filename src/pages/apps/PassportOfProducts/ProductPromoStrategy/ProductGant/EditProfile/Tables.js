import React, { useEffect, useState } from 'react';
import MaterialReactTable, { MRT_GlobalFilterTextField, MRT_ToggleGlobalFilterButton } from 'material-react-table';
import { Box, Button, IconButton, Menu, alpha, Collapse, Tooltip } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
// import '../../../../../../assets/scss/custom/components/tableLayout.scss';
import { utils, writeFileXLSX } from 'xlsx';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Button as ButtonB } from 'react-bootstrap';

const ModalTable = ({
    isLoading = false,
    isCheckBox = true,
    isShowNewBtn = true,
    isTopToolbarShow = true,
    columnVisibility = {}, // { firstName: false }
    columnPinningLeft = [], // left: ['firstName']
    columnPinningRight = [], // right: ['lastName']
    handleNewButton,
    handlApplyBtn,
    handlClearBtn,
    isRowActions = false,
    filter,
    isFilter = true,
    data = [],
    columns = [],
    filterShow = true,
    setFilterShow,
    rowSelection,
    setRowSelection,
}) => {
    const { t } = useTranslation();
    const [isStripe, setIsStripe] = useState(false);
    const openFilterBox = () => {
        setFilterShow(!filterShow);
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
                enableGrouping
                enableStickyHeader
                enableStickyFooter
                enableColumnFilterModes
                enableColumnOrdering
                enablePinning
                filterFromLeafRows
                positionActionsColumn="last"
                enableTopToolbar={isTopToolbarShow}
                state={{
                    isLoading,
                    rowSelection,
                }}
                getRowId={(row) => row.id}
                onRowSelectionChange={setRowSelection}
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
                    maxSize: 700,
                    minSize: 20,
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
                renderTopToolbar={({ table }) => {
                    return (
                        <>
                            <div className="table-top-toolbar-menu">
                                <div style={{ justifyContent: 'flex-end' }} className="toolbar">
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

                                        {isShowNewBtn && (
                                            <Button
                                                className="table-new-button"
                                                variant="contained"
                                                onClick={handleNewButton}
                                                endIcon={<AddIcon sx={{ width: 16, height: 16, marginLeft: 0 }} />}>
                                                {t('New')}
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

export default ModalTable;
