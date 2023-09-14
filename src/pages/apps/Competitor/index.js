import { mdiCheck, mdiClose, mdiDeleteSweepOutline, mdiEyeOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import BreadCrumb from '../../../components/BreadCrumb';
import Dropdowns from '../../../components/Dropdowns';
import SendIcon from '../../../components/Icons/SendIcon';
import Tab from '../../../components/Tab';
import { statusApprovalOptions, statusApprovedOptions, statusRedactOptions, statusRejectOptions } from './Status';
import { MultipleSelects } from '../../../components/GlobalNew/Selects';
import Table from './Table';
import GlobalModal from '../../../components/GlobalNew/Modal';
import Body from './AddModal';
import EditModal from './EditModal/index';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useEffect } from 'react';
import { conditionFunc } from '../Materials/Materials';
import SendAction from './Actions/SendAction';
import DosageModal from './DosageModal';
import Delete from './Actions/Delete';
import Reject from './Actions/Reject';
import Duplicates from './Actions/Duplicate';
import FailModal from '../../../components/FailModal';
import { Spin } from 'antd';
import CloseWithoutSaving from '../../../components/Modals/CloseWithoutSaving';
const Filter = ({
    selectProductFilter,
    setSelectProductFilter,
    optionsProductFilter,
    selectCompetitorMfFilter,
    setSelectCompetitorMfFilter,
    optionsCompetitorMfFilter,
    statusArr,
    applyFilter,
    clearFilter,
    setCloseFilter,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                columnGap: '8px',
                marginBottom: '16px',
            }}>
            <MultipleSelects
                label="product"
                className="filter-radius"
                selectedItems={selectProductFilter}
                setSelectedItems={setSelectProductFilter}
                options={optionsProductFilter}
                size="small"
                status={statusArr[0].status}
                width="20%"
            />
            <MultipleSelects
                label="competitor manufacturer"
                className="filter-radius"
                selectedItems={selectCompetitorMfFilter}
                setSelectedItems={setSelectCompetitorMfFilter}
                options={optionsCompetitorMfFilter}
                size="small"
                status={statusArr[1].status}
                width="20%"
            />
            <div className="filter-select-buttons">
                <Icon
                    onClick={applyFilter}
                    className="filter-button-icons"
                    path={mdiCheck}
                    size={1}
                    color={'#0ACF97'}
                />
                <Icon
                    path={mdiDeleteSweepOutline}
                    onClick={clearFilter}
                    className="filter-button-icons"
                    size={1}
                    color={'#FA5C7C'}
                />
                <Icon
                    path={mdiClose}
                    onClick={() => setCloseFilter(true)}
                    size={1}
                    color={'#6C757D'}
                    className="filter-button-icons"
                />
            </div>
        </div>
    );
};
const Competitor = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [selectTab, setSelectTab] = useState({ key: 0, label: 'Competitor' });
    const [closeFilter, setCloseFilter] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loaderEdit, setLoaderEdit] = useState(false);
    const [error, setError] = useState('');
    const [actionItem, setActionItem] = useState({ id: 0, statusId: 99, name: '' });
    const [modalPage, setModalPage] = useState(1);
    const [mfSwitch, setMfSwitch] = useState(false);
    const createdBy = localStorage.getItem('userName');
    const [data, setData] = useState([]);
    // Mf = Manufacturer
    const [copy, setCopy] = useState({
        countryForUse: [],
        competitorSellerCountry: [],
        competitorSeller: undefined,
        optionsCompetitorSellerCopy: [],
    });
    const [copyDataContainer, setCopyDataContainer] = useState([]);
    const [dosageData, setDosageData] = useState([]);
    // FİLTER STATES
    const [selectProductFilter, setSelectProductFilter] = useState([]);
    const [optionsProductFilter, setOptionsProductFilter] = useState([]);

    const [selectCompetitorMfFilter, setSelectCompetitorMfFilter] = useState([]);
    const [optionsCompetitorMfFilter, setOptionsCompetitorMfFilter] = useState([]);

    // MODAL STATES
    const [competitorBrandInput, setCompetitorBrandInput] = useState('');
    const [optionsCompetitorBrand, setOptionsCompetitorBrand] = useState([]);

    const [selectCompetitorMaterials, setSelectCompetitorMaterials] = useState([]);
    const [optionsCompetitorMaterials, setOptionsCompetitorMaterials] = useState([]);

    const [selectCompetitorForm, setSelectCompetitorForm] = useState([]);
    const [optionsCompetitorForm, setOptionsCompetitorForm] = useState([]);

    const [selectPackingForm, setSelectPackingForm] = useState([]);
    const [optionsPackingForm, setOptionsPackingForm] = useState([]);

    const [selectCompetitorMfCountry, setSelectCompetitorMfCountry] = useState();
    const [optionsCompetitorMfCountry, setOptionsCompetitorMfCountry] = useState([]);

    const [selectCompetitorMf, setSelectCompetitorMf] = useState();
    const [optionsCompetitorMf, setOptionsCompetitorMf] = useState([]);

    const [selectCountryForUse, setSelectCountryForUse] = useState([]);
    const [optionsCountryForUse, setOptionsCountryForUse] = useState([]);

    const [selectCompetitorSellerCountry, setSelectCompetitorSellerCountry] = useState();
    const [optionsCompetitorSellerCountry, setOptionsCompetitorSellerCountry] = useState([]);

    const [selectCompetitorSeller, setSelectCompetitorSeller] = useState();
    const [optionsCompetitorSeller, setOptionsCompetitorSeller] = useState([]);

    const [selectOurProduct, setSelectOurProduct] = useState([]);
    const [optionsOurProduct, setOptionsOurProduct] = useState([]);
    const modalPage1States = [
        { state: competitorBrandInput, setState: setCompetitorBrandInput, options: optionsCompetitorBrand },
        {
            state: selectCompetitorMaterials,
            setState: setSelectCompetitorMaterials,
            options: optionsCompetitorMaterials,
        },
        { state: selectCompetitorForm, setState: setSelectCompetitorForm, options: optionsCompetitorForm },
        { state: selectPackingForm, setState: setSelectPackingForm, options: optionsPackingForm },
        {
            state: selectCompetitorMfCountry,
            setState: setSelectCompetitorMfCountry,
            options: optionsCompetitorMfCountry,
        },
        { state: selectCompetitorMf, setState: setSelectCompetitorMf, options: optionsCompetitorMf },
        { state: selectCountryForUse, setState: setSelectCountryForUse, options: optionsCountryForUse },
        {
            state: selectCompetitorSellerCountry,
            setState: setSelectCompetitorSellerCountry,
            options: optionsCompetitorSellerCountry,
        },
        { state: selectCompetitorSeller, setState: setSelectCompetitorSeller, options: optionsCompetitorSeller },
        { state: selectOurProduct, setState: setSelectOurProduct, options: optionsOurProduct },
    ];
    const [modalPage1Status, setModalPage1Status] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
        { id: 6, status: 'default' },
        { id: 7, status: 'default' },
    ]);
    const [filterStatus, setFilterStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const reset = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setModalPage(1);
        setCompetitorBrandInput('');
        setSelectCompetitorMaterials([]);
        setSelectCompetitorForm([]);
        setSelectPackingForm([]);
        setSelectCompetitorMfCountry();
        setSelectCompetitorMf([]);
        setSelectCountryForUse([]);
        setSelectCompetitorSellerCountry();
        setSelectCompetitorSeller([]);
        setSelectOurProduct([]);
        setCopyDataContainer([]);
        setDosageData([]);
        setModalPage1Status([
            { id: 0, status: 'default' },
            { id: 1, status: 'default' },
            { id: 2, status: 'default' },
            { id: 3, status: 'default' },
            { id: 4, status: 'default' },
            { id: 5, status: 'default' },
            { id: 6, status: 'default' },
            { id: 7, status: 'default' },
        ]);
    };
    const toggle = () => {
        if (modalPage === 2) {
            setShowQuestionModal(true);
        } else {
            reset();
        }
    };
    const getAllMaterials = () => {
        FetchApiGet('services/Material/MaterialOrServices/GetAllMaterialOrServices', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsCompetitorMaterials(data?.map((el) => ({ value: el.id, label: el.name })))
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const getFormByMaterialId = () => {
        FetchApiGet('services/Material/Form/GetAllForm', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setOptionsPackingForm(data?.map((el, i) => ({ value: el.id, label: el.formName }))),
                        setOptionsCompetitorForm(data?.map((el, i) => ({ value: el.id, label: el.formName })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const getAllCountries = () => {
        FetchApiGet('api/OldSystem/GetAllCountries', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (data) => (
                        setOptionsCompetitorSellerCountry(
                            data?.map((el) => ({ value: el.CountryId, label: el.CountryName }))
                        ),
                        setOptionsCountryForUse(data?.map((el) => ({ value: el.CountryId, label: el.CountryName }))),
                        setOptionsCompetitorMfCountry(
                            data?.map((el) => ({ value: el.CountryId, label: el.CountryName }))
                        )
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const getAllManufacturer = () => {
        FetchApiGet('services/Material/Competitor/GetAllManufacturer', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsCompetitorMf(data?.map((el) => ({ value: el.manufacturerId, label: el.manufacturer })))
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const getManufacturer = (id) => {
        FetchApiGet(`services/Material/Competitor/GetManufacturerByCountryId?id=${id}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsCompetitorMf(data?.map((el) => ({ value: el.manufacturerId, label: el.manufacturer })))
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const getCompetitorSeller = (id) => {
        FetchApiPost('services/Material/Competitor/GetSellerByCountryId', 'POST', id).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsCompetitorSeller(data?.map((el) => ({ value: el.sellerId, label: el.sellerName })))
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const getAllProduct = (id) => {
        FetchApiGet(`api/OldSystem/GetAllGlobalBrands`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (data) => (
                        setSelectProductFilter(
                            data?.map((el) => ({ value: el.GlobalBrandId, label: el.GlobalBrandName }))
                        ),
                        setOptionsProductFilter(
                            data?.map((el) => ({ value: el.GlobalBrandId, label: el.GlobalBrandName }))
                        ),
                        setOptionsOurProduct(
                            data?.map((el) => ({ value: el.GlobalBrandId, label: el.GlobalBrandName }))
                        )
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const getManufactureFilter = (id) => {
        FetchApiPost(`services/Material/Competitor/GetManufacturerByProductId`, 'POST', id).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectCompetitorMfFilter(
                            data?.map((el) => ({ value: el.manufacturerId, label: el.manufacturer }))
                        ),
                        setOptionsCompetitorMfFilter(
                            data?.map((el) => ({ value: el.manufacturerId, label: el.manufacturer }))
                        )
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    useEffect(() => {
        getAllMaterials();
        getAllCountries();
        getAllProduct();
        getAllManufacturer();
    }, []);

    useEffect(() => {
        setSelectCompetitorForm([]);
        setSelectPackingForm([]);
        if (selectCompetitorMaterials.length === 0) return;
        getFormByMaterialId();
    }, [selectCompetitorMaterials]);

    useEffect(() => {
        if (!selectCompetitorMfCountry) return;
        getManufacturer(selectCompetitorMfCountry.value);
    }, [selectCompetitorMfCountry]);

    useEffect(() => {
        if (!selectCountryForUse) return;
        if (selectCountryForUse.length === 0) return;
        const countryIds = selectCountryForUse?.map((el) => el.value);
        getCompetitorSeller(countryIds);
    }, [selectCountryForUse]);

    useEffect(() => {
        if (mfSwitch) {
            setSelectCompetitorSeller(selectCompetitorMf);
            if (selectCompetitorMfCountry) {
                setSelectCompetitorSellerCountry(selectCompetitorMfCountry);
            }
        }
    }, [mfSwitch, selectCompetitorMf, selectCompetitorMfCountry]);

    // FİLTER API
    useEffect(() => {
        if (selectProductFilter.length === 0) return;
        const productIds = selectProductFilter?.map((el) => el.value);
        getManufactureFilter(productIds);
    }, [selectProductFilter]);

    useEffect(() => {
        setSelectCompetitorMfFilter([]);
    }, [selectProductFilter]);

    const applyFilter = () => {
        const condition = [selectProductFilter.length === 0, selectCompetitorMfFilter.length === 0];
        conditionFunc(condition, filterStatus, setFilterStatus);
        if (condition.some((x) => x === true)) return;
        setLoader(true);
        const filterIds = {
            productIds: selectProductFilter?.map((el) => el.value),
            competitorManufacturerIds: selectCompetitorMfFilter?.map((el) => el.value),
        };
        setCloseFilter(true);
        FetchApiPost(`services/Material/Competitor/ApplyCompetitorFilter`, 'POST', filterIds).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setData(data);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setLoader(false);
                setData([]);
            }
        });
    };
    const [modalPage2Status, setModalPage2Status] = useState([]);
    const [modalPage2StatusUnite, setModalPage2StatusUnite] = useState([]);

    useEffect(() => {
        const quantity = dosageData?.map((el) => {
            if (selectCompetitorForm.length === 1) {
                return [el.firstFormQuantity];
            }
            if (selectCompetitorForm.length === 2) {
                return [el.firstFormQuantity, el.secondFormQuantity];
            }
            if (selectCompetitorForm.length === 3) {
                return [el.firstFormQuantity, el.secondFormQuantity, el.thirdFormQuantity];
            }
        });
        setModalPage2Status(quantity.flat().map((el, i) => ({ id: i, status: 'default', quantity: el })));
    }, [dosageData, selectCompetitorForm]);
    useEffect(() => {
        const quantity = dosageData?.map((el) => {
            if (selectCompetitorForm.length === 1) {
                return [el.firstFormUnite];
            }
            if (selectCompetitorForm.length === 2) {
                return [el.firstFormUnite, el.secondFormUnite];
            }
            if (selectCompetitorForm.length === 3) {
                return [el.firstFormUnite, el.secondFormUnite, el.thirdFormUnite];
            }
        });
        setModalPage2StatusUnite(quantity.flat().map((el, i) => ({ id: i, status: 'default', unite: el })));
    }, [dosageData, selectCompetitorForm]);
    const conditionFuncQuantity = (condition, statusArr, setStatusArr) => {
        condition.map((el, i) => {
            if (el === 0) {
                const arr = statusArr.map((obj, idx) => {
                    if (obj.id === i) {
                        obj['status'] = 'error';
                    }
                    return obj;
                });
                setStatusArr(arr);
            }
            if (el > 0) {
                const arr = statusArr.map((obj, idx) => {
                    if (obj.id === i) {
                        obj['status'] = 'default';
                    }
                    return obj;
                });
                setStatusArr(arr);
            }
        });
    };
    const saveCompetitor = (url, method, actionItem) => {
        const conditionValues = modalPage2Status?.map((el) => el.quantity);
        const conditionUnite = modalPage2StatusUnite?.map((el) => el.unite);
        conditionFuncQuantity(conditionValues, modalPage2Status, setModalPage2Status);
        conditionFuncQuantity(conditionUnite, modalPage2StatusUnite, setModalPage2StatusUnite);
        if (conditionValues.some((x) => x === 0)) return;
        if (conditionUnite.some((x) => x === undefined)) return;
        const copyData = copyDataContainer?.map((el, i) => ({
            id: method === 'update' ? actionItem.id : 0,
            countryForUseIds: el.countryForUse.map((x) => x.value),
            sellerCountryId: el.competitorSellerCountry ? el.competitorSellerCountry.value : null,
            sellerCountryName: el.competitorSellerCountry ? el.competitorSellerCountry.label : null,
            seller: el.competitorSeller && el.competitorSeller.value,
            status: true,
        }));
        let data = {
            competitorName: competitorBrandInput,
            productIds: selectOurProduct?.map((el) => el.value),
            materialsIds: selectCompetitorMaterials?.map((el) => el.value),
            form:
                method === 'update'
                    ? selectCompetitorForm?.map((el) => el)
                    : selectCompetitorForm?.map((el) => Number(el.value)),
            packingForm: method === 'update' ? selectPackingForm : selectPackingForm?.map((el) => el.label),
            manufacturerCountryId: selectCompetitorMfCountry ? selectCompetitorMfCountry.value : 0,
            manufacturerIds: selectCompetitorMf && [selectCompetitorMf.value],
            sellers: [
                ...copyData,
                {
                    id: method === 'update' ? actionItem.id : 0,
                    countryForUseIds: selectCountryForUse?.map((el) => el.value),
                    sellerCountryId: selectCompetitorSellerCountry && selectCompetitorSellerCountry.value,
                    sellerCountryName: selectCompetitorSellerCountry && selectCompetitorSellerCountry.label,
                    seller: selectCompetitorSeller && selectCompetitorSeller.value,
                    status: true,
                },
            ],
            createdBy: createdBy,
            competitorDosages: dosageData?.map((el) => ({
                firstForm: selectCompetitorForm[0].label,
                secondForm: selectCompetitorForm.length > 1 ? selectCompetitorForm[1].label : null,
                thirdForm: selectCompetitorForm.length > 2 ? selectCompetitorForm[2].label : null,
                materialId: el.materialId,
                firstFormQuantity: el.firstFormQuantity,
                firstFormUnite: el.firstFormUnite,
                secondFormQuantity: el.secondFormQuantity,
                secondFormUnite: el.secondFormUnite,
                thirdFormQuantity: el.thirdFormQuantity,
                thirdFormUnite: el.thirdFormUnite,
                status: el.status,
            })),
        };
        if (method === 'update') {
            delete data.createdBy;
            delete data.productIds;
            data = { ...data, productId: selectOurProduct[0].value, modifiedBy: createdBy, id: actionItem.id };
        }
        FetchApiPost(url, 'POST', data).then((res) => {
            if (res.status === 201) {
                setShowAddModal(false);
                setShowEditModal(false);
                reset();
                setModalPage(1);
                applyFilter();
            }
            if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    // Get data by id for update
    const getCompetitorById = (id) => {
        setLoaderEdit(true);
        FetchApiPost(`services/Material/Competitor/GetCompetitorMaterialDosagesById`, 'POST', id).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setCompetitorBrandInput(data.competitorName);
                    setSelectCompetitorMaterials(
                        data.material?.map((x) => ({ value: x.materialId, label: x.materialName }))
                    );
                    setSelectCompetitorForm(data.competitorForm.map((x) => ({ value: x.id, label: x.formName })));
                    setSelectPackingForm(data.packingForm);
                    setSelectOurProduct([{ value: data.productId, label: data.productName }]);
                    setSelectCompetitorMf({
                        value: data.manufacturers[0].manufacturerId,
                        label: data.manufacturers[0].manufacturerName,
                    });
                    setSelectCountryForUse(
                        data.seller[0]?.countryForUse?.map((x) => ({ value: x.countryId, label: x.countryName }))
                    );
                    if (data.manufacturerCountry.countryId !== 0) {
                        setSelectCompetitorMfCountry({
                            value: data.manufacturerCountry.countryId,
                            label: data.manufacturerCountry.countrtyName,
                        });
                    }
                    if (data.seller[0]?.sellerCountryId !== 0) {
                        setSelectCompetitorSellerCountry({
                            value: data.seller[0]?.sellerCountryId,
                            label: data.seller[0]?.sellerCountryName,
                        });
                    }
                    setSelectCompetitorSeller({ value: data.seller[0]?.seller, label: data.seller[0]?.sellerName });
                    setDosageData(
                        data.material?.map((el, i) => ({
                            materialId: el.materialId,
                            materialName: el.materialName,
                            firstFormQuantity: data.competitorDosage[i].firstFormQuantity,
                            firstFormUnite: data.competitorDosage[i].firstFormUnite,
                            secondFormQuantity: data.competitorDosage[i].secondFormQuantity,
                            secondFormUnite: data.competitorDosage[i].secondFormUnite,
                            thirdFormQuantity: data.competitorDosage[i].thirdFormQuantity,
                            thirdFormUnite: data.competitorDosage[i].thirdFormUnite,
                            status: true,
                        }))
                    );
                    setLoaderEdit(false);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const [detailForm, setDetailForm] = useState([]);
    const getCompetitorDosageById = (id) => {
        FetchApiPost(`services/Material/Competitor/GetCompetitorMaterialDosagesById`, 'POST', id).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setDetailForm(data.competitorForm?.map((el) => el));
                    setDosageData(
                        data.material?.map((el, i) => ({
                            materialId: el.materialId,
                            materialName: el.materialName,
                            firstFormQuantity: data.competitorDosage[i].firstFormQuantity,
                            firstFormUnite: data.competitorDosage[i].firstFormUnite,
                            secondFormQuantity: data.competitorDosage[i].secondFormQuantity,
                            secondFormUnite: data.competitorDosage[i].secondFormUnite,
                            thirdFormQuantity: data.competitorDosage[i].thirdFormQuantity,
                            thirdFormUnite: data.competitorDosage[i].thirdFormUnite,
                            firstForm: data.competitorDosage[i].firstForm,
                            secondForm: data.competitorDosage[i].secondForm,
                            thirdForm: data.competitorDosage[i].thirdForm,
                            status: true,
                        }))
                    );
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const addBtn = () => {
        switch (modalPage) {
            case 1:
                const condition = [
                    competitorBrandInput === '',
                    selectCompetitorMaterials.length === 0,
                    selectCompetitorForm.length === 0,
                    selectPackingForm.length === 0,
                    !selectCompetitorMf ? true : false,
                    selectCountryForUse.length === 0,
                    !selectCompetitorSeller ? true : false,
                    selectOurProduct.length === 0,
                ];
                conditionFunc(condition, modalPage1Status, setModalPage1Status);
                if (condition.some((x) => x === true)) return;
                if (copyDataContainer.length !== 0) {
                    const copyStatesControl = copyDataContainer.flatMap((el) => {
                        return [el.countryForUse.length, el.competitorSeller ? 1 : 0];
                    });
                    if (copyStatesControl.every((x) => x === 1)) {
                        setModalPage(2);
                    } else return;
                } else {
                    setModalPage(2);
                }
                break;
            case 2:
                saveCompetitor('services/Material/Competitor/SaveCompetitor', 'save');
                break;
            default:
                break;
        }
    };
    const updateBtn = () => {
        switch (modalPage) {
            case 1:
                const condition = [
                    competitorBrandInput === '',
                    selectCompetitorMaterials.length === 0,
                    selectCompetitorForm.length === 0,
                    selectPackingForm.length === 0,
                    !selectCompetitorMf ? true : false,
                    selectCountryForUse.length === 0,
                    !selectCompetitorSeller ? true : false,
                    selectOurProduct.length === 0,
                ];
                if (condition.some((x) => x === true)) return;
                if (copyDataContainer.length !== 0) {
                    const copyStatesControl = copyDataContainer.flatMap((el) => {
                        return [el.countryForUse.length, el.competitorSeller ? 1 : 0];
                    });
                    if (copyStatesControl.every((x) => x >= 1)) {
                        setModalPage(2);
                    } else return;
                } else {
                    setModalPage(2);
                }
                break;
            case 2:
                saveCompetitor('services/Material/Competitor/UpdateCompetitor', 'update', actionItem);
                break;
            default:
                break;
        }
    };
    const cancelBtn = () => {
        switch (modalPage) {
            case 1:
                setShowAddModal(false);
                setShowEditModal(false);
                setCompetitorBrandInput('');
                setSelectCompetitorMaterials([]);
                setSelectCompetitorForm([]);
                setSelectPackingForm([]);
                setSelectCompetitorMfCountry();
                setSelectCompetitorMf([]);
                setSelectCountryForUse([]);
                setSelectCompetitorSellerCountry();
                setSelectCompetitorSeller([]);
                setSelectOurProduct([]);
                setCopyDataContainer([]);
                setShowAddModal(false);
                break;
            case 2:
                setModalPage(1);
                break;
            default:
                break;
        }
    };
    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        const itemName = getIds[2];
        const competitorId = Number(getIds[3]);
        setActionItem({ id: itemId, statusId: statusId, name: itemName });
        if (statusId === 0) {
            setShowDeleteModal(true);
        }
        if (statusId === 1 || statusId === 2 || statusId === 3) {
            setShowActionModal(true);
        }
        if (statusId === 4) {
            setShowRejectModal(true);
        }
        if (statusId === 6) {
            setShowDuplicateModal(true);
        }
        if (statusId === 9) {
            getCompetitorById({ id: itemId, competitorId: competitorId });
            setShowEditModal(true);
        }
    };
    const [compId, setCompId] = useState(0);
    const openDetailsModal = (id) => {
        setCompId(id.competitorId);
        getCompetitorDosageById(id);
        setShowDetailsModal(true);
    };
    const tableData = data?.map((el, i) => ({
        id: el.id,
        product: el.productName,
        competitorBrand: el.competitorName,
        sellerCountry: (
            <Tippy
                content={el.seller?.map((x, idx) => (
                    <>
                        <span style={{ fontSize: '12px' }}>
                            <i className="fas fa-circle" style={{ fontSize: '9px' }}></i> {x.sellerCountryName}
                        </span>
                        <br />
                    </>
                ))}
                placement="left">
                <span>
                    {el.seller?.map((item, idx) => (
                        <span>
                            {item.sellerCountryName}
                            {el.seller.length - 1 !== idx && ', '}{' '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        seller: (
            <Tippy
                content={el.seller?.map((x, idx) => (
                    <>
                        <span style={{ fontSize: '12px' }}>
                            <i className="fas fa-circle" style={{ fontSize: '9px' }}></i> {x.sellerName}
                        </span>
                        <br />
                    </>
                ))}
                placement="left">
                <span>
                    {el.seller?.map((item, idx) => (
                        <span>
                            {item.sellerName}
                            {el.seller.length - 1 !== idx && ', '}{' '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        manufacturCountry: el.manufacturerCountry.countryName,
        manufacturer: el.manufacturers[0].manufacturerName,
        countryForUse: el.seller[0]?.countryForUse?.map((item, idx) => (
            <Tippy content={item.countryName} placement="bottom">
                <span>
                    {item.countryAbb}
                    {idx !== el.seller[0].countryForUse.length - 1 && ', '}
                </span>
            </Tippy>
        )),
        materialName: el.material?.map((x, idx) => (
            <Tippy content={x.materialName} placement="bottom">
                <span>
                    {x.materialName}
                    {idx !== el.material.length - 1 && ', '}
                </span>
            </Tippy>
        )),
        packingForm: el.packingForm,
        details: (
            <span className="page-area">
                <Icon
                    path={mdiEyeOutline}
                    onClick={() => openDetailsModal({ id: el.id, competitorId: el.competitorId })}
                    size={0.85}
                    horizontal
                    vertical
                    color="#6c757d"
                />
            </span>
        ),
        valid: (
            <span className="page-area">
                <Form.Check checked={el.approveStatus === 3 && true} type="switch" id="custom-switch" />
            </span>
        ),
        status: (
            <Tippy disabled={el.approveStatus !== 4 ? true : false} content={el.rejectReason} placement="left">
                <span
                    style={
                        el.approveStatus === 1 //Redact
                            ? {
                                  backgroundColor: '#6C757D',
                                  color: '#fff',
                              }
                            : el.approveStatus === 2 //'Approval'
                            ? {
                                  backgroundColor: '#FFBC00',
                                  color: '#fff',
                              }
                            : el.approveStatus === 3 //'Approved'
                            ? {
                                  backgroundColor: '#0ACF97',
                                  color: '#fff',
                              }
                            : el.approveStatus === 4 // Reject
                            ? {
                                  backgroundColor: '#FA5C7C',
                                  color: '#fff',
                              }
                            : {}
                    }
                    className="status-title">
                    {el.approveStatus === 1 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                    {el.approveStatus === 2 && <SendIcon />}
                    {el.approveStatus === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                    {el.approveStatus === 4 && <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>}
                    {el.approveStatus === 1 && t('Redact')}
                    {el.approveStatus === 2 && t('Approval')}
                    {el.approveStatus === 3 && t('Approved')}
                    {el.approveStatus === 4 && t('Reject')}
                </span>
            </Tippy>
        ),
        action: (
            <Dropdowns
                item={`?${el.id}?${el.competitorName}?${el.competitorId}`}
                option={
                    el.approveStatus === 1
                        ? statusRedactOptions
                        : el.approveStatus === 2
                        ? statusApprovalOptions
                        : el.approveStatus === 3
                        ? statusApprovedOptions
                        : el.approveStatus === 4
                        ? statusRejectOptions
                        : []
                }
                onClick={statusClick}
            />
        ),
    }));
    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Passport of Product', url: '/passport-of-products' },
        { label: 'Competitor' },
    ];
    const tabProps = [
        {
            label: t('Competitor'),
            key: 0,
        },
    ];

    return (
        <div id="competitor-table">
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab
                selectTab={selectTab}
                setSelectTab={setSelectTab}
                tabProps={tabProps}
                isNewBtn={true}
                newBtnClick={() => setShowAddModal(true)}
            />
            {selectTab.key === 0 && (
                <Spin size="large" spinning={loader}>
                    <Table
                        data={tableData}
                        filters={
                            <Filter
                                applyFilter={applyFilter}
                                statusArr={filterStatus}
                                setCloseFilter={setCloseFilter}
                                selectProductFilter={selectProductFilter}
                                setSelectProductFilter={setSelectProductFilter}
                                optionsProductFilter={optionsProductFilter}
                                selectCompetitorMfFilter={selectCompetitorMfFilter}
                                setSelectCompetitorMfFilter={setSelectCompetitorMfFilter}
                                optionsCompetitorMfFilter={optionsCompetitorMfFilter}
                            />
                        }
                        closeFilter={closeFilter}
                        setCloseFilter={setCloseFilter}
                    />
                </Spin>
            )}
            {showAddModal && (
                <GlobalModal
                    header={modalPage === 1 ? t('Add Competitor') : t('Add Dosage')}
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    size="lg"
                    toggle={toggle}
                    body={
                        <Body
                            modalPage={modalPage}
                            modalPage1States={modalPage1States}
                            modalPage1Status={modalPage1Status}
                            mfSwitch={mfSwitch}
                            setMfSwitch={setMfSwitch}
                            copyDataContainer={copyDataContainer}
                            setCopyDataContainer={setCopyDataContainer}
                            copy={copy}
                            selectCompetitorMaterials={selectCompetitorMaterials}
                            selectCompetitorForm={selectCompetitorForm}
                            dosageData={dosageData}
                            setDosageData={setDosageData}
                            modalPage2Status={modalPage2Status}
                            modalPage2StatusUnite={modalPage2StatusUnite}
                        />
                    }
                    footer={
                        <>
                            <Button onClick={cancelBtn} variant="light">
                                {modalPage === 1 && t('cancel')}
                                {modalPage === 2 && t('back')}
                            </Button>
                            <Button onClick={addBtn} variant="primary">
                                {modalPage === 1 && t('next')}
                                {modalPage === 2 && t('add')}
                            </Button>
                        </>
                    }
                />
            )}
            {showEditModal && (
                <GlobalModal
                    header={modalPage === 1 ? t('Update Competitor') : t('Update Dosage')}
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    size="lg"
                    toggle={toggle}
                    body={
                        <Spin size="large" spinning={loaderEdit}>
                            <EditModal
                                modalPage={modalPage}
                                mfSwitch={mfSwitch}
                                setMfSwitch={setMfSwitch}
                                copyDataContainer={copyDataContainer}
                                setCopyDataContainer={setCopyDataContainer}
                                copy={copy}
                                dosageData={dosageData}
                                setDosageData={setDosageData}
                                modalPage2Status={modalPage2Status}
                                modalPage2StatusUnite={modalPage2StatusUnite}
                                competitorBrandInput={competitorBrandInput}
                                setCompetitorBrandInput={setCompetitorBrandInput}
                                optionsCompetitorBrand={optionsCompetitorBrand}
                                selectCompetitorMaterials={selectCompetitorMaterials}
                                setSelectCompetitorMaterials={setSelectCompetitorMaterials}
                                optionsCompetitorMaterials={optionsCompetitorMaterials}
                                selectCompetitorForm={selectCompetitorForm}
                                setSelectCompetitorForm={setSelectCompetitorForm}
                                optionsCompetitorForm={optionsCompetitorForm}
                                selectPackingForm={selectPackingForm}
                                setSelectPackingForm={setSelectPackingForm}
                                optionsPackingForm={optionsPackingForm}
                                selectCompetitorMfCountry={selectCompetitorMfCountry}
                                setSelectCompetitorMfCountry={setSelectCompetitorMfCountry}
                                optionsCompetitorMfCountry={optionsCompetitorMfCountry}
                                selectCompetitorMf={selectCompetitorMf}
                                setSelectCompetitorMf={setSelectCompetitorMf}
                                optionsCompetitorMf={optionsCompetitorMf}
                                selectCountryForUse={selectCountryForUse}
                                setSelectCountryForUse={setSelectCountryForUse}
                                optionsCountryForUse={optionsCountryForUse}
                                selectCompetitorSellerCountry={selectCompetitorSellerCountry}
                                setSelectCompetitorSellerCountry={setSelectCompetitorSellerCountry}
                                optionsCompetitorSellerCountry={optionsCompetitorSellerCountry}
                                selectCompetitorSeller={selectCompetitorSeller}
                                setSelectCompetitorSeller={setSelectCompetitorSeller}
                                optionsCompetitorSeller={optionsCompetitorSeller}
                                selectOurProduct={selectOurProduct}
                                setSelectOurProduct={setSelectOurProduct}
                                optionsOurProduct={optionsOurProduct}
                            />
                        </Spin>
                    }
                    footer={
                        <>
                            <Button onClick={cancelBtn} variant="light">
                                {modalPage === 1 && t('cancel')}
                                {modalPage === 2 && t('back')}
                            </Button>
                            <Button onClick={updateBtn} variant="warning">
                                {modalPage === 1 && t('next')}
                                {modalPage === 2 && t('update')}
                            </Button>
                        </>
                    }
                />
            )}
            {showActionModal && (
                <SendAction
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionItem}
                    applyFilter={applyFilter}
                />
            )}
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    item={actionItem}
                    applyFilter={applyFilter}
                />
            )}
            {showRejectModal && (
                <Reject
                    modalShow={showRejectModal}
                    setModalShow={setShowRejectModal}
                    item={actionItem}
                    applyFilter={applyFilter}
                />
            )}
            {showDuplicateModal && (
                <Duplicates
                    modalShow={showDuplicateModal}
                    setModalShow={setShowDuplicateModal}
                    item={actionItem}
                    applyFilter={applyFilter}
                />
            )}
            {showDetailsModal && (
                <DosageModal
                    modalShow={showDetailsModal}
                    setModalShow={setShowDetailsModal}
                    dosageData={dosageData}
                    setDosageData={setDosageData}
                    detailForm={detailForm}
                    compId={compId}
                />
            )}
            {showErrorModal && <FailModal modalShow={showErrorModal} setModalShow={setShowErrorModal} error={error} />}
            {showQuestionModal && (
                <CloseWithoutSaving
                    modal={showQuestionModal}
                    noButton={() => setShowQuestionModal(false)}
                    yesButton={() => {
                        reset();
                        setShowQuestionModal(false);
                    }}
                    toggle={() => setShowQuestionModal(false)}
                />
            )}
        </div>
    );
};

export default Competitor;
