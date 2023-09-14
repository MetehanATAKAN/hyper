import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewInput } from '../../../../../components/GlobalNew/Inputs';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Cascader } from 'antd';

const Body = ({ shareSurveyId, clickAdd, setClickAdd, setButtonDisabled, setShowAddModal, setSelectTab }) => {
    const { RangePicker } = DatePicker;
    const { t } = useTranslation();

    const [minute, setMinute] = useState();
    const [radioButtonStatus, setRadioButtonStatus] = useState({
        company: false,
        business: false,
        department: false,
        position: false,
        employee: false,
    });

    const [selectDisableStatus, setSelectDisableStatus] = useState({
        company: false,
        business: false,
        department: false,
        position: false,
        employee: false,
    });

    const [companyOptions, setCompanyOptions] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);

    const [businessOptions, setBusinessOptions] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState([]);

    const [businessUnitGroupOptions, setBusinessUnitGroupOptions] = useState([]);
    const [selectedBusinessUnitGroup, setSelectedBusinessUnitGroup] = useState([]);

    const deneme = (value) => {
        // console.log("selectedCompanies", value);
        let selectedValue = []
        value.map(item => {
            if(item.length === 1){
                // console.log("lalalala", item[0])
                let selectedBus = businessUnitGroupOptions.filter(b => b.value === item[0])
                let busIds = selectedBus[0].children.map(bItem => bItem.value)
                // console.log("selectedBus", selectedBus)
                // let busIds = businessUnitGroupOptions.map(bItem => {
                //     if(item[0][0] === b.Item.value){
                //         return bItem.value
                //     }
                // })
                selectedValue = [...selectedValue, ...busIds];
            }else{
                selectedValue = [...selectedValue, item[1]];
            }
        })
        setSelectedBusiness(selectedValue);

    };

    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);

    const [positionOptions, setPositionOptions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);

    const [positionGroupOptions, setPositionGroupOptions] = useState([]);
    const [selectedPositionGroup, setSelectedPositionGroup] = useState([]);

    const denemePosition = (value, a, b) => {
        let selectedValue = []
        value.map(item => {
            if(item.length === 1){
                let selectedPos = positionGroupOptions.filter(p => p.value === item[0])
                // let posIds = selectedPos[0].children.map(pItem => pItem.value)
                let posIds = selectedPos[0].children.map(busItem => busItem.children.map(pItem => pItem.value))
                console.log("posIds", posIds)
                selectedValue = [...selectedValue, ...posIds];
            }else if(item.length === 2){
                let selectedPos = positionGroupOptions.filter(p => p.value === item[0])
                let posIds = selectedPos[0].children.map(pItem => pItem.value)
                // console.log(item)
                selectedValue = [...selectedValue, ...posIds];
            }else if(item.length === 3){
                selectedValue = [...selectedValue, item[2]];
            }
            // console.log("position",value);
        })
        
        setSelectedPositionGroup(selectedValue);

    };

    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
   
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(moment(start).format());
            setEndDate(moment(end).format());
        } else {
            setStartDate([]);
            setEndDate([]);
        }
    };

    const disabledDate = (current) => {
        // Can not select days before today
        return current && current < moment().startOf('day');
    };

    useEffect(() => {
        if(radioButtonStatus.company === true ){
            setSelectDisableStatus({
                company: false,
                business: true,
                department: true,
                position: true,
                employee: true,
            })
        }else if(radioButtonStatus.business === true ){
            setSelectDisableStatus({
                company: false,
                business: false,
                department: true,
                position: true,
                employee: true,
            })
        }else if(radioButtonStatus.department === true ){
            setSelectDisableStatus({
                company: false,
                business: true,
                department: false,
                position: true,
                employee: true,
            })
        }else if(radioButtonStatus.position === true ){
            setSelectDisableStatus({
                company: false,
                business: false,
                department: true,
                position: false,
                employee: true,
            })
        }else if(radioButtonStatus.employee === true ){
            setSelectDisableStatus({
                company: true,
                business: true,
                department: true,
                position: true,
                employee: false,
            })
        }else{
            setSelectDisableStatus({
                company: true,
                business: true,
                department: true,
                position: true,
                employee: true
            })
        }
    }, [radioButtonStatus])

    const handleChangeMinute = (e) => {
        let value = e.replace(/[^0-9]/g, '')
        setMinute(value)
    }

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllCompanies', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setCompanyOptions(data.map(item => {
                            return {
                                value: item.CompanyId,
                                label: item.CompanyName
                                }
                            }))
                    })
                }
            })

            FetchApiGet('api/OldSystem/GetDepartmant', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setDepartmentOptions(data.map(item => {
                            return {
                                value: item.DepartmantId,
                                label: item.DepartmantName
                                }
                            }))
                    })
                }
            })

            // FetchApiGet('api/Accounts/GetAllEmployees', 'GET')
            // .then(res => {
            //     if(res.status === 200){
            //         res.json().then(data => {
            //             // setEmployeeOptions(data.map(item => {
            //             //     return {
            //             //         value: item.DepartmantId,
            //             //         label: item.DepartmantName
            //             //         }
            //             //     }))
            //         })
            //     }
            // })

            // FetchApiGet('api/Accounts/GetAllEmployees', 'GET')
            fetch('http://178.18.196.202:5001/api/Accounts/GetAllEmployees')
            .then(res => {
                if(res.status === 201){
                    res.json().then(data => {
                        setEmployeeOptions(data.data.map(item => {
                            return { value: item.id, label: `${item.name} ${item.surname} / ${item.title}` }
                            }));
                    })
                }
            })

    }, [])



    useEffect(() => {
        const companyIds = selectedCompany.map(item => item.value)
        let date = new Date();
        let year = date.getFullYear();
        if(companyIds.length === 0) return;
        FetchApiPost('api/OldSystem/GetBusinessUnitsByCompanyIds', 'POST', {
            companyId: companyIds,
            year: year
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setBusinessOptions(data.map(item => {
                            return {
                                value: item.BusinessUnitId,
                                label: item.CompanyName
                                }
                            }
                        ))
                        let business = []
                        data.map(item => {
                            let a = business.findIndex(b => b.label === item.BusinessUnitName)
                            if(a === -1){
                                business.push({
                                    value: item.BusinessUnitName,
                                    label: item.BusinessUnitName,
                                    children: [
                                        {
                                            value: item.BusinessUnitId,
                                            label: item.CompanyName
                                        }
                                    ]
                                })
                            }else{
                                business[a].children.push({
                                    value: item.BusinessUnitId,
                                    label: item.CompanyName
                                })
                            }
                            }
                        )
                        setBusinessUnitGroupOptions(business)
                    })
                }
            })
    }, [selectedCompany])

    useEffect(() => {
        const companyIds = selectedCompany.map(item => item.value)
        const businessIds = selectedBusiness.map(item => item.value)
        let date = new Date();
        let year = date.getFullYear();
        if(companyIds.length === 0 || selectedBusiness.length === 0) return;
        FetchApiPost('api/OldSystem/GetPositions', 'POST', {
            compId: companyIds,
            busId: selectedBusiness,
            year: year
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setPositionOptions(data.map(item => {
                        return {
                            value: item.VacancyId,
                            label: item.VacancyName
                            }
                        }
                    ))

                    let position = [];
                    data.map(item => {
                        let a = position.findIndex(b => b.value === item.CompanyId)
                        if(a === -1){
                            position.push({
                                value: item.CompanyId,
                                label: item.CompanyName,
                                children: [
                                    {
                                        value: item.BusinessId,
                                        label: item.BusinessName,
                                        children: [
                                            {
                                                value: item.Id,
                                                label: item.Name
                                            }
                                        ]
                                    }
                                ]
                            })
                        }else{
                            let b = position[a].children.findIndex(c => c.value === item.BusinessId)
                            if(b === -1){
                                
                                position[a].children.push({
                                    value: item.BusinessId,
                                    label: item.BusinessName,
                                    children: [
                                        {
                                            value: item.Id,
                                            label: item.Name
                                        }
                                    ]
                                })
                            }else{
                                let c = position[a].children[b].children.findIndex(d => d.value === item.Id)
                                if(c === -1){
                                    position[a].children[b].children.push({
                                        value: item.Id,
                                        label: item.Name
                                    })
                                }
                                
                            }
                        }
                    }
                    )
                    setPositionGroupOptions(position)
                }
                
                )
            }
        })
    }, [selectedCompany, selectedBusiness])


    useEffect(() => {
        if(clickAdd){
            handleAddSurvey()
            setClickAdd(false)
        }
    }, [clickAdd])

    useEffect(() => {
        if(selectedDepartment.length !== 0){
            setSelectedCompany(companyOptions)
        }
    }, [selectedDepartment])

    const handleAddSurvey = () => {
        const newStart = startDate.length !== 0 && startDate.split('T');
        const newEnd = endDate.length !== 0 && endDate.split('T');

        let toWhom = 0;
        let toWhomIds = [];

        let compIds = [0];
        let busIds = [0]
        let posIds = [0]

        if(radioButtonStatus.company === true){
            toWhom = 1;
            toWhomIds = selectedCompany.map(item => item.value)
        }else if(radioButtonStatus.business === true){
            toWhom = 2;
            toWhomIds = selectedBusiness
        }else if(radioButtonStatus.department === true){
            toWhom = 3;
            toWhomIds = selectedDepartment.map(item => item.value)
            compIds = selectedCompany.map(item => item.value)
        }else if(radioButtonStatus.position === true){
            toWhom = 4;
            let pItems = [];
            selectedPositionGroup.map(item => {
                if(typeof item === 'object'){
                    item.map(i => {
                        pItems.find(pi => pi === i) === undefined && pItems.push(i)
                    })
                }else{
                    pItems.find(pi => pi === item) === undefined && pItems.push(item)
                }
            })
            toWhomIds = pItems;
            busIds = selectedBusiness;
            posIds = pItems;
        }else if(radioButtonStatus.employee === true){
            toWhom = 5;
            toWhomIds = selectedEmployee.map(item => item.value)
        }   

      

        const data = {
            surveyId: shareSurveyId,
            estimatedMinute: Number(minute),
            startDate: newStart[0] + 'T00:00:00+03:00',
            endDate: newEnd[0] + 'T23:59:59+03:00',
            toWhom: toWhom,
            toWhomIds: toWhomIds,
            companyIds: compIds,
            positionIds: posIds,
            busIds: busIds,
            createdBy: localStorage.getItem('userName')
        }

        FetchApiPost('services/SurveySystem/Survey/ShareSurvey', 'POST', data)
            .then(res => {
                if(res.status === 201){
                    setShowAddModal(false)
                    setSelectTab({ key: 1, label: 'Share' })
                }
            })
    }

    useEffect(() => {
        if(
            (startDate && endDate) && (startDate.length > 0 && endDate.length > 0) && 
            (minute && minute.length > 0)
        ){
            if(radioButtonStatus.company === true){
                if(selectedCompany.length > 0){
                    setButtonDisabled(false)
                }else{
                    setButtonDisabled(true)
                }
            }else if(radioButtonStatus.business === true){
                if(selectedCompany.length > 0 && selectedBusiness.length > 0){
                    setButtonDisabled(false)
                }else{
                    setButtonDisabled(true)
                }
            }else if(radioButtonStatus.department === true){
                if(selectedDepartment.length > 0){
                    setButtonDisabled(false)
                }else{
                    setButtonDisabled(true)
                }
            }else if(radioButtonStatus.position === true){
                if(selectedCompany.length > 0 && selectedBusiness.length > 0 && selectedPositionGroup.length > 0){
                    setButtonDisabled(false)
                }else{
                    setButtonDisabled(true)
                }
            }else if(radioButtonStatus.employee === true){
                if(selectedEmployee.length > 0){
                    setButtonDisabled(false)
                }else{
                    setButtonDisabled(true)
                }
            }
        }else{
            setButtonDisabled(true)
        }
    }, [startDate, endDate, radioButtonStatus, selectedCompany, selectedBusiness, selectedDepartment, selectedPositionGroup, selectedEmployee, minute])

    const handleChangeRadioButtons = (name) => {
        if(name === 'company'){
            setRadioButtonStatus({
                company: true,
                business: false,
                department: false,
                position: false,
                employee: false,
            })
            setSelectedBusiness([])
            setSelectedDepartment([])
            setSelectedPositionGroup([])
            setSelectedEmployee([])
        }else if(name === 'business'){
            setRadioButtonStatus({
                company: false,
                business: true,
                department: false,
                position: false,
                employee: false,
            })
            setSelectedDepartment([])
            setSelectedPositionGroup([])
            setSelectedEmployee([])
        }else if(name === 'department'){
            setRadioButtonStatus({
                company: false,
                business: false,
                department: true,
                position: false,
                employee: false,
            })
            setSelectedCompany([])
            setSelectedBusiness([])
            setSelectedPositionGroup([])
            setSelectedEmployee([])
        }else if(name === 'position'){
            setRadioButtonStatus({
                company: false,
                business: false,
                department: false,
                position: true,
                employee: false,
            })
            setSelectedDepartment([])
            setSelectedEmployee([])
        }else if(name === 'employee'){
            setRadioButtonStatus({
                company: false,
                business: false,
                department: false,
                position: false,
                employee: true,
            })
            setSelectedCompany([])
            setSelectedBusiness([])
            setSelectedDepartment([])
            setSelectedPositionGroup([])
        }
    }

    return (
        <div className="survey-share-add-modal">
            <Row className='survey-share-add-modal__date-row'>
                <Col style={{paddingRight: "0px"}}>
                    <div className="survey-share-add-modal__date-col">
                        <label>{t('start end date')}</label>
                        <RangePicker
                            className="survey-share-add-modal__date-picker"
                            style={{
                                borderRadius: '15px',
                                width: '100%',
                                height: '26px',
                                margin: '0 8px 26px 0',
                                borderColor: '#aaa',
                            }}
                            onChange={onChangeDate}
                            format="DD/MM/YYYY"
                            separator={
                                <i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>
                            }
                            disabledDate={disabledDate}
                            placeholder={[t('Start Date'), t('End Date')]}
                        />
                    </div>
                </Col>
                <Col style={{paddingLeft: "0px"}}>
                        <NewInput label="estimated minute" value={minute} setValue={() => {}} width={'100%'} suffixIcon={<span style={{color: "#6c757d"}}>m</span>} handleChange={e => handleChangeMinute(e)} placeholder="" />
                </Col>
            </Row>

            <Row>
                <Col>{t('where will you use this Survey?')}</Col>
            </Row>

                <Form.Group>
                    <Row className='survey-share-add-modal__radio-buttons'>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Company')}
                                value={'Company'}
                                onChange={(e) =>
                                    handleChangeRadioButtons('company')
                                }
                                checked={radioButtonStatus.company}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Business')}
                                value={'Business'}
                                onChange={(e) =>
                                    handleChangeRadioButtons('business')
                                }
                                checked={radioButtonStatus.business}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Department')}
                                value={'Department'}
                                onChange={(e) =>
                                    handleChangeRadioButtons('department')
                                }
                                checked={radioButtonStatus.department}
                            />
                        </Col>
                        <Col md={1}>
                        </Col>
                    </Row>

                    <Row className='survey-share-add-modal__radio-buttons' style={{marginTop: "1rem"}}>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Position')}
                                value={'Position'}
                                onChange={(e) =>
                                    handleChangeRadioButtons('position')
                                }
                                checked={radioButtonStatus.position}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Employee')}
                                value={'Employee'}
                                onChange={(e) =>
                                    handleChangeRadioButtons('employee')
                                }
                                checked={radioButtonStatus.employee}
                            />
                        </Col>
                        <Col></Col>
                        <Col md={1}>
                        </Col>
                    </Row>
                </Form.Group>

            <Row>
                <MultipleSelects
                    label={'company'}
                    placeholder={'company'}
                    width={'100%'}
                    selectedItems={selectedCompany}
                    setSelectedItems={setSelectedCompany}
                    options={companyOptions}
                    disabled={selectDisableStatus.company}
                />
            </Row>

            <Row>
                {/* <MultipleSelects
                    label={'business unit'}
                    placeholder={'business unit'}
                    width={'100%'}
                    selectedItems={selectedBusiness}
                    setSelectedItems={setSelectedBusiness}
                    options={businessOptions}
                    disabled={selectDisableStatus.business}
                /> */}
                <Col>
                <label style={{marginBottom: "4px"}}>{t('business unit')}</label>
                <Cascader options={businessUnitGroupOptions} onChange={deneme} placeholder="business unit" multiple maxTagCount="responsive" style={{width: "100%"}} disabled={selectDisableStatus.business} />
                </Col>
                
            </Row>

            <Row>
                <MultipleSelects
                    label={'department'}
                    placeholder={'department'}
                    width={'100%'}
                    selectedItems={selectedDepartment}
                    setSelectedItems={setSelectedDepartment}
                    options={departmentOptions}
                    disabled={selectDisableStatus.department}
                />
            </Row>

            <Row>
                {/* <MultipleSelects
                    label={'position'}
                    placeholder={'position'}
                    width={'100%'}
                    selectedItems={selectedPosition}
                    setSelectedItems={setSelectedPosition}
                    options={positionOptions}
                    disabled={selectDisableStatus.position}
                /> */}
                <Col>
                <label style={{marginBottom: "4px"}}>{t('position')}</label>
                    <Cascader options={positionGroupOptions} onChange={denemePosition} placeholder="position" multiple maxTagCount="responsive" style={{width: "100%"}} disabled={selectDisableStatus.position} />
                </Col>
                
            </Row>

            <Row>
                <MultipleSelects
                    label={'employee'}
                    placeholder={'employee'}
                    width={'100%'}
                    selectedItems={selectedEmployee}
                    setSelectedItems={setSelectedEmployee}
                    options={employeeOptions}
                    disabled={selectDisableStatus.employee}
                />
            </Row>
        </div>
    );
};

export default Body;
