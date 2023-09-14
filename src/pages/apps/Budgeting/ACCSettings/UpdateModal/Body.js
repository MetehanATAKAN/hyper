import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Body = ({ isClickAdd, setIsClickAdd, setIsShow, setAddButtonDisableStatus, selectedValue, filterData, setFilterData }) => {
    console.log(selectedValue)
    const { t } = useTranslation();
    const [pageOptions, setPageOptions] = useState([]);
    const [selectedPage, setSelectedPage] = useState();

    const [sectionOptions, setSectionOptions] = useState([]);
    const [selectedSection, setSelectedSection] = useState();

    const [pLOptions, setPLOptions] = useState([]);
    const [selectedPL, setSelectedPL] = useState();

    const [accountCostGroupOptions, setAccountCostGroupOptions] = useState([]);
    const [selectedAccountCostGroup, setSelectedAccountCostGroup] = useState();

    const [accountSubGroupOptions, setAccountSubGroupOptions] = useState([]);
    const [selectedAccountSubGroup, setSelectedAccountSubGroup] = useState();

    const [accountCostCenterOptions, setAccountCostCenterOptions] = useState([]);
    const [selectedAccountCostCenter, setSelectedAccountCostCenter] = useState();

    const [departmentRadio, setDepartmentRadio] = useState(false);
    const [positionRadio, setPositionRadio] = useState(false);
    const [radioButtonStatus, setRadioButtonStatus] = useState({ department: false, position: false });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    // ----------------------------------------------------------------------------------------------------
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [departmentOptions, setDepartmentOptions] = useState([]);

    const [selectedPosition, setSelectedPosition] = useState();
    const [positionOptions, setPositionOptions] = useState([]);

    useEffect(() => {
        // page
        setSelectedPage({ value: selectedValue.pageId, label: selectedValue.pageName });
        // section
        setSelectedSection({value: selectedValue.section, label: selectedValue.sectionName});
        // p&l section
        setSelectedPL({value: selectedValue.pandId, label: selectedValue.pandIdName});
        // account cost group
        setSelectedAccountCostGroup({value: selectedValue.accountGroupId, label: selectedValue.accountGroupName});
        // account sub group
        setSelectedAccountSubGroup({value: selectedValue.accountSubGroupId, label: selectedValue.accountSubGroupName});
        // account cost center
        setSelectedAccountCostCenter({value: selectedValue.accountCostCenterId, label: selectedValue.accountCostCenterName});

        FetchApiPost('services/Budget/AccSetting/GetSectionByPageId', 'POST', {
            pageIds: [selectedValue.pageId],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setSectionOptions(data.map((item) => ({ value: item.sectionId, label: item.sectionName })));
                    if(data.length === 1) {
                        setSelectedSection({ value: data[0].sectionId, label: data[0].sectionName });
                    }
                });
            }
        });

        if(selectedValue.pageId === 1){
            setRadioButtonStatus({ department: false, position: false });
        }else{
            if(selectedValue.positionId === 0){
                setRadioButtonStatus({ department: true, position: false });
                
                setSelectedDepartment({value: selectedValue.departmentId, label: selectedValue.departmentName});
            }else{
                setRadioButtonStatus({ department: false, position: true });
                setSelectedPosition({value: selectedValue.positionId, label: selectedValue.positionName});
                setSelectedDepartment({value: selectedValue.departmentId, label: selectedValue.departmentName});

                FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds', 'POST', [selectedValue.departmentId])
                    .then(res => {
                        if (res.status === 200) {
                            res.json().then(({ data }) => {
                                setPositionOptions(data.map((item) => ({ value: item.id, label: item.positionName })));
                                if (data.length === 1) {
                                    setSelectedPosition({ value: data[0].id, label: data[0].positionName });
                                }
                            })
                        }
                    })
            }
        }
    }, [selectedValue])

    useEffect(() => {
        FetchApiGet('services/Budget/AccSetting/GetPages', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setPageOptions(data.map((item) => ({ value: item.pageId, label: item.pageName })));
                });
            }
        });
    }, []);

    const handleChangePage = (value, label) => {
        setSectionOptions([]);
        setSelectedSection();
        setRadioButtonStatus({ department: false, position: false });
        setSelectedDepartment();
        setSelectedPosition();
        
        setSelectedPage(label);
        if (label !== undefined){
            FetchApiPost('services/Budget/AccSetting/GetSectionByPageId', 'POST', {
                pageIds: [label.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setSectionOptions(data.map((item) => ({ value: item.sectionId, label: item.sectionName })));
                        if(data.length === 1) {
                            setSelectedSection({ value: data[0].sectionId, label: data[0].sectionName });
                        }
                    });
                }
            });
        }
    }

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetPLSection', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setPLOptions(data.map((item) => ({ value: item.Id, label: item.Val1 })));
                    if (data.length === 1) {
                        setSelectedPL({ value: data[0].Id, label: data[0].Val1 });
                    }
                });
            }
        });

        FetchApiGet('services/Hr/Department/GetAllDepartments', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setDepartmentOptions(data.map((item) => ({ value: item.id, label: item.departmentName })));
                    if (data.length === 1) {
                        setSelectedDepartment({ value: data[0].id, label: data[0].departmentName });
                    }
                });
            }
        });
    }, []);

    const handleChangeDepartment = (value, label) => {
        setSelectedPosition();
        setPositionOptions([]);
        setSelectedDepartment(label);

        if (label === undefined || radioButtonStatus.position === false) return;
        let depIds = label.value;
        FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds', 'POST', [depIds])
            .then(res => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPositionOptions(data.map((item) => ({ value: item.id, label: item.positionName })));
                        if (data.length === 1) {
                            setSelectedPosition({ value: data[0].id, label: data[0].positionName });
                        }
                    })
                }
            })
    }

    useEffect(() => {
        FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET')
            .then(res => {
                if(res.status === 200) {
                    res.json().then(({ data }) => {
                        setAccountCostGroupOptions(data.map((item) => ({ value: item.id, label: item.accountGroupName })))
                        if(data.length === 1) {
                            setSelectedAccountCostGroup({ value: data[0].id, label: data[0].accountGroupName })
                        }
                    })
                }
            })
    }, [])


    useEffect(() => {
        if(selectedAccountCostGroup){
            let ids = selectedAccountCostGroup.value
            FetchApiPost('services/Budget/AccSetting/GetAccountSubGroupByAccountGroupId', 'POST', {
                accountGroupIds: [ids]
            }).then(res => {
                if(res.status === 200) {
                    res.json().then(({ data }) => {
                        setAccountSubGroupOptions(data.map((item) => ({ value: item.id, label: item.accountSubGroupName })))
                        if(data.length === 1) {
                            setSelectedAccountSubGroup({ value: data[0].id, label: data[0].accountSubGroupName })
                        }
                    })
                }
            })
        }
        
    }, [selectedAccountCostGroup])

    useEffect(() => {
        if(!selectedAccountSubGroup) return;
        let ids = selectedAccountSubGroup.value
        FetchApiPost('services/Budget/AccSetting/GetAccountCostCenterByAccountSubGroupId', 'POST', {
            accountSubGroupIds: [ids]
        }).then(res => {
            if(res.status === 200) {
                res.json().then(({ data }) => {
                    setAccountCostCenterOptions(data.map((item) => ({ value: item.id, label: item.accountCostCenterName })))
                    if(data.length === 1) {
                        setSelectedAccountCostCenter({ value: data[0].id, label: data[0].accountCostCenterName })
                    }
                })
            }
        })
    }, [selectedAccountSubGroup])

    const handleChange = (value, label, name) => {
        switch (name) {
            case 'accountCostGroup':
                setSelectedAccountCostGroup(label);
                setSelectedAccountSubGroup();
                setSelectedAccountCostCenter();
                setAccountSubGroupOptions([]);
                setAccountCostCenterOptions([]);

                // handleChangeAccountCostGroup(label);
                break;
            case 'accountSubGroup':
                setSelectedAccountSubGroup(label);
                setSelectedAccountCostCenter();
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
                id: selectedValue.id,
                pageId: selectedPage.value,
                sectionId: selectedSection.value,
                isDepartment: departmentBoolean,
                isPosition: positionBoolean,
                departmentId: (radioButtonStatus.department || radioButtonStatus.position) ? selectedDepartment.value : 0,
                positionId: radioButtonStatus.position === true ? selectedPosition.value : 0,
                pandLId: selectedPL.value,
                accountCostCenterId: selectedAccountCostCenter.value,
                modifiedBy: localStorage.getItem('userName'),
            }
            FetchApiPost('services/Budget/AccSetting/UpdateAccountCostCenterSetting', 'POST', data)
                .then(res => {
                    if(res.status === 200){
                        res.json().then(({data}) => {
                            let newData = filterData.map(item => {
                                if(item.id === selectedValue.id){
                                    return data;
                                }else{
                                    return item;
                                }
                            })
                            setFilterData(newData);
                        })
                        setIsShow(false);
                    }else if(res.status === 409){
                        res.json().then(({ errors }) => {
                            setIsShow(false);
                        })
                    }
                })
            setIsClickAdd(false)
        }
    }, [isClickAdd])

    // useEffect(() => {
    //     setSelectedPosition();
    //     setSelectedDepartment();
    //     setPositionOptions([]);
    // }, [radioButtonStatus])

    console.log(selectedDepartment, selectedPosition)
    useEffect(() => {
        if(selectedPage !== undefined && selectedSection !== undefined && selectedPL !== undefined && selectedAccountCostGroup !== undefined && selectedAccountSubGroup !== undefined&& selectedAccountCostCenter !== undefined) {
            if(selectedPage.value === 2){
                if(radioButtonStatus.department === true){
                    if(selectedDepartment !== undefined){
                        setAddButtonDisableStatus(false)
                    }else{
                        setAddButtonDisableStatus(true)
                    }
                }else if(radioButtonStatus.position === true){
                    if(selectedPosition === undefined || selectedDepartment === undefined){
                        setAddButtonDisableStatus(true)
                    }else{
                        setAddButtonDisableStatus(false)
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

    const handleChangeDepartmentRadioButton = () => {
        setRadioButtonStatus({ department: true, position: false })
        setSelectedPosition();
        setSelectedDepartment();
    }

    const handleChangePositionRadioButton = () => {
        setRadioButtonStatus({ department: false, position: true })
        setSelectedPosition();
        setSelectedDepartment();
        setPositionOptions([]);
    }

    return (
        <div>
            <Row>
                <SingleSelects
                    label={'page'}
                    selectedItems={selectedPage}
                    setSelectedItems={() => {}}
                    options={pageOptions}
                    width={'100%'}
                    isStar={true}
                    handleChange={(value, label) => handleChangePage(value, label)}
                />
            </Row>
            {selectedPage && selectedPage.value === 2 && (
                <Form.Group style={{ display: 'flex', alignItems: 'center', columnGap: '1.5rem' }}>
                    <Form.Check
                        type="radio"
                        label={t("Department")}
                        value={'Department'}
                        onChange={() => handleChangeDepartmentRadioButton()}
                        checked={radioButtonStatus.department}
                    />
                    <Form.Check
                        type="radio"
                        label={t("Position")}
                        value={'Position'}
                        onChange={() => handleChangePositionRadioButton()}
                        checked={radioButtonStatus.position}
                    />
                </Form.Group>
            )}



            {selectedPage && selectedPage.value === 2 && (
                <>
                    <Row>
                        <SingleSelects
                            label={'department'}
                            selectedItems={selectedDepartment}
                            setSelectedItems={() => {}}
                            options={departmentOptions}
                            width={'100%'}
                            isStar={true}
                            disabled={(radioButtonStatus.position === false && radioButtonStatus.department === false)}
                            handleChange={(value, label) => handleChangeDepartment(value, label)}
                        />
                    </Row>
                    <Row>
                        <SingleSelects
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
                        <SingleSelects
                            label={'section'}
                            selectedItems={selectedSection}
                            setSelectedItems={setSelectedSection}
                            options={sectionOptions}
                            width={'100%'}
                            isStar={true}
                        />
                    </Row>

                    <Row>
                <SingleSelects
                    label={'p&l section'}
                    selectedItems={selectedPL}
                    setSelectedItems={setSelectedPL}
                    options={pLOptions}
                    width={'100%'}
                    isStar={true}
                />
            </Row>
            <Row>
                <SingleSelects
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
                <SingleSelects
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
                <SingleSelects
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
