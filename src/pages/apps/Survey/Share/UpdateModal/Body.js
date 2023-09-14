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
import dayjs from 'dayjs';

const Body = ({ selectedValue, clickAdd, setClickAdd, shareSurveyId, setShowAddModal, setButtonDisabled, data, setData }) => {
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


    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);

    const [positionOptions, setPositionOptions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);

    const [positionGroupOptions, setPositionGroupOptions] = useState([]);
    const [selectedPositionGroup, setSelectedPositionGroup] = useState([]);


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
        setMinute(`${selectedValue.item.estimatedMunite}`)

        // radioButtons
        if(selectedValue.item.employees !== null){
            setRadioButtonStatus({
                company: false,
                business: false,
                department: false,
                position: false,
                employee: true,
            })
            setSelectedEmployee(selectedValue.item.employees.map(i => {
                return {
                    label: `${i.name} ${i.surname} / ${i.title}`,
                    value: i.id
                }
            }))
        }else if(selectedValue.item.positions !== null){
            setRadioButtonStatus({
                company: false,
                business: false,
                department: false,
                position: true,
                employee: false,
            })
            setSelectedPosition(selectedValue.item.positions.map(i => {
                return {
                    label: i.positionName,
                    value: i.positionId
                }
            }))
        }else if(selectedValue.item.departmants !== null){
            setRadioButtonStatus({
                company: false,
                business: false,
                department: true,
                position: false,
                employee: false,
            })
            setSelectedDepartment(selectedValue.item.departmants.map(i => {
                return {
                    label: i.departmantName,
                    value: i.departmantId
                }
            }))
        }else if(selectedValue.item.businesUnites !== null){
            setRadioButtonStatus({
                company: false,
                business: true,
                department: false,
                position: false,
                employee: false,
            })
            setSelectedBusiness(selectedValue.item.businesUnites.map(i => {
                return {
                    label: i.businessUnitName,
                    value: i.businessUnitId
                }
            }))
        }else if(selectedValue.item.companies !== null){
            setRadioButtonStatus({
                company: true,
                business: false,
                department: false,
                position: false,
                employee: false,
            })
            setSelectedCompany(selectedValue.item.companies.map(i => {
                return {
                    label: i.companyName,
                    value: i.companyId
                }
            }
            ))
        }
    }, [selectedValue])


    const handleChangeMinute = (e) => {
        let value = e.replace(/[^0-9]/g, '')
        setMinute(value)
    }

    useEffect(() => {
        if(clickAdd){
            handleAddSurvey()
            setClickAdd(false)
        }
    }, [clickAdd])

    
    const handleAddSurvey = () => {
        const newStart = startDate.length !== 0 && startDate.split('T');
        const newEnd = endDate.length !== 0 && endDate.split('T');
        console.log()
        let aproveId = 0
        let dateNow = new Date();
        dateNow.setHours(0,0,0,0)

        let dataObject = {}

        if(new Date(startDate.split('T')[0]+ 'T00:00:00+03:00').getTime() === new Date().setHours(0,0,0,0)){
            dataObject = {
                id: selectedValue.item.id,
                estimatedMunite: Number(minute),
                startDate: newStart[0] + 'T00:00:00+03:00',
                endDate: newEnd[0] + 'T23:59:59+03:00',
                modifiedBy: localStorage.getItem('userName'),
                isApproved: 4
            }
        }else{
            dataObject = {
                id: selectedValue.item.id,
                estimatedMunite: Number(minute),
                startDate: newStart[0] + 'T00:00:00+03:00',
                endDate: newEnd[0] + 'T23:59:59+03:00',
                modifiedBy: localStorage.getItem('userName'),
                isApproved: 1
            }
        }

        FetchApiPost('services/SurveySystem/Survey/UpdateSharedSurvey', 'POST', dataObject)
            .then(res => {
                if(res.status === 201){
                    let newShare = data.map(i => {
                        if(i.id === selectedValue.item.id){
                            return {
                                ...i,
                                isApproved: dataObject.isApproved,
                                startDate: newStart[0] + 'T00:00:00+03:00',
                                endDate: newEnd[0] + 'T23:59:59+03:00',
                            }
                        }else{
                            return i
                        }
                    })
                    setData(newShare)
                    setShowAddModal(false)
                }
            })
    }

    useEffect(() => {
        if(
            (startDate !== undefined && endDate !== undefined) && (startDate.length > 0 && endDate.length > 0) && 
            (minute !== undefined && minute.length > 0)
        ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
            
    }, [startDate, endDate, radioButtonStatus, selectedCompany, selectedBusiness, selectedDepartment, selectedPositionGroup, selectedEmployee, minute, selectedValue])

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
                                disabled
                                checked={radioButtonStatus.company}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Business')}
                                value={'Business'}
                                disabled
                                checked={radioButtonStatus.business}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Department')}
                                value={'Department'}
                                disabled
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
                                disabled
                                checked={radioButtonStatus.position}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="radio"
                                label={t('Employee')}
                                value={'Employee'}
                                disabled
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
                    disabled={true}
                />
            </Row>

            <Row>
                <MultipleSelects
                    label={'business unit'}
                    placeholder={'business unit'}
                    width={'100%'}
                    selectedItems={selectedBusiness}
                    setSelectedItems={setSelectedBusiness}
                    disabled={true}
                />
                {/* <Col>
                <label style={{marginBottom: "4px"}}>business unit</label>
                <Cascader options={businessUnitGroupOptions} onChange={deneme} placeholder="business unit" multiple maxTagCount="responsive" style={{width: "100%"}} disabled={true}/>
                </Col> */}
                
            </Row>

            <Row>
                <MultipleSelects
                    label={'department'}
                    placeholder={'department'}
                    width={'100%'}
                    selectedItems={selectedDepartment}
                    setSelectedItems={setSelectedDepartment}
                    disabled={true}
                />
            </Row>

            <Row>
                <MultipleSelects
                    label={'position'}
                    placeholder={'position'}
                    width={'100%'}
                    selectedItems={selectedPosition}
                    setSelectedItems={setSelectedPosition}
                    disabled={true}
                />
                {/* <Col>
                <label style={{marginBottom: "4px"}}>position</label>
                    <Cascader options={positionGroupOptions} placeholder="position" multiple maxTagCount="responsive" style={{width: "100%"}} disabled={true} />
                </Col> */}
                
            </Row>

            <Row>
                <MultipleSelects
                    label={'employee'}
                    placeholder={'employee'}
                    width={'100%'}
                    selectedItems={selectedEmployee}
                    setSelectedItems={setSelectedEmployee}
                    disabled={true}
                />
            </Row>
        </div>
    );
};

export default Body;
