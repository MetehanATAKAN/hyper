import React, { useEffect, useState } from 'react'
import Dropdowns from '../../../../../components/Dropdowns';
import TableAccordion from '../../../../../components/Tables/TableAccordion';
import AddModal from './AddModal';
import { FetchApiGet } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UpdateModal from './UpdateModal';

const Table = ({
    optionsHeaderName,
    setOptionsHeaderName,
    optionsAbb,
    setOptionsAbb
}) => {

    const history = useHistory();
    const { t } = useTranslation();

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [clickRow, setClickRow] = useState(null);

    const getStatusOptions = (status, item) => {
        return statusOptions
    };
    
    const [showAddModal, setShowAddModal] = useState(false);
    
    const [tableData, setTableData] = useState([
        // {
        //     header:'Place',
        //     abb:'PLC',
        //     description:'Lorem ipsum',
        //     language:'EN',
        //     action:'null',
        //     subRows:[
        //         {
        //             header: 'Place',
        //             abb: 'PLC',
        //             description: 'Lorem ipsum',
        //             language: 'EN',
        //             action: 1,
        //         }
        //     ]
        // },
        // {
        //     header:'Categorie',
        //     abb:'CAT',
        //     description:'Lorem ipsum',
        //     language:'EN',
        //     action:'null',
        //     subRows:[
        //         {
        //             header: 'Place',
        //             abb: 'PLC',
        //             description: 'Lorem ipsum',
        //             language: 'EN',
        //             action: 1,
        //         }
        //     ]
        // }
    ])
    
    const statusOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
        }
    ]
    
    const columnsx = [
        {
            header: t('Header'),
            accessorKey: 'header',
            size: '170'
        },
        {
            header: t('Abb'),
            accessorKey: 'abb',
            size: '75'
        },
        {
            header: t('Description'),
            accessorKey: 'description',
            size: '470'
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
                        item={`?${row.original.id}?${row.original.promoSubjectName}`}
                        option={getStatusOptions(cell.getValue(), row.original)}
                        onClick={() => statusClick(row.original)}
                    />
                )
            }
        }
    ]

    const statusClick = (obj) => {
        setClickRow(obj);
        setShowUpdateModal(true);
    }

    const getAllHeader = () => {
        FetchApiGet('services/AdminPanel/Header/GetAllHeader','GET')
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then(data => {
                            setTableData(data?.data?.map(item => (
                                {
                                    id:item.id,
                                    header: item.headerName,
                                    abb: item.abbrevation,
                                    description: item.description,
                                    language: item.language?.languageAbb,
                                    action: 'null',
                                    subRows: item?.translates?.map(el => (
                                        {
                                            id:el.id,
                                            header: el.headerName,
                                            abb: el.abbrevation,
                                            description: el.description,
                                            language: el.language?.languageAbb,
                                            action: 1,
                                        }
                                    ))
                                }
                            )))
                            setOptionsHeaderName(data?.data.map(item => (
                              {
                                  value:item.headerName,
                                  label:item.headerName
                              }
                            )))
                            setOptionsAbb(data?.data.map(item => (
                              {
                                  value:item.abbrevation,
                                  label:item.abbrevation
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
    useEffect(() => {
     getAllHeader();
    }, [])
    

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
            filterShow={false}
            isCheckBox={false}
        />
    </div>
    {
        showAddModal &&
        <AddModal
        show={showAddModal}
        setShow={setShowAddModal}
        optionsHeaderName={optionsHeaderName}
        setOptionsHeaderName={setOptionsHeaderName}
        optionsAbb={optionsAbb}
        setOptionsAbb={setOptionsAbb}
        getAllHeader={getAllHeader}
        />
    }
    {
        showUpdateModal &&
        <UpdateModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        optionsHeaderName={optionsHeaderName}
        setOptionsHeaderName={setOptionsHeaderName}
        optionsAbb={optionsAbb}
        setOptionsAbb={setOptionsAbb}
        obj={clickRow}
        applyFilter={getAllHeader}
        />
    }
    </>

  )
}

export default Table