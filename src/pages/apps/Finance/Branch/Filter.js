import React from 'react'
import { useState } from 'react'
import Filters from '../../../../components/Filter';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Filter = ({
    isApply,
    setIsApply,
    isClear,
    setIsClear,
    isOpenFilter,
    setIsOpenFilter,
    data,
    setData
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
        }
    ]

    const apply = () => {
        setIsApply(false);
        const body = {
            countryIds  :   selectCountry?.map(data => data.value),
            bankIds     :   selectBank?.map(data => data.value)
        }
        if(selectCountry.length !== 0 && selectBank.length !== 0) {
            FetchApiPost('services/Finance/Branch/GetBranchListForApply','POST',body)
            .then(res => {
                if(res.status === 200) {
                    res.json().then(res => {
                        setData(res?.data?.map(data => {
                            return {
                                id:data.id,
                                branchCode:data.branchCode === null ? '-' :data.branchCode,
                                name:data.name,
                                bankName:data.bank?.name,
                                bankId:data.bank?.id,
                                adress:data.address === null ? '-' : data.address,
                                swift:data.bank?.swiftCode,
                                swiftId:data.bank?.id,
                                type:data.bank?.type?.name,
                                typeId:data.bank?.type?.id,
                                country:data.country === null ? '-' : data.country?.countryName ,
                                countryId:data.country?.countryId,
                                company:data.company === null ? '-' :data.company?.name,
                                companyId:data.company?.id,
                                city:data.city === null ? '-' :data.city?.name,
                                cityId:data.city === null ? 0 :data.city?.id
                            }
                        }))
                    })
                }
                else {
                    history.push('/error-500')
                }
              })
        }
    }

    /**clear filter */
    const clearFilter = () => {
        setIsClear(false);
        setSelectCountry([]);
        setSelectBank([]);
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