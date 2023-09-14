import React, { useMemo, useState } from 'react';
import Table from '../../../components/Tables/TableAccordion';
import Filter from './Filter';
import Icon from '@mdi/react';
import { mdiPresentation } from '@mdi/js';
import { Link } from 'react-router-dom';

const Training = () => {
    const [isFilter, setIsFilter] = useState(true);
    const [data, setData] = useState([
        {
            name: 'Almiba',
            content: '',
            status: 'Waiting',
            subRows: [
                {
                    name: 'Indication',
                    content: '',
                    status: 'In progress',
                    subRows: [{ name: 'Promo Subject', content: '', status: 'Completed' }],
                },
            ],
        },
    ]);
    const columns = useMemo(
        () => [
            { accessorKey: 'name', header: 'Name', size: 800 },
            {
                accessorKey: 'content',
                header: <Icon path={mdiPresentation} size={1} />,
                size: 40,
                enableResizing: false,
                enableColumnOrdering: false,
                enableColumnDragging: false,
                enableColumnFilter: false,
                enableColumnFilterModes: false,
                showColumnFilters: false,
                enableFilters: false,
                enableColumnFilters: false,
                enableColumnActions: false,
                muiTableBodyCellProps: { align: 'center' },
                muiTableHeadCellProps: {
                    sx: {
                        margin: 0,
                        boxShadow: 'none',
                        color: '#6C757D',
                        padding: 0,
                        paddingBottom: '4px',
                        paddingLeft: '14px',
                    },
                },
                Cell: ({ cell }) => (
                    <Link to={'/apps/training-detail'}>
                        <Icon path={mdiPresentation} size={1} />
                    </Link>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 100,
                Cell: ({ cell }) => (
                    <span style={{ backgroundColor: '#FA5C7C', color: '#fff' }} className="full-cell">
                        {cell.getValue()}
                    </span>
                ),
            },
        ],
        []
    );
    return (
        <div>
            <Table
                data={data}
                columns={columns}
                isHasStatus={false}
                filter={<Filter />}
                filterShow={isFilter}
                setFilterShow={setIsFilter}
            />
        </div>
    );
};

export default React.memo(Training);
