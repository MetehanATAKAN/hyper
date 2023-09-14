import { Tooltip } from '@mui/material';
import '../../../../../assets/scss/custom/components/gantTableFilter.scss';
export const columns = [
    {
        accessorKey: 'place',
        header: 'Place',
    },
    {
        accessorKey: 'placeType',
        header: 'Place Type',
    },
    {
        accessorKey: 'spec',
        header: 'Spec',
        muiTableBodyCellProps: {
            sx: {
                padding: '0px 0px 0px 6px',
            },
        },
    },
    {
        accessorKey: 'brand',
        header: 'Brand',
        size: 75,
        muiTableBodyCellProps: {
            sx: {
                padding: '0px 0px 0px 6px',
            },
        },
    },
    {
        size: 175,
        accessorKey: 'profile',
        header: 'Profile',
        Cell: ({ cell }) => (
            <Tooltip title={cell.getValue()} placement="left" arrow>
                <span>{cell.getValue()}</span>
            </Tooltip>
        ),
    },
    {
        size: 150,
        accessorKey: 'indication',
        header: 'Indication / Need',
        Cell: ({ cell }) => (
            <Tooltip title={cell.getValue()} placement="left" arrow>
                <span>{cell.getValue()}</span>
            </Tooltip>
        ),
    },
    {
        accessorKey: 'pSubject',
        header: 'P.Subject',
        Cell: ({ cell }) => (
            <Tooltip title={cell.getValue()} placement="left" arrow>
                <span>{cell.getValue()}</span>
            </Tooltip>
        ),
    },
    {
        accessorKey: 'category',
        header: 'Category',
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'pn',
        header: 'P.N.',
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'needQuantity',
        header: 'Need Quantity',
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'visitQuantity',
        header: 'Visit Quantity',
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: 'productLoyalty',
        header: 'P.Loyalty',
        muiTableBodyCellProps: {
            align: 'center',
        },
    },
    {
        accessorKey: '1',
        header: '1',
        Cell: ({ cell, row }) => {
            return (
                <div
                    className={
                        cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'
                    }></div>
            );
        },
    },
    {
        accessorKey: '2',
        header: '2',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '3',
        header: '3',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '4',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
        header: '4',
    },
    {
        accessorKey: '5',
        header: '5',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '6',
        header: '6',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '7',
        header: '7',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '8',
        header: '8',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '9',
        header: '9',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '10',
        header: '10',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '11',
        header: '11',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '12',
        header: '12',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '13',
        header: '13',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '14',
        header: '14',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '15',
        header: '15',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '16',
        header: '16',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },

    {
        accessorKey: '17',
        header: '17',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '18',
        header: '18',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '19',
        header: '19',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '20',
        header: '20',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },

    {
        accessorKey: '21',
        header: '21',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '22',
        header: '22',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '23',
        header: '23',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '24',
        header: '24',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '25',
        header: '25',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '26',
        header: '26',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '27',
        header: '27',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '28',
        header: '28',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '29',
        header: '29',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '30',
        header: '30',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '31',
        header: '31',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '32',
        header: '32',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },

    {
        accessorKey: '33',
        header: '33',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '34',
        header: '34',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '35',
        header: '35',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '36',
        header: '36',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '37',
        header: '37',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '38',
        header: '38',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '39',
        header: '39',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '40',
        header: '40',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '41',
        header: '41',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '42',
        header: '42',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '43',
        header: '43',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '44',
        header: '44',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '45',
        header: '45',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '46',
        header: '46',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '47',
        header: '47',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: '48',
        header: '48',
        Cell: ({ cell }) => (
            <div className={cell.getValue() ? 'gant-table-cell-view-has-data' : 'gant-table-cell-view-no-data'}></div>
        ),
    },
    {
        accessorKey: 'action',
        header: '',
        enableColumnDragging: false,
        enableColumnActions: false,
        enableResizing: false,
    },
];
