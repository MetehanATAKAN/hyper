import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
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
import { Box, Button, IconButton, Menu, MenuItem, Divider, alpha, Collapse, Stack, Tooltip, Link, Checkbox } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SaveIcon from '@mui/icons-material/Save';
import CalculateIcon from '@mui/icons-material/Calculate';

// import { data } from './mockData';
// import '../../../../assets/scss/custom/components/tableLayout.scss';
import { utils, writeFileXLSX } from 'xlsx';
import { useTranslation } from 'react-i18next';
import { Button as ButtonB, Form } from 'react-bootstrap';


import { useSelector } from 'react-redux';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../../../components/Loading';
import Filter from './Filter';
import { useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiEyeOutline, mdiPencilBoxOutline } from '@mdi/js';
import Tippy from '@tippyjs/react';
import EditModal from './ChangeDateModal/EditModal';
import { DataArray } from '@mui/icons-material';


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


const PromoSubjectGroupingTable = () => {


  const { t } = useTranslation();

  const history = useHistory();

  const createdBy = localStorage.getItem('userName');

  const [isShow, setIsShow] = useState(true);

  const [filterShow, setFilterShow] = useState(true);
  const [filterIcon, setFilterIcon] = useState(true);

  const [applyFilter, setApplyFilter] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);

  /**Date Modal */
  const [showDateModal, setShowDateModal] = useState(false);

  /**Loading */
  const [calculateLoading, setCalculateLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [workPlaceHeader, setWorkPlaceHeader] = useState();
  const [companyId, setCompanyId] = useState();
  const [clientTypeName, setClientTypeName] = useState();


  const [showDocumentDetailModal, setShowDocumentDetailModal] = useState(false);
  const [selectedDocumentItem, setSelectedDocumentItem] = useState();


  const [radio, setRadio] = useState(1);
  /**Loading */
  const [isLoading, setIsLoading] = useState(false);

  /**change valid loading */
  const [validLoading, setValidLoading] = useState(false);

  /**change valid status */
  const changeValid = (data,validValue) => {
    setValidLoading(true);
    const changeData = data.row.original;
    const body = {
      id: changeData.id,
      validStatus: !changeData.validStatus,
      modifiedBy: createdBy
    }
    FetchApiPost('services/Pages/PromoSubjectGrouping/UpdatePromoSubjectGrouping','POST',body)
    .then(res => {
      if (res.status === 200 || res.status === 201) {
          res.json().then(({ data }) => {
            setValidLoading(false);
          })
      } else if (res.status === 500 || res.status === 502) {
          history.push('/error-500');
          setValidLoading(false);
      }
      else {
        setValidLoading(false);
      }
  })
  }

  
  const columns = [
    {
      header: workPlaceHeader ? workPlaceHeader.pl.headerName : 'Place',
      accessorKey: 'place',
    },
    {
      header: workPlaceHeader ? workPlaceHeader.pt.headerName : 'Place Type',
      accessorKey: 'placeType',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: workPlaceHeader ? workPlaceHeader.tp.headerName : 'Type of Priority',
      accessorKey: 'typeOfPriority',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: clientTypeName ? clientTypeName[0].headerName : 'Client Type',
      accessorKey: 'clientType',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: t('Global Brand'),
      accessorKey: 'brand',
      size: '170',
    },
    {
      header: t('Promo Subject Name'),
      accessorKey: 'name',
      size: '275',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: t('Reference'),
      accessorKey: 'reference',
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell, row }) => {
        // cell data yı veriyor ordan dökümanları al
        return (
          <div className="visit-content__table-icons">
            <button
              onClick={() => {
                setShowDocumentDetailModal(true);
                setSelectedDocumentItem(row.original);
              }}>
              <Icon path={mdiEyeOutline} size={0.85} />
            </button>
          </div>
        );
      },
    },
    {
      header: t('V.S.'),
      accessorKey: 'visitStructure',
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell, row }) => {
        return (
          <div className="visit-content__table-icons">
            <button>
              <Link to={`/apps/templates/promoSubject=${row.original.id}`} style={{ color: '#6C757D' }}>
                <Icon path={mdiPencilBoxOutline} size={0.85} />
              </Link>
            </button>
          </div>
        );
      },
    },
    {
      header: t('Request'),
      accessorKey: 'request',
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return <div className="visit-content__table-icons">-</div>;
      },
    },
    {
      header: t('Warning'),
      accessorKey: 'warning',
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return <div className="visit-content__table-icons">-</div>;
      },
    },
    {
      header: t('Quiz'),
      accessorKey: 'quiz',
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return <div className="visit-content__table-icons">-</div>;
      },
    },
    {
      header: t('Company'),
      accessorKey: 'language',
    },
    {
      header: t('Type'),
      accessorKey: 'type',
    },
    {
      header: t('Specialization'),
      accessorKey: 'specializations',
      size: '200',
    },
    {
      header: t('Indication'),
      accessorKey: 'indication',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: t('Profile'),
      accessorKey: 'profile',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: t('Need'),
      accessorKey: 'need',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: t('Benefit'),
      accessorKey: 'benefits',
      Cell: ({ cell }) => (
        <Tippy content={cell.getValue()} placement="bottom">
          <div>{cell.getValue()}</div>
        </Tippy>
      ),
    },
    {
      header: t('Start Date'),
      accessorKey: 'startDate',
      muiTableBodyCellProps: ({ cell }) => ({
        onClick: () => {
          setShowDateModal(true);
          setEditData(allData.find(data => data.id === cell.row.original.id));
        },
      }),
    },
    {
      header: t('End Date'),
      accessorKey: 'endDate',
      muiTableBodyCellProps: ({ cell }) => ({
        onClick: () => {
          setShowDateModal(true);
          setEditData(allData.find(data => data.id === cell.row.original.id));
        },
      }),
      Cell: ({ cell }) => {
        return (
          <>
              {cell.getValue()}    
          </>
        );
      },
    },
    {
      header: t('Valid Status'),
      accessorKey: 'validStatus',
      size: '175',
      muiTableBodyCellProps: {
        align: 'center'
      },
      Cell: ({ cell }) => {
        return (
          <div className="visit-content__table-icons">
            <Form.Check
              type="switch"
              style={{ fontSize: '.9rem' }}
              onChange={(e) => changeValid(cell,cell.getValue())}
              defaultChecked={cell.getValue()}
            />
          </div>
        );
      },
    },
    {
      header: t('Check'),
      accessorKey: 'check',
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return (
          <div className="visit-content__table-icons">
            <Form.Check
              type="checkbox"
              style={{ fontSize: '.9rem' }}
              // onChange={(e) => changeValid(el, e.target.checked)}
              defaultChecked={cell.getValue()}
            />
          </div>
        );
      },
    },
  ];
  

  /**All Data */
  const [allData, setAllData] = useState([]);

  /** Original Data */
  const [originalData1, setOriginalData1] = useState([]);
  const [originalData2, setOriginalData2] = useState([
    
  ]);

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

 /**Edit Select Data */
  const [editData, setEditData] = useState(null);

  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);


  const handleGetDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

  //Open right table
  const [rightTable, setRightTable] = useState(true);

  /**save */
  const save = () => {
    const body = {
      promoSubjectGroups:originalData2.concat(data1)?.map((data,index) =>(
        {
          promoSubjectId: data.id,
          order: index+1,
          createdBy: createdBy
        }
      ))
    }
    if (data2?.length !== 0) {
      setSaveLoading(true);
      FetchApiPost('services/Pages/PromoSubjectGrouping/CreatePromoSubjectChildOrder', 'POST', body)
        .then((res) =>
          (async () => {
            try {
              if (res.status === 200 || res.status === 201) {
                setSaveLoading(false);

                const filteredData2 = res.filter(el => el?.type === 0);

                setData2(
                  filteredData2.map((item) => {
                      return {
                          id: item.id,
                          place: item.placeName,
                          placeType: item.placeTypeStr,
                          benefitsData:item?.benefits,
                          needData:item?.need,
                          typeOfPriority: item.typeOfPriorityStr,
                          clientType: item.clientTypeStr,
                          brand: item.brand.globalBrandName,
                          name: item.name,
                          reference: null,
                          visitStructure: null,
                          request: null,
                          warning: null,
                          quiz: null,
                          language: item.language.languageAbb,
                          type: item.type === 0 ? t('Child') : t('Parent'),
                          specializations: item.specializations.map((item) => item.specAbb).join(', '),
                          indication: item.indication.indication,
                          profile: item.profile.profileName,
                          need: item.need.needName,
                          benefits: item.benefits[0].benefitName,
                          startDate:  handleGetDate(item.startDate),
                          endDate:    handleGetDate(item.endDate),
                          validStatus: item.validStatus,
                          approveStatus: item.approveStatus,
                          action: item.approveStatus,
                          isCorporate: item.isCorporate,
                      };
                  })
              );
              }
              else if (res.status === 500 || res.status === 499) {
                history.push('/error-500');
                setSaveLoading(false);
              }
              else {
                setSaveLoading(false);
              }
            } catch (error) {
              console.log('error', error);
            }
          })()
        )
    }
  }

  /**Filter Child */
  const filterChild = (row) => {

    if (draggingRow.id !== 'table-2') {
      const needId = row.original.needData.id;
      const benefitId = row.original.benefitsData.map(el => el.id);

      const filteredNeed = originalData2.filter(el => el.needData.id === needId);

      const filteredData = [];
      filteredNeed.filter(el => el.benefitsData.map(data => {
        benefitId.map(item => {
          if (item === data.id) {
            const result = filteredData?.find(x => x?.id === el?.id);
            if (result === undefined) filteredData.push(el);
          }
        })
      }));

      setData2(filteredData);
    }
  }
  /**Left Table */
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
    state: { draggingRow, isLoading },
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

  useEffect(() => {
    if (!companyId) return;
    let countryId = localStorage.getItem('countryId');
    FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', {
      headerIds: [0],
      countryId: countryId,
      companyId: companyId
    }).then((res) => {
      if (res.status === 200) {
        res.json().then(({ data }) => {
          let arr = { pl: {}, pt: {}, tp: {} };
          data.map((item, index) => {
            if (item.abbrevation === 'PL') {
              arr.pl = item;
            }
          });
          data.map((item, index) => {
            if (item.abbrevation === 'PT') {
              arr.pt = item;
            }
          });
          data.map((item, index) => {
            if (item.abbrevation === 'PRT') {
              arr.tp = item;
            }
          });
          setWorkPlaceHeader(arr);
        });
      } else if (res.status === 500 || res.status === 502) {
        history.push('/error-500');
      } else {
        setWorkPlaceHeader();
      }
    });
  }, [history, companyId]);


  useEffect(() => {
    if (draggingRow) {
      filterChild(draggingRow);
    }
  }, [draggingRow])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>

          <Grid xs={12} sm={rightTable === false ? 12 : 8}>
            <MaterialReactTable
              {...commonTableProps}
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
                    setHoveredTable(null);
                  },
                }
              )}
              muiTablePaperProps={({ table }) => (
                {
                  onDragEnter: () => setHoveredTable('table-1')
                }
              )}
              muiTableContainerProps={{ sx: { minHeight: '500px', maxHeight: '500px' } }}
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
                columnVisibility: {
                  company: false,
                  busUnit: false,
                  zone: false
                }
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
                    <div className="table-top-toolbar-menu d-flex justify-content-between float-end">
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
                            <Tooltip title="Save" arrow>
                              <IconButton
                                aria-label="more"
                                onClick={save}
                              >
                                <SaveIcon />
                              </IconButton>
                            </Tooltip>

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
                            onClick={() => setRightTable(!rightTable)}>
                            {
                              rightTable === true
                                ? <KeyboardDoubleArrowRightIcon />
                                : <KeyboardDoubleArrowLeftIcon />
                            }
                          </IconButton>
                        </Box>
                      </div>
                    </div>
                    {isShow && (
                      <div
                        // style={{
                        //   gridColumn: 'span 2 / auto',
                        // }}
                        >
                        <div>
                          <Collapse in={filterShow}>
                            <div className="table-filter-area">
                              
                                <Filter
                                  setApplyFilter={setApplyFilter}
                                  applyFilter={applyFilter}
                                  setClearFilter={setClearFilter}
                                  clearFilter={clearFilter}
                                  setTableData1={setData1}
                                  setTableData2={setData2}
                                  orgData1={setOriginalData1}
                                  orgData2={setOriginalData2}
                                  setLoading={setIsLoading}
                                  radio={radio}
                                  setAllData={setAllData}
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
                                onClick={() => setClearFilter(true)}
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
              <>
                <MaterialReactTable
                  {...commonTableProps}
                  data={data2}
                  autoResetPageIndex={false}
                  enableRowOrdering
                  enableSorting={false}
                  enableColumnOrdering
                  defaultColumn={{
                    size: 100,
                  }}
                  getRowId={(originalRow) => `table-2`}
                  muiTableBodyRowDragHandleProps={({ table }) => (
                    {
                      onDragEnd: () => {
                        const { draggingRow, hoveredRow } = table.getState();

                        if (hoveredTable === 'table-2' && draggingRow && hoveredRow) {
                          
                          data2.splice(
                            hoveredRow.index,
                            0,
                            data2.splice(draggingRow.index, 1)[0],
                          );
                          setData2([...data2]);

                          const filtered = originalData2.filter(item => 
                            !data2.some(el => el.id === item.id)
                          );

                          setOriginalData2([...data2,...filtered]);
                          
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
                  muiTableContainerProps={{ sx: { minHeight: '500px', maxHeight: '500px' } }}
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
                    columnVisibility: {
                      company: false,
                      busUnit: false,
                      zone: false,
                      place: false,
                      placeType: false,
                      typeOfPriority: false,
                      clientType: false,
                      brand: false,
                      type: false,
                      specializations: false,
                      indication: false,
                      profile: false,
                      need: false,

                    }
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
              </>
            }

          </Grid>
        </Grid>
      </Box>
      {
        showDateModal &&
        <EditModal
          showModal={showDateModal}
          setShowModal={setShowDateModal}
          item={editData}
        />
      }
      <Loading loading={calculateLoading} />
      <Loading loading={saveLoading} />
      <Loading loading={validLoading} />
    </>
  );
}


export default PromoSubjectGroupingTable