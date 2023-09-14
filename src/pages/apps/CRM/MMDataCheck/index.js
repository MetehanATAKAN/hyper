import React, { useEffect, useState } from 'react';
import Table from './Table';
import Filter from './Filter';
import Table2 from './Table2';
import TableVisitEvaluation from './TableVisitEvaluation';
import TableLoyalty from './TableLoyalty';
import BreadCrumb from '../../../../components/BreadCrumb';
import TableActions from './TableActions';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import TableWants from './TableWants';
import TableDataCheck from './TableDataCheck';
import TableNumberOfPations from './TableNumberOfPations';

const MMDataCheckIndex = () => {
    const history = useHistory();

    const [tableData, setTableData] = useState([]);
    const [tableItem, setTableItem] = useState([]);

    const [noDataModalShow, setNoDataModalShow] = useState(false);

    const [selectReportTypeName, setSelectReportTypeName] = useState('Number of Patient');
    const [percentOfBox, setPercentOfBox] = useState('Percent');

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);

    const [isApply, setIsApply] = useState(false);

    const [isDelete, setIsDelete] = useState(false);

    //report type
    const [reportType, setReportType] = useState([
        {
            value: 1,
            label: 'Number of Patient',
        },
        {
            value: 2,
            label: 'Loyalty',
        },
        {
            value: 3,
            label: 'Visit Evaluation',
        },
        {
            value: 4,
            label: 'Wants',
        },
    ]);
    const [selectReportType, setSelectReportType] = useState({
        value: 1,
        label: 'Number of Patient',
    });

    // filter
    const [isFilter, setIsFilter] = useState(true);

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'MM Data Check', url: '/apps/CRM/MMDataCheck' },
        { label: selectReportTypeName },
    ];

    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <>
                {selectReportType.value === 1 && (
                    <TableNumberOfPations
                        reportType={reportType}
                        selectReportType={selectReportType}
                        setSelectReportType={setSelectReportType}
                        setIsApply={setIsApply}
                        isApply={isApply}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                )}
                {selectReportType.value === 2 && (
                    <TableLoyalty
                        reportType={reportType}
                        selectReportType={selectReportType}
                        setSelectReportType={setSelectReportType}
                        setIsApply={setIsApply}
                        isApply={isApply}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                )}
                {selectReportType.value === 3 && (
                    <TableVisitEvaluation
                        reportType={reportType}
                        selectReportType={selectReportType}
                        setSelectReportType={setSelectReportType}
                        setIsApply={setIsApply}
                        isApply={isApply}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                )}
                {selectReportType.value === 4 && (
                    <TableWants
                        reportType={reportType}
                        selectReportType={selectReportType}
                        setSelectReportType={setSelectReportType}
                        setIsApply={setIsApply}
                        isApply={isApply}
                        isDelete={isDelete}
                        setIsDelete={setIsDelete}
                    />
                )}
            </>
        </>
    );
};

export default MMDataCheckIndex;
