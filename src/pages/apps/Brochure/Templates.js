import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import { RibbonContainer, LeftCornerRibbon } from 'react-ribbons';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';
import { FetchApiGet } from '../../../utils/http.helper';

const Templates = () => {
    const { t } = useTranslation();

    const [templates, setTemplates] = useState([
        {
            id: 0,
        },
        {
            id: 1,
            cornerText: 'Newsadddddddddddd',
            cornerColor: '#f44336',
            title: 'Brochure',
            src: 'https://cdn.templates.unlayer.com/previews/google-review/1623104795757.png',
        },
        {
            id: 2,
            cornerText: null,
            cornerColor: null,
            title: 'Brochure',
            src: 'https://cdn.templates.unlayer.com/previews/fathers-day-gift-card/1664367176979.png',
        },
        {
            id: 3,
            cornerText: null,
            cornerColor: null,
            title: 'Brochure',
            src: 'https://cdn.templates.unlayer.com/previews/holiday-gift-card/1663737698228.png',
        },
        {
            id: 4,
            cornerText: 'Premium',
            cornerColor: '#0088ff',
            title: 'Brochure',
            src: 'https://cdn.templates.unlayer.com/previews/fathers-day-gift-card/1664367176979.png',
        },
        {
            id: 5,
            cornerText: null,
            cornerColor: null,
            title: 'Brochure',
            src: 'https://cdn.templates.unlayer.com/previews/biggest-mistake/1664369095362.png',
        },
        {
            id: 6,
            cornerText: null,
            cornerColor: null,
            title: 'Brochure',
            src: 'https://cdn.templates.unlayer.com/previews/childrens-book/1617448650069.png',
        },
    ]);

    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productOptions, setProductOptions] = useState([
        {
            id: 0,
            name: 'Brochure',
        },
        {
            id: 1,
            name: 'Flyer',
        },
        {
            id: 2,
            name: 'Postcard',
        },
    ]);

    const [selectedType, setSelectedType] = useState([]);
    const [typeOptions, setTypeOptions] = useState([
        {
            id: 0,
            name: 'Need',
        },
        {
            id: 1,
            name: 'Benefit',
        },
        {
            id: 2,
            name: 'Benefir Mechanizim of Achine',
        },
        {
            id: 3,
            name: 'Disadvantages',
        },
        {
            id: 4,
            name: 'Promo Subject',
        },
    ]);

    const [selectedName, setSelectedName] = useState([]);
    const [nameOptions, setNameOptions] = useState([
        {
            id: 0,
            name: 'Brochure',
        },
        {
            id: 1,
            name: 'Flyer',
        },
    ]);

    const [selectedCreator, setSelectedCreator] = useState([]);
    const [creatorOptions, setCreaterOptions] = useState([
        {
            id: 0,
            name: 'Unlayer',
        },
        {
            id: 1,
            name: 'Google',
        },
    ]);

    const [filterButtonDisabled, setFilterButtonDisabled] = useState(true);

    useEffect(() => {
        if (selectedCreator.length > 0 && filterButtonDisabled === true) {
            setFilterButtonDisabled(false);
        } else if (selectedCreator.length === 0 && filterButtonDisabled === false) {
            setFilterButtonDisabled(true);
        }
    }, [selectedCreator]);

    useEffect(() => {
        FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setProductOptions(res))
            .catch((err) => setProductOptions([]));
    }, []);

    return (
        <div className="brochure-templates">
            <div className="brochure-templates__filters">
                <div className="brochure-templates__filter">
                    <MultiSelect
                        value={selectedProduct}
                        options={productOptions.map((x) => ({
                            label: x.globalBrandName,
                            value: x.globalBrandName,
                            id: x.globalBrandId,
                        }))}
                        onChange={(e) => setSelectedProduct(e)}
                        overrideStrings={{
                            allItemsAreSelected: t(`All items are selected.`),
                            noOptions: t('No options'),
                            search: t('Search'),
                            selectAll: t('Select All'),
                            selectSomeItems: 'Product',
                        }}
                    />
                </div>
                <div className="brochure-templates__filter">
                    <MultiSelect
                        value={selectedType}
                        options={typeOptions.map((x) => ({ label: x.name, value: x.name, id: x.id }))}
                        onChange={(e) => setSelectedType(e)}
                        overrideStrings={{
                            allItemsAreSelected: t(`All items are selected.`),
                            noOptions: t('No options'),
                            search: t('Search'),
                            selectAll: t('Select All'),
                            selectSomeItems: 'Type',
                        }}
                    />
                </div>
                <div className="brochure-templates__filter">
                    <MultiSelect
                        value={selectedName}
                        options={nameOptions.map((x) => ({ label: x.name, value: x.name, id: x.id }))}
                        onChange={(e) => setSelectedName(e)}
                        overrideStrings={{
                            allItemsAreSelected: t(`All items are selected.`),
                            noOptions: t('No options'),
                            search: t('Search'),
                            selectAll: t('Select All'),
                            selectSomeItems: 'Name',
                        }}
                    />
                </div>
                <div className="brochure-templates__filter">
                    <MultiSelect
                        value={selectedCreator}
                        options={creatorOptions.map((x) => ({ label: x.name, value: x.name, id: x.id }))}
                        onChange={(e) => setSelectedCreator(e)}
                        overrideStrings={{
                            allItemsAreSelected: t(`All items are selected.`),
                            noOptions: t('No options'),
                            search: t('Search'),
                            selectAll: t('Select All'),
                            selectSomeItems: 'Creator',
                        }}
                    />
                </div>

                <div>
                    <button className="btn btn-warning" disabled={filterButtonDisabled}>
                        apply
                    </button>
                    <button className="btn btn-danger">clear</button>
                </div>
            </div>

            <Masonry className="gallery" elementType={'ul'}>
                {templates.map((img, i) => {
                    // const randomHeight = Math.round(300 + Math.random() * 400);
                    return (
                        <>
                            {i === 0 ? (
                                <li className="new-template-box imgContainer">
                                    <div className="new-template-box__container">
                                        <i className="fa-solid fa-plus"></i>
                                        <button className="btn btn-primary">New Template</button>
                                    </div>
                                </li>
                            ) : img.cornerText ? (
                                <RibbonContainer className="imgContainer" style={{ maxHeight: '500px' }}>
                                    <LeftCornerRibbon
                                        backgroundColor={img.cornerColor}
                                        color="#f0f0f0"
                                        fontFamily="Arial">
                                        {img.cornerText}
                                    </LeftCornerRibbon>
                                    <Link to={`/apps/brochure/template/${img.id}`}>
                                        <img src={img.src} alt={img.title} />
                                    </Link>
                                </RibbonContainer>
                            ) : (
                                <RibbonContainer className="imgContainer" style={{ maxHeight: '500px' }}>
                                    <Link to={`/apps/brochure/template/${img.id}`}>
                                        <img src={img.src} alt={img.title} />
                                    </Link>
                                </RibbonContainer>
                            )}
                        </>
                    );
                })}
            </Masonry>
        </div>
    );
};

export default Templates;
