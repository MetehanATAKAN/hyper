import React, { useEffect, useMemo, useState } from 'react';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import Filters from './Filters';
import Dropdowns from '../../../../components/Dropdowns';
import { Tooltip } from '@mui/material';
import Duplicate from './Duplicate';

const PromoRes = () => {

    const [tableData, setTableData] = useState([
        // {
        //     id:1,
        //     name:'Hospital / A // Devlet //  Physician // DB 300',
        //     subRows:[
        //         {
        //             id:2,
        //             name:'Policlinic / A&B / DB-300',
        //             subRows:[
        //                 {
        //                     id:3,
        //                     name:'NEUROLOGY //DB-225 //',
        //                     subRows: [
        //                         {
        //                             id:4,
        //                             name:'A / DB-50 /',
        //                             subRows:[
        //                                 {
        //                                     id:5,
        //                                     name:'ZT SPEC QTT',
        //                                     Jan: 1,
        //                                     Feb: 2,
        //                                     Mar: 3,
        //                                     Apr: 4,
        //                                     May: 5,
        //                                     Jun: 6,
        //                                     Jul: 7,
        //                                     Aug: 8,
        //                                     Sep: 9,
        //                                     Oct: 10,
        //                                     Nov: 11,
        //                                     Dec: 12,
        //                                     total:256,
        //                                     action:null
        //                                 },
        //                                 {
        //                                     id:6,
        //                                     name:'marketing research monthly qtt',
        //                                     Jan: 1,
        //                                     Feb: 2,
        //                                     Mar: 3,
        //                                     Apr: 4,
        //                                     May: 5,
        //                                     Jun: 6,
        //                                     Jul: 7,
        //                                     Aug: 8,
        //                                     Sep: 9,
        //                                     Oct: 10,
        //                                     Nov: 11,
        //                                     Dec: 12,
        //                                     total:256,
        //                                     action:null
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     id:1,
        //     name:'Pharmacy / A // Devlet //  - / / - /- / DB 300 ',
        //     subRows:[
        //         {
        //             id:2,
        //             name:'Pharmacy / A // Devlet //  - / / - /- / DB 300 ',
        //             subRows:[
        //                 {
                            
        //                         id:4,
        //                         name:'A / DB-50 /',
        //                         subRows:[
        //                             {
        //                                 id:5,
        //                                 name:'ZT SPEC QTT',
        //                                 Jan: 1,
        //                                 Feb: 2,
        //                                 Mar: 3,
        //                                 Apr: 4,
        //                                 May: 5,
        //                                 Jun: 6,
        //                                 Jul: 7,
        //                                 Aug: 8,
        //                                 Sep: 9,
        //                                 Oct: 10,
        //                                 Nov: 11,
        //                                 Dec: 12,
        //                                 total:256,
        //                                 action:null
        //                             },
        //                             {
        //                                 id:6,
        //                                 name:'marketing research monthly qtt',
        //                                 Jan: 1,
        //                                 Feb: 2,
        //                                 Mar: 3,
        //                                 Apr: 4,
        //                                 May: 5,
        //                                 Jun: 6,
        //                                 Jul: 7,
        //                                 Aug: 8,
        //                                 Sep: 9,
        //                                 Oct: 10,
        //                                 Nov: 11,
        //                                 Dec: 12,
        //                                 total:256,
        //                                 action:null
        //                             }
        //                         ]
                            
        //                 }
        //             ]
        //         }
        //     ]
        // }
    ])


    /**Duplicate */
    const [isDuplicate, setIsDuplicate] = useState(false);

    /**Loading */
    const [loading, setLoading] = useState(false);

    const [filterShow, setFilterShow] = useState(true);
    const [year, setYear] = useState(new Date().getFullYear());
    const [months, setMonths] = useState([]);
    const [columns, setColumns] = useState([]);

    /**Clear */
    const [isClear, setIsClear] = useState(false);
    /**Apply */
    const [isApply, setIsApply] = useState(false);

    /**Click Row Info */
    const [clickRow, setClickRow] = useState(null);

   
    const statusOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        }
    ]

    const statusClick = (e, obj, status) => {
        console.log(e,obj,status);
        setClickRow(obj);
        if (status.id === 0) {
        }
        else if (status.id === 9) {
        }
    }
    
    useEffect(() => {
        const newMonths = [];
        for (let i = 0; i < 12; i++) {
            const month = new Date(year, i);
            const monthName = month.toLocaleString('en', { month: 'long' });
            const monthShortName = month.toLocaleString('en', { month: 'short' });
            newMonths.push({ name: monthName, shortName: monthShortName });
        }
        setMonths(newMonths);
    }, [year]);
    const otherCol = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: '',
                size:275,
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
                                                name[3].trim() === 'A'
                                                    ? 'rgba(10, 207, 151, 0.15)'
                                                    : name[3].trim() === 'B'
                                                    ? 'rgba(253, 126, 20, 0.15)'
                                                    : name[3].trim() === 'C'
                                                    ? 'rgba(250, 92, 124,0.15)'
                                                    : 'rgba(10, 207, 151, 0.15)',
                                            color:
                                                name[3].trim() === 'A'
                                                    ? 'rgb(10, 207, 151)'
                                                    : name[3].trim() === 'B'
                                                    ? 'rgb(253, 126, 20)'
                                                    : name[3].trim() === 'C'
                                                    ? 'rgb(250, 92, 124)'
                                                    : 'rgb(10, 207, 151)',
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
                accessorKey: 'total',
                header: 'TOTAL',
            },
            // {
            //     accessorKey: 'action',
            //     header: '',
            //     enableColumnFilter: false,
            //     enableColumnDragging: false,
            //     enableColumnActions: false,
            //     size: 20,
            // },
            {
                header: '',
                accessorKey: 'action',
                size: '50',
                enableColumnFilter: false,
                enableColumnDragging: false,
                enableColumnActions: false,
                muiTableBodyCellProps: {
                    align: 'right',
                },
                Cell: ({ cell, row }) => {
                    console.log(cell,row);
                    return (
                        <Dropdowns
                            option={statusOptions}
                            onClick={statusClick}
                            obj={row.original}
                        />
                    )
                },

            }
        ],
        []
    );

    useEffect(() => {
        const monthColumns = months.map((el, i) => ({
            accessorKey: el.shortName,
            header: el.shortName.toUpperCase(),
            size: 100,
        }));
        const colStart = otherCol.slice(0, 1);
        const colEnd = otherCol.slice(1);
        const colResult = [...colStart, ...monthColumns, ...colEnd];
        setColumns(colResult);
    }, [months, otherCol]);
    return (
        <>
        <TableAccordion
            data={tableData}
            columns={columns}
            isCheckBox={false}
            filterShow={filterShow}
            isShowNewBtn={false}
            isLoading={loading}
            handlClearBtn={()=>setIsClear(true)}
            handlApplyBtn={()=>setIsApply(true)}
            isDuplicateButton={true}
            setIsDuplicate={setIsDuplicate}
            filter={
                <Filters
                    tableData={tableData}
                    setTableData={setTableData}
                    loading={loading}
                    setLoading={setLoading}
                    isClear={isClear}
                    setIsClear={setIsClear}
                    isApply={isApply}
                    setIsApply={setIsApply}
                />
            }
            setFilterShow={setFilterShow}
            columnPinningRight={['action']}
            expandSize={100}
            maxExpandSize={100}
        />
        {
            isDuplicate && (
                <Duplicate
                showModal={isDuplicate}
                setShowModal={setIsDuplicate}

                />
            )
        }
        </>
    );
};

export default React.memo(PromoRes);
