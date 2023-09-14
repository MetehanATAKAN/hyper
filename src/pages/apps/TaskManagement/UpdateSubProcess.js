import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import '../../../assets/scss/custom/taskmanagement/subProcess.scss';
import { useTranslation } from 'react-i18next';
import UpdateName from './subProcess/UpdateName';
import UpdateApprove from './subProcess/UpdateApprove';
import UpdateGant from './subProcess/UpdateGant';
import UpdateEstimated from './subProcess/UpdateEstimated';
import UpdateCheckList from './subProcess/UpdateCheckList';

const UpdateSubProcess = (props) => {
    const {
        setOnModal,
        subProcess,
        updateSubProcess,
        setUpdateSubProcess,
        activityTypes,
        setSubProcess,
        parentProcess,
        filterBtn,
        setFilterSubData,
        selectProcessName,
        selectDepartments,
        selectApprove,
    } = props;
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
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList variant="fullWidth" id="process-tabs" textColor="primary" onChange={tabChange}>
                            <Tab style={tabStyle} label={t('Name')} disabled value="1" />
                            <Tab style={tabStyle} label={t('Approve')} disabled value="2" />
                            <Tab style={tabStyle} label={t('Gant')} disabled value="3" />
                            <Tab style={tabStyle} label={t('Estimated')} disabled value="4" />
                            <Tab style={tabStyle} label={t('Check List')} disabled value="5" />
                        </TabList>
                    </Box>
                    {/* Name */}
                    <TabPanel value="1" id="process-tabs__content">
                        <UpdateName
                            setOnModal={setOnModal}
                            subProcess={subProcess}
                            updateSubProcess={updateSubProcess}
                            setUpdateSubProcess={setUpdateSubProcess}
                            activityTypes={activityTypes}
                            setSubProcess={setSubProcess}
                            setTabValue={setTabValue}
                            filterBtn={filterBtn}
                            setFilterSubData={setFilterSubData}
                            selectProcessName={selectProcessName}
                            selectDepartments={selectDepartments}
                            selectApprove={selectApprove}
                        />
                    </TabPanel>
                    {/* Approve */}
                    <TabPanel value="2" id="process-tabs__content">
                        <UpdateApprove
                            setOnModal={setOnModal}
                            updateSubProcess={updateSubProcess}
                            setTabValue={setTabValue}
                        />
                    </TabPanel>
                    {/* Gantt */}
                    <TabPanel value="3" id="process-tabs__content">
                        <UpdateGant setOnModal={setOnModal} subProcess={subProcess[0]} setTabValue={setTabValue} />
                    </TabPanel>
                    {/* Estimated */}
                    <TabPanel value="4" id="process-tabs__content">
                        <UpdateEstimated setOnModal={setOnModal} setTabValue={setTabValue} />
                    </TabPanel>
                    {/* Check List */}
                    <TabPanel value="5" id="process-tabs__content">
                        <UpdateCheckList setOnModal={setOnModal} setTabValue={setTabValue} />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
};

export default React.memo(UpdateSubProcess);
