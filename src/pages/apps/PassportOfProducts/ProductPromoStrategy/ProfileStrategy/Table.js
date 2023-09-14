import { mdiDotsVertical } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import PaginationTable from '../../../../../components/PaginationTable'
import { useTranslation } from 'react-i18next'
import ErrorInput from '../ErrorInput'

const TableProfileStrategy = ({
    tableData, 
    setTableData, 
    tableItems, 
    setTableItems,
    totalItems,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    setTotalItems,
    setSelectTab
}) => {

    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const exceptThisSymbols = ["e", "E", "+", "-", ".", "," , "*", "/", " "];

    const tableHeaderName = [
        'Company',
        'Global Brand',
        'Indication',
        'Profile',
        'Specialization',
        'Details',

       'Priority',
       'Category',
       'P.N',
       'Needs Qty',
       'Visit Qty',
       'Months',
       'Planned Loyalty',

       'Priority',
       'Category',
       'P.N',
       'Needs Qty',
       'Visit Qty',
       'Months',
       'Planned Loyalty',

       'Priority',
       'Category',
       'P.N',
       'Needs Qty',
       'Visit Qty',
       'Months',
       'Planned Loyalty',
        <Icon path={mdiDotsVertical} size={1} />

    ]

    // const [tableData, setTableData] = useState([
    //     {
    //         id: 0,
    //         company: 'TR',
    //         globalBrand: 'ALMIBA',
    //         indication: 72,
    //         profile: 15,
    //         specialization:'NEUROLOGIST',
    //         details: <Icon path={mdiOpenInNew} size={1} />,
           
    //         groupA: {
    //             priority: <input/>,
    //             category: 'A',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupB: {
    //             priority: <input/>,
    //             category: 'A',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupC: {
    //             priority: <input/>,
    //             category: 'A',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         action: <Icon path={mdiDotsVertical} size={1} />
    //     },
    //     {
    //         id: 1,
    //         company: 'TR',
    //         globalBrand: 'ALMIBA',
    //         indication: 72,
    //         profile: 15,
    //         specialization:'NEUROLOGIST',
    //         details: <Icon path={mdiOpenInNew} size={1} />,
           
    //         groupA: {
    //             priority: <input/>,
    //             category: 'B',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupB: {
    //             priority: <input/>,
    //             category: 'B',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupC: {
    //             priority: <input/>,
    //             category: 'B',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         action: <Icon path={mdiDotsVertical} size={1} />
    //     },
    //     {
    //         id: 2,
    //         company: 'TR',
    //         globalBrand: 'ALMIBA',
    //         indication: 72,
    //         profile: 15,
    //         specialization:'NEUROLOGIST',
    //         details: <Icon path={mdiOpenInNew} size={1} />,
           
    //         groupA: {
    //             priority: <input/>,
    //             category: 'C',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupB: {
    //             priority: <input/>,
    //             category: 'C',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupC: {
    //             priority: <input/>,
    //             category: 'C',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         action: <Icon path={mdiDotsVertical} size={1} />
    //     },
    // ])

    // const [tableItems, setTableItems] = useState([
    //     {
    //         id: 0,
    //         company: 'TR',
    //         globalBrand: 'ALMIBA',
    //         indication: 72,
    //         profile: 15,
    //         specialization:'NEUROLOGIST',
    //         details: <Icon path={mdiOpenInNew} size={1} />,
           
    //         groupA: {
    //             priority: <input/>,
    //             category: 'A',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupB: {
    //             priority: <input/>,
    //             category: 'A',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupC: {
    //             priority: <input/>,
    //             category: 'A',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         action: <Icon path={mdiDotsVertical} size={1} />
    //     },
    //     {
    //         id: 1,
    //         company: 'TR',
    //         globalBrand: 'ALMIBA',
    //         indication: 72,
    //         profile: 15,
    //         specialization:'NEUROLOGIST',
    //         details: <Icon path={mdiOpenInNew} size={1} />,
           
    //         groupA: {
    //             priority: <input/>,
    //             category: 'B',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupB: {
    //             priority: <input/>,
    //             category: 'B',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupC: {
    //             priority: <input/>,
    //             category: 'B',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         action: <Icon path={mdiDotsVertical} size={1} />
    //     },
    //     {
    //         id: 2,
    //         company: 'TR',
    //         globalBrand: 'ALMIBA',
    //         indication: 72,
    //         profile: 15,
    //         specialization:'NEUROLOGIST',
    //         details: <Icon path={mdiOpenInNew} size={1} />,
           
    //         groupA: {
    //             priority: <input/>,
    //             category: 'C',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupB: {
    //             priority: <input/>,
    //             category: 'C',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         groupC: {
    //             priority: <input/>,
    //             category: 'C',
    //             pn: '-',
    //             needsQty: 0,
    //             visitQty:0,
    //             months:0,
    //             plannedLoyalty:'25%'
    //         },
    //         action: <Icon path={mdiDotsVertical} size={1} />
    //     },
    // ])

    const [focusData, setFocusData] = useState(null);

   const focusInput = (priority,id) => {
    setFocusData({priority,id})
   }
   
    
    const changePriority = (e,data) => {
        
        const tableLength = tableData.length;
        const value = Number(e.target.value); // 10
        let x = tableData.map((item,index)=> index +1);
       
        if(value <= tableLength) {
            const orderArr =tableData.map((item,index)=>{
                if(item.groups[0].priority !== '-') {
                    const a = x.filter(y => y !==item.groups[0].priority);
                    x= a;
                }
                return index+1
            })

            
            if(x.includes(value) && x[0] === value) {            
                const newTable =tableData.map(item => {
                    if (item.id === data.id) {
                        item.groups[0].priority = value;
                        item.groups[1].priority = value;
                        item.groups[2].priority = value;
                    }
                    return item;
                })
            setTableData(newTable);
            }
            else if (value === 0) {
                setShow(false);
                const newTable =tableData.map(item => {
                    if (item.id === data.id) {
                        item.groups[0].priority =  '';
                        item.groups[1].priority =  '';
                        item.groups[2].priority =  '';
                    }
                    return item;
                })
            setTableData(newTable);
            }
            else {

                if (orderArr.includes(value)) {


                    if(x.includes(value)) {
                        setShow(true);
                    }
                    else {
                        const newTable2 = tableData.map(item => {
                            if (item.groups[0].priority === value) {
                                item.groups[0].priority = focusData.priority;
                                item.groups[1].priority = focusData.priority;
                                item.groups[2].priority = focusData.priority;
                            }
                            return item;
                        })
                        setTableData(newTable2);
    
                        const newTable = tableData.map(item => {
                            if (item.id === data.id) {
                                item.groups[0].priority = value;
                        item.groups[1].priority = value;
                        item.groups[2].priority = value;
                            }
                            return item;
                        })
                        setTableData(newTable);
                    }

                }
                else {
                    // içermiyorsa buraya gir
                    setShow(true);
                    const newTable = tableData.map(item => {
                        if (item.id === data.id) {
                            item.groups[0].priority = '';
                            item.groups[1].priority = '';
                            item.groups[2].priority = '';
                        }
                        return item;
                    })
                    setTableData(newTable);
                    
                }
            } 
        }
        else {
            setShow(true);
        }
    }

    useEffect(() => {
        setTableData(
          tableItems.slice((currentPage * itemsPerPage - itemsPerPage), itemsPerPage * currentPage)
        )
      }, [currentPage, itemsPerPage, tableItems])

    useEffect(() => {
        setTotalItems(tableItems?.length)
    }, [tableItems])

    return (
        <>
            <div style={{ backgroundColor: '#ffffff' }}>

                {/* <div className='d-flex justify-content-end'>
                    <Button onClick={save} variant="success" disabled={tableData.length !== 0 ? false : true} >{t('save')}</Button>
                </div> */}
                <div className='table-reserve' style={{ background: 'white' }}>
                    <Table className='table-profile-strategy' bordered>
                        <thead id='header'>
                            <tr>
                                <th colSpan={6} className='group-border'></th>
                                <th colSpan={7} className='group-border'>A</th>
                                <th colSpan={7} className='group-border'>B</th>
                                <th colSpan={7} className='group-border'>C</th>
                                <th></th>
                            </tr>
                            <tr id='header2'>
                                {
                                    tableHeaderName.map((name, index) => (
                                        <th key={index} className={
                                            (index === 5 || index === 12 || index === 19 || index === 26)
                                            && 'group-border'}>
                                            <div className={`header-name`}>
                                            {
                                                    index === 27
                                                    ?name
                                                    :t(name)
                                                }
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>

                                {
                                    tableData.length === 0
                                    ?<tr className='no-data-table-row'> 
                                        <td colSpan={28}>
                                        <div>
                                            <span>
                                            {t('No Data')}
                                            </span>
                                            </div> 
                                        </td>
                                    </tr>
                                    :tableData.map((data, index) => (
                                        <tr key={index}>
                                            <td> <div className='body-data'>{data.company}</div> </td>
                                            <td> <div className='body-data leftside-data'>{data.globalBrand}</div> </td>
                                            <td> <div className='body-data leftside-data'>{data.indication}</div> </td>
                                            <td> <div className='body-data leftside-data'>{data.profile}</div> </td>
                                            <td> <div className='body-data'>{data.specialization}</div> </td>
                                            <td className='group-border'> <div className='body-data'>{data.details}</div> </td>
    
    
                                            <td>
                                                <div id={index} className='body-data'>
                                                    
                                                    <input
                                                        type='number'                                     
                                                        value={data.groups[0].priority}
                                                        onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                                                        onChange={(e) => changePriority(e, data)}
                                                        onFocus={()=>focusInput( data.groups[0].priority,data.id)}
                                                    />
                                                </div>
                                            </td>
                                            <td className='category-a'> <div className='body-data'>{data.groups[0].category}</div> </td>
                                            <td> <div className='body-data'>{data.groups[0].pn}</div> </td>
                                            <td> <div className='body-data'>{data.groups[0].needsQty}</div> </td>
                                            <td> <div className='body-data'>{data.groups[0].visitQty}</div> </td>
                                            <td> <div className='body-data'>{data.groups[0].months}</div> </td>
                                            <td className='group-border'> <div className='body-data'>{data.groups[0].plannedLoyalty}</div> </td>
    
                                            <td> <div  className='body-data'><input disabled placeholder={data.groups[1].priority}  type='number'/></div> </td>
                                            <td className='category-b'> <div className='body-data'>{data.groups[1].category}</div> </td>
                                            <td> <div className='body-data'>{data.groups[1].pn}</div> </td>
                                            <td> <div className='body-data'>{data.groups[1].needsQty}</div> </td>
                                            <td> <div className='body-data'>{data.groups[1].visitQty}</div> </td>
                                            <td> <div className='body-data'>{data.groups[1].months}</div> </td>
                                            <td className='group-border'> <div className='body-data'>{data.groups[1].plannedLoyalty}</div> </td>
    
                                            <td> <div  className='body-data'><input disabled placeholder={data.groups[2].priority}  type='number'/></div> </td>
                                            <td className='category-c'> <div className='body-data'>{data.groups[2].category}</div> </td>
                                            <td> <div className='body-data'>{data.groups[2].pn}</div> </td>
                                            <td> <div className='body-data'>{data.groups[2].needsQty}</div> </td>
                                            <td> <div className='body-data'>{data.groups[2].visitQty}</div> </td>
                                            <td> <div className='body-data'>{data.groups[2].months}</div> </td>
                                            <td className='group-border'> <div className='body-data'>{data.groups[2].plannedLoyalty}</div> </td>
    
                                            <td> <div className='body-data'>{data.action}</div> </td>
                                        </tr>
                                    ))
                                }
                            
                        </tbody>
                    </Table>
                </div>
                <PaginationTable
                    total={totalItems}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
            <ErrorInput
            messages={'hata'}
            modalShow={show}
            setModalShow={setShow}
            />
        </>
    )
}

export default TableProfileStrategy