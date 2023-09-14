import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FetchApiPost } from '../../../../utils/http.helper';

export const Errors = () => {
    const { t } = useTranslation();
    return <div style={{ color: 'red' }}>{t('Please enter a number')}</div>;
};

const Estimated = ({ setOnModal, setTabValue }) => {
    const { t } = useTranslation();
    const subProcessId = useSelector((state) => state.TaskManagement.newSubProcessId);
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
    const createdBy = localStorage.getItem('userName');

    const sendData = async (data) => {
        await Object.values(times).map((item, i) => (item === 0 ? (time[i].error = true) : (time[i].error = false)));
        await setTime([...time]);
        if (time.every((item) => item.error === false)) {
            await FetchApiPost('services/TaskManagement/SubProcess/CreateEstimatedSubProcess', 'POST', data).catch(
                (err) => {
                    console.log(err);
                }
            );
            setTabValue('5')
        }
    };
    const addEstimated = () => {
        const data = {
            subProcessId: Number(subProcessId),
            estimatedDay: times.day,
            estimatedTimeLow: times.low,
            estimatedTimeMedium: times.medium,
            estimatedTimeHigh: times.high,
            createdBy: createdBy,
        };
        sendData(data);
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
                <Button data-testid="create-sub-process" onClick={addEstimated} variant="primary">
                    {t('add')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Estimated);
