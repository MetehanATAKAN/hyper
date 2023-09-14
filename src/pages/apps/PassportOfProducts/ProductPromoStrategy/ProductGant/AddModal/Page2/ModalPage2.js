import React, { useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const ToggleProfile = ({ allData, item, group, setAllData }) => {
    const [formats, setFormats] = useState(item.chain ? item.chain[group] : ['P', 'C1', 'C2']);

    const handleFormat = (event, newFormats) => {
        if (event.target.id === 'P' && newFormats.length > 0 && !newFormats.includes('P')) {
            return setFormats([]);
        }
        if (event.target.id === 'P' && newFormats.length === 1 && newFormats.includes('P')) {
            return setFormats(['P', 'C1', 'C2']);
        }
        setFormats(newFormats);
    };

    useEffect(() => {
        const arr = allData.map((indication) => {
            if (indication.indicationId === item.id) {
                const newProfile = indication.profileDetails.map((profile) => {
                    if (profile.profileId === item.profileId) {
                        return { ...profile, selectChain: { ...item.chain, [group]: formats } };
                    }
                    return profile;
                });

                return { ...indication, profileDetails: newProfile };
            }
            return indication;
        });
        setAllData(arr.flat());
    }, [formats]);

    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        display: 'flex',
        gap: '4px',
        width: 'max-content',
        '& .MuiToggleButtonGroup-grouped': {
            backgroundColor: '#CED4DA',
            border: '1px solid #fff',
            borderRadius: '4px',
            width: '26px',
            height: '26px',
            color: '#fff',
            '&.Mui-selected': {
                color: '#fff',
                backgroundColor: '#00A0DF',
                '&:nth-child(1)': {
                    color: '#fff',
                    backgroundColor: '#00A0DF',
                },
                '&:nth-child(n + 2)': {
                    color: '#fff',
                    opacity: 0.5,
                },
            },
            '&.Mui-disabled': {
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
    return (
        <StyledToggleButtonGroup value={formats} onChange={handleFormat}>
            <ToggleButton id="P" value="P" aria-label="P">
                P
            </ToggleButton>
            <ToggleButton id="C1" value="C1" aria-label="C1">
                C
            </ToggleButton>
            <ToggleButton id="C2" value="C2" aria-label="C2">
                C
            </ToggleButton>
            <ToggleButton id="C3" value="C3" aria-label="C3">
                C
            </ToggleButton>
        </StyledToggleButtonGroup>
    );
};
const ModalPage2 = ({ setProfileData, profileData }) => {
    // const [tableData, setTableData] = useState(profileData);
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
                        <ToggleProfile
                            group={'group1'}
                            allData={profileData}
                            setAllData={setProfileData}
                            item={row.original}
                        />
                        <ToggleProfile
                            group={'group2'}
                            allData={profileData}
                            setAllData={setProfileData}
                            item={row.original}
                        />
                        <ToggleProfile
                            group={'group3'}
                            allData={profileData}
                            setAllData={setProfileData}
                            item={row.original}
                        />
                        <ToggleProfile
                            group={'group4'}
                            allData={profileData}
                            setAllData={setProfileData}
                            item={row.original}
                        />
                    </div>
                );
            },
        },
    ];
    const tableData = profileData
        ?.map((indication, i) =>
            indication.profileDetails?.map((profile) => ({
                id: indication.indicationId,
                indication: indication.indicationName,
                patientNumber: indication.patientNumber,
                category: indication.category,
                loyalty: indication.loyalty,
                profile: profile.profileName,
                profileId: profile.profileId,
                chain: profile.selectChain,
            }))
        )
        .flat();
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
