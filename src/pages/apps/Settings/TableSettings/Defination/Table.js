import React, { useEffect, useState } from 'react'
import Dropdowns from '../../../../../components/Dropdowns';
import TableAccordion from '../../../../../components/Tables/TableAccordion';
import AddModal from './AddModal';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UpdateModal from './UpdateModal';
import Delete from '../../../../../components/TableActionsModals/Delete';
import Filter from '../../../../../components/Filter';
import { statusControl } from '../../../../../components/Function/StatusCheck';
import { Filters } from 'handsontable/plugins';

const Table = ({
    optionsDefinationsName,
    setOptionsDefinationsName,
    optionsAbb,
    setOptionsAbb
}) => {

    const history = useHistory();
    const { t } = useTranslation();
    const modifiedBy = localStorage.getItem('userName');

    const [addHeader, setAddHeader] = useState([]);
    const [selectAddHeader, setSelectAddHeader] = useState();

    const [filterShow, setFilterShow] = useState(true);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [applyNumber, setApplyNumber] = useState(0);

    const [clickRow, setClickRow] = useState(null);

    const getStatusOptions = (status, item) => {
        console.log('status',status);
        return statusOptions
    };
    
    const [showAddModal, setShowAddModal] = useState(false);
    
    const [tableData, setTableData] = useState([
        // {
        //     definationTypeName:'Place',
        //     defination:'',
        //     abb:'PLC',
        //     description:'Lorem ipsum',
        //     language:'EN',
        //     action:'null',
        //     subRows:[
        //         {
        //             definationTypeName: 'Place',
        //             defination: 'Hospital',
        //             abb: 'H',
        //             description: 'Lorem ipsum',
        //             language: 'EN',
        //             action: 'null',
        //         }
        //     ]
        // },
        // {
        //     definationTypeName:'Place',
        //     defination:'',
        //     abb:'PLC',
        //     description:'Lorem ipsum',
        //     language:'EN',
        //     action:'null',
        //     subRows:[
        //         {
        //             definationTypeName: 'Place',
        //             defination: 'Hospital',
        //             abb: 'H',
        //             description: 'Lorem ipsum',
        //             language: 'EN',
        //             action: 'null',
        //         }
        //     ]
        // }
    ])
   
    const [selectStatusCondition, setSelectStatusCondition] = useState([
        { id: 0, status: 'default' }
    ])

    const [header, setHeader] = useState([]);
    const [selectHeader, setSelectHeader] = useState([]);

    const filterComponentsData = [
        {
            label: 'header',
            state: selectHeader,
            setState: setSelectHeader,
            options: header,
            type: 'multiselect',
            status:selectStatusCondition
        }
    ]

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
    
    const columnsx = [
        {
            header: t('Header'),
            accessorKey: 'definationTypeName',
            size: '175'
        },
        {
            header: t('Defination'),
            accessorKey: 'defination',
            size: '150'
        },
        {
            header: t('Abb'),
            accessorKey: 'abb',
            size: '75',
            muiTableBodyCellProps: {
                align: 'center',
              }
        },
        {
            header: t('Description'),
            accessorKey: 'description',
            muiTableBodyCellProps: {
                align: 'center',
              },
            size: '300'
        },
        {
            header: t('Language'),
            accessorKey: 'language',
            muiTableBodyCellProps: {
                align: 'center',
              },
            size: '75'
        },
        {
            header: '',
            accessorKey: 'action',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell: ({ cell, row }) => {
                return (
                    <Dropdowns
                        option={statusOptions}
                        onClick={statusClick}
                        obj={row.original}
                    />
                )
            }
        }
    ]

    const deleteDefination = () => {
        
        let body = {};
        if(clickRow?.defination === '') {
            body = {
                headerId:clickRow?.id,
                definationId:0,
                modifiedBy:modifiedBy
            }
        }
        else {
            body = {
                headerId:clickRow?.parentId,
                definationId:clickRow?.id,
                modifiedBy:modifiedBy
            }
        }
        FetchApiPost('services/AdminPanel/Defination/DeleteDefination','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                         await  setShowDeleteModal(false);
                         await  applyFilter();
                        }
                        else if (res.status === 401) {
                            history.push('/error-404');
                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
       
    }

    const clearFilter = () => {
        setSelectHeader([]);
    }
  
    const applyFilter = () => {
        const condition = [
           selectHeader.length === 0
        ]

        statusControl(condition,selectStatusCondition,setSelectStatusCondition);
            if (condition.some((x) => x === true)) return;

        const body = {
            ids:selectHeader.map(data => data.value)
        }
        FetchApiPost('services/AdminPanel/Defination/ApplyDefinationFilter','POST',body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setFilterShow(false);
                            res.json().then(data => {
                                setTableData(data?.data?.map(item => (
                                    {
                                        id: item.id,
                                        definationTypeName: item.headerName,
                                        defination: '',
                                        abb: item.abbrevation,
                                        description: item.description,
                                        language: item.language?.languageAbb,
                                        action: 'null',
                                        subRows: item?.definations?.map(el => (
                                            {
                                                id: el?.id,
                                                definationTypeName: item?.headerName,
                                                defination: el?.definationName,
                                                parentId:item.id,
                                                abb: el?.abbrevation,
                                                description: el?.description,
                                                language: el?.language?.languageAbb,
                                                action: 'null',
                                                subRows: el?.translates?.map(fac => (
                                                    {
                                                        id: fac?.id,
                                                        definationTypeName: item?.headerName,
                                                        defination: fac?.definationName,
                                                        parentId:item.id,
                                                        abb: fac?.abbrevation,
                                                        description: fac?.description,
                                                        language: fac?.language?.languageAbb,
                                                        action: 'null',
                                                    }
                                                ))
                                            }
                                        ))
                                    }
                                )))
                                data?.data?.map(item => (
                                    setOptionsDefinationsName(item.definations?.map(data => (
                                        {
                                            value:data.definationName,
                                            label:data.definationName
                                        }
                                    )))
                                ))
                                setOptionsAbb(data?.data?.map(item => (
                                    {
                                        value: item?.abbrevation,
                                        label: item?.abbrevation
                                    }
                                )))
                            })

                        }
                        else if (res.status === 401) {
                            history.push('/error-404');
                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

    const statusClick = (e, obj, status) => {
        setClickRow(obj);
        if (status.id === 0) {
            setShowDeleteModal(true);
        }
        else if (status.id === 9) {
            setShowUpdateModal(true);
        }
    }

    useEffect(() => {
        FetchApiGet('services/AdminPanel/Header/GetAllHeader','GET')
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then(data => {
                            setHeader(data?.data?.map(item => (
                                {
                                    value:item.id,
                                    label: item.headerName,
                                }
                            )))
                            setAddHeader(data?.data?.map(item => (
                                {
                                    value:item.id,
                                    label: item.headerName,
                                }
                            )))
                            setSelectHeader(data?.data?.map(item => (
                                {
                                    value:item.id,
                                    label: item.headerName,
                                }
                            )))
                        })
                    }
                    else if (res.status === 401) {
                        history.push('/error-404');
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }

                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
    }, [])
    
    useEffect(() => {
        if(selectHeader.length !== 0 && applyNumber === 0){
            applyFilter();
            setApplyNumber(1);
        }
    }, [selectHeader])
    
    
  return (
        <>
    <div>
    <TableAccordion 
            data={tableData}
            columns={columnsx} 
            isAccordion={true} 
            dropdownOptions={statusOptions}
            columnPinningRight={['action']}
            handleNewButton={() => setShowAddModal(true)}
            filterShow={filterShow}
            setFilterShow={setFilterShow}
            isCheckBox={false}
            handlApplyBtn={applyFilter}
            handlClearBtn={clearFilter}
            filter={
                <Filter
                filterComponentsData={filterComponentsData}
                getAllFilterData={applyFilter}
                deleteFilter={clearFilter}
                setCloseFilter={Filters}
                isFilterBtn={false}
                />
            }
        />
    </div>
    {
        showAddModal &&
        <AddModal
        show={showAddModal}
        setShow={setShowAddModal}
        optionsDefinationsName={optionsDefinationsName}
        setOptionsDefinationsName={setOptionsDefinationsName}
        optionsAbb={optionsAbb}
        setOptionsAbb={setOptionsAbb}
        addHeader={addHeader}
        setSelectAddHeader={setSelectAddHeader}
        selectAddHeader={selectAddHeader}
        applyFilter={applyFilter}
        />
    }
    {
        showUpdateModal && clickRow.defination !== ''
       ? <UpdateModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        optionsDefinationsName={optionsDefinationsName}
        setOptionsDefinationsName={setOptionsDefinationsName}
        optionsAbb={optionsAbb}
        setOptionsAbb={setOptionsAbb}
        obj={clickRow}
        applyFilter={applyFilter}
        />
        :null
    }
    {
        showDeleteModal &&
        <Delete
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        deleteFunction={deleteDefination}
        messages={'Are you sure you want to delete?'}
        />
    }
    </>

  )
}

export default Table