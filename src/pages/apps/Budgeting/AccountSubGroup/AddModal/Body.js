import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { NewInput } from '../../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects'
import { FetchApiPost, FetchApiGet } from '../../../../../utils/http.helper'

const Body = ({ isClickAdd, setAddButtonDisableStatus, setIsShow, setFilterData, setIsClickAdd, setErrorModalMessage, setShowErrorModal, getAllFilterData }) => {

    const [accountGroupOptions, setAccountGroupOptions] = useState([])
    const [selectedAccountGroup, setSelectedAccountGroup] = useState()

    const [accountSubGroupName, setAccountSubGroupName] = useState('')

    useEffect(() => {
        FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET')
          .then(res => {
            if(res.status === 200){
              res.json().then(({data}) => {
                setAccountGroupOptions(data.map(item => ({value: item.id, label: item.accountGroupName})))
              })
            }
          })
       }, [])

    useEffect(() => {
        if(isClickAdd){
            FetchApiPost('services/Budget/AccSetting/CreateAccountSubGroup', 'POST', {
                accountSubGroupName: accountSubGroupName.trim(),
                accountGroupId: selectedAccountGroup.value,
                createdBy: localStorage.getItem('userName')
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        // setFilterData(prev => [...prev, data])
                        getAllFilterData()
                        setIsShow(false)
                    })
                }else if(res.status === 409){
                    setIsClickAdd(false)
                    setErrorModalMessage('Account sub group already exist')
                    setShowErrorModal(true)
                }
            })
        }
    }, [isClickAdd])

    useEffect(() => {
        if(selectedAccountGroup !== undefined && accountSubGroupName.trim().length > 0){
            setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true)
        }
    }, [selectedAccountGroup, accountSubGroupName])

  return (
    <div>
        <Row>
            <SingleSelects 
                label={'account group'}
                selectedItems={selectedAccountGroup}
                setSelectedItems={setSelectedAccountGroup}
                options={accountGroupOptions}
                width={"100%"}
                isStar={true}
            />
        </Row>
        <Row>
            <NewInput 
                label={'account sub group name'}
                value={accountSubGroupName}
                setValue={setAccountSubGroupName}
                width={"100%"}
                isStar={true}
                placeholder={'account sub group name'}
            />
        </Row>
    </div>
  )
}

export default Body