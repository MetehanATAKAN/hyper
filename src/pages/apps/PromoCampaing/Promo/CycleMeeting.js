import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import FailModal from '../../../../components/FailModal';
const { RangePicker } = DatePicker;

const CycleMeeting = ({
    showModal,
    setShowModal,
    getData,
    filterYear,
    filterCompany,
    filterCountry,
    filterBusUnit,
}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const user = localStorage.getItem('userName');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [cyclePeriod, setCyclePeriod] = useState();
    const [optionsMeeting, setOptionsMeeting] = useState([]);
    const [name, setName] = useState('');
    const [selectDate, setSelectDate] = useState([]);
    const [selectYear, setSelectYear] = useState(filterYear);
    const [selectCompany, setSelectCompany] = useState(filterCompany);
    const [selectCountry, setSelectCountry] = useState(filterCountry);
    const [selectBusUnit, setSelectBusUnit] = useState(filterBusUnit);
    const [optionsYear, setOptionsYear] = useState();
    const [optionsCompany, setOptionsCompany] = useState();
    const [optionsCountry, setOptionsCountry] = useState();
    const [optionsBusUnit, setOptionsBusUnit] = useState();
    const [disableSaveBtn, setDisableSaveBtn] = useState(true);
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
    ];
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
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
                    if (data.length === 1) {
                        setOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                        return setSelectCompany({ value: data[0].CompanyId, label: data[0].CompanyName });
                    }
                    setSelectCompany();
                    setSelectBusUnit();
                    return setOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
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
        setOptionsMeeting([]);
        if (!selectCompany || !selectBusUnit) return;
        const cycleData = {
            companyId: selectCompany.value,
            companyName: selectCompany.label,
            busId: selectBusUnit.value,
            busName: selectBusUnit.label,
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/GetCyclePeriod',
            'POST',
            cycleData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setOptionsMeeting(data?.map((el) => ({ value: el.id, label: el.cycleName })));
                });
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setOptionsMeeting([]);
                    setCyclePeriod([]);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectBusUnit, selectCompany]);

    useEffect(() => {
        const condition = [
            cyclePeriod ? true : false,
            selectDate.length === 0 ? false : true,
            name.trim() === '' ? false : true,
        ];
        if (condition.every((x) => x === true)) return setDisableSaveBtn(false);
        return setDisableSaveBtn(true);
    }, [cyclePeriod, selectDate, name]);
    const saveMeetingBtn = () => {
        const data = {
            cyclePeriodId: cyclePeriod.value,
            cycleMeetingName: name.trim(),
            createdBy: user,
            startDate: selectDate[0],
            endDate: selectDate[1],
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/SaveCycleMeeting',
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
                header={t('Cycle Meeting')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', width: '100%' }}>
                            {filterComponentsData.map((el) => (
                                <SingleSelects
                                    isStar
                                    label={el.label}
                                    selectedItems={el.state}
                                    setSelectedItems={el.setState}
                                    options={el.options}
                                    width="210px"
                                />
                            ))}
                        </div>
                        <SingleSelects
                            isStar
                            label="cycle period"
                            selectedItems={cyclePeriod}
                            setSelectedItems={setCyclePeriod}
                            options={optionsMeeting}
                            width="100%"
                        />
                        <NewInput
                            width={'100%'}
                            value={name}
                            setValue={setName}
                            label="meeting name"
                            isStar={true}
                            isUpperCase={true}
                            btnTooltip="Colors"
                            btnIcon={<i className="fas fa-ellipsis-h"></i>}
                        />
                        <RangePicker
                            style={{ width: '100%' }}
                            picker="date"
                            onChange={onChangeDate}
                            format="DD/MM/YYYY"
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
                        <Button disabled={disableSaveBtn} onClick={saveMeetingBtn} variant="primary">
                            {t('Save')}
                        </Button>
                    </>
                }
            />
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
        </>
    );
};

export default CycleMeeting;
