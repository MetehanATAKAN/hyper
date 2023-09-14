import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import Body from './AddModal/Body';
import Footer from './AddModal/Footer';
import Category from './Category';
import CategorySub1 from './CategorySub1';
import CategorySub2 from './CategorySub2';
import CategorySub3 from './CategorySub3';
import MainCategory from './MainCategory';
import MaterialService from './MaterialService';
import MaterialType from './MaterialType';
import Tabs from './Tabs';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import UpdateBody from './Update/UpdateBody';
import UpdateFooter from './Update/UpdateFooter';
import ErorModal from './Actions/ErorModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Breadcrumb } from 'antd';
import BreadCrumb from '../../../../components/BreadCrumb';
import Tab from '../../../../components/Tab';
export const conditionFunc = (condition, statusArr, setStatusArr) => {
    condition.map((el, i) => {
        if (el === true) {
            const arr = statusArr.map((obj, idx) => {
                if (obj.id === i) {
                    obj['status'] = 'error';
                }
                return obj;
            });
            setStatusArr(arr);
        }
        if (el === false) {
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

const Materials = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [selectTab, setSelectTab] = useState({
        key: 0,
        label: 'Profile',
    });

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Materials', url: '/apps/materials' },
        { label: selectTab?.label },
    ];

    const tabProps = [
        {
            key: 0,
            label: t('Main Category'),
        },
        {
            key: 1,
            label: t('Category'),
        },
        {
            key: 2,
            label: t('Category Sub1'),
        },
        {
            key: 3,
            label: t('Category Sub2'),
        },
        {
            key: 4,
            label: t('Category Sub3'),
        },
        {
            key: 5,
            label: t('Materials or Services'),
        },
        {
            key: 6,
            label: t('Materials or Services Type'),
        },
    ];

    const style = {
        marginTop: '25px',
        marginBottom: '5px',
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
    const [selectedTab, setSelectedTab] = useState('Main Category');
    const [modalTabValue, setModalTabValue] = useState(0);
    const [modalHeader, setModalHeader] = useState('Main Category');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [infoById, setInfoById] = useState(null);
    const createdBy = localStorage.getItem('userName');
    const addModal = () => {
        setShowAddModal(true);
    };
    const [closeFilterCategory, setCloseFilterCategory] = useState(false);
    const [closeFilterCategory1, setCloseFilterCategory1] = useState(false);
    const [closeFilterCategory2, setCloseFilterCategory2] = useState(false);
    const [closeFilterCategory3, setCloseFilterCategory3] = useState(false);
    const [closeFilterMaterialService, setCloseFilterMaterialService] = useState(false);
    const [closeFilterMaterialType, setCloseFilterMaterialType] = useState(false);
    //GENERAL MODAL STATES
    const [mainCategoryData, setMainCategoryData] = useState([]);
    const [selectMainCategory, setSelectMainCategory] = useState();
    const [selectMainCategoryFilter, setSelectMainCategoryFilter] = useState();
    const [selectMainCategoryFilterAll, setSelectMainCategoryFilterAll] = useState([]);
    const [optionsMainCategory, setOptionsMainCategory] = useState([]);
    const [optionsMainCategoryFilter, setOptionsMainCategoryFilter] = useState([]);

    const [categoryData, setCategoryData] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);
    const [selectCategoryFilter, setSelectCategoryFilter] = useState([]);
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [optionsCategoryFilter, setOptionsCategoryFilter] = useState([]);

    const [category1Data, setCategory1Data] = useState([]);
    const [selectCategory1, setSelectCategory1] = useState([]);
    const [selectCategory1Filter, setSelectCategory1Filter] = useState([]);
    const [optionsCategory1, setOptionsCategory1] = useState([]);
    const [optionsCategory1Filter, setOptionsCategory1Filter] = useState([]);

    const [category2Data, setCategory2Data] = useState([]);
    const [selectCategory2, setSelectCategory2] = useState([]);
    const [selectCategory2Filter, setSelectCategory2Filter] = useState([]);
    const [optionsCategory2, setOptionsCategory2] = useState([]);
    const [optionsCategory2Filter, setOptionsCategory2Filter] = useState([]);

    const [category3Data, setCategory3Data] = useState([]);
    const [selectCategory3, setSelectCategory3] = useState([]);
    const [selectCategory3Filter, setSelectCategory3Filter] = useState([]);
    const [optionsCategory3, setOptionsCategory3] = useState([]);
    const [optionsCategory3Filter, setOptionsCategory3Filter] = useState([]);

    const [materialServiceData, setMaterialServiceData] = useState([]);
    const [selectMaterialService, setSelectMaterialService] = useState([]);
    const [selectMaterialServiceFilter, setSelectMaterialServiceFilter] = useState([]);
    const [optionsMaterialService, setOptionsMaterialService] = useState([]);
    const [optionsMaterialServiceFilter, setOptionsMaterialServiceFilter] = useState([]);

    const [materialTypeData, setMaterialTypeData] = useState([]);
    const [materialType, setMaterialType] = useState([]);
    const [optionsMaterialType, setOptionsMaterialType] = useState([]);

    // ADD MODAL STATES

    // main category
    const [mainCategory, setMainCategory] = useState('');
    const [mainCategoryColor, setMainCategoryColor] = useState('');
    const [abbrev, setAbbrev] = useState('');
    const [description, setDescription] = useState('');
    const mainCategoryModalProps = [
        { id: 0, state: mainCategory, setState: setMainCategory },
        { id: 1, state: mainCategoryColor, setState: setMainCategoryColor },
        { id: 2, state: abbrev, setState: setAbbrev },
        { id: 3, state: description, setState: setDescription },
    ];
    const [mainCategoryModalStatus, setMainCategoryModalStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
    ]);

    // category
    const [category, setCategory] = useState('');
    const [abbrevCategory, setAbbrevCategory] = useState('');
    const [descriptionCategory, setDescriptionCategory] = useState('');
    const categoryModalProps = [
        { id: 0, state: category, setState: setCategory },
        { id: 1, state: abbrevCategory, setState: setAbbrevCategory },
        { id: 2, state: descriptionCategory, setState: setDescriptionCategory },
        { id: 3, state: selectMainCategory, setState: setSelectMainCategory, options: optionsMainCategory },
    ];
    const [categoryModalStatus, setCategoryModalStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
    ]);

    // category sub 1
    const [category1, setCategory1] = useState('');
    const [abbrevCategory1, setAbbrevCategory1] = useState('');
    const [descriptionCategory1, setDescriptionCategory1] = useState('');
    const category1ModalProps = [
        { id: 0, state: category1, setState: setCategory1 },
        { id: 1, state: abbrevCategory1, setState: setAbbrevCategory1 },
        { id: 2, state: descriptionCategory1, setState: setDescriptionCategory1 },
        { id: 3, state: selectMainCategory, setState: setSelectMainCategory, options: optionsMainCategory },
        { id: 4, state: selectCategory, setState: setSelectCategory, options: optionsCategory },
    ];
    const [category1ModalStatus, setCategory1ModalStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
    ]);

    // category sub 2
    const [category2, setCategory2] = useState('');
    const [abbrevCategory2, setAbbrevCategory2] = useState('');
    const [descriptionCategory2, setDescriptionCategory2] = useState('');
    const category2ModalProps = [
        { id: 0, state: category2, setState: setCategory2 },
        { id: 1, state: abbrevCategory2, setState: setAbbrevCategory2 },
        { id: 2, state: descriptionCategory2, setState: setDescriptionCategory2 },
        { id: 3, state: selectMainCategory, setState: setSelectMainCategory, options: optionsMainCategory },
        { id: 4, state: selectCategory, setState: setSelectCategory, options: optionsCategory },
        { id: 5, state: selectCategory1, setState: setSelectCategory1, options: optionsCategory1 },
    ];
    const [category2ModalStatus, setCategory2ModalStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
    ]);

    // category sub 3
    const [category3, setCategory3] = useState('');
    const [abbrevCategory3, setAbbrevCategory3] = useState('');
    const [descriptionCategory3, setDescriptionCategory3] = useState('');
    const category3ModalProps = [
        { id: 0, state: category3, setState: setCategory3 },
        { id: 1, state: abbrevCategory3, setState: setAbbrevCategory3 },
        { id: 2, state: descriptionCategory3, setState: setDescriptionCategory3 },
        { id: 3, state: selectMainCategory, setState: setSelectMainCategory, options: optionsMainCategory },
        { id: 4, state: selectCategory, setState: setSelectCategory, options: optionsCategory },
        { id: 5, state: selectCategory1, setState: setSelectCategory1, options: optionsCategory1 },
        { id: 6, state: selectCategory2, setState: setSelectCategory2, options: optionsCategory2 },
    ];
    const [category3ModalStatus, setCategory3ModalStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
        { id: 6, status: 'default' },
    ]);

    // material or services
    const [materialService, setMaterialService] = useState('');
    const [abbrevMaterial, setAbbrevMaterial] = useState('');
    const [descriptionMaterial, setDescriptionMaterial] = useState('');
    const materialServiceModalProps = [
        { id: 0, state: materialService, setState: setMaterialService },
        { id: 1, state: abbrevMaterial, setState: setAbbrevMaterial },
        { id: 2, state: descriptionMaterial, setState: setDescriptionMaterial },
        { id: 3, state: materialType, setState: setMaterialType, options: optionsMaterialType },
        { id: 4, state: selectMainCategory, setState: setSelectMainCategory, options: optionsMainCategory },
        { id: 5, state: selectCategory, setState: setSelectCategory, options: optionsCategory },
        { id: 6, state: selectCategory1, setState: setSelectCategory1, options: optionsCategory1 },
        { id: 7, state: selectCategory2, setState: setSelectCategory2, options: optionsCategory2 },
        { id: 8, state: selectCategory3, setState: setSelectCategory3, options: optionsCategory3 },
    ];
    const [materialServiceModalStatus, setMaterialServiceModalStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
    ]);

    // material type
    const [materialTypeInput, setMaterialTypeInput] = useState('');
    const materialTypeModalProps = [
        { id: 0, state: materialTypeInput, setState: setMaterialTypeInput },
        {
            id: 1,
            state: materialType,
            setState: setMaterialType,
            options: optionsMaterialType,
            setOptions: setOptionsMaterialType,
        },
        { id: 2, state: selectMainCategory, setState: setSelectMainCategory, options: optionsMainCategory },
        { id: 3, state: selectCategory, setState: setSelectCategory, options: optionsCategory },
        { id: 4, state: selectCategory1, setState: setSelectCategory1, options: optionsCategory1 },
        { id: 5, state: selectCategory2, setState: setSelectCategory2, options: optionsCategory2 },
        { id: 6, state: selectCategory3, setState: setSelectCategory3, options: optionsCategory3 },
        {
            id: 7,
            state: selectMaterialService,
            setState: setSelectMaterialService,
            options: optionsMaterialService,
            setOptions: setOptionsMaterialService,
        },
    ];
    const [materialTypeModalStatus, setMaterialTypeModalStatus] = useState([{ id: 0, status: 'default' }]);

    // -----------------------------------------GET ALL DATAS---------------------------------------------
    useEffect(() => {
        FetchApiGet('services/Material/MainCategory/GetAllMainCategory', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setMainCategoryData(data),
                        setOptionsMainCategory(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
        FetchApiGet('services/Material/MaterialOrServices/GetAllMaterialOrServices', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setOptionsMaterialService(data.map((el) => ({ value: el.id, label: el.name }))),
                        setOptionsMaterialServiceFilter(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
        FetchApiGet('services/Material/MaterialOrServicesType/GetAllMaterialOrServicesType', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsMaterialType(data.map((el) => ({ value: el.id, label: el.name })))
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);

    useEffect(() => {
        setSelectCategory([]);
        setSelectCategory1([]);
        setSelectCategory2([]);
        setSelectCategory3([]);
        if (selectMainCategory === undefined) return;
        const data = {
            mainCategoryIds: [selectMainCategory.value],
        };
        FetchApiPost('services/Material/Category/GetCategoryByMainCategoryId', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectCategory(data.map((el) => ({ value: el.id, label: el.name }))),
                        setOptionsCategory(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [selectMainCategory]);

    useEffect(() => {
        setSelectCategory1([]);
        setSelectCategory2([]);
        setSelectCategory3([]);
        if (selectCategory.length === 0) return;
        const data = {
            categoryIds: selectCategory?.map((x) => x.value),
        };
        FetchApiPost('services/Material/CategoryFirstSub/GetCategoryFirstSubsByCategoryId', 'POST', data).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(
                        ({ data }) => (
                            setSelectCategory1(data.map((el) => ({ value: el.id, label: el.name }))),
                            setOptionsCategory1(data.map((el) => ({ value: el.id, label: el.name })))
                        )
                    );
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            }
        );
    }, [selectCategory]);

    useEffect(() => {
        setSelectCategory2([]);
        setSelectCategory3([]);
        if (selectCategory1.length === 0) return;
        const data = {
            categoryFirstSubIds: selectCategory1?.map((x) => x.value),
        };
        FetchApiPost(
            'services/Material/CategorySecondSub/GetCategorySecondSubsByCategoryFirstSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectCategory2(data.map((el) => ({ value: el.id, label: el.name }))),
                        setOptionsCategory2(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [selectCategory1]);

    useEffect(() => {
        setSelectCategory3([]);
        if (selectCategory2.length === 0) return;
        const data = {
            categorySecondSubIds: selectCategory2?.map((x) => x.value),
        };
        FetchApiPost(
            'services/Material/CategoryThirdSub/GetCategoryThirdSubsByCategorySecondSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectCategory3(data.map((el) => ({ value: el.id, label: el.name }))),
                        setOptionsCategory3(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [selectCategory2]);

    useEffect(() => {
        setSelectMaterialService([]);
        if (selectCategory.length === 0) return;
        const data = {
            categoryIds: selectCategory?.map((x) => x.value),
            firstCategoryIds: selectCategory1?.map((x) => x.value),
            secondCategoryIds: selectCategory2?.map((x) => x.value),
            thirdCategoryIds: selectCategory3?.map((x) => x.value),
        };
        FetchApiPost('services/Material/MaterialOrServices/GetMaterialOrServicesByFilterIds', 'POST', data).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(
                        ({ data }) => (
                            setSelectMaterialService(data.map((el) => ({ value: el.id, label: el.name }))),
                            setOptionsMaterialService(data.map((el) => ({ value: el.id, label: el.name })))
                        )
                    );
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            }
        );
    }, [selectCategory, selectCategory1, selectCategory2, selectCategory3, selectMainCategory]);
    // -------------------------------------------------------------------------------------------------------
    // CATEGORY FOR FİLTER
    useEffect(() => {
        setSelectCategoryFilter([]);
        setSelectCategory1Filter([]);
        setSelectCategory2Filter([]);
        setSelectCategory3Filter([]);
        setOptionsCategoryFilter([]);
        setOptionsCategory1Filter([]);
        setOptionsCategory2Filter([]);
        setOptionsCategory3Filter([]);
        if (selectMainCategoryFilter === undefined) return;
        const data = {
            mainCategoryIds: [selectMainCategoryFilter.value],
        };
        FetchApiPost('services/Material/Category/GetCategoryByMainCategoryId', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectCategoryFilter(data.map((el) => ({ value: el.id, label: el.name }))),
                        setOptionsCategoryFilter(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [selectMainCategoryFilter]);
    // CATEGORY SUB 1 FOR FİLTER
    useEffect(() => {
        setSelectCategory1Filter([]);
        setSelectCategory2Filter([]);
        setSelectCategory3Filter([]);
        setOptionsCategory1Filter([]);
        setOptionsCategory2Filter([]);
        setOptionsCategory3Filter([]);
        if (selectCategoryFilter.length === 0) return;
        const data = {
            categoryIds: selectCategoryFilter?.map((x) => x.value),
        };
        FetchApiPost('services/Material/CategoryFirstSub/GetCategoryFirstSubsByCategoryId', 'POST', data).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(
                        ({ data }) => (
                            setSelectCategory1Filter(data.map((el) => ({ value: el.id, label: el.name }))),
                            setOptionsCategory1Filter(data.map((el) => ({ value: el.id, label: el.name })))
                        )
                    );
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            }
        );
    }, [selectCategoryFilter]);
    // CATEGORY SUB 2 FOR FİLTER
    useEffect(() => {
        setSelectCategory2Filter([]);
        setSelectCategory3Filter([]);
        setOptionsCategory2Filter([]);
        setOptionsCategory3Filter([]);
        if (selectCategory1Filter.length === 0) return;
        const data = {
            categoryFirstSubIds: selectCategory1Filter?.map((x) => x.value),
        };
        FetchApiPost(
            'services/Material/CategorySecondSub/GetCategorySecondSubsByCategoryFirstSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectCategory2Filter(data.map((el) => ({ value: el.id, label: el.name }))),
                        setOptionsCategory2Filter(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [selectCategory1Filter]);
    // CATEGORY SUB 3 FOR FİLTER
    useEffect(() => {
        setSelectCategory3Filter([]);
        setOptionsCategory3Filter([]);
        if (selectCategory2Filter.length === 0) return;
        const data = {
            categorySecondSubIds: selectCategory2Filter?.map((x) => x.value),
        };
        FetchApiPost(
            'services/Material/CategoryThirdSub/GetCategoryThirdSubsByCategorySecondSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setSelectCategory3Filter(data.map((el) => ({ value: el.id, label: el.name }))),
                        setOptionsCategory3Filter(data.map((el) => ({ value: el.id, label: el.name })))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [selectCategory2Filter]);
    //--------------------------------------------------------------------------------------------------------
    // ADD MODAL POST APİ
    const mainCategoryPost = (url, info = null) => {
        const condition = [
            mainCategory.trim() === '',
            mainCategoryColor.trim() === '',
            abbrev.trim() === '',
            description.trim() === '',
        ];
        conditionFunc(condition, mainCategoryModalStatus, setMainCategoryModalStatus);
        if (condition.some((x) => x === true)) return;
        let data = {
            name: mainCategory,
            abb: abbrev,
            description: description,
            backgroundColor: mainCategoryColor,
            createdBy: createdBy,
        };
        if (info !== null) {
            delete data.createdBy;
            data = { ...data, modifiedBy: createdBy, mainCategoryId: info.id };
        }

        FetchApiPost(url, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    if (info !== null) {
                        toast.success(t('Main Category Updated'), {
                            position: 'top-center',
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: 'light',
                        });
                        setShowEditModal(false);
                    }
                    setMainCategory('');
                    setMainCategoryColor('');
                    setAbbrev('');
                    setDescription('');
                    setInfoById(null);
                    FetchApiGet('services/Material/MainCategory/GetAllMainCategory', 'GET').then((res) => {
                        if (res.status === 200) {
                            res.json().then(({ data }) => {
                                info === null &&
                                    toast.success(t('Main Category Added'), {
                                        position: 'top-center',
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: false,
                                        progress: undefined,
                                        theme: 'light',
                                    });

                                setMainCategoryData(data);
                                setOptionsMainCategory(data.map((el) => ({ value: el.id, label: el.name })));
                            });
                        }
                    });
                    // if (info === null) {
                    //     setModalTabValue(1);
                    // }
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
                }
            })
            .catch((err) => console.log(err));
    };
    const categoryPost = (url, info = null) => {
        const condition = [
            category.trim() === '',
            abbrevCategory.trim() === '',
            descriptionCategory.trim() === '',
            selectMainCategory === undefined,
        ];
        conditionFunc(condition, categoryModalProps, setCategoryModalStatus);
        if (condition.some((x) => x === true)) return;
        let data = {
            name: category,
            abb: abbrevCategory,
            description: descriptionCategory,
            mainCategoryId: selectMainCategory.value,
            createdBy: createdBy,
        };
        if (info !== null) {
            delete data.createdBy;
            data = { ...data, modifiedBy: createdBy, id: info.id };
        }
        FetchApiPost(url, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    if (info !== null) {
                        setShowEditModal(false);
                    }
                    toast.success(info === null ? t('Category Added') : t('Category Updated'), {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                    });
                    applyFilterCategory();
                    setCategory('');
                    setAbbrevCategory('');
                    setDescriptionCategory('');
                    setSelectMainCategory();
                    setInfoById(null);
                    // if (info === null) {
                    //     setModalTabValue(2);
                    // }
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
                }
            })
            .catch((err) => console.log(err));
    };
    const categorySub1Post = (url, info = null) => {
        const condition = [
            category1.trim().trim() === '',
            abbrevCategory1.trim().trim() === '',
            descriptionCategory1.trim().trim() === '',
            selectMainCategory === undefined,
            selectCategory.length === 0,
        ];
        conditionFunc(condition, category1ModalProps, setCategory1ModalStatus);
        if (condition.some((x) => x === true)) return;
        let data = {
            name: category1,
            abb: abbrevCategory1,
            description: descriptionCategory1,
            categoryIds: selectCategory?.map((x) => x.value),
            createdBy: createdBy,
        };
        if (info !== null) {
            delete data.createdBy;
            data = { ...data, modifiedBy: createdBy, categoryFirstSubId: info.id };
        }
        FetchApiPost(url, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    if (info !== null) {
                        setShowEditModal(false);
                    }
                    toast.success(info === null ? t('Category Sub 1 Added') : t('Category Sub 1 Updated'), {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                    });
                    applyFilterCategorySub1();
                    setCategory1('');
                    setAbbrevCategory1('');
                    setDescriptionCategory1('');
                    setSelectMainCategory();
                    setSelectCategory([]);
                    setInfoById(null);
                    // if (info === null) {
                    //     setModalTabValue(3);
                    // }
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
                }
            })
            .catch((err) => console.log(err));
    };
    const categorySub2Post = (url, info = null) => {
        const condition = [
            category2.trim() === '',
            abbrevCategory2.trim() === '',
            descriptionCategory2.trim() === '',
            selectMainCategory === undefined,
            selectCategory.length === 0,
            !selectCategory1 ? true : false,
        ];
        conditionFunc(condition, category2ModalProps, setCategory2ModalStatus);
        if (condition.some((x) => x === true)) return;
        let data = {
            name: category2,
            abb: abbrevCategory2,
            description: descriptionCategory2,
            categoryFirstSubIds: selectCategory1?.map((x) => x.value),
            createdBy: createdBy,
        };
        if (info !== null) {
            delete data.createdBy;
            data = { ...data, modifiedBy: createdBy, categorySecondSubId: info.id };
        }
        FetchApiPost(url, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    if (info !== null) {
                        setShowEditModal(false);
                    }
                    toast.success(info === null ? t('Category Sub 2 Added') : t('Category Sub 2 Updated'), {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                    });
                    applyFilterCategorySub2();
                    setCategory2('');
                    setAbbrevCategory2('');
                    setDescriptionCategory2('');
                    setSelectMainCategory();
                    setSelectCategory([]);
                    setSelectCategory1([]);
                    setInfoById(null);
                    // if (info === null) {
                    //     setModalTabValue(4);
                    // }
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
                }
            })
            .catch((err) => console.log(err));
    };
    const categorySub3Post = (url, info = null) => {
        const condition = [
            category3.trim() === '',
            abbrevCategory3.trim() === '',
            descriptionCategory3.trim() === '',
            selectMainCategory === undefined,
            selectCategory.length === 0,
            selectCategory1.length === 0,
            selectCategory2.length === 0,
        ];
        conditionFunc(condition, category3ModalProps, setCategory3ModalStatus);
        if (condition.some((x) => x === true)) return;
        let data = {
            name: category3,
            abb: abbrevCategory3,
            technicalInfo: descriptionCategory3,
            categorySecondSubIds: selectCategory2?.map((x) => x.value),
            createdBy: createdBy,
        };
        if (info !== null) {
            delete data.createdBy;
            data = { ...data, modifiedBy: createdBy, categoryThirdSubId: info.id };
        }
        FetchApiPost(url, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    if (info !== null) {
                        setShowEditModal(false);
                    }
                    toast.success(info === null ? t('Category Sub 3 Added') : t('Category Sub 3 Updated'), {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                    });
                    applyFilterCategorySub3();
                    setCategory3('');
                    setAbbrevCategory3('');
                    setDescriptionCategory3('');
                    setSelectMainCategory();
                    setSelectCategory([]);
                    setSelectCategory1([]);
                    setSelectCategory2([]);
                    setInfoById(null);
                    // if (info === null) {
                    //     setModalTabValue(5);
                    // }
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
                }
            })
            .catch((err) => console.log(err));
    };

    const materialServicePost = (url, info = null) => {
        const condition = [
            materialService.trim() === '',
            abbrevMaterial.trim() === '',
            descriptionMaterial.trim() === '',
            selectMainCategory === undefined,
            selectCategory.length === 0,
        ];
        conditionFunc(condition, materialServiceModalProps, setMaterialServiceModalStatus);
        if (condition.some((x) => x === true)) return;
        let data = {
            name: materialService,
            abb: abbrevMaterial,
            technicalInfo: descriptionMaterial,
            categoryIds: selectCategory?.map((x) => x.value),
            firstSubIds: selectCategory1?.map((x) => x.value),
            secondSubIds: selectCategory2?.map((x) => x.value),
            thirdSubIds: selectCategory3?.map((x) => x.value),
            typeIds: materialType?.map((x) => x.value),
            createdBy: createdBy,
        };
        if (info !== null) {
            delete data.createdBy;
            data = { ...data, modifiedBy: createdBy, materialOrServicesId: info.id };
        }
        FetchApiPost(url, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    if (info !== null) {
                        setShowEditModal(false);
                    }
                    toast.success(info === null ? t('Material or Service Added') : t('Material or Service Updated'), {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                    });
                    applyFilterMaterialService();
                    setMaterialService('');
                    setAbbrevMaterial('');
                    setDescriptionMaterial('');
                    setMaterialType([]);
                    setSelectMainCategory();
                    setSelectCategory([]);
                    setSelectCategory1([]);
                    setSelectCategory2([]);
                    setSelectCategory3([]);
                    setInfoById(null);
                    // if (info === null) {
                    //     setModalTabValue(6);
                    // }
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
                }
            })
            .catch((err) => console.log(err));
    };
    const materialTypePost = (url, info = null) => {
        const condition = [materialTypeInput.trim() === ''];
        conditionFunc(condition, materialTypeModalProps, setMaterialTypeModalStatus);
        if (condition.some((x) => x === true)) return;
        let data = {
            name: materialTypeInput,
            connectedMaterialIds: selectMaterialService?.map((x) => x.value),
            createdBy: createdBy,
        };
        if (info !== null) {
            delete data.createdBy;
            data = { ...data, modifiedBy: createdBy, materialOrServicesTypeId: info.id };
        }
        FetchApiPost(url, 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    if (info !== null) {
                        setShowEditModal(false);
                    }
                    toast.success(info === null ? t('Material Type Added') : t('Material Type Updated'), {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                    });
                    applyFilterMaterialType();
                    setMaterialTypeInput('');
                    setMaterialType([]);
                    setSelectMainCategory();
                    setSelectCategory([]);
                    setSelectCategory1([]);
                    setSelectCategory2([]);
                    setSelectCategory3([]);
                    selectMaterialService([]);
                    setInfoById(null);
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 400 || res.status === 409 || res.status === 404) {
                    res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
                }
            })
            .catch((err) => console.log(err));
    };

    const [statusCategoryFilter, setStatusCategoryFilter] = useState([{ id: 0, status: 'default' }]);
    const [statusCategory1Filter, setStatusCategory1Filter] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const [statusCategory2Filter, setStatusCategory2Filter] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
    ]);
    const [statusCategory3Filter, setStatusCategory3Filter] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
    ]);
    const [materialServiceFilter, setMaterialServiceFilter] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const applyFilterCategory = () => {
        const condition = [selectMainCategoryFilterAll.length === 0];
        const data = {
            mainCategoryIds: selectMainCategoryFilterAll?.map((el) => el.value),
        };
        conditionFunc(condition, statusCategoryFilter, setStatusCategoryFilter);
        if (condition.some((x) => x === true)) return;
        FetchApiPost('services/Material/Category/GetCategoryByMainCategoryId', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setCategoryData(data),
                        setOptionsCategory(data.map((el) => ({ value: el.id, label: el.name }))),
                        setCloseFilterCategory(true)
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const applyFilterCategorySub1 = () => {
        const condition = [!selectMainCategoryFilter ? true : false, selectCategoryFilter.length === 0];
        conditionFunc(condition, statusCategory1Filter, setStatusCategory1Filter);
        if (condition.some((x) => x === true)) return;
        const data = {
            categoryIds: selectCategoryFilter?.map((x) => x.value),
        };
        FetchApiPost('services/Material/CategoryFirstSub/GetCategoryFirstSubsByCategoryId', 'POST', data).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(
                        ({ data }) => (
                            setCategory1Data(data),
                            setOptionsCategory1(data.map((el) => ({ value: el.id, label: el.name }))),
                            setCloseFilterCategory1(true)
                        )
                    );
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            }
        );
    };
    const applyFilterCategorySub2 = () => {
        const condition = [
            !selectMainCategoryFilter ? true : false,
            selectCategoryFilter.length === 0,
            selectCategory1Filter.length === 0,
        ];
        conditionFunc(condition, statusCategory2Filter, setStatusCategory2Filter);
        if (condition.some((x) => x === true)) return;
        const data = {
            categoryFirstSubIds: selectCategory1Filter?.map((x) => x.value),
        };
        FetchApiPost(
            'services/Material/CategorySecondSub/GetCategorySecondSubsByCategoryFirstSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setCategory2Data(data),
                        setOptionsCategory2(data.map((el) => ({ value: el.id, label: el.name }))),
                        setCloseFilterCategory2(true)
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const applyFilterCategorySub3 = () => {
        const condition = [
            !selectMainCategoryFilter ? true : false,
            selectCategoryFilter.length === 0,
            selectCategory1Filter.length === 0,
            selectCategory2Filter.length === 0,
        ];
        conditionFunc(condition, statusCategory3Filter, setStatusCategory3Filter);
        if (condition.some((x) => x === true)) return;
        const data = {
            categorySecondSubIds: selectCategory2Filter?.map((x) => x.value),
        };
        FetchApiPost(
            'services/Material/CategoryThirdSub/GetCategoryThirdSubsByCategorySecondSubIds',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    ({ data }) => (
                        setCategory3Data(data),
                        setOptionsCategory3(data.map((el) => ({ value: el.id, label: el.name }))),
                        setCloseFilterCategory3(true)
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const applyFilterMaterialService = () => {
        const condition = [!selectMainCategoryFilter ? true : false, selectCategoryFilter.length === 0];
        conditionFunc(condition, materialServiceFilter, setMaterialServiceFilter);
        if (condition.some((x) => x === true)) return;
        const data = {
            categoryIds: selectCategoryFilter?.map((x) => x.value),
            firstCategoryIds: selectCategory1Filter?.map((x) => x.value),
            secondCategoryIds: selectCategory2Filter?.map((x) => x.value),
            thirdCategoryIds: selectCategory3Filter?.map((x) => x.value),
        };
        FetchApiPost('services/Material/MaterialOrServices/GetMaterialOrServicesByFilterIds', 'POST', data).then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => (setCloseFilterMaterialService(true), setMaterialServiceData(data)));
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            }
        );
    };
    const applyFilterMaterialType = () => {
        if (selectMaterialServiceFilter.length === 0) {
            FetchApiGet('services/Material/MaterialOrServicesType/GetAllMaterialOrServicesType', 'GET').then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => (setCloseFilterMaterialType(true), setMaterialTypeData(data)));
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            });
        }
        if (selectMaterialServiceFilter.length > 0) {
            const data = {
                materialIds: selectMaterialServiceFilter?.map((x) => x.value),
            };
            FetchApiPost(
                'services/Material/MaterialOrServicesType/GetMaterialOrServicesTypeByMaterialIds',
                'POST',
                data
            ).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => setMaterialTypeData(data));
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            });
        }
    };
    const UpdateModal = (info) => {
        setInfoById(info);
        switch (selectedTab) {
            case 'Main Category':
                setMainCategory(info.name);
                setMainCategoryColor(info.color);
                setAbbrev(info.abb);
                setDescription(info.desc);
                setShowEditModal(true);
                break;
            case 'Category':
                setCategory(info.name);
                setAbbrevCategory(info.abb);
                setDescriptionCategory(info.desc);
                setSelectMainCategory(info.mainId);
                setShowEditModal(true);
                break;
            case 'Category Sub 1':
                setCategory1(info.name);
                setAbbrevCategory1(info.abb);
                setDescriptionCategory1(info.desc);
                setSelectMainCategory(info.mainId);
                setSelectCategory(info.categories);
                setShowEditModal(true);
                break;
            case 'Category Sub 2':
                setCategory2(info.name);
                setAbbrevCategory2(info.abb);
                setDescriptionCategory2(info.desc);
                setSelectMainCategory(info.mainId);
                setSelectCategory(info.categories);
                setSelectCategory1(info.firstCategories);
                setShowEditModal(true);
                break;
            case 'Category Sub 3':
                setCategory3(info.name);
                setAbbrevCategory3(info.abb);
                setDescriptionCategory3(info.desc);
                setSelectMainCategory(info.mainId);
                setSelectCategory(info.categories);
                setSelectCategory1(info.firstCategories);
                setSelectCategory2(info.secondCategories);
                setShowEditModal(true);
                break;
            case 'Materials or Services':
                setMaterialService(info.name);
                setAbbrevMaterial(info.abb);
                setDescriptionMaterial(info.desc);
                setMaterialType(info.types);
                setSelectMainCategory(info.mainId);
                setSelectCategory(info.categories);
                setSelectCategory1(info.firstCategories);
                setSelectCategory2(info.secondCategories);
                setSelectCategory3(info.thirdCategories);
                setShowEditModal(true);
                break;
            case 'Materials or Services Type':
                setMaterialTypeInput(info.name);
                setSelectMaterialService(info.material);
                setShowEditModal(true);
                break;
            default:
                break;
        }
    };
    const addBtn = () => {
        switch (modalTabValue) {
            case 0:
                mainCategoryPost('services/Material/MainCategory/CreateMainCategory');
                break;
            case 1:
                categoryPost('services/Material/Category/CreateCategory');
                break;
            case 2:
                categorySub1Post('services/Material/CategoryFirstSub/CreateCategoryFirstSub');
                break;
            case 3:
                categorySub2Post('services/Material/CategorySecondSub/CreateCategorySecondSub');
                break;
            case 4:
                categorySub3Post('services/Material/CategoryThirdSub/CreateCategoryThirdSub');
                break;
            case 5:
                materialServicePost('services/Material/MaterialOrServices/CreateMaterialOrServices');
                break;
            case 6:
                materialTypePost('services/Material/MaterialOrServicesType/CreateMaterialOrServicesType');
                break;
            default:
                break;
        }
    };
    const updateBtn = () => {
        switch (modalTabValue) {
            case 0:
                mainCategoryPost('services/Material/MainCategory/UpdateMainCategory', infoById);
                break;
            case 1:
                categoryPost('services/Material/Category/UpdateCategory', infoById);
                break;
            case 2:
                categorySub1Post('services/Material/CategoryFirstSub/UpdateCategoryFirstSub', infoById);
                break;
            case 3:
                categorySub2Post('services/Material/CategorySecondSub/UpdateCategorySecondSub', infoById);
                break;
            case 4:
                categorySub3Post('services/Material/CategoryThirdSub/UpdateCategoryThirdSub', infoById);
                break;
            case 5:
                materialServicePost('services/Material/MaterialOrServices/UpdateMaterialOrServices', infoById);
                break;
            case 6:
                materialTypePost('services/Material/MaterialOrServicesType/UpdateMaterialOrServicesType', infoById);
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        switch (selectedTab) {
            case 'Main Category':
                setModalTabValue(0);
                break;
            case 'Category':
                setModalTabValue(1);
                break;
            case 'Category Sub 1':
                setModalTabValue(2);
                break;
            case 'Category Sub 2':
                setModalTabValue(3);
                break;
            case 'Category Sub 3':
                setModalTabValue(4);
                break;
            case 'Materials or Services':
                setModalTabValue(5);
                break;
            case 'Materials or Services Type':
                setModalTabValue(6);
                break;
            default:
                break;
        }
    }, [selectedTab]);
    useEffect(() => {
        switch (selectTab.key) {
            case 0:
                setModalHeader('Main Category');
                break;
            case 1:
                setModalHeader('Category');
                break;
            case 2:
                setModalHeader('Category Sub 1');
                break;
            case 3:
                setModalHeader('Category Sub 2');
                break;
            case 4:
                setModalHeader('Category Sub 3');
                break;
            case 5:
                setModalHeader('Materials or Services');
                break;
            case 6:
                setModalHeader('Materials or Services Type');
                break;
            default:
                break;
        }
    }, [modalTabValue, selectTab.key]);
    const cancelBtn = () => {
        setMainCategory('');
        setMainCategoryColor('');
        setAbbrev('');
        setDescription('');
        setCategory('');
        setAbbrevCategory('');
        setDescriptionCategory('');
        setCategory1('');
        setAbbrevCategory1('');
        setDescriptionCategory1('');
        setCategory2('');
        setAbbrevCategory2('');
        setDescriptionCategory2('');
        setCategory3('');
        setAbbrevCategory3('');
        setDescriptionCategory3('');
        setMaterialService('');
        setAbbrevMaterial('');
        setDescriptionMaterial('');
        setMaterialTypeInput('');
        setSelectMainCategory();
        setSelectCategory([]);
        setSelectCategory1([]);
        setSelectCategory2([]);
        setSelectCategory3([]);
        setSelectMaterialService([]);
        // setModalTabValue(0);
        setShowAddModal(false);
    };
    const toggle = () => {
        setMainCategory('');
        setMainCategoryColor('');
        setAbbrev('');
        setDescription('');
        setCategory('');
        setAbbrevCategory('');
        setDescriptionCategory('');
        setCategory1('');
        setAbbrevCategory1('');
        setDescriptionCategory1('');
        setCategory2('');
        setAbbrevCategory2('');
        setDescriptionCategory2('');
        setCategory3('');
        setAbbrevCategory3('');
        setDescriptionCategory3('');
        setMaterialService('');
        setAbbrevMaterial('');
        setDescriptionMaterial('');
        setMaterialTypeInput('');
        setSelectMainCategory();
        setSelectCategory([]);
        setSelectCategory1([]);
        setSelectCategory2([]);
        setSelectCategory3([]);
        setSelectMaterialService([]);
        // setModalTabValue(0);
        setShowAddModal(!showAddModal);
    };
    const cancelUpdateBtn = () => {
        setMainCategory('');
        setMainCategoryColor('');
        setAbbrev('');
        setDescription('');
        setCategory('');
        setAbbrevCategory('');
        setDescriptionCategory('');
        setCategory1('');
        setAbbrevCategory1('');
        setDescriptionCategory1('');
        setCategory2('');
        setAbbrevCategory2('');
        setDescriptionCategory2('');
        setCategory3('');
        setAbbrevCategory3('');
        setDescriptionCategory3('');
        setMaterialService('');
        setAbbrevMaterial('');
        setDescriptionMaterial('');
        setMaterialTypeInput('');
        setSelectMainCategory();
        setSelectCategory([]);
        setSelectCategory1([]);
        setSelectCategory2([]);
        setSelectCategory3([]);
        setSelectMaterialService([]);
        setMaterialType([]);
        setInfoById(null);
        // setModalTabValue(0);
        setShowEditModal(false);
    };
    const toggleUpdate = () => {
        setMainCategory('');
        setMainCategoryColor('');
        setAbbrev('');
        setDescription('');
        setCategory('');
        setAbbrevCategory('');
        setDescriptionCategory('');
        setCategory1('');
        setAbbrevCategory1('');
        setDescriptionCategory1('');
        setCategory2('');
        setAbbrevCategory2('');
        setDescriptionCategory2('');
        setCategory3('');
        setAbbrevCategory3('');
        setDescriptionCategory3('');
        setMaterialService('');
        setAbbrevMaterial('');
        setDescriptionMaterial('');
        setMaterialTypeInput('');
        setSelectMainCategory();
        setSelectCategory([]);
        setSelectCategory1([]);
        setSelectCategory2([]);
        setSelectCategory3([]);
        setSelectMaterialService([]);
        setMaterialType([]);
        setInfoById(null);
        // setModalTabValue(0);
        setShowEditModal(!showEditModal);
    };
    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {/* <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> */}
            <ToastContainer />
            {selectTab.key === 0 && (
                <MainCategory
                    addModal={addModal}
                    data={mainCategoryData}
                    setData={setMainCategoryData}
                    updateModal={UpdateModal}
                />
            )}
            {selectTab.key === 1 && (
                <Category
                    addModal={addModal}
                    updateModal={UpdateModal}
                    data={categoryData}
                    setData={setCategoryData}
                    selectMainCategory={selectMainCategoryFilterAll}
                    setSelectMainCategory={setSelectMainCategoryFilterAll}
                    optionsMain={optionsMainCategory}
                    applyFilter={applyFilterCategory}
                    statusCategoryFilter={statusCategoryFilter}
                    closeFilter={closeFilterCategory}
                    setCloseFilter={setCloseFilterCategory}
                />
            )}
            {selectTab.key === 2 && (
                <CategorySub1
                    addModal={addModal}
                    updateModal={UpdateModal}
                    data={category1Data}
                    setData={setCategory1Data}
                    selectMainCategory={selectMainCategoryFilter}
                    setSelectMainCategory={setSelectMainCategoryFilter}
                    optionsMain={optionsMainCategory}
                    selectCategory={selectCategoryFilter}
                    setSelectCategory={setSelectCategoryFilter}
                    optionsCategory={optionsCategoryFilter}
                    applyFilter={applyFilterCategorySub1}
                    statusCategory1Filter={statusCategory1Filter}
                    closeFilter={closeFilterCategory1}
                    setCloseFilter={setCloseFilterCategory1}
                />
            )}
            {selectTab.key === 3 && (
                <CategorySub2
                    addModal={addModal}
                    updateModal={UpdateModal}
                    data={category2Data}
                    setData={setCategory2Data}
                    selectMainCategory={selectMainCategoryFilter}
                    setSelectMainCategory={setSelectMainCategoryFilter}
                    optionsMain={optionsMainCategory}
                    selectCategory={selectCategoryFilter}
                    setSelectCategory={setSelectCategoryFilter}
                    optionsCategory={optionsCategoryFilter}
                    selectCategory1={selectCategory1Filter}
                    setSelectCategory1={setSelectCategory1Filter}
                    optionsCategory1={optionsCategory1Filter}
                    applyFilter={applyFilterCategorySub2}
                    statusCategory2Filter={statusCategory2Filter}
                    closeFilter={closeFilterCategory2}
                    setCloseFilter={setCloseFilterCategory2}
                />
            )}
            {selectTab.key === 4 && (
                <CategorySub3
                    addModal={addModal}
                    updateModal={UpdateModal}
                    data={category3Data}
                    setData={setCategory3Data}
                    selectMainCategory={selectMainCategoryFilter}
                    setSelectMainCategory={setSelectMainCategoryFilter}
                    optionsMain={optionsMainCategory}
                    selectCategory={selectCategoryFilter}
                    setSelectCategory={setSelectCategoryFilter}
                    optionsCategory={optionsCategoryFilter}
                    selectCategory1={selectCategory1Filter}
                    setSelectCategory1={setSelectCategory1Filter}
                    optionsCategory1={optionsCategory1Filter}
                    selectCategory2={selectCategory2Filter}
                    setSelectCategory2={setSelectCategory2Filter}
                    optionsCategory2={optionsCategory2Filter}
                    applyFilter={applyFilterCategorySub3}
                    statusCategory3Filter={statusCategory3Filter}
                    closeFilter={closeFilterCategory3}
                    setCloseFilter={setCloseFilterCategory3}
                />
            )}
            {selectTab.key === 5 && (
                <MaterialService
                    addModal={addModal}
                    updateModal={UpdateModal}
                    data={materialServiceData}
                    setData={setMaterialServiceData}
                    selectMainCategory={selectMainCategoryFilter}
                    setSelectMainCategory={setSelectMainCategoryFilter}
                    optionsMain={optionsMainCategory}
                    selectCategory={selectCategoryFilter}
                    setSelectCategory={setSelectCategoryFilter}
                    optionsCategory={optionsCategoryFilter}
                    selectCategory1={selectCategory1Filter}
                    setSelectCategory1={setSelectCategory1Filter}
                    optionsCategory1={optionsCategory1Filter}
                    selectCategory2={selectCategory2Filter}
                    setSelectCategory2={setSelectCategory2Filter}
                    optionsCategory2={optionsCategory2Filter}
                    selectCategory3={selectCategory3Filter}
                    setSelectCategory3={setSelectCategory3Filter}
                    optionsCategory3={optionsCategory3Filter}
                    materialServiceFilter={materialServiceFilter}
                    applyFilter={applyFilterMaterialService}
                    closeFilter={closeFilterMaterialService}
                    setCloseFilter={setCloseFilterMaterialService}
                />
            )}
            {selectTab.key === 6 && (
                <MaterialType
                    addModal={addModal}
                    updateModal={UpdateModal}
                    data={materialTypeData}
                    setData={setMaterialTypeData}
                    applyFilter={applyFilterMaterialType}
                    selectMaterialServiceFilter={selectMaterialServiceFilter}
                    setSelectMaterialServiceFilter={setSelectMaterialServiceFilter}
                    optionsMaterialServiceFilter={optionsMaterialServiceFilter}
                    closeFilter={closeFilterMaterialType}
                    setCloseFilter={setCloseFilterMaterialType}
                />
            )}
            {showAddModal && (
                <GlobalModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    toggle={toggle}
                    header={t(`Add ${modalHeader}`)}
                    body={
                        <Body
                            addBtn={addBtn}
                            cancelBtn={cancelBtn}
                            modalTabValue={modalTabValue}
                            setModalTabValue={setModalTabValue}
                            mainCategoryModalProps={mainCategoryModalProps}
                            mainCategoryModalStatus={mainCategoryModalStatus}
                            categoryModalProps={categoryModalProps}
                            categoryModalStatus={categoryModalStatus}
                            category1ModalProps={category1ModalProps}
                            category1ModalStatus={category1ModalStatus}
                            category2ModalProps={category2ModalProps}
                            category2ModalStatus={category2ModalStatus}
                            category3ModalProps={category3ModalProps}
                            category3ModalStatus={category3ModalStatus}
                            materialServiceModalProps={materialServiceModalProps}
                            materialServiceModalStatus={materialServiceModalStatus}
                            materialTypeModalProps={materialTypeModalProps}
                            materialTypeModalStatus={materialTypeModalStatus}
                            setOptionsMainCategory={setOptionsMainCategory}
                        />
                    }
                    footer={<Footer addBtn={addBtn} cancelBtn={cancelBtn} />}
                />
            )}
            {showEditModal && (
                <GlobalModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    toggle={toggleUpdate}
                    header={t(`Update ${modalHeader}`)}
                    body={
                        <UpdateBody
                            updateBtn={updateBtn}
                            cancelBtn={cancelUpdateBtn}
                            modalTabValue={modalTabValue}
                            setModalTabValue={setModalTabValue}
                            mainCategoryModalProps={mainCategoryModalProps}
                            mainCategoryModalStatus={mainCategoryModalStatus}
                            categoryModalProps={categoryModalProps}
                            categoryModalStatus={categoryModalStatus}
                            category1ModalProps={category1ModalProps}
                            category1ModalStatus={category1ModalStatus}
                            category2ModalProps={category2ModalProps}
                            category2ModalStatus={category2ModalStatus}
                            category3ModalProps={category3ModalProps}
                            category3ModalStatus={category3ModalStatus}
                            materialServiceModalProps={materialServiceModalProps}
                            materialServiceModalStatus={materialServiceModalStatus}
                            materialTypeModalProps={materialTypeModalProps}
                            materialTypeModalStatus={materialTypeModalStatus}
                        />
                    }
                    footer={<UpdateFooter updateBtn={updateBtn} cancelBtn={cancelUpdateBtn} />}
                />
            )}
            {showErrorModal && <ErorModal modalShow={showErrorModal} setModalShow={setShowErrorModal} error={error} />}
        </>
    );
};

export default React.memo(Materials);
