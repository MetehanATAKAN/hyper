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
import CalculateIcon from '@mui/icons-material/Calculate';
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
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PharmacySplitPercentProblem from '../../../../../components/Modals/PharmacySplitPercentProblem';
import Warning from '../../../../../components/TableActionsModals/Warning';
import Loading from '../../../../../components/Loading';

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

const ClientTable = () => {
    const { t } = useTranslation();

    const history = useHistory();
    const empId = Number(localStorage.getItem('userEmpId'));

    const [filterShow, setFilterShow] = useState(true);
    const [filterIcon, setFilterIcon] = useState(true);

    /**Localization */
    const language = localStorage.getItem('i18nextLng');

    /**Columns */
    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'days',
                header: t('Days'),
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
                },
            },
            {
                accessorKey: 'hour',
                header: t('Hour'),
                size: '75',
            },
            {
                accessorKey: 'time',
                header: t('Time'),
                size: '75',
            },
            {
                accessorKey: 'timeBetween',
                header: t('T.B.V'),
                size: '75',
            },
            {
                accessorKey: 'name',
                header: t('Name'),
                size: '75',
            },
            {
                accessorKey: 'targeted',
                header: t('Targeted'),
                size: '75',
            },
            {
                accessorKey: 'category',
                header: t('Category'),
                size: '75',
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
                    } else if (cell.getValue() === 'B') {
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
                    } else if (cell.getValue() === 'C') {
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
                },
            },
            {
                accessorKey: 'potential',
                header: t('Potential'),
                size: '75',
            },
            {
                accessorKey: 'avarageVisit',
                header: t('Avarage Visit'),
                size: '75',
            },
            {
                accessorKey: 'actualSales',
                header: t('Actual Sales'),
                size: '75',
            },
            {
                accessorKey: 'type',
                header: t('Type'),
                size: '75',
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
                    } else if (cell.getValue() === 'Pharmacy') {
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
                },
            },
            {
                accessorKey: 'spec',
                header: t('Specialization'),
                size: '75',
            },
            {
                accessorKey: 'connectedWorkplace',
                header: t('Connected Workplace'),
                size: '75',
            },
            {
                accessorKey: 'company',
                header: t('Company'),
                size: '75',
            },
            {
                accessorKey: 'busUnit',
                header: t('Business Unit'),
                size: '75',
            },
            {
                accessorKey: 'zone',
                header: t('Zone'),
                size: '75',
            },
            {
                accessorKey: 'zoneType',
                header: t('Zone Type'),
                size: '75',
            },
        ],
        []
        //end
    );

    /**Right Table Columns */
    const rightTableColumns = useMemo(
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
                },
            },
            {
                accessorKey: 'hour',
                header: 'Hour',
                size: '75',
            },
            {
                accessorKey: 'time',
                header: 'Time',
                size: '75',
            },
            {
                accessorKey: 'timeBetween',
                header: 'Time Between Visit',
                size: '75',
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: '75',
            },
            {
                accessorKey: 'targeted',
                header: 'Targeted',
                size: '75',
            },
            {
                accessorKey: 'category',
                header: 'Category',
                size: '75',
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
                    } else if (cell.getValue() === 'B') {
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
                    } else if (cell.getValue() === 'C') {
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
                },
            },
            {
                accessorKey: 'potential',
                header: 'Potential',
                size: '75',
            },
            {
                accessorKey: 'avarageVisit',
                header: 'Avarage Visit',
                size: '75',
            },
            {
                accessorKey: 'actualSales',
                header: 'Actual Sales',
                size: '75',
            },
            {
                accessorKey: 'type',
                header: 'Type',
                size: '75',
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
                    } else if (cell.getValue() === 'Pharmacy') {
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
                },
            },
            {
                accessorKey: 'spec',
                header: 'Specialization',
                size: '75',
            },
            {
                accessorKey: 'connectedWorkplace',
                header: 'Connected Workplace',
                size: '75',
            },
            {
                accessorKey: 'company',
                header: 'Company',
                size: '75',
            },
            {
                accessorKey: 'busUnit',
                header: 'Business Unit',
                size: '75',
            },
            {
                accessorKey: 'zone',
                header: 'Zone',
                size: '75',
            },
            {
                accessorKey: 'zoneType',
                header: 'Zone Type',
                size: '75',
            },
        ],
        []
        //end
    );

    /**Loading */
    const [calculateLoading, setCalculateLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    /**Warning */
    const [isWarning, setIsWarning] = useState(false);
    const [warningMessages, setWarningMessages] = useState('');

    const [applyFilter, setApplyFilter] = useState(false);
    const [clearFilter, setClearFilter] = useState(false);

    const [radio, setRadio] = useState(3);

    /** Original Data */
    const [originalData1, setOriginalData1] = useState([]);
    const [originalData2, setOriginalData2] = useState([]);

    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    const [draggingRow, setDraggingRow] = useState(null);
    const [hoveredTable, setHoveredTable] = useState(null);

    /**Loading */
    const [isLoading, setIsLoading] = useState(false);

    /**click calculate */
    const [isClickCalculate, setIsClickCalculate] = useState(false);
    const [isClickCalculateModal, setIsClickCalculateModal] = useState(false);

    /**click save */
    const [isClickSave, setIsClickSave] = useState(false);

    //Open right table
    const [rightTable, setRightTable] = useState(true);

    /**Days */
    const [days, setDays] = useState([
        {
            id: 1,
            name: 'Monday',
            abb: 'Mon',
            active: true,
        },
        {
            id: 2,
            name: 'Tuesday',
            abb: 'Tue',
            active: false,
        },
        {
            id: 3,
            name: 'Wednesday',
            abb: 'Wed',
            active: false,
        },
        {
            id: 4,
            name: 'Thursday',
            abb: 'Thu',
            active: false,
        },
        {
            id: 5,
            name: 'Friday',
            abb: 'Fri',
            active: false,
        },
    ]);

    /** On drag start Order Hospital */
    const orderHospital = (x) => {
        if (x.id === 'table-1-undefined') {
            if (x !== null && x?.id !== 'table-2-undefined' && x?.original.connectedId !== 0) {
                // setOriginalData2(data2);
                const id = x?.original.workPlaceId;
                const typeId = x?.original.typeId;

                const filteredData = originalData2?.filter((el) => el.workPlaceId === id && el.typeId === typeId);
                setData2(filteredData);
            }
        } else {
            //table-2-undefined

            if (x !== null && x?.id !== 'table-1-undefined' && x?.original.connectedId !== 0) {
                // setOriginalData2(data2);
                setOriginalData1(data1);
                const id = x?.original.workPlaceId;
                const typeId = x?.original.typeId;

                const filteredData = data1?.filter((el) => el.workPlaceId === id && el.typeId === typeId);
                setData1(filteredData);
            }
        }
    };

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

    /**Change active day */
    const changeActiveDay = (id) => {
        const newArr = days.map((data) => {
            if (data.id === id) {
                data.active = true;
            } else data.active = false;
            return data;
        });

        setDays(newArr);
    };

    /**calculate client */
    const calculate = () => {
        const body = {
            clients: data1?.map((item) => ({
                employeeId: item?.employeeId,
                loginEmployeeId: empId,
                year: item?.year,
                date: '2023-06-15T10:15:00.296Z',
                month: item?.month,
                week: item?.week,
                companyId: item?.companyId,
                businessUnitId: item?.businessUnitId,
                zoneId: item?.zoneId,
                placeId: item?.placeId,
                placeTypeId: item?.placeTypeId,
                typeOfPriorityId: item?.typeOfPriorityId,
                clientId: item?.nameId,
                clientName: item?.name,
                specId: item?.specId,
                microzoneId: item?.zoneId,
                workPlaceId: item?.workPlaceId,
                isRecommended: item?.isRecommended,
                criteria: item?.targeted,
                typeId: item?.typeId,
                type: item?.type,
                days: item?.days,
                order: item?.id,
                startTime: item?.hour,
                totalTime: item?.time,
                travellingTime: item?.travellingTime,
                category: item?.category,
                potential: item?.potential,
                avarageVisit: item?.avarageVisit,
                actualSales: item.actualSales,
                clientCount: item?.clientCount,
                specCount: null,
                a: item?.a,
                b: item?.b,
                c: item?.c,
            })),
        };

        if (data1?.length !== 0) {
            FetchApiPost('services/Daywork/MicroTarget/CorrectionClientPlan', 'POST', body).then((res) =>
                (async () => {
                    try {
                        setCalculateLoading(true);
                        if (res.status === 200 || res.status === 201) {
                            setIsClickCalculate(false);
                            setIsClickSave(true);

                            setCalculateLoading(false);

                            setData1([]);
                            setData2([]);
                            setIsLoading(false);

                            res.json().then((data) => {
                                const filteredData1 = data?.data?.filter((el) => el?.isRecommended === true);
                                const filteredData2 = data?.data?.filter((el) => el?.isRecommended === false);

                                setData1(
                                    filteredData1.map((item, index) => ({
                                        id: index + 1,
                                        employeeId: item?.employeeId,
                                        loginEmployeeId: empId,
                                        date: item?.date,
                                        days: item?.days,
                                        hour: item?.startTime,
                                        time: item?.totalTime,
                                        timeBetween: item?.tbv,
                                        name: item?.clientName,
                                        nameId: item?.clientId,
                                        targeted: item?.criteria,
                                        category: item?.category,
                                        potential: item?.potential,
                                        avarageVisit: item?.avarageVisit,
                                        actualSales: item?.actualSales,
                                        type: item?.type,
                                        typeId: item?.typeId,
                                        spec: item?.specName,
                                        specId: item?.specId,
                                        connectedWorkplace: item?.workPlaceName,
                                        workPlaceId: item?.workPlaceId,
                                        company: item?.companyName,
                                        companyId: item?.companyId,
                                        busUnit: item?.businessUnitName,
                                        businessUnitId: item?.businessUnitId,
                                        zone: item?.zoneName,
                                        zoneId: item?.zoneId,
                                        zoneType: '-',
                                        year: item?.year,
                                        month: item?.month,
                                        week: item?.week,
                                        placeId: item?.placeId,
                                        placeName: item?.placeName,
                                        placeTypeId: item?.placeTypeId,
                                        placeTypeName: item?.placeTypeName,
                                        typeOfPriorityId: item?.typeOfPriorityId,
                                        typeOfPriorityName: item?.typeOfPriorityName,
                                        isRecommended: item?.isRecommended,
                                        travellingTime: item?.travellingTime,
                                        clientCount: item?.clientCount,
                                        a: item?.a,
                                        b: item?.b,
                                        c: item?.c,
                                    }))
                                );
                                setOriginalData1(
                                    filteredData1.map((item, index) => ({
                                        id: index + 1,
                                        employeeId: item?.employeeId,
                                        loginEmployeeId: empId,
                                        date: item?.date,
                                        days: item?.days,
                                        hour: item?.startTime,
                                        time: item?.totalTime,
                                        timeBetween: item?.tbv,
                                        name: item?.clientName,
                                        nameId: item?.clientId,
                                        targeted: item?.criteria,
                                        category: item?.category,
                                        potential: item?.potential,
                                        avarageVisit: item?.avarageVisit,
                                        actualSales: item?.actualSales,
                                        type: item?.type,
                                        typeId: item?.typeId,
                                        spec: item?.specName,
                                        specId: item?.specId,
                                        connectedWorkplace: item?.workPlaceName,
                                        workPlaceId: item?.workPlaceId,
                                        company: item?.companyName,
                                        companyId: item?.companyId,
                                        busUnit: item?.businessUnitName,
                                        businessUnitId: item?.businessUnitId,
                                        zone: item?.zoneName,
                                        zoneId: item?.zoneId,
                                        zoneType: '-',
                                        year: item?.year,
                                        month: item?.month,
                                        week: item?.week,
                                        placeId: item?.placeId,
                                        placeName: item?.placeName,
                                        placeTypeId: item?.placeTypeId,
                                        placeTypeName: item?.placeTypeName,
                                        typeOfPriorityId: item?.typeOfPriorityId,
                                        typeOfPriorityName: item?.typeOfPriorityName,
                                        isRecommended: item?.isRecommended,
                                        travellingTime: item?.travellingTime,
                                        clientCount: item?.clientCount,
                                        a: item?.a,
                                        b: item?.b,
                                        c: item?.c,
                                    }))
                                );
                                setData2(
                                    filteredData2.map((item, index) => ({
                                        id: index + 1,
                                        employeeId: item?.employeeId,
                                        loginEmployeeId: empId,
                                        date: item?.date,
                                        days: item?.days,
                                        hour: item?.startTime,
                                        time: item?.totalTime,
                                        timeBetween: item?.tbv,
                                        name: item?.clientName,
                                        nameId: item?.clientId,
                                        targeted: item?.criteria,
                                        category: item?.category,
                                        potential: item?.potential,
                                        avarageVisit: item?.avarageVisit,
                                        actualSales: item?.actualSales,
                                        type: item?.type,
                                        typeId: item?.typeId,
                                        spec: item?.specName,
                                        specId: item?.specId,
                                        connectedWorkplace: item?.workPlaceName,
                                        workPlaceId: item?.workPlaceId,
                                        company: item?.companyName,
                                        companyId: item?.companyId,
                                        busUnit: item?.businessUnitName,
                                        businessUnitId: item?.businessUnitId,
                                        zone: item?.zoneName,
                                        zoneId: item?.zoneId,
                                        zoneType: '-',
                                        year: item?.year,
                                        month: item?.month,
                                        week: item?.week,
                                        placeId: item?.placeId,
                                        placeName: item?.placeName,
                                        placeTypeId: item?.placeTypeId,
                                        placeTypeName: item?.placeTypeName,
                                        typeOfPriorityId: item?.typeOfPriorityId,
                                        typeOfPriorityName: item?.typeOfPriorityName,
                                        isRecommended: item?.isRecommended,
                                        travellingTime: item?.travellingTime,
                                        clientCount: item?.clientCount,
                                        a: item?.a,
                                        b: item?.b,
                                        c: item?.c,
                                    }))
                                );
                                setOriginalData2(
                                    filteredData2.map((item, index) => ({
                                        id: index + 1,
                                        employeeId: item?.employeeId,
                                        loginEmployeeId: empId,
                                        date: item?.date,
                                        days: item?.days,
                                        hour: item?.startTime,
                                        time: item?.totalTime,
                                        timeBetween: item?.tbv,
                                        name: item?.clientName,
                                        nameId: item?.clientId,
                                        targeted: item?.criteria,
                                        category: item?.category,
                                        potential: item?.potential,
                                        avarageVisit: item?.avarageVisit,
                                        actualSales: item?.actualSales,
                                        type: item?.type,
                                        typeId: item?.typeId,
                                        spec: item?.specName,
                                        specId: item?.specId,
                                        connectedWorkplace: item?.workPlaceName,
                                        workPlaceId: item?.workPlaceId,
                                        company: item?.companyName,
                                        companyId: item?.companyId,
                                        busUnit: item?.businessUnitName,
                                        businessUnitId: item?.businessUnitId,
                                        zone: item?.zoneName,
                                        zoneId: item?.zoneId,
                                        zoneType: '-',
                                        year: item?.year,
                                        month: item?.month,
                                        week: item?.week,
                                        placeId: item?.placeId,
                                        placeName: item?.placeName,
                                        placeTypeId: item?.placeTypeId,
                                        placeTypeName: item?.placeTypeName,
                                        typeOfPriorityId: item?.typeOfPriorityId,
                                        typeOfPriorityName: item?.typeOfPriorityName,
                                        isRecommended: item?.isRecommended,
                                        travellingTime: item?.travellingTime,
                                        clientCount: item?.clientCount,
                                        a: item?.a,
                                        b: item?.b,
                                        c: item?.c,
                                    }))
                                );
                            });
                        } else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                        } else if (res.status === 409) {
                            setIsWarning(true);
                            res.json().then((data) => setWarningMessages(data?.errors[0]));
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    };

    /**save client */
    const save = () => {
        if (isClickSave) {
            const body = {
                clients: data1?.map((item) => ({
                    employeeId: item?.employeeId,
                    loginEmployeeId: empId,
                    year: item?.year,
                    date: item?.date, //'2023-06-15T10:15:00.296Z',
                    month: item?.month,
                    week: item?.week,
                    companyId: item?.companyId,
                    businessUnitId: item?.businessUnitId,
                    zoneId: item?.zoneId,
                    placeId: item?.placeId,
                    placeTypeId: item?.placeTypeId,
                    typeOfPriorityId: item?.typeOfPriorityId,
                    clientId: item?.nameId,
                    clientName: item?.name,
                    specId: item?.specId,
                    microzoneId: item?.zoneId,
                    workPlaceId: item?.workPlaceId,
                    isRecommended: item?.isRecommended,
                    criteria: item?.targeted,
                    typeId: item?.typeId,
                    type: item?.type,
                    days: item?.days,
                    order: item?.id,
                    startTime: item?.hour,
                    totalTime: item?.time,
                    travellingTime: item?.travellingTime,
                    category: item?.category,
                    potential: item?.potential,
                    avarageVisit: item?.avarageVisit,
                    actualSales: item.actualSales,
                    clientCount: item?.clientCount,
                    specCount: null,
                    a: item?.a,
                    b: item?.b,
                    c: item?.c,
                })),
            };
            if (data1?.length !== 0) {
                setSaveLoading(true);
                FetchApiPost('services/Daywork/MicroTarget/CreateClientPlan', 'POST', body).then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200 || res.status === 201) {
                                setSaveLoading(false);
                            } else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                                setSaveLoading(false);
                            } else {
                                setSaveLoading(false);
                            }
                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                );
            }
        } else setIsClickCalculate(true);
    };

    const handleExportData = (datas) => {
        const headings = [columns.map((x) => x.header)];
        // const allData = datas.map((row) => row.original);

        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);

        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, datas, { origin: 'A2', skipHeader: true });
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
    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const [isStripe, setIsStripe] = useState(false);
    // const [filterShow, setFilterShow] = useState(true);
    const openFilterBox = () => {
        setFilterShow(!filterShow);
    };

    useEffect(() => {
        if (draggingRow) {
            orderHospital(draggingRow);
        }
    }, [draggingRow]);

    return (
        <>
            <Box>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={rightTable === false ? 12 : 8}>
                        <MaterialReactTable
                            {...commonTableProps}
                            data={data1}
                            localization={{
                                move: language === 'tr' ? 'Taşıma' : language === 'ru' ? 'двигаться' : 'Move',
                                noRecordsToDisplay:
                                    language === 'tr'
                                        ? 'Gösterilecek kayıt yok'
                                        : language === 'ru'
                                        ? 'Нет записей для отображения'
                                        : 'No records to display',
                                rowsPerPage:
                                    language === 'tr'
                                        ? 'Sayfa başına satır'
                                        : language === 'ru'
                                        ? 'Строк на странице'
                                        : 'Rows per page',
                            }}
                            autoResetPageIndex={false}
                            enableRowOrdering
                            enableSorting={false}
                            enableColumnOrdering
                            defaultColumn={{
                                size: 100,
                            }}
                            getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
                            // onHoveredRowChange={}
                            muiTableBodyRowDragHandleProps={({ table }) => ({
                                onDragEnd: () => {
                                    const { draggingRow, hoveredRow } = table.getState();
                                    console.log(draggingRow, hoveredRow);
                                    if (hoveredRow && draggingRow) {
                                        if (hoveredTable === 'table-1') {
                                            if (draggingRow.original.workPlaceId === hoveredRow.original.workPlaceId) {
                                                data1.splice(
                                                    hoveredRow.index,
                                                    0,
                                                    data1.splice(draggingRow.index, 1)[0]
                                                );
                                                setData1([...data1]);
                                            }
                                            setIsClickSave(false);
                                            // setData2(originalData2);
                                        } else {
                                            setData2((data2) => [...data2, draggingRow.original]);
                                            setOriginalData2([...originalData2, draggingRow.original]);
                                            setData1((data1) => data1.filter((d) => d !== draggingRow.original));
                                            setIsClickSave(false);
                                        }
                                    }
                                    setHoveredTable(null);
                                },
                            })}
                            muiTablePaperProps={({ table }) => ({
                                onDragEnter: () => setHoveredTable('table-1'),
                            })}
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
                                    zone: false,
                                    zoneType: false,
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
                                        <MRT_ToolbarAlertBanner table={table} />
                                        <MRT_ToolbarDropZone table={table} />
                                        <div className="table-top-toolbar-menu d-flex justify-content-between">
                                            <div className="table-days">
                                                {days.map((data) => (
                                                    <button
                                                        onClick={() => changeActiveDay(data.id)}
                                                        className={data.active === true && 'active'}
                                                        key={data.id}>
                                                        <span>{data.abb}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="toolbar">
                                                <div
                                                    className="item-1"
                                                    style={{
                                                        display: 'flex',
                                                        gap: '4px',
                                                        alignSelf: 'center',
                                                    }}></div>
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
                                                            <IconButton aria-label="more" onClick={save}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                        <Tooltip title="Calculate" arrow>
                                                            <IconButton aria-label="more" onClick={calculate}>
                                                                <CalculateIcon />
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
                                                                onClick={() => handleExportData(data1)}
                                                                variant="contained"
                                                                disableRipple>
                                                                <DownloadIcon />
                                                                All Data
                                                            </MenuItem>
                                                            <MenuItem
                                                                disabled={
                                                                    !table.getIsSomeRowsSelected() &&
                                                                    !table.getIsAllRowsSelected()
                                                                }
                                                                onClick={() =>
                                                                    handleExportRows(
                                                                        table.getSelectedRowModel().flatRows
                                                                    )
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
                                                            <MenuItem
                                                                onClick={() => setIsStripe(!isStripe)}
                                                                disableRipple>
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
                                                        {rightTable === true ? (
                                                            <KeyboardDoubleArrowRightIcon />
                                                        ) : (
                                                            <KeyboardDoubleArrowLeftIcon />
                                                        )}
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
                                                                setClearFilter={setClearFilter}
                                                                clearFilter={clearFilter}
                                                                setTableData1={setData1}
                                                                setTableData2={setData2}
                                                                orgData1={setOriginalData1}
                                                                orgData2={setOriginalData2}
                                                                setLoading={setIsLoading}
                                                                radio={radio}
                                                            />
                                                        </div>
                                                        <hr
                                                            style={{
                                                                margin: 0,
                                                                padding: 0,
                                                                color: '#CED4DA',
                                                                opacity: 1,
                                                            }}
                                                        />
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
                        {rightTable && (
                            <MaterialReactTable
                                {...commonTableProps}
                                data={data2}
                                localization={{
                                    move: language === 'tr' ? 'Taşıma' : language === 'ru' ? 'двигаться' : 'Move',
                                    noRecordsToDisplay:
                                        language === 'tr'
                                            ? 'Gösterilecek kayıt yok'
                                            : language === 'ru'
                                            ? 'Нет записей для отображения'
                                            : 'No records to display',
                                    rowsPerPage:
                                        language === 'tr'
                                            ? 'Sayfa başına satır'
                                            : language === 'ru'
                                            ? 'Строк на странице'
                                            : 'Rows per page',
                                }}
                                autoResetPageIndex={false}
                                enableRowOrdering
                                enableSorting={false}
                                enableColumnOrdering
                                defaultColumn={{
                                    size: 100,
                                }}
                                getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
                                muiTableBodyRowDragHandleProps={({ table }) => ({
                                    onDragEnd: () => {
                                        const { draggingRow, hoveredRow } = table.getState();
                                        console.log(hoveredTable);
                                        console.log(draggingRow, hoveredRow);
                                        if (hoveredTable === 'table-1') {
                                            setData1([...originalData1, draggingRow.original]);
                                            setOriginalData2(() =>
                                                originalData2.filter((d) => d.id !== draggingRow.original.id)
                                            );
                                            setData2(() =>
                                                originalData2.filter((d) => d.id !== draggingRow.original.id)
                                            );
                                            setIsClickSave(false);
                                        } else {
                                            console.log(draggingRow.original);
                                            setData1(originalData1);
                                            // setData2(()=>originalData2.filter((d)=> d !== draggingRow.original))
                                        }
                                        setHoveredTable(null);
                                    },
                                })}
                                muiTablePaperProps={{
                                    onDragEnter: () => setHoveredTable('table-2'),
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
                                        zoneType: false,
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
                                                        }}></div>
                                                    <Box>
                                                        <MRT_GlobalFilterTextField table={table} />
                                                        <MRT_ToggleGlobalFilterButton table={table} />

                                                        <>
                                                            <Tooltip title="Table Actions" arrow>
                                                                <IconButton
                                                                    aria-label="more"
                                                                    id="long-button"
                                                                    aria-controls={open2 ? 'long-menu' : undefined}
                                                                    aria-expanded={open2 ? 'true' : undefined}
                                                                    aria-haspopup="true"
                                                                    onClick={handleClick2}>
                                                                    <MoreHorizIcon />
                                                                </IconButton>
                                                            </Tooltip>

                                                            <StyledMenu
                                                                id="demo-customized-menu"
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'demo-customized-button',
                                                                }}
                                                                anchorEl={anchorEl2}
                                                                open={open2}
                                                                onClose={handleClose2}>
                                                                <MenuItem
                                                                    color="primary"
                                                                    onClick={() => handleExportData(data2)}
                                                                    variant="contained"
                                                                    disableRipple>
                                                                    <DownloadIcon />
                                                                    All Data
                                                                </MenuItem>
                                                                <MenuItem
                                                                    disabled={
                                                                        !table.getIsSomeRowsSelected() &&
                                                                        !table.getIsAllRowsSelected()
                                                                    }
                                                                    onClick={() =>
                                                                        handleExportRows(
                                                                            table.getSelectedRowModel().flatRows
                                                                        )
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
                                                                <MenuItem
                                                                    onClick={() => setIsStripe(!isStripe)}
                                                                    disableRipple>
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
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Loading loading={calculateLoading} />
            <Loading loading={saveLoading} />
            {isClickCalculate && (
                <PharmacySplitPercentProblem
                    messages={'First you have to do the calculation.'}
                    show={isClickCalculate}
                    handleClose={() => setIsClickCalculate(false)}
                />
            )}
            {isWarning && <Warning modalShow={isWarning} setModalShow={setIsWarning} messages={warningMessages} />}
        </>
    );
};

export default ClientTable;
