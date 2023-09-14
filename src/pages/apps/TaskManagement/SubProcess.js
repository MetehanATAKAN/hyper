import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../../../assets/scss/custom/taskmanagement/subProcess.scss';
import Name from './subProcess/Name';
import Approve from './subProcess/Approve';
import Gant from './subProcess/Gant';
import Estimated from './subProcess/Estimated';
import CheckList from './subProcess/CheckList';
import { useTranslation } from 'react-i18next';

const SubProcess = (props) => {
    const { setOnModal, subProcess, activityTypes, setSubProcess, parentProcess, setParentProcess,onModal } = props;
    const { t } = useTranslation();
    const [tabValue, setTabValue] = useState('1');
    const tabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const tabStyle = {
        color: '#5d636a',
        textTransform: 'none',
        fontWeight: '600',
    };
    return (
        <>
         {
            onModal &&
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="fullWidth" id="process-tabs" textColor="primary" onChange={tabChange}>
                        <Tab style={tabStyle} label={t('Name')} value="1" />
                        <Tab style={tabStyle} label={t('Approve')} value="2" />
                        <Tab style={tabStyle} label={t('Gant')} value="3" />
                        <Tab style={tabStyle} label={t('Estimated')} value="4" />
                        <Tab style={tabStyle} label={t('Check List')} value="5" />
                    </TabList>
                </Box>
                {/* Name */}
                <TabPanel value="1" id="process-tabs__content">
                    <Name
                        setOnModal={setOnModal}
                        subProcess={subProcess}
                        activityTypes={activityTypes}
                        setSubProcess={setSubProcess}
                        parentProcess={parentProcess}
                        setParentProcess={setParentProcess}
                        setTabValue={setTabValue}
                    />
                </TabPanel>
                {/* Approve */}
                <TabPanel value="2" id="process-tabs__content">
                    <Approve setOnModal={setOnModal} setTabValue={setTabValue} />
                </TabPanel>
                {/* Gantt */}
                <TabPanel value="3" id="process-tabs__content">
                    <Gant setOnModal={setOnModal} subProcess={subProcess} setTabValue={setTabValue} />
                </TabPanel>
                {/* Estimated */}
                <TabPanel value="4" id="process-tabs__content">
                    <Estimated setOnModal={setOnModal} setTabValue={setTabValue} />
                </TabPanel>
                {/* Check List */}
                <TabPanel value="5" id="process-tabs__content">
                    <CheckList setOnModal={setOnModal} />
                </TabPanel>
            </TabContext>
        </Box>
         }
        </>
    );
};

export default React.memo(SubProcess);
