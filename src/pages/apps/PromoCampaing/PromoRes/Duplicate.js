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
import { useSelector } from 'react-redux';
const Duplicate = ({ showModal, setShowModal, getData, filterYear, filterCompany, filterCountry, filterBusUnit }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const user = localStorage.getItem('userName');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);

    const zoneFilterData = useSelector(state => state.PromoCampaing.filtersData);

   
    // FROM SECTION
    const [fromSelectYear, setFromSelectYear] = useState(zoneFilterData?.selectYear ?zoneFilterData?.selectYear :{});
    const [fromSelectCompany, setFromSelectCompany] = useState(zoneFilterData?.selectCompany ?zoneFilterData?.selectCompany :{});
    const [fromSelectCountry, setFromSelectCountry] = useState(zoneFilterData?.selectCountry ?zoneFilterData?.selectCountry :{});
    const [fromSelectBusUnit, setFromSelectBusUnit] = useState(zoneFilterData?.selectBusinessUnite ?zoneFilterData?.selectBusinessUnite :{});
    const [fromSelectCyclePeriod, setFromSelectCyclePeriod] = useState();
    const [fromOptionsYear, setFromOptionsYear] = useState(zoneFilterData?.year ?zoneFilterData?.year :[]);
    const [fromOptionsCompany, setFromOptionsCompany] = useState(zoneFilterData?.company ?zoneFilterData?.company :[]);
    const [fromOptionsCountry, setFromOptionsCountry] = useState(zoneFilterData?.country ?zoneFilterData?.country :[]);
    const [fromOptionsBusUnit, setFromOptionsBusUnit] = useState(zoneFilterData?.businessUnite ?zoneFilterData?.businessUnite :[]);
    const [fromOptionsPeriod, setFromOptionsPeriod] = useState([]);


    console.log(fromSelectCompany);
    console.log(fromSelectBusUnit);
    const [fromZone, setFromZone] = useState([]);
    const [fromSelectZone, setFromSelectZone] = useState();

    // TO SECTION
    const [toSelectYear, setToSelectYear] = useState(zoneFilterData?.selectYear ?zoneFilterData?.selectYear :{});
    const [toSelectCompany, setToSelectCompany] = useState(zoneFilterData?.selectCompany ?zoneFilterData?.selectCompany :{});
    const [toSelectCountry, setToSelectCountry] = useState(zoneFilterData?.selectCountry ?zoneFilterData?.selectCountry :{});
    const [toSelectBusUnit, setToSelectBusUnit] = useState(zoneFilterData?.selectBusinessUnite ?zoneFilterData?.selectBusinessUnite :{});
    const [toSelectCyclePeriod, setToSelectCyclePeriod] = useState();
    const [toOptionsYear, setToOptionsYear] = useState(zoneFilterData?.year ?zoneFilterData?.year :[]);
    const [toOptionsCompany, setToOptionsCompany] = useState(zoneFilterData?.company ?zoneFilterData?.company :[]);
    const [toOptionsCountry, setToOptionsCountry] = useState(zoneFilterData?.country ?zoneFilterData?.country :[]);
    const [toOptionsBusUnit, setToOptionsBusUnit] = useState(zoneFilterData?.businessUnite ?zoneFilterData?.businessUnite :[]);
    const [toOptionsPeriod, setToOptionsPeriod] = useState([]);
  
    const [toZone, setToZone] = useState([]);
    const [toSelectZone, setToSelectZone] = useState();

    const duplicateBtn = () => {
        const data = {
            fromZone: {
                yearId: fromSelectYear?.value,
                companyId: fromSelectCompany?.value,
                companyName: fromSelectCompany?.label,
                businessUnitId: fromSelectBusUnit?.value,
                businessUnitName: fromSelectBusUnit?.label,
                zoneId: fromSelectZone?.value,
                cycleMonthIds: [fromSelectCyclePeriod?.value]
              },
              toZone: {
                yearId: toSelectYear?.value,
                companyId: toSelectCompany?.value,
                companyName: toSelectCompany?.label,
                businessUnitId: toSelectBusUnit?.value,
                businessUnitName: toSelectBusUnit?.label,
                zoneId: toSelectZone?.value,
                cycleMonthIds: [toSelectCyclePeriod?.value]
              },
              createdBy: user
        };
        FetchApiPost(
            'services/Organization/Organization/ZoneCampaignCalendar/CopyZoneCampaignCalendar',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setShowModal(false);
                // getData();
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

    const duplicateIsDisabled = () => {
        if(
            fromSelectYear              &&    toSelectYear          &&
            fromSelectCountry           &&    toSelectCountry       &&
            fromSelectCompany           &&    toSelectCompany       &&
            fromSelectBusUnit           &&    toSelectBusUnit       &&
            fromSelectCyclePeriod       &&    toSelectCyclePeriod      
        )
        {
            return false
        }
        else return true
    }

    /**year and country */
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setFromSelectYear({ value: new Date().getFullYear(), label: String(new Date().getFullYear()) });
                    setToSelectYear({ value: new Date().getFullYear(), label: String(new Date().getFullYear()) });
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
                    setFromSelectCountry({ value: data[0].CountryId, label: data[0].CountryName });
                    setToSelectCountry({ value: data[0].CountryId, label: data[0].CountryName });

                    setFromOptionsCountry(data?.map((x) => ({ value: x.CountryId, label: x.CountryName })));
                    setToOptionsCountry(data?.map((x) => ({ value: x.CountryId, label: x.CountryName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [empId, history]);

    /**company */
    useEffect(() => {
        if (!fromSelectCountry) return;
        setFromSelectCompany();
        setFromSelectBusUnit();
        setFromSelectCyclePeriod();
        FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${fromSelectCountry?.value}`, 'GET').then((res) => {
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
    }, [fromSelectCountry, history]);
    
    /**business unite */
    useEffect(() => {
        if (!fromSelectCompany || !fromSelectYear) return;
        setFromSelectBusUnit();
        setFromSelectCyclePeriod();
        const postData = {
            CompanyId: fromSelectCompany?.value,
            Year: fromSelectYear?.value,
        };
        FetchApiPost('api/OldSystem/GetBusinessUnitCampaign', 'POST', postData).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 0) {
                        return setFromSelectBusUnit();
                    }
                    if (data.length !== 0) {
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
        if(fromSelectCompany && fromSelectBusUnit) {
            const body = {
                companyId: fromSelectCompany?.value,
                companyName: fromSelectCompany?.label,
                busId: fromSelectBusUnit?.value,
                busName: fromSelectBusUnit?.label
            }
          FetchApiPost('services/Organization/Organization/BusinessUnitCampaignCalendar/GetCyclePeriod','POST',body)
          .then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                 setFromOptionsPeriod(data?.data?.map(item => (
                    {
                        value:item?.id,
                        label:item?.cycleName
                    }
                 )))
                });
            }
           else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
            else {
                history.push('/error-500');
            }
        });
        }
      
    }, [fromSelectBusUnit, fromSelectCompany, history])

    useEffect(() => {
        if(toSelectCompany && toSelectBusUnit) {
            const body = {
                companyId: toSelectCompany?.value,
                companyName: toSelectCompany?.label,
                busId: toSelectBusUnit?.value,
                busName: toSelectBusUnit?.label
            }
          FetchApiPost('services/Organization/Organization/BusinessUnitCampaignCalendar/GetCyclePeriod','POST',body)
          .then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                 setToOptionsPeriod(data?.data?.map(item => (
                    {
                        value:item?.id,
                        label:item?.cycleName
                    }
                 )))
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
        }
      
    }, [history, toSelectBusUnit, toSelectCompany])

    // TO SECTION
    useEffect(() => {
        if (!toSelectCountry) return;
        setToSelectCompany();
        setToSelectBusUnit();
        setToSelectCyclePeriod();
        FetchApiGet(`api/OldSystem/GetCompaniesByCountryId/${toSelectCountry.value}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 1) {
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
        if (!toSelectCompany || !toSelectYear) return;
        setToSelectBusUnit();
        setToSelectCyclePeriod();
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
                    if (data.length !== 0) {
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
    
    return (
        <>
            <GlobalModal
                size="lg"
                showModal={showModal}
                setShowModal={setShowModal}
                header={t('Duplicate')}
                toggle={() => setShowModal(!showModal)}
                body={
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
                }
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('Close')}
                        </Button>
                        <Button 
                        onClick={duplicateBtn}
                        variant="warning"
                        disabled={duplicateIsDisabled()}
                        >
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
