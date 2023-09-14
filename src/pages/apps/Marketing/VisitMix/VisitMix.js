import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import AddVisitMix from './AddVisitMix';
import NewTable from './NewTable';
import { FetchApiPost } from '../../../../utils/http.helper';
import Filter from './Filter';
import BreadCrumb from '../../../../components/BreadCrumb';
import Table from './Table';
import ActivityType from './Translate/index';
import TaskManagementIndex from '../../TaskManagement/TaskManagementIndex';

// const data = [
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <Link to="/apps/marketing/visitmix/calendar"><i className="mdi mdi-plus table-icons4" /></Link>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
//     {
//         year: 20,
//         specialization: "Cardiology",
//         organizationType: 'Hospital',
//         ctg: 'A',
//         vFrq: 11,
//         dtbs: 11,
//         pcT: 21,
//         vQ: 21,
//         vShr: "%14",
//         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
//         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
//         edit: <div className="table-icons-cont">
//                 <i className="mdi mdi-check-bold table-icons"/>
//                 <i className="dripicons-copy table-icons1"/>
//                 <i className="dripicons-italic table-icons2"/>
//                 <i className="mdi mdi-delete table-icons3"/>
//             </div>
//     },
// ]

const VisitMix = () => {
    const { t } = useTranslation();
    const [isOpenAddVM, setIsOpenAddVM] = useState(false);

    const [tableData, setTableData] = useState([]);

    const history = useHistory();

    const addVisitMix = () => {
        setIsOpenAddVM(!isOpenAddVM);
        console.log(isOpenAddVM);
    };

    const columns = [
        {
            Header: t('YEAR'),
            accessor: 'year',
            sort: false,
            id: 1,
            name: t('Year'),
        },
        {
            Header: t('SPECIALIZATION'),
            accessor: 'specialization',
            sort: false,
            id: 2,
            name: t('Specialization'),
        },
        {
            Header: t('ORGANIZATION TYPE'),
            accessor: 'organizationType',
            sort: false,
            id: 3,
            name: t('Organization Type'),
        },
        {
            Header: t('CTG'),
            accessor: 'ctg',
            sort: false,
            id: 4,
            name: t('Category'),
        },
        {
            Header: t('V.FRQ'),
            accessor: 'vFrq',
            sort: false,
            id: 5,
            name: t('Visit Frequency'),
        },
        {
            Header: t('DTBS'),
            accessor: 'dtbs',
            sort: false,
            id: 6,
            name: t('Database'),
        },
        {
            Header: t('PC T.'),
            accessor: 'pcT',
            sort: false,
            id: 7,
            name: t('Promo Campaign Targeted'),
        },
        {
            Header: t('V.Q.'),
            accessor: 'vQ',
            sort: false,
            id: 8,
            name: t('Visit Quantity'),
        },
        {
            Header: t('V.SHR.'),
            accessor: 'vShr',
            sort: false,
            id: 9,
            name: t('Visit Share'),
        },
        {
            Header: t('P.SHR.'),
            accessor: 'pShr',
            sort: false,
            id: 10,
            name: t('Product Share'),
        },
        {
            Header: t('MIX'),
            accessor: 'mix',
            sort: false,
            id: 11,
            name: t('Mix'),
        },
        {
            Header: (
                <div className="table-edit-icon-cont" onClick={addVisitMix}>
                    <i className="uil-plus-circle table-edit-icon" />
                </div>
            ),
            accessor: 'edit',
            sort: false,
            id: 12,
            name: t('Add'),
        },
    ];

    const breadCrumbProps = [{ label: 'Home', url: '/apps/calendar' }, { label: 'Marketing' }, { label: 'Visit Mix ' }];

    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <div>
                {/* <Filter/> */}
                <Table tableData={tableData} setTableData={setTableData} />
            </div>
        </>
    );
};

export default VisitMix;
