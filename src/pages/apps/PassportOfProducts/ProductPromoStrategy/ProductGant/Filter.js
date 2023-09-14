import React, { useEffect, useMemo, useState } from 'react';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import '../../../../../assets/scss/custom/components/gantTableFilter.scss';
import 'antd/dist/antd.css';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Filter = ({
    setIsLoading,
    setTableType,
    selectYear,
    setSelectYear,
    selectCompany,
    setSelectCompany,
    selectBusUnit,
    setSelectBusUnit,
    selectSpec,
    setSelectSpec,
    selectCategory,
    setSelectCategory,
    selectGlobalBrand,
    setSelectGlobalBrand,
    selectWorkPlace,
    setSelectWorkPlace,
    selectClient,
    setSelectClient,
    selectPlace,
    setSelectPlace,
    selectPlaceType,
    setSelectPlaceType,
    selectTypeOfPriority,
    setSelectTypeOfPriority,
    selectClientType,
    setSelectClientType,
}) => {
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const countryId = localStorage.getItem('countryId');
    const companyId = localStorage.getItem('companyId');
    const [radio2, setRadio2] = useState('all');
    const onChange2 = ({ target: { value } }) => {
        setTableType(value);
        setRadio2(value);
    };
    const radio2Options = [
        {
            label: 'all',
            value: 'all',
        },
        {
            label: 'profile',
            value: 'profile',
        },
        {
            label: 'need',
            value: 'need',
        },
        {
            label: 'p.subject',
            value: 'p.subject',
        },
    ];

    const [optionsYear, setOptionsYear] = useState([]);
    const [optionsCompany, setOptionsCompany] = useState([]);
    const [optionsBusUnit, setOptionsBusUnit] = useState([]);
    const [optionsSpec, setOptionsSpec] = useState([]);
    const [optionsCategory, setOptionsCategory] = useState([
        { value: 1, label: 'A' },
        { value: 2, label: 'B' },
        { value: 3, label: 'C' },
    ]);
    const [optionsGlobalBrand, setOptionsGlobalBrand] = useState([]);
    const [optionsPlace, setOptionsPlace] = useState([]);
    const [optionsPlaceType, setOptionsPlaceType] = useState([]);
    const [optionsTypeOfPriority, setOptionsTypeOfPriority] = useState([]);
    const [optionsClientType, setOptionsClientType] = useState([]);
    const [optionsWorkPlace, setOptionsWorkPlace] = useState([]);
    const [optionsClient, setOptionsClient] = useState([]);

    const [dropdowns, setDropdowns] = useState([]);
    const [dropdownsClient, setDropdownsClient] = useState([]);

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
            countryId: 1,
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
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectYear({ value: new Date().getFullYear(), label: new Date().getFullYear() });
                    setOptionsYear(data?.map((x) => ({ value: x.Id, label: x.Id })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
        FetchApiGet(`api/OldSystem/GetCompaniesProductStrategy/${empId}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectCompany({ value: data[0].CompanyId, label: data[0].CompanyName });
                    setOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history]);

    // GET BUS UNIT
    useEffect(() => {
        if (!selectCompany) return;
        const data = {
            empId: empId,
            month: new Date().getMonth(),
            year: selectYear?.value,
            ScmId: selectCompany?.value,
        };
        FetchApiPost('api/OldSystem/GetBusProductStrategy', 'POST', data).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectBusUnit({ value: data[0].Id, label: data[0].Val1 });
                    setOptionsBusUnit(data?.map((x) => ({ value: x.Id, label: x.Val1 })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [empId, history, selectCompany, selectYear]);

    // GET SPEC
    useEffect(() => {
        const condition = [!selectBusUnit ? true : false, !selectCompany ? true : false, !selectYear ? true : false];
        if (condition.some((x) => x === true)) return;
        const data = {
            yearId: selectYear?.value,
            companyId: selectCompany?.value,
            businessUnitId: selectBusUnit?.value,
            clientTypeId: selectClientType?.value,
            placeIds: selectPlace?.map((x) => x.value),
            placeTypeIds: selectPlaceType?.map((x) => x.value),
            typeOfPriorityIds: selectTypeOfPriority?.map((x) => x.value),
        };
        FetchApiPost('services/VisitMix/ProductStrategy/GetProductStrategySpecialization', 'POST', data).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then(({ data }) => {
                    const specs = data?.map((x) => ({ value: x.specId, label: x.specName }));
                    setSelectSpec(specs ?? []);
                    setOptionsSpec(specs ?? []);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
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

    // GET PRODUCT
    useEffect(() => {
        setSelectGlobalBrand([]);
        setOptionsGlobalBrand([]);
        const condition = [!selectBusUnit ? true : false, !selectYear ? true : false, selectSpec.length === 0];
        if (condition.some((x) => x === true)) return;
        const data = {
            year: selectYear?.value,
            BusId: selectBusUnit?.value,
            Quarters: [1, 2, 3, 4],
            SpecIds: selectSpec?.map((x) => Number(x.value)),
        };
        FetchApiPost('api/OldSystem/GetProductPrePlanFilter', 'POST', data)
            .then((res) => {
                if (res.status === 200 || 201) {
                    res.json().then((data) => {
                        const products = data?.map((x) => ({ value: x.ProductId, label: x.ProductName }));
                        setSelectGlobalBrand(products ?? []);
                        setOptionsGlobalBrand(products ?? []);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    }, [history, selectBusUnit, selectSpec, selectYear]);

    return (
        <div className="gant-filter-container">
            <Radio.Group options={radio2Options} onChange={onChange2} value={radio2} />
            <SingleSelects
                label={'year'}
                className="filter-radius"
                labelClassName="label-filter"
                selectedItems={selectYear}
                setSelectedItems={setSelectYear}
                options={optionsYear}
                size="small"
                width="8rem"
                isSortable={false}
            />
            <SingleSelects
                label={'company'}
                className="filter-radius"
                labelClassName="label-filter"
                selectedItems={selectCompany}
                setSelectedItems={setSelectCompany}
                options={optionsCompany}
                size="small"
                width="8rem"
            />
            <SingleSelects
                label={'business unit'}
                className="filter-radius"
                labelClassName="label-filter"
                selectedItems={selectBusUnit}
                setSelectedItems={setSelectBusUnit}
                options={optionsBusUnit}
                size="small"
                width="8rem"
            />
            {dropdowns?.map((el) => {
                if (el.headerId === 1 || el.id === 1) {
                    return (
                        <MultipleSelects
                            className="filter-radius"
                            labelClassName="label-filter"
                            label={el.headerName}
                            selectedItems={selectPlace}
                            setSelectedItems={setSelectPlace}
                            options={optionsPlace}
                            width="8rem"
                            size="small"
                        />
                    );
                }
                if (el.headerId === 8 || el.id === 8) {
                    return (
                        <MultipleSelects
                            className="filter-radius"
                            labelClassName="label-filter"
                            label={el.headerName}
                            selectedItems={selectPlaceType}
                            setSelectedItems={setSelectPlaceType}
                            options={optionsPlaceType}
                            width="8rem"
                            size="small"
                        />
                    );
                }
                if (el.headerId === 15 || el.id === 15) {
                    return (
                        <MultipleSelects
                            className="filter-radius"
                            labelClassName="label-filter"
                            label={el.headerName}
                            selectedItems={selectTypeOfPriority}
                            setSelectedItems={setSelectTypeOfPriority}
                            options={optionsTypeOfPriority}
                            width="8rem"
                            size="small"
                        />
                    );
                }
            })}
            <SingleSelects
                className="filter-radius"
                labelClassName="label-filter"
                label={dropdownsClient[0]?.headerName}
                selectedItems={selectClientType}
                setSelectedItems={setSelectClientType}
                options={optionsClientType}
                width="8rem"
                size="small"
            />
            {selectClientType && (
                <MultipleSelects
                    className="filter-radius"
                    labelClassName="label-filter"
                    label={'specialization'}
                    selectedItems={selectSpec}
                    setSelectedItems={setSelectSpec}
                    options={optionsSpec}
                    width="8rem"
                    size="small"
                />
            )}
            <MultipleSelects
                className="filter-radius"
                labelClassName="label-filter"
                label={'global brand'}
                selectedItems={selectGlobalBrand}
                setSelectedItems={setSelectGlobalBrand}
                options={optionsGlobalBrand}
                width="8rem"
                size="small"
            />
            {selectClientType && (
                <>
                    <SingleSelects
                        className="filter-radius"
                        labelClassName="label-filter"
                        label={'workplace'}
                        selectedItems={selectWorkPlace}
                        setSelectedItems={setSelectWorkPlace}
                        options={optionsWorkPlace}
                        width="8rem"
                        size="small"
                    />
                    <SingleSelects
                        className="filter-radius"
                        labelClassName="label-filter"
                        label={'client'}
                        selectedItems={selectClient}
                        setSelectedItems={setSelectClient}
                        options={optionsClient}
                        width="8rem"
                        size="small"
                    />
                </>
            )}
            <MultipleSelects
                label={'category'}
                className="filter-radius"
                labelClassName="label-filter"
                selectedItems={selectCategory}
                setSelectedItems={setSelectCategory}
                options={optionsCategory}
                size="small"
                width="8rem"
            />
        </div>
    );
};

export default Filter;
