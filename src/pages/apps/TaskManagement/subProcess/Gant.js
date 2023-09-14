import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { FetchApiPost } from '../../../../utils/http.helper';

const Gant = ({ setOnModal, subProcess, setTabValue }) => {
    const { t } = useTranslation();
    const subProcessId = useSelector((state) => state.TaskManagement.newSubProcessId);
    const loggedUserName = localStorage.getItem('userName');
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
    console.log(subProcess)

    const createGant = () => {
        const data = {
            parentProcessId: selectedSubProcess.id,
            childProcessId: selectedChildProcess.id,
            subProcessId: Number(subProcessId),
            createdBy: loggedUserName,
        };
        if (Number(subProcessId) !== 0) {
            FetchApiPost('services/TaskManagement/SubProcess/CreateGantSubProcess', 'POST', data).catch((err) => {
                console.log(err);
            });
            setTabValue('4')
        }
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

                <Button data-testid="create-sub-process" onClick={createGant} variant="primary">
                    {t('add')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Gant);
