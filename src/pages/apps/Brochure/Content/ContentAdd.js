import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

const ContentAdd = ({ contentOnModal, setContentOnModal }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [indications, setIndications] = useState([]);
    const [selectedIndication, setSelectedIndication] = useState(null);

    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const [types, setTypes] = useState([
        {
            value: "Need",
            label: "Need",
            id: 0
        },
        {
            value: "Benefit",
            label: "Benefit",
            id: 1
        },
        {
            value: "Disadvantages",
            label: "Disadvantages",
            id: 2
        }
    ]);
    const [selectedType, setSelectedType] = useState({
        value: null,
        label: null,
        id: null
    });

    const [needName, setNeedName] = useState([
        {
            value: "Indications",
            label: "Indications",
            id: 0
        },
        {
            value: "Profile",
            label: "Profile",
            id: 1
        },
        {
            value: "Need",
            label: "Need",
            id: 2
        },
        {
            value: "Need Name",
            label: "Need Name",
            id: 3
        }
    ])
    const [selectedNeedName, setSelectedNeedName] = useState(null);

    const [benefitName, setBenefitName] = useState([
        {
            value: "Indications",
            label: "Indications",
            id: 0
        },
        {
            value: "Profile",
            label: "Profile",
            id: 1
        },
        {
            value: "Need",
            label: "Need",
            id: 2
        },
        {
            value: "Benefit",
            label: "Benefit",
            id: 3
        },
        {
            value: "Benefit Name",
            label: "Benefit Name",
            id: 4
        }
    ])
    const [selectedBenefitName, setSelectedBenefitName] = useState(null);

    const [disadvantageName, setDisadvantageName] = useState([
        {
            value: "Indications",
            label: "Indications",
            id: 0
        },
        {
            value: "Profile",
            label: "Profile",
            id: 1
        },
        {
            value: "Need",
            label: "Need",
            id: 2
        },
        {
            value: "Disadvantages",
            label: "Disadvantages",
            id: 3
        },
        {
            value: "Disadvantages Name",
            label: "Disadvantages Name",
            id: 4
        }
    ])
    const [selectedDisadvantageName, setSelectedDisadvantageName] = useState(null);

    useEffect(() => {
        FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET')
        .then((res) => res.json())
        .then(res => res.data)
        .then(res => setProducts(res))

        /*
        globalBrandAbb: "AK"
        globalBrandId: 1
        globalBrandName: "AKKORA"
        */
    }, [])

    const handleSelectedProduct = (product) => {
        setSelectedProduct(product);

        FetchApiGet(`api/OldSystem/GetIndicationsForContentByBrandId?brandId=${product.id}`, 'GET')
        .then((res) => res.json())
        .then(res => setIndications(res))

        /*
        Indication: "ИНФЕКЦИИ МОЧЕВЫВОДЯЩИХ ПУТЕЙ (ИМВП) ХРОНИЧЕСКИЕ"
        IndicationId: 212
        */
        setSelectedIndication(null);
        setSelectedProfile(null);
        setSelectedType({
            value: null,
            label: null,
            id: null
        })
        setSelectedNeedName(null);
        setSelectedBenefitName(null);
        setSelectedDisadvantageName(null);
    }

    const handleSelectedIndication = (indication) => {
        setSelectedIndication(indication);

        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST', {
            BrandId: selectedProduct.id,
            IndicationId: indication.id
        })
        .then((res) => res.json())
        .then(res => setProfiles(res))

        /*
        IndicationId: 0
        Profile: "ПАЦИЕНТ С МУЖСКИМ БЕСПЛОДИЕМ ИЗ-ЗА ПЛОХОГО КАЧЕСТВА СПЕРМЫ И НАРУШЕНИЕМ ЭРЕКТИЛЬНОЙ ФУНКЦИИ"
        ProfileId: 419
        */

        setSelectedProfile(null);
        setSelectedType({
            value: null,
            label: null,
            id: null
        })
        setSelectedNeedName(null);
        setSelectedBenefitName(null);
        setSelectedDisadvantageName(null);
    }

    const handleSelectedProfile = (profile) => {
        setSelectedProfile(profile);

        setSelectedType({
            value: null,
            label: null,
            id: null
        })
        setSelectedNeedName(null);
        setSelectedBenefitName(null);
        setSelectedDisadvantageName(null);
    }

    const handleSelectedType = (type) => {
        setSelectedType(type);

        setSelectedNeedName(null);
        setSelectedBenefitName(null);
        setSelectedDisadvantageName(null);

        FetchApiPost('api/OldSystem/GetNeedsByContentCreationDatas', 'POST', {
            BrandId: selectedProduct.id,
            IndicationId: selectedIndication.id,
            ProfileId: selectedProfile.id,
        }).then(res => res.json())
        .then(res => setNeedName(res.map((item, index) => {
            return {
                value: item.NeedName,
                label: item.NeedName,
                id: item.NeedId
            }
        })))
    }

    const handleSelectedNeedName = (needName) => {
        setSelectedNeedName(needName);

        setSelectedBenefitName(null);
        setSelectedDisadvantageName(null);

        if(selectedType.value === 'Benefit') {
            FetchApiPost('api/OldSystem/GetBenefitsByContentCreationDatas', 'POST', {
                BrandId: selectedProduct.id,
                IndicationId: selectedIndication.id,
                ProfileId: selectedProfile.id,
                NeedId: needName.id
            }).then(res => res.json())
            .then(res => setBenefitName(res.map((item, index) => {
                return {
                    value: item.BenefitName,
                    label: item.BenefitName,
                    id: item.BenefitId
                }
            })))
        }else if(selectedType.value === 'Disadvantages') {
            FetchApiPost('api/OldSystem/GetDisadvantagesByContentCreationDatas', 'POST', {
                BrandId: selectedProduct.id,
                IndicationId: selectedIndication.id,
                ProfileId: selectedProfile.id,
                NeedId: needName.id
            }).then(res => res.json())
            .then(res => setDisadvantageName(res.map((item, index) => {
                return {
                    value: item.DisadvantageName,
                    label: item.DisadvantageName,
                    id: item.DisadvantageId
                }
            })))
        }
    }

    const handleSelectedBenefitName = (benefitName) => {
        setSelectedBenefitName(benefitName);

        setSelectedDisadvantageName(null);
    }

    const handleSelectedDisadvantagesName = (disadvantageName) => {
        setSelectedDisadvantageName(disadvantageName);
    }

    const handleAddContent = async () => {

        let objJsonStr = await JSON.stringify(contentOnModal.content.jsonFile);
        let objJsonB64 = await Buffer.from(objJsonStr).toString("base64");

        let objHtmlStr = JSON.stringify(contentOnModal.content.htmlFile);
        let objHtmlB64 = Buffer.from(objHtmlStr).toString('base64');

        if(selectedType.value === 'Need') {
            FetchApiPost('services/Pages/ProductPage/SaveConnectProductToTemplate', 'POST', {
                pageId: contentOnModal.content.id,
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                brandId: selectedProduct.id,
                brandName: selectedProduct.value,
                indicationId: selectedIndication.id,
                indicationName: selectedIndication.value,
                profileId: selectedProfile.id,
                profileName: selectedProfile.value,
                passportOfProductType: selectedType.id,
                passportOfProductId: selectedNeedName.id,
                passportOfProductName: selectedNeedName.value,
                needId: 0,
                needName: "",
                createdBy: localStorage.getItem('userName') || "string"
            })
        }else if (selectedType.value === 'Benefit') {
            FetchApiPost('services/Pages/ProductPage/SaveConnectProductToTemplate', 'POST', {
                pageId: contentOnModal.content.id,
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                brandId: selectedProduct.id,
                brandName: selectedProduct.value,
                indicationId: selectedIndication.id,
                indicationName: selectedIndication.value,
                profileId: selectedProfile.id,
                profileName: selectedProfile.value,
                passportOfProductType: selectedType.id,
                passportOfProductId: selectedBenefitName.id,
                passportOfProductName: selectedBenefitName.value,
                needId: selectedNeedName.id,
                needName: selectedNeedName.value,
                createdBy: localStorage.getItem('userName') || "string"
            })
        }else if(selectedType.value === 'Disadvantages') {
            FetchApiPost('services/Pages/ProductPage/SaveConnectProductToTemplate', 'POST', {
                pageId: contentOnModal.content.id,
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                brandId: selectedProduct.id,
                brandName: selectedProduct.value,
                indicationId: selectedIndication.id,
                indicationName: selectedIndication.value,
                profileId: selectedProfile.id,
                profileName: selectedProfile.value,
                passportOfProductType: selectedType.id,
                passportOfProductId: selectedDisadvantageName.id,
                passportOfProductName: selectedDisadvantageName.value,
                needId: selectedNeedName.id,
                needName: selectedNeedName.value,
                createdBy: localStorage.getItem('userName') || "string"
            })
        }
    }
 
  return (
        <Modal show={contentOnModal.onModal} className="task-management__modal">
            <Modal.Header className="task-management__modal-header">
                <Modal.Title>
                    Edit Content
                </Modal.Title>
                <button className="task-management__modal-close-btn" onClick={() => setContentOnModal({onModal: false, content: null})}>
                    <i className="dripicons-cross"></i>
                </button>
            </Modal.Header>
            <Modal.Body className='p-0'  style={{position: "relative"}}>
                <div className='edit-content-container'>
                    <div>
                        <div>Product</div>
                        <Select
                            isMulti={false}
                            options={products?.map((product) => {
                                return {
                                    value: product.globalBrandName,
                                    label: product.globalBrandName,
                                    id: product.globalBrandId,
                                }
                            })}
                            className='react-select'
                            classNamePrefix="react-select"
                            placeholder="Select..."
                            value={selectedProduct}
                            onChange={(product) => handleSelectedProduct(product)}
                        />
                    </div>
                    <div>
                        <div>Indication</div>
                        <Select
                            isMulti={false}
                            options={indications?.map((item) => {
                                return {
                                    value: item.Indication,
                                    label: item.Indication,
                                    id: item.IndicationId,
                                    }
                                })}
                            className='react-select'
                            classNamePrefix="react-select"
                            placeholder="Select..."
                            value={selectedIndication}
                            onChange={(indication) => handleSelectedIndication(indication)}
                            isDisabled={selectedProduct===null}
                        />
                    </div>
                    <div>
                        <div>Profile</div>
                        <Select
                            isMulti={false}
                            options={profiles?.map((item) => {
                                return {
                                    value: item.Profile,
                                    label: item.Profile,
                                    id: item.ProfileId,
                                    }
                                })}
                            className='react-select'
                            classNamePrefix="react-select"
                            placeholder="Select..."
                            value={selectedProfile}
                            onChange={(profile) => handleSelectedProfile(profile)}
                            isDisabled={selectedIndication===null}
                        />
                    </div>
                    <div>
                        <div>Type</div>
                        <Select
                            isMulti={false}
                            options={types?.map((item) => {
                                return {
                                    value: item.value,
                                    label: item.label,
                                    id: item.id,
                                    }
                                })}
                            className='react-select'
                            classNamePrefix="react-select"
                            placeholder="Select..."
                            value={selectedType}
                            onChange={(type) => handleSelectedType(type)}
                            isDisabled={selectedProfile===null}
                        />
                    </div>
                    {
                        selectedType.value === "Need" && (
                            <div>
                                <div>Name</div>
                                <Select
                                    isMulti={false}
                                    options={needName?.map((item) => {
                                        return {
                                            value: item.value,
                                            label: item.label,
                                            id: item.id,
                                            }
                                        })}
                                    className='react-select'
                                    classNamePrefix="react-select"
                                    placeholder="Select..."
                                    value={selectedNeedName}
                                    onChange={(name) => handleSelectedNeedName(name)}
                                    isDisabled={false}
                                />
                            </div>
                        )
                    }
                    {
                        selectedType.value === "Benefit" && (
                            <>
                                <div>
                                    <div>Name</div>
                                    <Select
                                        isMulti={false}
                                        options={needName?.map((item) => {
                                            return {
                                                value: item.value,
                                                label: item.label,
                                                id: item.id,
                                                }
                                            })}
                                        className='react-select'
                                        classNamePrefix="react-select"
                                        placeholder="Select..."
                                        value={selectedNeedName}
                                        onChange={(name) => handleSelectedNeedName(name)}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <div>Benefit</div>
                                    <Select
                                        isMulti={false}
                                        options={benefitName?.map((item) => {
                                            return {
                                                value: item.value,
                                                label: item.label,
                                                id: item.id,
                                                }
                                            })}
                                        className='react-select'
                                        classNamePrefix="react-select"
                                        placeholder="Select..."
                                        value={selectedBenefitName}
                                        onChange={(name) => handleSelectedBenefitName(name)}
                                        isDisabled={false}
                                    />
                                </div>
                            </>
                        )
                    }
                    {
                        selectedType.value === "Disadvantages" && (
                            <>
                                <div>
                                    <div>Name</div>
                                    <Select
                                        isMulti={false}
                                        options={needName?.map((item) => {
                                            return {
                                                value: item.value,
                                                label: item.label,
                                                id: item.id,
                                                }
                                            })}
                                        className='react-select'
                                        classNamePrefix="react-select"
                                        placeholder="Select..."
                                        value={selectedNeedName}
                                        onChange={(name) => handleSelectedNeedName(name)}
                                        isDisabled={false}
                                    />
                                </div>
                                <div>
                                    <div>Disadvantages</div>
                                    <Select
                                        isMulti={false}
                                        options={disadvantageName?.map((item) => {
                                            return {
                                                value: item.value,
                                                label: item.label,
                                                id: item.id,
                                                }
                                            })}
                                        className='react-select'
                                        classNamePrefix="react-select"
                                        placeholder="Select..."
                                        value={selectedDisadvantageName}
                                        onChange={(name) => handleSelectedDisadvantagesName(name)}
                                        isDisabled={false}
                                    />
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='edit-content-footer'>
                    <button className='btn btn-light' onClick={() => setContentOnModal({onModal: false, content: null})}>cancel</button>
                    <button className='btn btn-primary' onClick={() => handleAddContent()}>add</button>
                </div>
            </Modal.Body>
        </Modal>
  )
}

export default ContentAdd