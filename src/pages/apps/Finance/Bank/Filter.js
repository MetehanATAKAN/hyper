import React from 'react'
import { useState } from 'react'
import Filters from '../../../../components/Filter';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Filter = ({
    isApply,
    setIsApply
}) => {


    const history = useHistory();

    /**user empId */
    const userId = Number(localStorage.getItem('userEmpId'));
    
    /**country */
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState([]);

    const [isOpenFilter, setIsOpenFilter] = useState(true);

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
        }
    ]

    const apply = () => {
        setIsApply(false);
        const body = {
            countryIds  :   selectCountry?.map(data => data.value)
        }
        FetchApiPost('services/Finance/Bank/GetBanksForApply','POST',body)
        .then(res => {
            if(res.status === 200) {
                // res.json().then(res => {
                //     setCountry(res?.map(data => {
                //         return {
                //             value:data?.CountryId,
                //             label:data?.CountryName
                //         }
                //     }))
                //     setSelectCountry(res?.map(data => {
                //         return {
                //             value:data?.CountryId,
                //             label:data?.CountryName
                //         }
                //     }))
                // })
            }
            else {
                history.push('/error-500')
            }
          })
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

    /**apply */
    useEffect(() => {
      isApply &&
      apply();
    }, [isApply])
    
    
  return (
    <>
     {
        isOpenFilter &&
        
          <Filters
          filterComponentsData={bankFilters} 
          getAllFilterData={apply}
          isHandleChange={true}   
           />
        
    }
    </>
  )
}

export default Filter