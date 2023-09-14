import React, { useEffect, useState } from 'react';
import Filter from '../../../../components/Filter';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { filterData } from '../../../../redux/promoCampaing/actions';

const Filters = ({
    tableData,
    setTableData,
    loading,
    setLoading,
    isClear,
    setIsClear,
    isApply,
    setIsApply
}) => {

    const history = useHistory();

    const dispatch = useDispatch();
  
    const empId = Number(localStorage.getItem('userEmpId'));

    const [selectYear, setSelectYear] = useState();
    const [selectCompany, setSelectCompany] = useState();
    const [selectCountry, setSelectCountry] = useState();
    const [selectBusUnit, setSelectBusUnit] = useState();
    const [selectZone, setSelectZone] = useState([]);
    const [optionsYear, setOptionsYear] = useState();
    const [optionsCompany, setOptionsCompany] = useState();
    const [optionsCountry, setOptionsCountry] = useState();
    const [optionsBusUnit, setOptionsBusUnit] = useState();
    const [optionsZone, setOptionsZone] = useState([]);
    const filterComponentsData = [
        {
            label: 'year',
            options: optionsYear,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
        },
        {
            label: 'country',
            options: optionsCountry,
            state: selectCountry,
            setState: setSelectCountry,
            type: 'singleselect',
        },
        {
            label: 'company',
            options: optionsCompany,
            state: selectCompany,
            setState: setSelectCompany,
            type: 'singleselect',
        },
        {
            label: 'business unit',
            options: optionsBusUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
        },
        {
            label: 'zone',
            options: optionsZone,
            state: selectZone,
            setState: setSelectZone,
            type: 'multiselect',
        },
    ];

    const applyFilter = () => {
        setIsApply(false);
        setLoading(true);

        const body = {
            employeeId  :   empId,
            yearId      :   selectYear?.value,
            companyId   :   selectCompany?.value,
            countryId   :   selectCountry?.value,
            businessUnitId  :   selectBusUnit?.value,
            zoneIds     :   selectZone?.map(data => data.value)
        }

        FetchApiPost('services/Organization/Organization/ZoneCampaignCalendar/GetZoneCampaignCalendar','POST',body)
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                console.log('burada',res.status);
                setLoading(false);
                res.json().then((data) => {
                   setTableData(data.data?.map(item => (
                    {
                        id:item.mainRowId,
                        name:item.mainRowName,
                        rowId:item.rowId,
                        subRows:item.rows?.map(el =>(
                            {
                                id:el.rowId,
                                name:el.rowName,
                                rowId:el.rowId,
                                spec:false,
                                isColorful:el.rowId !== 0 ? true : false,
                                category:false,
                                subRows:el.specDetail?.map(spec => (
                                    {
                                        id:spec.specId,
                                        name:spec.specName,
                                        rowId:spec.rowId,
                                        subRows:spec.newClientResearchDetail?.map(client => (
                                            {
                                                id:client.rowId,
                                                name:client.rowName,
                                                rowId:client.rowId,
                                                subRows:client.categoryDetail?.map(cat => (
                                                    {
                                                        id:cat.categoryId,
                                                        name:cat.categoryName,
                                                        rowId:cat.rowId,
                                                        subRows:cat.detail?.map(det =>(
                                                            {
                                                                id: det.rowId,
                                                                rowId:det.rowId,
                                                                name: det.rowName,
                                                                Jan: det.monthValues[0],
                                                                Feb: det.monthValues[1],
                                                                Mar: det.monthValues[2],
                                                                Apr: det.monthValues[3],
                                                                May: det.monthValues[4],
                                                                Jun: det.monthValues[5],
                                                                Jul: det.monthValues[6],
                                                                Aug: det.monthValues[7],
                                                                Sep: det.monthValues[8],
                                                                Oct: det.monthValues[9],
                                                                Nov: det.monthValues[10],
                                                                Dec: det.monthValues[11],
                                                            }
                                                        ))
                                                    }
                                                ))
                                            }
                                        ))
                                    }
                                ))
                            }
                        ))
                    }
                   )))
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }

    /**Filter Clear */
    const clearFilter = () => {
        setIsClear(false);
        setSelectYear();

        setSelectCountry();

        setOptionsCompany([]);
        setSelectCompany();

        setOptionsBusUnit([]);
        setSelectBusUnit();

        setOptionsZone([]);
        setSelectZone([]);
    }
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectYear({ value: new Date().getFullYear(), label: String(new Date().getFullYear()) });
                    setOptionsYear(data?.map((x) => ({ value: x.Id, label: x.Val1 })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });

        FetchApiGet(`api/OldSystem/GetAllCountriesList/${empId}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectCountry({ value: data[0].CountryId, label: data[0].CountryName });
                    setOptionsCountry(data?.map((x) => ({ value: x.CountryId, label: x.CountryName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    useEffect(() => {
        if (!selectCountry) return;
        FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${selectCountry.value}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectCompany({ value: data[0].CompanyId, label: data[0].CompanyName });
                    setOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectCountry]);

    useEffect(() => {
        if (!selectCompany || !selectYear) return;
        const postData = {
            CompanyId: selectCompany.value,
            Year: selectYear.value,
        };
        FetchApiPost('api/OldSystem/GetBusinessUnitCampaign', 'POST', postData).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 0) {
                        return setSelectBusUnit([]), setOptionsBusUnit([]);
                    }
                    setSelectBusUnit({ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName });
                    setOptionsBusUnit(data?.map((x) => ({ value: x.BusinessUnitId, label: x.BusinessUnitName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectCompany, selectYear]);

    useEffect(() => {
      if(!selectBusUnit || !selectCountry) return;
      const body = {
        busId:selectBusUnit?.value,
        countryId:selectCountry?.value,
        empId:empId
      }

      FetchApiPost('api/OldSystem/GetZoneByBusinessUnitAndCompanyId','POST',body)
      .then((res) => {
        if (res.status === 200 || 201) {
            res.json().then((data) => {
              setOptionsZone(data?.map(item =>(
                {
                    value:item.Id,
                    label:item.Name
                }
              )))
              setSelectZone(data?.map(item =>(
                {
                    value:item.Id,
                    label:item.Name
                }
              )))
            });
        }
        if (res.status === 500 || res.status === 502) {
            history.push('/error-500');
        }
    });
    }, [empId, history, selectBusUnit, selectCountry])

    /**Redux Filter Data */
    useEffect(() => {
     dispatch(filterData(
        {
            selectYear:selectYear ? selectYear : null,
            selectCountry: selectCountry ? selectCountry : null,
            selectCompany : selectCompany ? selectCompany : null,
            selectBusinessUnite : selectBusUnit ? selectBusUnit : null,
            selectZone : selectZone ? selectZone?.map(data => data) : null,
            year:optionsYear ? optionsYear : [],
            country:optionsCountry ? optionsCountry : [],
            company : optionsCompany ? optionsCompany : [],
            businessUnite : optionsBusUnit ? optionsBusUnit : [],
            zone : optionsZone ? optionsZone : []
        }
     ))
    }, [dispatch, optionsBusUnit, optionsCompany, optionsCountry, optionsYear, optionsZone, selectBusUnit, selectCompany, selectCountry, selectYear, selectZone])
    
    /**Clear */
    useEffect(() => {
     isClear && clearFilter();
    }, [isClear])

    /**Apply */
    useEffect(() => {
        isApply && applyFilter();
       }, [isApply])
    

    return <Filter filterComponentsData={filterComponentsData} getAllFilterData={applyFilter}   />;
};

export default Filters;
