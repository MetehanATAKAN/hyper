import React, { useState, useEffect } from 'react'
import { FetchApiGet } from '../../../../utils/http.helper';
import Masonry from "react-masonry-component";
import { RibbonContainer,  LeftCornerRibbon } from "react-ribbons";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';
import ContentAdd from './ContentAdd';

const ContentTab = ({ filterStatus, setFilterStatus, contentOnModal, setContentOnModal }) => {
    const { t } = useTranslation();
    const [templates, setTemplates] = useState([])

    

    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productOptions, setProductOptions] = useState([
        {
            id: 0,
            name: 'Brochure'
        },
        {
            id: 1,
            name: 'Flyer'
        },
        {
            id: 2,
            name: 'Postcard'
        },
    ])

    const [selectedType, setSelectedType] = useState([]);
    const [typeOptions, setTypeOptions] = useState([
        {
            id: 0,
            name: 'Need'
        },
        {
            id: 1,
            name: 'Benefit'
        },
        {
            id: 2,
            name: 'Benefir Mechanizim of Achine'
        },
        {
            id: 3,
            name: 'Disadvantages'
        },
        {
            id: 4,
            name: 'Promo Subject'
        }
    ])

    const [selectedName, setSelectedName] = useState([]);
    const [nameOptions, setNameOptions] = useState([
        {
            label: 'Germany', code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA', code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        }
    ])

    const [selectedCreator, setSelectedCreator] = useState([]);
    const [creatorOptions, setCreaterOptions] = useState([
        {
            id: 0,
            name: 'Unlayer'
        },
        {
            id: 1,
            name: 'Google'
        }
    ])

    const [filterButtonDisabled, setFilterButtonDisabled] = useState(true);

    useEffect(() => {
        if((selectedCreator.length > 0) && filterButtonDisabled === true){
            setFilterButtonDisabled(false);
        }else if((selectedCreator.length === 0) && filterButtonDisabled === false){
            setFilterButtonDisabled(true);
        }

    }, [selectedCreator])

    useEffect(() => {
        FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET')
        .then(res => res.json())
        .then(res => res.data)
        .then(res => setProductOptions(res))
        .catch(err => setProductOptions([]))
    }, [])

    

    
const [groupedCities, setGroupedCities] = useState([
    {
        label: 'Germany', code: 'DE',
        items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Frankfurt', value: 'Frankfurt' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Munich', value: 'Munich' }
        ]
    },
    {
        label: 'USA', code: 'US',
        items: [
            { label: 'Chicago', value: 'Chicago' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' }
        ]
    },
    {
        label: 'Japan', code: 'JP',
        items: [
            { label: 'Kyoto', value: 'Kyoto' },
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' }
        ]
    }
]);

const [selectedCities, setSelectedCities] = useState(null);
    
  return (
    <div>
       
    </div>
  )
}

export default ContentTab