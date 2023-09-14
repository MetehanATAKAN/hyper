import React, { useEffect, useState } from 'react';
import Filter from '../../../../../components/Filter';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Filters = ({
    setApplyFilterData,
    selectYear,
    setSelectYear,
    selectCompany,
    setSelectCompany,
    selectBusUnit,
    setSelectBusUnit,
    selectGlobalBrand,
    setSelectGlobalBrand,
    selectPlace,
    setSelectPlace,
    selectPlaceType,
    setSelectPlaceType,
    selectTypeOfPriority,
    setSelectTypeOfPriority,
    selectClientType,
    setSelectClientType,
    selectSpec,
    setSelectSpec,
    selectWorkPlace,
    setSelectWorkPlace,
    selectClient,
    setSelectClient,
}) => {
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const countryId = localStorage.getItem('countryId');
    const companyId = localStorage.getItem('companyId');

    const [dropdowns, setDropdowns] = useState([]);
    const [dropdownsClient, setDropdownsClient] = useState([]);

    const [optionsYear, setOptionsYear] = useState([]);
    const [optionsCompany, setOptionsCompany] = useState([]);
    const [optionsGlobalBrand, setOptionsGlobalBrand] = useState([]);
    const [optionsSpec, setOptionsSpec] = useState([]);
    const [optionsBusUnit, setOptionsBusUnit] = useState([]);
    const [optionsPlace, setOptionsPlace] = useState([]);
    const [optionsPlaceType, setOptionsPlaceType] = useState([]);
    const [optionsTypeOfPriority, setOptionsTypeOfPriority] = useState([]);
    const [optionsClientType, setOptionsClientType] = useState([]);
    const [optionsWorkPlace, setOptionsWorkPlace] = useState([]);
    const [optionsClient, setOptionsClient] = useState([]);

    useEffect(() => {
        const body = {
            headerIds: [0],
            countryId: countryId,
            companyId: companyId,
        };
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', body).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => setDropdowns(data));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', body).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => setDropdownsClient(data));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [countryId, history, companyId]);
    useEffect(() => {
        if (dropdowns.length === 0) return;
        const arr = dropdowns.map((el) => {
            if (el.headerId === 0) {
                return el.id;
            }
            return el.headerId;
        });
        const data = {
            headerIds: [...arr, 120],
            countryId: countryId,
            defIds: [],
        };
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderIdandDefIds', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    const place = data?.filter((x) => x.headerId === 1);
                    const placeType = data?.filter((x) => x.headerId === 8);
                    const typeOfPriorit = data?.filter((x) => x.headerId === 15);
                    const client = data?.filter((x) => x.headerId === 22);
                    setOptionsPlace(place?.map((x) => ({ value: x.definationId, label: x.definationName })));
                    setOptionsPlaceType(placeType?.map((x) => ({ value: x.definationId, label: x.definationName })));
                    setOptionsTypeOfPriority(
                        typeOfPriorit?.map((x) => ({ value: x.definationId, label: x.definationName }))
                    );
                    setOptionsClientType(client?.map((x) => ({ value: x.definationId, label: x.definationName })));

                    setSelectPlace(place?.map((x) => ({ value: x.definationId, label: x.definationName })));
                    setSelectPlaceType(placeType?.map((x) => ({ value: x.definationId, label: x.definationName })));
                    setSelectTypeOfPriority(
                        typeOfPriorit?.map((x) => ({ value: x.definationId, label: x.definationName }))
                    );
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [dropdowns, history]);
    // year
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            return (
                                setOptionsYear(
                                    data.map((year) => ({
                                        value: year.Id,
                                        label: year.Val1,
                                    }))
                                ),
                                setSelectYear({
                                    value: new Date().getFullYear(),
                                    label: String(new Date().getFullYear()),
                                })
                            );
                        });
                    } else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    }, [history]);

    // company
    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET').then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            return (
                                setOptionsCompany(
                                    data.map((data) => ({
                                        value: data.CompanyId,
                                        label: data.CompanyName,
                                    }))
                                ),
                                setSelectCompany({
                                    value: data[0].CompanyId,
                                    label: data[0].CompanyName,
                                })
                            );
                        });
                    } else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    }, [empId, history]);

    // Bus unit
    useEffect(() => {
        if (!selectCompany || !selectYear) return;
        const data = { CompanyId: Number(selectCompany.value), Year: Number(selectYear.value) };
        FetchApiPost(`api/OldSystem/GetBusinessUnitCampaign`, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        if (data.length === 0) {
                            setOptionsBusUnit([]);
                            return setSelectBusUnit();
                        }
                        setSelectBusUnit({ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName });
                        setOptionsBusUnit(data?.map((x) => ({ value: x.BusinessUnitId, label: x.BusinessUnitName })));
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    }, [history, selectCompany, selectYear]);

    // global brand
    useEffect(() => {
        const condition = [
            !selectYear ? false : true,
            !selectCompany ? false : true,
            !selectBusUnit ? false : true,
            selectPlace.length === 0 ? false : true,
            selectPlaceType.length === 0 ? false : true,
            selectTypeOfPriority.length === 0 ? false : true,
        ];
        if (condition.some((x) => x === false)) return;
        const data = {
            companyId: selectCompany.value,
            yearIds: [selectYear.value],
            busIds: [selectBusUnit.value],
            specIds: selectSpec.length <= 0 ? [0] : selectSpec?.map((data) => data.value),
            clientTypeId: selectClientType ? selectClientType.value : 0,
            placeIds: selectPlace?.map((data) => data.value),
            placeTypeIds: selectPlaceType?.map((data) => data.value),
            typeOfPriorityIds: selectTypeOfPriority?.map((data) => data.value),
        };
        FetchApiPost('services/VisitMix/ProductStrategy/GetProductStrategyBrand', 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        if (data.length === 0) {
                            setOptionsGlobalBrand([]);
                            return setSelectGlobalBrand([]);
                        }
                        const arr = data.map((x) => ({ value: x.globalBrandId, label: x.globalBrandName }));
                        setSelectGlobalBrand(arr);
                        setOptionsGlobalBrand(arr);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    }, [
        history,
        selectBusUnit,
        selectClientType,
        selectCompany,
        selectPlace,
        selectPlaceType,
        selectSpec,
        selectTypeOfPriority,
        selectYear,
    ]);

    // spec
    useEffect(() => {
        const condition = [
            !selectYear ? false : true,
            !selectCompany ? false : true,
            !selectBusUnit ? false : true,
            selectPlace.length === 0 ? false : true,
            selectPlaceType.length === 0 ? false : true,
            selectTypeOfPriority.length === 0 ? false : true,
        ];
        if (condition.some((x) => x === false)) return;
        const data = {
            yearId: selectYear.value,
            companyId: selectCompany.value,
            businessUnitId: selectBusUnit.value,
            clientTypeId: selectClientType ? selectClientType.value : 0,
            placeIds: selectPlace?.map((data) => data.value),
            placeTypeIds: selectPlaceType?.map((data) => data.value),
            typeOfPriorityIds: selectTypeOfPriority?.map((data) => data.value),
        };
        FetchApiPost('services/VisitMix/ProductStrategy/GetProductStrategySpecialization', 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        if (data.length === 0) {
                            setOptionsSpec([]);
                            return setSelectSpec([]);
                        }
                        const arr = data.map((x) => ({ value: x.specId, label: x.specName }));
                        setOptionsSpec(arr);
                        setSelectSpec(arr);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    }, [
        history,
        selectBusUnit,
        selectClientType,
        selectCompany,
        selectPlace,
        selectPlaceType,
        selectTypeOfPriority,
        selectYear,
    ]);

    useEffect(() => {
        const condition = [
            !selectYear ? false : true,
            !selectCompany ? false : true,
            !selectBusUnit ? false : true,
            selectPlace.length === 0 ? false : true,
            selectPlaceType.length === 0 ? false : true,
            selectTypeOfPriority.length === 0 ? false : true,
        ];
        if (condition.some((x) => x === false)) return setApplyFilterData(null);
        if (selectClientType !== undefined && (selectSpec.length === 0 || selectGlobalBrand.length === 0))
            return setApplyFilterData(null);
        const data = {
            yearId: selectYear.value,
            empId: Number(empId),
            companyId: selectCompany.value,
            businessUnitId: selectBusUnit.value,
            placeIds: selectPlace?.map((data) => data.value),
            placeTypeIds: selectPlaceType?.map((data) => data.value),
            typeOfPriorityIds: selectTypeOfPriority?.map((data) => data.value),
            clientTypeId: selectClientType ? selectClientType.value : 0,
            specIds: selectSpec.length <= 0 ? [0] : selectSpec?.map((data) => data.value),
            clientId: selectClient ? selectClient.value : 0,
            workPlaceId: 0,
            brandIds: selectGlobalBrand?.map((data) => data.value),
        };
        setApplyFilterData(data);
    }, [
        empId,
        selectBusUnit,
        selectClient,
        selectClientType,
        selectCompany,
        selectGlobalBrand,
        selectPlace,
        selectPlaceType,
        selectSpec,
        selectTypeOfPriority,
        selectYear,
    ]);

    return (
        <div className="global-filter">
            <div className="global-filter-container">
                <div>
                    <SingleSelects
                        className="filter-radius"
                        labelClassName="label-filter"
                        label={'year'}
                        selectedItems={selectYear}
                        setSelectedItems={setSelectYear}
                        options={optionsYear}
                        width={'100%'}
                        size="small"
                    />
                </div>
                <div>
                    <SingleSelects
                        className="filter-radius"
                        labelClassName="label-filter"
                        label={'company'}
                        selectedItems={selectCompany}
                        setSelectedItems={setSelectCompany}
                        options={optionsCompany}
                        width={'100%'}
                        size="small"
                    />
                </div>
                <div>
                    <SingleSelects
                        className="filter-radius"
                        labelClassName="label-filter"
                        label={'business unit'}
                        selectedItems={selectBusUnit}
                        setSelectedItems={setSelectBusUnit}
                        options={optionsBusUnit}
                        width={'100%'}
                        size="small"
                    />
                </div>
                {dropdowns?.map((el) => {
                    if (el.headerId === 1 || el.id === 1) {
                        return (
                            <div>
                                <MultipleSelects
                                    className="filter-radius"
                                    labelClassName="label-filter"
                                    label={el.headerName}
                                    selectedItems={selectPlace}
                                    setSelectedItems={setSelectPlace}
                                    options={optionsPlace}
                                    width={'100%'}
                                    size="small"
                                />
                            </div>
                        );
                    }
                    if (el.headerId === 8 || el.id === 8) {
                        return (
                            <div>
                                <MultipleSelects
                                    className="filter-radius"
                                    labelClassName="label-filter"
                                    label={el.headerName}
                                    selectedItems={selectPlaceType}
                                    setSelectedItems={setSelectPlaceType}
                                    options={optionsPlaceType}
                                    width={'100%'}
                                    size="small"
                                />
                            </div>
                        );
                    }
                    if (el.headerId === 15 || el.id === 15) {
                        return (
                            <div>
                                <MultipleSelects
                                    className="filter-radius"
                                    labelClassName="label-filter"
                                    label={el.headerName}
                                    selectedItems={selectTypeOfPriority}
                                    setSelectedItems={setSelectTypeOfPriority}
                                    options={optionsTypeOfPriority}
                                    width={'100%'}
                                    size="small"
                                />
                            </div>
                        );
                    }
                })}
                <div>
                    <SingleSelects
                        className="filter-radius"
                        labelClassName="label-filter"
                        label={dropdownsClient[0]?.headerName}
                        selectedItems={selectClientType}
                        setSelectedItems={setSelectClientType}
                        options={optionsClientType}
                        width={'100%'}
                        size="small"
                    />
                </div>
                {selectClientType && (
                    <div>
                        <MultipleSelects
                            className="filter-radius"
                            labelClassName="label-filter"
                            label={'specialization'}
                            selectedItems={selectSpec}
                            setSelectedItems={setSelectSpec}
                            options={optionsSpec}
                            width={'100%'}
                            size="small"
                        />
                    </div>
                )}
                <div>
                    <MultipleSelects
                        className="filter-radius"
                        labelClassName="label-filter"
                        label={'global brand'}
                        selectedItems={selectGlobalBrand}
                        setSelectedItems={setSelectGlobalBrand}
                        options={optionsGlobalBrand}
                        width={'100%'}
                        size="small"
                    />
                </div>
                {selectClientType && (
                    <>
                        <div>
                            <SingleSelects
                                className="filter-radius"
                                labelClassName="label-filter"
                                label={'workplace'}
                                selectedItems={selectWorkPlace}
                                setSelectedItems={setSelectWorkPlace}
                                options={optionsWorkPlace}
                                width={'100%'}
                                size="small"
                            />
                        </div>
                        <div>
                            <SingleSelects
                                className="filter-radius"
                                labelClassName="label-filter"
                                label={'client'}
                                selectedItems={selectClient}
                                setSelectedItems={setSelectClient}
                                options={optionsClient}
                                width={'100%'}
                                size="small"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default React.memo(Filters);
