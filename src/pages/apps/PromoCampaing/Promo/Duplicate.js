import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { Chip, Divider } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import FailModal from '../../../../components/FailModal';
import { Spin } from 'antd';
const Duplicate = ({ showModal, setShowModal, getData, filterYear, filterCompany, filterCountry, filterBusUnit }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const user = localStorage.getItem('userName');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [loading, setloading] = useState(false);
    // FROM SECTION
    const [fromSelectYear, setFromSelectYear] = useState(filterYear);
    const [fromSelectCompany, setFromSelectCompany] = useState(filterCompany);
    const [fromSelectCountry, setFromSelectCountry] = useState(filterCountry);
    const [fromSelectBusUnit, setFromSelectBusUnit] = useState();
    const [fromSelectCyclePeriod, setFromSelectCyclePeriod] = useState();
    const [fromOptionsYear, setFromOptionsYear] = useState([]);
    const [fromOptionsCompany, setFromOptionsCompany] = useState([]);
    const [fromOptionsCountry, setFromOptionsCountry] = useState([]);
    const [fromOptionsBusUnit, setFromOptionsBusUnit] = useState([]);
    const [fromOptionsPeriod, setFromOptionsPeriod] = useState([]);
    // TO SECTION
    const [toSelectYear, setToSelectYear] = useState(filterYear);
    const [toSelectCompany, setToSelectCompany] = useState();
    const [toSelectCountry, setToSelectCountry] = useState();
    const [toSelectBusUnit, setToSelectBusUnit] = useState();
    const [toSelectCyclePeriod, setToSelectCyclePeriod] = useState();
    const [toOptionsYear, setToOptionsYear] = useState([]);
    const [toOptionsCompany, setToOptionsCompany] = useState([]);
    const [toOptionsCountry, setToOptionsCountry] = useState([]);
    const [toOptionsBusUnit, setToOptionsBusUnit] = useState([]);
    const [toOptionsPeriod, setToOptionsPeriod] = useState([]);
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setFromOptionsYear(data?.map((x) => ({ value: x.Id, label: x.Val1 })));
                    setToOptionsYear(data?.map((x) => ({ value: x.Id, label: x.Val1 })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });

        FetchApiGet(`api/OldSystem/GetAllCountriesList/${empId}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setFromOptionsCountry(data?.map((x) => ({ value: x.CountryId, label: x.CountryName })));
                    setToOptionsCountry(data?.map((x) => ({ value: x.CountryId, label: x.CountryName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);

    useEffect(() => {
        setFromSelectCompany();
        setFromSelectBusUnit();
        setFromSelectCyclePeriod();
        if (!fromSelectCountry) return;
        FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${fromSelectCountry.value}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 1) {
                        setFromOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                        return setFromSelectCompany({ value: data[0].CompanyId, label: data[0].CompanyName });
                    }
                    return setFromOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, fromSelectCountry]);

    useEffect(() => {
        setFromSelectBusUnit();
        setFromSelectCyclePeriod();
        if (!fromSelectCompany || !fromSelectYear) return;
        const postData = {
            CompanyId: fromSelectCompany.value,
            Year: fromSelectYear.value,
        };
        FetchApiPost('api/OldSystem/GetBusinessUnitCampaign', 'POST', postData).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 0) {
                        return setFromSelectBusUnit();
                    }
                    if (data.length === 1) {
                        setFromOptionsBusUnit([{ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName }]);
                        return setFromSelectBusUnit({ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName });
                    }
                    return setFromOptionsBusUnit(
                        data?.map((x) => ({ value: x.BusinessUnitId, label: x.BusinessUnitName }))
                    );
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [fromSelectCompany, fromSelectYear, history]);

    useEffect(() => {
        if (!fromSelectCompany || !fromSelectBusUnit) return;
        const cycleData = {
            companyId: fromSelectCompany.value,
            companyName: fromSelectCompany.label,
            busId: fromSelectBusUnit.value,
            busName: fromSelectBusUnit.label,
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/GetCyclePeriod',
            'POST',
            cycleData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    if (data.length === 1) {
                        setFromOptionsPeriod([{ value: data[0].id, label: data[0].cycleName }]);
                        return setFromSelectCyclePeriod({ value: data[0].id, label: data[0].cycleName });
                    }
                    return setFromOptionsPeriod(data?.map((el) => ({ value: el.id, label: el.cycleName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
            setFromOptionsPeriod([]);
            return setFromSelectCyclePeriod();
        });
    }, [fromSelectBusUnit, fromSelectCompany]);

    // TO SECTION
    useEffect(() => {
        setToSelectCompany();
        setToSelectBusUnit();
        setToSelectCyclePeriod();
        if (!toSelectCountry) return;
        FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${toSelectCountry.value}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 1) {
                        setToOptionsCompany([{ value: data[0].CompanyId, label: data[0].CompanyName }]);
                        return setToSelectCompany({ value: data[0].CompanyId, label: data[0].CompanyName });
                    }
                    return setToOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, toSelectCountry]);

    useEffect(() => {
        setToSelectBusUnit();
        setToSelectCyclePeriod();
        if (!toSelectCompany || !toSelectYear) return;
        const postData = {
            CompanyId: toSelectCompany.value,
            Year: toSelectYear.value,
        };
        FetchApiPost('api/OldSystem/GetBusinessUnitCampaign', 'POST', postData).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 0) {
                        return setToSelectBusUnit();
                    }
                    if (data.length === 1) {
                        return setToSelectBusUnit({ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName });
                    }
                    setToOptionsBusUnit(data?.map((x) => ({ value: x.BusinessUnitId, label: x.BusinessUnitName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [toSelectCompany, toSelectYear, history]);

    useEffect(() => {
        if (!toSelectCompany || !toSelectBusUnit) return;
        const cycleData = {
            companyId: toSelectCompany.value,
            companyName: toSelectCompany.label,
            busId: toSelectBusUnit.value,
            busName: toSelectBusUnit.label,
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/GetCyclePeriod',
            'POST',
            cycleData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data, errors }) => {
                    if (data.length === 1) {
                        setToOptionsPeriod([{ value: data[0].id, label: data[0].cycleName }]);
                        return setToSelectCyclePeriod({ value: data[0].id, label: data[0].cycleName });
                    }
                    return setToOptionsPeriod(data?.map((el) => ({ value: el.id, label: el.cycleName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
            setToSelectCyclePeriod();
            return setToOptionsPeriod([]);
        });
    }, [toSelectBusUnit, toSelectCompany]);

    const duplicateBtn = () => {
        setloading(true);
        const data = {
            fromYearId: fromSelectYear.value,
            fromCountryId: fromSelectCountry.value,
            fromCompanyId: fromSelectCompany.value,
            fromBusinessUnitId: fromSelectBusUnit.value,
            fromCycleId: fromSelectCyclePeriod.value,
            toYearId: toSelectYear.value,
            toCountryId: toSelectCountry.value,
            toCountryName: toSelectCountry.label,
            toCompanyId: toSelectCompany.value,
            toCompanyName: toSelectCompany.label,
            createdBy: user,
            toBusinessUnitId: toSelectBusUnit.value,
            toBusinessUnitName: toSelectBusUnit.label,
            toCycleIds: [toSelectCyclePeriod.value],
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/DublicatePromoCampaign',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setloading(false);
                setShowModal(false);
                getData();
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setloading(false);
                    setErrorModal(true);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const [duplicateBtnIsDisable, setDuplicateBtnIsDisable] = useState(true);
    useEffect(() => {
        const duplicateBtnDisableCondition = [
            !fromSelectYear,
            !fromSelectCountry,
            !fromSelectCompany,
            !fromSelectBusUnit,
            !fromSelectCyclePeriod,
            !toSelectYear,
            !toSelectCountry,
            !toSelectCompany,
            !toSelectBusUnit,
            !toSelectCyclePeriod,
        ];
        if (duplicateBtnDisableCondition.includes(true)) {
            return setDuplicateBtnIsDisable(true);
        }
        setDuplicateBtnIsDisable(false);
    }, [
        fromSelectBusUnit,
        fromSelectCompany,
        fromSelectCountry,
        fromSelectCyclePeriod,
        fromSelectYear,
        toSelectBusUnit,
        toSelectCompany,
        toSelectCountry,
        toSelectCyclePeriod,
        toSelectYear,
    ]);
    return (
        <>
            <GlobalModal
                size="lg"
                showModal={showModal}
                setShowModal={setShowModal}
                header={t('Duplicate')}
                toggle={() => setShowModal(!showModal)}
                body={
                    <Spin spinning={loading} size="large">
                        <div>
                            <label>from</label>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                    gap: '8px',
                                }}>
                                <SingleSelects
                                    label={'year'}
                                    selectedItems={fromSelectYear}
                                    setSelectedItems={setFromSelectYear}
                                    options={fromOptionsYear}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'country'}
                                    selectedItems={fromSelectCountry}
                                    setSelectedItems={setFromSelectCountry}
                                    options={fromOptionsCountry}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'company'}
                                    selectedItems={fromSelectCompany}
                                    setSelectedItems={setFromSelectCompany}
                                    options={fromOptionsCompany}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'business unit'}
                                    selectedItems={fromSelectBusUnit}
                                    setSelectedItems={setFromSelectBusUnit}
                                    options={fromOptionsBusUnit}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'cycle'}
                                    selectedItems={fromSelectCyclePeriod}
                                    setSelectedItems={setFromSelectCyclePeriod}
                                    options={fromOptionsPeriod}
                                    width="140px"
                                />
                            </div>
                            <Divider className="mt-3">
                                <Chip
                                    sx={{
                                        backgroundColor: '#00a0df',
                                        '& .MuiChip-label': {
                                            paddingRight: 0,
                                        },
                                    }}
                                    color="info"
                                    size="small"
                                    icon={<ArrowDownwardIcon />}
                                />
                            </Divider>
                            <label>To</label>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                    gap: '8px',
                                }}>
                                <SingleSelects
                                    label={'year'}
                                    selectedItems={toSelectYear}
                                    setSelectedItems={setToSelectYear}
                                    options={toOptionsYear}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'country'}
                                    selectedItems={toSelectCountry}
                                    setSelectedItems={setToSelectCountry}
                                    options={toOptionsCountry}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'company'}
                                    selectedItems={toSelectCompany}
                                    setSelectedItems={setToSelectCompany}
                                    options={toOptionsCompany}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'business unit'}
                                    selectedItems={toSelectBusUnit}
                                    setSelectedItems={setToSelectBusUnit}
                                    options={toOptionsBusUnit}
                                    width="140px"
                                />
                                <SingleSelects
                                    label={'cycle'}
                                    selectedItems={toSelectCyclePeriod}
                                    setSelectedItems={setToSelectCyclePeriod}
                                    options={toOptionsPeriod}
                                    width="140px"
                                />
                            </div>
                        </div>
                    </Spin>
                }
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('Close')}
                        </Button>
                        <Button disabled={duplicateBtnIsDisable} onClick={duplicateBtn} variant="warning">
                            {t('Duplicate')}
                        </Button>
                    </>
                }
            />
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
        </>
    );
};

export default React.memo(Duplicate);
