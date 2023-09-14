import React, { useState } from 'react'
import Recurrence from '../../../../components/Recurrence';
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../utils/http.helper';
import { alsModal } from '../../../../redux/actions';

const ALSReccurence = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [finishButton, setFinishButton] = useState(true);
    const [isClickAddButton, setIsClickAddButton] = useState(false);

    const recurrenceDatas = useSelector((state) => state.TaskManagement.recurrenceData);
    const recurrenceType = useSelector((state) => state.TaskManagement.recurrenceType);
    const activityId = useSelector(state => state.ActivityLimit.activityId);



    const recurrenceAddBtn = () => {

        setIsClickAddButton(true);
        if (recurrenceType === 'Day') {

            const dayBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/CreateActivityRecurrenceForDay', 'POST', dayBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }

        else if (recurrenceType === 'Week') {

            const weekBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Recurrence: recurrenceDatas.Recurrence,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/CreateActivityRecurrenceForWeek', 'POST', weekBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }

        else if (recurrenceType === 'Month') {

            const monthBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ProcessDate: recurrenceDatas.ProcessDate,
                ProcessFrequencyDate: recurrenceDatas.ProcessFrequencyDate,
                ProcessWeekDays: recurrenceDatas.ProcessWeekDays,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/CreateActivityRecurrenceForMonth', 'POST', monthBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }

        else if (recurrenceType === 'Quarter') {

            const quarterBdoy = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Recurrence: recurrenceDatas.Recurrence,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ProcessDate: recurrenceDatas.ProcessDate,
                ProcessFrequencyDate: recurrenceDatas.ProcessFrequencyDate,
                ProcessWeekDays: recurrenceDatas.ProcessWeekDays,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/CreateActivityRecurrenceForQuarter', 'POST', quarterBdoy)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
        else {

            const yearBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ProcessDate: recurrenceDatas.ProcessDate,
                ProcessFrequencyDate: recurrenceDatas.ProcessFrequencyDate,
                ProcessWeekDays: recurrenceDatas.ProcessWeekDays,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/CreateActivityRecurrenceForYearly', 'POST', yearBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    };

    const recurrenceUpdate = () => {

        if (recurrenceType === 'Day') {

            const dayBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/UpdateActivityRecurrenceForDay', 'POST', dayBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }

        else if (recurrenceType === 'Week') {

            const weekBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Recurrence: recurrenceDatas.Recurrence,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/UpdateActivityRecurrenceForWeek', 'POST', weekBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }

        else if (recurrenceType === 'Month') {

            const monthBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ProcessDate: recurrenceDatas.ProcessDate,
                ProcessFrequencyDate: recurrenceDatas.ProcessFrequencyDate,
                ProcessWeekDays: recurrenceDatas.ProcessWeekDays,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/UpdateActivityRecurrenceForMonth', 'POST', monthBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }

        else if (recurrenceType === 'Quarter') {

            const quarterBdoy = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Recurrence: recurrenceDatas.Recurrence,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ProcessDate: recurrenceDatas.ProcessDate,
                ProcessFrequencyDate: recurrenceDatas.ProcessFrequencyDate,
                ProcessWeekDays: recurrenceDatas.ProcessWeekDays,
                ActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/UpdateActivityRecurrenceForQuarter', 'POST', quarterBdoy)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
        else {

            const yearBody = {
                RecurrenceStartDate: recurrenceDatas.RecurrenceStartDate,
                Every: recurrenceDatas.Every,
                EndDateStatus: recurrenceDatas.EndDateStatus,
                EndDate: recurrenceDatas.EndDate,
                DeadLineStatus: recurrenceDatas.DeadLineStatus,
                DeadLineFormation: recurrenceDatas.DeadLineFormation,
                ProcessDate: recurrenceDatas.ProcessDate,
                ProcessFrequencyDate: recurrenceDatas.ProcessFrequencyDate,
                ProcessWeekDays: recurrenceDatas.ProcessWeekDays,
                qActivityId: activityId
            }

            FetchApiPost('services/Settings/ActivityRecurrence/UpdateActivityRecurrenceForYearly', 'POST', yearBody)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }

    return (
        <div className='als-recurrent'>
            <Recurrence recurrenceFinish={finishButton} setRecurrenceFinish={setFinishButton} />

            <div className="task-management-footer-btn">
                <Button
                    onClick={() => dispatch(alsModal(false))}
                    variant="danger"
                >
                    {t('cancel')}
                </Button>
                {
                    isClickAddButton === false
                        ?   <Button variant="primary" onClick={recurrenceAddBtn}>
                            {t('add')}
                            </Button>
                        :   <Button variant="warning" onClick={recurrenceUpdate}>
                            {t('update')}
                            </Button>
                }
            </div>
        </div>
    )
}

export default ALSReccurence