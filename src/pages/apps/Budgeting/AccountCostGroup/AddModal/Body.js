import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects'
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper'

const Body = ({ isClickAdd, setAddButtonDisableStatus, setIsShow, getAllFilterData, setIsClickAdd, setErrorModalMessage, setShowErrorModal }) => {

    const [accountGroupOptions, setAccountGroupOptions] = useState([])
    const [selectedAccountGroup, setSelectedAccountGroup] = useState()

    const [accountSubGroupOptions, setAccountSubGroupOptions] = useState([])
    const [selectedAccountSubGroup, setSelectedAccountSubGroup] = useState()

    const [accountNameIdOptions, setAccountNameIdOptions] = useState([]);
    const [selectedAccountNameId, setSelectedAccountNameId] = useState();

    const [accountCostCenter, setAccountCostCenter] = useState('');

    const [accountCostCenterId, setAccountCostCenterId] = useState('');

    const [pbTabOptions, setPbTabOptions] = useState([
        {value: 1, label: 'DepCost'},
        {value: 2, label: 'FixAssetsCost'},
        {value: 3, label: 'FixCost'},
        {value: 4, label: 'MarketCost'},
        {value: 5, label: 'VarCost'},
    ]);
    const [selectedPbTab, setSelectedPbTab] = useState();

    const [comment, setComment] = useState('');

    const [accountCostCenterDescription, setAccountCostCenterDescription] = useState('');

    const [accountCostCenterDescriptionRu, setAccountCostCenterDescriptionRu] = useState('');

    const [depretiationTerm, setDepretiationTerm] = useState('');

    const [effectiveDirectOptions, setEffectiveDirect] = useState([
        {value: 0, label: 'N/A'},
        {value: 1, label: 'Direct Cost'},
        {value: 2, label: 'Indirect Cost'},
    ]);
    const [selectedEffectiveDirect, setSelectedEffectiveDirect] = useState();


    // Account Goup
    useEffect(() => {
        FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        setAccountGroupOptions(data.map(item => {
                            return {
                                value: item.id,
                                label: item.accountGroupName
                            }
                        }))
                        if(data.length === 1){
                            setSelectedAccountGroup({value: data[0].id, label: data[0].accountGroupName})
                        }
                    })
                }
            })
    }, [])

    // Account Sub Group
    useEffect(() => {
        if(selectedAccountGroup){
            FetchApiPost('services/Budget/AccSetting/GetAccountSubGroupByAccountGroupId', 'POST', {
                accountGroupIds: [selectedAccountGroup.value]
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        setAccountSubGroupOptions(data.map(item => {
                            return {
                                value: item.id,
                                label: item.accountSubGroupName
                            }
                        }))
                        if(data.length === 1){
                            setSelectedAccountSubGroup({value: data[0].id, label: data[0].accountSubGroupName})
                        }
                    })
                }
            })
        }else{
            setAccountSubGroupOptions([])
            setSelectedAccountGroup()
        }
        
    }, [selectedAccountGroup])

    // Account Name - ID
    useEffect(() => {
        if(selectedAccountSubGroup && selectedAccountSubGroup){
            const data = {
                accountGroupIds: [selectedAccountGroup.value],
                accountSubGroupIds: [selectedAccountSubGroup.value]
            }
            FetchApiPost('services/Budget/AccSetting/GetAccountNameByAccountGroupId', 'POST', data).then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        setAccountNameIdOptions(data.map(item => {
                            return {
                                value: item.id,
                                label: `${item.accountName} - ${item.accountId}`
                            }
                        }))
                        if(data.length === 1){
                            setSelectedAccountNameId({value: data[0].id, label: `${data[0].accountName} - ${data[0].accountId}`})
                        }
                    })
                }
            })
        }
    }, [selectedAccountSubGroup])

    const handleChangeAccId = (e) => {
        // let value = e.replace(/\./g, "")
        let value = e.replace(/[^0-9]/g, '')
        if(value.length <= 6){
            setAccountCostCenterId(`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
        }
    }

    const handleChangeDepretiation = (e) => {
        let value = e.replace(/[^0-9]/g, '')
            setDepretiationTerm(value)
    }

    const handleChange = (value, label, name) => {
        switch (name) {
            case 'accountGroup':
                setSelectedAccountSubGroup();
                setSelectedAccountNameId();
                setSelectedAccountGroup(label)
                break;
            case 'accountSubGroup':
                setSelectedAccountNameId();
                setSelectedAccountSubGroup(label)
                break;
            case 'accountNameId':
                setSelectedAccountNameId(label)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(selectedAccountGroup && selectedAccountSubGroup && selectedAccountNameId && accountCostCenter.trim().length > 0 && accountCostCenterId.trim().length === 7 && selectedPbTab && depretiationTerm.length > 0 && selectedEffectiveDirect){
            setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true)
        }
    }, [selectedAccountGroup, selectedAccountSubGroup, selectedAccountNameId, accountCostCenter, accountCostCenterId ,selectedPbTab, depretiationTerm, selectedEffectiveDirect])

    console.log(accountCostCenterId)
    useEffect(() => {
        if(isClickAdd){
            FetchApiPost('services/Budget/AccSetting/CreateAccountCostCenter', 'POST', {
                accountGroupId: selectedAccountGroup.value,
                accountSubGroupId: selectedAccountSubGroup.value,
                accountNameId: selectedAccountNameId.value,
                accountCostCenterName: accountCostCenter.trim(),
                accountCostCenterId: accountCostCenterId,
                description: accountCostCenterDescription.trim(),
                descriptionRu: accountCostCenterDescriptionRu.trim(),
                depreationTerm: depretiationTerm,
                pbTabId: selectedPbTab.value,
                pbTabName: selectedPbTab.label,
                costTypeId: selectedEffectiveDirect.value,
                costTypeName: selectedEffectiveDirect.label,
                comment: comment.trim(),
                createdBy: localStorage.getItem('userName'),
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        getAllFilterData();
                        setIsShow(false)
                        setIsClickAdd(false)
                    })
                }else if(res.status === 409){
                    setIsClickAdd(false)
                    setErrorModalMessage('Account Cost Name already exist')
                    setShowErrorModal(true)
                }
            })
        }
    }, [isClickAdd])

  return (
    <div>
        <Row>
            <Col>
                <SingleSelects 
                    label={'account group'}
                    selectedItems={selectedAccountGroup}
                    setSelectedItems={() => {}}
                    options={accountGroupOptions}
                    width={"100%"}
                    isStar={true}
                    handleChange={(value, label) => handleChange(value, label, 'accountGroup')}
                />
            </Col>
            <Col>
                <SingleSelects 
                    label={'account sub group'}
                    selectedItems={selectedAccountSubGroup}
                    setSelectedItems={() => {}}
                    options={accountSubGroupOptions}
                    width={"100%"}
                    isStar={true}
                    handleChange={(value, label) => handleChange(value, label, 'accountSubGroup')}
                />
            </Col>
        </Row>

        <Row>
            <Col>
                <SingleSelects 
                    label={'account name - ID'}
                    selectedItems={selectedAccountNameId}
                    setSelectedItems={() => {}}
                    options={accountNameIdOptions}
                    width={"100%"}
                    isStar={true}
                    handleChange={(value, label) => handleChange(value, label, 'accountNameId')}
                />
            </Col>
            <Col>
            <NewInput 
                    label={'account cost center'}
                    value={accountCostCenter}
                    setValue={setAccountCostCenter}
                    width={"100%"}
                    isStar={true}
                    placeholder="account cost center"
                />
            </Col>
        </Row>
        <Row>
            <Col>
            <NewInput 
                    label={'account cost center ID'}
                    value={accountCostCenterId}
                    setValue={() => {}}
                    width={"100%"}
                    isStar={true}
                    placeholder="account cost center ID"
                    handleChange={e => handleChangeAccId(e)}
                />
            </Col>
            <Col>
                <SingleSelects 
                    label={'PB TAB'}
                    selectedItems={selectedPbTab}
                    setSelectedItems={setSelectedPbTab}
                    options={pbTabOptions}
                    width={"100%"}
                    isStar={true}
                />
            </Col>
        </Row>
        <Row>
            <NewTextArea 
                label={'comment'}
                value={comment}
                setValue={setComment}
                width={"100%"}
                placeholder="comment"
            />
        </Row>
        <Row>
            <NewTextArea 
                label={'account cost center description'}
                value={accountCostCenterDescription}
                setValue={setAccountCostCenterDescription}
                width={"100%"}
                placeholder="account cost center description"
            />
        </Row>
        <Row>
            <NewTextArea 
                label={'account cost center description (RU)'}
                value={accountCostCenterDescriptionRu}
                setValue={setAccountCostCenterDescriptionRu}
                width={"100%"}
                placeholder="account cost center description (RU)"
            />
        </Row>
        <Row>
            <Col>
                <NewInput 
                    label={'depreciation'}
                    value={depretiationTerm}
                    setValue={() => {}}
                    width={"100%"}
                    isStar={true}
                    placeholder="depreciation"
                    handleChange={e => handleChangeDepretiation(e)}
                />
            </Col>
            <Col>
                <SingleSelects 
                    label={'effective direct / indirect cost'}
                    selectedItems={selectedEffectiveDirect}
                    setSelectedItems={setSelectedEffectiveDirect}
                    options={effectiveDirectOptions}
                    width={"100%"}
                    isStar={true}
                />
            </Col>
        </Row>
    </div>
  )
}

export default Body