import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { NewInput } from '../../../../../components/GlobalNew/Inputs'
import { FetchApiPost } from '../../../../../utils/http.helper';

const Body = ({ isClickAdd, setAddButtonDisableStatus, setFilterData, setIsShow, setIsClickAdd, setErrorModalMessage, setShowErrorModal }) => {
    const [accountGroupName, setAccountGroupName] = useState('')

    useEffect(() => {
      if(isClickAdd){
        FetchApiPost('services/Budget/AccSetting/CreateAccountGroup', 'POST', {
          accountGroupName: accountGroupName.trim(),
          createdBy: localStorage.getItem('userName')
        })
          .then(res => {
            if(res.status === 200){
              res.json().then(data => {
                setFilterData(prev => [...prev, data.data])
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

    useEffect(() => {
      if(accountGroupName.trim().length > 0){
        setAddButtonDisableStatus(false);
      }else{
        setAddButtonDisableStatus(true);
      }
    }, [accountGroupName])

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