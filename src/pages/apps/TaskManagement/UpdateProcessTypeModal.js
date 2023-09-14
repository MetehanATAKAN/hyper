import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../utils/http.helper';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';
import GlobalModal from '../../../components/GlobalNew/Modal';
import { AutoComplete, Dropdown, Input, Tooltip } from 'antd';
import { useEffect } from 'react';


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

const UpdateProcessTypeModal = ({ processType, setProcessType,
    updateProcessType, setOnModal,onModal,
     jobDescription, 
    setJobDescription, businessProcess, 
    setBusinessProcess, parentProcess, 
    setParentProcess, subProcess,
    setSubProcess,
    activityTypeFilteredDatas,jobDescriptionFilteredDatas,businessProcessFilteredDatas,processFilteredDatas,
 setActivityTypeFilteredDatas,setJobDescriptionFilteredDatas,setBusinessProcessFilteredDatas,setProcessFilteredDatas }) => {

    const [show, setShow] = useState(false);
    const [color, setColor] = useState(updateProcessType.color);
    const [processTypeName, setProcessTypeName] = useState(updateProcessType.title);
    const { t } = useTranslation();
   
    const [errorShow, setErrorShow] = useState(false);
    const [filteredList, setFilteredList] = useState([])

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

   
    const handleCloseModal = () => {
        setShow(false);
        setOnModal(false);
    }

    const filterBySearch = (event) => {
        setProcessTypeName(event);
        const query = event;
            let updateList = [...processType];

            updateList = updateList.filter(function (item) {
                return item.title.toLowerCase().search(query.toLowerCase()) !== -1;
            });
        if(event === 0) {
            setFilteredList([])
        }else{
            setFilteredList(updateList);
        }
    }

    const handleUpdateProcessType = async () => {
        let checkName = await processType.filter(item => item.title === processTypeName.trim());

        if(checkName.length === 0){
            FetchApiPost('services/TaskManagement/ProcessType/UpdateProcessType', 'POST', {
                Id: updateProcessType.id,
                ModifiedBy: localStorage.getItem('userName') || updateProcessType.modifiedBy,
                Title: processTypeName.trim(),
                Color: color
            }).then(setOnModal(false))
            let newProcessType = await processType.map((item) => item.id === updateProcessType.id ? { ...item, title: processTypeName, color: color } : item);
            setProcessType(newProcessType);
            let newActivityType = await activityTypeFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setActivityTypeFilteredDatas(newActivityType);
            let newMainProcess = await jobDescriptionFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setJobDescriptionFilteredDatas(newMainProcess);
            let newBusiness = await businessProcessFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setBusinessProcessFilteredDatas(newBusiness);
            let newPrentProcess = await processFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setProcessFilteredDatas(newPrentProcess);
            // let newSubProcess = await processType[0].map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            // setSubProcess([newSubProcess]);

        } else if (checkName.length === 1 && checkName[0].id === updateProcessType.id) {
            FetchApiPost('services/TaskManagement/ProcessType/UpdateProcessType', 'POST', {
                Id: updateProcessType.id,
                ModifiedBy: localStorage.getItem('userName') || updateProcessType.modifiedBy,
                Title: processTypeName,
                Color: color
            }).then(setOnModal(false))
            let newProcessType = await processType.map((item) => item.id === updateProcessType.id ? { ...item, title: processTypeName, color: color } : item);
            setProcessType(newProcessType);
            let newActivityType = await activityTypeFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setActivityTypeFilteredDatas(newActivityType);
            let newMainProcess = await jobDescriptionFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setJobDescriptionFilteredDatas(newMainProcess);
            let newBusiness = await businessProcessFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setBusinessProcessFilteredDatas(newBusiness);
            let newPrentProcess = await processFilteredDatas.map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            setProcessFilteredDatas(newPrentProcess);
            // let newSubProcess = await processType[0].map((item) => item.processTypeId === updateProcessType.id ? { ...item, processTypeName: processTypeName, processTypeColor: color } : item);
            // setSubProcess([newSubProcess]);
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
    
    useEffect(() => {
        setOptions(
            processType?.map(data => {
                return {value:data.title}
            })
        )
    }, [processType])

  return (
    <div className='process-type-form'>
            {
                errorShow && <PharmacySplitPercentProblem show={errorShow} handleClose={handleClose} messages={t('Process type name already exists')} />
            }
                       
                    {/* {
                        <Modal show={show} onHide={() => setShow(false)} className="process-type__color-modal">
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
                    } */}
                     {
                onModal && (
                    <div className='modal'>
                        <GlobalModal
                            showModal={onModal}
                            setShowModal={setOnModal}
                            toggle={()=>setOnModal(false)}
                            header={t('Update Process Type')}
                            body={
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center',margin:0 }}>
                                        <label className="label-text-field" >
                                            {t('process type')}
                                        </label>
                                        <span style={{ color: '#FF0000', marginLeft: '4px' }}>*</span>
                                    </div>
                                    <Input.Group style={{ display: 'flex' }}>
                                        <AutoComplete
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ zIndex: 10000001 }}
                                            value={processTypeName}
                                            options={options}
                                            filterOption={(inputValue, option) =>
                                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            onChange={filterBySearch}
                                        />
                                        <Tooltip title={'btnTooltip'} >
                                            <Dropdown.Button
                                                trigger="click"
                                                menu={menuProps}
                                                onClick={(e) => console.log(e)}
                                                placement="bottom"
                                                style={{ maxWidth: '35px' }}
                                                overlayStyle={{ zIndex: '9999999999' }}
                                                icon={<i className="fas fa-ellipsis-h"></i>}
                                                className='tom-dropdown'
                                            />
                                        </Tooltip>
                                    </Input.Group>
                                </>
                            }
                            footer={
                                <>
                                    <Button variant="light" onClick={() => handleCloseModal()}>
                                        {t('cancel')}
                                    </Button>
                                    <Button variant="warning" onClick={() => handleUpdateProcessType()} disabled={processTypeName === "" || color === "" && true}>
                                        {t('update')}
                                    </Button>
                                </>
                            }
                        />
                    </div>
                )
            }
        
            {/* <div className="task-management-footer-btn">
                <Button variant="light" onClick={() => handleCloseModal()}>
                    {t('cancel')}
                </Button>
                <Button variant="warning" className='task-management-footer-btn__update' onClick={() => handleUpdateProcessType()} disabled={processTypeName === "" || color === "" && true}>
                    {t('update')}
                </Button>
            </div> */}
        </div>
  )
}

export default UpdateProcessTypeModal