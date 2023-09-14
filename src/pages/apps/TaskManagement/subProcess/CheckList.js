import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
const CheckList = ({ setOnModal }) => {
    const { t } = useTranslation();
    const subProcessId = useSelector((state) => state.TaskManagement.newSubProcessId);
    const loggedUserName = localStorage.getItem('userName');
    const [checklistData, setChecklistData] = useState([]);
    const [selectedChecklist, setSelectedChecklist] = useState({
        id: 0,
        value: 'select checklist',
        label: t('select checklist'),
    });
    console.log(checklistData)
    useEffect(() => {
        FetchApiGet('services/TaskManagement/ActionAndCheckList/GetAllCheckList', 'GET')
            .then((res) => res.json())
            .then((json) => setChecklistData(json.data))
            .catch((err) => console.log(err));
    }, []);
    const clickCheckBox = (event) => {

        const test = checklistData
            .find((el) => el.id === selectedChecklist.id)
            .actions.find((el) => el.id === Number(event.target.id));
        const newData = checklistData.map(i => {
            if(i.id === selectedChecklist.id){
                let actions = i.actions.map(action => {
                    if(action.id === Number(event.target.id)){
                        return {
                            ...action,
                            isChecked: event.target.checked
                        }
                    }else{
                        return action
                    }
                })
                return {
                    ...i,
                    actions: actions
                }
            }
        })
        console.log("bhjsfahjbsa", event.target.checked)
        if (event.target.checked === true) {
            test.isChecked = true;
        }
        if (event.target.checked === false) {
            test.isChecked = false;
        }

        // console.log(test)
    };
    const createCheckList = () => {
        const selectedList = checklistData.find((el) => el.id === selectedChecklist.id);
        const data = {
            subProcessId: Number(subProcessId),
            checkListId: Number(selectedList.id),
            actions: selectedList.actions?.map((el) => ({
                actionId: el.id,
                isPriority: el.isChecked,
            })),

            createdBy: loggedUserName,
        };
        if (Number(subProcessId) === 0) return;
        FetchApiPost('services/TaskManagement/SubProcess/CreateCheckListSubProcess', 'POST', data).catch((err) =>
            console.log(err)
        );
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
                    onChange={(e) => setSelectedChecklist(e)}
                    options={checklistData.map((el) => ({
                        id: el.id,
                        value: el.title,
                        label: el.title,
                    }))}></Select>
            </div>
            <div className="sub-process-checklist__list">
                {checklistData
                    .find((el) => el.id === selectedChecklist.id)
                    ?.actions?.map((item, index) => (
                        <div
                            key={index}
                            className={
                                item.isChecked === true
                                    ? 'sub-process-checklist__list__item lock-item '
                                    : 'sub-process-checklist__list__item'
                            }>
                            {index + 1}. {item.title}
                            <Form.Check
                                className="procces-checkbox"
                                id={item.id}
                                defaultChecked={item.isChecked === true ? true : false}
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
                <Button data-testid="create-sub-process" onClick={createCheckList} variant="primary">
                    {t('add')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(CheckList);
