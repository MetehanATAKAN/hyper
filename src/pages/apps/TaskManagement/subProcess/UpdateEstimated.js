import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

export const Errors = () => {
    const { t } = useTranslation();
    return <div style={{ color: 'red' }}>{t('Please enter a number')}</div>;
};

const UpdateEstimated = ({ setOnModal, setTabValue }) => {
    const { t } = useTranslation();
    const subProcessIdNew = useSelector((state) => state.TaskManagement.newSubProcessId);
    const subProcessIdOld = useSelector((state) => state.TaskManagement.oldSubProcessId);
    const createdBy = localStorage.getItem('userName');
    const [updateEstimatedData, setUpdateEstimatedData] = useState([]);
    const [times, setTimes] = useState({ day: 0, low: 0, medium: 0, high: 0 });
    const handleChange = (e) => {
        setTimes({ ...times, [e.target.name]: Number(e.target.value) });
    };
    const [time, setTime] = useState([
        { label: 'day', color: 'black', error: false },
        { label: 'low', color: 'green', error: false },
        { label: 'medium', color: 'orange', error: false },
        { label: 'high', color: 'red', error: false },
    ]);
    useEffect(() => {
        (async () => {
            try {
                const response = await FetchApiGet(
                    `services/TaskManagement/SubProcess/GetEstimateBySubProcessId?subProcessId=${Number(
                        subProcessIdOld
                    )}`,
                    'GET'
                );
                if (response.status === 409) {
                    setUpdateEstimatedData([]);
                }
                if (response.status === 200) {
                    const json = await response.json();
                    await setUpdateEstimatedData(json.data);
                }
            } catch (error) {
                console.log(error);
                setUpdateEstimatedData([]);
            }
        })();
    }, [subProcessIdOld]);
    useEffect(() => {
        if (updateEstimatedData.length !== 0) {
            setTimes({
                day: updateEstimatedData.estimatedDay,
                low: updateEstimatedData.estimatedTimeLow,
                medium: updateEstimatedData.estimatedTimeMedium,
                high: updateEstimatedData.estimatedTimeHigh,
            });
        }
    }, [updateEstimatedData]);
    const sendData = async (data) => {
        await Object.values(times).map((item, i) => (item === 0 ? (time[i].error = true) : (time[i].error = false)));
        await setTime([...time]);
        if (time.every((item) => item.error === false)) {
            await FetchApiPost('services/TaskManagement/SubProcess/UpdateEstimatedSubProcess', 'POST', data).catch(
                (err) => {
                    console.log(err);
                }
            );
        }
    };
    const addEstimated = () => {
        const data = {
            subProcessId: Number(subProcessIdNew) === 0 ? Number(subProcessIdOld) : Number(subProcessIdNew),
            estimatedDay: times.day,
            estimatedTimeLow: times.low,
            estimatedTimeMedium: times.medium,
            estimatedTimeHigh: times.high,
            modifiedBy: createdBy,
        };
        sendData(data);
        setTabValue('5');
    };
    const symbolControl = (event) => {
        const value = String(times[event.target.name]);
        if (value.match(/[0-9]/g)) {
            ['e', 'E', '+', '-', ','].includes(event.key) && event.preventDefault();
        } else {
            ['e', '.', 'E', '+', '-', ','].includes(event.key) && event.preventDefault();
        }
    };
    return (
        <div className="sub-process-estimated">
            {time.map((item, index) => (
                <div key={index} className="sub-process-estimated__input">
                    <label>{item.label !== 'day' ? t('time') : t(item.label)}</label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            name={item.label}
                            type="number"
                            style={{ borderRight: 'none' }}
                            value={times[item.label]}
                            onChange={handleChange}
                            onKeyDown={(event) => symbolControl(event)}
                        />
                        <InputGroup.Text style={{ backgroundColor: 'white', color: item.color }} id="basic-addon2">
                            {t(item.label)}
                        </InputGroup.Text>
                    </InputGroup>
                    {item.error && <Errors />}
                </div>
            ))}
            <div className="task-management-sub-process-footer-btn">
                <Button onClick={() => setOnModal(false)} variant="light">
                    {t('cancel')}
                </Button>
                <Button data-testid="create-sub-process" onClick={addEstimated} variant="warning">
                    {t('update')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(UpdateEstimated);
