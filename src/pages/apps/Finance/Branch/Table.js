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
import AddBranch from './AddBranch';
import DeleteBranch from './Delete';
import Update from './UpdateBranch';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import Details from './Details';
// import DeleteBank from './Delete';
// import Update from './Update';

const Table = () => {

    const { t } = useTranslation();
    const history = useHistory();

    /**apply */
    const [isApply, setIsApply] = useState(false);

    /**clear */
    const [clear, setClear] = useState(false);

    /**filter show */
    const [isOpenFilter, setIsOpenFilter] = useState(true);

    /**user name */
    const modifiedBy = localStorage.getItem('userName');

    /**not delete modal */
    const [notDeleteModal, setNotDeleteModal] = useState(false);
    const [notDeleteMessage, setNotDeleteMessage] = useState('');
   

    const [documentDetailShow, setDocumentDetailShow] = useState(false);
    const [documentDetailItems, setDocumentDetailItems] = useState({});

    /**add branch modal */
    const [addBranchModalShow, setAddBranchModalShow] = useState(false);

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

    /**open details */
    const [openDetails, setOpenDetails] = useState(false);
    const [detailsId, setDetailsId] = useState(null);

    const columns = [
        {
            header: t('Type'),
            accessorKey: 'type',
            size: '50'
        },
        {
            header: t('Branch Code'),
            accessorKey: 'branchCode',
            size: '100'
        },
        {
            header: t('Name'),
            accessorKey: 'name',
            size: '100'
        },
        {
            header: t('Bank Name'),
            accessorKey: 'bankName',
            size: '100'
        },
        {
            header: t('Adress'),
            accessorKey: 'adress',
            size: '50'
        },
        {
            header: t('Swift'),
            accessorKey: 'swift',
            size: '50'
        },
        // {
        //     header: t('Muhabir Bank'),
        //     accessorKey: 'muhabirBank',
        //     size: '50',
        //     muiTableBodyCellProps: {
        //         align: 'center',
        //     },
        //     enableColumnActions: true,
        //     Cell: ({ cell, row }) => {
        //         return (
        //             <Icon onClick={() => handleClickDocument(row)} path={mdiPencilBoxOutline} size={0.85} />
        //         )
        //     }
        // },
        {
            header: t('Country'),
            accessorKey: 'country',
            size: '50'
        },
        {
            header: t('City'),
            accessorKey: 'city',
            size: '50'
        },
        {
            header: t('Company'),
            accessorKey: 'company',
            size: '50'
        },
        {
            header: t('Details'),
            accessorKey: 'adress',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                return (
                    <Icon onClick={()=>detailsClick(row)} path={mdiMagnify} size={1} />
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


    const detailsClick = (row) => {
        const id = row.original.id;
        setOpenDetails(true);
        setDetailsId(id);
    }
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

    const deleteBranch = () => {
         const body = {
                branchId: obj?.id,
                modifiedBy: modifiedBy
            }
            FetchApiPost('services/Finance/Branch/DeleteBranch','POST',body)
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

    /**all get data */
    // useEffect(() => {
    //     if(callTable) {
    //         setDataLoading(true);
    //         FetchApiGet('services/Finance/Bank/GetAllBanks', 'GET')
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     setDataLoading(false);
    //                     res.json().then(data => {
    //                         setData(data?.data?.map(el => {
    //                             return {
    //                                 id:el.id,
    //                                 name:el.bankName,
    //                                 swift:el.swiftCode,
    //                                 documents:el.documents
    //                             }
    //                         }))
    //                     })
    //                     setCallTable(false);
    //                 }
    //                 else {
    //                     setDataLoading(false);
    //                     history.push('/error-500');
    //                 }
    //             })
    //     }
    // }, [history,callTable])


    return (
        <>
            <TableAccordion
                data={data}
                columns={columns}
                filter={
                    <Filter
                        isApply={isApply}
                        setIsApply={setIsApply}
                        isClear={clear}
                        setIsClear={setClear}
                        isOpenFilter={isOpenFilter}
                        setIsOpenFilter={setIsOpenFilter}
                        data={data}
                        setData={setData}
                    />
                }
                filterShow={isOpenFilter}
                setFilterShow={setIsOpenFilter}
                isCheckBox={false}
                isRowActions={true}
                dropdownOptions={statusOptions}
                enableExpanding={false}
                handleDropDownItemClick={selectOption}
                actionsSize={50}
                handleNewButton={() => setAddBranchModalShow(true)}
                isLoading={dataLoading}
                handlApplyBtn={()=>setIsApply(true)}
                handlClearBtn={()=>setClear(true)}
                isBulkButtons={false}
            />

            {
                addBranchModalShow &&
                <AddBranch
                show={addBranchModalShow}
                setShow={setAddBranchModalShow}
                setIsApply={setIsApply}
                />
            }
            {
                deleteModalShow &&
                <DeleteBranch
                    deleteFunction={deleteBranch}
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
                setIsApply={setIsApply}
                />
            }
            {
                openDetails &&
                <Details 
                detailsId={detailsId}
                open={openDetails}
                setOpen={setOpenDetails}
                />
            }

{
    notDeleteModal &&
    <PharmacySplitPercentProblem
    show={notDeleteMessage}
    handleClose={()=>setNotDeleteModal(false)}
    messages={notDeleteMessage}
    />
}
        </>
    )
}

export default Table