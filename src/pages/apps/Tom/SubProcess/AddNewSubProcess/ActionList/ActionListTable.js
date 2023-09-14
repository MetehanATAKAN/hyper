import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputNumberDefault } from '../../../../../../components/FormElements/Input';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TableAccordion from '../../../../../../components/Tables/TableAccordion';
import { Button } from '../../../../../../components/FormElements/Button';
import MaterialReactTable from 'material-react-table';


const ActionListTable = () => {

    const { t } = useTranslation();

    const [data, setData] = useState([
        {
            id:1,
            actionName:'deneme',
            easy:1,
            medium:2,
            hard:3,
            extreme:4
        },
        {
            id:2,
            actionName:'denem2',
            easy:23,
            medium:45,
            hard:56,
            extreme:67
        }
    ]);

    console.log(data);
    const columns = [
        {
            header: t('Action Name'),
            accessorKey: 'actionName',
            size: '700'
        },
        {
            header: t('Easy'),
            accessorKey: 'easy',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell:({cell,row}) => {
                return(
                    <InputNumberDefault
                    value={cell.getValue()}
                    setValue={(e)=>{
                        const dataId = row.original.id;
                        const newData = data?.map(el => {
                            if(el.id === dataId) {
                                el.easy = e
                            }
                            return el;
                        });
                       setData(newData);
                    }}
                    />
                )
            }
        },
        {
            header: t('Medium'),
            accessorKey: 'medium',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell:({cell,row}) => {
                return(
                    <InputNumberDefault
                    value={cell.getValue()}
                    setValue={(e)=>{
                        const dataId = row.original.id;
                        const newData = data?.map(el => {
                            if(el.id === dataId) {
                                el.medium = e
                            }
                            return el;
                        });
                       setData(newData);
                    }}
                    />
                )
            }
        },
        {
            header: t('Hard'),
            accessorKey: 'hard',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell:({cell,row}) => {
                return(
                    <InputNumberDefault
                    value={cell.getValue()}
                    setValue={(e)=>{
                        const dataId = row.original.id;
                        const newData = data?.map(el => {
                            if(el.id === dataId) {
                                el.hard = e
                            }
                            return el;
                        });
                       setData(newData);
                    }}
                    />
                )
            }
        },
        {
            header: t('Extreme'),
            accessorKey: 'extreme',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell:({cell,row}) => {
                return(
                    <InputNumberDefault
                    value={cell.getValue()}
                    setValue={(e)=>{
                        const dataId = row.original.id;
                        const newData = data?.map(el => {
                            if(el.id === dataId) {
                                el.extreme = e
                            }
                            return el;
                        });
                       setData(newData);
                    }}
                    />
                )
            }
        },
        {
            header: t(''),
            accessorKey: 'delete',
            size: '10',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                return (
                    <DeleteOutlineIcon className='table-delete-icon' />
                )
            }
        },
    ]

    const [totalEasy, setTotalEasy] = useState(0);
    const [totalMedium, setTotalMedium] = useState(0);

    console.log(totalEasy);
    console.log(totalMedium);

    useEffect(() => {
        setTotalEasy(0);;
        setTotalMedium(0);
      data?.map(el =>{
        setTotalEasy(total => total + el.easy)
        setTotalMedium(total => total + el.medium)
      })
    }, [data])
    

  return (
    <>
    <div className='new-sub-process-table-header'>
               
                <Button
                type="primary" 
                className='new-sub-process-table-add-button'
                >
                    + 
                </Button>
            </div>
            <div id="new-table-layout">
          <MaterialReactTable
              autoResetPageIndex={false}
              columns={columns}
              data={data}
              enableRowOrdering
              enableSorting={false}
              muiTableBodyRowDragHandleProps={({ table }) => ({
                  onDragEnd: () => {
                      const { draggingRow, hoveredRow } = table.getState();
                      if (hoveredRow && draggingRow) {
                          data.splice(
                              hoveredRow.index,
                              0,
                              data.splice(draggingRow.index, 1)[0],
                          );
                          setData([...data]);
                      }
                  },
                  
              })}
              muiTableContainerProps={{ sx: { maxHeight: 'calc(100vh - 325px)' } }}
              enableDensityToggle={true}
              paginateExpandedRows={false}
              enableColumnResizing
              enableGrouping
              enableStickyHeader
              enableStickyFooter
              enableColumnFilterModes
              enableColumnOrdering
              enablePinning
              filterFromLeafRows
              positionActionsColumn="last"
              enableRowActions={false}
              enableTopToolbar={false}
            //   state={{
            //       isLoading,
            //   }}
              muiTableProps={{
                  sx: {
                      tableLayout: 'fixed',
                  },
                  size: 'small',
              }}
              initialState={{
                  density: 'compact',
                  pagination: { pageIndex: 0, pageSize: 10 },
              }}
              defaultColumn={{
                  maxSize: 700,
                  minSize: 60,
                  size: 60,
                  muiTableHeadCellProps: {
                      align: 'left',
                  },
                  muiTableBodyCellProps: {
                      align: 'left',
                      sx: {
                          boxShadow: 'none',
                      },
                  },
              }}
              displayColumnDefOptions={{
                  'mrt-row-expand': {
                      size: 30,
                      maxSize: 30,
                      minSize: 20,
                      muiTableHeadCellProps: {
                          align: 'center',
                          sx: {
                              boxShadow: 'none',
                          },
                      },
                      muiTableBodyCellProps: {
                          align: 'center',
                          sx: {
                              boxShadow: 'none',
                          },
                      },
                  },
                  'mrt-row-select': {
                      size: 30,
                      muiTableHeadCellProps: {
                          align: 'center',
                      },
                      muiTableBodyCellProps: {
                          align: 'center',
                      },
                  },
              }}
          />
          </div>
            {/* <TableAccordion
                columns={columns}
                data={data}
                isBulkButtons={false}
                isCheckBox={false}
                enableExpanding={false}
                isFilter={false}
                isTopToolbarShow={false}
               /> */}
    </>
  )
}

export default ActionListTable