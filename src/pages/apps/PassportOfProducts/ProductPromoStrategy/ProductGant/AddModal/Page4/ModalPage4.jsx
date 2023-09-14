import React, { useEffect, useMemo, useState } from 'react';
import TableLayout from '../../../../../../../components/Tables/index';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddPromoSubject from './AddPromoSubject';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useTranslation } from 'react-i18next';

const ModalPage4 = ({ page4tableData, setPage4TableData }) => {
    const [showPromoSubjectModal, setShowPromoSubjectModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const { t } = useTranslation();
    const columns = useMemo(
        () => [
            {
                accessorKey: 'no',
                header: 'No',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 30,
            },
            {
                accessorKey: 'profile',
                header: 'Profile',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
            },
            {
                accessorKey: 'type',
                header: 'Type',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 30,
            },
            {
                accessorKey: 'pageDetail',
                header: 'Page',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                muiTableBodyCellProps: {
                    align: 'center',
                },
                size: 30,
                Cell: ({ cell, row }) => {
                    if (cell.getValue().length === 0) {
                        return <PreviewIcon />;
                    }
                    return (
                        <Link
                            onClick={() => localStorage.setItem('pages', JSON.stringify(cell.getValue()))}
                            target="_blank"
                            to={`/apps/annual-product-mix/pages`}>
                            <PreviewIcon />
                        </Link>
                    );
                },
            },
            {
                accessorKey: 'promoSubject',
                header: 'Promo Subject',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                muiTableBodyCellProps: {
                    align: 'center',
                },
                Cell: ({ cell, row }) => {
                    if (cell.getValue() === null) {
                        return (
                            <IconButton
                                onClick={() => handleShowPromoSubjetModal(row.original)}
                                sx={{ padding: 0 }}
                                size="small"
                                aria-label="add">
                                <AddIcon />
                            </IconButton>
                        );
                    }
                    return <span>{cell.getValue()}</span>;
                },
            },
            {
                accessorKey: 'need',
                header: 'Need',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
            },
            {
                accessorKey: 'benefit',
                header: 'Benefit',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
            },
            {
                accessorKey: 'action',
                header: '',
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 50,
                Cell: ({ row }) => (
                    <Tooltip title={t('edit')} arrow>
                        <IconButton
                            disabled={row.original.promoSubjectId === null}
                            onClick={() => handleShowPromoSubjetModal(row.original)}
                            size="small">
                            <EditIcon sx={{ width: 18, height: 18 }} />
                        </IconButton>
                    </Tooltip>
                ),
            },
        ],
        []
    );
    const handleShowPromoSubjetModal = (profiles) => {
        setShowPromoSubjectModal(true);
        setProfile(profiles);
    };

    return (
        <div>
            <TableLayout
                data={page4tableData}
                isTopToolbarShow={false}
                columns={columns}
                isCheckBox={false}
                pageSize={50}
            />
            {showPromoSubjectModal && (
                <AddPromoSubject
                    showModal={showPromoSubjectModal}
                    setShowModal={setShowPromoSubjectModal}
                    profile={profile}
                    setPage4TableData={setPage4TableData}
                />
            )}
        </div>
    );
};

export default ModalPage4;
