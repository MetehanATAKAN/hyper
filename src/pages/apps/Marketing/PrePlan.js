import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { MultiSelect } from 'react-multi-select-component';
import { select } from 'redux-saga/effects';
import { data } from '../../../redux/prePlanTable/actions';
import Loading from '../../../components/Loading';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';

const PrePlan = () => {
    // const dispatch=useDispatch();
    // const counter = useSelector((state) => state.PrePlanTable);
    // console.log(counter);
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(true);
    const [isPrePlanTableOpen, setIsPrePlanOpen] = useState(false);

    const openCollapse = () => {
        setIsOpen(!isOpen);
    };

    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const openEditColumns = () => {
        setIsOpenEdit(!isOpenEdit);
    };

    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(true);
    const [isChecked3, setIsChecked3] = useState(true);
    const [isChecked4, setIsChecked4] = useState(true);
    const [isChecked5, setIsChecked5] = useState(true);
    const [isChecked6, setIsChecked6] = useState(true);

    const editColumnsInputClick1 = () => {
        if (isChecked1 === false) {
            setIsChecked1(true);
        } else {
            setIsChecked1(false);
        }

        if (isChecked1 && isChecked2) {
            setIsChecked2(!isChecked2);
        } else if (isChecked1 && !isChecked2) {
            setIsChecked2(false);
        } else {
            setIsChecked2(true);
        }

        if (isChecked1 && isChecked3) {
            setIsChecked3(!isChecked3);
        } else if (isChecked1 && !isChecked3) {
            setIsChecked3(false);
        } else {
            setIsChecked3(true);
        }

        if (isChecked1 && isChecked4) {
            setIsChecked4(!isChecked4);
        } else if (isChecked1 && !isChecked4) {
            setIsChecked4(false);
        } else {
            setIsChecked4(true);
        }

        if (isChecked1 && isChecked5) {
            setIsChecked5(!isChecked5);
        } else if (isChecked1 && !isChecked5) {
            setIsChecked5(false);
        } else {
            setIsChecked5(true);
        }

        if (isChecked1 && isChecked6) {
            setIsChecked6(!isChecked6);
        } else if (isChecked1 && !isChecked6) {
            setIsChecked6(false);
        } else {
            setIsChecked6(true);
        }
    };
    const editColumnsInputClick2 = () => {
        if (isChecked2 === false) {
            setIsChecked2(true);
        } else {
            setIsChecked2(false);
        }
    };
    const editColumnsInputClick3 = () => {
        if (isChecked3 === false) {
            setIsChecked3(true);
        } else {
            setIsChecked3(false);
        }
    };
    const editColumnsInputClick4 = () => {
        if (isChecked4 === false) {
            setIsChecked4(true);
        } else {
            setIsChecked4(false);
        }
    };
    const editColumnsInputClick5 = () => {
        if (isChecked5 === false) {
            setIsChecked5(true);
        } else {
            setIsChecked5(false);
        }
    };
    const editColumnsInputClick6 = () => {
        if (isChecked6 === false) {
            setIsChecked6(true);
        } else {
            setIsChecked6(false);
        }
    };

    //Companies
    const [companiesDatas, setCompaniesDatas] = useState([]);
    const [selectCompanies, setSelectCompanies] = useState([]);
    //{value : 247, label : "UZBEKISTAN RO"}
    const changeCompanies = (event) => {
        setSelectCompanies({ label: event.label, value: event.value });
    };
    //Years
    const [yearsDatas, setYearsDatas] = useState([]);
    const [selectYears, setSelectYears] = useState({
        value: new Date().getFullYear(),
        label: new Date().getFullYear(),
    });
    const changeYears = (event) => {
        setSelectYears({ label: event.label, value: event.value });
        setSelectBusinessUnite([]);
    };
    //Business Unite
    const [businessUniteDatas, setBusinessUniteDatas] = useState([]);
    const [selectBusinessUnite, setSelectBusinessUnite] = useState([]);
    const changeBusinessUnite = (event) => {
        setSelectBusinessUnite({ label: event.label, value: event.value });
    };
    //Quarter
    const quarterDatas = [
        {
            value: 1,
            label: 'I',
        },
        {
            value: 2,
            label: 'II',
        },
        {
            value: 3,
            label: 'III',
        },
        {
            value: 4,
            label: 'IV',
        },
    ];
    const [selectQuarter, setSelectQuarter] = useState(['I', 'II', 'III', 'IV']);
    const [selectQuarterId, setSelectQuarterId] = useState([1, 2, 3, 4]);
    const changeQuarter = (event) => {
        setSelectQuarter(Array.isArray(event) ? event.map((x) => x.label) : []);
        setSelectQuarterId(Array.isArray(event) ? event.map((x) => x.value) : []);
    };

    //Specialization
    const [specializationDatas, setSpecializationDatas] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState([]);
    const [selectSpecializationId, setSelectSpecializationId] = useState([]);

    const changeSpecialization = (event) => {
        setSelectSpecialization(Array.isArray(event) ? event.map((x) => x.label) : []);
        setSelectSpecializationId(Array.isArray(event) ? event.map((x) => x.value) : []);
    };

    //Organization
    const [organizationsDatas, setOrganizationsDatas] = useState([]);
    const [selectOrganizations, setSelectOrganizations] = useState([]);
    const [selectOrganizationsId, setSelectOrganizationsId] = useState([]);

    const changeOrganizations = (event) => {
        setSelectOrganizations(Array.isArray(event) ? event.map((x) => x.label) : []);
        setSelectOrganizationsId(Array.isArray(event) ? event.map((x) => x.value) : []);
    };
    //Category
    const categoryDatas = [
        {
            value: 1,
            label: 'A',
        },
        {
            value: 2,
            label: 'B',
        },
        {
            value: 3,
            label: 'C',
        },
    ];
    const [selectCategory, setSelectCategory] = useState([]);

    const changeCategory = (event) => {
        setSelectCategory(Array.isArray(event) ? event.map((x) => x.label) : []);
    };
    const empId = localStorage.getItem('userEmpId');
    useEffect(() => {
        //country
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
            .then((response) => response.json())
            .then((response) => {
                setCompaniesDatas(response.map((data) => ({ value: data.CompanyId, label: data.CompanyName })));
                response.map((data) => setSelectCompanies({ value: data.CompanyId, label: data.CompanyName }));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        //years
        FetchApiGet('api/OldSystem/GetYear', 'GET')
            .then((response) => response.json())
            .then((response) => {
                setYearsDatas(response.map((index) => ({ value: index.Id, label: index.Val1 })));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        //organization type
        FetchApiGet('api/OldSystem/GetOrganization', 'GET')
            .then((response) => response.json())
            .then((response) => {
                setOrganizationsDatas(response.map((index) => ({ value: index.Id, label: index.Val1 })));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [empId]);

    useEffect(() => {
        //business unit
        const bussinessBody = {
            empId: empId,
            scmId: selectCompanies.value,
            year: selectYears.value,
        };
        FetchApiPost('api/OldSystem/GetBussinessVisitMix', 'POST', bussinessBody)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setBusinessUniteDatas(response.map((data) => ({ value: data.Id, label: data.Val1 })));
                response.map((data) => setSelectBusinessUnite({ value: data.Id, label: data.Val1 }));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [empId, selectCompanies, selectYears]);

    useEffect(() => {
        const specBody = {
            busId: selectBusinessUnite.value,
            year: selectYears.value,
        };
        FetchApiPost('api/OldSystem/GetSpec', 'POST', specBody)
            .then((response) => response.json())
            .then((response) => {
                setSpecializationDatas(response.map((index) => ({ value: index.Id, label: index.Val1 })));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [selectBusinessUnite, selectYears]);

    const [productPrePlanApi, setProductPrePlanApi] = useState([]);
    const [productPlanTableData, setProductPlanTableData] = useState([]);
    console.log(productPlanTableData);
    //pre plan table loading state
    const [prePlanTableLoading, setPrePlanTableLoading] = useState(false);

    const apply = () => {
        setIsOpen(false);
        setPrePlanTableLoading(true);
        setIsPrePlanOpen(false);
        const GetProductPrePlan = {
            Year: selectYears.value,
            Quarters: selectQuarterId,
            SpecIds: selectSpecializationId,
            BusId: selectBusinessUnite.value,
        };
        const productPlanTableData1 = {
            CountryId: selectCompanies.value,
            BusinessUnitId: selectBusinessUnite.value,
            Year: selectYears.value,
            Quarters: selectQuarterId,
            SpecIds: selectSpecializationId,
            Categories: selectCategory,
            OrganizationTypeIds: selectOrganizationsId,
        };
        console.log(productPlanTableData1);
        //setIsPrePlanOpen(true);
        //brand name
        FetchApiPost('api/OldSystem/GetProductPrePlanFilter', 'POST', GetProductPrePlan)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setProductPrePlanApi(response);
            })
            .catch((err) => {
                console.log('Error=>', err);
            });
        //pre plan table data
        FetchApiPost('services/VisitMix/GetPrePlan', 'POST', productPlanTableData1)
            .then((response) => response.json())
            .then((response) => {
                setPrePlanTableLoading(false);
                setIsPrePlanOpen(true);
                setProductPlanTableData(response);
            })
            .catch((err) => {
                console.log('Error=>', err);
            });
    };
    const prePlanTableFilter = (e) => {
        // //console.log(e.target.value);
        // console.log(productPlanTableData.data.td.includes(117));
    };
    // select delete
    const deleteSelect = () => {
        setSelectYears([]);
        setSelectQuarter([]);
        setSelectCompanies([]);
        setSelectBusinessUnite([]);
        setSelectSpecialization([]);
        setSelectOrganizations([]);
        setSelectCategory([]);
    };

    return (
        <>
            <div className="new-table-header-cont">
                <div className="mt-2 mb-2">
                    <div className="new-table-title1">
                        <span>{t('Pre-plan')}</span>
                    </div>
                    <div className="new-table-title2">
                        <span>
                            {t('Marketing')} / {t('Visit Mix')} / {t('Pre-plan for Business Unite Alpha')}
                        </span>
                    </div>
                </div>
                <Col className="text-end table-header-btn-cont">
                    <Button variant="white" type="submit" className="btn btn-white table-header-btn">
                        <i className="dripicons-broadcast" />
                    </Button>
                </Col>
            </div>
            <Card>
                <div className="pre-plan-card-main-cont mx-1">
                    <div className="pre-plan-card-left">
                        <input onChange={prePlanTableFilter} placeholder={t('search')} type="search"></input>
                        <i className="uil-search pre-plan-search-icon"></i>
                    </div>
                    <div className="pre-plan-card-right">
                        <div>
                            <Button
                                variant="white"
                                type="submit"
                                className={
                                    isOpenEdit
                                        ? 'btn btn-white me-1 pre-plan-table-btn2-1'
                                        : 'btn btn-white me-1 pre-plan-table-btn2'
                                }
                                onClick={openEditColumns}>
                                {t('edit columns')}
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="secondary"
                                type="submit"
                                className="btn btn-secondary pre-plan-table-btn3"
                                onClick={openCollapse}>
                                {t('filter')} <i className="uil-sort pre-plan-filter-icon" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="pre-plan-table-top-cont">
                    <Col className="pre-plan-table-btn-cont">
                        <div className="pre-plan-columns-cont">
                            {isOpenEdit ? (
                                <div className="pre-plan-columns-dropdown-main-cont pre-plan-columns-dropdown-cont-scrollbar">
                                    <div className="pre-plan-columns-dropdown-cont">
                                        <div
                                            className={
                                                isChecked1
                                                    ? 'pre-plan-columns-dropdown-div1 pre-plan-columns-dropdown-div'
                                                    : 'pre-plan-columns-dropdown-div1'
                                            }
                                            onClick={editColumnsInputClick1}>
                                            <input type="checkbox" className="form-check-input" checked={isChecked1} />{' '}
                                            <span>{t('Select All')}</span>
                                        </div>
                                        <div
                                            className={
                                                isChecked2
                                                    ? 'pre-plan-columns-dropdown-div1 pre-plan-columns-dropdown-div'
                                                    : 'pre-plan-columns-dropdown-div1'
                                            }
                                            onClick={editColumnsInputClick2}>
                                            <input type="checkbox" className="form-check-input" checked={isChecked2} />{' '}
                                            <span>{t('Priority')}</span>
                                        </div>
                                        <div
                                            className={
                                                isChecked3
                                                    ? 'pre-plan-columns-dropdown-div1 pre-plan-columns-dropdown-div'
                                                    : 'pre-plan-columns-dropdown-div1'
                                            }
                                            onClick={editColumnsInputClick3}>
                                            <input type="checkbox" className="form-check-input" checked={isChecked3} />{' '}
                                            <span>{t('Promo type')}</span>
                                        </div>
                                        <div
                                            className={
                                                isChecked4
                                                    ? 'pre-plan-columns-dropdown-div1 pre-plan-columns-dropdown-div'
                                                    : 'pre-plan-columns-dropdown-div1'
                                            }
                                            onClick={editColumnsInputClick4}>
                                            <input type="checkbox" className="form-check-input" checked={isChecked4} />{' '}
                                            <span>JUN</span>
                                        </div>
                                        <div
                                            className={
                                                isChecked5
                                                    ? 'pre-plan-columns-dropdown-div1 pre-plan-columns-dropdown-div'
                                                    : 'pre-plan-columns-dropdown-div1'
                                            }
                                            onClick={editColumnsInputClick5}>
                                            <input type="checkbox" className="form-check-input" checked={isChecked5} />{' '}
                                            <span>JUL</span>
                                        </div>
                                        <div
                                            className={
                                                isChecked6
                                                    ? 'pre-plan-columns-dropdown-div1 pre-plan-columns-dropdown-div'
                                                    : 'pre-plan-columns-dropdown-div1'
                                            }
                                            onClick={editColumnsInputClick6}>
                                            <input type="checkbox" className="form-check-input" checked={isChecked6} />{' '}
                                            <span>AUG</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Col>
                </div>

                <Card.Body>
                    {isOpen ? (
                        <div className="pre-plan-collapse-main-cont mb-2">
                            <div className="mb-2 mt-2">
                                <div className="px-3 pre-plan-collapse-select-cont">
                                    <div className="pre-plan-first-collapse">
                                        <div className="pre-plan-collapse-item1">
                                            <h5>{t('years')}</h5>
                                            <Select
                                                isMulti={false}
                                                options={yearsDatas}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="select"
                                                onChange={changeYears}
                                                value={selectYears}
                                            />
                                        </div>
                                        <div className="pre-plan-collapse-item2">
                                            <h5>{t('quarter')}</h5>
                                            <MultiSelect
                                                options={quarterDatas}
                                                value={quarterDatas.filter((obj) => selectQuarter.includes(obj.label))}
                                                onChange={changeQuarter}
                                                labelledBy="Select"
                                                overrideStrings={{
                                                    allItemsAreSelected: t('All items are selected.'),
                                                    noOptions: t('No options'),
                                                    search: t('Search'),
                                                    selectAll: t('Select All'),
                                                    selectSomeItems: t('Select...'),
                                                }}
                                            />
                                        </div>
                                        <div className="pre-plan-collapse-item3">
                                            <h5>{t('country')}</h5>
                                            <Select
                                                isMulti={false}
                                                options={companiesDatas}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="select"
                                                onChange={changeCompanies}
                                                value={selectCompanies}
                                            />
                                        </div>
                                        <div className="pre-plan-collapse-item4">
                                            <h5>{t('business unit')}</h5>
                                            <Select
                                                isMulti={false}
                                                options={businessUniteDatas}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="select"
                                                onChange={changeBusinessUnite}
                                                value={selectBusinessUnite}
                                            />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="pre-plan-second-collapse">
                                        <div className="pre-plan-collapse-item7">
                                            <h5>{t('specialization')}</h5>
                                            <MultiSelect
                                                options={specializationDatas}
                                                value={specializationDatas.filter((obj) =>
                                                    selectSpecialization.includes(obj.label)
                                                )}
                                                onChange={changeSpecialization}
                                                labelledBy="Select"
                                                overrideStrings={{
                                                    allItemsAreSelected: t('All items are selected.'),
                                                    noOptions: t('No options'),
                                                    search: t('Search'),
                                                    selectAll: t('Select All'),
                                                    selectSomeItems: t('Select...'),
                                                }}
                                            />
                                        </div>
                                        <div className="pre-plan-collapse-item7">
                                            <h5>{t('organization type')}</h5>
                                            <MultiSelect
                                                options={organizationsDatas}
                                                value={organizationsDatas.filter((obj) =>
                                                    selectOrganizations.includes(obj.label)
                                                )}
                                                onChange={changeOrganizations}
                                                labelledBy="Select"
                                                overrideStrings={{
                                                    allItemsAreSelected: t('All items are selected.'),
                                                    noOptions: t('No options'),
                                                    search: t('Search'),
                                                    selectAll: t('Select All'),
                                                    selectSomeItems: t('Select...'),
                                                }}
                                            />
                                        </div>
                                        <div className="pre-plan-collapse-item7">
                                            <h5>{t('category')}</h5>
                                            <MultiSelect
                                                options={categoryDatas}
                                                value={categoryDatas.filter((obj) =>
                                                    selectCategory.includes(obj.label)
                                                )}
                                                onChange={changeCategory}
                                                labelledBy="Select"
                                                overrideStrings={{
                                                    allItemsAreSelected: t('All items are selected.'),
                                                    noOptions: t('No options'),
                                                    search: t('Search'),
                                                    selectAll: t('Select All'),
                                                    selectSomeItems: t('Select...'),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pre-plan-collapse-buttons-cont">
                                <Row className="px-3">
                                    <Col className="text-end mt-2 mb-2">
                                        <Button
                                            onClick={() => apply()}
                                            variant="primary"
                                            type="submit"
                                            className="btn btn-primary me-1 pre-plan-collapse-btn1">
                                            {t('apply')}
                                        </Button>
                                        <Button
                                            variant="gray"
                                            type="submit"
                                            className="btn btn-gray me-1 pre-plan-collapse-btn2">
                                            {t('cancel')}
                                        </Button>
                                        <Button
                                            onClick={() => deleteSelect()}
                                            variant="danger"
                                            type="submit"
                                            className="btn btn-danger pre-plan-collapse-btn3">
                                            <i className="dripicons-brush" />
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ) : null}
                    {isPrePlanTableOpen === true ? (
                        <div className="pre-plan-main">
                            <div className="pre-plan-main-table">
                                <div className="top-pre-plan-container">
                                    <div className="top-pre-plan-container-line1">
                                        <div className="top-pre-plan-container-line1-left">
                                            <span>{t('TOTAL VISIT')}</span>
                                        </div>
                                        <div className="top-pre-plan-container-line1-right">
                                            {productPrePlanApi.length !== 0
                                                ? productPrePlanApi.map((index, i) => <span key={i}></span>)
                                                : null}
                                        </div>
                                    </div>
                                    <div className="top-pre-plan-container-line2">
                                        <div className="top-pre-plan-container-line2-left">
                                            <span>{t('TOTAL FULL VISIT')}</span>
                                        </div>
                                        <div className="top-pre-plan-container-line2-right">
                                            {productPrePlanApi.length !== 0
                                                ? productPrePlanApi.map((index, i) => <span key={i}></span>)
                                                : null}
                                        </div>
                                    </div>
                                    <div className="top-pre-plan-container-line2">
                                        <div className="top-pre-plan-container-line2-left">
                                            <span>{t('REMAINING FULL VISIT')}</span>
                                        </div>
                                        <div className="top-pre-plan-container-line2-right">
                                            {productPrePlanApi.length !== 0
                                                ? productPrePlanApi.map((index, i) => <span key={i}></span>)
                                                : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="pre-plan-content-title-container">
                                    <div className="pre-plan-content-title-left">
                                        <span>{t('YEAR')}</span>
                                        <span>{t('SPECIALIZATION')}</span>
                                        <span>{t('CTG')}</span>
                                        <span>{t('O.TYPE')}</span>
                                        <span>{t('T.D.')}</span>
                                        <span>{t('FRQ.')}</span>
                                    </div>
                                    <div className="pre-plan-content-title-right">
                                        {productPrePlanApi.length !== 0
                                            ? productPrePlanApi.map((index, i) => (
                                                  <Tippy
                                                      key={i}
                                                      arrow={false}
                                                      className="pre-plan-tooltip"
                                                      content={index.ProductName}>
                                                      <span id={i}>{index.ShortName}</span>
                                                  </Tippy>
                                              ))
                                            : null}
                                    </div>
                                </div>
                                {productPlanTableData.length !== 0
                                    ? productPlanTableData.data.map((data, i) => (
                                          <div key={i} className="pre-plan-content-container">
                                              <div className="pre-plan-content-left">
                                                  <div>
                                                      <span>{`${data.year}/Q${data.quarter}`}</span>
                                                  </div>
                                                  <div>
                                                      <span>{data.specName}</span>
                                                  </div>
                                                  <div>
                                                      <span>{data.category}</span>
                                                  </div>
                                                  <div>
                                                      <span>{data.organizationTypeName}</span>
                                                  </div>
                                                  <div>
                                                      <span>{data.td}</span>
                                                  </div>
                                                  <div>
                                                      <span>{data.frequency}</span>
                                                  </div>
                                              </div>
                                              <div className="pre-plan-content-right">
                                                  <div className="pre-plan-content-right-cell">
                                                      {productPrePlanApi.map((index, i) => (
                                                          <span key={i}>{data.products[i].p1}</span>
                                                      ))}
                                                  </div>
                                                  <div className="pre-plan-content-right-cell">
                                                      {productPrePlanApi.map((index, i) => (
                                                          <span key={i}>{data.products[i].p2}</span>
                                                      ))}
                                                  </div>
                                                  <div className="pre-plan-content-right-cell">
                                                      {productPrePlanApi.map((index, i) => (
                                                          <span key={i}>{data.products[i].p3}</span>
                                                      ))}
                                                  </div>
                                                  <div className="pre-plan-content-right-cell">
                                                      {productPrePlanApi.map((index, i) => (
                                                          <span key={i}>{data.products[i].n1}</span>
                                                      ))}
                                                  </div>
                                                  <div className="pre-plan-content-right-cell">
                                                      {productPrePlanApi.map((index, i) => (
                                                          <span key={i}>{data.products[i].n2}</span>
                                                      ))}
                                                  </div>
                                                  <div className="pre-plan-content-right-cell">
                                                      {productPrePlanApi.map((index, i) => (
                                                          <span key={i}>{data.products[i].n3}</span>
                                                      ))}
                                                  </div>
                                              </div>
                                          </div>
                                      ))
                                    : null}
                            </div>
                        </div>
                    ) : null}
                </Card.Body>
            </Card>
            <Loading loading={prePlanTableLoading} />
        </>
    );
};

export default PrePlan;
