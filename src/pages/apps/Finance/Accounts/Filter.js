import React from 'react'
import { useState } from 'react'
import Filters from '../../../../components/Filter';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Filter = ({
    isApply,
    setIsApply,
    isOpenFilter,
    setIsOpenFilter,
    setData,
    setDataLoading,
    isClear,
    setIsClear
}) => {


    const history = useHistory();

    /**user empId */
    const userId = Number(localStorage.getItem('userEmpId'));
    
    /**country */
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState([]);

    /**bank */
    const [bank, setBank] = useState([]);
    const [selectBank, setSelectBank] = useState([]);

    /**branch */
    // const [branch, setBranch] = useState([]);
    // const [selectBranch, setSelectBranch] = useState([]);

    /**type */
    const [type, setType] = useState([]);
    const [selectType, setSelectType] = useState([]);

    const bankFilters = [
        {
            key: 'country',
            label: 'country',
            options: country,
            state: selectCountry,
            setState: setSelectCountry,
            type: 'multieselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'bank',
            label: 'bank',
            options: bank,
            state: selectBank,
            setState: setSelectBank,
            type: 'multieselect',
            maxSelect:false,
            maxSelectItem:false
        },
        // {
        //     key: 'branch',
        //     label: 'branch',
        //     options: branch,
        //     state: selectBranch,
        //     setState: setSelectBranch,
        //     type: 'multieselect',
        //     maxSelect:false,
        //     maxSelectItem:false
        // },
        {
            key: 'type',
            label: 'type',
            options: type,
            state: selectType,
            setState: setSelectType,
            type: 'multieselect',
            maxSelect:false,
            maxSelectItem:false
        }
    ]

    const apply = () => {
        setIsApply(false);
        setDataLoading(true);
        if(selectCountry.length !== 0 && selectBank.length !== 0 && selectType.length !==0) {
            const body = {
                countryIds: selectCountry?.map(data => data.value),
                bankIds: selectBank?.map(data => data.value),
                typeIds: selectType?.map(data => data.value)
            }
            FetchApiPost('services/Finance/Account/GetAccountForApply','POST',body)
            .then(res => {
                if(res.status === 200) {
                    setDataLoading(false);
                    res.json().then(res => {
                       setData(res?.data?.map(data => (
                        {
                            id:data.id,
                            accountName:data.accountName,
                            country:data.country?.countryName,
                            countryId:data.country?.countryId,
                            party:data.party?.name,
                            partyId:data.party?.id,
                            partyType:data.partyType?.name,
                            partyTypeId:data.partyType?.id,
                            type:data.type?.name,
                            typeId:data.type?.id,
                            name:data.branch.name !== null ? data.branch.name : '-'  ,
                            accountType:data.accountType.name,
                            accountTypeId:data.accountType.id,
                            accountSubType:data.accountSubType,
                            branchCode:data.branch?.branchCode,
                            branchCodeId:data.branch?.id,
                            accountNumber:data.accountNumber,
                            iban:data.iban,
                            currency:data.currency?.name,
                            currencyId:data.currency?.id,
                            accountPriority:data.accountPriority?.name,
                            accountPriorityId:data.accountPriority?.id,
                            isCompanyAccount:data.isCompanyAccount,
                            bankOrCaseName:data.branch?.bank?.name,
                            bankOrCaseNameId:data.branch?.bank?.id,
                            bank:data.branch?.bank?.name

                        }
                       )))
                    })
                }
                else {
                    history.push('/error-500')
                }
              })
        }
    }

    const clearFilter = () => {
        setSelectCountry([]);
        setSelectBank([]);
        setSelectType([]);
    }
    
    /**country */
    useEffect(() => {
      FetchApiGet(`api/OldSystem/GetAllCountriesList/${userId}`,'GET')
      .then(res => {
        if(res.status === 200) {
            res.json().then(res => {
                setCountry(res?.map(data => {
                    return {
                        value:data?.CountryId,
                        label:data?.CountryName
                    }
                }))
                setSelectCountry(res?.map(data => {
                    return {
                        value:data?.CountryId,
                        label:data?.CountryName
                    }
                }))
            })
        }
        else {
            history.push('/error-500')
        }
      })
    }, [history, userId])

     /**bank */
     useEffect(() => {
        FetchApiGet('services/Finance/Bank/GetAllBanks','GET')
        .then(res => {
          if(res.status === 200) {
              res.json().then(res => {
                  setBank(res?.data?.map(data => {
                      return {
                          value:data?.id,
                          label:data?.name
                      }
                  }))
                  setSelectBank(res?.data?.map(data => {
                      return {
                          value:data?.id,
                          label:data?.name
                      }
                  }))
              })
          }
          else {
              history.push('/error-500')
          }
        })
      }, [history])

      
      /**type */
     useEffect(() => {
        FetchApiGet('services/Finance/Account/GetAccountPartyType','GET')
        .then(res => {
          if(res.status === 200) {
              res.json().then(res => {
                  setType(res?.data?.map(data => {
                      return {
                          value:data?.id,
                          label:data?.name
                      }
                  }))
                  setSelectType(res?.data?.map(data => {
                      return {
                          value:data?.id,
                          label:data?.name
                      }
                  }))
              })
          }
          else {
              history.push('/error-500')
          }
        })
      }, [history])

    /**apply */
    useEffect(() => {
      isApply &&
      apply();
    }, [isApply])

      /**clear */
      useEffect(() => {
        isClear &&
        clearFilter();
      }, [isClear])
    
    
  return (
    <>
     
        
          <Filters
          filterComponentsData={bankFilters} 
          getAllFilterData={apply}
          isHandleChange={true}  
           />
        
    
    </>
  )
}

export default Filter