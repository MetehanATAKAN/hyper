import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import CreateOrgPlanModal from './CreateOrgPlanModal';
import Filter from './Filter';

const Table = () => {

  const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [isFilters, setIsFilters] = useState(true);

  const [tableData, setTableData] = useState([]);
  const [columns] = useState([
      { name: 'companies', title: t('Companies') },
      { name: 'businessUnite', title: t('Business Unite') },
      { name: 'employee', title: t('Employee') },
      { name: 'team', title: t('Team') },
      { name: 'department', title: t('Department') },
      { name: 'position', title: t('Position') },
      { name: 'plannedLevel', title: t('Planned Level') },
      { name: 'operationalSupervisor', title: 'Operational Supervisor' },
      { name: 'functionalCompany', title: 'Functional Company' },
      { name: 'functionalDepartment', title: 'Functional Department' },
      { name: 'functionalSupervisor', title: 'Functional Supervisor' },
      { name: 'workingPlace', title: 'Working Place' },
      { name: 'country', title: 'Country' },
      { name: 'region', title: 'Region' },
      { name: 'area', title: 'Area' },
      { name: 'zone', title: 'Zone' },
      { name: 'startDate', title: 'Start Date' },
      { name: 'endDate', title: 'End Date' },
      { name: 'hierarchy', title: 'Hierarchy' },
      { name: 'status', title: 'Status' },
      { name: 'actions', title: ' ' },
    ]);
  
  
    //Export Columns
    const [exportColumns] = useState([
      { name: 'companies', title: t('Companies') },
      { name: 'businessUnite', title: t('Business Unite') },
      { name: 'employee', title: t('Employee') },
      { name: 'team', title: t('Team') },
      { name: 'department', title: t('Department') },
      { name: 'position', title: t('Position') },
      { name: 'plannedLevel', title: t('Planned Level') },
      { name: 'operationalSupervisor', title: 'Operational Supervisor' },
      { name: 'functionalCompany', title: 'Functional Company' },
      { name: 'functionalDepartment', title: 'Functional Department' },
      { name: 'functionalSupervisor', title: 'Functional Supervisor' },
      { name: 'workingPlace', title: 'Working Place' },
      { name: 'country', title: 'Country' },
      { name: 'region', title: 'Region' },
      { name: 'area', title: 'Area' },
      { name: 'zone', title: 'Zone' },
      { name: 'startDate', title: 'Start Date' },
      { name: 'endDate', title: 'End Date' },
  ])
  
    // Table Columns Resizing Width
    const [columnWidths, setColumnWidths] = useState([
      { columnName: 'companies',width:'15%' },
      { columnName: 'businessUnite',width:'15%' },
      { columnName: 'employee',width:'15%'},
      { columnName: 'team' ,width:'15%'},
      { columnName: 'department',width:'15%' },
      { columnName: 'position',width:'15%' },
      { columnName: 'plannedLevel',width:'15%' },
      { columnName: 'operationalSupervisor',width:'15%' },
      { columnName: 'functionalCompany',width:'15%' },
      { columnName: 'functionalDepartment',width:'15%'},
      { columnName: 'functionalSupervisor',width:'15%' },
      { columnName: 'workingPlace',width:'15%' },
      { columnName: 'country',width:'15%' },
      { columnName: 'region',width:'15%' },
      { columnName: 'area',width:'15%' },
      { columnName: 'zone',width:'15%' },
      { columnName: 'startDate',width:'10%' },
      { columnName: 'endDate',width:'10%' },
      { columnName: 'hierarchy',width:'5%' },
      { columnName: 'status',width:'10%' },
      { columnName: 'actions',width:'5%'},
    ]);
  
    //Table Column Reordering
    const [tableColumnExtensions] = useState([
      { columnName: 'companies',width:'15%' },
      { columnName: 'businessUnite',width:'15%' },
      { columnName: 'employee',width:'15%'},
      { columnName: 'team' ,width:'15%'},
      { columnName: 'department',width:'15%' },
      { columnName: 'position',width:'15%' },
      { columnName: 'plannedLevel',width:'15%' },
      { columnName: 'operationalSupervisor',width:'15%' },
      { columnName: 'functionalCompany',width:'15%' },
      { columnName: 'functionalDepartment',width:'15%'},
      { columnName: 'functionalSupervisor',width:'15%' },
      { columnName: 'workingPlace',width:'15%' },
      { columnName: 'country',width:'15%' },
      { columnName: 'region',width:'15%' },
      { columnName: 'area',width:'15%' },
      { columnName: 'zone',width:'15%' },
      { columnName: 'startDate',width:'15%' },
      { columnName: 'endDate',width:'15%' },
      { columnName: 'hierarchy',width:'5%' },
      { columnName: 'status',width:'10%' },
      { columnName: 'actions',width:'5%'},
    ]);
  
    //Freeze Columns
    const itemsFromBackend = [
      { id: '1', isFreeze: false, content:'Companies',columnName: 'companies',width:'15%' },
      { id: '2', isFreeze: false, content:'Business Unite',columnName: 'businessUnite',width:'15%' },
      { id: '3', isFreeze: false, content:'Employee',columnName: 'employee',width:'15%'},
      { id: '4', isFreeze: false, content:'Team',columnName: 'team' ,width:'15%'},
      { id: '5', isFreeze: false, content:'Department',columnName: 'department',width:'15%' },
      { id: '6', isFreeze: false, content:'Position',columnName: 'position',width:'15%' },
      { id: '7', isFreeze: false, content:'Planned Level',columnName: 'plannedLevel',width:'15%' },
      { id: '8', isFreeze: false, content:'Operational Supervisor',columnName: 'operationalSupervisor',width:'15%' },
      { id: '9', isFreeze: false, content:'Functional Company',columnName: 'functionalCompany',width:'15%' },
      { id: '10', isFreeze: false, content:'Functional Department',columnName: 'functionalDepartment',width:'15%'},
      { id: '11', isFreeze: false, content:'Functional Supervisor',columnName: 'functionalSupervisor',width:'15%' },
      { id: '12', isFreeze: false, content:'Working Place',columnName: 'workingPlace',width:'15%' },
      { id: '13', isFreeze: false, content:'Country',columnName: 'country',width:'15%' },
      { id: '14', isFreeze: false, content:'Region',columnName: 'region',width:'15%' },
      { id: '15', isFreeze: false, content:'Area',columnName: 'area',width:'15%' },
      { id: '16', isFreeze: false, content:'Zone',columnName: 'zone',width:'15%' },
      { id: '17', isFreeze: false, content:'Start Date',columnName: 'startDate',width:'15%' },
      { id: '18', isFreeze: false, content:'End Date',columnName: 'endDate',width:'15%' },
      { id: '19', isFreeze: false, content:'Hierarchy',columnName: 'hierarchy',width:'5%' },
      { id: '20', isFreeze: false, content:'Status',columnName: 'status',width:'10%' },
      // { id: '1', isFreeze: false, content:'mete',columnName: 'actions',width:'5%'},
    ];
  
    // Table show or hide items
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
      { isShow: true, name: 'companies', title: t('Companies') },
      { isShow: true, name: 'businessUnite', title: t('Business Unite') },
      { isShow: true, name: 'employee', title: t('Employee') },
      { isShow: true, name: 'team', title: t('Team') },
      { isShow: true, name: 'department', title: t('Department') },
      { isShow: true, name: 'position', title: t('Position') },
      { isShow: true, name: 'plannedLevel', title: t('Planned Level') },
      { isShow: true, name: 'operationalSupervisor', title: 'Operational Supervisor' },
      { isShow: true, name: 'functionalCompany', title: 'Functional Company' },
      { isShow: true, name: 'functionalDepartment', title: 'Functional Department' },
      { isShow: true, name: 'functionalSupervisor', title: 'Functional Supervisor' },
      { isShow: true, name: 'workingPlace', title: 'Working Place' },
      { isShow: true, name: 'country', title: 'Country' },
      { isShow: true, name: 'region', title: 'Region' },
      { isShow: true, name: 'area', title: 'Area' },
      { isShow: true, name: 'zone', title: 'Zone' },
      { isShow: true, name: 'startDate', title: 'Start Date' },
      { isShow: true, name: 'endDate', title: 'End Date' },
      { isShow: true, name: 'hierarchy', title: 'Hierarchy' },
      { isShow: true, name: 'status', title: 'Status' },
    ])
  
    // Group By Items
    const [groupByItems, setGroupByItems] = useState([
      { id: '1', isShow: true, content:'Companies',columnName: 'companies',width:'15%' },
      { id: '2', isShow: true, content:'Business Unite',columnName: 'businessUnite',width:'15%' },
      { id: '3', isShow: true, content:'Employee',columnName: 'employee',width:'15%'},
      { id: '4', isShow: true, content:'Team',columnName: 'team' ,width:'15%'},
      { id: '5', isShow: true, content:'Department',columnName: 'department',width:'15%' },
      { id: '6', isShow: true, content:'Position',columnName: 'position',width:'15%' },
      { id: '7', isShow: true, content:'Planned Level',columnName: 'plannedLevel',width:'15%' },
      { id: '8', isShow: true, content:'Operational Supervisor',columnName: 'operationalSupervisor',width:'15%' },
      { id: '9', isShow: true, content:'Functional Company',columnName: 'functionalCompany',width:'15%' },
      { id: '10', isShow: true, content:'Functional Department',columnName: 'functionalDepartment',width:'15%'},
      { id: '11', isShow: true, content:'Functional Supervisor',columnName: 'functionalSupervisor',width:'15%' },
      { id: '12', isShow: true, content:'Working Place',columnName: 'workingPlace',width:'15%' },
      { id: '13', isShow: true, content:'Country',columnName: 'country',width:'15%' },
      { id: '14', isShow: true, content:'Region',columnName: 'region',width:'15%' },
      { id: '15', isShow: true, content:'Area',columnName: 'area',width:'15%' },
      { id: '16', isShow: true, content:'Zone',columnName: 'zone',width:'15%' },
      { id: '17', isShow: true, content:'Start Date',columnName: 'startDate',width:'15%' },
      { id: '18', isShow: true, content:'End Date',columnName: 'endDate',width:'15%' },
      { id: '19', isShow: true, content:'Hierarchy',columnName: 'hierarchy',width:'5%' },
      { id: '20', isShow: true, content:'Status',columnName: 'status',width:'10%' },
    ])
  
    // Summary
    const [totalSummaryItems, setTotalSummaryItems] = useState([
      { type:'count',columnName: 'companies',width:'15%' },
      { type:'count',columnName: 'businessUnite',width:'15%' },
      { type:'count',columnName: 'employee',width:'15%'},
      { type:'count',columnName: 'team' ,width:'15%'},
      { type:'count',columnName: 'department',width:'15%' },
      { type:'count',columnName: 'position',width:'15%' },
      { type:'count',columnName: 'plannedLevel',width:'15%' },
      { type:'count',columnName: 'operationalSupervisor',width:'15%' },
      { type:'count',columnName: 'functionalCompany',width:'15%' },
      { type:'count',columnName: 'functionalDepartment',width:'15%'},
      { type:'count',columnName: 'functionalSupervisor',width:'15%' },
      { type:'count',columnName: 'workingPlace',width:'15%' },
      { type:'count',columnName: 'country',width:'15%' },
      { type:'count',columnName: 'region',width:'15%' },
      { type:'count',columnName: 'area',width:'15%' },
      { type:'count',columnName: 'zone',width:'15%' },
      { type:'count',columnName: 'startDate',width:'15%' },
      { type:'count',columnName: 'endDate',width:'15%' },
      { type:'count',columnName: 'hierarchy',width:'5%' },
      { type:'count',columnName: 'status',width:'10%' },
    ])
  
    const [groupSummaryItems, setGroupSummaryItems] = useState([
      { type:'count',columnName: 'companies',width:'15%' },
      { type:'count',columnName: 'businessUnite',width:'15%' },
      { type:'count',columnName: 'employee',width:'15%'},
      { type:'count',columnName: 'team' ,width:'15%'},
      { type:'count',columnName: 'department',width:'15%' },
      { type:'count',columnName: 'position',width:'15%' },
      { type:'count',columnName: 'plannedLevel',width:'15%' },
      { type:'count',columnName: 'operationalSupervisor',width:'15%' },
      { type:'count',columnName: 'functionalCompany',width:'15%' },
      { type:'count',columnName: 'functionalDepartment',width:'15%'},
      { type:'count',columnName: 'functionalSupervisor',width:'15%' },
      { type:'count',columnName: 'workingPlace',width:'15%' },
      { type:'count',columnName: 'country',width:'15%' },
      { type:'count',columnName: 'region',width:'15%' },
      { type:'count',columnName: 'area',width:'15%' },
      { type:'count',columnName: 'zone',width:'15%' },
      { type:'count',columnName: 'startDate',width:'15%' },
      { type:'count',columnName: 'endDate',width:'15%' },
      { type:'count',columnName: 'hierarchy',width:'5%' },
      { type:'count',columnName: 'status',width:'10%' },
    ])

    const [columnOrders, setColumnOrders] = useState([
      'companies', 
      'businessUnite', 
      'employee', 
      'team', 
      'department', 
      'position',
      'plannedLevel',
      'operationalSupervisor',
      'functionalCompany',
      'functionalDepartment',
      'functionalSupervisor',
      'workingPlace',
      'country',
      'region',
      'area',
      'zone',
      'startDate',
      'endDate',
      'hierarchy',
      'status',
      'actions',
    ]);

    const createOrgPlan = () => {
      setShow(true);
    }
  return (
    <div>
       <MainTable
              tableData={tableData}
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
              addButtonFunction={createOrgPlan}
              isFilters={isFilters}
              filters={<Filter isFilters={isFilters} setIsFilters={setIsFilters} />}
          />

          {
            show && 
            <CreateOrgPlanModal show={show} setShow={setShow}  />
          }
    </div>
  )
}

export default Table