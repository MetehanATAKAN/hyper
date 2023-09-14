import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { NewInput } from '../../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects'
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper'

const Body = ({ isClickAdd, setAddButtonDisableStatus, setIsShow, setFilterData, filterData, setIsClickAdd, setErrorModalMessage, setShowErrorModal, selectedValue }) => {

    const [accountGroupOptions, setAccountGroupOptions] = useState([])
    const [selectedAccountGroup, setSelectedAccountGroup] = useState({ value: selectedValue.accountGroupId, label: selectedValue.accountGroupName})

    const [accountSubGroupOptions, setAccountSubGroupOptions] = useState([])
    const [selectedAccountSubGroup, setSelectedAccountSubGroup] = useState({ value: selectedValue.accountSubGroupId, label: selectedValue.accountSubGroupName})

    const [accountName, setAccountName] = useState(selectedValue.accountName);
    const [accountId, setAccountId] = useState(selectedValue.accountId);

    console.log(selectedValue)

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
                    })
                }
            })

            FetchApiPost('services/Budget/AccSetting/GetAccountSubGroupByAccountGroupId', 'POST', {
                accountGroupIds: [selectedValue.accountGroupId]
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        setAccountSubGroupOptions(data.map(item => {
                            return {
                                value: item.id,
                                label: item.accountSubGroupName
                            }
                        }))
                    })
                }
            })

    }, [selectedValue])

    useEffect(() => {
        if(isClickAdd){
            FetchApiPost('services/Budget/AccSetting/UpdateAccountName', 'POST', {
                id: selectedValue.id,
                accountGroupId: selectedAccountGroup.value,
                accountSubGroupId: selectedAccountSubGroup.value,
                accountName: accountName.trim(),
                accountId: accountId.trim(),
                modifiedBy: localStorage.getItem('userName')
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        let newData = filterData.map(item => {
                            if(item.id === data.id){
                                return data
                            }else{
                                return item
                            }
                        })
                        setFilterData(newData)
                        setIsShow(false)
                        setIsClickAdd(false)
                    })
                }else if(res.status === 409){
                    setIsClickAdd(false)
                    setErrorModalMessage('Account name already exist')
                    setShowErrorModal(true)
                }
            })
        }
    }, [isClickAdd])

    useEffect(() => {
        if(selectedAccountGroup !== undefined && selectedAccountSubGroup !== undefined && accountName.trim().length > 0 && accountId.trim().length > 0){
            setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true)
        }
    }, [selectedAccountGroup, selectedAccountSubGroup, accountName, accountId])

    const handleChangeAccountGroup = (value, label) => {
        setSelectedAccountGroup(label)
                setAccountSubGroupOptions([])
        setSelectedAccountSubGroup();
            if(selectedAccountGroup !== undefined){
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
                        })
                    }
                })
            }
    }

    console.log(selectedAccountGroup)
  return (
    <div>
        <Row>
            <SingleSelects 
                label={'account group'}
                selectedItems={selectedAccountGroup}
                // setSelectedItems={setSelectedAccountGroup}
                setSelectedItems={() => {}}
                handleChange={(value, label) => handleChangeAccountGroup(value, label)}
                options={accountGroupOptions}
                width={"100%"}
                isStar={true}
            />
        </Row>
        <Row>
            <SingleSelects 
                label={'account sub group'}
                selectedItems={selectedAccountSubGroup}
                setSelectedItems={setSelectedAccountSubGroup}
                options={accountSubGroupOptions}
                width={"100%"}
                isStar={true}
            />
        </Row>
        <Row>
            <NewInput 
                label={'account name'}
                value={accountName}
                setValue={setAccountName}
                width={"100%"}
                isStar={true}
                placeholder={'account name'}
            />
        </Row>
        <Row>
            <NewInput 
                label={'account id'}
                value={accountId}
                setValue={setAccountId}
                width={"100%"}
                isStar={true}
                placeholder={'account id'}
            />
        </Row>
    </div>
  )
}

export default Body