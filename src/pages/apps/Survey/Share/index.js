import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import Dropdowns from '../../../../components/Dropdowns';
import { mdiEyeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import { Spin } from 'antd';
import UpdateModal from './UpdateModal/UpdateModal';
import Delete from './Delete';
import ActionModal from './ActionModal';

const Share = () => {

    const { t } = useTranslation(); 
    
    const [addModal, setAddModal] = useState(false);

    const [data, setData] = useState([]);

    const [actionItem, setActionItem] = useState(null);
    const [loader, setLoader] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);



    const [columns, setColumns] = useState([
        { name: 'surveyName', title: t('Survey Name') },
        { name: 'type', title: t('Type') },
        { name: 'category', title: t('Category') },
        { name: 'language', title: t('Language') },
        { name: 'design', title: t('Design') },
        { name: 'company', title: t('Company') },
        { name: 'department', title: t('Department') },
        { name: 'position', title: t('Position') },
        { name: 'businessUnit', title: t('Business Unit') },
        { name: 'employee', title: t('Employee') },
        // { name: 'answers', title: t('Answers') },
        // { name: 'analyze', title: t('Analyze') },
        { name: 'shareDate', title: 'Share Date' },
        { name: 'deadline', title: 'Deadline' },
        { name: 'status', title: t('Status') },
        { name: 'action', title: '-' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'surveyName', width: '13%' },
        { columnName: 'type', width: '10%' },
        { columnName: 'category', width: '21%' },
        { columnName: 'language', width: '10%' },
        { columnName: 'design', width: '10%' },
        { columnName: 'company', width: '15%' },
        { columnName: 'department', width: '14%' },
        { columnName: 'position', width: '14%' },
        { columnName: 'businessUnit', width: '14%' },
        { columnName: 'employee', width: '14%' },
        // { columnName: 'answers', width: '10%' },
        // { columnName: 'analyze', width: '10%' },
        { columnName: 'shareDate', width: '13%' },
        { columnName: 'deadline', width: '13%' },
        { columnName: 'status', width: '10%' },
        { columnName: 'action', width: '4%' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'surveyName', width: 200 },
        { columnName: 'type', width: 200 },
        { columnName: 'category', width: 200 },
        { columnName: 'language', width: 200 },
        { columnName: 'design', width: 200 },
        { columnName: 'company', width: 200 },
        { columnName: 'department', width: 200 },
        { columnName: 'position', width: 200 },
        { columnName: 'businessUnit', width: 200 },
        { columnName: 'employee', width: 200 },
        // { columnName: 'answers', width: 200 },
        // { columnName: 'analyze', width: 200 },
        { columnName: 'shareDate', width: 200 },
        { columnName: 'deadline', width: 200 },
        { columnName: 'status', width: 200 },
        { columnName: 'action', width: 50 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: t('Survey Name'), columnName: 'surveyName', width: 200 },
        { id: '2', isFreeze: false, content: t('Type'), columnName: 'type', width: 200 },
        { id: '3', isFreeze: false, content: t('Category'), columnName: 'category', width: 200 },
        { id: '4', isFreeze: false, content: t('Language'), columnName: 'language', width: 200 },
        { id: '5', isFreeze: false, content: t('Design'), columnName: 'design', width: 200 },
        { id: '6', isFreeze: false, content: t('Company'), columnName: 'company', width: 200 },
        { id: '7', isFreeze: false, content: t('Department'), columnName: 'department', width: 200 },
        { id: '8', isFreeze: false, content: t('Position'), columnName: 'position', width: 200 },
        { id: '9', isFreeze: false, content: t('Business Unit'), columnName: 'businessUnit', width: 200 },
        { id: '10', isFreeze: false, content: t('Employee'), columnName: 'employee', width: 200 },
        // { id: '11', isFreeze: false, content: t('Answers'), columnName: 'answers', width: 200 },
        // { id: '12', isFreeze: false, content: t('Analyze'), columnName: 'analyze', width: 200 },
        { id: '11', isFreeze: false, content: t('Share Date'), columnName: 'shareDate', width: 200 },
        { id: '12', isFreeze: false, content: t('Deadline'), columnName: 'deadline', width: 200 },
        { id: '13', isFreeze: false, content: t('Status'), columnName: 'status', width: 200 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, content: t('Survey Name'), columnName: 'surveyName' },
        { id: '2', isShow: true, content: t('Type'), columnName: 'type' },
        { id: '3', isShow: true, content: t('Category'), columnName: 'category' },
        { id: '4', isShow: true, content: t('Language'), columnName: 'language' },
        { id: '5', isShow: true, content: t('Design'), columnName: 'design' },
        { id: '6', isShow: true, content: t('Company'), columnName: 'company' },
        { id: '7', isShow: true, content: t('Department'), columnName: 'department' },
        { id: '8', isShow: true, content: t('Position'), columnName: 'position' },
        { id: '9', isShow: true, content: t('Business Unit'), columnName: 'businessUnit' },
        { id: '10', isShow: true, content: t('Employee'), columnName: 'employee' },
        // { id: '11', isShow: true, content: t('Answers'), columnName: 'answers' },
        // { id: '12', isShow: true, content: t('Analyze'), columnName: 'analyze' },
        { id: '11', isShow: true, content: t('Share Date'), columnName: 'shareDate' },
        { id: '12', isShow: true, content: t('Deadline'), columnName: 'deadline' },
        { id: '13', isShow: true, content: t('Status'), columnName: 'status' },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, title: t('Survey Name'), name: 'surveyName' },
        { isShow: true, title: t('Type'), name: 'type' },
        { isShow: true, title: t('Category'), name: 'category' },
        { isShow: true, title: t('Language'), name: 'language' },
        { isShow: true, title: t('Design'), name: 'design' },
        { isShow: true, title: t('Company'), name: 'company' },
        { isShow: true, title: t('Department'), name: 'department' },
        { isShow: true, title: t('Position'), name: 'position' },
        { isShow: true, title: t('Business Unit'), name: 'businessUnit' },
        { isShow: true, title: t('Employee'), name: 'employee' },
        // { isShow: true, title: t('Answers'), name: 'answers' },
        // { isShow: true, title: t('Analyze'), name: 'analyze' },
        { isShow: true, title: t('Share Date'), name: 'shareDate' },
        { isShow: true, title: t('Deadline'), name: 'deadline' },
        { isShow: true, title: t('Status'), name: 'status' },
    ]);
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'surveyName', width: 200 },
        { type: 'count', columnName: 'type', width: 200 },
        { type: 'count', columnName: 'category', width: 200 },
        { type: 'count', columnName: 'language', width: 200 },
        { type: 'count', columnName: 'design', width: 200 },
        { type: 'count', columnName: 'company', width: 200 },
        { type: 'count', columnName: 'department', width: 200 },
        { type: 'count', columnName: 'position', width: 200 },
        { type: 'count', columnName: 'businessUnit', width: 200 },
        { type: 'count', columnName: 'employee', width: 200 },
        // { type: 'count', columnName: 'answers', width: 200 },
        // { type: 'count', columnName: 'analyze', width: 200 },
        { type: 'count', columnName: 'shareDate', width: 200 },
        { type: 'count', columnName: 'deadline', width: 200 },
        { type: 'count', columnName: 'status', width: 200 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'surveyName', width: 200 },
        { type: 'count', columnName: 'type', width: 200 },
        { type: 'count', columnName: 'category', width: 200 },
        { type: 'count', columnName: 'language', width: 200 },
        { type: 'count', columnName: 'design', width: 200 },
        { type: 'count', columnName: 'company', width: 200 },
        { type: 'count', columnName: 'department', width: 200 },
        { type: 'count', columnName: 'position', width: 200 },
        { type: 'count', columnName: 'businessUnit', width: 200 },
        { type: 'count', columnName: 'employee', width: 200 },
        // { type: 'count', columnName: 'answers', width: 200 },
        // { type: 'count', columnName: 'analyze', width: 200 },
        { type: 'count', columnName: 'shareDate', width: 200 },
        { type: 'count', columnName: 'deadline', width: 200 },
        { type: 'count', columnName: 'status', width: 200 },
    ]);
    // const [columnOrders, setColumnOrders] = useState(['categoryName', 'type', 'category', 'language', 'design', 'company', 'department', 'position', 'businessUnit', 'employee', 'answers', 'analyze', 'shareDate', 'deadline', 'status', 'action']);
    const [columnOrders, setColumnOrders] = useState(['categoryName', 'type', 'category', 'language', 'design', 'company', 'department', 'position', 'businessUnit', 'employee', 'shareDate', 'deadline', 'status', 'action']);

    const statusWaitingOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
        },
        { id: 2, key: 'Canceled', icon: <i style={{fontSize: "1.1rem",  marginRight: '8px'}} className="fa-solid fa-xmark"></i>, color: '#FA5C7C' },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ]

    const statusInProgressOptions = [
        { id: 2, key: 'Canceled', icon: <i style={{fontSize: "1.1rem",  marginRight: '8px'}} className="fa-solid fa-xmark"></i>, color: '#FA5C7C' },
    ]

    const statusComplatedOptions = [
        
    ]

    const statusCandeledOptions = [
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
        },
    ]

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        const itemName = getIds[2];
        const itemType = getIds[3];
        const itemCategoryId = getIds[4];
        const itemCategoryName = getIds[5];
        const itemLnId = getIds[6];
        const itemLnName = getIds[7];
        let item = data.find((item) => item.id === itemId);

        setActionItem({
            id: itemId,
            statusId: statusId,
            name: itemName,
            type: itemType,
            category: { value: itemCategoryId, label: itemCategoryName },
            language: { value: itemLnId, label: itemLnName },
            item: item,
        });
        if (statusId === 0) {
            setShowDeleteModal(true);
        }
        if (statusId === 1 || statusId === 2 || statusId === 3) {
            setShowActionModal(true);
        }
        // if (item.isApproved === 1) {
        //     setShowActionModal(true);
        // }
        if (statusId === 4) {
            setShowRejectModal(true);
        }
        if (statusId === 9) {
            setShowEditModal(true);
        }
    }

    const getDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    const activities = [
        { id: 1, activity: 'inside', backgroundColor: '#00A0DF2E', color: '#00A0DF' },
        // { id: 2, activity: 'outside', backgroundColor: '#6C757D2E', color: '#6C757D' },
        // { id: 3, activity: 'candidate', backgroundColor: '#727cf526', color: '#727CF5' },
    ];

    const tableData = data.map((item, index) => {
        return {
            id: item.id,
            surveyName: item.survey.surveyName,
            type: activities.map((obj) => {
            if (obj.id === item.survey.type) {
                return (
                    <span
                        style={{
                            backgroundColor: obj.backgroundColor,
                            color: obj.color,
                            padding: '1px 8px',
                            borderRadius: 3,
                            display: 'grid',
                            placeItems: 'center',
                        }}>
                        {obj.activity}
                    </span>
                );
            }
        }),
            category: item.survey.category.categoryName,
            language: item.survey.languageAbb.languageAbb,
            design: item.survey.questionIds.length > 0 ? (<div style={{textAlign: "center"}}><Icon path={mdiEyeOutline} size={0.8} /></div>) : <div style={{textAlign: "center"}}>+</div>,
            company: item.companies !== null ? item.companies.length === 1 ? item.companies[0].companyName : `${item.companies.length} item` : undefined,
            department: item.departmants !== null ? item.departmants.length === 1 ? item.departmants[0].departmentName : `${item.departmants.length} item` : undefined,
            position: item.positions !== null ? item.positions.length === 1 ? item.positions[0].positionName : `${item.positions.length} item` : undefined,
            businessUnit: item.businesUnites !== null ? item.businesUnites.length === 1 ? item.businesUnites[0].businesUniteName : `${item.businesUnites.length} item` : undefined,
            employee: item.employees !== null ? item.employees.length === 1 ? `${item.employees[0].name} ${item.employees[0].surname}`: `${item.employees.length} item` : undefined,
            // answers: "item.answers",
            // analyze: "item.analyze",
            shareDate: <div style={{textAlign: 'center'}}>{getDate(item.startDate)}</div>,
            deadline: <div style={{textAlign: 'center'}}>{getDate(item.endDate)}</div>,
            status: (
                    <span
                        style={
                            item.isApproved === 1 //Waiting
                                ? {
                                      backgroundColor: '#6C757D',
                                      color: '#fff',
                                  }
                                : item.isApproved === 2 //'Canceled'
                                ? {
                                      backgroundColor: '#fa5c7c',
                                      color: '#fff',
                                  }
                                : item.isApproved === 3 //'Complated'
                                ? {
                                      backgroundColor: '#0ACF97',
                                      color: '#fff',
                                  }
                                : item.isApproved === 4 // In Progress
                                ? {
                                      backgroundColor: '#3D1766',
                                      color: '#fff',
                                  }
                                : {}
                        }
                        className="status-title">
                        {item.isApproved === 1 && <i style={{ marginRight: '8px' }} className="fa-solid fa-clock-rotate-left"></i>}
                        {item.isApproved === 2 && <i style={{ marginRight: '8px' }} className="fa-regular fa-circle-question"></i>}
                        {item.isApproved === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                        {item.isApproved === 4 && <i style={{ marginRight: '8px' }} className="fa-solid fa-spinner"></i>}
                        {item.isApproved === 1 && t('Waiting')}
                        {item.isApproved === 2 && t('Canceled')}
                        {item.isApproved === 3 && t('Complated')}
                        {item.isApproved === 4 && t('In Progress')}
                    </span>
            ),
            action: <Dropdowns
                item={`?${item.id}?${item.survey.surveyName}?${item.type}?${item.survey.category.id}?${item.survey.category.categoryName}?${item.survey.languageAbb.languageAbb}`}
                option={
                    item.isApproved === 1
                        ? statusWaitingOptions
                        : item.isApproved === 2
                        ? statusCandeledOptions
                        : item.isApproved === 3
                        ? statusComplatedOptions
                        : item.isApproved === 4
                        ? statusInProgressOptions
                        : []
                }
                width="100px"
                onClick={statusClick}
            />,
        }
    })

    useEffect(() => {
        setLoader(true);
        FetchApiGet('services/SurveySystem/Survey/GetAllSharedSurveys', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        let dateNow = new Date();
                        dateNow.setHours(0,0,0,0)

                        let statusControl = [];
                        
                        data.map((item) => {
                            let aprov = item.isApproved;
                            if (new Date(item.startDate).getTime() <= dateNow.getTime() && new Date(item.endDate).getTime() >= dateNow.getTime() && item.isApproved === 1) {
                                statusControl.push({...item, isApproved: 4});
                                FetchApiPost('services/SurveySystem/Survey/UpdateSharedSurvey', 'POST', {
                                    id: item.id,
                                    startDate: item.startDate,
                                    endDate:  item.endDate,
                                    isApproved: 4,
                                    estimatedMunite: item.estimatedMunite,
                                    modifiedBy: localStorage.getItem('userName'),
                                }).then(res => {
                                    if(res.status === 201){
                                        // item.isApproved = 4;
                                        // aprov = 4;
                                        
                                    }
                                })

                            }else if(new Date(item.endDate).getTime() < dateNow.getTime() && item.isApproved !== 3 && item.isApproved === 4){
                                statusControl.push({...item, isApproved: 3});
                                FetchApiPost('services/SurveySystem/Survey/UpdateSharedSurvey', 'POST', {
                                    id: item.id,
                                    startDate: item.startDate,
                                    endDate:  item.endDate,
                                    isApproved: 3,
                                    estimatedMunite: item.estimatedMunite,
                                    modifiedBy: localStorage.getItem('userName'),
                                }).then(res => {
                                    if(res.status === 201){
                                        // item.isApproved = 3;
                                        // aprov = 3;
                                        
                                    }
                                })
                            }else{
                                statusControl.push(item);
                            }
                            // return {
                            //     ...item,
                            //     isApproved: aprov
                            // }
                        })
                        
                        setData(statusControl);
                    })
                }
                setLoader(false);
            })
    }, [])

