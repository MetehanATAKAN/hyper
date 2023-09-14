import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import 'antd/dist/antd.css';
import { SingleSelects, MultipleSelects } from '../../../../../../components/GlobalNew/Selects';
import { NewTextArea } from '../../../../../../components/GlobalNew/Inputs';
import { mdiArrowCollapse, mdiArrowExpand } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiGet, FetchApiPost } from '../../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Body = ({ isClickAdd, setAddButtonDisableStatus, setFilterData, setIsShow }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [arrow, setArrow] = useState(false);

    const [asWellAsSeller, setAsWellAsSeller] = useState(false);

    const [manufacturerCountryOptions, setManufacturerCountryOptions] = useState([]);
    const [selectedManufacturerCountry, setSelectedManufacturerCountry] = useState();

    const [manufacturerCompanyOptions, setManufacturerCompanyOptions] = useState([]);
    const [selectedManufacturerCompany, setSelectedManufacturerCompany] = useState();

    const [manufacturerMainTypeOptions, setManufacturerMainTypeOptions] = useState([]);
    const [selectedManufacturerMainType, setSelectedManufacturerMainType] = useState();

    const [sellerCountryOptions, setSellerCountryOptions] = useState([]);
    const [selectedSellerCountry, setSelectedSellerCountry] = useState();

    const [sellerCompanyOptions, setSellerCompanyOptions] = useState([]);
    const [selectedSellerCompany, setSelectedSellerCompany] = useState();

    const [dutiesOptions, setDutiesOptions] = useState([]);
    const [selectedDuties, setSelectedDuties] = useState();

    // Material All filter data
    const [materialFilterData, setMaterialFilterData] = useState([]);

    const [mainCategoryOptions, setMainCategoryOptions] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState();

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    const [categorySubOneOptions, setCategorySubOneOptions] = useState([]);
    const [selectedCategorySubOne, setSelectedCategorySubOne] = useState();

    const [categorySubTwoOptions, setCategorySubTwoOptions] = useState([]);
    const [selectedCategorySubTwo, setSelectedCategorySubTwo] = useState();

    const [categorySubThreeOptions, setCategorySubThreeOptions] = useState([]);
    const [selectedCategorySubThree, setSelectedCategorySubThree] = useState();

    const [materialOrServiceFilteredOptions, setMaterialOrServiceFilteredOptions] = useState([]);

    const [countryForUseOptions, setCountryForUseOptions] = useState([]);
    const [selectedCountryForUse, setSelectedCountryForUse] = useState();

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState();

    const [paymentTermsOptions, setPaymentTermsOptions] = useState([]);
    const [selectedPaymentTerms, setSelectedPaymentTerms] = useState();

    const [methodOfPaymentOptions, setMethodOfPaymentOptions] = useState([]);
    const [selectedMethodOfPayment, setSelectedMethodOfPayment] = useState();

    const [materialOrServiceOptions, setMaterialOrServiceOptions] = useState([]);
    const [selectedMaterialOrService, setSelectedMaterialOrService] = useState();

    const [materialOrServiceTypeOptions, setMaterialOrServiceTypeOptions] = useState([]);
    const [selectedMaterialOrServiceType, setSelectedMaterialOrServiceType] = useState();

    const [modelOrFormOptions, setModelOrFormOptions] = useState([]);
    const [selectedModelOrForm, setSelectedModelOrForm] = useState();

    const [technicalInfo, setTechnicalInfo] = useState('');

    const [copy, setCopy] = useState({
        country: undefined,
        duties: undefined,
        dutiesOptions: [],
        company: undefined,
        companyOptions: [],
        countryForUse: [],
        currency: undefined,
        paymentTerms: undefined,
        methodOfPayment: undefined,
        materialFilterData: [],
        mainCategory: undefined,
        mainCategoryOptions: [],
        categoryOptions: [],
        category: undefined,
        categorySubOne: undefined,
        categorySubOneOptions: [],
        categorySubTwo: undefined,
        categorySubTwoOptions: [],
        categorySubThree: undefined,
        categorySubThreeOptions: [],
        materialOrService: undefined,
        materialOrServiceOptions: materialOrServiceOptions,
        materialOrServiceType: undefined,
        materialOrServiceFilteredOptions: [],
        materialOrServiceTypeOptions: [],
        modelOrFormOptions: [],
        modelOrForm: undefined,
        technicalInfo: '',
        arrow: false,
    });

    const [copyDataContainer, setCopyDataContainer] = useState([]);

    const [asWellDuties, setAsWellDuties] = useState();
    const [asWellDutiesOptions, setAsWellDutiesOptions] = useState([]);

    const addCopyData = () => {
        if (asWellAsSeller) {
            setCopyDataContainer((prev) => [
                ...prev,
                {
                    ...copy,
                    company: selectedManufacturerCompany,
                    country: selectedManufacturerCountry,
                    duties: asWellDuties,
                    dutiesOptions: asWellDutiesOptions,
                    materialOrServiceOptions: materialOrServiceOptions,
                    materialFilterData: materialFilterData,
                    mainCategoryOptions: mainCategoryOptions,
                },
            ]);
        } else {
            setCopyDataContainer((prev) => [
                ...prev,
                {
                    ...copy,
                    materialOrServiceOptions: materialOrServiceOptions,
                    materialFilterData: materialFilterData,
                    mainCategoryOptions: mainCategoryOptions,
                },
            ]);
        }
    };

    const deleteCopyData = (index) => {
        setCopyDataContainer((prev) => prev.filter((item, i) => i !== index));
    };

    console.log(copyDataContainer);

    // material filtre son hali
    useEffect(() => {
        let filtermaterialData = [];
        materialFilterData.map((item) => {
            item.categoryThirdSubs.map((subCat) => {
                filtermaterialData.filter((c) => c?.value === subCat.id).length === 0 &&
                    selectedCategorySubThree.value === subCat.id &&
                    filtermaterialData.push({ value: subCat.id, label: subCat.name });
            });
        });
        setMaterialOrServiceFilteredOptions(filtermaterialData);
    }, [selectedCategorySubThree]);

    console.log('materialOrServiceFilteredOptions', materialOrServiceFilteredOptions);

    // Add Button Disable
    useEffect(() => {
        if (copyDataContainer.length === 0) {
            if (
                selectedManufacturerCountry &&
                selectedManufacturerCompany &&
                selectedManufacturerMainType &&
                selectedCountryForUse &&
                selectedCurrency &&
                selectedMaterialOrService &&
                selectedSellerCountry &&
                selectedDuties &&
                selectedSellerCompany &&
                selectedMaterialOrServiceType &&
                selectedModelOrForm
            ) {
                setAddButtonDisableStatus(false);
            } else {
                setAddButtonDisableStatus(true);
            }
        } else {
            let isDisable = false;
            if (
                selectedManufacturerCountry &&
                selectedManufacturerCompany &&
                selectedManufacturerMainType &&
                selectedCountryForUse &&
                selectedCurrency &&
                selectedMaterialOrService &&
                selectedSellerCountry &&
                selectedDuties &&
                selectedSellerCompany &&
                selectedMaterialOrServiceType &&
                selectedModelOrForm
            ) {
                let a = false;
                copyDataContainer.map((item) => {
                    if (
                        item.country === undefined ||
                        item.duties === undefined ||
                        item.company === undefined ||
                        item.materialOrService === undefined ||
                        item.materialOrServiceType === undefined ||
                        item.modelOrForm === undefined ||
                        item.countryForUse === undefined ||
                        item.currency === undefined
                    ) {
                        a = true;
                    }
                });
                isDisable = a;
            } else {
                isDisable = true;
            }
            setAddButtonDisableStatus(isDisable);
        }
    }, [
        selectedManufacturerCountry,
        selectedManufacturerCompany,
        selectedManufacturerMainType,
        selectedCountryForUse,
        selectedCurrency,
        selectedMaterialOrService,
        copyDataContainer,
        selectedSellerCountry,
        selectedDuties,
        selectedSellerCompany,
        selectedMaterialOrServiceType,
        selectedModelOrForm,
    ]);

    // As Well As Seller Switch
    useEffect(() => {
        if (asWellAsSeller) {
            let dutiesItems = [];
            if (selectedManufacturerCountry && selectedManufacturerCompany && selectedManufacturerMainType) {
                FetchApiPost('services/Material/ManufacturerToSeller/GetDutiesTypesByManufacturer', 'POST', {
                    manufacturerId: selectedManufacturerCompany.value,
                    mainTypeId: selectedManufacturerMainType.value,
                }).then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setDutiesOptions(data.data.map((item) => ({ value: item.id, label: item.name })));
                            data.data.map((item) => dutiesItems.push({ value: item.id, label: item.name }));
                            if (data.data.length === 1) {
                                setCopyDataContainer((prev) =>
                                    prev.map((item, index) => {
                                        return {
                                            ...item,
                                            country: selectedManufacturerCountry,
                                            company: selectedManufacturerCompany,
                                            duties: { value: data.data[0].id, label: data.data[0].name },
                                            dutiesOptions: data.data.map((item) => ({
                                                value: item.id,
                                                label: item.name,
                                            })),
                                        };
                                    })
                                );
                            } else {
                                setCopyDataContainer((prev) =>
                                    prev.map((item, index) => {
                                        return {
                                            ...item,
                                            country: selectedManufacturerCountry,
                                            company: selectedManufacturerCompany,
                                            duties: undefined,
                                            dutiesOptions: data.data.map((item) => ({
                                                value: item.id,
                                                label: item.name,
                                            })),
                                        };
                                    })
                                );
                            }
                            if (data.data.length === 1) {
                                setSelectedDuties({ value: data.data[0].id, label: data.data[0].name });
                                setAsWellDuties({ value: data.data[0]?.id, label: data.data[0]?.name });
                            }
                        });
                    }
                });
            }
            setAsWellDutiesOptions(dutiesItems);

            setSelectedSellerCompany(selectedManufacturerCompany);
            setSelectedSellerCountry(selectedManufacturerCountry);
        }
    }, [asWellAsSeller]);

    console.log(selectedCurrency);
    // ADD
    useEffect(() => {
        if (isClickAdd) {
            let countryForUseIdsArray = selectedCountryForUse.map((c) => c.value);
            let sellerData = [
                {
                    sellerId: selectedSellerCompany !== undefined ? selectedSellerCompany.value : 0,
                    dutiesTypeId: selectedDuties !== undefined ? selectedDuties.value : 0,
                    countryForUseIds: countryForUseIdsArray,
                    currencies: [selectedCurrency.label],
                    paymentTerms: ['string'],
                    methodOfPayments: ['string'],
                    materialId: selectedMaterialOrService.value,
                    materialTypeId:
                        selectedMaterialOrServiceType !== undefined ? selectedMaterialOrServiceType.value : 0,
                    modelOrForm: selectedModelOrForm !== undefined ? selectedModelOrForm.label : '',
                },
                ...copyDataContainer.map((item, index) => {
                    return {
                        sellerId: item.company !== undefined ? item.company.value : 0,
                        dutiesTypeId: item.duties !== undefined ? item.duties.value : 0,
                        countryForUseIds: item.countryForUse.map((c) => c.value),
                        currencies: [item.currency.label],
                        paymentTerms: ['string'],
                        methodOfPayments: ['string'],
                        materialId: item.materialOrService !== undefined ? item.materialOrService.value : 0,
                        materialTypeId: item.materialOrServiceType !== undefined ? item.materialOrServiceType.value : 0,
                        modelOrForm: item.modelOrForm !== undefined ? item.modelOrForm.label : '',
                    };
                }),
            ];

            FetchApiPost('services/Material/ManufacturerToSeller/CreateManufacturerToSeller', 'POST', {
                manufacturerId: selectedManufacturerCompany.value,
                manufacturerMainTypeId: selectedManufacturerMainType.value,
                sellers: sellerData,
                createdBy: localStorage.getItem('userName'),
            }).then((res) => {
                if (res.status === 201) {
                    res.json().then((data) => {
                        setFilterData((prev) => [
                            ...prev,
                            ...data.data.map((item) => ({
                                ...item,
                                manufacturerMainTypeId: item.manufacturerMainType.id,
                            })),
                        ]);
                        setIsShow(false);
                    });
                }
            });
        }
    }, [isClickAdd]);

    // manufacturer, seller country || seller country for use
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllCountries', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSellerCountryOptions(
                        data.map((c) => {
                            return { value: c.CountryId, label: c.CountryName };
                        })
                    );
                    setCountryForUseOptions(
                        data.map((c) => {
                            return { value: c.CountryId, label: c.CountryName };
                        })
                    );
                    setManufacturerCountryOptions(
                        data.map((c) => {
                            return { value: c.CountryId, label: c.CountryName };
                        })
                    );
                });
            } else if (res.status === 500) {
                history.push('/error-500');
            }
        });
    }, []);

    // manufacturer company
    useEffect(() => {
        setSelectedManufacturerCompany();
        setManufacturerCompanyOptions([]);
        setSelectedManufacturerMainType();
        setManufacturerMainTypeOptions([]);

        setSelectedMaterialOrService();
        setMaterialOrServiceOptions([]);
        setSelectedMaterialOrServiceType();
        setMaterialOrServiceTypeOptions([]);
        setSelectedModelOrForm();
        setModelOrFormOptions([]);

        setMainCategoryOptions([]);
        setSelectedMainCategory();

        let resetCopyData = copyDataContainer.map((item, index) => {
            return {
                ...item,
                materialOrService: undefined,
                materialOrServiceOptions: [],
                materialOrServiceType: undefined,
                materialOrServiceTypeOptions: [],
                modelOrForm: undefined,
                modelOrFormOptions: [],
                mainCategory: undefined,
                mainCategoryOptions: [],
                category: undefined,
                categoryOptions: [],
                categorySubOne: undefined,
                categorySubOneOptions: [],
                categorySubTwo: undefined,
                categorySubTwoOptions: [],
                categorySubThree: undefined,
                categorySubThreeOptions: [],
                technicalInfo: '',
            };
        });
        setCopyDataContainer(resetCopyData);

        if (
            selectedManufacturerCountry !== null &&
            selectedManufacturerCountry !== undefined &&
            selectedManufacturerCountry?.value !== 0
        ) {
            FetchApiGet(
                `services/Material/ManufacturerToSeller/GetManufacturersByCountryId?countryId=${selectedManufacturerCountry.value}`,
                'GET'
            ).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setManufacturerCompanyOptions(
                            data.data.map((c) => {
                                return { value: c.id, label: c.name };
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        } else {
            setSelectedManufacturerCompany();
            setManufacturerCompanyOptions([]);
            setSelectedManufacturerMainType();
            setManufacturerMainTypeOptions([]);
        }
    }, [selectedManufacturerCountry]);

    // manufacturer main type
    useEffect(() => {
        setSelectedManufacturerMainType();
        setManufacturerMainTypeOptions([]);
        setSelectedMaterialOrService();
        setMaterialOrServiceOptions([]);

        setMainCategoryOptions([]);
        setSelectedMainCategory();
        let resetCopyData = copyDataContainer.map((item, index) => {
            return {
                ...item,
                materialOrService: undefined,
                materialOrServiceOptions: [],
                materialOrServiceType: undefined,
                materialOrServiceTypeOptions: [],
                modelOrForm: undefined,
                modelOrFormOptions: [],
                mainCategory: undefined,
                mainCategoryOptions: [],
                category: undefined,
                categoryOptions: [],
                categorySubOne: undefined,
                categorySubOneOptions: [],
                categorySubTwo: undefined,
                categorySubTwoOptions: [],
                categorySubThree: undefined,
                categorySubThreeOptions: [],
                technicalInfo: '',
            };
        });
        setCopyDataContainer(resetCopyData);

        if (
            selectedManufacturerCompany !== null &&
            selectedManufacturerCompany !== undefined &&
            selectedManufacturerCompany?.value !== 0
        ) {
            FetchApiPost(
                `services/Material/ManufacturerToSeller/GetMainTypesByManufacturerId?manufacturerId=${selectedManufacturerCompany.value}`,
                'GET'
            ).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setManufacturerMainTypeOptions(
                            data?.data?.map((m) => {
                                return { value: m.id, label: m.name };
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        } else {
            setSelectedManufacturerMainType();
            setManufacturerMainTypeOptions([]);
        }
    }, [selectedManufacturerCompany]);

    // seller duties type
    useEffect(() => {
        if (asWellAsSeller === false) {
            setSelectedDuties();
            setDutiesOptions([]);
            setSelectedSellerCompany();
            setSellerCompanyOptions([]);
        }

        if (
            selectedSellerCountry !== null &&
            selectedSellerCountry !== undefined &&
            selectedSellerCountry?.value !== 0 &&
            asWellAsSeller === false
        ) {
            FetchApiGet(
                `services/Material/Company/GetDutiesTypesByCuntryId?countryId=${selectedSellerCountry.value}`,
                'GET'
            ).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setDutiesOptions(
                            data.data.map((c) => {
                                return { value: c.id, label: c.name };
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        }
    }, [selectedSellerCountry]);

    // seller company
    useEffect(() => {
        if (asWellAsSeller === false) {
            setSelectedSellerCompany();
            setSellerCompanyOptions([]);
        } else {
            if (selectedDuties === undefined) {
                setSelectedDuties();
                setDutiesOptions([]);
            }
        }

        if (
            selectedDuties !== null &&
            selectedDuties !== undefined &&
            selectedDuties?.value !== 0 &&
            asWellAsSeller === false
        ) {
            FetchApiPost(`services/Material/Company/GetCompanyByDutiesTypeId`, 'POST', {
                dutiesTypeId: selectedDuties.value,
                countryId: selectedSellerCountry.value,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setSellerCompanyOptions(
                            data.data.map((c) => {
                                return { value: c.id, label: c.name };
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        }
    }, [selectedDuties]);

    // seller currency ALL
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllCurrency', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setCurrencyOptions(
                        data.map((c) => {
                            return { value: c.Id, label: c.Val1 };
                        })
                    );
                });
            }
        });
    }, []);

    // material or service main category seçildiğinde CATEGORY filtrelenmesi
    useEffect(() => {
        setSelectedCategory();
        setCategoryOptions([]);
        setSelectedCategorySubOne();
        setCategorySubOneOptions([]);
        setSelectedCategorySubTwo();
        setCategorySubTwoOptions([]);
        setSelectedCategorySubThree();
        setCategorySubThreeOptions([]);
        if (selectedMainCategory !== null && selectedMainCategory !== undefined && selectedMainCategory?.value !== 0) {
            let categoryItems = [];
            materialFilterData.map((item) => {
                item.categories.map((cat) => {
                    categoryItems.filter((c) => c.value === cat.id).length === 0 &&
                        categoryItems.push({ value: cat.id, label: cat.name });
                });
            });
            setCategoryOptions(categoryItems);
        } else {
            setSelectedCategory();
            setCategoryOptions([]);
            setSelectedCategorySubOne();
            setCategorySubOneOptions([]);
            setSelectedCategorySubTwo();
            setCategorySubTwoOptions([]);
            setSelectedCategorySubThree();
            setCategorySubThreeOptions([]);
        }
    }, [selectedMainCategory]);

    // material or service main category seçildiğinde SUB ONE CATEGORY filtrelenmesi
    useEffect(() => {
        setSelectedCategorySubOne();
        setCategorySubOneOptions([]);
        setSelectedCategorySubTwo();
        setCategorySubTwoOptions([]);
        setSelectedCategorySubThree();
        setCategorySubThreeOptions([]);
        if (selectedCategory !== null && selectedCategory !== undefined && selectedCategory?.value !== 0) {
            let subCategoryItems = [];
            materialFilterData.map((item) => {
                item.categoryFirstSubs.map((subCat) => {
                    subCategoryItems.filter((c) => c.value === subCat.id).length === 0 &&
                        subCategoryItems.push({ value: subCat.id, label: subCat.name });
                });
            });
            setCategorySubOneOptions(subCategoryItems);
        } else {
            setSelectedCategorySubOne();
            setCategorySubOneOptions([]);
            setSelectedCategorySubTwo();
            setCategorySubTwoOptions([]);
            setSelectedCategorySubThree();
            setCategorySubThreeOptions([]);
        }
    }, [selectedCategory]);

    // material or service main category seçildiğinde SUB TWO CATEGORY filtrelenmesi
    useEffect(() => {
        setSelectedCategorySubTwo();
        setCategorySubTwoOptions([]);
        setSelectedCategorySubThree();
        setCategorySubThreeOptions([]);
        if (
            selectedCategorySubOne !== null &&
            selectedCategorySubOne !== undefined &&
            selectedCategorySubOne?.value !== 0
        ) {
            let subCategoryItems = [];
            materialFilterData.map((item) => {
                item.categorySecondSubs.map((subCat) => {
                    subCategoryItems.filter((c) => c.value === subCat.id).length === 0 &&
                        subCategoryItems.push({ value: subCat.id, label: subCat.name });
                });
            });
            setCategorySubTwoOptions(subCategoryItems);
        } else {
            setSelectedCategorySubTwo();
            setCategorySubTwoOptions([]);
            setSelectedCategorySubThree();
            setCategorySubThreeOptions([]);
        }
    }, [selectedCategorySubOne]);

    // material or service main category seçildiğinde SUB THREE CATEGORY filtrelenmesi
    useEffect(() => {
        setSelectedCategorySubThree();
        setCategorySubThreeOptions([]);
        if (
            selectedCategorySubTwo !== null &&
            selectedCategorySubTwo !== undefined &&
            selectedCategorySubTwo?.value !== 0
        ) {
            let subCategoryItems = [];
            materialFilterData.map((item) => {
                item.categoryThirdSubs.map((subCat) => {
                    subCategoryItems.filter((c) => c.value === subCat.id).length === 0 &&
                        subCategoryItems.push({ value: subCat.id, label: subCat.name });
                });
            });
            setCategorySubThreeOptions(subCategoryItems);
        }
    }, [selectedCategorySubTwo]);

    // seller Material or Services
    // TECHNICAL INFO DA BURDAN GELİCEK SELECT İNE GÖRE
    useEffect(() => {
        setSelectedMaterialOrService();
        setMaterialOrServiceOptions([]);

        setMainCategoryOptions([]);
        setSelectedMainCategory();

        let resetCopyData = copyDataContainer.map((item, index) => {
            return {
                ...item,
                materialOrService: undefined,
                materialOrServiceOptions: [],
                materialOrServiceFilteredOptions: [],
                materialOrServiceType: undefined,
                materialOrServiceTypeOptions: [],
                modelOrForm: undefined,
                modelOrFormOptions: [],
                mainCategory: undefined,
                mainCategoryOptions: [],
                category: undefined,
                categoryOptions: [],
                categorySubOne: undefined,
                categorySubOneOptions: [],
                categorySubTwo: undefined,
                categorySubTwoOptions: [],
                categorySubThree: undefined,
                categorySubThreeOptions: [],
                technicalInfo: '',
            };
        });
        setCopyDataContainer(resetCopyData);

        if (
            selectedManufacturerCompany !== null &&
            selectedManufacturerCompany !== undefined &&
            selectedManufacturerCompany?.value !== 0 &&
            selectedManufacturerMainType !== null &&
            selectedManufacturerMainType !== undefined &&
            selectedManufacturerMainType?.value !== 0
        ) {
            FetchApiPost('services/Material/ManufacturerToSeller/GetMaterialsForSeller', 'POST', {
                manufacturerId: selectedManufacturerCompany.value,
                mainTypeId: selectedManufacturerMainType.value,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setMaterialOrServiceOptions(
                            data.data.map((m) => {
                                return { value: m.id, label: m.name };
                            })
                        );
                        setMaterialFilterData(data.data);
                        let mainCategoryItems = [];
                        data.data.map((item) => {
                            mainCategoryItems.filter((m) => m.value === item.mainCategory.id).length === 0 &&
                                mainCategoryItems.push({ value: item.mainCategory.id, label: item.mainCategory.name });
                        });
                        setMainCategoryOptions(mainCategoryItems);

                        if (copyDataContainer.length > 0) {
                            let newww = copyDataContainer.map((item) => {
                                return {
                                    ...item,
                                    materialFilterData: data.data,
                                    mainCategoryOptions: mainCategoryItems,
                                    materialOrServiceOptions: data.data.map((m) => {
                                        return { value: m.id, label: m.name };
                                    }),
                                };
                            });
                            setCopyDataContainer(newww);
                        }
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        }
    }, [selectedManufacturerCompany, selectedManufacturerMainType]);

    // seller Material or Services Type
    useEffect(() => {
        setSelectedMaterialOrServiceType();
        setMaterialOrServiceTypeOptions([]);
        setSelectedModelOrForm();
        setModelOrFormOptions([]);

        setTechnicalInfo('');
        if (
            selectedMaterialOrService !== null &&
            selectedMaterialOrService !== undefined &&
            selectedMaterialOrService?.value !== 0
        ) {
            let infoText = materialFilterData.filter((m) => m.id === selectedMaterialOrService.value);
            setTechnicalInfo(infoText[0].technicalInfo);
            FetchApiPost('services/Material/ManufacturerToSeller/GetMaterialTypesForSeller', 'POST', {
                manufacturerId: selectedManufacturerCompany.value,
                mainTypeId: selectedManufacturerMainType.value,
                materialId: selectedMaterialOrService.value,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setMaterialOrServiceTypeOptions(
                            data.data.map((m) => {
                                return { value: m.id, label: m.name };
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        }
    }, [history, selectedMaterialOrService]);

    // seller model or form
    useEffect(() => {
        setSelectedModelOrForm();
        setModelOrFormOptions([]);
        if (
            selectedMaterialOrServiceType !== null &&
            selectedMaterialOrServiceType !== undefined &&
            selectedMaterialOrServiceType?.value !== 0
        ) {
            FetchApiPost('services/Material/ManufacturerToSeller/GetModelOrFormForSeller', 'POST', {
                manufacturerId: selectedManufacturerCompany.value,
                mainTypeId: selectedManufacturerMainType.value,
                materialId: selectedMaterialOrService.value,
                materialTypeId: selectedMaterialOrServiceType.value,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setModelOrFormOptions(
                            data.data.map((m, index) => {
                                return { value: index, label: m };
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        }
    }, [selectedMaterialOrServiceType]);

    // COPY SELLER İŞLEMLERİ ------------------------------------------------------------------------------------------------------

    const handleSetCopyDataValue = (value, label, index, objectKey) => {
        console.log(label);
        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, [objectKey]: label };
                }
                return item;
            })
        );
    };

    const handleSetCopyDataCountry = (value, label, index) => {
        // setSelectedDuties();
        // setDutiesOptions([]);
        // setSelectedSellerCompany();
        // setSellerCompanyOptions([]);

        if (asWellAsSeller === false && value !== undefined) {
            FetchApiGet(`services/Material/Company/GetDutiesTypesByCuntryId?countryId=${value}`, 'GET').then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCopyDataContainer((prev) =>
                            prev.map((item, i) => {
                                if (i === index) {
                                    return {
                                        ...item,
                                        country: label,
                                        duties: undefined,
                                        dutiesOptions: data.data.map((c) => {
                                            return { value: c.id, label: c.name };
                                        }),
                                    };
                                }
                                return item;
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        }
        if (value === undefined) {
            setCopyDataContainer((prev) =>
                prev.map((item, i) => {
                    if (i === index) {
                        return {
                            ...item,
                            country: undefined,
                            duties: undefined,
                            dutiesOptions: [],
                            company: undefined,
                            companyOptions: [],
                        };
                    }
                    return item;
                })
            );
        }
    };

    const handleSetCopyDataDuties = (value, label, index) => {
        if (asWellAsSeller === false && value !== undefined) {
            FetchApiPost(`services/Material/Company/GetCompanyByDutiesTypeId`, 'POST', {
                dutiesTypeId: value,
                countryId: copyDataContainer[index].country.value,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCopyDataContainer((prev) =>
                            prev.map((item, i) => {
                                if (i === index) {
                                    return {
                                        ...item,
                                        duties: label,
                                        company: undefined,
                                        companyOptions: data.data.map((c) => {
                                            return { value: c.id, label: c.name };
                                        }),
                                    };
                                }
                                return item;
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        }
        if (value === undefined) {
            setCopyDataContainer((prev) =>
                prev.map((item, i) => {
                    if (i === index) {
                        return { ...item, duties: undefined, company: undefined, companyOptions: [] };
                    }
                    return item;
                })
            );
        }
    };

    const handleSetCopyDataCompany = (value, label, index) => {
        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, company: label };
                }
                return item;
            })
        );
    };

    const handleSetCopyDataMaterialOrService = (value, label, index) => {
        copyDataContainer[index].materialFilterData.map((item) => {
            if (item.id === value) {
                setCopyDataContainer((prev) =>
                    prev.map((itemD, i) => {
                        if (i === index) {
                            return {
                                ...itemD,
                                technicalInfo: item.technicalInfo,
                                materialOrServiceType: undefined,
                                modelOrForm: undefined,
                                modelOrFormOptions: [],
                                materialOrServiceTypeOptions: [],
                            };
                        }
                        return itemD;
                    })
                );
            }
        });
        if (
            selectedManufacturerCompany !== undefined &&
            selectedManufacturerMainType !== undefined &&
            value !== undefined
        ) {
            FetchApiPost('services/Material/ManufacturerToSeller/GetMaterialTypesForSeller', 'POST', {
                manufacturerId: selectedManufacturerCompany.value,
                mainTypeId: selectedManufacturerMainType.value,
                materialId: value,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCopyDataContainer((prev) =>
                            prev.map((item, i) => {
                                if (i === index) {
                                    return {
                                        ...item,
                                        materialOrServiceType: undefined,
                                        modelOrFormOptions: [],
                                        modelOrForm: undefined,
                                        materialOrService: label,
                                        materialOrServiceTypeOptions: data.data.map((m) => {
                                            return { value: m.id, label: m.name };
                                        }),
                                    };
                                }
                                return item;
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        } else {
            setCopyDataContainer((prev) =>
                prev.map((item, i) => {
                    if (i === index) {
                        return {
                            ...item,
                            materialOrService: undefined,
                            materialOrServiceType: undefined,
                            modelOrForm: undefined,
                            modelOrFormOptions: [],
                            materialOrServiceTypeOptions: [],
                        };
                    }
                    return item;
                })
            );
        }
    };

    const handleSetCopyDataMaterialOrServiceType = (value, label, index) => {
        console.log(value, label, index);
        if (
            selectedManufacturerCompany !== undefined &&
            selectedManufacturerMainType !== undefined &&
            value !== undefined &&
            copyDataContainer[index].materialOrService !== undefined
        ) {
            FetchApiPost('services/Material/ManufacturerToSeller/GetModelOrFormForSeller', 'POST', {
                manufacturerId: selectedManufacturerCompany.value,
                mainTypeId: selectedManufacturerMainType.value,
                materialId: copyDataContainer[index].materialOrService.value,
                materialTypeId: value,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCopyDataContainer((prev) =>
                            prev.map((item, i) => {
                                if (i === index) {
                                    return {
                                        ...item,
                                        modelOrForm: undefined,
                                        materialOrServiceType: label,
                                        modelOrFormOptions: data.data.map((m, mIndex) => {
                                            return { value: mIndex, label: m };
                                        }),
                                    };
                                }
                                return item;
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        } else {
            setCopyDataContainer((prev) =>
                prev.map((item, i) => {
                    if (i === index) {
                        return {
                            ...item,
                            materialOrServiceType: undefined,
                            modelOrForm: undefined,
                            modelOrFormOptions: [],
                        };
                    }
                    return item;
                })
            );
        }
    };

    const handleSetCopyDataArrow = (index) => {
        console.log(index);
        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, arrow: !item.arrow };
                }
                return item;
            })
        );
    };

    const handleSetCopyDataMainCategory = (value, label, index) => {
        let categoryItems = [];

        copyDataContainer.map((item, i) => {
            if (i === index) {
                item.materialFilterData.map((mItem) => {
                    mItem.categories.map((cat) => {
                        categoryItems.filter((c) => c.value === cat.id).length === 0 &&
                            categoryItems.push({ value: cat.id, label: cat.name });
                    });
                });
            }
        });

        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        mainCategory: label,
                        categoryOptions: categoryItems,
                        category: undefined,
                        categorySubOne: undefined,
                        categorySubOneOptions: [],
                        categorySubTwo: undefined,
                        categorySubTwoOptions: [],
                        categorySubThree: undefined,
                        categorySubThreeOptions: [],
                    };
                }
                return item;
            })
        );
    };

    const handleSetCopyDataCategory = (value, label, index) => {
        let subCategoryItems = [];

        copyDataContainer.map((item, i) => {
            if (i === index) {
                item.materialFilterData.map((mItem) => {
                    mItem.categoryFirstSubs.map((cat) => {
                        subCategoryItems.filter((c) => c.value === cat.id).length === 0 &&
                            subCategoryItems.push({ value: cat.id, label: cat.name });
                    });
                });
            }
        });

        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        category: label,
                        categorySubOne: undefined,
                        categorySubOneOptions: subCategoryItems,
                        categorySubTwo: undefined,
                        categorySubTwoOptions: [],
                        categorySubThree: undefined,
                        categorySubThreeOptions: [],
                    };
                }
                return item;
            })
        );
    };

    const handleSetCopyDataCategorySubOne = (value, label, index) => {
        let subCategoryItems = [];

        copyDataContainer.map((item, i) => {
            if (i === index) {
                item.materialFilterData.map((mItem) => {
                    mItem.categorySecondSubs.map((cat) => {
                        subCategoryItems.filter((c) => c.value === cat.id).length === 0 &&
                            subCategoryItems.push({ value: cat.id, label: cat.name });
                    });
                });
            }
        });

        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        categorySubOne: label,
                        categorySubTwoOptions: subCategoryItems,
                        categorySubTwo: undefined,
                        categorySubThree: undefined,
                        categorySubThreeOptions: [],
                    };
                }
                return item;
            })
        );
    };

    const handleSetCopyDataCategorySubTwo = (value, label, index) => {
        let subCategoryItems = [];

        copyDataContainer.map((item, i) => {
            if (i === index) {
                item.materialFilterData.map((mItem) => {
                    mItem.categoryThirdSubs.map((cat) => {
                        subCategoryItems.filter((c) => c.value === cat.id).length === 0 &&
                            subCategoryItems.push({ value: cat.id, label: cat.name });
                    });
                });
            }
        });

        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        categorySubTwo: label,
                        categorySubThreeOptions: subCategoryItems,
                        categorySubThree: undefined,
                    };
                }
                return item;
            })
        );
    };
    const handleSetCopyDataCategorySubThree = (value, label, index) => {
        let filtermaterialData = [];
        if (value !== undefined) {
            copyDataContainer[index].materialFilterData.map((itemM) => {
                itemM.categoryThirdSubs.map((subCat) => {
                    filtermaterialData.filter((c) => c.value === subCat.id).length === 0 &&
                        value === subCat.id &&
                        filtermaterialData.push({ value: subCat.id, label: subCat.name });
                });
            });
        }
        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, categorySubThree: label, materialOrServiceFilteredOptions: filtermaterialData };
                }
                return item;
            })
        );
    };

    const handleSetCopyDataModelOrForm = (value, label, index) => {
        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, modelOrForm: label };
                }
                return item;
            })
        );
    };

    const returnEmpty = () => {};

    return (
        <div className="manufacturer-add-modal">
            <Row>
                <div className="manufacturer-check">
                    <label>{t('manufacturer as well as seller')}</label>
                    <Form.Check type="switch" onChange={(e) => setAsWellAsSeller(e.target.checked)} />
                </div>
            </Row>
            <Row className="manufacturer-row-container manufacturer-row-container-margin-top manufacturer-responsive-container">
                <Col>
                    <SingleSelects
                        label="country"
                        options={manufacturerCountryOptions}
                        selectedItems={selectedManufacturerCountry}
                        setSelectedItems={setSelectedManufacturerCountry}
                        width={'100%'}
                        isStar={true}
                    />
                </Col>
                <Col>
                    <SingleSelects
                        label="company"
                        options={manufacturerCompanyOptions}
                        selectedItems={selectedManufacturerCompany}
                        setSelectedItems={setSelectedManufacturerCompany}
                        width={'100%'}
                        isStar={true}
                    />
                </Col>
                <Col>
                    <SingleSelects
                        label="main type"
                        options={manufacturerMainTypeOptions}
                        selectedItems={selectedManufacturerMainType}
                        setSelectedItems={setSelectedManufacturerMainType}
                        width={'100%'}
                        isStar={true}
                    />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col style={{ display: 'flex', alignItems: 'center', color: '#00A0DF' }}>
                    <label>{t('seller')}</label>
                </Col>
                <Col className="manufacturer-add-seller-container">
                    <button className="manufacturer-add-seller-btn" onClick={() => addCopyData()}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </Col>
            </Row>
            <Row className="manufacturer-row-container manufacturer-row-container-margin-top manufacturer-responsive-container">
                <Col>
                    <SingleSelects
                        label="country"
                        options={sellerCountryOptions}
                        selectedItems={selectedSellerCountry}
                        setSelectedItems={setSelectedSellerCountry}
                        width={'100%'}
                        disabled={asWellAsSeller}
                        isStar={true}
                    />
                </Col>
                <Col>
                    <SingleSelects
                        label="duties type"
                        options={dutiesOptions}
                        selectedItems={selectedDuties}
                        setSelectedItems={setSelectedDuties}
                        width={'100%'}
                        isStar={true}
                    />
                </Col>
                <Col>
                    <SingleSelects
                        label="company"
                        options={sellerCompanyOptions}
                        selectedItems={selectedSellerCompany}
                        setSelectedItems={setSelectedSellerCompany}
                        width={'100%'}
                        disabled={asWellAsSeller}
                        isStar={true}
                    />
                </Col>
            </Row>
            <Row className="manufacturer-row-container manufacturer-margin-top manufacturer-responsive-container-2">
                <Col>
                    <Row className="manufacturer-add-double-col">
                        <Col className="manufacturer-dots">
                            <MultipleSelects
                                label="country for use"
                                isStar={true}
                                options={countryForUseOptions}
                                selectedItems={selectedCountryForUse}
                                setSelectedItems={setSelectedCountryForUse}
                                width={'100%'}
                            />
                        </Col>
                        <Col>
                            <SingleSelects
                                label="currency"
                                isStar={true}
                                options={currencyOptions}
                                selectedItems={selectedCurrency}
                                setSelectedItems={setSelectedCurrency}
                                width={'100%'}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <SingleSelects
                        label="payment terms"
                        isStar={true}
                        options={paymentTermsOptions}
                        selectedItems={selectedPaymentTerms}
                        setSelectedItems={setSelectedPaymentTerms}
                        width={'100%'}
                    />
                </Col>
                <Col>
                    <SingleSelects
                        label="method of payment"
                        isStar={true}
                        options={methodOfPaymentOptions}
                        selectedItems={selectedMethodOfPayment}
                        setSelectedItems={setSelectedMethodOfPayment}
                        width={'100%'}
                    />
                </Col>
            </Row>
            {arrow && (
                <Row className="manufacturer-arrow-container manufacturer-margin-top manufacturer-responsive-container">
                    <Col>
                        <SingleSelects
                            label="main category"
                            options={mainCategoryOptions}
                            selectedItems={selectedMainCategory}
                            setSelectedItems={setSelectedMainCategory}
                            width={'100%'}
                        />
                    </Col>
                    <Col>
                        <SingleSelects
                            label="category"
                            options={categoryOptions}
                            selectedItems={selectedCategory}
                            setSelectedItems={setSelectedCategory}
                            width={'100%'}
                        />
                    </Col>
                    <Col>
                        <SingleSelects
                            label="category sub 1"
                            options={categorySubOneOptions}
                            selectedItems={selectedCategorySubOne}
                            setSelectedItems={setSelectedCategorySubOne}
                            width={'100%'}
                        />
                    </Col>
                    <Col>
                        <SingleSelects
                            label="category sub 2"
                            options={categorySubTwoOptions}
                            selectedItems={selectedCategorySubTwo}
                            setSelectedItems={setSelectedCategorySubTwo}
                            width={'100%'}
                        />
                    </Col>
                    <Col>
                        <SingleSelects
                            label="category sub 3"
                            options={categorySubThreeOptions}
                            selectedItems={selectedCategorySubThree}
                            setSelectedItems={setSelectedCategorySubThree}
                            width={'100%'}
                        />
                    </Col>
                </Row>
            )}
            <Row className="manufacturer-row-container manufacturer-margin-top manufacturer-responsive-container">
                <Col>
                    <SingleSelects
                        label="materials or services *"
                        options={arrow ? materialOrServiceFilteredOptions : materialOrServiceOptions}
                        selectedItems={selectedMaterialOrService}
                        setSelectedItems={setSelectedMaterialOrService}
                        width={'100%'}
                        isIcon={true}
                        icon={
                            <Icon
                                path={arrow ? mdiArrowCollapse : mdiArrowExpand}
                                title="arrow expand"
                                size={1}
                                horizontal
                                vertical
                                className="material-add-arrow-expand"
                                onClick={() => setArrow(!arrow)}
                            />
                        }
                    />
                </Col>
                <Col>
                    <SingleSelects
                        label="materials or services type"
                        options={materialOrServiceTypeOptions}
                        selectedItems={selectedMaterialOrServiceType}
                        setSelectedItems={setSelectedMaterialOrServiceType}
                        width={'100%'}
                        isStar={true}
                    />
                </Col>
                <Col>
                    <SingleSelects
                        label="model or form"
                        options={modelOrFormOptions}
                        selectedItems={selectedModelOrForm}
                        setSelectedItems={setSelectedModelOrForm}
                        width={'100%'}
                        isStar={true}
                    />
                </Col>
            </Row>
            <Row className="manufacturer-textarea manufacturer-margin-top">
                <NewTextArea
                    value={technicalInfo}
                    setValue={setTechnicalInfo}
                    placeholder="technical info"
                    label="technical info"
                    disabled={true}
                />
            </Row>

            {copyDataContainer?.map((item, index) => (
                <div key={index}>
                    <hr />
                    <Row
                        className={`manufacturer-row-container ${
                            index === 0 ? 'manufacturer-margin-top' : null
                        } manufacturer-responsive-container`}>
                        <Col>
                            <SingleSelects
                                label="country"
                                options={sellerCountryOptions}
                                selectedItems={item.country}
                                setSelectedItems={() => returnEmpty()}
                                width={'100%'}
                                handleChange={(value, label) =>
                                    handleSetCopyDataCountry(value, label, index, 'country')
                                }
                                disabled={asWellAsSeller}
                                isStar={true}
                            />
                        </Col>
                        <Col>
                            <SingleSelects
                                label="duties type"
                                options={item.dutiesOptions}
                                selectedItems={item.duties}
                                setSelectedItems={() => returnEmpty()}
                                width={'100%'}
                                handleChange={(value, label) => handleSetCopyDataDuties(value, label, index, 'duties')}
                                isStar={true}
                            />
                        </Col>
                        <Col>
                            <SingleSelects
                                label="company"
                                options={item.companyOptions}
                                selectedItems={item.company}
                                setSelectedItems={() => returnEmpty()}
                                width={'100%'}
                                handleChange={(value, label) =>
                                    handleSetCopyDataCompany(value, label, index, 'company')
                                }
                                disabled={asWellAsSeller}
                                isStar={true}
                            />
                        </Col>
                    </Row>
                    <Row className="manufacturer-row-container manufacturer-margin-top manufacturer-responsive-container-2">
                        <Col>
                            <Row className="manufacturer-add-double-col">
                                <Col className="manufacturer-dots">
                                    <MultipleSelects
                                        label="country for use"
                                        isStar={true}
                                        options={countryForUseOptions}
                                        selectedItems={item.countryForUse}
                                        setSelectedItems={() => returnEmpty()}
                                        width={'100%'}
                                        handleChange={(value, label) =>
                                            handleSetCopyDataValue(value, label, index, 'countryForUse')
                                        }
                                    />
                                </Col>
                                <Col>
                                    <SingleSelects
                                        label="currency"
                                        isStar={true}
                                        options={currencyOptions}
                                        selectedItems={item.currency}
                                        setSelectedItems={() => returnEmpty()}
                                        width={'100%'}
                                        handleChange={(value, label) =>
                                            handleSetCopyDataValue(value, label, index, 'currency')
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <SingleSelects
                                label="payment terms"
                                isStar={true}
                                options={paymentTermsOptions}
                                selectedItems={selectedPaymentTerms}
                                setSelectedItems={setSelectedPaymentTerms}
                                width={'100%'}
                            />
                        </Col>
                        <Col>
                            <SingleSelects
                                label="method of payment"
                                isStar={true}
                                options={methodOfPaymentOptions}
                                selectedItems={selectedMethodOfPayment}
                                setSelectedItems={setSelectedMethodOfPayment}
                                width={'100%'}
                            />
                        </Col>
                    </Row>
                    {item.arrow && (
                        <Row className="manufacturer-arrow-container manufacturer-margin-top manufacturer-responsive-container">
                            <Col>
                                <SingleSelects
                                    label="main category"
                                    options={item.mainCategoryOptions}
                                    selectedItems={item.mainCategory}
                                    setSelectedItems={() => returnEmpty()}
                                    width={'100%'}
                                    handleChange={(value, label) => handleSetCopyDataMainCategory(value, label, index)}
                                />
                            </Col>
                            <Col>
                                <SingleSelects
                                    label="category"
                                    options={item.categoryOptions}
                                    selectedItems={item.category}
                                    setSelectedItems={() => returnEmpty()}
                                    width={'100%'}
                                    handleChange={(value, label) => handleSetCopyDataCategory(value, label, index)}
                                />
                            </Col>
                            <Col>
                                <SingleSelects
                                    label="category sub 1"
                                    options={item.categorySubOneOptions}
                                    selectedItems={item.categorySubOne}
                                    setSelectedItems={() => returnEmpty()}
                                    width={'100%'}
                                    handleChange={(value, label) =>
                                        handleSetCopyDataCategorySubOne(value, label, index)
                                    }
                                />
                            </Col>
                            <Col>
                                <SingleSelects
                                    label="category sub 2"
                                    options={item.categorySubTwoOptions}
                                    selectedItems={item.categorySubTwo}
                                    setSelectedItems={() => returnEmpty()}
                                    width={'100%'}
                                    handleChange={(value, label) =>
                                        handleSetCopyDataCategorySubTwo(value, label, index)
                                    }
                                />
                            </Col>
                            <Col>
                                <SingleSelects
                                    label="category sub 3"
                                    options={item.categorySubThreeOptions}
                                    selectedItems={item.categorySubThree}
                                    setSelectedItems={() => returnEmpty()}
                                    width={'100%'}
                                    handleChange={(value, label) =>
                                        handleSetCopyDataCategorySubThree(value, label, index)
                                    }
                                />
                            </Col>
                        </Row>
                    )}
                    <Row className="manufacturer-row-container manufacturer-margin-top manufacturer-responsive-container">
                        <Col>
                            <SingleSelects
                                label="materials or services *"
                                // options={item?.arrow === false ? item?.materialOrServiceOptions : []}
                                options={item?.materialOrServiceOptions}
                                selectedItems={item.materialOrService}
                                setSelectedItems={() => returnEmpty()}
                                width={'100%'}
                                isIcon={true}
                                handleChange={(value, label) => handleSetCopyDataMaterialOrService(value, label, index)}
                                icon={
                                    <Icon
                                        path={item.arrow ? mdiArrowCollapse : mdiArrowExpand}
                                        title="arrow expand"
                                        size={1}
                                        horizontal
                                        vertical
                                        className="material-add-arrow-expand"
                                        onClick={() => handleSetCopyDataArrow(index)}
                                    />
                                }
                            />
                        </Col>
                        <Col>
                            <SingleSelects
                                label="materials or services type"
                                options={item?.materialOrServiceTypeOptions}
                                selectedItems={item.materialOrServiceType}
                                setSelectedItems={() => returnEmpty()}
                                width={'100%'}
                                handleChange={(value, label) =>
                                    handleSetCopyDataMaterialOrServiceType(value, label, index)
                                }
                                isStar={true}
                            />
                        </Col>
                        <Col>
                            <SingleSelects
                                label="model or form"
                                options={item.modelOrFormOptions}
                                selectedItems={item.modelOrForm}
                                setSelectedItems={() => returnEmpty()}
                                width={'100%'}
                                handleChange={(value, label) => handleSetCopyDataModelOrForm(value, label, index)}
                                isStar={true}
                            />
                        </Col>
                    </Row>
                    <Row className="manufacturer-textarea manufacturer-margin-top">
                        <NewTextArea
                            value={item.technicalInfo}
                            placeholder="technical info"
                            label="technical info"
                            disabled={true}
                        />
                    </Row>
                    <Row>
                        <Col className="manufacturer-add-seller-container">
                            <button
                                className="manufacturer-add-seller-delete-btn"
                                onClick={() => deleteCopyData(index)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    );
};

export default Body;
