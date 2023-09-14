import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import FailModal from '../../../../components/FailModal';
const { RangePicker } = DatePicker;

const UpdateMeeting = ({
    showModal,
    setShowModal,
    getData,
    filterYear,
    filterCompany,
    filterCountry,
    filterBusUnit,
    prevMeeting,
}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const user = localStorage.getItem('userName');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [name, setName] = useState('');
    const [selectDate, setSelectDate] = useState([]);
    const [oldselectDate, setOldSelectDate] = useState([]);
    const [disableSaveBtn, setDisableSaveBtn] = useState(true);
    const [oldDate, setOldDate] = useState([]);

    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            const first = moment(start).format();
            const last = moment(end).format();
            setSelectDate([new Date(first).toISOString(), new Date(last).toISOString()]);
        } else {
            setSelectDate([]);
        }
    };

    function convertDateRange(dateRange) {
        const dates = dateRange.split(' - ');
        const startDate = new Date(dates[0].split('.').reverse().join('-'));
        const endDate = new Date(dates[1].split('.').reverse().join('-'));
        const startStr = startDate.toISOString().slice(0, 10);
        const endStr = endDate.toISOString().slice(0, 10);
        return { start: startStr, end: endStr };
    }

    useEffect(() => {
        if (prevMeeting === null) return;
        const dateRange = prevMeeting.date;
        const { start, end } = convertDateRange(dateRange);
        console.log(start, end);
        setOldDate([start, end]);
        setOldSelectDate([new Date(start).toISOString(), new Date(end).toISOString()]);
        setName(prevMeeting.name);
    }, [prevMeeting]);

    useEffect(() => {
        const condition = [selectDate.length === 0 ? false : true, name.trim() === '' ? false : true];
        if (condition.every((x) => x === true)) return setDisableSaveBtn(false);
        return setDisableSaveBtn(true);
    }, [selectDate, name]);

    const editBtn = () => {
        const data = {
            yearId: filterYear.value,
            companyId: filterCompany.value,
            countryId: filterCountry.value,
            businessUnitId: filterBusUnit.value,
            status: true,
            oldCycleMeetingName: name,
            newCycleMeetingName: name,
            modifiedBy: user,
            oldCycleMeetingStart: oldselectDate[0],
            oldCycleMeetingEnd: oldselectDate[1],
            newCycleMeetingStart: selectDate[0],
            newCycleMeetingEnd: selectDate[1],
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/UpdateCycleMeeting',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setShowModal(false);
                getData();
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setErrorModal(true);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    const deleteBtn = () => {
        const data = {
            yearId: filterYear.value,
            companyId: filterCompany.value,
            countryId: filterCountry.value,
            businessUnitId: filterBusUnit.value,
            status: false,
            oldCycleMeetingName: name,
            newCycleMeetingName: name,
            modifiedBy: user,
            oldCycleMeetingStart: oldselectDate[0],
            oldCycleMeetingEnd: oldselectDate[1],
            newCycleMeetingStart: selectDate[0],
            newCycleMeetingEnd: selectDate[1],
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/UpdateCycleMeeting',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setShowModal(false);
                getData();
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setErrorModal(true);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <>
            <GlobalModal
                header={t('Edit Cycle Meeting')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <NewInput
                            width={'100%'}
                            value={name}
                            setValue={setName}
                            isStar
                            label="meeting name abb"
                            isUpperCase={true}
                        />
                        <RangePicker
                            style={{ width: '100%' }}
                            defaultValue={[moment(oldDate[0]), moment(oldDate[1])]}
                            onChange={onChangeDate}
                            format={'DD/MM/YYYY'}
                            separator={
                                <i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>
                            }
                        />
                    </div>
                }
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('Close')}
                        </Button>
                        <Button onClick={deleteBtn} variant="danger">
                            {t('Delete')}
                        </Button>
                        <Button onClick={editBtn} disabled={disableSaveBtn} variant="warning">
                            {t('Edit')}
                        </Button>
                    </>
                }
            />
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
        </>
    );
};

export default React.memo(UpdateMeeting);
