import React, { useEffect } from 'react';
import { useState } from 'react';
import BudgetTab from './Budget';
import '../../../assets/scss/custom/budget/budgetTab.scss';
import Quatity from './Quatity';
import UnitePrice from './UnitePrice';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import Tab from '../../../components/Tab';
import BreadCrumb from '../../../components/BreadCrumb';

const Budget = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const [selectedTab, setSelectedTab] = useState({
        label: t('Budget'),
        key: 0,
    });
    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Budgeting', url: '/apps/budget' },
        { label: `Department ${selectedTab.label}` },
    ];
    const tabProps = [
        {
            label: t('Budget'),
            key: 0,
        },
        {
            label: t('Quantity'),
            key: 1,
        },
        {
            label: t('Unite Price'),
            key: 2,
        },
    ];
    const [showNewModal, setShowNewModal] = useState(false);
    const [loader, setLoader] = useState(false);

    const newButton = () => {
        setShowNewModal(true);
    };
    const [selectCurrency, setSelectCurrency] = useState({ value: 0, label: t('Currency') });
    const [selectYear, setSelectYear] = useState([]);
    const [selectCompany, setSelectCompany] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState([]);
    const [selectPosition, setSelectPosition] = useState([]);
    const [selectPL, setSelectPL] = useState([]);
    const [selectAccountGroup, setSelectAccountGroup] = useState([]);
    const [selectAccountCost, setSelectAccountCost] = useState([]);
    const [selectBudgetType, setSelectBudgetType] = useState([
        { value: 1, label: t('Yearly Use') },
        { value: 2, label: t('Monthly Use') },
    ]);
    const [selectStatus, setSelectStatus] = useState([
        { value: 1, label: t('Edit') },
        { value: 2, label: t('Approval') },
        { value: 3, label: t('Approved') },
        { value: 4, label: t('Reject') },
        { value: 5, label: t('Precurement') },
    ]);
    const [optionsCurrency, setOptionsCurrency] = useState([]);
    const [optionsYear, setOptionsYear] = useState([]);
    const [optionsCompany, setOptionsCompany] = useState([]);
    const [optionsDepartment, setOptionsDepartment] = useState([]);
    const [optionsPosition, setOptionsPosition] = useState([]);
    const [optionsPL, setOptionsPL] = useState([]);
    const [optionsAccountGroup, setOptionsAccountGroup] = useState([]);
    const [optionsAccountCost, setOptionsAccountCost] = useState([]);
    const optionsBudgetType = [
        { value: 1, label: t('Yearly Use') },
        { value: 2, label: t('Monthly Use') },
    ];
    const optionsStatus = [
        { value: 1, label: t('Edit') },
        { value: 2, label: t('Approval') },
        { value: 3, label: t('Approved') },
        { value: 4, label: t('Reject') },
        { value: 5, label: t('Precurement') },
    ];
    const [budgetData, setBudgetData] = useState([]);
    const [detailDataQuantity, setDetailDataQuantity] = useState([]);
    const [detailDataUnitPrice, setDetailDataUnitPrice] = useState([]);
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllCurrency', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((json) => setOptionsCurrency(json?.map((el) => ({ value: el.Id, label: el.Val1 }))));
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsCurrency([]);
            }
        });
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        setSelectYear(json?.map((el) => ({ value: el.Id, label: el.Val1 }))),
                        setOptionsYear(json?.map((el) => ({ value: el.Id, label: el.Val1 })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsYear([]);
            }
        });
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        setSelectCompany(json?.map((el) => ({ value: el.CompanyId, label: el.CompanyName }))),
                        setOptionsCompany(json?.map((el) => ({ value: el.CompanyId, label: el.CompanyName })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsCompany([]);
            }
        });
        FetchApiGet('api/OldSystem/GetPLSection', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        setSelectPL(json?.map((el) => ({ value: el.Id, label: el.Val1 }))),
                        setOptionsPL(json?.map((el) => ({ value: el.Id, label: el.Val1 })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsPL([]);
            }
        });
        FetchApiGet('api/OldSystem/GetAccountGroup', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        setSelectAccountGroup(json?.map((el) => ({ value: el.Id, label: el.Val1 }))),
                        setOptionsAccountGroup(json?.map((el) => ({ value: el.Id, label: el.Val1 })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsAccountGroup([]);
            }
        });
    }, []);
    useEffect(() => {
        if (selectCompany.length === 0) return;
        const data = { companyIds: selectCompany?.map((x) => Number(x.value)) };
        FetchApiPost(`services/Hr/CompanyDepartment/GetDepartmentsByCompanyIds`, 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectDepartment(
                            data?.map((el) => ({
                                value: el.id,
                                label: el.departmentName,
                            }))
                        ),
                        setOptionsDepartment(data?.map((el) => ({ value: el.id, label: el.departmentName })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsDepartment([]);
            }
        });
    }, [selectCompany]);
    useEffect(() => {
        if (selectCompany.length === 0 && selectDepartment.length === 0) return;

        let departmentIds = selectDepartment?.map((x) => Number(x.value));

        FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds', 'POST', [...departmentIds]).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectPosition(data?.map((el) => ({ value: el.id, label: el.positionName }))),
                        setOptionsPosition(data?.map((el) => ({ value: el.id, label: el.positionName })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsPosition([]);
            }
        });
    }, [selectCompany, selectDepartment]);

    useEffect(() => {
        if (selectAccountGroup.length === 0) return;
        const data = { accountGroupIds: selectAccountGroup?.map((x) => x.value).join(', ') };
        FetchApiPost('api/OldSystem/GetAccountCostCenter', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        setSelectAccountCost(
                            json?.map((el) => ({
                                value: el.Id,
                                label: `${el.Val1} / ${el.Val2}`,
                            }))
                        ),
                        setOptionsAccountCost(json?.map((el) => ({ value: el.Id, label: `${el.Val1} / ${el.Val2}` })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsAccountCost([]);
            }
        });
    }, [selectAccountGroup]);
    const filterComponentsData = [
        {
            label: 'currency',
            options: optionsCurrency,
            state: selectCurrency,
            setState: setSelectCurrency,
            type: 'singleselect',
        },
        { label: 'year', options: optionsYear, state: selectYear, setState: setSelectYear },
        { label: 'company', options: optionsCompany, state: selectCompany, setState: setSelectCompany },
        { label: 'department', options: optionsDepartment, state: selectDepartment, setState: setSelectDepartment },
        { label: 'position', options: optionsPosition, state: selectPosition, setState: setSelectPosition },
        { label: 'p&l', options: optionsPL, state: selectPL, setState: setSelectPL },
        {
            label: 'account group',
            options: optionsAccountGroup,
            state: selectAccountGroup,
            setState: setSelectAccountGroup,
        },
        {
            label: 'account cost',
            options: optionsAccountCost,
            state: selectAccountCost,
            setState: setSelectAccountCost,
        },
        { label: 'budget type', options: optionsBudgetType, state: selectBudgetType, setState: setSelectBudgetType },
        { label: 'status', options: optionsStatus, state: selectStatus, setState: setSelectStatus },
    ];
    const applyBudgetFilter = () => {
        setLoader(true);
        const data = {
            isCompare: selectCurrency.value === 0 ? false : true,
            currencyId: selectCurrency.value === 0 ? 0 : selectCurrency.value,
            yearList: selectYear?.map((x) => Number(x.value)),
            companyList: selectCompany?.map((x) => Number(x.value)),
            departmentList: selectDepartment?.map((x) => Number(x.value)),
            positionList: selectPosition?.map((x) => Number(x.value)),
            pandLList: selectPL?.map((x) => Number(x.value)),
            accountGroupList: selectAccountGroup?.map((x) => Number(x.value)),
            accountCostCenterList: selectAccountCost?.map((x) => Number(x.value)),
            budgetTypeList: selectBudgetType?.map((x) => Number(x.value)),
            statusList: selectStatus?.map((x) => Number(x.value)),
        };
        FetchApiPost('services/Budget/Budget/GetAllBudget', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then((json) => {
                    setLoader(false);
                    setBudgetData(json.data);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setLoader(false);
                setBudgetData([]);
            }
        });
    };
    const clearFilter = () => {
        setSelectCurrency({ value: 0, label: 'Currency' });
        setSelectYear([]);
        setSelectCompany([]);
        setSelectDepartment([]);
        setSelectPosition([]);
        setSelectPL([]);
        setSelectAccountGroup([]);
        setSelectAccountCost([]);
        setSelectBudgetType([]);
        setSelectStatus([]);
    };
    useEffect(() => {
        const arrQuantity = budgetData
            ?.filter((x) => x.quantityStatus !== false)
            ?.map((el, i) =>
                el.detail?.map((item, idx) => ({
                    budgetId: el.budgetId,
                    monthId: item.monthId,
                    price: item.price,
                    quantity: item.quantity,
                    disabled: item.disableStatus,
                }))
            );
        setDetailDataQuantity(arrQuantity);
        const arrPrice = budgetData?.map((el, i) =>
            el.detail?.map((item, idx) => ({
                budgetId: el.budgetId,
                monthId: item.monthId,
                price: item.price,
                quantity: item.quantity,
                disabled: item.disableStatus,
            }))
        );

        setDetailDataUnitPrice(arrPrice);
    }, [budgetData]);

    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab
                selectTab={selectedTab}
                setSelectTab={setSelectedTab}
                tabProps={tabProps}
                isNewBtn
                newBtnClick={newButton}
            />
            {selectedTab.key === 0 && (
                <BudgetTab
                    showNewModal={showNewModal}
                    setShowNewModal={setShowNewModal}
                    filterComponentsData={filterComponentsData}
                    applyBudgetFilter={applyBudgetFilter}
                    budgetData={budgetData}
                    setBudgetData={setBudgetData}
                    clearFilter={clearFilter}
                    loader={loader}
                />
            )}
            {selectedTab.key === 1 && (
                <Quatity
                    showNewModal={showNewModal}
                    setShowNewModal={setShowNewModal}
                    filterComponentsData={filterComponentsData}
                    budgetData={budgetData}
                    setBudgetData={setBudgetData}
                    applyBudgetFilter={applyBudgetFilter}
                    clearFilter={clearFilter}
                    detailData={detailDataQuantity}
                    setDetailData={setDetailDataQuantity}
                    loader={loader}
                />
            )}
            {selectedTab.key === 2 && (
                <UnitePrice
                    showNewModal={showNewModal}
                    setShowNewModal={setShowNewModal}
                    filterComponentsData={filterComponentsData}
                    budgetData={budgetData}
                    setBudgetData={setBudgetData}
                    applyBudgetFilter={applyBudgetFilter}
                    clearFilter={clearFilter}
                    detailData={detailDataUnitPrice}
                    setDetailData={setDetailDataUnitPrice}
                    loader={loader}
                />
            )}
        </>
    );
};

export default React.memo(Budget);
