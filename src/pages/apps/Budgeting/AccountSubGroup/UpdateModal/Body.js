import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { NewInput } from '../../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects'
import { FetchApiPost, FetchApiGet } from '../../../../../utils/http.helper'

const Body = ({ isClickAdd, setAddButtonDisableStatus, setIsShow, setFilterData, filterData, setIsClickAdd, setErrorModalMessage, setShowErrorModal, selectedValue }) => {

    const [accountGroupOptions, setAccountGroupOptions] = useState([])
    const [selectedAccountGroup, setSelectedAccountGroup] = useState({ value: selectedValue.accountGroupId, label: selectedValue.accountGroupName})

    const [accountSubGroupName, setAccountSubGroupName] = useState(selectedValue.accountSubGroupName)

    console.log(selectedValue)

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
        if(selectedAccountGroup !== undefined && accountSubGroupName.trim().length > 0){
            setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true)
        }
    }, [selectedAccountGroup, accountSubGroupName])

    useEffect(() => {
        if(isClickAdd){
            FetchApiPost('services/Budget/AccSetting/UpdateAccountSubGroup', 'POST', {
                id: selectedValue.id,
                accountSubGroupName: accountSubGroupName.trim(),
                accountGroupId: selectedAccountGroup.value,
                modifiedBy: localStorage.getItem('userName')
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        const newData = filterData.map(item => {
                            if(item.id === data.id){
                                return data
                            }else{
                                return item
                            }
                        })
                        setFilterData(newData)
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