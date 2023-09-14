import React, { useState } from 'react';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import { useTranslation } from 'react-i18next';
import { mdiPencilBoxOutline } from '@mdi/js';
import Icon from '@mdi/react';
import AddDocument from './AddDocument';
import AddBank from './AddBank';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteBank from './Delete';
import Update from './Update';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';

const Table = () => {

    const { t } = useTranslation();
    const history = useHistory();

    /**user name */
    const modifiedBy = localStorage.getItem('userName');

    const [documentDetailShow, setDocumentDetailShow] = useState(false);
    const [documentDetailItems, setDocumentDetailItems] = useState({});

    /**add bank modal */
    const [addBankModalShow, setAddBankModalShow] = useState(false);

    /**table data */
    const [data, setData] = useState([]);

    /**table data loading */
    const [dataLoading, setDataLoading] = useState(false);

    /**call table */
    const [callTable, setCallTable] = useState(true);


    /**action click obj */

    const [obj, setObj] = useState();
    /**delete modal show */ 
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    
    /**not delete modal */
    const [notDeleteModal, setNotDeleteModal] = useState(false);
    const [notDeleteMessage, setNotDeleteMessage] = useState('');

    /**delete click obj */
    const [deleteObj, setDeleteObj] = useState();

    /** update modal show */
    const [updateModalShow, setUpdateModalShow] = useState(false);

    const columns = [
        {
            header: t('Type'),
            accessorKey: 'type',
            size: '170'
        },
        {
            header: t('Name'),
            accessorKey: 'name',
            size: '170'
        },
        {
            header: t('Swift'),
            accessorKey: 'swift',
            size: '170'
        },
        {
            header: t('Web Site'),
            accessorKey: 'webSite',
            size: '170'
        },
        {
            header: t('Muhabir Bank'),
            accessorKey: 'muhabirBank',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
            },
            enableColumnActions: true,
            Cell: ({ cell, row }) => {
                return (
                    <Icon onClick={() => handleClickDocument(row)} path={mdiPencilBoxOutline} size={0.85} />
                )
            }
        },
        // {
        //     header: '',
        //     accessorKey: 'action',
        //     size: '50',
        //     muiTableBodyCellProps: {
        //         align: 'center',
        //       },
        //       enableColumnActions: true,
        //     Cell: ({ cell, row }) => {
        //         return (
        //             <Dropdowns
        //                 item={`?${row.original.id}?${row.original.promoSubjectName}`}
        //                 // option={getStatusOptions(cell.getValue(), row.original)}
        //                 // onClick={() => statusClick(row.original)}
        //             />
        //         )
        //     }
        // }
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
    const handleClickDocument = (row) => {
        const itemId = row.original.id;
        let item = data.filter(data => data.id === itemId)
        setDocumentDetailShow(true);
        setDocumentDetailItems(item);
    }
    const selectOption = (e, row) => {
        const id = Number(e.key);
        setObj(row);
        if (id === 0) { // edit
            setUpdateModalShow(true);
        }
        else { // delete
            setDeleteModalShow(true);
        }
    }

    const deleteBank = () => {
         const body = {
                id: obj?.id,
                modifiedBy: modifiedBy
            }
            FetchApiPost('services/Finance/Bank/DeleteBank','POST',body)
            .then(res => {
                if (res.status === 200) {
                    setCallTable(true);
                    setDeleteModalShow(false);
                }
                else if(res.status === 409) {
                    setDeleteModalShow(false);
                    setNotDeleteModal(true);
                    res.json().then(data =>setNotDeleteMessage(data.errors[0]));
                }
                else {
                    history.push('/error-500');
                }
            })
    }

    /**all get data */
    useEffect(() => {
        if(callTable) {
            setDataLoading(true);
            FetchApiGet('services/Finance/Bank/GetAllBanks', 'GET')
                .then(res => {
                    if (res.status === 200) {
                        setDataLoading(false);
                        res.json().then(data => {
                            setData(data?.data?.map(el => {
                                return {
                                    id:el.id,
                                    name:el.name,
                                    swift:el.swiftCode,
                                    type:el.type.name,
                                    typeId:el.type.id,
                                    webSite:el.webSite,
                                    documents:el.documents
                                }
                            }))
                        })
                        setCallTable(false);
                    }
                    else {
                        setDataLoading(false);
                        history.push('/error-500');
                    }
                })
        }
    }, [history,callTable])


    return (
        <>
            <TableAccordion
                data={data}
                columns={columns}
                isFilter={false}
                isCheckBox={false}
                isRowActions={true}
                dropdownOptions={statusOptions}
                enableExpanding={false}
                handleDropDownItemClick={selectOption}
                actionsSize={50}
                handleNewButton={() => setAddBankModalShow(true)}
                isLoading={dataLoading}
                isBulkButtons={false}
            />

            {documentDetailShow && (
                <AddDocument
                    documentDetailShow={documentDetailShow}
                    setDocumentDetailShow={setDocumentDetailShow}
                    item={documentDetailItems}
                    callTable={callTable}
                    setCallTable={setCallTable}
                // getFilterData={getFilterData}
                />
            )}
            {
                addBankModalShow &&
                <AddBank
                    show={addBankModalShow}
                    setShow={setAddBankModalShow}
                    callTable={callTable}
                    setCallTable={setCallTable}
                />
            }
            {
                deleteModalShow &&
                <DeleteBank
                    deleteFunction={deleteBank}
                    show={deleteModalShow}
                    setShow={setDeleteModalShow}
                    data={obj}
                />
            }
            {
                updateModalShow &&
                <Update
                    show={updateModalShow}
                    setShow={setUpdateModalShow}
                    data={obj}
                    setCallTable={setCallTable}
                />
            }
            {
                notDeleteModal &&
                <PharmacySplitPercentProblem
                    show={notDeleteMessage}
                    handleClose={() => setNotDeleteModal(false)}
                    messages={notDeleteMessage}
                />
            }
        </>
    )
}

export default Table