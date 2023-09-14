import React, { useEffect, useState } from 'react';
import TableLayout from '../../../../../components/Tables';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { detailsData, tabOrDetails } from '../../../../../redux/annualProductMix/actions';
import { useTranslation } from 'react-i18next';
import Filter from './Filter';

const GeneralOverview = ({ setSelectTab }) => {
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();
    const [isFilter, setIsFilter] = useState(true);
    const [loading, setLoading] = useState(false);
    const [applyFilterData, setApplyFilterData] = useState(null);
    const [selectYear, setSelectYear] = useState();
    const [selectCompany, setSelectCompany] = useState();
    const [selectBusUnit, setSelectBusUnit] = useState();
    const [selectGlobalBrand, setSelectGlobalBrand] = useState([]);
    const [selectPlace, setSelectPlace] = useState([]);
    const [selectPlaceType, setSelectPlaceType] = useState([]);
    const [selectTypeOfPriority, setSelectTypeOfPriority] = useState([]);
    const [selectClientType, setSelectClientType] = useState();
    const [selectSpec, setSelectSpec] = useState([]);
    const [selectWorkPlace, setSelectWorkPlace] = useState();
    const [selectClient, setSelectClient] = useState();

    const getDetails = (data) => {
        setSelectTab({
            label: t('Promo Strategy'),
            key: 1,
        });
        // dispatch(tabOrDetails('details'));
        // dispatch(detailsData(data));
    };
    const columns = [
        {
            accessorKey: 'year',
            header: 'Year',
            muiTableBodyCellProps: {
                align: 'center',
            },
            size: 90,
        },
        { accessorKey: 'company', header: 'Company' },
        { accessorKey: 'busUnit', header: 'Business Unit' },
        { accessorKey: 'place', header: 'Place' },
        { accessorKey: 'placeType', header: 'Place Type' },
        { accessorKey: 'typeOf', header: 'Type of Priority' },
        { accessorKey: 'clientType', header: 'Client Type' },
        { accessorKey: 'globalBrand', header: 'Global Brand' },
        { accessorKey: 'spec', header: 'Specialization' },
        { accessorKey: 'workPlace', header: 'Workplace' },
        { accessorKey: 'client', header: 'Client' },
        { accessorKey: 'content', header: 'Content' },
        {
            accessorKey: 'details',
            header: 'Details',
            size: 50,
            Cell: ({ cell, row }) => {
                return (
                    <Icon
                        onClick={() => getDetails(row.original)}
                        path={mdiOpenInNew}
                        size={0.8}
                        style={{ cursor: 'pointer' }}
                    />
                );
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'indication',
            header: 'Indication',
            muiTableBodyCellProps: {
                align: 'center',
            },
            size: 80,
        },
        {
            accessorKey: 'profile',
            header: 'Profile',
            muiTableBodyCellProps: {
                align: 'center',
            },
            size: 80,
        },
        {
            id: 'a',
            header: 'A',
            enableResizing: false,
            columns: [
                {
                    accessorKey: 'visitQuantitiyA',
                    header: 'Visit Qty',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dIndicationA',
                    header: 'D.Indic',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dProfileA',
                    header: 'D.Profile',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dSubA',
                    header: 'D.Subs',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
            ],
        },
        {
            id: 'b',
            header: 'B',
            enableResizing: false,
            columns: [
                {
                    accessorKey: 'visitQuantitiyB',
                    header: 'Visit Qty',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dIndicationB',
                    header: 'D.Indic',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dProfileB',
                    header: 'D.Profile',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dSubB',
                    header: 'D.Subs',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
            ],
        },
        {
            id: 'c',
            header: 'C',
            enableResizing: false,
            columns: [
                {
                    accessorKey: 'visitQuantitiyC',
                    header: 'Visit Qty',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dIndicationC',
                    header: 'D.Indic',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dProfileC',
                    header: 'D.Profile',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
                {
                    accessorKey: 'dSubC',
                    header: 'D.Subs',
                    size: 100,
                    enableResizing: false,
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
            ],
        },
    ];

    const applyFilter = () => {
        if (applyFilterData === null) return;
        setLoading(true);
        FetchApiPost('services/VisitMix/ProductStrategy/GetProductStrategy', 'POST', applyFilterData)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        const arr = data?.map((data, index) => ({
                            year: data.yearId,
                            company: data.companyName,
                            globalBrand: data.brandName,
                            spec: data.specName,
                            orgType: data.organizationTypeName,
                            busUnit: data.businessUnitName,
                            place: data.placeName,
                            placeType: data.placeTypeName,
                            typeOf: data.typeOfPriorityName,
                            clientType: data.clientTypeName,
                            workPlace: data.workPlaceName,
                            client: data.clientName,
                            content: '',
                            details: '',
                            indication: data.indicationNumber,
                            profile: data.profileNumber,
                            visitQuantitiyA: data.visitQuantityA,
                            dIndicationA: data.indicationNumberA,
                            dProfileA: data.profileNumberA,
                            dSubA: data.subsA,
                            visitQuantitiyB: data.visitQuantityB,
                            dIndicationB: data.indicationNumberB,
                            dProfileB: data.profileNumberB,
                            dSubB: data.subsB,
                            visitQuantitiyC: data.visitQuantityC,
                            dIndicationC: data.indicationNumberC,
                            dProfileC: data.profileNumberC,
                            dSubC: data.subsC,
                        }));
                        setTableData(arr);
                        setLoading(false);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    const clearFilter = () => {
        setSelectYear();
        setSelectCompany();
        setSelectBusUnit();
        setSelectGlobalBrand([]);
        setSelectPlace([]);
        setSelectPlaceType([]);
        setSelectTypeOfPriority([]);
        setSelectClientType();
        setSelectSpec([]);
        setSelectWorkPlace();
        setSelectClient();
    };
    return (
        <>
            <TableLayout
                isLoading={loading}
                data={tableData}
                columns={columns}
                filter={
                    <Filter
                        setApplyFilterData={setApplyFilterData}
                        clearFilter={clearFilter}
                        selectYear={selectYear}
                        setSelectYear={setSelectYear}
                        selectCompany={selectCompany}
                        setSelectCompany={setSelectCompany}
                        selectBusUnit={selectBusUnit}
                        setSelectBusUnit={setSelectBusUnit}
                        selectGlobalBrand={selectGlobalBrand}
                        setSelectGlobalBrand={setSelectGlobalBrand}
                        selectPlace={selectPlace}
                        setSelectPlace={setSelectPlace}
                        selectPlaceType={selectPlaceType}
                        setSelectPlaceType={setSelectPlaceType}
                        selectTypeOfPriority={selectTypeOfPriority}
                        setSelectTypeOfPriority={setSelectTypeOfPriority}
                        selectClientType={selectClientType}
                        setSelectClientType={setSelectClientType}
                        selectSpec={selectSpec}
                        setSelectSpec={setSelectSpec}
                        selectWorkPlace={selectWorkPlace}
                        setSelectWorkPlace={setSelectWorkPlace}
                        selectClient={selectClient}
                        setSelectClient={setSelectClient}
                    />
                }
                filterShow={isFilter}
                setFilterShow={setIsFilter}
                isCheckBox={false}
                handlApplyBtn={applyFilter}
                handlClearBtn={clearFilter}
                isNewButton={false}
            />
        </>
    );
};

export default GeneralOverview;
