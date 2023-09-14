// @flow
import React, { forwardRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import languageTr from 'date-fns/locale/tr';
import languageRu from 'date-fns/locale/ru';
import { FetchApiGet } from '../utils/http.helper';
import moment from 'moment';
import { useSelector } from 'react-redux';

type DatepickerInputProps = {
    onClick?: () => void,
    value?: string,
};

/* Datepicker with Input */
const DatepickerInput = forwardRef((props: DatepickerInputProps, ref) => {
    const onDateValueChange = () => {
        console.log('date value changed');
    };
    return (
        <input
            type="text"
            className="form-control date"
            onClick={props.onClick}
            value={props.value}
            onChange={onDateValueChange}
            ref={ref}
        />
    );
});

type DatepickerInputWithAddonProps = {
    onClick?: () => void,
    value?: string,
};
/* Datepicker with Addon Input */
const DatepickerInputWithAddon = forwardRef((props: DatepickerInputWithAddonProps, ref) => (
    <div className="input-group" ref={ref}>
        <input
            type="text"
            className="form-control form-control-light"
            onClick={props.onClick}
            value={props.value}
            readOnly
        />
        <div className="input-group-append">
            <span className="input-group-text bg-primary border-primary text-white">
                <i className="mdi mdi-calendar-range font-13"></i>
            </span>
        </div>
    </div>
));

type HyperDatepickerProps = {
    value: Date,
    hideAddon?: boolean,
    inputClass?: string,
    dateFormat?: string,
    minDate?: Date,
    maxDate?: Date,
    showTimeSelect?: boolean,
    tI?: number,
    timeCaption?: string,
    showTimeSelectOnly?: boolean,
    monthsShown?: number,
    inline?: boolean,
    onChange: (date: any) => void,
};

const HyperDatepicker = (props: HyperDatepickerProps): React$Element<any> => {
    // handle custom input
    const input = (props.hideAddon || false) === true ? <DatepickerInput /> : <DatepickerInputWithAddon />;
    const [disabledDays, setDisabledDays] = useState([]);
    const holidays = useSelector((state) => state.Calendar.holidays);

    useEffect(() => {
                setDisabledDays(
                    holidays?.data
                        .filter((holiday) => holiday.endTime.slice(11, 16) > '18:30')
                        .map((deneme) => replaceAt(deneme.startTime, '00:00:00'))
                )
    }, [holidays]);

    const replaceAt = (holiday, replacement) => {
        return new Date(holiday?.substring(0, 11) + replacement + holiday?.substring(11 + replacement.length));
    };

    const isSunday = (date) => {
        return date.getDay(date) === 0;
    };

    const createNewDate = () => {
        let createDate = new Date(); 
        createDate.setHours(0, 0, 0, 0);
        
        return createDate.getTime();
    }

    // useEffect(() => {
    //     let createDate = new Date(); 
    //     createDate.setHours(0, 0, 0, 0);
    //     console.log("asdadsa",createDate);
    // }, [])

    return (
        <>
            {/* date picker control */}
            <DatePicker
                customInput={input}
                timeIntervals={props.tI}
                className={classNames('form-control', props.inputClass)}
                selected={props.value}
                onChange={(date) => props.onChange(date)}
                showTimeSelect={props.showTimeSelect}
                timeFormat="hh:mm a"
                timeCaption={props.timeCaption}
                dateFormat={props.dateFormat || 'MM/dd/yyyy'}
                minDate={props.minDate}
                maxDate={props.maxDate}
                monthsShown={props.monthsShown}
                showTimeSelectOnly={props.showTimeSelectOnly}
                inline={props.inline}
                autoComplete="off"
                disabledDate={new Date('2022-07-07T22:00:00')}
                dayClassName={(date) =>
                    date.getTime() < createNewDate() ||
                    disabledDays?.find((holiday) => date.getTime() === holiday.getTime()) ||
                    isSunday(date)
                        ? 'disabled-date'
                        : date.getTime() === new Date().getTime()
                        ? undefined
                        : undefined
                }
                locale={
                    (localStorage.getItem('i18nextLng') === 'tr'
                        ? languageTr
                        : localStorage.getItem('i18nextLng') === 'ru'
                        ? languageRu
                        : null) || null
                }
                disabled={props.disabled}
            />
        </>
    );
};

export default HyperDatepicker;

// /*
// date => date.getTime() < new Date().getTime()
//                     ? 'disabled-date'
//                     : date.getTime() === new Date().getTime()
//                     ?undefined
//                     :undefined

//                     || disabledDays?.find(holiday => new Date(holiday.endTime) === date)
// // */new Date("2022-07-07T00:00:00").getTime() ===date.getTime()
