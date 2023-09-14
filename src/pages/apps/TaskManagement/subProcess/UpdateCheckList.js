import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
const UpdateCheckList = ({ setOnModal }) => {
    const { t } = useTranslation();
    const subProcessIdNew = useSelector((state) => state.TaskManagement.newSubProcessId);
    const subProcessIdOld = useSelector((state) => state.TaskManagement.oldSubProcessId);
    const loggedUserName = localStorage.getItem('userName');
    const [checklistData, setChecklistData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [selectedChecklist, setSelectedChecklist] = useState({
        id: 0,
        value: 'select checklist',
        label: t('select checklist'),
    });
    useEffect(() => {
        FetchApiGet('services/TaskManagement/ActionAndCheckList/GetAllCheckList', 'GET')
            .then((res) => res.json())
            .then((json) => setChecklistData(json.data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const response = await FetchApiGet(
                    `services/TaskManagement/SubProcess/GetCheckListBySubProcessId?subProcessId=${Number(
                        subProcessIdOld
                    )}`,
                    'GET'
                );
                if (response.status === 201) {
                    const json = await response.json();
                    await setUpdateData([json.data]);
                    await setSelectedChecklist({
                        id: json.data.id,
                        value: json.data.title,
                        label: json.data.title,
                    });
                }
                if (response.status === 409) {
                    setUpdateData([]);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    useEffect(() => {
        if (updateData.length > 0) {
            if (selectedChecklist.id !== updateData[0].id) {
                checklistData.find((el) => el.id === selectedChecklist.id && setUpdateData([el]));
            }
        }
        if (updateData.length === 0) {
            if (selectedChecklist.id !== 0) {
                checklistData.find((el) => el.id === selectedChecklist.id && setUpdateData([el]));
            }
        }
    }, [selectedChecklist]);
    const changeList = (e) => {
        setSelectedChecklist(e);
    };
    const clickCheckBox = (event) => {
        if (event.target.checked === true) {
            updateData[0].actions.map(
                (el) => Number(el.id) === Number(event.target.id) && el.isPriority === false && (el.isChecked = true)
            );
            setUpdateData([...updateData]);
        }
        if (event.target.checked === false) {
            updateData[0].actions.map(
                (el) => Number(el.id) === Number(event.target.id) && el.isPriority === false && (el.isChecked = false)
            );
            setUpdateData([...updateData]);
        }
    };
    const createCheckList = () => {
        if (updateData.length !== 0) {
            const data = {
                subProcessId: Number(subProcessIdNew) === 0 ? Number(subProcessIdOld) : Number(subProcessIdNew),
                checkListId: Number(updateData[0].id),
                actions: updateData[0].actions?.map((el) => ({
                    actionId: el.id,
                    isPriority: el.isChecked,
                })),

                modifiedBy: loggedUserName,
            };
            FetchApiPost('services/TaskManagement/SubProcess/UpdateCheckListSubProcess', 'POST', data).catch((err) =>
                console.log(err)
            );
        }

        setOnModal(false);
    };
    return (
        <div className="sub-process-checklist">
            <div className="sub-process-dropdowns">
                <label>{t('check list')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder="select"
                    isSearchable={false}
                    classNamePrefix="react-select"
                    value={selectedChecklist}
                    onChange={(e) => changeList(e)}
                    options={checklistData.map((el) => ({
                        id: el.id,
                        value: el.title,
                        label: el.title,
                    }))}></Select>
            </div>
            <div className="sub-process-checklist__list">
                {updateData.length > 0 &&
                    updateData[0].actions?.map((item, index) => (
                        <div
                            key={index}
                            className={
                                item.isPriority === true
                                    ? 'sub-process-checklist__list__item lock-item '
                                    : 'sub-process-checklist__list__item'
                            }>
                            {index + 1}. {item.title}
                            <Form.Check
                                className="procces-checkbox"
                                id={item.id}
                                defaultChecked={item.isChecked}
                                onChange={clickCheckBox}
                            />
                        </div>
                    ))}
            </div>
            <div className="task-management-sub-process-footer-btn">
                <Button
                    variant="light"
                    onClick={() => {
                        setOnModal(false);
                    }}>
                    {t('cancel')}
                </Button>
                <Button data-testid="create-sub-process" onClick={createCheckList} variant="success">
                    {t('finish')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(UpdateCheckList);
