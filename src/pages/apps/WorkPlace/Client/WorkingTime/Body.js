import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';

const Body = ({ setAddButtonDisableStatus, isClickAdd, selectedItem, getFilterData, setIsClickAdd, setShow }) => {
    const { t } = useTranslation();

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();

    const [preferredTimes, setPrefferredTimes] = useState([]);
    const [workingTimes, setWorkingTimes] = useState([]);

    const [loader, setLoader] = useState(false);

    const [hasData, setHasData] = useState(false);
    const [workingTimeStatus, setWorkingTimeStatus] = useState(false);

    const [days, setDays] = useState([
        {
            day: 'Monday',
            dayId: 0,
            startTime: undefined,
            endTime: undefined,
            endTimeRange: [],
            startTimeRange: [],
            copyDay: []
        },
        {
            day: 'Tuesday',
            dayId: 1,
            startTime: undefined,
            endTime: undefined,
            endTimeRange: [],
            startTimeRange: [],
            copyDay: []
        },
        {
            day: 'Wednesday',
            dayId: 2,
            startTime: undefined,
            endTime: undefined,
            endTimeRange: [],
            startTimeRange: [],
            copyDay: []
        },
        {
            day: 'Thursday',
            dayId: 3,
            startTime: undefined,
            endTime: undefined,
            endTimeRange: [],
            startTimeRange: [],
            copyDay: []
        },
        {
            day: 'Friday',
            dayId: 4,
            startTime: undefined,
            endTime: undefined,
            endTimeRange: [],
            startTimeRange: [],
            copyDay: []
        },
        {
            day: 'Saturday',
            dayId: 5,
            startTime: undefined,
            endTime: undefined,
            endTimeRange: [],
            startTimeRange: [],
            copyDay: []
        },
        {
            day: 'Sunday',
            dayId: 6,
            startTime: undefined,
            endTime: undefined,
            endTimeRange: [],
            startTimeRange: [],
            copyDay: []
        },
    ]);

    const [times, setTimes] = useState([
        '09:00',
        '09:15',
        '09:30',
        '09:45',
        '10:00',
        '10:15',
        '10:30',
        '10:45',
        '11:00',
        '11:15',
        '11:30',
        '11:45',
        '12:00',
        '12:15',
        '12:30',
        '12:45',
        '13:00',
        '13:15',
        '13:30',
        '13:45',
        '14:00',
        '14:15',
        '14:30',
        '14:45',
        '15:00',
        '15:15',
        '15:30',
        '15:45',
        '16:00',
        '16:15',
        '16:30',
        '16:45',
        '17:00',
        '17:15',
        '17:30',
        '17:45',
        '18:00',
    ]);

    useEffect(() => {
        if(preferredTimes){
            let allDataStatus = false;
            days.map(d => {
                if(d.startTimeRange.length > 0 && d.endTime === undefined){
                    allDataStatus = true
                }
            })

            setAddButtonDisableStatus(allDataStatus)

        }
    }, [preferredTimes, days])

    useEffect(() => {
        if(isClickAdd){

            let resultDay = [];
            days.map(d => {
                if(d.startTimeRange.length > 0){
                    resultDay.push({
                        dayId: d.dayId,
                        startTime: d.startTime.label,
                        endTime: d.endTime.label
                    })

                    if(d.copyDay.length > 0){
                        d.copyDay.map(c => {
                            if(c.endTime){
                                resultDay.push({
                                    dayId: d.dayId,
                                    startTime: c.startTime.label,
                                    endTime: c.endTime.label
                                })
                            }
                        })
                    }
                }
            })

         
            FetchApiPost("services/CRM/Client/CreateClientAvailableTime", 'POST', {
                clientCategoryId: selectedItem.workPlace.clientCategoryId,
                availableTimes: [...resultDay],
                createdBy: localStorage.getItem('userName')
            }).then(res => {
                if(res.status === 201 || res.status === 200){
                    setShow(false)
                }
                setIsClickAdd(false)
            })
            
        }
    }, [isClickAdd])
    
    useEffect(() => {
        try{
            let d = new Date(year, month, day, days[0].startTime.label.slice(0,2), days[0].startTime.label.slice(3,5))
            console.log(d)
        }catch(err){

        }
    }, [days])

    useEffect(() => {
        if(preferredTimes.length === 0) return;
        setLoader(true)
        FetchApiPost('services/CRM/Client/GetClientAvailableTime', 'POST', {
            workPlaceId: selectedItem.workPlace.id,
            clientId: selectedItem.client.id
        }).then(res => {
            if(res.status === 200 || res.status === 201){
                setLoader(false);
                setWorkingTimeStatus(true)
                res.json().then(({ data }) => {
                    // let newData = [...data, {dayId: 3, startTime: "11:15", endTime: "11:45"}]
                    setWorkingTimes(data);
                })
            }
        })
            // .then(res)
    }, [preferredTimes])

    // useEffect(() => {
    //     if(workingTimeStatus === true && workingTimes.length > 0){
    //         // range leri ayarlarken preferred time dan yararlanmam gerekiyor
    //         const newDays = days.map((day, i) => {
    //             let wT = [...workingTimes,{dayId: 1, startTime: '10:15', endTime: '10:45'} ]
    //             let count = wT.filter(wT => day?.dayId === wT?.dayId)
    //             // console.log("kjnbsfajknsfajkn", workingTimes.filter(wT => day?.dayId === wT?.dayId))
    //             if(count.length === 0){
    //                 return day
    //             }else if(count.length === 1){
    //                 let startTimeIndex = times.findIndex(i => i === workingTimes[0].startTime)
    //                 let endTimeIndex = times.findIndex(i => i === workingTimes[0].endTime) + 1
    //                 let startTimeRange = times.slice(startTimeIndex, endTimeIndex)

    //                 let startTimeIndexforEndTime = startTimeRange.findIndex(i => i === workingTimes[0].startTime)
                    
    //                 return {
    //                     ...day,
    //                     startTimeRange: startTimeRange,
    //                     startTime: workingTimes[0].startTime,
    //                     endTime: workingTimes[0].endTime,
    //                     endTimeRange: startTimeRange.slice(startTimeIndexforEndTime + 1)
    //                 }
    //             }else{
                    

                    

    //                 let mainDay;
    //                 let copyDays = []
    //                 count.map((allTime, aTIndex) => {
    //                     let startTimeIndex = times.findIndex(i => i === workingTimes[aTIndex].startTime)
    //                     let endTimeIndex = times.findIndex(i => i === workingTimes[aTIndex].endTime) + 1
    //                     let startTimeRange = times.slice(startTimeIndex, endTimeIndex)

    //                     let startTimeIndexforEndTime = startTimeRange.findIndex(i => i === workingTimes[aTIndex].startTime)

    //                     if(aTIndex === 0){
    //                         mainDay = {
    //                             ...day,
    //                             startTime: {label: allTime.startTime, value: aTIndex},
    //                             endTime: {label: allTime.endTime, value: aTIndex},
    //                             startTimeRange: startTimeRange,
    //                             endTimeRange: startTimeRange.slice(startTimeIndexforEndTime + 1)
    //                         }
    //                         // {
    //                         //     day: 'Friday',
    //                         //     dayId: 4,
    //                         //     startTime: undefined,
    //                         //     endTime: undefined,
    //                         //     endTimeRange: [],
    //                         //     startTimeRange: [],
    //                         //     copyDay: []
    //                         // },
    //                     }else{
    //                         copyDays.push({
    //                             startTime: {label: allTime.startTime, value: aTIndex},
    //                             endTime: {label: allTime.endTime, value: aTIndex},
    //                             startTimeRange: startTimeRange,
    //                             endTimeRange: startTimeRange.slice(startTimeIndexforEndTime + 1)
    //                         })
    //                     }
    //                 })

    //                 console.log("maindAY", mainDay)
    //                 console.log("copya", copyDays)
               
                    

    //             }
    //         })

    //     }
    // }, [workingTimeStatus, workingTimes])

    // useEffect(() => {
    //     if(workingTimeStatus && workingTimes.length > 0 && preferredTimes.length > 0){
    //         console.log("workingTimes",workingTimes)
    //         let resultDays = [];
    //         workingTimes.map((time, index) => {
    //             if(resultDays.find(i => i.dayId === time.dayId) === undefined){
    //                 // const startTime = preferredTimes.find(i => i.dayId === time.dayId).startTime;
    //                 // const startTimeForEndTimeIndex = times.findIndex(i => i === time.startTime)
    //                 // const endTime = time.endTime;
    //                 // let startTimeIndex = times.findIndex(i => i === startTime)
    //                 // let endTimeIndex = times.findIndex(i => i === endTime) + 1;
    //                 // const startTimeRange = times.slice(startTimeIndex, endTimeIndex - 1)
    //                 // const endTimeRange = times.slice(startTimeForEndTimeIndex, endTimeIndex)
    //                 // console.log("endTimeRangeendTimeRange",endTimeRange, startTimeIndex, endTimeIndex)

    //                 const selectedStartTime = time.startTime;
    //                 const selectedEndTime = time.endTime;

    //                 const startTimeIndexForStartTime = times.findIndex(i => i === preferredTimes.find(i => i.dayId === time.dayId).startTime);
    //                 const endTimeIndexForEndTime = times.findIndex(i => i === preferredTimes.find(i => i.dayId === time.dayId).endTime);
    //                 const startTimeRange = times.slice(startTimeIndexForStartTime, endTimeIndexForEndTime);
    //                 console.log("startTimeIndexForStartTime",startTimeIndexForStartTime)
    //                 const endTimeRange = times.slice(times.findIndex(i => i === selectedStartTime), endTimeIndexForEndTime)

    //                 let day = days.find(i => i.dayId === time.dayId);
    //                 resultDays.push({
    //                     ...day,
    //                     startTime: { value: startTimeRange.findIndex(i => i === selectedStartTime ), label: time.startTime },
    //                     startTimeRange: startTimeRange,
    //                     endTime: { value: endTimeRange.findIndex(i => i === selectedEndTime ), label: time.endTime },
    //                     endTimeRange: endTimeRange
    //                 })

    //                 console.log("resultDaysresultDays",resultDays)
    //             }
    //         })
    //     }
    // }, [workingTimeStatus, workingTimes, preferredTimes])

    useEffect(() => {
        if(workingTimeStatus && workingTimes.length > 0 && preferredTimes.length > 0){
            let newDays = days.map((day, dayIndex) => {
                let hours = workingTimes.filter(t => t.dayId === day.dayId)
                
                if(hours.length === 0){
                    return day
                }else if(hours.length === 1){
                    const selectedStartTime = hours[0].startTime;
                    const selectedEndTime = hours[0].endTime;
                   
                    const startRangeIndex = times.findIndex(t => t === preferredTimes.find(i => i.dayId === hours[0].dayId).startTime);
                    const endRangeIndex = times.findIndex(t => t === preferredTimes.find(i => i.dayId === hours[0].dayId).endTime);

                    const startTimeRange = times.slice(startRangeIndex, endRangeIndex)

                    const startIndexForEndTime = times.findIndex(t => t === selectedStartTime)
                    const endTimeRange = times.slice(startIndexForEndTime + 1, endRangeIndex + 1)
        
                    return {
                        ...day,
                        startTime: { value: startTimeRange.findIndex(t => t === selectedStartTime), label: selectedStartTime },
                        endTime: { value: endTimeRange.findIndex(t => t === selectedEndTime), label: selectedEndTime },
                        startTimeRange: startTimeRange,
                        endTimeRange: endTimeRange
                    }
                }else{
                    let mainDay;
                    let copyDays = [];
                    
                    for(let i=0; i < hours.length; i++){
                        if(i === 0){
                            const selectedStartTime = hours[i].startTime;
                            const selectedEndTime = hours[i].endTime;

                            const startRangeIndex = times.findIndex(t => t === preferredTimes.find(p => p.dayId === hours[0].dayId).startTime);
                            const endRangeIndex = times.findIndex(t => t === preferredTimes.find(p => p.dayId === hours[0].dayId).endTime);

                            const startTimeRange = times.slice(startRangeIndex, endRangeIndex + 1)

                            const startIndexForEndTime = times.findIndex(t => t === selectedStartTime)
                            const endTimeRange = times.slice(startIndexForEndTime + 1, endRangeIndex + 1)

                             mainDay = {
                                ...day,
                                startTime: { value: startTimeRange.findIndex(t => t === selectedStartTime), label: selectedStartTime },
                                endTime: { value: endTimeRange.findIndex(t => t === selectedEndTime), label: selectedEndTime },
                                startTimeRange: startTimeRange,
                                endTimeRange: endTimeRange
                            }
                        }else if(i > 0){
                            
                            const selectedStartTime = hours[i].startTime;
                            const selectedEndTime = hours[i].endTime;
                          
                            const startRangeIndex = times.findIndex(t => t === hours[i-1].endTime) + 1;
                            const endRangeIndex = times.findIndex(t => t === preferredTimes.find(p => p.dayId === hours[i].dayId).endTime);
                            
                            const startTimeRange = times.slice(startRangeIndex, endRangeIndex + 1)

                            const startIndexForEndTime = times.findIndex(t => t === selectedStartTime)
                            const endTimeRange = times.slice(startIndexForEndTime + 1, endRangeIndex + 1)

                              copyDays.push({
                                startTime: { value: startTimeRange.findIndex(t => t === selectedStartTime), label: selectedStartTime },
                                endTime: { value: endTimeRange.findIndex(t => t === selectedEndTime), label: selectedEndTime },
                                startTimeRange: startTimeRange,
                                endTimeRange: endTimeRange
                            })
                        }
                    }
                 
                    return {
                        ...mainDay,
                        copyDay: copyDays
                    }
                }
            })

            setDays(newDays)
        }
    }, [workingTimeStatus, workingTimes, preferredTimes])

    useEffect(() => {
        setLoader(true)
        FetchApiPost('services/CRM/Client/GetClientPreferredTime', 'POST', {
            workPlaceId: selectedItem.workPlace.id,
            clientId: selectedItem.client.id
        }).then(res => {
            if(res.status === 200 || res.status === 201){
                res.json().then(({ data }) => {
                    setPrefferredTimes(data)
                    setLoader(false)
                })
            }
        })
    }, [])

    useEffect(() => {
        if(workingTimeStatus){
            if(workingTimes.length === 0){
                // let newDays = [];
                let newDays = days.map(day => {
                    let d = preferredTimes.find(i => i.dayId === day.dayId);
        
                    
                    if(d){
                        let startTimeIndex = times.findIndex(i => i === d.startTime)
                        let endTimeIndex = times.findIndex(i => i === d.endTime) + 1
                        let startTimeRange = times.slice(startTimeIndex, endTimeIndex)
                        return{
                            ...day,
                            // endTime: d.endTime,
                            endTimeRange: [],
                            startTimeRange: startTimeRange
                        }
                    }else{
                        return day
                    }
                })
                
                setDays(newDays)

            }else{
                
            }
        }
    }, [workingTimeStatus])

    const handleCheck = (checked, index) => {
        let newDays = days;
        newDays[index].isChecked = checked;
        setDays([...newDays]);
    };

    const handleChangeTime = (value, item, index) => {
        let startTime = value.label;
        let endTime = '18:00';

        let endTimeRange = times.filter((time) => time >= startTime && time <= endTime && time !== startTime);

        let newDays = [...days];
        newDays[index].startTime = value;
        newDays[index].endTimeRange = endTimeRange;
        newDays[index].endTime = undefined;
        setDays(newDays);
    };

    const handleChangeEndTime = (value, index) => {
        let newDays = [...days];
        newDays[index].endTime = value;
        setDays(newDays);
    };

    // useEffect(() => {
    //     let checkCount = 0;
    //     let startCount = 0;
    //     let endCount = 0;
    //     days.map((item) => {
    //         if (item.isChecked) checkCount++;
    //         if (item.startTime) startCount++;
    //         if (item.endTime) endCount++;
    //     });

    //     if(checkCount !== 0 && (checkCount === startCount && checkCount === endCount)) setAddButtonDisableStatus(false);
    //     else setAddButtonDisableStatus(true);
    // }, [days]);

    useEffect(() => {
        if(!isClickAdd) return;

        const body = {
            clientCategoryId: 1
        }
    }, [isClickAdd])

    const addButtonStyle = {
        width: 'fit-content',
        height: 'auto',
        border: 'none',
        padding: '0',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'transparent'
    };

    const addDeleteButtonStyle = {
        width: 'fit-content',
        height: '32px',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0',
        display: 'grid',
        placeItems: 'center',
    };

    const addCopyData = (item) => {
        let newArray = days.map(d => {
            if(d.day === item.day){
                if(d.copyDay.length === 0){
                    let endTimeIndex = d.startTimeRange.findIndex(i => i === d.endTime.label);
                    
                    return {
                        ...d,
                        copyDay: [{
                            day: d.day,
                            startTime: undefined,
                            endTime: undefined,
                            endTimeRange: [],
                            startTimeRange: d.startTimeRange.slice(endTimeIndex + 1)
                        }]
                    }
                }else{
                    let endTimeIndex = d.copyDay[d.copyDay.length-1].endTimeRange.findIndex(i => i === d.copyDay[d.copyDay.length-1].endTime.label);
                    return {
                        ...d,
                        copyDay: [...d.copyDay, {
                            day: d.day,
                            startTime: undefined,
                            endTime: undefined,
                            endTimeRange: [],
                            startTimeRange: d.copyDay[d.copyDay.length-1].endTimeRange.slice(endTimeIndex + 1)
                        }]
                    }
                }
                
            }else{
                return d
            }
        })
        setDays(newArray)
    }


    const deleteCopyData = (copyItem, index) => {
        let newArray = days.map(d => {
            if(d.day === copyItem.day){
                let newCopyData = d.copyDay.map((c, cIndex) => {
                    if(cIndex !== index){
                        return c
                    }
                })
                return{
                    ...d,
                    copyDay: [...newCopyData]
                }
            }else{
                return d
            }
        })
        let a = newArray.map(n => {
            let cc = n.copyDay.filter(f => f !== undefined)
            return {
                ...n,
                copyDay: cc
            }
        })
        setDays(a);

    }

    const handleChange = (value, label, index, type) => {
        
        if(type === "startTime"){

            if(label === undefined){
                let newDays = days.map((item, i) => {
                    if(index === i){
                        return {
                            ...item,
                            startTime: undefined,
                            endTime: undefined,
                            endTimeRange: [],
                            copyDay: []
                        }
                    }else{
                        return item
                    }
                })
                return setDays(newDays);
            }

            let newDays = days.map((item, i) => {
                if(index === i){
                    let startTimeIndex = item.startTimeRange.findIndex(i => i === label.label)
                    return {
                        ...item,
                        startTime: label,
                        endTime: undefined,
                        endTimeRange: item.startTimeRange.slice(startTimeIndex + 1),
                        copyDay: []
                    }
                }else{
                    return item
                }
            })
            setDays(newDays)
        }else{

            if(label === undefined){
                let newDays = days.map((item, i) => {
                    if(index === i){
                        return {
                            ...item,
                            endTime: undefined,
                            copyDay: []
                        }
                    }else{
                        return item
                    }
                })
                return setDays(newDays);
            }

            let newDays = days.map((item, i) => {
                if(index === i){
                    return {
                        ...item,
                        endTime: label,
                        copyDay: []
                    }
                }else{
                    return item
                }
            })
            setDays(newDays)
        }
    }



    const handleChangeCopyDay = (value, label, mainIndex, copyIndex, type) => {
        if(label === undefined){
            let copyIndexforClear;
            if(type === "startTime"){
                let newDays = days.map((item, i) => {
                    if(mainIndex === i){
                        
                        let newCopy = item.copyDay.map((copyItem, cIndex) => {
                            if(copyIndex === cIndex){
                                copyIndexforClear = cIndex
                                return {
                                    ...copyItem,
                                    endTime: undefined,
                                    startTime: label,
                                    endTimeRange: []
                                }
                            }else{
                                return copyItem
                            }
                        })
                        return {
                            ...item,
                            copyDay: newCopy.slice(0, copyIndexforClear + 1)
                        }
                        
                    }else{
                        return item
                    }
                })
                return setDays(newDays)
            }else{
                let newDays = days.map((item, i) => {
                    if(mainIndex === i){
                        
                        let newCopy = item.copyDay.map((copyItem, cIndex) => {
                            if(copyIndex === cIndex){
                                copyIndexforClear = cIndex
                                return {
                                    ...copyItem,
                                    endTime: undefined,
                                }
                            }else{
                                return copyItem
                            }
                        })
                        return {
                            ...item,
                            copyDay: newCopy.slice(0, copyIndexforClear + 1)
                        }
                        
                    }else{
                        return item
                    }
                })
                return setDays(newDays)
            }
            
        }
        let newDays = days.map((item, i) => {
            if(mainIndex === i){
                let copyIndexforClear;
                if(type === "startTime"){
                    
                    let newCopy = item.copyDay.map((copyItem, cIndex) => {

                        let endTimeIndex = copyItem.startTimeRange.findIndex(i => i === label.label);

                        if(copyIndex === cIndex){
                            copyIndexforClear = cIndex
                            return {
                                ...copyItem,
                                endTime: undefined,
                                startTime: label,
                                endTimeRange: copyItem.startTimeRange.slice(endTimeIndex + 1)
                            }
                        }else{
                            return copyItem
                        }
                    })
                    return {
                        ...item,
                        copyDay: newCopy.slice(0, copyIndexforClear + 1)
                    }
                }else{
                    let newCopy = item.copyDay.map((copyItem, cIndex) => {
                        // sonraki kopyaları temizle
                        if(copyIndex === cIndex){
                            copyIndexforClear = cIndex
                            return {
                                ...copyItem,
                                endTime: label,
                            }
                        }else{
                            return copyItem
                        }
                    })
    
                    return {
                        ...item,
                        copyDay: newCopy.slice(0, copyIndexforClear + 1)
                    }
                }
                
            }else{
                return item
            }
        })

        setDays(newDays)
    }

    return (
        <div>
            {days.map((item, index) => (
                <>
                <div style={{ display: 'flex', alignItems: 'center', columnGap: '.5rem', marginRight: '30px' }}>
                    <label style={{ width: '160px' }}>{item.day}</label>
                    <SingleSelects
                        placeholder="start time"
                        options={item.startTimeRange.map((clock, cIndex) => ({ label: clock, value: cIndex })).slice(0, -1)}
                        selectedItems={item.startTime}
                        setSelectedItems={() => {}}
                        width="122px"
                        disabled={preferredTimes.length === 0 || !workingTimeStatus || item.startTimeRange.length === 0}
                        handleChange={(value, label) => handleChange(value, label, index, "startTime")}
                    />
                    <SingleSelects
                        placeholder="end time"
                        options={item.endTimeRange.map((clock, cIndex) => ({ label: clock, value: cIndex }))}
                        selectedItems={item.endTime}
                        setSelectedItems={() => {}}
                        width="122px"
                        disabled={preferredTimes.length === 0 || !workingTimeStatus || item.endTimeRange.length === 0}
                        handleChange={(value, label) => handleChange(value, label, index, "endTime")}
                    />
                </div>
                {
                    item.copyDay.length > 0 && item.copyDay.map((c, copyIndex) => (
                        <>
                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '.5rem' }}>
                        <label style={{ width: '160px' }}></label>
                        <SingleSelects
                            placeholder="start time"
                            options={c.startTimeRange.length === 1 ? [{ label: c.startTimeRange[0], value: 0 }] : c.startTimeRange.map((clock, cIndex) => ({ label: clock, value: cIndex })).slice(0, -1)}
                            selectedItems={c.startTime}
                            setSelectedItems={() => {}}
                            width="122px"
                            disabled={preferredTimes.length === 0 || !workingTimeStatus}
                            handleChange={(value, label) => handleChangeCopyDay(value, label, index, copyIndex, "startTime")}
                        />
                        <SingleSelects
                            placeholder="end time"
                            options={c.endTimeRange.map((clock, cIndex) => ({ label: clock, value: cIndex }))}
                            selectedItems={c.endTime}
                            width="122px"
                            setSelectedItems={() => {}}
                            disabled={preferredTimes.length === 0 || !workingTimeStatus}
                            handleChange={(value, label) => handleChangeCopyDay(value, label, index, copyIndex, "endTime")}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginLeft: '8px', alignSelf: 'end' }}>
                         <button style={addDeleteButtonStyle} onClick={() => deleteCopyData(c, copyIndex)} disabled={preferredTimes.length === 0 || !workingTimeStatus}>
                             <i style={{fontSize: '14px'}} className="fa-solid fa-circle-minus"></i>
                         </button>
                     </div>
                        </div>
                         
                        </>
                    ))
                }
                 <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', columnGap: '.5rem' }}>
                    <button style={addButtonStyle} onClick={() => addCopyData(item)} disabled={item.copyDay.length === 0 ? !item.endTime : !item.copyDay[item.copyDay.length -1].endTime}>
                        <i style={{color: '#44badc'}} class="fa-solid fa-circle-plus"></i>
                    </button>
                    <label style={{fontSize: '12px'}}>add</label>
                </div>
                </>
            ))}
        </div>
    );
};

export default Body;
