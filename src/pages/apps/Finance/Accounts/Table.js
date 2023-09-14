import React, { useState } from 'react';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import { useTranslation } from 'react-i18next';
import { mdiPencilBoxOutline, mdiMagnify  } from '@mdi/js';
import Icon from '@mdi/react';
// import AddDocument from './AddDocument';
// import AddBank from './AddBank';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Filter from './Filter';
import AddAccount from './AddAccount';
import DeleteAccount from './Delete';
import UpdateAccount from './Update';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
// import DeleteBank from './Delete';
// import Update from './Update';

const Table = () => {

    const { t } = useTranslation();
    const history = useHistory();

    /**filter show */
    const [isOpenFilter, setIsOpenFilter] = useState(true);

    /**user name */
    const modifiedBy = localStorage.getItem('userName');

    /**not delete modal */
    const [notDeleteModal, setNotDeleteModal] = useState(false);
    const [notDeleteMessage, setNotDeleteMessage] = useState('');

    const [documentDetailShow, setDocumentDetailShow] = useState(false);
    const [documentDetailItems, setDocumentDetailItems] = useState({});

    /**add Account modal */
    const [addAccountModalShow, setAddAccountModalShow] = useState(false);

    /**apply */
    const [isApply, setIsApply] = useState(false);

    /**clear */
    const [clear, setClear] = useState(false);

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

    /**delete click obj */
    const [deleteObj, setDeleteObj] = useState();

    /** update modal show */
    const [updateModalShow, setUpdateModalShow] = useState(false);

    const columns = [
        {
            header: t('Account Name'),
            accessorKey: 'accountName',
            size: '120'
        },
        {
            header: t('Country'),
            accessorKey: 'country',
            size: '150'
        },
        {
            header: t('Party'),
            accessorKey: 'party',
            size: '150'
        },
        {
            header: t('Party Type'),
            accessorKey: 'partyType',
            size: '150'
        },
        {
            header: t('Type'),
            accessorKey: 'type',
            size: '150'
        },
        {
            header: t('Name'),
            accessorKey: 'name',
            size: '150'
        },
        {
            header: t('Account Type'),
            accessorKey: 'accountType',
            size: '150'
        },
        {
            header: t('Account Sub Type'),
            accessorKey: 'accountSubType',
            size: '150'
        },
        {
            header: t('Bank'),
            accessorKey: 'bank',
            size: '150'
        },
        {
            header: t('Branch Code'),
            accessorKey: 'branchCode',
            size: '150'
        },
        {
            header: t('Account Number'),
            accessorKey: 'accountNumber',
            size: '150'
        },
        {
            header: t('IBAN'),
            accessorKey: 'iban',
            size: '150'
        },
        {
            header: t('Currency'),
            accessorKey: 'currency',
            size: '150'
        },
        {
            header: t('Account Priority'),
            accessorKey: 'accountPriority',
            size: '150'
        },
        {
            header: t('Is Company Account'),
            accessorKey: 'isCompanyAccount',
            size: '150'
        }
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

    const deleteAccount = () => {
        const body = {
            id: obj?.id,
            modifiedBy: modifiedBy
        }
        FetchApiPost('services/Finance/Account/DeleteAccount','POST',body)
        .then(res => {
            if (res.status === 200) {
                setDeleteModalShow(false);
                setIsApply(true);
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
   
    return (
        <>
            <TableAccordion
                data={data}
                columns={columns}
                filter={
                    <Filter
                        isApply={isApply}
                        setIsApply={setIsApply}
                        isOpenFilter={isOpenFilter}
                        setIsOpenFilter={setIsOpenFilter}
                        setData={setData}
                        setDataLoading={setDataLoading}
                        isClear={clear}
                        setIsClear={setClear}
                    />
                }
                filterShow={isOpenFilter}
                setFilterShow={setIsOpenFilter}
                isCheckBox={false}
                isRowActions={true}
                dropdownOptions={statusOptions}
                enableExpanding={false}
                handleDropDownItemClick={selectOption}
                actionsSize={100}
                handleNewButton={() => setAddAccountModalShow(true)}
                handlApplyBtn={() => setIsApply(true)}
                isLoading={dataLoading}
                handlClearBtn={()=>setClear(true)}
                isBulkButtons={false}
            />
            {
                addAccountModalShow &&
                <AddAccount
                show={addAccountModalShow}
                setShow={setAddAccountModalShow}
                setIsApply={setIsApply}
                />
            }

{   
                deleteModalShow &&
                <DeleteAccount
                    deleteFunction={deleteAccount}
                    show={deleteModalShow}
                    setShow={setDeleteModalShow}
                    data={obj}
                />
            }

            {
                updateModalShow &&
                <UpdateAccount
                data={obj}
                setIsApply={setIsApply}
                show={updateModalShow}
                setShow={setUpdateModalShow}
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