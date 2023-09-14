import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NewButton from './NewButton';
import NewButton2 from './NewButton2';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import ModalTable from './ModalTable';
import { useRef } from 'react';
import { conditionFunc } from '../../Materials/Materials';

const NewModal = ({ showModal, setShowModal, applyBudgetFilter }) => {
    const { t } = useTranslation();
    const [newModalPage, setNewModalPage] = useState(1);
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    // PAGE 1
    const companyRef = useRef(0);
    const yearRef = useRef(0);
    const currencyRef = useRef(0);
    const departmentRef = useRef(0);
    const plRef = useRef(0);
    const groupRef = useRef(0);
    const costRef = useRef(0);
    const [yearlyUseSwitch, setYearlyUseSwitch] = useState(false);
    const [procurementSwitch, setProcurementSwitch] = useState(false);
    const [positionSwitch, setPositionSwitch] = useState(false);
    const [quantitySwitch, setQuantitySwitch] = useState(false);
    const [selectCurrency, setSelectCurrency] = useState({ id: 0, value: 'Currency', label: t('Currency') });
    const [selectYear, setSelectYear] = useState({ id: 0, value: 'Year', label: t('Year') });
    const [selectCompany, setSelectCompany] = useState({ id: 0, value: 'Company', label: t('Company') });
    const [selectDepartment, setSelectDepartment] = useState({ id: 0, value: 'Department', label: t('Department') });
    const [selectPosition, setSelectPosition] = useState({ id: 0, value: 'Position', label: t('Position') });
    const [selectPL, setSelectPL] = useState({ id: 0, value: 'P&L', label: 'P&L' });
    const [selectAccountGroup, setSelectAccountGroup] = useState({
        id: 0,
        value: 'Account Group',
        label: t('Account Group'),
    });
    const [selectAccountCost, setSelectAccountCost] = useState({
        id: 0,
        value: 'Account Cost',
        label: t('Account Cost'),
    });
    const [optionsCurrency, setOptionsCurrency] = useState([]);
    const [optionsYear, setOptionsYear] = useState([]);
    const [optionsCompany, setOptionsCompany] = useState([]);
    const [optionsDepartment, setOptionsDepartment] = useState([]);
    const [optionsPosition, setOptionsPosition] = useState([]);
    const [optionsPL, setOptionsPL] = useState([]);
    const [optionsAccountGroup, setOptionsAccountGroup] = useState([]);
    const [optionsAccountCost, setOptionsAccountCost] = useState([]);

    // PAGE 2
    const [radios, setRadios] = useState({ radio1: true, radio2: false });
    const [selectMainCategory, setSelectMainCategory] = useState({
        id: 0,
        value: 'Main Category',
        label: t('Main Category'),
    });
    const [selectCategory, setSelectCategory] = useState({ id: 0, value: 'Category', label: t('Category') });
    const [selectCategorySub1, setSelectCategorySub1] = useState({
        id: 0,
        value: 'Category 1',
        label: t('Category Sub 1'),
    });
    const [selectCategorySub2, setSelectCategorySub2] = useState({
        id: 0,
        value: 'Category 2',
        label: t('Category Sub 2'),
    });
    const [selectCategorySub3, setSelectCategorySub3] = useState({
        id: 0,
        value: 'Category 3',
        label: t('Category Sub 3'),
    });
    const [selectServiceMaterial, setSelectServiceMaterial] = useState({
        id: 0,
        value: 'ServiceOrMaterial',
        label: t('Material'),
    });
    const [serviceMaterialInput, setServiceMaterialInput] = useState('');
    const [technicalInfoInput, setTechnicalInfoInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [optionsMainCategory, setOptionsMainCategory] = useState([]);
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [optionsCategorySub1, setOptionsCategorySub1] = useState([]);
    const [optionsCategorySub2, setOptionsCategorySub2] = useState([]);
    const [optionsCategorySub3, setOptionsCategorySub3] = useState([]);
    const [optionsServiceMaterial, setOptionsServiceMaterial] = useState([]);
    //PAGE 3
    const [monthsPrice, setMonthsPrice] = useState({
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0,
    });
    const [monthsQuantity, setMonthsQuantity] = useState({
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0,
    });

    const createdBy = localStorage.getItem('userName');
    const empId = localStorage.getItem('userEmpId');
    const toggle = () => {
        setShowModal(!showModal);
    };
    const newModalNextBtn = () => {
        switch (newModalPage) {
            case 1:
                const page1ConditionalArr = [
                    selectCompany.id === 0,
                    selectYear.id === 0,
                    selectCurrency.id === 0,
                    selectDepartment.id === 0,
                    selectPL.id === 0,
                    selectAccountGroup.id === 0,
                    selectAccountCost.id === 0,
                ];
                conditionFunc(page1ConditionalArr, statusPage1, setStatusPage1);
                if (page1ConditionalArr.every((x) => x === false)) {
                    setNewModalPage(2);
                }
                break;
            case 2:
                const page2ConditionalArr = [selectMainCategory.id === 0, selectCategory.id === 0];
                conditionFunc(page2ConditionalArr, statusPage2, setStatusPage2);
                if (page2ConditionalArr.every((x) => x === false)) {
                    if (radios.radio1 === true) {
                        if (selectServiceMaterial.id !== 0) {
                            setNewModalPage(3);
                        }
                    }
                    if (radios.radio2 === true) {
                        if (serviceMaterialInput !== '') {
                            setNewModalPage(3);
                        }
                    }
                }
                break;
            default:
                break;
        }
    };
    const newModalBackBtn = () => {
        switch (newModalPage) {
            case 3:
                setNewModalPage(2);
                break;
            case 2:
                setNewModalPage(1);
                break;
            default:
                break;
        }
    };
    const userYear = new Date().getFullYear();
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        setSelectYear({ id: userYear, value: userYear, label: userYear }),
                        setOptionsYear(json?.map((el) => ({ id: el.Id, value: el.Val1, label: el.Val1 })))
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
                        setSelectCompany({
                            id: json[0].CompanyId,
                            value: json[0].CompanyName,
                            label: json[0].CompanyName,
                        }),
                        setOptionsCompany(
                            json?.map((el) => ({ id: el.CompanyId, value: el.CompanyName, label: el.CompanyName }))
                        )
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
                res.json().then((json) =>
                    setOptionsPL(json?.map((el) => ({ id: el.Id, value: el.Val1, label: el.Val1 })))
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsPL([]);
            }
        });
        FetchApiGet('api/OldSystem/GetAccountGroup', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((json) =>
                    setOptionsAccountGroup(json?.map((el) => ({ id: el.Id, value: el.Val1, label: el.Val1 })))
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsAccountGroup([]);
            }
        });

        // PAGE 2
        FetchApiGet('services/Material/MainCategory/GetAllMainCategory', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsMainCategory(data?.map((el) => ({ id: el.id, value: el.name, label: el.name })))
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsMainCategory([]);
            }
        });
    }, []);
    useEffect(() => {
        if (selectCompany.id === 0) return;
        const data = { scmId: Number(selectCompany.id) };
        FetchApiGet(`api/OldSystem/GetCurrencyByScmId?scmId=${Number(selectCompany.id)}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        setSelectCurrency({ id: json[0].Id, value: json[0].Val1, label: json[0].Val1 }),
                        setOptionsCurrency(json?.map((el) => ({ id: el.Id, value: el.Val1, label: el.Val1 })))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsCurrency([]);
            }
        });
    }, [selectCompany]);
    useEffect(() => {
        if (selectCompany.id === 0) return;
        const data = { companyIds: [selectCompany.id] };
        FetchApiPost(`services/Hr/CompanyDepartment/GetDepartmentsByCompanyIds`, 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsDepartment(
                        data?.map((el) => ({ id: el.id, value: el.departmentName, label: el.departmentName }))
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
        if (selectCompany.id === 0 && selectDepartment.id === 0) return;

        let departmentIds = [selectDepartment.id];

        FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds ', 'POST', [...departmentIds]).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsPosition(
                        data?.map((el) => ({ id: el.id, value: el.positionName, label: el.positionName }))
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
        if (selectAccountGroup.id === 0) return;
        const data = { accountGroupIds: selectAccountGroup.id };
        FetchApiPost('api/OldSystem/GetAccountCostCenter', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then((json) =>
                    setOptionsAccountCost(
                        json?.map((el) => ({
                            id: el.Id,
                            value: `${el.Val1} / ${el.Val2}`,
                            label: `${el.Val1} / ${el.Val2}`,
                        }))
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsAccountCost([]);
            }
        });
    }, [selectAccountGroup]);

    useEffect(() => {
        if (selectMainCategory.id === 0) return;
        setSelectCategory({ id: 0, value: 'Category', label: t('Category') });
        setSelectCategorySub1({ id: 0, value: 'Category 1', label: t('Category Sub 1') });
        setSelectCategorySub2({ id: 0, value: 'Category 2', label: t('Category Sub 2') });
        setSelectCategorySub3({ id: 0, value: 'Category 3', label: t('Category Sub 3') });
        setSelectServiceMaterial({ id: 0, value: 'ServiceOrMaterial', label: t('Material') });
        setOptionsCategory([]);
        setOptionsCategorySub1([]);
        setOptionsCategorySub2([]);
        setOptionsCategorySub3([]);
        setOptionsServiceMaterial([]);
        const data = { mainCategoryIds: [Number(selectMainCategory.id)] };
        FetchApiPost('services/Material/Category/GetCategoryByMainCategoryId', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsCategory(data?.map((el) => ({ id: el.id, value: el.name, label: el.name })))
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsCategory([]);
            }
        });
    }, [selectMainCategory]);
    useEffect(() => {
        if (selectCategory.id === 0) return;
        setSelectCategorySub1({ id: 0, value: 'Category 1', label: t('Category Sub 1') });
        setSelectCategorySub2({ id: 0, value: 'Category 2', label: t('Category Sub 2') });
        setSelectCategorySub3({ id: 0, value: 'Category 3', label: t('Category Sub 3') });
        setSelectServiceMaterial({ id: 0, value: 'ServiceOrMaterial', label: t('Material') });
        setOptionsCategorySub1([]);
        setOptionsCategorySub2([]);
        setOptionsCategorySub3([]);
        setOptionsServiceMaterial([]);
        const data = { categoryIds: [selectCategory.id] };
        FetchApiPost('services/Material/CategoryFirstSub/GetCategoryFirstSubsByCategoryId', 'POST', data).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) =>
                        setOptionsCategorySub1(data.map((el) => ({ id: el.id, value: el.name, label: el.name })))
                    );
                }
            }
        );
    }, [selectCategory]);
    useEffect(() => {
        if (selectCategorySub1.id === 0) return;
        setSelectCategorySub2({ id: 0, value: 'Category 2', label: t('Category Sub 2') });
        setSelectCategorySub3({ id: 0, value: 'Category 3', label: t('Category Sub 3') });
        setSelectServiceMaterial({ id: 0, value: 'ServiceOrMaterial', label: t('Material') });
        setOptionsCategorySub2([]);
        setOptionsCategorySub3([]);
        setOptionsServiceMaterial([]);
        const data = {
            categoryFirstSubIds: [selectCategorySub1.id],
        };
        FetchApiPost(
            'services/Material/CategorySecondSub/GetCategorySecondSubsByCategoryFirstSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsCategorySub2(data.map((el) => ({ id: el.id, value: el.name, label: el.name })))
                );
            }
        });
    }, [selectCategorySub1]);
    useEffect(() => {
        if (selectCategorySub2.id === 0) return;
        setSelectCategorySub3({ id: 0, value: 'Category 3', label: t('Category Sub 3') });
        setSelectServiceMaterial({ id: 0, value: 'ServiceOrMaterial', label: t('Material') });
        setOptionsCategorySub3([]);
        setOptionsServiceMaterial([]);
        const data = {
            categorySecondSubIds: [selectCategorySub2.id],
        };
        FetchApiPost(
            'services/Material/CategoryThirdSub/GetCategoryThirdSubsByCategorySecondSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsCategorySub3(data.map((el) => ({ id: el.id, value: el.name, label: el.name })))
                );
            }
        });
    }, [selectCategorySub2]);
    useEffect(() => {
        setSelectAccountCost({ id: 0, value: 'Account Cost', label: t('Account Cost') });
    }, [selectAccountGroup]);

    useEffect(() => {
        if (selectCategory.id === 0) return;
        setSelectServiceMaterial({ id: 0, value: 'ServiceOrMaterial', label: t('Material') });
        const data = {
            categoryIds: [Number(selectCategory.id)],
            firstCategoryIds: selectCategorySub1.id !== 0 ? [Number(selectCategorySub1.id)] : [],
            secondCategoryIds: selectCategorySub2.id !== 0 ? [Number(selectCategorySub2.id)] : [],
            thirdCategoryIds: selectCategorySub3.id !== 0 ? [Number(selectCategorySub3.id)] : [],
        };
        FetchApiPost('services/Material/MaterialOrServices/GetMaterialOrServicesByFilterIds', 'POST', data).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) =>
                        setOptionsServiceMaterial(data.map((el) => ({ id: el.id, value: el.name, label: el.name })))
                    );
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            }
        );
    }, [history, selectCategory, selectCategorySub1, selectCategorySub2, selectCategorySub3]);

    const switchProp = [
        {
            label: 'Yearly Use',
            state: yearlyUseSwitch,
            setState: setYearlyUseSwitch,
            tooltip: 'Amounts added monthly to this ACC can be used throughout the year',
        },
        {
            label: 'Quantity',
            state: quantitySwitch,
            setState: setQuantitySwitch,
            tooltip: 'The cost must have the quantity to purchase',
        },
        {
            label: 'Procurement Request',
            state: procurementSwitch,
            setState: setProcurementSwitch,
            tooltip: 'The cost or price requires clarification on procurement',
        },
    ];
    const [statusPage1, setStatusPage1] = useState([
        {
            id: 0,
            status: 'default',
        },
        {
            id: 1,
            status: 'default',
        },
        {
            id: 2,
            status: 'default',
        },
        {
            id: 3,
            status: 'default',
        },
        {
            id: 4,
            status: 'default',
        },
        {
            id: 5,
            status: 'default',
        },
        {
            id: 6,
            status: 'default',
        },
    ]);
    const [statusPage2, setStatusPage2] = useState([
        {
            id: 0,
            status: 'default',
        },
        {
            id: 1,
            status: 'default',
        },
    ]);
    const modalDropdownStatesPage1 = [
        {
            label: 'Company',
            options: optionsCompany,
            state: selectCompany,
            setState: setSelectCompany,
            ref: companyRef,
        },
        {
            label: 'Year',
            options: optionsYear,
            state: selectYear,
            setState: setSelectYear,
            ref: yearRef,
        },
        {
            label: 'Currency',
            options: optionsCurrency,
            state: selectCurrency,
            setState: setSelectCurrency,
            ref: currencyRef,
        },
        {
            label: 'Department',
            options: optionsDepartment,
            state: selectDepartment,
            setState: setSelectDepartment,
            ref: departmentRef,
        },
        {
            label: 'Position',
            options: optionsPosition,
            state: selectPosition,
            setState: setSelectPosition,
        },
        {
            label: 'P&L',
            options: optionsPL,
            state: selectPL,
            setState: setSelectPL,
            ref: plRef,
        },
        {
            label: 'Account Group',
            options: optionsAccountGroup,
            state: selectAccountGroup,
            setState: setSelectAccountGroup,
            ref: groupRef,
        },
        {
            label: 'Account Cost',
            options: optionsAccountCost,
            state: selectAccountCost,
            setState: setSelectAccountCost,
            ref: costRef,
        },
    ];
    const modalDropdownStatesPage2 = [
        {
            label: 'Main Category',
            options: optionsMainCategory,
            state: selectMainCategory,
            setState: setSelectMainCategory,
        },
        { label: 'Category', options: optionsCategory, state: selectCategory, setState: setSelectCategory },
        {
            label: 'Category Sub 1',
            options: optionsCategorySub1,
            state: selectCategorySub1,
            setState: setSelectCategorySub1,
        },
        {
            label: 'Category Sub 2',
            options: optionsCategorySub2,
            state: selectCategorySub2,
            setState: setSelectCategorySub2,
        },
        {
            label: 'Category Sub 3',
            options: optionsCategorySub3,
            state: selectCategorySub3,
            setState: setSelectCategorySub3,
        },
        {
            label: 'Service Or Material',
            options: optionsServiceMaterial,
            state: selectServiceMaterial,
            setState: setSelectServiceMaterial,
        },
    ];

    const saveBudgetBtn = () => {
        setLoading(true);
        const data = {
            companyId: selectCompany.id,
            companyName: selectCompany.value,
            yearId: selectYear.id,
            currencyId: selectCurrency.id,
            currencyAbb: selectCurrency.value,
            departmentId: selectDepartment.id,
            departmentName: selectDepartment.value,
            yearlyUseStatus: yearlyUseSwitch,
            quantityStatus: quantitySwitch,
            positionStatus: positionSwitch,
            positionId: selectPosition.id,
            positionName: selectPosition.value,
            plSectionId: selectPL.id,
            plSectionName: selectPL.value,
            accountGroupId: selectAccountGroup.id,
            accountGroupName: selectAccountGroup.value,
            accountCostCenterId: selectAccountCost.id,
            accountCostCenterName: selectAccountCost.value,
            procurmentStatus: procurementSwitch,
            materialStatus: 0,
            materialId: radios.radio1 === true ? selectServiceMaterial.id : 0,
            materialName: radios.radio1 === true ? selectServiceMaterial.value : serviceMaterialInput,
            materialMainCategoryId: selectMainCategory.id,
            materialMainCategoryName: selectMainCategory.value,
            materialCategoryId: selectCategory.id,
            materialCategoryName: selectCategory.value,
            materialCategory1Id: selectCategorySub1.id,
            materialCategory1Name: selectCategorySub1.value,
            materialCategory2Id: selectCategorySub2.id,
            materialCategory2Name: selectCategorySub2.value,
            materialCategory3Id: selectCategorySub3.id,
            materialCategory3Name: selectCategorySub3.value,
            technicalInfo: technicalInfoInput,
            description: descriptionInput,
            budgetStatus: 1,
            createdBy: createdBy,
            detail: Object.keys(monthsPrice).map((el, i) => ({
                monthId: i + 1,
                price: monthsPrice[el],
                quantity: monthsQuantity[el],
            })),
        };
        FetchApiPost('services/Budget/Budget/SaveBudget', 'POST', data)
            .then((res) => {
                if (res.status === 201) {
                    setLoading(false);
                    applyBudgetFilter();
                    setShowModal(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Modal
                show={showModal}
                onHide={toggle}
                size={newModalPage === 3 ? 'xl' : 'md'}
                id="budget-modal"
                backdrop="static"
                className={newModalPage === 3 && 'large-budget'}>
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}>
                        {t('Add Budget')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    {newModalPage === 1 && (
                        <NewButton
                            modalDropdownStates={modalDropdownStatesPage1}
                            switchProp={switchProp}
                            positionSwitch={positionSwitch}
                            setPositionSwitch={setPositionSwitch}
                            statusPage1={statusPage1}
                        />
                    )}
                    {newModalPage === 2 && (
                        <NewButton2
                            modalDropdownStates={modalDropdownStatesPage2}
                            radios={radios}
                            setRadios={setRadios}
                            serviceMaterialInput={serviceMaterialInput}
                            setServiceMaterialInput={setServiceMaterialInput}
                            technicalInfoInput={technicalInfoInput}
                            setTechnicalInfoInput={setTechnicalInfoInput}
                            descriptionInput={descriptionInput}
                            setDescriptionInput={setDescriptionInput}
                            statusPage2={statusPage2}
                        />
                    )}
                    {newModalPage === 3 && (
                        <ModalTable
                            selectYear={selectYear}
                            quantitySwitch={quantitySwitch}
                            monthsPrice={monthsPrice}
                            setMonthsPrice={setMonthsPrice}
                            monthsQuantity={monthsQuantity}
                            setMonthsQuantity={setMonthsQuantity}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }}>
                    {newModalPage === 1 && (
                        <Button onClick={() => setShowModal(false)} variant="light">
                            {t('Cancel')}
                        </Button>
                    )}
                    {newModalPage !== 1 && (
                        <Button onClick={newModalBackBtn} variant="light">
                            {t('Back')}
                        </Button>
                    )}
                    {newModalPage !== 3 && (
                        <Button onClick={newModalNextBtn} variant="primary">
                            {t('Next')}
                        </Button>
                    )}
                    {newModalPage === 3 && (
                        <Button disabled={isLoading} variant="primary" onClick={saveBudgetBtn}>
                            {isLoading ? <Spinner animation="border" size="sm" variant="light" /> : t('Save')}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default React.memo(NewModal);