// let a = new Date();
// a.setHours(0,0,0,0)
// console.log(a.getTime())
  return (
    <div>
        <Spin size="large" spinning={loader} style={{ top: '50%' }}>
        <MainTable
                tableData={tableData}
                columns={columns}
                columnWidths={columnWidths}
                setColumnWidths={setColumnWidths}
                tableColumnExtensions={tableColumnExtensions}
                itemsFromBackend={itemsFromBackend}
                columnOrders={columnOrders}
                setColumnOrders={setColumnOrders}
                disableFreeze={true}
                groupByItems={groupByItems}
                setGroupByItems={setGroupByItems}
                showorHideColumnsItems={showorHideColumnsItems}
                totalSummaryItems={totalSummaryItems}
                groupSummaryItems={groupSummaryItems}
                // isAddButton={true}
                // addButtonFunction={() => setAddModal(true)}
            />
        </Spin>
            

            {/* {
                addModal && (
                    <AddModal 
                        showAddModal={addModal}
                        setShowAddModal={setAddModal}
                        setData={setData}
                    />
                )
            } */}

            {
                showEditModal && (
                    <UpdateModal
                        showAddModal={showEditModal}
                        setShowAddModal={setShowEditModal}
                        actionItem={actionItem}
                        setData={setData}
                        selectedValue={actionItem}
                        data={data}
                    />
                )
            }

            {
                showDeleteModal && <Delete 
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    item = {actionItem}
                    setData={setData}
                    data={data}
                />
            }

            {
                showActionModal && (
                    <ActionModal
                        modalShow={showActionModal}
                        setModalShow={setShowActionModal}
                        item={actionItem}
                        setData={setData}
                        data={data}
                    />
                )
            }
    </div>
  )
}

export default Share