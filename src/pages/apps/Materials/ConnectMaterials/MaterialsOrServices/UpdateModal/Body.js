import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { SingleSelects, MultipleSelects } from '../../../../../../components/GlobalNew/Selects';
import { AutoCompleteInput, NewInput } from '../../../../../../components/GlobalNew/Inputs';
import { mdiArrowCollapse, mdiArrowExpand } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost, FetchApiGet } from '../../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Body = ({
    rawMaterial,
    setRawMaterial,
    arrow = false,
    setArrow,
    isClickAdd,
    addButtonDisableStatus,
    setAddButtonDisableStatus,
    setShowModal,
    selectedValue,
    handleUpdateGetAgainModelOrForm,
    handleUpdate,
}) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({
        value: selectedValue.company.countryId,
        label: selectedValue.company.countryName,
    });

    const [companyOptions, setCompanyOptions] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({
        value: selectedValue.company.id,
        label: selectedValue.company.name,
    });

    const [countryForUseOptions, setCountryForUseOptions] = useState([]);
    const [selectedCountryForUse, setSelectedCountryForUse] = useState(
        selectedValue.countriesForUse.map((item) => ({ value: item.countryId, label: item.countryName }))
    );

    const [mainTypeOptions, setMainTypeOptions] = useState([]);
    const [selectedMainType, setSelectedMainType] = useState({
        value: selectedValue.mainType.id,
        label: selectedValue.mainType.name,
    });

    const [typeOptions, setTypeOptions] = useState([]);
    const [selectedType, setSelectedType] = useState({ value: selectedValue.type.id, label: selectedValue.type.name });

    const [assetsTypeOptions, setAssetsTypeOptions] = useState([]);
    const [selectedAssetsType, setSelectedAssetsType] = useState({
        value: selectedValue.assetsType.id,
        label: selectedValue.assetsType.name,
    });

    const [dutiesTypeOptions, setDutiesTypeOptions] = useState([]);
    const [selectedDutiesType, setSelectedDutiesType] = useState({
        value: selectedValue.dutiesType.id,
        label: selectedValue.dutiesType.name,
    });

    const [materialUsageFacilityOptions, setMaterialUsageFacilityOptions] = useState([]);
    const [selectedMaterialUsageFacility, setSelectedMaterialUsageFacility] = useState({
        value: selectedValue.materialUsageFacility.id,
        label: selectedValue.materialUsageFacility.name,
    });

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

    const [materialOrServicesOptions, setMaterialOrServicesOptions] = useState([]);
    const [selectedMaterialOrServices, setSelectedMaterialOrServices] = useState({
        value: selectedValue.materialOrServices.id,
        label: selectedValue.materialOrServices.name,
    });

    const [materialOrServicesTypeOptions, setMaterialOrServicesTypeOptions] = useState([]);
    const [selectedMaterialOrServicesType, setSelectedMaterialOrServicesType] = useState(
        selectedValue.materialOrServicesType !== null
            ? { value: selectedValue.materialOrServicesType?.id, label: selectedValue.materialOrServicesType?.name }
            : undefined
    );

    const [modalOptions, setModelOptions] = useState([]);
    const [selectedModal, setSelectedModal] = useState(
        selectedValue.isRawMaterial === false ? selectedValue.modelOrForm : ''
    );

    const [standartMOQOptions, setStandartMOQOptions] = useState([]);
    const [selectedStandartMOQ, setSelectedStandartMOQ] = useState(selectedValue.moq);

    const [coAFiles, setCoAFiles] = useState([]);

    const [formOptions, setFormOptions] = useState([]);
    const [selectedForm, setSelectedForm] = useState(
        selectedValue.isRawMaterial === true ? selectedValue.modelOrForm : ''
    );

    const [shelfLifeOptions, setShelfLifeOptions] = useState([]);
    const [selectedShelfLife, setSelectedShelfLife] = useState(selectedValue.shelfLife);

    const [batchSizeOptions, setBatchSizeOptions] = useState([]);
    const [selectedBatchSize, setSelectedBatchSize] = useState(selectedValue.batchSize);

    const [feesOptions, setFeesOptions] = useState([]);
    const [selectedFees, setSelectedFees] = useState(selectedValue.fees);

    const [startDateOptions, setStartDateOptions] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState();

    const [measureOptions, setMeasureOptions] = useState([]);
    const [selectedMeasure, setSelectedMeasure] = useState(selectedValue.measure);

    const [licanceStatusOptions, setLicanceStatusOptions] = useState([
        {
            value: 1,
            label: 'True',
        },
        {
            value: 2,
            label: 'False',
        },
    ]);
    const [selectedLicanceStatus, setSelectedLicanceStatus] = useState(
        selectedValue.licenseStatus === true
            ? {
                  value: 1,
                  label: 'True',
              }
            : {
                  value: 2,
                  label: 'False',
              }
    );

    const [documentationOptions, setDocumentationOptions] = useState([
        {
            value: 1,
            label: 'True',
        },
        {
            value: 2,
            label: 'False',
        },
    ]);
    const [selectedDocumentation, setSelectedDocumentation] = useState(selectedValue.documentation);

    const handleNewUpload = (e) => {
        setCoAFiles(e.fileList);
    };

    const handleDeleteFiles = () => {
        setCoAFiles([]);
    };

    useEffect(() => {
        if (
            selectedCountry !== undefined &&
            selectedCompany !== undefined &&
            selectedCountryForUse !== undefined &&
            selectedCountryForUse.length > 0 &&
            selectedMainType !== undefined &&
            selectedType !== undefined &&
            selectedAssetsType !== undefined &&
            selectedDutiesType !== undefined &&
            selectedMaterialUsageFacility !== undefined &&
            selectedMaterialOrServices !== undefined
        ) {
            setAddButtonDisableStatus(false);
        } else {
            setAddButtonDisableStatus(true);
        }
    }, [
        selectedCompany,
        selectedCountry,
        selectedCountryForUse,
        selectedType,
        selectedAssetsType,
        selectedDutiesType,
        selectedMaterialUsageFacility,
        selectedMaterialOrServices,
    ]);

    const handleFile = async (id) => {
        if (coAFiles?.target?.files !== undefined && coAFiles.target.files.length > 0) {
            const fd = new FormData();
            for (let index = 0; index < coAFiles.target.files.length; index++) {
                fd.append('files', coAFiles.target.files[index], `${id}-${coAFiles.target.files[index].name}`);
            }

            // create the request
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // we done!
                }
            };

            // path to server would be where you'd normally post the form to
            xhr.open(
                'POST',
                `http://178.18.200.171:5000/services/Material/MaterialOrServicesToCompany/AddFilesToMaterialOrServicesToCompany`,
                true
            );
            xhr.send(fd);

            setShowModal(false);
        } else {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (isClickAdd) {
            const countryForUseIds = selectedCountryForUse.map((item) => item.value);
            let date = new Date();
            const data = {
                id: selectedValue.id,
                companyId: selectedCompany.value,
                countryIdsForUse: countryForUseIds,
                mainTypeId: selectedMainType !== undefined && selectedMainType.value,
                typeId: selectedType.value,
                assetsTypeId: selectedAssetsType.value,
                dutiesTypeId: selectedDutiesType.value,
                materialUsageFacility: selectedMaterialUsageFacility.value,
                materialOrServicesId: selectedMaterialOrServices.value,
                materialOrServicesTypeId:
                    selectedMaterialOrServicesType !== undefined ? selectedMaterialOrServicesType.value : 0,
                materialOrServicesModel: selectedModal,
                moq: selectedStandartMOQ !== undefined ? Number(selectedStandartMOQ) : 0,
                form: selectedForm,
                shelfLife: selectedShelfLife !== undefined ? Number(selectedShelfLife) : 0,
                batchSize: selectedBatchSize !== undefined ? Number(selectedBatchSize) : 0,
                fees: selectedFees !== undefined ? Number(selectedFees) : 0,
                startDate: date.toISOString(),
                measure: selectedMeasure,
                licenseStatus:
                    selectedLicanceStatus !== undefined ? (selectedLicanceStatus.value === 1 ? true : false) : false,
                documentation:
                    selectedDocumentation !== undefined ? (selectedDocumentation.value === 1 ? true : false) : false,
                isRawMaterial: rawMaterial,
                isSampleRequest: false,
                createdBy: localStorage.getItem('userName'),
            };
            FetchApiPost('services/Material/MaterialOrServicesToCompany/UpdateMaterialOrServicesToCompany', 'POST', {
                ...data,
            }).then((res) => {
                if (res.status === 201) {
                    res.json().then((data) => {
                        // handleFile(data.data.id);
                        setShowModal(false);
                        handleUpdateGetAgainModelOrForm();
                        handleUpdate(data.data);
                    });
                }
            });
        }
    }, [isClickAdd]);

    useEffect(() => {
        // country ve country for use disable olucağı için kabadık
        // FetchApiGet('api/OldSystem/GetAllCountries', 'GET').then((res) => {
        //     if (res.status === 200) {
        //         res.json().then((data) => {
        //             setCountryOptions(
        //                 data.map((c) => {
        //                     return { value: c.CountryId, label: c.CountryName };
        //                 })
        //             );
        //             setCountryForUseOptions(
        //                 data.map((c) => {
        //                     return { value: c.CountryId, label: c.CountryName };
        //                 })
        //             );
        //         });
        //     } else if (res.status === 500) {
        //         history.push('/error-500');
        //     }
        // });
    }, []);

    useEffect(() => {
        // company ler de disable
        // setSelectedCompany();
        // setCompanyOptions([]);
        // if (selectedCountry !== null && selectedCountry !== undefined) {
        //     FetchApiPost('services/Material/Company/GetCompaniesByCountryIds', 'POST', {
        //         countryIds: [selectedCountry.value],
        //     }).then((res) => {
        //         if (res.status === 200) {
        //             res.json().then((data) => {
        //                 setCompanyOptions(
        //                     data.data.map((c) => {
        //                         return { value: c.id, label: c.name };
        //                     })
        //                 );
        //             });
        //         } else if (res.status === 500) {
        //             history.push('/error-500');
        //         }
        //     });
        // }
    }, [selectedCountry]);

    // get all materials
    useEffect(() => {
        // setSelectedMainType();
        // setSelectedType();
        // setSelectedAssetsType();
        // setSelectedDutiesType();
        // setSelectedMaterialUsageFacility();

        // setMainTypeOptions([]);
        // setTypeOptions([]);
        // setAssetsTypeOptions([]);
        // setDutiesTypeOptions([]);
        // setMaterialUsageFacilityOptions([]);

        FetchApiPost('services/Material/Company/GetCompaniesByCompanyIds', 'POST', {
            companyIds: [selectedCompany.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setMainTypeOptions(
                        ...data?.data?.map((main) =>
                            main?.mainTypes.map((m) => {
                                return { value: m.id, label: m.name };
                            })
                        )
                    );
                    setTypeOptions(
                        ...data?.data?.map((main) =>
                            main?.types.map((t) => {
                                return { value: t.id, label: t.name };
                            })
                        )
                    );
                    setAssetsTypeOptions(
                        ...data?.data?.map((main) =>
                            main?.assetsTypes.map((t) => {
                                return { value: t.id, label: t.name };
                            })
                        )
                    );
                    setDutiesTypeOptions(
                        ...data?.data?.map((main) =>
                            main?.dutiesTypes.map((t) => {
                                return { value: t.id, label: t.name };
                            })
                        )
                    );
                    setMaterialUsageFacilityOptions(
                        ...data?.data?.map((main) =>
                            main?.facilities.map((t) => {
                                return { value: t.id, label: t.name };
                            })
                        )
                    );
                });
            } else if (res.status === 500) {
                history.push('/error-500');
            }
        });
    }, [selectedCompany, selectedValue]);

    const handleChangeArrow = () => {
        setArrow(!arrow);
        setSelectedMainCategory();
        setSelectedCategory();
        setSelectedCategorySubOne();
        setSelectedCategorySubTwo();
        setSelectedCategorySubThree();
        setMainCategoryOptions([]);
        setCategoryOptions([]);
        setCategorySubOneOptions([]);
        setCategorySubTwoOptions([]);
        setCategorySubThreeOptions([]);

        setSelectedMaterialOrServices();
        setMaterialOrServicesOptions([]);
        setSelectedMaterialOrServicesType();
        setMaterialOrServicesTypeOptions([]);
    };

    useEffect(() => {
        if (arrow === false) {
            FetchApiGet('services/Material/MaterialOrServices/GetAllMaterialOrServices', 'GET').then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setMaterialOrServicesOptions(
                            data.data.map((m) => {
                                return { value: m.id, label: m.name };
                            })
                        );
                    });
                } else if (res.status === 500) {
                    history.push('/error-500');
                }
            });
        } else {
            FetchApiGet('services/Material/MainCategory/GetAllMainCategory', 'GET').then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setMainCategoryOptions(
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
    }, [arrow]);

    useEffect(() => {
        setSelectedCategory();
        setSelectedCategorySubOne();
        setSelectedCategorySubTwo();
        setSelectedCategorySubThree();
        setCategoryOptions([]);
        setCategorySubOneOptions([]);
        setCategorySubTwoOptions([]);
        setCategorySubThreeOptions([]);
        if (selectedMainCategory !== null && selectedMainCategory !== undefined) {
            FetchApiPost('services/Material/Category/GetCategoryByMainCategoryId', 'POST', {
                mainCategoryIds: [selectedMainCategory.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCategoryOptions(
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
    }, [selectedMainCategory]);

    useEffect(() => {
        setSelectedCategorySubOne();
        setSelectedCategorySubTwo();
        setSelectedCategorySubThree();
        setCategorySubOneOptions([]);
        setCategorySubTwoOptions([]);
        setCategorySubThreeOptions([]);
        if (selectedCategory !== null && selectedCategory !== undefined) {
            FetchApiPost('services/Material/CategoryFirstSub/GetCategoryFirstSubsByCategoryId', 'POST', {
                categoryIds: [selectedCategory.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCategorySubOneOptions(
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
    }, [selectedCategory]);

    useEffect(() => {
        setSelectedCategorySubTwo();
        setSelectedCategorySubThree();
        setCategorySubTwoOptions([]);
        setCategorySubThreeOptions([]);
        if (selectedCategorySubOne !== null && selectedCategorySubOne !== undefined) {
            FetchApiPost('services/Material/CategorySecondSub/GetCategorySecondSubsByCategoryFirstSubIds', 'POST', {
                categoryFirstSubIds: [selectedCategorySubOne.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCategorySubTwoOptions(
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
    }, [selectedCategorySubOne]);

    useEffect(() => {
        setSelectedCategorySubThree();
        setCategorySubThreeOptions([]);
        if (selectedCategorySubTwo !== null && selectedCategorySubTwo !== undefined) {
            FetchApiPost('services/Material/CategoryThirdSub/GetCategoryThirdSubsByCategorySecondSubIds', 'POST', {
                categorySecondSubIds: [selectedCategorySubTwo.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCategorySubThreeOptions(
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
    }, [selectedCategorySubTwo]);

    useEffect(() => {
        setMaterialOrServicesTypeOptions([]);
        if (selectedMaterialOrServices !== null && selectedMaterialOrServices !== undefined) {
            FetchApiPost('services/Material/MaterialOrServicesType/GetMaterialOrServicesTypeByMaterialIds', 'POST', {
                materialIds: [selectedMaterialOrServices.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setMaterialOrServicesTypeOptions(
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
    }, [selectedMaterialOrServices]);

    useEffect(() => {
        // setSelectedMaterialOrServices()
        // setMaterialOrServicesOptions([])
        // maretial or services filtreli veri
        if (
            arrow === true &&
            selectedCategory !== undefined &&
            selectedCategorySubOne !== undefined &&
            selectedCategorySubTwo !== undefined &&
            selectedCategorySubThree !== undefined
        ) {
            FetchApiPost('services/Material/MaterialOrServices/GetMaterialOrServicesByFilterIds', 'POST', {
                categoryIds: [selectedCategory.value],
                firstCategoryIds: [selectedCategorySubOne.value],
                secondCategoryIds: [selectedCategorySubTwo.value],
                thirdCategoryIds: [selectedCategorySubThree.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setMaterialOrServicesOptions(
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
    }, [history, selectedCategory, selectedCategorySubOne, selectedCategorySubTwo, selectedCategorySubThree, arrow]);

    useEffect(() => {
        setMaterialOrServicesTypeOptions([]);
        // maretial or services filtreli veri
        if (
            arrow === true &&
            selectedCategory !== undefined &&
            selectedCategorySubOne !== undefined &&
            selectedCategorySubTwo !== undefined &&
            selectedCategorySubThree !== undefined &&
            selectedMaterialOrServices !== undefined
        ) {
            FetchApiPost('services/Material/MaterialOrServicesType/GetMaterialOrServicesTypeByMaterialIds', 'POST', {
                materialIds: [selectedMaterialOrServices.value],
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setMaterialOrServicesTypeOptions(
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
    }, [
        history,
        selectedCategory,
        selectedCategorySubOne,
        selectedCategorySubTwo,
        selectedCategorySubThree,
        arrow,
        selectedMaterialOrServices,
    ]);

    console.log(selectedMaterialOrServicesType);
    useEffect(() => {
        if (
            selectedMaterialOrServices !== undefined &&
            selectedMaterialOrServices !== null &&
            selectedMaterialOrServices.value !== selectedValue.materialOrServices.id
        ) {
            setSelectedMaterialOrServicesType();
        }
    }, [selectedMaterialOrServices]);
    console.log(selectedMaterialOrServices);

    return (
        <div className="material-or-services-add-modal">
            <Row className="ms-0 me-0">
                <Col
                    className="d-flex justify-content-between"
                    style={{
                        background: '#FAFBFE',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        marginRight: '1rem',
                        marginBottom: '0',
                    }}>
                    <label>{t('RAW material')}</label>
                    <div>
                        <Form.Check type="switch" disabled defaultChecked={rawMaterial} />
                    </div>
                </Col>
                <Col
                    className="d-flex justify-content-between"
                    style={{ background: '#FAFBFE', padding: '6px 8px', borderRadius: '4px', marginBottom: '0' }}>
                    <label>{t('sample request')}</label>
                    <div>
                        <Form.Check type="switch" disabled />
                    </div>
                </Col>
            </Row>
            <div className="w-100">
                <hr style={{ color: '#DEE2E6', opacity: '1', width: '100%' }} />
            </div>
            <Row className={`ms-0 me-0 materials-to-company-responsive-first ${rawMaterial ? 'w-75' : 'w-100'}`}>
                <Col className="p-0" style={{ marginRight: '1rem' }}>
                    <SingleSelects
                        label="country"
                        options={countryOptions}
                        selectedItems={selectedCountry}
                        setSelectedItems={setSelectedCountry}
                        width={'100%'}
                        disabled={true}
                    />
                </Col>
                <Col className="p-0" style={{ marginRight: '1rem' }}>
                    <SingleSelects
                        label="company"
                        isStar={true}
                        options={companyOptions}
                        selectedItems={selectedCompany}
                        setSelectedItems={setSelectedCompany}
                        width={'100%'}
                        disabled={true}
                    />
                </Col>
                <Col className="p-0">
                    <MultipleSelects
                        label="country for use"
                        isStar={true}
                        options={countryForUseOptions}
                        selectedItems={selectedCountryForUse}
                        setSelectedItems={setSelectedCountryForUse}
                        width={'100%'}
                        disabled={true}
                    />
                </Col>
            </Row>
            <div className="w-100">
                <hr style={{ color: '#DEE2E6', opacity: '1', width: '100%' }} />
            </div>
            <Row className={`ms-0 me-0 materials-to-company-responsive-first ${rawMaterial ? 'w-75 ' : 'w-100'}`}>
                <Col className="p-0" style={{ marginRight: '1rem' }}>
                    <SingleSelects
                        label="main type"
                        isStar={true}
                        options={mainTypeOptions}
                        selectedItems={selectedMainType}
                        setSelectedItems={setSelectedMainType}
                        width={'100%'}
                    />
                </Col>
                <Col className="p-0" style={{ marginRight: '1rem' }}>
                    <SingleSelects
                        label="type"
                        isStar={true}
                        options={typeOptions}
                        selectedItems={selectedType}
                        setSelectedItems={setSelectedType}
                        width={'100%'}
                    />
                </Col>
                <Col className="p-0"></Col>
            </Row>
            <Row className={`ms-0 me-0 materials-to-company-responsive-first ${rawMaterial ? 'w-75 ' : 'w-100'}`}>
                <Col className="p-0" style={{ marginRight: '1rem' }}>
                    <SingleSelects
                        label="assets type"
                        isStar={true}
                        options={assetsTypeOptions}
                        selectedItems={selectedAssetsType}
                        setSelectedItems={setSelectedAssetsType}
                        width={'100%'}
                    />
                </Col>
                <Col className="p-0" style={{ marginRight: '1rem' }}>
                    <SingleSelects
                        label="duties type"
                        isStar={true}
                        options={dutiesTypeOptions}
                        selectedItems={selectedDutiesType}
                        setSelectedItems={setSelectedDutiesType}
                        width={'100%'}
                    />
                </Col>
                <Col className="p-0">
                    <SingleSelects
                        label="material usage facility"
                        isStar={true}
                        options={materialUsageFacilityOptions}
                        selectedItems={selectedMaterialUsageFacility}
                        setSelectedItems={setSelectedMaterialUsageFacility}
                        width={'100%'}
                    />
                </Col>
            </Row>
            <div className="w-100">
                <hr style={{ color: '#DEE2E6', opacity: '1', width: '100%' }} />
            </div>

            {arrow === true && rawMaterial === false && (
                <Row className={`ms-0 me-0 ${arrow && !rawMaterial && 'material-modal-arrow-open'}`}>
                    <Col className="p-0">
                        <SingleSelects
                            label="main category"
                            options={mainCategoryOptions}
                            selectedItems={selectedMainCategory}
                            setSelectedItems={setSelectedMainCategory}
                            width={'100%'}
                        />
                    </Col>
                    <Col className="p-0">
                        <SingleSelects
                            label="category"
                            options={categoryOptions}
                            selectedItems={selectedCategory}
                            setSelectedItems={setSelectedCategory}
                            width={'100%'}
                        />
                    </Col>
                    <Col className="p-0">
                        <SingleSelects
                            label="category sub 1"
                            options={categorySubOneOptions}
                            selectedItems={selectedCategorySubOne}
                            setSelectedItems={setSelectedCategorySubOne}
                            width={'100%'}
                        />
                    </Col>
                    <Col className="p-0">
                        <SingleSelects
                            label="category sub 2"
                            options={categorySubTwoOptions}
                            selectedItems={selectedCategorySubTwo}
                            setSelectedItems={setSelectedCategorySubTwo}
                            width={'100%'}
                        />
                    </Col>
                    <Col className="p-0">
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

            {(rawMaterial === false || (rawMaterial === true && arrow === false)) && (
                <Row className={`ms-0 me-0 materials-to-company-responsive-second`}>
                    <Col className="p-0" style={{ marginRight: '1rem' }}>
                        <SingleSelects
                            label="materials or services *"
                            options={materialOrServicesOptions}
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
                                    onClick={() => handleChangeArrow()}
                                />
                            }
                            selectedItems={selectedMaterialOrServices}
                            setSelectedItems={setSelectedMaterialOrServices}
                        />
                    </Col>
                    <Col className="p-0" style={{ marginRight: '1rem' }}>
                        <SingleSelects
                            label="materials or services type"
                            options={materialOrServicesTypeOptions}
                            selectedItems={selectedMaterialOrServicesType}
                            setSelectedItems={setSelectedMaterialOrServicesType}
                            width={'100%'}
                        />
                    </Col>
                    <Col className="p-0">
                        {rawMaterial === true ? (
                            <AutoCompleteInput
                                label="form"
                                width={'100%'}
                                value={selectedForm}
                                setValue={setSelectedForm}
                                placeholder="form"
                                isStar={true}
                            />
                        ) : (
                            <AutoCompleteInput
                                label="model"
                                value={selectedModal}
                                setValue={setSelectedModal}
                                width={'100%'}
                                placeholder="model"
                                isStar={true}
                            />
                        )}
                    </Col>
                    {rawMaterial && <Col className="p-0" style={{ marginLeft: '1rem' }}></Col>}
                </Row>
            )}
            {rawMaterial === true && arrow === true && (
                <>
                    <Row
                        className={`ms-0 me-0 materials-to-company-responsive-second ${
                            arrow && !rawMaterial && 'material-modal-arrow-open'
                        }`}>
                        <Col className="p-0" style={{ marginRight: '1rem' }}>
                            <SingleSelects
                                label="main category"
                                options={mainCategoryOptions}
                                selectedItems={selectedMainCategory}
                                setSelectedItems={setSelectedMainCategory}
                                width={'100%'}
                            />
                        </Col>
                        <Col className="p-0" style={{ marginRight: '1rem' }}>
                            <SingleSelects
                                label="category"
                                options={categoryOptions}
                                selectedItems={selectedCategory}
                                setSelectedItems={setSelectedCategory}
                                width={'100%'}
                            />
                        </Col>
                        <Col className="p-0" style={{ marginRight: '1rem' }}>
                            <SingleSelects
                                label="category sub 1"
                                options={categorySubOneOptions}
                                selectedItems={selectedCategorySubOne}
                                setSelectedItems={setSelectedCategorySubOne}
                                width={'100%'}
                            />
                        </Col>
                        <Col className="p-0">
                            <SingleSelects
                                label="category sub 2"
                                options={categorySubTwoOptions}
                                selectedItems={selectedCategorySubTwo}
                                setSelectedItems={setSelectedCategorySubTwo}
                                width={'100%'}
                            />
                        </Col>
                    </Row>
                    <Row
                        className={`ms-0 me-0 materials-to-company-responsive-second ${
                            arrow && !rawMaterial && 'material-modal-arrow-open'
                        }`}>
                        <Col className="p-0" style={{ marginRight: '1rem' }}>
                            <SingleSelects
                                label="category sub 3"
                                options={categorySubThreeOptions}
                                selectedItems={selectedCategorySubThree}
                                setSelectedItems={setSelectedCategorySubThree}
                                width={'100%'}
                            />
                        </Col>
                        <Col className="p-0" style={{ marginRight: '1rem' }}>
                            <SingleSelects
                                label={`materials or services *`}
                                options={[]}
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
                                selectedItems={selectedMaterialOrServices}
                                setSelectedItems={setSelectedMaterialOrServices}
                            />
                        </Col>
                        <Col className="p-0" style={{ marginRight: '1rem' }}>
                            <SingleSelects
                                label="materials or services type"
                                options={materialOrServicesTypeOptions}
                                selectedItems={selectedMaterialOrServicesType}
                                setSelectedItems={setSelectedMaterialOrServicesType}
                                width={'100%'}
                            />
                        </Col>
                        <Col className="p-0">
                            {rawMaterial === true ? (
                                <AutoCompleteInput
                                    label="form"
                                    width={'100%'}
                                    value={selectedForm}
                                    setValue={setSelectedForm}
                                    placeholder="form"
                                    isStar={true}
                                />
                            ) : (
                                <AutoCompleteInput
                                    label="model"
                                    value={selectedModal}
                                    setValue={setSelectedModal}
                                    width={'100%'}
                                    placeholder="model"
                                    isStar={true}
                                />
                            )}
                        </Col>
                    </Row>
                </>
            )}
            <div className="w-100">
                <hr style={{ color: '#DEE2E6', opacity: '1', width: '100%' }} />
            </div>
            <Row
                className={`ms-0 me-0 materials-to-company-responsive-second standart-and-upload-file ${
                    rawMaterial ? 'material-modal-raw-open' : 'material-modal-raw-close'
                }`}>
                <Col className={`p-0 ${rawMaterial && 'material-modal-raw-open-file'}`}>
                    <NewInput
                        label="Standart MOQ"
                        type={'number'}
                        value={selectedStandartMOQ}
                        setValue={setSelectedStandartMOQ}
                        width={'100%'}
                        placeholder="standart moq"
                        isKeyDown={true}
                        exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                    />
                </Col>
                <Col className={`p-0`}>
                    <label className="label-text-field">{t('CoA')}</label>
                    <div className="upload-component">
                        <Upload multiple={true} onChange={(e) => handleNewUpload(e)} fileList={coAFiles}>
                            <Button disabled={true} style={{ color: '#6c757d' }} icon={<UploadOutlined />}>
                                {t('Click to Upload')}
                            </Button>
                        </Upload>

                        <label>
                            {coAFiles.length === 0 ? (
                                t('not selected')
                            ) : coAFiles.length === 1 ? (
                                coAFiles[0].name
                            ) : (
                                <Tippy
                                    content={coAFiles?.map((file) => (
                                        <div>{file.name}</div>
                                    ))}
                                    placement="bottom">
                                    <div>{`${coAFiles.length} ${t('file')}`}</div>
                                </Tippy>
                            )}
                            {coAFiles.length !== 0 && (
                                <DeleteOutlined onClick={() => handleDeleteFiles()} title={t('delete files')} />
                            )}
                        </label>
                    </div>
                </Col>
            </Row>
            {rawMaterial && (
                <>
                    <div className="w-100">
                        <hr style={{ color: '#DEE2E6', opacity: '1', width: '100%' }} />
                    </div>
                    <Row className="ms-0 me-0 material-or-services-add-last materials-to-company-responsive-second">
                        <Col className="p-0">
                            <SingleSelects label="start date" disabled={true} options={[]} width={'100%'} />
                        </Col>
                        <Col className="p-0">
                            <NewInput
                                label="measure"
                                type={'text'}
                                value={selectedMeasure}
                                setValue={setSelectedMeasure}
                                width={'100%'}
                                placeholder="measure"
                                isKeyDown={true}
                                exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            />
                        </Col>
                        <Col className="p-0">
                            <SingleSelects
                                label="licance status"
                                options={licanceStatusOptions}
                                selectedItems={selectedLicanceStatus}
                                setSelectedItems={setSelectedLicanceStatus}
                                width={'100%'}
                            />
                        </Col>
                        <Col className="p-0">
                            <NewInput
                                label="documentation"
                                placeholder="documentation"
                                type={'text'}
                                value={selectedDocumentation}
                                setValue={setSelectedDocumentation}
                                width={'100%'}
                            />
                        </Col>
                    </Row>
                    <Row className="ms-0 me-0 material-or-services-add-last materials-to-company-responsive-second">
                        <Col className="p-0">
                            <NewInput
                                label="shelflife"
                                type={'number'}
                                width={'100%'}
                                value={selectedShelfLife}
                                setValue={setSelectedShelfLife}
                                placeholder="shelflife"
                                isKeyDown={true}
                                exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            />
                        </Col>
                        <Col className="p-0">
                            <NewInput
                                label="batchsize"
                                type={'number'}
                                width={'100%'}
                                value={selectedBatchSize}
                                setValue={setSelectedBatchSize}
                                placeholder="batchsize"
                                isKeyDown={true}
                                exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            />
                        </Col>
                        <Col className="p-0">
                            <NewInput
                                label="fees"
                                type={'number'}
                                width={'100%'}
                                value={selectedFees}
                                setValue={setSelectedFees}
                                placeholder="fees"
                                isKeyDown={true}
                                exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            />
                        </Col>
                        <Col className="p-0"></Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default Body;
