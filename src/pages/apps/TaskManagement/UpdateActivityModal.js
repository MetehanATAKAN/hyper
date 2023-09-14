import React, { useState, useEffect } from 'react';
import { Button,Modal } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';
import GlobalModal from '../../../components/GlobalNew/Modal';
import { SingleSelects } from '../../../components/GlobalNew/Selects';
import { AutoComplete, Dropdown, Input, Tooltip } from 'antd';


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


const UpdateActivityModal = ({ setOnModal,onModal, updateActivityType, activityTypes, setActivityTypes, jobDescription, setJobDescription, businessProcess, setBusinessProcess, parentProcess, setParentProcess, subProcess, setSubProcess,
    activityTypeFilteredDatas,jobDescriptionFilteredDatas,businessProcessFilteredDatas,processFilteredDatas,
 setActivityTypeFilteredDatas,setJobDescriptionFilteredDatas,setBusinessProcessFilteredDatas,setProcessFilteredDatas }) => {
    const [show, setShow] = useState(false);
    const [color, setColor] = useState(updateActivityType.color);
    const [activityTypeName, setActivityTypeName] = useState(updateActivityType.title);
    const { t } = useTranslation();
   
    const [options, setOptions] = useState([]);

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


    const [filterActivity, setFilterActivity] = useState([]);

    const [filteredList, setFilteredList] = useState([])

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

    const [errorShow, setErrorShow] = useState(false);
    
    const updateData = async () => {
        let checkName = await filterActivity.filter(item => item.processTypeId === updateActivityType.processTypeId);
        let checkName2 = await checkName.filter(item => item.title === activityTypeName.trim());

        if(checkName2.length === 0){
            FetchApiPost('services/TaskManagement/ActivityType/UpdateActivityType', 'POST', {
                processTypeId: updateActivityType.processTypeId,
                id: updateActivityType.id,
                modifiedBy: localStorage.getItem('userName') || updateActivityType.modifiedBy,
                title: activityTypeName.trim(),
                color: color
            })
            let newActivityTypes = await activityTypeFilteredDatas.map((item) => item.id === updateActivityType.id ? { ...item, title: activityTypeName, color: color } : item);
            setActivityTypeFilteredDatas(newActivityTypes);
            let newJobDescription = await jobDescriptionFilteredDatas.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
            setJobDescriptionFilteredDatas(newJobDescription);
            let newBusinessProcess = await businessProcessFilteredDatas.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
            setBusinessProcessFilteredDatas(newBusinessProcess);
            let newParentProcess = await processFilteredDatas.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
            setProcessFilteredDatas(newParentProcess);

            let newActivityTypes2 = await activityTypes.map((item) => item.id === updateActivityType.id ? { ...item, title: activityTypeName, color: color } : item);
            setActivityTypes(newActivityTypes2);
            let newJobDescription2 = await jobDescription.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
            setJobDescription(newJobDescription2);
            let newBusinessProcess2 = await businessProcess.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
            setBusinessProcess(newBusinessProcess2);
            let newParentProcess2 = await parentProcess.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
            setParentProcess(newParentProcess2);

            setOnModal(false);
            setShow(false);
        } else if (checkName2.length === 1 && checkName2[0].id === updateActivityType.id){
                FetchApiPost('services/TaskManagement/ActivityType/UpdateActivityType', 'POST', {
                    processTypeId: updateActivityType.processTypeId,
                    id: updateActivityType.id,
                    modifiedBy: localStorage.getItem('userName') || updateActivityType.modifiedBy,
                    title: activityTypeName,
                    color: color
                })
                let newActivityTypes = await activityTypeFilteredDatas.map((item) => item.id === updateActivityType.id ? { ...item, title: activityTypeName, color: color } : item);
                setActivityTypeFilteredDatas(newActivityTypes);
                let newJobDescription = await jobDescriptionFilteredDatas.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
                setJobDescriptionFilteredDatas(newJobDescription);
                let newBusinessProcess = await businessProcessFilteredDatas.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
                setBusinessProcessFilteredDatas(newBusinessProcess);
                let newParentProcess = await processFilteredDatas.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
                setProcessFilteredDatas(newParentProcess);

                let newActivityTypes2 = await activityTypes.map((item) => item.id === updateActivityType.id ? { ...item, title: activityTypeName, color: color } : item);
                setActivityTypes(newActivityTypes2);
                let newJobDescription2 = await jobDescription.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
                setJobDescription(newJobDescription2);
                let newBusinessProcess2 = await businessProcess.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
                setBusinessProcess(newBusinessProcess2);
                let newParentProcess2 = await parentProcess.map((item) => item.activityTypeId === updateActivityType.id ? { ...item, activityTypeName: activityTypeName, activityTypeColor: color } : item);
                setParentProcess(newParentProcess2);

                setOnModal(false);
                setShow(false);
            
        } else {
            setErrorShow(true);
        }
        
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

    const filterBySearch = (event) => {
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
            errorShow && <PharmacySplitPercentProblem show={errorShow} handleClose={handleClose} messages={t('Activity Type Name Already Exists')} />
        }
         {
                onModal && (
                    <>
                        <GlobalModal
                            showModal={onModal}
                            setShowModal={setOnModal}
                            toggle={()=>setOnModal(false)}
                            header={t('Update Activity Type')}
                            body={
                                <div>
                                <SingleSelects
                                isStar={true}
                                label={t('process type')}
                                isSortable={false}
                                width={'100%'}
                                selectedItems={{id: updateActivityType.processTypeId, label: <div className='activity-types-select-with-color'>
                                <div style={{backgroundColor: updateActivityType.processTypeColor, opacity: .8}} className='activity-types-select-with-color__box'></div>
                                <div className='activity-types-select-with-color__text'>{updateActivityType.processTypeName}</div>
                            </div>, value: updateActivityType.processTypeName}}
                                disabled={true}
                                />
                                    <div style={{ display: 'flex', alignItems: 'center',margin:0 }}>
                                        <label className="label-text-field" >
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
                                  <Button variant="light" onClick={() => setOnModal(false)}>
                                      {t('cancel')}
                                  </Button>
                                  <Button variant="warning" className='task-management-footer-btn__update' style={{ color: "black !important" }} onClick={() => updateData()} disabled={activityTypeName === "" || color === "" && true}>
                                      {t('update')}
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
                classNamePrefix="react-select"
                value={{id: updateActivityType.processTypeId, label: <div className='activity-types-select-with-color'>
                <div style={{backgroundColor: updateActivityType.processTypeColor, opacity: .8}} className='activity-types-select-with-color__box'></div>
                <div className='activity-types-select-with-color__text'>{updateActivityType.processTypeName}</div>
            </div>, value: updateActivityType.processTypeName}}
                isDisabled
                ></Select>
        </div>
    <div className='activity-types__activity-input'>
        <div>{t('activity types')}</div>
        <div className="activity-types__form-container">
            <input placeholder={t('search for an option...')} list="datalistOptions" id="exampleDataList" type="text" className="form-control" value={activityTypeName} onChange={(e) => filterBySearch(e)} />
            <button onClick={() => setShow(prev => !prev)} >
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {
                <Modal show={show} onHide={() => setShow(false)} className="activity-types__color-modal">
                    <Modal.Body>
                        <div className="process-type__color-buttons">
                        <button onClick={() => handleSetColor('#00bcd4')}>
                                        <div style={{ backgroundColor: '#00bcd4' }} ></div>
                                        <label style={{ color: '#00bcd4'}}>{t('Blue')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#808080')}>
                                        <div style={{ backgroundColor: '#808080' }} ></div>
                                        <label style={{ color: '#808080'}}>{t('Gray')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#ff0000')}>
                                        <div style={{ backgroundColor: '#ff0000' }}></div>
                                        <label style={{ color: '#ff0000'}}>{t('Red')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#008000')}>
                                        <div style={{ backgroundColor: '#008000' }}></div>
                                        <label style={{ color: '#008000'}}>{t('Green')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#ffff00')}>
                                        <div style={{ backgroundColor: '#ffff00' }}></div>
                                        <label style={{ color: '#ffff00'}}>{t('Yellow')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#40e0d0')}>
                                        <div style={{ backgroundColor: '#40e0d0' }}></div>
                                        <label style={{ color: '#40e0d0'}}>{t('Turquoise')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#ee82ee')}>
                                        <div style={{ backgroundColor: '#ee82ee' }}></div>
                                        <label style={{ color: '#ee82ee'}}>{t('Violet')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#800080')}>
                                        <div style={{ backgroundColor: '#800080' }}></div>
                                        <label style={{ color: '#800080'}}>{t('Purple')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#00008b')}>
                                        <div style={{ backgroundColor: '#00008b' }}></div>
                                        <label style={{ color: '#00008b'}}>{t('Dark Blue')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#d2691e')}>
                                        <div style={{ backgroundColor: '#d2691e' }}></div>
                                        <label style={{ color: '#d2691e'}}>{t('Chocolate')}</label>
                                    </button>
                                    <button onClick={() => handleSetColor('#ffd700')}>
                                        <div style={{ backgroundColor: '#ffd700' }}></div>
                                        <label style={{ color: '#ffd700'}}>{t('Gold')}</label>
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
        <Button variant="light" onClick={() => setOnModal(false)}>
            {t('cancel')}
        </Button>
        <Button variant="warning" className='task-management-footer-btn__update' style={{color: "black !important"}} onClick={() => updateData()} disabled={activityTypeName === "" || color === "" && true}>
            {t('update')}
        </Button>
    </div> */}
</div>
  )
}

export default UpdateActivityModal