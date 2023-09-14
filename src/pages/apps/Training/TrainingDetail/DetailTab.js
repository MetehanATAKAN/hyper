import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';

const DetailTab = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabStyle = {
        fontSize: '1.125rem',
        '&.MuiTab-root': {
            color: '#CBD5E0',
        },
        '&.Mui-selected': {
            color: '#4A5568',
        },
        '&.MuiTab-textPrimarySecondary': {
            color: '#CBD5E0',
        },
    };
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{ backgroundColor: '#fff', padding: '12px', position: 'sticky', top: 0 }}
            aria-label="scrollable force tabs example">
            <Tab sx={tabStyle} label="Item One" />
            <Tab sx={tabStyle} label="Item Two" />
            <Tab sx={tabStyle} label="Item Three" />
            <Tab sx={tabStyle} label="Item Four" />
            <Tab sx={tabStyle} label="Item Five" />
            <Tab sx={tabStyle} label="Item Six" />
            <Tab sx={tabStyle} label="Item Seven" />
        </Tabs>
    );
};

export default React.memo(DetailTab);
