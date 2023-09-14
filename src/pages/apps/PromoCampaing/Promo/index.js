import React, { useEffect, useMemo, useState } from 'react';
import Filters from './Filter';
import { Input } from 'antd';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Chip, IconButton, Tooltip } from '@mui/material';
import PromoTable from './PromoTable';
import AddModals from './AddModals/AddModals';
import { useDispatch } from 'react-redux';
import { setYearRedux } from '../../../../redux/promoCampaing/actions';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import Duplicate from './Duplicate';
import CycleMeeting from './CycleMeeting';
import EditIcon from '@mui/icons-material/Edit';
import EditCyclePeriod from './EditCyclePeriod';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddSpec from './AddSpec';
import Delete from './Delete';
import AddCategory from './AddCategory';
import UpdateMeeting from './UpdateMeeting';

const MonthColumnCustomCell = ({
    cell,
    row,
    handleTimeChange,
    handleChangeMonths,
    setMonthColors,
    setShowUpdateMeetingModal,
    setPrevMeeting,
}) => {
    const timeOptions = [
        { value: 1, label: 'flexible' },
        { value: 2, label: 'end of shift' },
        { value: 3, label: 'time' },
    ];
    useMemo(() => {
        if (row.original.rowId !== 12000) return;
        if (cell.column.id === 'Jan') {
            setMonthColors({
                jan: row.original.colorJan,
                feb: row.original.colorFeb,
                mar: row.original.colorMar,
                apr: row.original.colorApr,
                may: row.original.colorMay,
                jun: row.original.colorJun,
                jul: row.original.colorJul,
                aug: row.original.colorAug,
                sep: row.original.colorSep,
                oct: row.original.colorOct,
                nov: row.original.colorNov,
                dec: row.original.colorDec,
            });
        }
    }, [
        cell.column.id,
        row.original.colorApr,
        row.original.colorAug,
        row.original.colorDec,
        row.original.colorFeb,
        row.original.colorJan,
        row.original.colorJul,
        row.original.colorJun,
        row.original.colorMar,
        row.original.colorMay,
        row.original.colorNov,
        row.original.colorOct,
        row.original.colorSep,
        row.original.rowId,
        setMonthColors,
    ]);
    if (
        row.original.rowId === 16000 ||
        row.original.rowId === 17000 ||
        row.original.rowId === 17100 ||
        row.original.rowId === 17200
    ) {
        return (
            <SingleSelects
                size="small"
                selectedItems={cell.getValue() === 0 ? { value: 1 } : { value: cell.getValue() }}
                setSelectedItems={() => {}}
                options={timeOptions}
                width={'100%'}
                headerName={cell.column.id}
                handleChange={(value, label, headerName) => handleTimeChange(value, label, headerName, row.original)}
            />
        );
    }
    if (row.original.rowId < 18000) {
        if (row.original.rowId === 12000) {
            let color;
            let meetingColor;
            let meetingName;
            let meetingTooltip;
            switch (cell.column.id) {
                case 'Jan':
                    color = row.original.colorJan;
                    meetingColor = row.original.meetingColorJan;
                    meetingName = row.original.meetingNameJan;
                    meetingTooltip = row.original.meetingTooltipJan;
                    break;
                case 'Feb':
                    color = row.original.colorFeb;
                    meetingColor = row.original.meetingColorFeb;
                    meetingName = row.original.meetingNameFeb;
                    meetingTooltip = row.original.meetingTooltipFeb;
                    break;
                case 'Mar':
                    color = row.original.colorMar;
                    meetingColor = row.original.meetingColorMar;
                    meetingName = row.original.meetingNameMar;
                    meetingTooltip = row.original.meetingTooltipMar;
                    break;
                case 'Apr':
                    color = row.original.colorApr;
                    meetingColor = row.original.meetingColorApr;
                    meetingName = row.original.meetingNameApr;
                    meetingTooltip = row.original.meetingTooltipApr;
                    break;
                case 'May':
                    color = row.original.colorMay;
                    meetingColor = row.original.meetingColorMay;
                    meetingName = row.original.meetingNameMay;
                    meetingTooltip = row.original.meetingTooltipMay;
                    break;
                case 'Jun':
                    color = row.original.colorJun;
                    meetingColor = row.original.meetingColorJun;
                    meetingName = row.original.meetingNameJun;
                    meetingTooltip = row.original.meetingTooltipJun;
                    break;
                case 'Jul':
                    color = row.original.colorJul;
                    meetingColor = row.original.meetingColorJul;
                    meetingName = row.original.meetingNameJul;
                    meetingTooltip = row.original.meetingTooltipJul;
                    break;
                case 'Aug':
                    color = row.original.colorAug;
                    meetingColor = row.original.meetingColorAug;
                    meetingName = row.original.meetingNameAug;
                    meetingTooltip = row.original.meetingTooltipAug;
                    break;
                case 'Sep':
                    color = row.original.colorSep;
                    meetingColor = row.original.meetingColorSep;
                    meetingName = row.original.meetingNameSep;
                    meetingTooltip = row.original.meetingTooltipSep;
                    break;
                case 'Oct':
                    color = row.original.colorOct;
                    meetingColor = row.original.meetingColorOct;
                    meetingName = row.original.meetingNameOct;
                    meetingTooltip = row.original.meetingTooltipOct;
                    break;
                case 'Nov':
                    color = row.original.colorNov;
                    meetingColor = row.original.meetingColorNov;
                    meetingName = row.original.meetingNameNov;
                    meetingTooltip = row.original.meetingTooltipNov;
                    break;
                case 'Dec':
                    color = row.original.colorDec;
                    meetingColor = row.original.meetingColorDec;
                    meetingName = row.original.meetingNameDec;
                    meetingTooltip = row.original.meetingTooltipDec;
                    break;
                default:
                    break;
            }
            return (
                <div className="full-cell" style={{ backgroundColor: cell.getValue() === 1 && `rgba(${color},0.4)` }}>
                    <Tooltip title={meetingTooltip} placement="top" arrow>
                        <Chip
                            sx={{
                                backgroundColor: `rgb(${meetingColor})`,
                                color: '#fff',
                                fontSize: '12px',
                                height: 'auto',
                                '.MuiChip-label': {
                                    padding: '4px 6px 2px 6px',
                                },
                            }}
                            onClick={() => {
                                setShowUpdateMeetingModal(true);
                                setPrevMeeting({ name: meetingName, date: meetingTooltip });
                            }}
                            label={meetingName}
                            size="small"
                        />
                    </Tooltip>
                </div>
            );
        }
        return <div>{cell.getValue() === 0 ? '-' : cell.getValue()}</div>;
    }

    let disable;
    switch (cell.column.id) {
        case 'Jan':
            disable = row.original.isDisableJan;
            break;
        case 'Feb':
            disable = row.original.isDisableFeb;
            break;
        case 'Mar':
            disable = row.original.isDisableMar;
            break;
        case 'Apr':
            disable = row.original.isDisableApr;
            break;
        case 'May':
            disable = row.original.isDisableMay;
            break;
        case 'Jun':
            disable = row.original.isDisableJun;
            break;
        case 'Jul':
            disable = row.original.isDisableJul;
            break;
        case 'Aug':
            disable = row.original.isDisableAug;
            break;
        case 'Sep':
            disable = row.original.isDisableSep;
            break;
        case 'Oct':
            disable = row.original.isDisableOct;
            break;
        case 'Nov':
            disable = row.original.isDisableNov;
            break;
        case 'Dec':
            disable = row.original.isDisableDec;
            break;
        default:
            break;
    }
    return (
        <Input
            placeholder="-"
            type="number"
            name={cell.column.id}
            value={cell.getValue() === 0 ? '-' : cell.getValue()}
            id={row.original.rowId}
            onChange={(e) => handleChangeMonths(e, row.original)}
            disabled={!disable}
            size="small"
            style={{ textAlign: 'right' }}
        />
    );
};
const Promo = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const empId = localStorage.getItem('userEmpId');
    const user = localStorage.getItem('userName');
    const [checkedSwitchCopy, setCheckedSwitchCopy] = useState(false);
    const [filterShow, setFilterShow] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showCycleMeeting, setShowCycleMeeting] = useState(false);
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectYear, setSelectYear] = useState();
    const [selectCompany, setSelectCompany] = useState();
    const [selectCountry, setSelectCountry] = useState();
    const [selectBusUnit, setSelectBusUnit] = useState();
    const [optionsYear, setOptionsYear] = useState();
    const [optionsCompany, setOptionsCompany] = useState();
    const [optionsCountry, setOptionsCountry] = useState();
    const [optionsBusUnit, setOptionsBusUnit] = useState();
    const [showCyclePeriodEdit, setShowCyclePeriodEdit] = useState(false);
    const [showAddSpecModal, setShowAddSpecModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showUpdateMeetingModal, setShowUpdateMeetingModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [specItem, setSpecItem] = useState(null);
    const [fetchSpecItem, setFetchSpecItem] = useState(null);
    const [rowName, setRowName] = useState('');
    const [prevMeeting, setPrevMeeting] = useState(null);
    const [monthColors, setMonthColors] = useState({
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: '',
        jul: '',
        aug: '',
        sep: '',
        oct: '',
        nov: '',
        dec: '',
    });
    const filterComponentsData = [
        {
            label: 'year',
            options: optionsYear,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
        },
        {
            label: 'country',
            options: optionsCountry,
            state: selectCountry,
            setState: setSelectCountry,
            type: 'singleselect',
        },
        {
            label: 'company',
            options: optionsCompany,
            state: selectCompany,
            setState: setSelectCompany,
            type: 'singleselect',
        },
        {
            label: 'business unit',
            options: optionsBusUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
        },
    ];

    const setNewAllData = (monthValue, obj) => {
        const newData = datas.reduce((accData, data) => {
            if (data.rowId !== obj.parentRowId) {
                return [...accData, data];
            }

            const specs = data.specDetail.reduce((accSpecs, spec) => {
                if (spec.rowId !== obj.specId) {
                    return [...accSpecs, spec];
                }

                const clients = spec.newClientResearchDetail.reduce((accClients, client) => {
                    if (client.rowId !== obj.clientId) {
                        return [...accClients, client];
                    }

                    const categories = client.categoryDetail.reduce((accCategories, category) => {
                        if (category.rowId !== obj.categoryId) {
                            return [...accCategories, category];
                        }

                        const details = category.detail.map((detail) => {
                            if (detail.rowId !== obj.rowId) {
                                return detail;
                            }

                            const newDetail = {
                                ...detail,
                                monthValues: [detail.monthValues[0], ...monthValue, detail.monthValues[13]],
                            };
                            return newDetail;
                        });

                        const newCategory = { ...category, detail: details };
                        return [...accCategories, newCategory];
                    }, []);

                    const newClient = { ...client, categoryDetail: categories };
                    return [...accClients, newClient];
                }, []);

                const newSpec = { ...spec, newClientResearchDetail: clients };
                return [...accSpecs, newSpec];
            }, []);

            const newDataItem = { ...data, specDetail: specs };
            return [...accData, newDataItem];
        }, []);
        setDatas(newData);
    };
    // MONTH INPUTS CHANGE
    const handleChangeMonths = (e, objs) => {
        if (checkedSwitchCopy === false) {
            setShowAlert(true);
            const initialObj = { ...objs };
            initialObj[e.target.name] = Number(e.target.value);
            const monthValue = Object.values(initialObj).slice(7, 19);
            setNewAllData(monthValue, initialObj);
        }
        if (checkedSwitchCopy === true) {
            setShowAlert(true);
            // true ise input açık, sayı girilebilir
            const initialObj = { ...objs };
            const disableStatus = Object.values(initialObj).slice(31, 43);
            const keys = Object.keys(initialObj).slice(7, 19);
            const index = keys.findIndex((el) => el === e.target.name);
            keys.forEach((item, i) => {
                if (i >= index && disableStatus[i] === true) {
                    initialObj[item] = Number(e.target.value);
                }
            });
            const monthValue = Object.values(initialObj).slice(7, 19);
            setNewAllData(monthValue, initialObj);
        }
    };

    // MONTH DROPDOWN TIME CHANGE
    const handleTimeChange = (value, label, headerName, obj) => {
        const initialObj = { ...obj, [headerName]: value };
        const monthValue = Object.values(initialObj).slice(7, 19);
        setNewAllData(monthValue, initialObj);
    };

    const columns = [
        {
            accessorKey: 'name',
            header: '',
            size: 275,
            Cell: ({ cell, row }) => {
                if (cell.getValue().includes('/')) {
                    const name = cell.getValue().split('/');
                    return (
                        <Tooltip
                            title={row.original.tip ? row.original.tip : cell.getValue()}
                            placement="bottom-start"
                            arrow>
                            <div style={{ display: 'flex', gap: '3px' }}>
                                <span
                                    style={{
                                        backgroundColor: 'rgba(107, 94, 174, 0.15)',
                                        color: 'rgb(107, 94, 174)',
                                        padding: '2px 8px',
                                        borderRadius: '3px',
                                    }}>
                                    {name[0]}
                                </span>
                                <span
                                    style={{
                                        backgroundColor: 'rgba(114, 124, 245, 0.15)',
                                        color: 'rgb(114, 124, 245)',
                                        padding: '2px 8px',
                                        borderRadius: '3px',
                                    }}>
                                    {name[1]}
                                </span>
                                <span
                                    style={{
                                        backgroundColor: 'rgba(2, 168, 181, 0.15)',
                                        color: 'rgb(2, 168, 181)',
                                        padding: '2px 8px',
                                        borderRadius: '3px',
                                    }}>
                                    {name[2]}
                                </span>
                                <span
                                    style={{
                                        backgroundColor:
                                            name.length > 2
                                                ? name[3].trim() === 'A'
                                                    ? 'rgba(10, 207, 151, 0.15)'
                                                    : name[3].trim() === 'B'
                                                    ? 'rgba(253, 126, 20, 0.15)'
                                                    : name[3].trim() === 'C'
                                                    ? 'rgba(250, 92, 124,0.15)'
                                                    : 'rgba(10, 207, 151, 0.15)'
                                                : '',
                                        color:
                                            name.length > 2
                                                ? name[3].trim() === 'A'
                                                    ? 'rgb(10, 207, 151)'
                                                    : name[3].trim() === 'B'
                                                    ? 'rgb(253, 126, 20)'
                                                    : name[3].trim() === 'C'
                                                    ? 'rgb(250, 92, 124)'
                                                    : 'rgb(10, 207, 151)'
                                                : '',
                                        padding: '2px 4px',
                                        borderRadius: '3px',
                                    }}>
                                    {name[3]}
                                </span>
                                <span
                                    style={{
                                        backgroundColor: 'rgba(2, 168, 181, 0.15)',
                                        color: 'rgb(2, 168, 181)',
                                        padding: '2px 8px',
                                        borderRadius: '3px',
                                    }}>
                                    {name[4]}
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
            },
        },
        {
            accessorKey: 'Jan',
            header: t('JAN'),
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.jan},0.5)`,
                    color: '#6C757D',
                },
            },
            muiTableBodyCellProps: {
                align: 'right',
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setMonthColors={setMonthColors}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Feb',
            header: t('FEB'),
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.feb},0.5)`,
                    color: '#6C757D',
                },
            },
            muiTableBodyCellProps: {
                align: 'right',
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Mar',
            header: t('MAR'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.mar},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Apr',
            header: t('APR'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.apr},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'May',
            header: t('MAY'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.may},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Jun',
            header: t('JUN'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.jun},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Jul',
            header: t('JUL'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.jul},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Aug',
            header: t('AUG'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.aug},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Sep',
            header: t('SEP'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.sep},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Oct',
            header: t('OCT'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.oct},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Nov',
            header: t('NOV'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.nov},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'Dec',
            header: t('DEC'),
            muiTableBodyCellProps: {
                align: 'right',
            },
            muiTableHeadCellProps: {
                sx: {
                    borderBottom: `4px solid rgba(${monthColors.dec},0.5)`,
                    color: '#6C757D',
                },
            },
            size: 100,
            Cell: ({ cell, row }) => (
                <MonthColumnCustomCell
                    cell={cell}
                    row={row}
                    handleChangeMonths={handleChangeMonths}
                    handleTimeChange={handleTimeChange}
                    key={cell.column.id}
                    setMonthColors={setMonthColors}
                    setShowUpdateMeetingModal={setShowUpdateMeetingModal}
                    setPrevMeeting={setPrevMeeting}
                />
            ),
        },
        {
            accessorKey: 'total',
            header: t('TOTAL'),
            size: 120,
            muiTableBodyCellProps: {
                align: 'right',
            },
        },
        {
            accessorKey: 'action',
            header: '',
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            size: 75,
            muiTableBodyCellProps: {
                align: 'left',
            },
        },
    ];

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectYear({ value: new Date().getFullYear(), label: String(new Date().getFullYear()) });
                    setOptionsYear(data?.map((x) => ({ value: x.Id, label: x.Val1 })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });

        FetchApiGet(`api/OldSystem/GetAllCountriesList/${empId}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectCountry({ value: data[0].CountryId, label: data[0].CountryName });
                    setOptionsCountry(data?.map((x) => ({ value: x.CountryId, label: x.CountryName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);

    useEffect(() => {
        if (!selectCountry) return;
        FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${selectCountry.value}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectCompany({ value: data[0].CompanyId, label: data[0].CompanyName });
                    setOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectCountry]);

    useEffect(() => {
        if (!selectCompany || !selectYear) return;
        const postData = {
            CompanyId: selectCompany.value,
            Year: selectYear.value,
        };
        FetchApiPost('api/OldSystem/GetBusinessUnitCampaign', 'POST', postData).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 0) {
                        setOptionsBusUnit([]);
                        return setSelectBusUnit([]);
                    }
                    setSelectBusUnit({ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName });
                    setOptionsBusUnit(data?.map((x) => ({ value: x.BusinessUnitId, label: x.BusinessUnitName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectCompany, selectYear]);

    const tableData = datas?.map((el) => {
        if (el.rowId === 0) {
            const obj = el.specDetail[0].newClientResearchDetail[0].categoryDetail[0].detail?.map((detail) => ({
                parentRowId: el.rowId,
                specId: 0,
                clientId: 0,
                categoryId: 0,
                rowId: detail.rowId,
                name: detail.rowName,
                tip: detail.rowTooltip,
                Jan: detail.monthValues[1],
                Feb: detail.monthValues[2],
                Mar: detail.monthValues[3],
                Apr: detail.monthValues[4],
                May: detail.monthValues[5],
                Jun: detail.monthValues[6],
                Jul: detail.monthValues[7],
                Aug: detail.monthValues[8],
                Sep: detail.monthValues[9],
                Oct: detail.monthValues[10],
                Nov: detail.monthValues[11],
                Dec: detail.monthValues[12],
                colorJan: detail.cyclePeriodColor[1],
                colorFeb: detail.cyclePeriodColor[2],
                colorMar: detail.cyclePeriodColor[3],
                colorApr: detail.cyclePeriodColor[4],
                colorMay: detail.cyclePeriodColor[5],
                colorJun: detail.cyclePeriodColor[6],
                colorJul: detail.cyclePeriodColor[7],
                colorAug: detail.cyclePeriodColor[8],
                colorSep: detail.cyclePeriodColor[9],
                colorOct: detail.cyclePeriodColor[10],
                colorNov: detail.cyclePeriodColor[11],
                colorDec: detail.cyclePeriodColor[12],
                isDisableJan: detail.disStatus[1],
                isDisableFeb: detail.disStatus[2],
                isDisableMar: detail.disStatus[3],
                isDisableApr: detail.disStatus[4],
                isDisableMay: detail.disStatus[5],
                isDisableJun: detail.disStatus[6],
                isDisableJul: detail.disStatus[7],
                isDisableAug: detail.disStatus[8],
                isDisableSep: detail.disStatus[9],
                isDisableOct: detail.disStatus[10],
                isDisableNov: detail.disStatus[11],
                isDisableDec: detail.disStatus[12],
                meetingColorJan: detail.cycleMeetingColor[1],
                meetingColorFeb: detail.cycleMeetingColor[2],
                meetingColorMar: detail.cycleMeetingColor[3],
                meetingColorApr: detail.cycleMeetingColor[4],
                meetingColorMay: detail.cycleMeetingColor[5],
                meetingColorJun: detail.cycleMeetingColor[6],
                meetingColorJul: detail.cycleMeetingColor[7],
                meetingColorAug: detail.cycleMeetingColor[8],
                meetingColorSep: detail.cycleMeetingColor[9],
                meetingColorOct: detail.cycleMeetingColor[10],
                meetingColorNov: detail.cycleMeetingColor[11],
                meetingColorDec: detail.cycleMeetingColor[12],
                meetingNameJan: detail.cycleMeetingName[1],
                meetingNameFeb: detail.cycleMeetingName[2],
                meetingNameMar: detail.cycleMeetingName[3],
                meetingNameApr: detail.cycleMeetingName[4],
                meetingNameMay: detail.cycleMeetingName[5],
                meetingNameJun: detail.cycleMeetingName[6],
                meetingNameJul: detail.cycleMeetingName[7],
                meetingNameAug: detail.cycleMeetingName[8],
                meetingNameSep: detail.cycleMeetingName[9],
                meetingNameOct: detail.cycleMeetingName[10],
                meetingNameNov: detail.cycleMeetingName[11],
                meetingNameDec: detail.cycleMeetingName[12],
                meetingTooltipJan: detail.cycleMeetingToolTip[1],
                meetingTooltipFeb: detail.cycleMeetingToolTip[2],
                meetingTooltipMar: detail.cycleMeetingToolTip[3],
                meetingTooltipApr: detail.cycleMeetingToolTip[4],
                meetingTooltipMay: detail.cycleMeetingToolTip[5],
                meetingTooltipJun: detail.cycleMeetingToolTip[6],
                meetingTooltipJul: detail.cycleMeetingToolTip[7],
                meetingTooltipAug: detail.cycleMeetingToolTip[8],
                meetingTooltipSep: detail.cycleMeetingToolTip[9],
                meetingTooltipOct: detail.cycleMeetingToolTip[10],
                meetingTooltipNov: detail.cycleMeetingToolTip[11],
                meetingTooltipDec: detail.cycleMeetingToolTip[12],
            }));
            return {
                name: 'Campaing Calendar',
                rowId: 0,
                // action: (
                //     <Tooltip title={t('edit')} arrow>
                //         <IconButton
                //             onClick={() => {
                //                 setShowCyclePeriodEdit(true);
                //             }}
                //             size="small">
                //             <EditIcon sx={{ width: 18, height: 18 }} />
                //         </IconButton>
                //     </Tooltip>
                // ),
                subRows: obj,
            };
        }
        return {
            rowId: el.rowId,
            name: el.rowName,
            action: el.clientTypeId !== 0 && (
                <Tooltip title={t('edit spec')} arrow>
                    <IconButton
                        onClick={() => {
                            setFetchSpecItem({
                                fetchData: {
                                    yearId: el.yearId,
                                    countryId: Number(selectCountry.value),
                                    companyId: el.companyId,
                                    businessUnitId: el.businessUnitId,
                                    placeId: el.placeId,
                                    placeTypeId: el.placeTypeId,
                                    typeofPriorityId: el.typeOfPriorityId,
                                    clientTypeId: el.clientTypeId,
                                    workPlaceCategory: el.workPlaceCategory,
                                },
                                postData: {
                                    yearId: el.yearId,
                                    countryId: Number(selectCountry.value),
                                    companyId: el.companyId,
                                    businessUnitId: el.businessUnitId,
                                    placeId: el.placeId,
                                    placeTypeId: el.placeTypeId,
                                    typeofPriorityId: el.typeOfPriorityId,
                                    clientTypeId: el.clientTypeId,
                                    workPlaceCategory: el.workPlaceCategory,
                                    modifiedBy: user,
                                    placeName: el.placeName,
                                    placeTypeName: el.placeTypeName,
                                    typeOfPriorityName: el.typeOfPriorityName,
                                    clientTypeName: el.clientTypeName,
                                    companyName: selectCompany.label,
                                    busName: selectBusUnit.label,
                                    marketReserachStatus: true,
                                    specLists: [],
                                },
                            });
                            setShowAddSpecModal(true);
                            setRowName(el.rowName);
                        }}
                        size="small">
                        <EditIcon sx={{ width: 18, height: 18 }} />
                    </IconButton>
                </Tooltip>
            ),
            subRows: el.specDetail?.map((spec) => ({
                rowId: spec.rowId,
                name: spec.specName,
                action: (
                    <>
                        <Tooltip title={t('edit category')} arrow>
                            <IconButton
                                onClick={() => {
                                    setSpecItem([{ value: spec.specId, label: spec.specName }]);
                                    setFetchSpecItem({
                                        fetchData: {
                                            yearId: el.yearId,
                                            countryId: Number(selectCountry.value),
                                            companyId: el.companyId,
                                            businessUnitId: el.businessUnitId,
                                            placeId: el.placeId,
                                            placeTypeId: el.placeTypeId,
                                            typeofPriorityId: el.typeOfPriorityId,
                                            clientTypeId: el.clientTypeId,
                                            workPlaceCategory: el.workPlaceCategory,
                                            specId: spec.specId,
                                        },
                                        postData: {
                                            yearId: el.yearId,
                                            countryId: Number(selectCountry.value),
                                            companyId: el.companyId,
                                            businessUnitId: el.businessUnitId,
                                            placeId: el.placeId,
                                            placeTypeId: el.placeTypeId,
                                            typeofPriorityId: el.typeOfPriorityId,
                                            clientTypeId: el.clientTypeId,
                                            workPlaceCategory: el.workPlaceCategory,
                                            modifiedBy: user,
                                            placeName: el.placeName,
                                            placeTypeName: el.placeTypeName,
                                            typeOfPriorityName: el.typeOfPriorityName,
                                            clientTypeName: el.clientTypeName,
                                            companyName: selectCompany.label,
                                            busName: selectBusUnit.label,
                                            specId: spec.specId,
                                            specName: spec.specName,
                                            categoryList: [],
                                        },
                                    });
                                    setShowAddCategoryModal(true);
                                }}
                                size="small">
                                <EditIcon sx={{ width: 18, height: 18 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('delete')} arrow>
                            <IconButton
                                onClick={() => {
                                    setDeleteItem({ value: spec.specId, label: spec.specName, title: 'spec' });
                                    setFetchSpecItem({
                                        yearId: el.yearId,
                                        countryId: Number(selectCountry.value),
                                        companyId: el.companyId,
                                        businessUnitId: el.businessUnitId,
                                        placeId: el.placeId,
                                        placeTypeId: el.placeTypeId,
                                        typeofPriorityId: el.typeOfPriorityId,
                                        clientTypeId: el.clientTypeId,
                                        workPlaceCategory: el.workPlaceCategory,
                                        specId: spec.specId,
                                        modifiedBy: user,
                                    });
                                    setShowDeleteModal(true);
                                    setRowName(el.rowName);
                                }}
                                size="small">
                                <DeleteOutlineIcon sx={{ width: 18, height: 18, color: '#FA5C7C' }} />
                            </IconButton>
                        </Tooltip>
                    </>
                ),
                subRows: spec.newClientResearchDetail?.map((client) => ({
                    rowId: client.rowId,
                    name: client.rowName,
                    Jan: client.newClientReserachQuantity[1],
                    Feb: client.newClientReserachQuantity[2],
                    Mar: client.newClientReserachQuantity[3],
                    Apr: client.newClientReserachQuantity[4],
                    May: client.newClientReserachQuantity[5],
                    Jun: client.newClientReserachQuantity[6],
                    Jul: client.newClientReserachQuantity[7],
                    Aug: client.newClientReserachQuantity[8],
                    Sep: client.newClientReserachQuantity[9],
                    Oct: client.newClientReserachQuantity[10],
                    Nov: client.newClientReserachQuantity[11],
                    Dec: client.newClientReserachQuantity[12],
                    subRows: client.categoryDetail?.map((category) => ({
                        rowId: category.rowId,
                        name: category.categoryName,
                        action: (
                            <Tooltip title={t('delete')} arrow>
                                <IconButton
                                    onClick={() => {
                                        setDeleteItem({
                                            value: category.categoryId,
                                            label: category.categoryName,
                                            title: 'category',
                                        });
                                        setFetchSpecItem({
                                            yearId: el.yearId,
                                            countryId: Number(selectCountry.value),
                                            companyId: el.companyId,
                                            businessUnitId: el.businessUnitId,
                                            placeId: el.placeId,
                                            placeTypeId: el.placeTypeId,
                                            typeofPriorityId: el.typeOfPriorityId,
                                            clientTypeId: el.clientTypeId,
                                            workPlaceCategory: el.workPlaceCategory,
                                            specId: spec.specId,
                                            modifiedBy: user,
                                            category: category.categoryName,
                                        });
                                        setShowDeleteModal(true);
                                    }}
                                    size="small">
                                    <DeleteOutlineIcon sx={{ width: 18, height: 18, color: '#FA5C7C' }} />
                                </IconButton>
                            </Tooltip>
                        ),
                        subRows: category.detail?.map((detail) => ({
                            parentRowId: el.rowId,
                            specId: spec.rowId,
                            clientId: client.rowId,
                            categoryId: category.rowId,
                            rowId: detail.rowId,
                            name: detail.rowName,
                            tip: detail.rowTooltip,
                            Jan: detail.monthValues[1],
                            Feb: detail.monthValues[2],
                            Mar: detail.monthValues[3],
                            Apr: detail.monthValues[4],
                            May: detail.monthValues[5],
                            Jun: detail.monthValues[6],
                            Jul: detail.monthValues[7],
                            Aug: detail.monthValues[8],
                            Sep: detail.monthValues[9],
                            Oct: detail.monthValues[10],
                            Nov: detail.monthValues[11],
                            Dec: detail.monthValues[12],
                            isDisableJan: detail.disStatus[1],
                            isDisableFeb: detail.disStatus[2],
                            isDisableMar: detail.disStatus[3],
                            isDisableApr: detail.disStatus[4],
                            isDisableMay: detail.disStatus[5],
                            isDisableJun: detail.disStatus[6],
                            isDisableJul: detail.disStatus[7],
                            isDisableAug: detail.disStatus[8],
                            isDisableSep: detail.disStatus[9],
                            isDisableOct: detail.disStatus[10],
                            isDisableNov: detail.disStatus[11],
                            isDisableDec: detail.disStatus[12],
                        })),
                    })),
                })),
            })),
        };
    });
    const applyFilterBtn = () => {
        setShowAlert(false);
        setFilterShow(false);
        setLoading(true);
        dispatch(setYearRedux(selectYear.value));
        const datas = {
            empId: Number(empId),
            yearId: Number(selectYear.value),
            companyId: Number(selectCompany.value),
            businessunitId: selectBusUnit.value,
            countryId: selectCountry.value,
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/GetBusinessunitCampaignCalendar',
            'POST',
            datas
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setDatas([...data]);
                    setLoading(false);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const handleSaveAllDataBtn = () => {
        const saveData = {
            busId: selectBusUnit ? selectBusUnit.value : 0,
            yearId: selectYear ? selectYear.value : 0,
            companyId: selectCompany ? selectCompany.value : 0,
            createdBy: user,
            calendarDatas: [...datas],
        };
        setLoading(true);
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/SaveBusinessunitCampaignCalendarData',
            'POST',
            saveData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((data) => {
                    applyFilterBtn();
                    setLoading(false);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <>
            <PromoTable
                checkedSwitchCopy={checkedSwitchCopy}
                setCheckedSwitchCopy={setCheckedSwitchCopy}
                isLoading={loading}
                data={tableData}
                columns={columns}
                isCheckBox={false}
                filterShow={filterShow}
                handlApplyBtn={applyFilterBtn}
                handleNewButton={() => setShowAddModal(true)}
                handleCopyBtn={() => setShowDuplicateModal(true)}
                handleSaveBtn={handleSaveAllDataBtn}
                handleCreateCycleMeeting={() => setShowCycleMeeting(true)}
                filter={<Filters filterComponentsData={filterComponentsData} />}
                setFilterShow={setFilterShow}
                columnPinningRight={['action']}
                showAlert={showAlert}
            />
            {showAddModal && (
                <AddModals showModal={showAddModal} setShowModal={setShowAddModal} getData={applyFilterBtn} />
            )}
            {showDuplicateModal && (
                <Duplicate
                    showModal={showDuplicateModal}
                    setShowModal={setShowDuplicateModal}
                    getData={applyFilterBtn}
                    filterYear={selectYear}
                    filterCompany={selectCompany}
                    filterCountry={selectCountry}
                    filterBusUnit={selectBusUnit}
                />
            )}
            {showCycleMeeting && (
                <CycleMeeting
                    showModal={showCycleMeeting}
                    setShowModal={setShowCycleMeeting}
                    getData={applyFilterBtn}
                    filterYear={selectYear}
                    filterCompany={selectCompany}
                    filterCountry={selectCountry}
                    filterBusUnit={selectBusUnit}
                />
            )}
            {showCyclePeriodEdit && (
                <EditCyclePeriod
                    showModal={showCyclePeriodEdit}
                    setShowModal={setShowCyclePeriodEdit}
                    getData={applyFilterBtn}
                    filterYear={selectYear}
                    filterCompany={selectCompany}
                    filterCountry={selectCountry}
                    filterBusUnit={selectBusUnit}
                />
            )}
            {showAddSpecModal && (
                <AddSpec
                    showModal={showAddSpecModal}
                    setShowModal={setShowAddSpecModal}
                    selectedBusUnit={selectBusUnit}
                    selectedDate={selectYear}
                    fetchData={fetchSpecItem}
                    getData={applyFilterBtn}
                    rowName={rowName}
                />
            )}
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    item={deleteItem}
                    setModalShow={setShowDeleteModal}
                    applyFilter={applyFilterBtn}
                    fetchData={fetchSpecItem}
                    rowName={rowName}
                />
            )}
            {showAddCategoryModal && (
                <AddCategory
                    showModal={showAddCategoryModal}
                    setShowModal={setShowAddCategoryModal}
                    specs={specItem}
                    applyFilter={applyFilterBtn}
                    fetchData={fetchSpecItem}
                />
            )}
            {showUpdateMeetingModal && (
                <UpdateMeeting
                    showModal={showUpdateMeetingModal}
                    setShowModal={setShowUpdateMeetingModal}
                    getData={applyFilterBtn}
                    prevMeeting={prevMeeting}
                    filterYear={selectYear}
                    filterCompany={selectCompany}
                    filterCountry={selectCountry}
                    filterBusUnit={selectBusUnit}
                />
            )}
        </>
    );
};

export default React.memo(Promo);
