import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';
import GlobalModal from '../../../components/GlobalNew/Modal';
import { AutoComplete, Dropdown, Input, Tooltip } from 'antd';
import { SingleSelects } from '../../../components/GlobalNew/Selects';


const Colors = ({ label, color }) => {
    const { t } = useTranslation();
    return (
        <div style={{ color: `rgb(${color})`, display: 'flex', alignItems: 'center', fontWeight: '500' }}>
            <div
                style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: `rgba(${color}, 0.5)`,
                    borderRadius: '3px',
                    marginRight: '8px',
                }}></div>{' '}
            {t(label)}
        </div>
    );
};

const ActivityTypes = ({ setOnModal,activityTypes, setFirstActivityAdd, filteredDatas, setFilteredDatas, setActivityTypes, processType, setProcessType,onModal }) => {
    const [show, setShow] = useState(false);
    const [color, setColor] = useState("")
    console.log(processType);
    const [options, setOptions] = useState([]);

    const [activityTypeName, setActivityTypeName] = useState("");
    const [selectedProcessType, setSelectedProcessType] = useState();
    console.log(selectedProcessType);
    const { t } = useTranslation();

    const items = [
        { label: <Colors color="0, 160, 223" label={'Blue'} />, key: '0, 160, 223' }, // remember to pass the key prop
        { label: <Colors color="108, 117, 125" label={'Gray'} />, key: '108, 117, 125' },
        { label: <Colors color="10, 207, 151" label={'Green'} />, key: '10, 207, 151' },
        { label: <Colors color="255, 188, 0" label={'Yellow'} />, key: '255, 188, 0' },
        { label: <Colors color="250, 92, 124" label={'Red'} />, key: '250, 92, 124' },
        { label: <Colors color="57, 175, 209" label={'Turquoise'} />, key: '57, 175, 209' },
        { label: <Colors color="114, 124, 245" label={'Indigo'} />, key: '114, 124, 245' },
        { label: <Colors color="107, 94, 174" label={'Purple'} />, key: '107, 94, 174' },
        { label: <Colors color="255, 103, 155" label={'Pink'} />, key: '255, 103, 155' },
        { label: <Colors color="253, 126, 20" label={'Orange'} />, key: '253, 126, 20' },
        { label: <Colors color="2, 168, 181" label={'Teal'} />, key: '2, 168, 181' },
    ];

    const [filteredList, setFilteredList] = useState([])
    const [filterActivity, setFilterActivity] = useState([]);

    const [errorShow, setErrorShow] = useState(false);

    const handleSetColor = (color) => {
        setColor(color);
        setShow(false)
    }

    useEffect(() => {
        // Activity Types
        FetchApiGet('services/TaskManagement/ActivityType/GetAllActivityTypes', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setFilterActivity(res))
            .catch((e) => console.log('TaskManagementIndex Activity Types', e));
    }, []);

    const createActivityType = async () => {
        let checkName = await filterActivity.filter(item => item.processTypeId === selectedProcessType.id);
        let checkName2 = await checkName.find(item => item.title === activityTypeName.trim());
        
        if (checkName2 === undefined) {
            await FetchApiPost('services/TaskManagement/ActivityType/CreateActivityType', 'POST', {
                processTypeId: selectedProcessType.id,
                title: activityTypeName.trim(),
                createdBy: localStorage.getItem('userName') || "string",
                color: color
            }).then(res => res.json())
            .then(res => res.data)
            .then(res => (setFilteredDatas(prev => [...prev, {
                id: res.id,
                processTypeId: res.processTypeId,
                title: res.title,
                color: res.color,
                createdBy: res.createdBy,
                createdDate: res.createdDate,
                modifiedBy: res.modifiedBy,
                modifiedDate: res.modifiedDate,
                processTypeName: selectedProcessType.value.trim(),
                processTypeColor: selectedProcessType.color,
                processTypeId: selectedProcessType.id,
                isDeleteable: true
            }]), setActivityTypes(prev => [...prev, {
                id: res.id,
                processTypeId: res.processTypeId,
                title: res.title,
                color: res.color,
                createdBy: res.createdBy,
                createdDate: res.createdDate,
                modifiedBy: res.modifiedBy,
                modifiedDate: res.modifiedDate,
                processTypeName: selectedProcessType.value.trim(),
                processTypeColor: selectedProcessType.color,
                processTypeId: selectedProcessType.id,
                isDeleteable: true
            }])))
            // await FetchApiGet('services/TaskManagement/ActivityType/GetAllActivityTypes', 'GET')
            //     .then((res) => res.json())
            //     .then((res) => res.data)
            //     .then((res) => setActivityTypes(res));

            // await setFirstActivityAdd(true);
            // await setSeciliTab('Job Description')
            // await handleClick('Job Description')
            let disableButton = await processType.map((item) => item.id === selectedProcessType.id ? { ...item, isDeleteable: false } : item);
            setProcessType(disableButton);
            setOnModal(false)
        } else {
            setErrorShow(true);
        }
    }

    const handleCloseModal = () => {
        setShow(false)
        setOnModal(false)
        setFirstActivityAdd(false);
    }

    const handleClose = () => {
        setErrorShow(false);
    }

    const handleMenuClick = (e) => {
        const color = e.key;
        setColor(`rgba(${color},0.5)`);
        setShow(false);
    }
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const filterBySearch = (e) => {
        const event =e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
        console.log(event);
        setActivityTypeName(event);
        const query = event;
            let updateList = [...filterActivity];

            updateList = updateList.filter(function (item) {
                return item.title.toLowerCase().search(query.toLowerCase()) !== -1;
            });
        if(event === 0) {
            setFilteredList([])
        }else{
            setFilteredList(updateList);
        }
    }

    useEffect(() => {
        setOptions(
            activityTypes?.map(data => {
                return {value:data.title}
            })
        )
    }, [activityTypes])

    return (
        <div className="activity-types">
            {
                errorShow && <PharmacySplitPercentProblem show={errorShow} handleClose={handleClose} messages={t('Process type name already exists')} />
            }
            {
                onModal && (
                    <>
                        <GlobalModal
                            showModal={onModal}
                            setShowModal={setOnModal}
                            toggle={()=>setOnModal(false)}
                            header={t('Add Activity Type')}
                            body={
                                <div>
                                <SingleSelects
                                options={processType.map((option) => ({
                                    id: option.id,
                                    value: option.title,
                                    label: <div className='activity-types-select-with-color'>
                                        <div style={{backgroundColor: option.color}} className='activity-types-select-with-color__box'></div>
                                        <div className='activity-types-select-with-color__text'>{option.title}</div>
                                    </div>,
                                    color: option.color
                                }))}
                                setSelectedItems={setSelectedProcessType}
                                isStar={true}
                                label={t('process type')}
                                isSortable={false}
                                width={'100%'}
                                />
                                    <div style={{ display: 'flex', alignItems: 'center',margin:0}}>
                                        <label className="label-text-field w-auto" >
                                            {t('activity types')}
                                        </label>
                                        <span style={{  color: '#fa5c7c', marginLeft: '4px' }}>*</span>
                                    </div>
                                    <Input.Group style={{ display: 'flex' }}>
                                        <AutoComplete
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ zIndex: 10000001 }}
                                            placeholder={t('activity type')}
                                            options={options}
                                            filterOption={(inputValue, option) =>
                                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            onChange={filterBySearch}
                                            value={activityTypeName}
                                        />
                                        <Tooltip title={'btnTooltip'} >
                                            <Dropdown.Button
                                                trigger="click"
                                                menu={menuProps}
                                                onClick={(e) => console.log(e)}
                                                placement="bottom"
                                                style={{ maxWidth: '35px'}}
                                                overlayStyle={{ zIndex: '9999999999' }}
                                                icon={<i className="fas fa-ellipsis-h"></i>}
                                                className='tom-dropdown'
                                            />
                                        </Tooltip>
                                    </Input.Group>
                                </div>
                            }
                            footer={
                                <>
                                    <Button variant="light" onClick={() => handleCloseModal()}>
                                        {t('cancel')}
                                    </Button>
                                    <Button variant="primary" onClick={() => createActivityType()} disabled={ selectedProcessType !== undefined && selectedProcessType !== '' && activityTypeName !== "" && color !== ""  ? false : true}>
                                        {t('add')}
                                    </Button>
                                </>
                            }
                        />
                    </>
                )
            }
            {/* <div className='activity-types__container'>
                <div className='activity-types__select-process'>
                    <div>{t('process type')}</div>
                    <Select
                        isMulti={false}
                        className="react-select"
                        placeholder={t("select")}
                        classNamePrefix="react-select"
                        onChange={(e) => setSelectedProcessType(e)}
                        options={processType.map((option) => ({
                            id: option.id,
                            value: option.title,
                            label: <div className='activity-types-select-with-color'>
                                <div style={{backgroundColor: option.color, opacity: .8}} className='activity-types-select-with-color__box'></div>
                                <div className='activity-types-select-with-color__text'>{option.title}</div>
                            </div>,
                            color: option.color
                        }))}></Select>
                </div>
            <div className='activity-types__activity-input'>
                <div>{t('activity types')}</div>
                <div className="activity-types__form-container">
                    <input list="datalistOptions" id="exampleDataList" type="text" className="form-control" placeholder={t('search for an option...')} onChange={(e) => filterBySearch(e)} disabled={selectedProcessType===null} />
                    <button onClick={() => setShow(prev => !prev)} disabled={selectedProcessType===null} >
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    {
                        <Modal show={show} onHide={() => setShow(false)} className="activity-types__color-modal">
                            <Modal.Body>
                                <div className="process-type__color-buttons">
                                <div>{t('colors')}</div>
                                <button onClick={() => handleSetColor('rgba(0, 160, 223, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(0, 160, 223, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(0, 160, 223, 0.5)' }}>{t('Blue')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(108, 117, 125, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(108, 117, 125, 0.5)' }}>{t('Gray')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(250, 92, 124, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(250, 92, 124, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(250, 92, 124, 0.5)' }}>{t('Red')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(10, 207, 151, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(10, 207, 151, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(10, 207, 151, 0.5)' }}>{t('Green')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(255, 188, 0, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(255, 188, 0, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(255, 188, 0, 0.5)' }}>{t('Yellow')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(57, 175, 209, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(57, 175, 209, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(57, 175, 209, 0.5)' }}>{t('Turquoise')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(114, 124, 245, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(114, 124, 245, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(114, 124, 245, 0.5)' }}>{t('Indigo')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(107, 94, 174, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(107, 94, 174, 0.5)' }}></div>
                                        <label style={{ color: '#rgba(107, 94, 174, 0.5)' }}>{t('Purple')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(255, 103, 155, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(255, 103, 155, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(255, 103, 155, 0.5)' }}>{t('Pink')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(253, 126, 20, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(253, 126, 20, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(253, 126, 20, 0.5)' }}>{t('Orange')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('rgba(2, 168, 181, 0.5)')}>
                                        <div style={{ backgroundColor: 'rgba(2, 168, 181, 0.5)' }}></div>
                                        <label style={{ color: 'rgba(2, 168, 181, 0.5)' }}>{t('Teal')}</label>
                                    </button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    }
                </div>
            </div>
            {
                    filteredList.length > 0 && (
                        <datalist id="datalistOptions" style={{width: "100%"}} >
                            {
                                filteredList.map((item, index) => (
                                    <option style={{minWidth: "300px"}} key={index} value={item.title} />
                                ))
                            }
                        </datalist>
                    )
                }
            </div> */}
            
                

            {/* <div className="task-management-footer-btn">
                <Button variant="light" onClick={() => handleCloseModal()}>
                    {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => createActivityType()} disabled={activityTypeName === "" || color === "" && true}>
                    {t('add')}
                </Button>
            </div> */}
        </div>
    );
};

export default ActivityTypes;
