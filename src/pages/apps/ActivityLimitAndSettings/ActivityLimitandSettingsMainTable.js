import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Loading from '../../../components/Loading';
import MainTable from '../../../components/MainTable';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import ActivityLimitFilter from './ActivityLimitFilter';
import PharmacySplitDeletePharmacy from '../../../components/Modals/PharmacySplitDeletePharmacy';
import { alsUpdateData, alsUpdateDisabled } from '../../../redux/actions';
import { async } from 'regenerator-runtime';

const ActivityLimitandSettingsMainTable = ({ openModal }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const alsFilterData = useSelector(state => state.ActivityLimit.alsFilterData);
    
    
    const {
        alsFilterYear,
        alsFilterActivityType,
        alsFilterMainProcess,
        alsFilterBusinessProcess,
        alsFilterProcess
    } = useSelector(state=>state.ActivityLimit);
    
    const [loading, setLoading] = useState();
    const [deleteLoading, setDeleteLoading] = useState();
    const [updateLoading, setUpdateLoading] = useState();

    const [tableData, setTableData] = useState([
        {
            id:1,year:2010,activityType:'mete',mainProcess:'atakan',businessProcess:'elazığ',process:'merve',actions:'cemil'
        }
    ]);
    const [exportTableData, setExportTableData] = useState([]);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState();

    const [columns] = useState([
        { name: 'year', title: t('Year') },
        { name: 'activityType', title: t('Activity Type') },
        { name: 'mainProcess', title: t('Main Process') },
        { name: 'businessProcess', title: t('Business Process') },
        { name: 'process', title: t('Process') },
        { name: 'actions', title: t('Actions') },
    ]);

    const [exportColumns, setExportColumns] = useState([
        { name: 'year', title: t('Year') },
        { name: 'activityType', title: t('Activity Type') },
        { name: 'mainProcess', title: t('Main Process') },
        { name: 'businessProcess', title: t('Business Process') },
        { name: 'process', title: t('Process') },
    ])

    // Table Columns Resizing Width
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'year', width: '12%' },
        { columnName: 'activityType', width: '20%' },
        { columnName: 'mainProcess', width: '20%' },
        { columnName: 'businessProcess', width: '20%' },
        { columnName: 'process', width: '20%' },
        { columnName: 'actions', width: '8%' },
    ]);

    //Table Column Reordering
    const [tableColumnExtensions] = useState([
        { columnName: 'year', width: 150 },
        { columnName: 'activityType', width: 150 },
        { columnName: 'mainProcess', width: 150 },
        { columnName: 'businessProcess', width: 150 },
        { columnName: 'process', width: 100 },
        { columnName: 'actions', width: 100 },
    ]);

    //Freeze Columns
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Year', columnName: 'year', width: 150 },
        { id: '2', isFreeze: false, content: 'Activity Type', columnName: 'activityType', width: 150 },
        { id: '3', isFreeze: false, content: 'Main Process', columnName: 'mainProcess', width: 150 },
        { id: '4', isFreeze: false, content: 'Business Process', columnName: 'businessProcess', width: 150 },
        { id: '5', isFreeze: false, content: 'Process', columnName: 'process', width: 150 },
        { id: '6', isFreeze: false, content: 'Actions', columnName: 'actions', width: 100 },
    ];

    // Table show or hide items
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'year', title: 'Year' },
        { isShow: true, name: 'activityType', title: 'Activity Type' },
        { isShow: true, name: 'mainProcess', title: 'Main Process' },
        { isShow: true, name: 'businessProcess', title: 'Business Process' },
        { isShow: true, name: 'process', title: 'Process' },
        { isShow: true, name: 'actions', title: 'Actions' },
    ]);

    // Group By Items
    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'year', content: 'Year' },
        { id: '1', isShow: true, columnName: 'activityType', content: 'Activity Type' },
        { id: '2', isShow: true, columnName: 'mainProcess', content: 'Main Process' },
        { id: '3', isShow: true, columnName: 'businessProcess', content: 'Business Process' },
        { id: '4', isShow: true, columnName: 'process', content: 'Process' },
        { id: '5', isShow: true, columnName: 'actions', content: 'Actions' },
    ]);

    // Summary
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'year', width: 150 },
        { type: 'count', columnName: 'activityType', width: 150 },
        { type: 'count', columnName: 'mainProcess', width: 150 },
        { type: 'count', columnName: 'businessProcess', width: 150 },
        { type: 'count', columnName: 'process', width: 100 },
        { type: 'count', columnName: 'actions', width: 100 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'year', width: 150 },
        { type: 'count', columnName: 'activityType', width: 150 },
        { type: 'count', columnName: 'mainProcess', width: 150 },
        { type: 'count', columnName: 'businessProcess', width: 150 },
        { type: 'count', columnName: 'process', width: 100 },
        { type: 'count', columnName: 'actions', width: 100 },
    ]);


    const allActivity = useCallback((data) => {
        setLoading(false);
        setDeleteLoading(false);
        setTableData(
            data.map((item) => ({
                id: item.id,
                activityTypeId: item.activityTypeId,
                activityType: item.activityTypeName,
                autoCalculation: item.autoCalculation,
                businessProcessId: item.businessProcessId,
                businessProcess: item.businessProcessName,
                checkList: item.checkList,
                eventLimitationBy: item.eventLimitationBy,
                isDeleteable: item.isDeleteable,
                mainProcessId: item.mainProcessId,
                mainProcess: item.mainProcessName,
                parentProcessId: item.parentProcessId,
                process: item.parentProcesssName,
                status: item.status,
                year: item.year,
                actions: (
                    <div className='als-main-table-actions'>
                        <button
                            onClick={() => updateActivity(item.id)}
                            className='me-1'
                        >
                            <i className="fa-solid fa-pencil update-icon"></i>
                        </button>
                        <button
                            disabled={item.isDeleteable === true && false}
                            onClick={() => deleteActivity(item.id)}
                        >
                            <i
                                className={`fa-solid fa-trash-can delete-icon ${item.isDeleteable === false && 'passive'}`}
                            />
                        </button>
                    </div>
                ),
            }))
        );

        setExportTableData(
            data.map((item) => ({
                id: item.id,
                activityTypeId: item.activityTypeId,
                activityType: item.activityTypeName,
                autoCalculation: item.autoCalculation,
                businessProcessId: item.businessProcessId,
                businessProcess: item.businessProcessName,
                checkList: item.checkList,
                eventLimitationBy: item.eventLimitationBy,
                isDeleteable: item.isDeleteable,
                mainProcessId: item.mainProcessId,
                mainProcess: item.mainProcessName,
                parentProcessId: item.parentProcessId,
                process: item.parentProcesssName,
                status: item.status,
                year: item.year

            }))
        );
    }, [])

    const deleteActivity2 = async (id) => {


        setDeleteModal(false);
        setDeleteLoading(true);
        const deleteActivityBody = {
            ActivityId: id
        }

        const activityFilterBody = {
            Year: alsFilterYear.map(item => item.label),
            ActivityTypeId: alsFilterActivityType.map(item => item.value),
            MainProcessId: alsFilterMainProcess.map(item => item.value),
            BusinessProcessId: alsFilterBusinessProcess.map(item => item.value),
            ProcessId: alsFilterProcess.map(item => item.value)
        }

        await FetchApiPost(`services/Settings/ActivitySettings/DeleteActivityByActivityId`, 'POST', deleteActivityBody)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error))


        await FetchApiPost('services/Settings/ActivitySettings/GetActivityFilter', 'POST', activityFilterBody)
            .then(response => response.json())
            .then(response => allActivity(response.data))
            .catch(error => console.log(error))
    }
   
    const deleteActivity = async (id) => {
         
        setDeleteItemId(id);
        setDeleteModal(true);

    }

    const updateActivity = (idx) => {
    
        setUpdateLoading(true);
        dispatch(alsUpdateDisabled(true));

        FetchApiGet(`services/Settings/ActivitySettings/GetActivitySettingsByActivityId?id=${idx}`, 'GET')
            .then((response) => response.json())
            .then((response) => (
                dispatch(alsUpdateData(response.data)),setUpdateLoading(false),openModal()
            ))
            .catch((error) => console.log(error));

            //  openModal();

            // setUpdateLoading(false);
            //     openModal();
    };

    

    // useEffect(() => {
    //     setLoading(true);
    //     allActivity();
    // }, [allActivity]);

    // useEffect(() => {
    //     setLoading(true);
    //     allActivity(alsFilterData)
    // }, [allActivity, alsFilterData])


    const [columnOrders, setColumnOrders] = useState([
        'year',
        'activityType',
        'mainProcess',
        'businessProcess',
        'process',
        'actions',
    ]);

    return (
        <>
            <div>
                <MainTable
                    tableData={tableData}
                    exportTableData={exportTableData}
                    columns={columns}
                    exportColumns={exportColumns}
                    columnWidths={columnWidths}
                    setColumnWidths={setColumnWidths}
                    tableColumnExtensions={tableColumnExtensions}
                    itemsFromBackend={itemsFromBackend}
                    columnOrders={columnOrders}
                    setColumnOrders={setColumnOrders}
                    showorHideColumnsItems={showorHideColumnsItems}
                    totalSummaryItems={totalSummaryItems}
                    groupSummaryItems={groupSummaryItems}
                    groupByItems={groupByItems}
                    setGroupByItems={setGroupByItems}
                    isAddButton={true}
                    addButtonFunction={openModal}
                    filters={<ActivityLimitFilter />}
                    isFilters={true}
                />
                <Loading loading={loading} />
                <Loading loading={deleteLoading} />
                <Loading loading={updateLoading} />
                {
                    deleteModal &&
                    <PharmacySplitDeletePharmacy 
                    messages={'Are you sure you want to delete the activity?'} 
                    deletePharmacyInfo={deleteItemId} 
                    deleteItem={deleteActivity2}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                     />
                }
            </div>
        </>
    );
};

export default ActivityLimitandSettingsMainTable;
