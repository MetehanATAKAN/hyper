import React, { useState , useEffect, useCallback } from 'react'
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch } from 'react-redux';
import { alsFilterActivityType, alsFilterBody, alsFilterBusinessProcess, alsFilterMainProcess, alsFilterProcess, alsFilterYear, alsGetAvtivityFilter } from '../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { MultiSelectLabels, MultiSelectReact } from '../../forms/Basic'

const ActivityLimitFilter = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    
    // Year
    const [year, setYear] = useState([
        // { value: 2021, label: "2021" },
        // { value: 2022, label: "2022" },
        // { value: 2023, label: "2023" },
    ]);
    const [selectYear, setSelectYear] = useState([]);


    useEffect(() => {
        
        FetchApiGet('services/Settings/ActivitySettings/GetActivitiesYears ','GET')
        .then(response=>response.json())
        .then(response=>{
            setYear(response.data.year.map(year=>(
                {value : year , label : year}
            )))

            setSelectYear (response.data.year.map(year=>(
                { value : year , label : year}
            )))
        })
        .catch(error=>console.log(error))
       }, [])


    // Activity Type
    const [activityType, setActivityType] = useState([]);
    const [selectActivityType, setSelectActivityType] = useState([]);


    useEffect(() => {
        
            const activityTypeBody = {
                Year: selectYear?.map(year => (year.value))
            }

            FetchApiPost('services/Settings/ActivitySettings/GetActivityTypesByYears', 'POST', activityTypeBody)
                .then(response => response.json())
                .then(response=>{

                    setActivityType(response.data.map(data=>(
                        { value: data.activityTypeId, label: data.activityTypeName }
                    )))

                    setSelectActivityType(response.data.map(data=>(
                        { value: data.activityTypeId, label: data.activityTypeName }
                    )))
                  
                })
                .catch(error => console.log(error))
              
    }, [selectYear])
    

    // Main Process
    const [mainProcess, setMainProcess] = useState([]);
    const [selectMainProcess, setSelectMainProcess] = useState([]);


    useEffect(() => {

        
            const mainProcessBody = {
                Year: selectYear?.map(year => (year.value)),
                ActivityTypeId: selectActivityType?.map(item => (item.value))
            }
            FetchApiPost('services/Settings/ActivitySettings/GetMainProcessByYearsAndActivityTypes', 'POST', mainProcessBody)
                .then(response => response.json())
                .then(response => {

                    setMainProcess(response.data.map(item=>(
                        {value : item.mainProcessId , label: item.mainProcessName}
                    )))

                    setSelectMainProcess(response.data.map(item=>(
                        {value : item.mainProcessId , label: item.mainProcessName}
                    )))

                })
                .catch(error => console.log(error))
        

    }, [selectActivityType, selectYear])
    

    // Business Process
    const [businessProcess, setBusinessProcess] = useState([]);
    const [selectBusinessProcess, setSelectBusinessProcess] = useState([]);

    useEffect(() => {
      
        const businessProcessBody = {
            Year                :   selectYear?.map(year => (year.value)),
            ActivityTypeId      :   selectActivityType?.map(item => (item.value)),
            MainProcessId       :   selectMainProcess?.map(item => (item.value))
        }

        FetchApiPost('services/Settings/ActivitySettings/GetBusinessProcessByYearsAndActivityTypesAndMainProcess','POST',businessProcessBody)
        .then(response=>response.json())
        .then(response=>{

            setBusinessProcess(response.data.map(item=>(
                {value : item.businessProcessId , label : item.businessProcessName}
            )))

            setSelectBusinessProcess(response.data.map(item=>(
                {value : item.businessProcessId , label : item.businessProcessName}
            )))
           
        })
        .catch(error=>console.log(error))
    }, [selectActivityType, selectMainProcess, selectYear])
    

    // Process
    const [process, setProcess] = useState([
        { value: 'metehan', label: 'metehan' },
        { value: 'metehan', label: 'metehan' },
    ]);
    const [selectProcess, setSelectProcess] = useState([]);

    useEffect(() => {
      const processBody = {
            Year                    :   selectYear?.map(year => (year.value)),
            ActivityTypeId          :   selectActivityType?.map(item => (item.value)),
            MainProcessId           :   selectMainProcess?.map(item => (item.value)),
            BusinessProcessId       :   selectBusinessProcess?.map(item=>(item.value))
      }

      FetchApiPost('services/Settings/ActivitySettings/GetProcessByYearsAndActivityTypesAndMainProcessAndBusinessProcess','POST',processBody)
      .then(response=>response.json())
      .then(response=>{

        setProcess(response.data.map(item=>(
            { value : item.processId , label : item.processName}
        )))

        setSelectProcess(response.data.map(item=>(
            { value : item.processId , label : item.processName}
        )))
      })
      .catch(error=>console.log(error))
    }, [selectActivityType, selectBusinessProcess, selectMainProcess, selectYear])
    

  
    const selectItem =  [
        { options: year, change: setSelectYear, isHeaderName: false, headerName: 'Year', value: selectYear },
        { options: activityType, change: setSelectActivityType, isHeaderName: false, headerName: 'Activity Type', value: selectActivityType },
        { options: mainProcess, change: setSelectMainProcess, isHeaderName: false, headerName: 'Main Process', value: selectMainProcess },
        { options: businessProcess, change: setSelectBusinessProcess, isHeaderName: false, headerName: 'Business Process', value: selectBusinessProcess },
        { options: process, change: setSelectProcess, isHeaderName: false, headerName: 'Process', value: selectProcess },
    ]

    const applyActivityFilter = () => {
        
        const activityFilterBody = {
            Year                    :   selectYear.map(item => item.label),
            ActivityTypeId          :   selectActivityType.map(item => item.value),
            MainProcessId           :   selectMainProcess.map(item => item.value),
            BusinessProcessId       :   selectBusinessProcess.map(item => item.value),
            ProcessId               :   selectProcess.map(item => item.value)
        }
        
        dispatch(alsFilterBody(activityFilterBody))

        FetchApiPost('services/Settings/ActivitySettings/GetActivityFilter', 'POST', activityFilterBody)
            .then(response => response.json())
            .then(response => dispatch(alsGetAvtivityFilter(response.data)))
            .catch(error => console.log(error))
    }


    useEffect(() => {

     dispatch(alsFilterYear(selectYear))
     dispatch(alsFilterActivityType(selectActivityType))
     dispatch(alsFilterMainProcess(selectMainProcess))
     dispatch(alsFilterBusinessProcess(selectBusinessProcess))
     dispatch(alsFilterProcess(selectProcess))
     
    }, [dispatch, selectActivityType, selectBusinessProcess, selectMainProcess, selectProcess, selectYear])
    
    
    
    return (
        <>
        <div className='als-multiselect mt-2'>
            {
                selectItem.map((item, index) => (
                    <div className='als-multiselect-item'>
                        <MultiSelectReact
                            options={item.options}
                            change={(e) => item.change(e)}
                            value={item.value}
                            placeholder={item.headerName}
                        />
                    </div>
                ))
            }
        </div>

        <div className='als-multiselect-button text-end mt-2 mb-2'>
            <Button variant='light'>{t('cancel')}</Button>
            <Button className='ms-1' variant='primary' onClick={applyActivityFilter} >{t('apply')}</Button>
        </div>
        </>
    )
}

export default ActivityLimitFilter