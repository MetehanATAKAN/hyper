import React, { useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
const ToggleProfile = ({ allData, detail, setAllData, item, group, used }) => {
    const [formats, setFormats] = useState(['P', 'C1', 'C2']);
    useEffect(() => {
        const itemFormats = detail?.filter((x) => x.isDisable === false)?.map((y) => y.typeAbb);
        setFormats(itemFormats);
    }, []);

    const handleFormat = (event, newFormats) => {
        const addArr = allData.map((profile, i) => {
            if (profile.profileId === item.profileId) {
                const a = profile.orderDetail.map((details, j) => {
                    if (j === group) {
                        const promoDetail = details.promoSubjectDetail?.map((promo, k) => {
                            if (k === Number(event.target.id)) {
                                return { ...promo, isDisable: !promo.isDisable };
                            }
                            return promo;
                        });
                        return { ...details, promoSubjectDetail: promoDetail };
                    }
                    return details;
                });
                return { ...profile, orderDetail: a };
            }
            return profile;
        });
        setAllData(addArr);
    };
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        display: 'flex',
        gap: '4px',
        width: 'max-content',
        '& .MuiToggleButtonGroup-grouped': {
            backgroundColor: '#00A0DF',
            border: '1px solid #fff',
            borderRadius: '4px',
            width: '26px',
            height: '26px',
            color: '#fff',
            '&.Mui-selected': {
                color: '#fff',
                backgroundColor: '#00A0DF',
                '&:nth-child(n + 2)': {
                    color: '#fff',
                    opacity: 0.5,
                },
            },
            '&[aria-checked=true]': {
                backgroundColor: '#CED4DA',
            },
            '&:not(:first-of-type)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-of-type': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    }));
    if (used === true) {
        return (
            <StyledToggleButtonGroup value={formats}>
                {detail.map((x, i) => (
                    <ToggleButton aria-checked={x.isDisable} id={i} value={x.typeAbb} aria-label={x.typeAbb}>
                        {x.typeAbb}
                    </ToggleButton>
                ))}
            </StyledToggleButtonGroup>
        );
    }
    return (
        <StyledToggleButtonGroup value={formats} onChange={handleFormat}>
            {detail.map((x, i) => (
                <ToggleButton aria-checked={x.isDisable} id={i} value={x.typeAbb} aria-label={x.typeAbb}>
                    {x.typeAbb}
                </ToggleButton>
            ))}
        </StyledToggleButtonGroup>
    );
};
const ModalPage2 = ({ setProfileData, profileData }) => {
    const columns = [
        {
            accessorKey: 'indication',
            header: 'Indication',
            size: 150,
        },
        {
            accessorKey: 'profile',
            header: 'Profile',
        },
        {
            accessorKey: 'patientNumber',
            header: 'Patient Number',
            size: 50,
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'category',
            header: 'Category',
            size: 50,
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'loyalty',
            header: 'Actual Loyalty',
            size: 50,
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'target',
            header: 'Target',
            size: 30,
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'chain',
            header: 'Select Chain Model',
            size: 450,
            Cell: ({ cell, row }) => {
                return (
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {row.original.chain?.map((item, i) => (
                            <ToggleProfile
                                used={item.isUsed}
                                group={i}
                                allData={profileData}
                                setAllData={setProfileData}
                                detail={item.promoSubjectDetail}
                                item={row.original}
                            />
                        ))}
                    </div>
                );
            },
        },
    ];
    const tableData = profileData?.map((profile) => ({
        profileId: profile.profileId,
        profile: profile.profileName,
        chain: profile.orderDetail,
        patientNumber: profile.patientNumber,
        category: profile.profileCategory,
        loyalty: profile.actualLoyalty,
        target: profile.target,
    }));
    return (
        <div id="strategy-modal">
            <MaterialReactTable
                columns={columns}
                data={tableData}
                enableStickyHeader
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                muiTableBodyRowProps={{ hover: false }}
                muiTableContainerProps={{ sx: { boxShadow: 'none' } }}
                muiTableProps={{
                    sx: {
                        tableLayout: 'grid',
                        boxShadow: 0,
                    },
                    size: 'small',
                }}
                muiTableHeadCellProps={{
                    align: 'left',
                    sx: {
                        boxShadow: 'none',
                        color: '#6C757D',
                        paddingBottom: '4px',
                    },
                }}
                muiTableBodyCellProps={{
                    align: 'left',
                    sx: {
                        boxShadow: 'none',
                        color: '#6C757D',
                    },
                }}
            />
        </div>
    );
};

export default ModalPage2;
