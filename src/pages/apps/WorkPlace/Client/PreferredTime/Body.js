import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';


const Body = ({ setAddButtonDisableStatus, isClickAdd, selectedItem, getFilterData, setShow, setLoader }) => {
    const { t } = useTranslation();
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    

    const [days, setDays] = useState([
        {
            day: 'Monday',
            dayId: 0,
            startTime: undefined,
            endTime: undefined,
            isChecked: false,
            endTimeRange: [],
        },
        {
            day: 'Tuesday',
            dayId: 1,
            startTime: undefined,
            endTime: undefined,
            isChecked: false,
            endTimeRange: [],
        },
        {
            day: 'Wednesday',
            dayId: 2,
            startTime: undefined,
            endTime: undefined,
            isChecked: false,
            endTimeRange: [],
        },
        {
            day: 'Thursday',
            dayId: 3,
            startTime: undefined,
            endTime: undefined,
            isChecked: false,
            endTimeRange: [],
        },
        {
            day: 'Friday',
            dayId: 4,
            startTime: undefined,
            endTime: undefined,
            isChecked: false,
            endTimeRange: [],
        },
        {
            day: 'Saturday',
            dayId: 5,
            startTime: undefined,
            endTime: undefined,
            isChecked: false,
            endTimeRange: [],
        },
        {
            day: 'Sunday',
            dayId: 6,
            startTime: undefined,
            endTime: undefined,
            isChecked: false,
            endTimeRange: [],
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

    
    // useEffect(() => {
    //     try{
    //         let d = new Date(year, month, day, days[0].startTime.label.slice(0,2), days[0].startTime.label.slice(3,5))
    //         console.log(d)
    //     }catch(err){

    //     }
    // }, [days])

    useEffect(() => {
        setLoader(true)
        FetchApiPost('services/CRM/Client/GetClientPreferredTime', 'POST', {
            workPlaceId: selectedItem.workPlace.id,
            clientId: selectedItem.client.id
        }).then(res => {
            res.json().then(({ data }) => {
                setLoader(false)
                if(data.length > 0){

                    let savedTimes = data.map(d => ({
                        dayId: d.dayId,
                        day: d.dayId === 0 ? 'Monday' : d.dayId === 1 ? 'Tuesday' : d.dayId === 2 ? 'Wednesday' : d.dayId === 3 ? 'Thursday' : d.dayId === 4 ? 'Friday' : d.dayId === 5 ? 'Saturday' : 'Sunday',
                        endTime: times.filter((time) => time >= d.startTime && time <= '18:00' && time !== d.startTime).map((i, index) =>   {if(i === d.endTime) return { label: i, value: index }}).filter(i => i !== undefined)[0],
                        endTimeRange: times.filter((time) => time >= d.startTime && time <= '18:00' && time !== d.startTime),
                        isChecked: true,
                        startTime: times.map((i, index) => {if(i === d.startTime) return { label: i, value: index }}).filter(i => i !== undefined)[0]
                    }))

                    let newDays = days.map(i => {
                       
                        if(savedTimes.filter(sT => sT.dayId === i.dayId).length > 0){
                            return {
                                ...savedTimes.filter(sT => sT.dayId === i.dayId)[0]
                            }
                        }else{
                            return {
                                ...i
                            }
                        }
                    })
                    setDays(newDays);
                }
            })
        })
    }, [selectedItem])

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

    useEffect(() => {
        let checkCount = 0;
        let startCount = 0;
        let endCount = 0;
        days.map((item) => {
            if (item.isChecked) checkCount++;
            if (item.startTime) startCount++;
            if (item.endTime) endCount++;
        });

        if(checkCount !== 0 && (checkCount === startCount && checkCount === endCount)) setAddButtonDisableStatus(false);
        else setAddButtonDisableStatus(true);
    }, [days]);

    useEffect(() => {
        if(!isClickAdd) return;

        let checkedDays = days.filter(i => i.isChecked === true)
        const body = {
            clientCategoryId: selectedItem.workPlace.clientCategoryId,
            preferredTimes: checkedDays.map((item, index) => ({
                dayId: item.dayId,
                startTime: item.startTime.label,
                endTime: item.endTime.label
            })),
            createdBy: localStorage.getItem('userName')
        }

        FetchApiPost('services/CRM/Client/CreateClientPreferredTime', 'POST', body)
            .then(res => {
                if(res.status === 201){
                    // getFilterData()
                    setShow(false);
                }
            })
    }, [isClickAdd])

    return (
        <div style={{position: 'relative'}}>
            
            {days.map((item, index) => (
                <div style={{ display: 'flex', alignItems: 'center', columnGap: '.5rem' }}>
                    <Checkbox
                        checked={item.isChecked}
                        style={{ width: 'min-content' }}
                        onChange={(e) => handleCheck(e.target.checked, index)}
                    />
                    <label style={{ width: '160px' }}>{t(item.day)}</label>
                    <SingleSelects
                        disabled={!item.isChecked}
                        placeholder="start time"
                        options={times.map((clock, cIndex) => ({ label: clock, value: cIndex })).slice(0, -1)}
                        selectedItems={item.startTime}
                        setSelectedItems={(value) => handleChangeTime(value, item, index)}
                    />
                    <SingleSelects
                        disabled={!item.isChecked}
                        placeholder="end time"
                        options={item.endTimeRange.map((clock, cIndex) => ({ label: clock, value: cIndex }))}
                        selectedItems={item.endTime}
                        setSelectedItems={(value) => handleChangeEndTime(value, index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Body;
