import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';
import { useEffect } from 'react';
import GlobalModal from '../../../components/GlobalNew/Modal';
import { AutoComplete, Input, Tooltip, Dropdown } from 'antd';
import { InputSelectColor } from '../../../components/FormElements/Input';

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

const ProcessType = ({ setOnModal, setProcessType, processType, onModal }) => {


    const [show, setShow] = useState(false);
    const [color, setColor] = useState('');
    const [processTypeName, setProcessTypeName] = useState('');
    const { t } = useTranslation();
    
    const [options, setOptions] = useState([]);
 
    const [errorShow, setErrorShow] = useState(false);

    const [filteredList, setFilteredList] = useState([...processType]);
 
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
    };

    useEffect(() => {
        if (processTypeName === '') return;
        const test = processTypeName.charAt(0).toUpperCase() + processTypeName.slice(1);
        setProcessTypeName(test);
    }, [processTypeName]);

    const createProcessType = async () => {
        let checkName = await processType.find((item) => item.title === processTypeName.trim());

        if (checkName === undefined) {
            await FetchApiPost('services/TaskManagement/ProcessType/CreateProcessType', 'POST', {
                Title: processTypeName.trim(),
                CreatedBy: localStorage.getItem('userName') || 'string',
                Color: color,
            });

            await FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', 'GET')
                .then((res) => res.json())
                .then((res) => res.data)
                .then((res) => setProcessType(res));
            handleCloseModal();
        } else {
            setErrorShow(true);
        }
    };

    const handleClose = () => {
        setErrorShow(false);
    };

    const filterBySearch = (event) => {
    
        setProcessTypeName(event);
        const query = event;
        let updateList = [...processType];

        updateList = updateList.filter(function (item) {
            return item.title.toLowerCase().search(query.toLowerCase()) !== -1;
        });
        if (event === 0) {
            setFilteredList([]);
        } else {
            setFilteredList(updateList);
        }
    };

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
        <div className="process-type-form">
            {errorShow && (
                <PharmacySplitPercentProblem
                    show={errorShow}
                    handleClose={handleClose}
                    messages={t('Process type name already exists')}
                />
            )}
            {
                onModal && (
                    <>
                        <GlobalModal
                            showModal={onModal}
                            setShowModal={setOnModal}
                            toggle={()=>setOnModal(false)}
                            header={t('Add Process Type')}
                            body={
                                <>
                                <InputSelectColor/>
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
                                            placeholder={t('process type')}
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
                                                style={{ maxWidth: '35px'}}
                                                overlayStyle={{ zIndex: '9999999999' }}
                                                icon={<i className="fas fa-ellipsis-h"></i>}
                                                className='tom-dropdown'
                                            />
                                        </Tooltip>
                                    </Input.Group>
                                </>
                                // <>
                                //     <div className="process-type-form__container">
                                //         <div>{t('process type')}</div>
                                //         <div className="process-type-input__container">
                                //             <input
                                //                 list="datalistOptions"
                                //                 id="exampleDataList"
                                //                 type="text"
                                //                 className="form-control"
                                //                 value={processTypeName}
                                //                 placeholder={t('search for an option...')}
                                //                 onChange={(e) => filterBySearch(e)}
                                //             />
                                //             <button onClick={() => setShow((prev) => !prev)}>
                                //                 <i className="fa-solid fa-ellipsis"></i>
                                //             </button>
                                //             {
                                //                 <Modal show={show} onHide={() => setShow(false)} className="process-type__color-modal">
                                //                     <Modal.Body>
                                //                         <div className="process-type__color-buttons">
                                //                             <div>{t('colors')}</div>
                                //                             <button onClick={() => handleSetColor('rgba(0, 160, 223, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(0, 160, 223, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(0, 160, 223, 0.5)' }}>{t('Blue')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(108, 117, 125, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(108, 117, 125, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(108, 117, 125, 0.5)' }}>{t('Gray')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(250, 92, 124, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(250, 92, 124, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(250, 92, 124, 0.5)' }}>{t('Red')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(10, 207, 151, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(10, 207, 151, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(10, 207, 151, 0.5)' }}>{t('Green')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(255, 188, 0, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(255, 188, 0, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(255, 188, 0, 0.5)' }}>{t('Yellow')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(57, 175, 209, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(57, 175, 209, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(57, 175, 209, 0.5)' }}>{t('Turquoise')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(114, 124, 245, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(114, 124, 245, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(114, 124, 245, 0.5)' }}>{t('Indigo')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(107, 94, 174, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(107, 94, 174, 0.5)' }}></div>
                                //                                 <label style={{ color: '#rgba(107, 94, 174, 0.5)' }}>{t('Purple')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(255, 103, 155, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(255, 103, 155, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(255, 103, 155, 0.5)' }}>{t('Pink')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(253, 126, 20, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(253, 126, 20, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(253, 126, 20, 0.5)' }}>{t('Orange')}</label>
                                //                             </button>
                                //                             <button onClick={() => handleSetColor('rgba(2, 168, 181, 0.5)')}>
                                //                                 <div style={{ backgroundColor: 'rgba(2, 168, 181, 0.5)' }}></div>
                                //                                 <label style={{ color: 'rgba(2, 168, 181, 0.5)' }}>{t('Teal')}</label>
                                //                             </button>
                                //                         </div>
                                //                     </Modal.Body>
                                //                 </Modal>
                                //             }

                                //         </div>

                                //         {filteredList.length > 0 && (
                                //             <datalist id="datalistOptions" style={{ width: '100%' }}>
                                //                 {filteredList.map((item, index) => (
                                //                     <option style={{ minWidth: '300px' }} key={index} value={item.title} />
                                //                 ))}
                                //             </datalist>
                                //         )}
                                //     </div>
                                // </>
                                // <AutoCompleteInput
                                // options={options}
                                // label='defination name'
                                // isStar={true}
                                // width='100%'
                                // value={processTypeName}
                                // setValue={filterBySearch}
                                // isContentValid={true}
                                // isContentWarningMessages='previously recorded under the same name'
                                // isDropDown={true}
                                // btnIcon={<i className="fas fa-ellipsis-h"></i>}
                                // isAutoComplete={true}
                                // dropDownItems={items}
                                // />

                            }
                            footer={
                                <>
                                    <Button variant="light" onClick={() => handleCloseModal()}>
                                        {t('cancel')}
                                    </Button>
                                    <Button variant="primary" onClick={() => createProcessType()} disabled={processTypeName === '' && true}>
                                        {t('add')}
                                    </Button>
                                </>
                            }
                        />
                    </>
                )
            }
            {/* <div className="task-management-footer-btn">
                <Button variant="light" onClick={() => handleCloseModal()}>
                    {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => createProcessType()} disabled={processTypeName === '' && true}>
                    {t('add')}
                </Button>
            </div> */}
        </div>
    );
};

export default ProcessType;
