import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Body = ({ isClickAdd, setIsClickAdd, setIsShow, getAllFilterData, setAddButtonDisableStatus, setErrorModalMessage, setShowErrorModal, setMessage2 }) => {
    const { t } = useTranslation();
    const [pageOptions, setPageOptions] = useState([]);
    const [selectedPage, setSelectedPage] = useState();

    const [sectionOptions, setSectionOptions] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);

    const [pLOptions, setPLOptions] = useState([]);
    const [selectedPL, setSelectedPL] = useState([]);

    const [accountCostGroupOptions, setAccountCostGroupOptions] = useState([]);
    const [selectedAccountCostGroup, setSelectedAccountCostGroup] = useState([]);

    const [accountSubGroupOptions, setAccountSubGroupOptions] = useState([]);
    const [selectedAccountSubGroup, setSelectedAccountSubGroup] = useState([]);

    const [accountCostCenterOptions, setAccountCostCenterOptions] = useState([]);
    const [selectedAccountCostCenter, setSelectedAccountCostCenter] = useState([]);

    const [departmentRadio, setDepartmentRadio] = useState(false);
    const [positionRadio, setPositionRadio] = useState(false);
    const [radioButtonStatus, setRadioButtonStatus] = useState({ department: false, position: false });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    // ----------------------------------------------------------------------------------------------------
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);

    const [selectedPosition, setSelectedPosition] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);

    useEffect(() => {
        FetchApiGet('services/Budget/AccSetting/GetPages', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setPageOptions(data.map((item) => ({ value: item.pageId, label: item.pageName })));
                });
            }
        });
    }, []);

    useEffect(() => {
        setSectionOptions([]);
        setSelectedSection([]);
        setRadioButtonStatus({ department: false, position: false });
        setSelectedDepartment([]);
        setSelectedPosition([]);
        if (selectedPage === undefined){
            return;
        };
        FetchApiPost('services/Budget/AccSetting/GetSectionByPageId', 'POST', {
            pageIds: [selectedPage.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setSectionOptions(data.map((item) => ({ value: item.sectionId, label: item.sectionName })));
                    if(data.length === 1) {
                        setSelectedSection([{ value: data[0].sectionId, label: data[0].sectionName }]);
                    }
                });
            }
        });
    }, [selectedPage]);

    // useEffect(() => {
    //     if (selectedPage) {
    //         if (selectedPage.value === 2) {
    //             if (radioButtonStatus.department === false && radioButtonStatus.position === false) {
    //                 setButtonDisabled(true);
    //             } else {
    //                 setButtonDisabled(false);
    //             }
    //         }
    //     }
    // }, [selectedPage]);

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetPLSection', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setPLOptions(data.map((item) => ({ value: item.Id, label: item.Val1 })));
                    if (data.length === 1) {
                        setSelectedPL([{ value: data[0].Id, label: data[0].Val1 }]);
                    }
                });
            }
        });

        FetchApiGet('services/Hr/Department/GetAllDepartments', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setDepartmentOptions(data.map((item) => ({ value: item.id, label: item.departmentName })));
                    if (data.length === 1) {
                        setSelectedDepartment([{ value: data[0].id, label: data[0].departmentName }]);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        setSelectedPosition([]);
        setPositionOptions([]);
        if (selectedDepartment.length === 0 || radioButtonStatus.position === false) return;
        let depIds = selectedDepartment.map((item) => item.value);
        FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds', 'POST', depIds)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPositionOptions(data.map((item) => ({ value: item.id, label: item.positionName })));
                        if (data.length === 1) {
                            setSelectedPosition([{ value: data[0].id, label: data[0].positionName }]);
                        }
                    })
                }
            })
    }, [selectedDepartment])

    // useEffect(() => {
    //     FetchApiPost('services/Budget/AccSetting/GetSectionByPageId', 'POST', {
    //         pageIds: [selectedPage.value]
    //     }).then(res => {
    //         if(res.status === 200) {
    //             res.json().then(({ data }) => {
    //                 setSectionOptions(data.map((item) => ({ value: item.sectionId, label: item.sectionName })))
    //                 if(data.length === 1) {
    //                     setSelectedSection([{ value: data[0].sectionId, label: data[0].sectionName }])
    //                 }
    //             })
    //         }
    //     })
    // }, [])


    useEffect(() => {
        FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET')
            .then(res => {
                if(res.status === 200) {
                    res.json().then(({ data }) => {
                        setAccountCostGroupOptions(data.map((item) => ({ value: item.id, label: item.accountGroupName })))
                        if(data.length === 1) {
                            setSelectedAccountCostGroup([{ value: data[0].id, label: data[0].accountGroupName }])
                        }
                    })
                }
            })
    }, [])

    useEffect(() => {
        if(selectedAccountCostGroup.length === 0){
            setAccountCostCenterOptions([]);
            setSelectedAccountCostCenter([]);
        }else{
            let ids = selectedAccountCostGroup.map((item) => item.value)
            FetchApiPost('services/Budget/AccSetting/GetAccountSubGroupByAccountGroupId', 'POST', {
                accountGroupIds: ids
            }).then(res => {
                if(res.status === 200) {
                    res.json().then(({ data }) => {
                        setAccountSubGroupOptions(data.map((item) => ({ value: item.id, label: item.accountSubGroupName })))
                        if(data.length === 1) {
                            setSelectedAccountSubGroup([{ value: data[0].id, label: data[0].accountSubGroupName }])
                        }
                    })
                }
            })
        }
        
    }, [selectedAccountCostGroup])

    useEffect(() => {
        if(selectedAccountSubGroup.length === 0) return;
        let ids = selectedAccountSubGroup.map((item) => item.value)
        FetchApiPost('services/Budget/AccSetting/GetAccountCostCenterByAccountSubGroupId', 'POST', {
            accountSubGroupIds: ids
        }).then(res => {
            if(res.status === 200) {
                res.json().then(({ data }) => {
                    setAccountCostCenterOptions(data.map((item) => ({ value: item.id, label: item.accountCostCenterName })))
                    if(data.length === 1) {
                        setSelectedAccountCostCenter([{ value: data[0].id, label: data[0].accountCostCenterName }])
                    }
                })
            }
        })
    }, [selectedAccountSubGroup])

    const handleChange = (value, label, name) => {
        console.log(label)
        switch (name) {
            case 'accountCostGroup':
                setSelectedAccountCostGroup(label);
                setSelectedAccountSubGroup([]);
                setSelectedAccountCostCenter([]);
                setAccountSubGroupOptions([]);
                setAccountCostCenterOptions([]);
                break;
            case 'accountSubGroup':
                setSelectedAccountSubGroup(label);
                setSelectedAccountCostCenter([]);
                setAccountCostCenterOptions([]);
                break;
            case 'accountCostCenter':
                setSelectedAccountCostCenter(label);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        if(isClickAdd){
            let positionBoolean = false;
            let departmentBoolean = false;
            if(selectedPage.value !== 2){
                positionBoolean = false;
                departmentBoolean = false;
            }else{
                positionBoolean = radioButtonStatus.position;
                departmentBoolean = radioButtonStatus.department;
            }
            const data = {
                pageId: selectedPage.value,
                sectionIds: selectedSection.map(item => item.value),
                isDepartment: departmentBoolean,
                isPosition: positionBoolean,
                departmentIds: (radioButtonStatus.department || radioButtonStatus.position) ? selectedDepartment.map(item => item.value) : [],
                positionIds: selectedPosition.length > 0 ? selectedPosition.map(item => item.value) : [],
                pandLIds: selectedPL.length > 0 ? selectedPL.map(item => item.value) : [0],
                accountCostCenterIds: selectedAccountCostCenter.map((item) => item.value),
                createdBy: localStorage.getItem('userName'),
            }
            FetchApiPost('services/Budget/AccSetting/CreateAccSetting', 'POST', data)
                .then(res => {
                    if(res.status === 200){
                        getAllFilterData()
                        setIsShow(false);
                    }else if(res.status === 409){
                        res.json().then(({ errors }) => {
                            setMessage2(errors[0])
                            setErrorModalMessage("Account cost center already in use")
                            setShowErrorModal(true)
                        })
                    }
                })
            setIsClickAdd(false)
        }
    }, [isClickAdd])

    useEffect(() => {
        // if(radioButtonStatus.department === true){
        //     setSelectedPosition([]);
        // }
        setSelectedPosition([]);
        setSelectedDepartment([]);
    }, [radioButtonStatus])

    useEffect(() => {
        if(selectedPage !== undefined && selectedSection.length > 0 && selectedPL.length > 0 && selectedAccountCostGroup.length > 0 && selectedAccountSubGroup.length > 0 && selectedAccountCostCenter.length > 0) {
            if(selectedPage.value === 2){
                if(radioButtonStatus.department === true){
                    if(selectedDepartment.length > 0){
                        setAddButtonDisableStatus(false)
                    }else{
                        setAddButtonDisableStatus(true)
                    }
                }else if(radioButtonStatus.position === true){
                    if(selectedPosition.length > 0 && selectedDepartment.length > 0){
                        setAddButtonDisableStatus(false)
                    }else{
                        setAddButtonDisableStatus(true)
                    }
                }
            }else{
                setAddButtonDisableStatus(false)
            }
            // setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true)
        }

    }, [selectedPage, selectedSection, radioButtonStatus, selectedDepartment, selectedPosition, selectedPL, selectedAccountCostGroup, selectedAccountSubGroup, selectedAccountCostCenter])

    return (
        <div>
            <Row>
                <SingleSelects
                    label={'page'}
                    selectedItems={selectedPage}
                    setSelectedItems={setSelectedPage}
                    options={pageOptions}
                    width={'100%'}
                    isStar={true}
                />
            </Row>
            {selectedPage && selectedPage.value === 2 && (
                <Form.Group style={{ display: 'flex', alignItems: 'center', columnGap: '1.5rem' }}>
                    <Form.Check
                        type="radio"
                        label={t("Department")}
                        value={'Department'}
                        onChange={(e) => setRadioButtonStatus({ department: true, position: false })}
                        checked={radioButtonStatus.department}
                    />
                    <Form.Check
                        type="radio"
                        label={t("Position")}
                        value={'Position'}
                        onChange={(e) => setRadioButtonStatus({ department: false, position: true })}
                        checked={radioButtonStatus.position}
                    />
                </Form.Group>
            )}



            {selectedPage && selectedPage.value === 2 && (
                <>
                    <Row>
                        <MultipleSelects
                            label={'department'}
                            selectedItems={selectedDepartment}
                            setSelectedItems={setSelectedDepartment}
                            options={departmentOptions}
                            width={'100%'}
                            isStar={true}
                            disabled={(radioButtonStatus.position === false && radioButtonStatus.department === false)}
                        />
                    </Row>
                    <Row>
                        <MultipleSelects
                            label={'position'}
                            selectedItems={selectedPosition}
                            setSelectedItems={setSelectedPosition}
                            options={positionOptions}
                            width={'100%'}
                            isStar={true}
                            disabled={(radioButtonStatus.position === false && radioButtonStatus.department === false) || (radioButtonStatus.department === true)}
                        />
                    </Row>
                </>
            )}

                    <Row>
                        <MultipleSelects
                            label={'section'}
                            selectedItems={selectedSection}
                            setSelectedItems={setSelectedSection}
                            options={sectionOptions}
                            width={'100%'}
                            isStar={true}
                        />
                    </Row>

                    <Row>
                <MultipleSelects
                    label={'p&l section'}
                    selectedItems={selectedPL}
                    setSelectedItems={setSelectedPL}
                    options={pLOptions}
                    width={'100%'}
                    isStar={true}
                />
            </Row>
            <Row>
                <MultipleSelects
                    label={'account cost group'}
                    selectedItems={selectedAccountCostGroup}
                    setSelectedItems={() => {}}
                    options={accountCostGroupOptions}
                    width={'100%'}
                    isStar={true}
                    handleChange={(value, label) => handleChange(value, label, 'accountCostGroup')}
                />
            </Row>
            <Row>
                <MultipleSelects
                    label={'account sub group'}
                    selectedItems={selectedAccountSubGroup}
                    setSelectedItems={() => {}}
                    options={accountSubGroupOptions}
                    width={'100%'}
                    isStar={true}
                    handleChange={(value, label) => handleChange(value, label, 'accountSubGroup')}
                />
            </Row>
            <Row>
                <MultipleSelects
                    label={'account cost center'}
                    selectedItems={selectedAccountCostCenter}
                    setSelectedItems={() => {}}
                    options={accountCostCenterOptions}
                    width={'100%'}
                    isStar={true}
                    handleChange={(value, label) => handleChange(value, label, 'accountCostCenter')}
                />
            </Row>
        </div>
    );
};

export default Body;
