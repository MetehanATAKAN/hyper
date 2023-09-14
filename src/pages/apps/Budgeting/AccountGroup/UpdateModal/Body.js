import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { NewInput } from '../../../../../components/GlobalNew/Inputs'
import { FetchApiPost } from '../../../../../utils/http.helper'

const Body = ({ selectedValue, isClickAdd, setAddButtonDisableStatus, setIsShow, setFilterData, filterData, setIsClickAdd, setErrorModalMessage, setShowErrorModal }) => {
    const [accountGroupName, setAccountGroupName] = useState(selectedValue.accountGroupName)

    useEffect(() => {
      if(accountGroupName.trim().length > 0){
        setAddButtonDisableStatus(false);
      }else{
        setAddButtonDisableStatus(true);
      }
    }, [accountGroupName])

    useEffect(() => {
      if(isClickAdd){
        FetchApiPost('services/Budget/AccSetting/UpdateAccountGroup', 'POST', {
          id: selectedValue.id,
          accountGroupName: accountGroupName.trim(),
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
          }else{
            setIsClickAdd(false)
            setErrorModalMessage('Account group already exist')
            setShowErrorModal(true)
          }
        })
      }
    }, [isClickAdd])

    console.log(selectedValue)
  return (
    <div>
        <Row>
            <NewInput 
                label={'account group name'}
                value={accountGroupName}
                setValue={setAccountGroupName}
                width={"100%"}
                isStar={true}
                placeholder={'account group name'}
            />
        </Row>
    </div>
  )
}

export default Body