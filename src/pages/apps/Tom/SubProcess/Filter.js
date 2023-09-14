import React, { useEffect, useState } from 'react'
import Filters from '../../../../components/Filter';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

const Filter = ({
    isApply,
    setIsApply,
    setTableLoading,
    setTableData
}) => {

    const history = useHistory();

    /**activity type */
   const [activityType, setActivityType] = useState([]);
   const [selectActivityType, setSelectActivityType] = useState([]);

    /**process */
    const [process, setProcess] = useState([]);
    const [selectProcess, setSelectProcess] = useState([]);

    /**sub process */
    const [subProcess, setSubProcess] = useState([]);
    const [selectSubProcess, setSelectSubProcess] = useState([]);

    /**mix type */
    const [mixType, setMixType] = useState([
        {
            value:1,
            label:'Product'
        },
        {
            value:2,
            label:'Position'
        },
        {
            value:3,
            label:'Employee'
        },
        {
            value:4,
            label:'Process'
        },
    ]);
    const [selectMixType, setSelectMixType] = useState([
        {
            value:1,
            label:'Product'
        },
        {
            value:2,
            label:'Position'
        },
        {
            value:3,
            label:'Employee'
        },
        {
            value:4,
            label:'Process'
        },
    ]);

    /**status */
    const [status, setStatus] = useState([
        {
            value:1,
            label:'Redact'
        }
    ]);
    const [selectStatus, setSelectStatus] = useState([
        {
            value:1,
            label:'Redact'
        }
    ]);

    const filter = [
        {
            key: 'activityType',
            label: 'activity type',
            options: activityType,
            state: selectActivityType,
            setState: setSelectActivityType,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'process',
            label: 'process',
            options: process,
            state: selectProcess,
            setState: setSelectProcess,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'mixType',
            label: 'mix type',
            options: mixType,
            state: selectMixType,
            setState: setSelectMixType,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'status',
            label: 'status',
            options: status,
            state: selectStatus,
            setState: setSelectStatus,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false
        },
    ]

    const apply = () => {
        setIsApply(false);
        setTableLoading(true);
        if (selectActivityType.length > 0 &&
            selectProcess.length > 0 &&
            selectStatus.length > 0 &&
            selectMixType.length > 0
        ) {
            const body = {
                activityTypeIds: selectActivityType?.map(data => data.value),
                processIds: selectProcess?.map(data => data.value),
                statusIds: selectStatus?.map(data => data.value),
                mixTypes: selectMixType?.map(data => data.label)
            }
            FetchApiPost('services/TaskManagement/SubProcess/GetNewSubProcessForApply', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setTableLoading(false);
                                res.json().then(el => {
                                    setTableData(el.data.map(data => (
                                        {
                                            id:data.id,
                                            subProcessId:data.subId,
                                            subProcessName:data.name,
                                            day:data.approverExpectedDay,
                                            activityType:data.activityType.title,
                                            mixType:data.subProcessMixType,
                                            process:'-', //processes
                                            status:data.approveStatus === 1 && 'Redact'
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                setTableLoading(false);
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }

    const clearFilter = () => {
        console.log('clear filter da');
    }
    /**activity type */
    useEffect(() => {

        FetchApiGet('services/TaskManagement/ActivityType/GetAllActivityTypes', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            ;
                            res.json().then(el => {
                                setActivityType(el.data?.map(data => (
                                    {
                                        value: data.id,
                                        label: data.title
                                    }
                                )))
                                setSelectActivityType(el.data?.map(data => (
                                    {
                                        value: data.id,
                                        label: data.title
                                    }
                                )))
                            })

                        }
                        else if (res.status === 500 || res.status === 499) {

                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )

    }, [history])

    /**process */
    useEffect(() => {

        FetchApiGet('services/TaskManagement/ParentProcess/GetAllParentProcess', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            ;
                            res.json().then(el => {
                                setProcess(el.data?.map(data => (
                                    {
                                        value: data.id,
                                        label: data.title
                                    }
                                )))
                                setSelectProcess(el.data?.map(data => (
                                    {
                                        value: data.id,
                                        label: data.title
                                    }
                                )))
                            })

                        }
                        else if (res.status === 500 || res.status === 499) {

                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )

    }, [history])

    /**apply */
    useEffect(() => {
      isApply &&(
        apply()
      )
    }, [isApply])
    
  return (
    <div>
        <Filters
        filterComponentsData={filter}
        />
    </div>
  )
}

export default Filter