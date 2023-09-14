import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

const UpdateGant = ({ subProcess, setOnModal, setTabValue }) => {
    const { t } = useTranslation();
    const subProcessIdNew = useSelector((state) => state.TaskManagement.newSubProcessId);
    const subProcessIdOld = useSelector((state) => state.TaskManagement.oldSubProcessId);
    const loggedUserName = localStorage.getItem('userName');
    const [updateGantData, setUpdateGantData] = useState([]);
    const [subProcessOptions, setSubProcessOptions] = useState([]);
    const [selectedChildProcess, setSelectedChildProcess] = useState({
        id: 0,
        value: 'select child process',
        label: t('select child process'),
    });
    const [selectedSubProcess, setSelectedSubProcess] = useState({
        id: 0,
        value: 'select process',
        label: t('select process'),
    });
    useEffect(() => {
        subProcess.map((parent) => {
            setSubProcessOptions((prev) => [...prev, { id: parent.id, value: parent.title, label: parent.title }]);
        });
    }, [subProcess]);
    useEffect(() => {
        (async () => {
            try {
                const response = await FetchApiGet(
                    `services/TaskManagement/SubProcess/GetGantBySubProcessId?subProcessId=${Number(subProcessIdOld)}`,
                    'GET'
                );
                if (response.status === 200) {
                    const json = await response.json();
                    await setUpdateGantData([json.data]);
                }
                if (response.status === 409) {
                    await setUpdateGantData([]);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [subProcessIdOld]);
    useEffect(() => {
        if (updateGantData.length > 0) {
            setSelectedSubProcess({
                id: updateGantData[0].parentProcessId,
                value: updateGantData[0].parentProcessName,
                label: updateGantData[0].parentProcessName,
            });
            setSelectedChildProcess({
                id: updateGantData[0].childProcessId,
                value: updateGantData[0].childProcessName,
                label: updateGantData[0].childProcessName,
            });
        }
    }, [updateGantData]);

    const updateGant = () => {
        const data = {
            parentProcessId: selectedSubProcess.id,
            childProcessId: selectedChildProcess.id,
            subProcessId: Number(subProcessIdNew) === 0 ? Number(subProcessIdOld) : Number(subProcessIdNew),
            modifiedBy: loggedUserName,
        };
        FetchApiPost('services/TaskManagement/SubProcess/UpdateGantSubProcess', 'POST', data).catch((err) => {
            console.log(err);
        });
        setTabValue('4');
    };
    return (
        <div className="sub-process-gant">
            <div className="sub-process-dropdowns">
                <label>{t('parent process')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder="select"
                    value={selectedSubProcess}
                    onChange={(e) => setSelectedSubProcess(e)}
                    classNamePrefix="react-select"
                    options={subProcessOptions.filter((el) => el.id !== selectedChildProcess.id)}></Select>
            </div>
            <div className="sub-process-dropdowns">
                <label>{t('child process')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    value={selectedChildProcess}
                    onChange={(e) => setSelectedChildProcess(e)}
                    options={subProcessOptions.filter((el) => el.id !== selectedSubProcess.id)}></Select>
            </div>
            <div className="task-management-sub-process-footer-btn">
                <Button onClick={() => setOnModal(false)} variant="light">
                    {t('cancel')}
                </Button>

                <Button data-testid="create-sub-process" onClick={updateGant} variant="warning">
                    {t('update')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(UpdateGant);
