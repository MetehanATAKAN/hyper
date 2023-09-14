import React, { useState, useEffect } from 'react'
import { MultiSelectReact } from '../../../../forms/Basic';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Col, Row } from 'react-bootstrap';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import { useHistory } from 'react-router-dom';

const Filter = ({ setDisadvantagesFilteredDatas, handleAddNewDisadvantages, setHandleAddNewDisadvantages,
    selectCountries, setSelectCountries, selectProducts, setSelectProducts, selectIndications, setSelectIndications,
    selectProfiles, setSelectProfiles, selectNeed, setSelectNeed, selectSpecializations, setSelectSpecializations,
    selectCompetitorInn, setSelectCompetitorInn, selectStatus, setSelectStatus, selectStructures, setSelectStructures,
    selectPage, setSelectPage, countries, setCountries, products, setProducts, indications, setIndications, profiles, setProfiles,
    needs, setNeeds, specializations, setSpecializations, competitorInn, setCompetitorInn, status, setStatus, structures, setStructures, page ,setPage,
    setCloseFilter
}) => {
    const { t } = useTranslation();
    const history = useHistory();

    // const [selectCountries, setSelectCountries] = useState([]);
    // const [selectProducts, setSelectProducts] = useState([]);
    // const [selectIndications, setSelectIndications] = useState([]);
    // const [selectProfiles, setSelectProfiles] = useState([]);
    // const [selectNeed, setSelectNeed] = useState([]);
    // const [selectSpecializations, setSelectSpecializations] = useState([]);
    // const [selectCompetitorInn, setSelectCompetitorInn] = useState([]);
    // const [selectStatus, setSelectStatus] = useState([
    //     { id: 0, title: "Editable", value: "Editable" },
    //     { id: 1, title: "Approval", value: "Approval" },
    //     { id: 2, title: "Approved", value: "Approved" },
    //     { id: 3, title: "Reject", value: "Reject" }
    // ]);
    // const [selectStructures, setSelectStructures] = useState([]);
    // const [selectPage, setSelectPage] = useState([]);

    // const [countries, setCountries] = useState([]);
    // const [products, setProducts] = useState([]);
    // const [indications, setIndications] = useState([]);
    // const [profiles, setProfiles] = useState([]);
    // const [needs, setNeeds] = useState([]);
    // const [specializations, setSpecializations] = useState([]);
    // const [competitorInn, setCompetitorInn] = useState([]);
    // const [status, setStatus] = useState([
    //     { id: 0, title: "Editable", value: "Editable" },
    //     { id: 1, title: "Approval", value: "Approval" },
    //     { id: 2, title: "Approved", value: "Approved" },
    //     { id: 3, title: "Reject", value: "Reject" }
    // ]);
    // const [structures, setStructures] = useState([]); // şimdilik null rastgele
    // const [page, setPage] = useState([]);

    const filterComponentsData = [
        {
            label: 'Countries', options: countries, state: selectCountries, setState: setSelectCountries 
        },
        {
            label: 'Product', options: products, state: selectProducts, setState: setSelectProducts
        },
        {
            label: 'Indication', options: indications, state: selectIndications, setState: setSelectIndications
        },
        {
            label: 'Profile', options: profiles, state: selectProfiles, setState: setSelectProfiles
        },
        {
            label: 'Need', options: needs, state: selectNeed, setState: setSelectNeed
        },
        {
            label: 'Specialization', options: specializations, state: selectSpecializations, setState: setSelectSpecializations
        },
        {
            label: 'Competitor Inn', options: competitorInn, state: selectCompetitorInn, setState: setSelectCompetitorInn
        },
        {
            label: 'Structure', options: structures, state: selectStructures, setState: setSelectStructures
        },
        {
            label: 'Page', options: page, state: selectPage, setState: setSelectPage
        },
        {
            label: 'Status', options: status, state: selectStatus, setState: setSelectStatus
        }
    ]

    useEffect(() => {
        if(selectProducts.length !== 0){
            if(selectProducts.length === products.length){
                setSelectStatus([
                    { id: 0, label: "Editable", value: "Editable" },
                    { id: 1, label: "Approval", value: "Approval" },
                    { id: 2, label: "Approved", value: "Approved" },
                    { id: 3, label: "Reject", value: "Reject" }
                ])
            }
        }
    }, [selectProducts, selectCountries, selectIndications, selectProfiles, selectNeed, products, countries, indications, profiles, needs])

    useEffect(() => {
        if(products.length !== 0 && selectProducts.length === 0){
            setSelectStatus([])
        }else if (countries.length !== 0 && selectCountries.length === 0){
            setSelectProducts([])
            setSelectStatus([])
        }else if (indications.length !== 0 && selectIndications.length === 0){
            setSelectStatus([])
        }else if(profiles.length !== 0 && selectProfiles.length === 0){
            setSelectStatus([])
        }else if(needs.length !== 0 && selectNeed.length === 0){
            setSelectStatus([])
        }
    }, [selectProducts, selectCountries, selectIndications, selectProfiles, selectNeed, products, countries, indications, profiles, needs])

    useEffect(() => {
        try{
            FetchApiGet('api/OldSystem/GetCountries', 'GET')
            .then(res => res.json())
            .then(data => (setSelectCountries(data.map(item => ({
                id: item.CountryId,
                value: item.CountryName,
                label: item.CountryName
                }))),
                setCountries(data.map(item => ({
                    id: item.CountryId,
                    title: item.CountryName
                }))) 
            ))

            FetchApiGet('api/OldSystem/GetAllGlobalBrands', 'GET')
                .then(res => res.json())
                .then(data => (setProducts(data.map(item => ({
                    id: item.GlobalBrandId,
                    title: item.GlobalBrandName
                }))),
                    setSelectProducts(data.map(item => ({
                        id: item.GlobalBrandId,
                        value: item.GlobalBrandName,
                        label: item.GlobalBrandName
                    })))
                ))

        }catch(err){
            console.log(err)
        }

    }, [])

    useEffect(() => {
        if(selectProducts.length === 0) setSelectNeed([]);
        const productId = selectProducts.map(item => item.id)
        const str = productId.join(',')

        FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST',{
            brandIds: str
        } ).then(res => res.json())
            .then(res => (
                setIndications(res.map(item => ({
                    id: item.IndicationId,
                    title: item.Indication
                }))),
                setSelectIndications(res.map(item => ({
                    id: item.IndicationId,
                    value: item.Indication,
                    label: item.Indication
                })))
            ))

    }, [selectProducts])

    useEffect(() => {
        if(selectIndications.length === 0){
            setSelectProfiles([]);
            setSelectNeed([]);
            setSelectSpecializations([]);
            
        }
        const productId = selectProducts.map(item => item.id)
        const productStr = productId.join(',')
        const indicationId = selectIndications.map(item => item.id)
        const indicationStr = indicationId.join(',')
        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST',{
            brandIds: productStr,
            indicationIds: indicationStr
        } ).then(res => res.json())
            .then(res => (
                setProfiles(res.map(item => ({
                    id: item.ProfileId,
                    title: item.Profile,
                }))),
                setSelectProfiles(res.map(item => ({
                    id: item.ProfileId,
                    value: item.Profile,
                    label: item.Profile
                })))
            ))

    }, [selectIndications])

    useEffect(() => {
        if(selectProfiles.length === 0){
            setSelectNeed([]);
            setSelectSpecializations([]);
            
        }
        const productId = selectProducts.map(item => item.id)
        const indicationId = selectIndications.map(item => item.id)
        const profileId = selectProfiles.map(item => item.id)
        if(productId.length > 0 && indicationId.length > 0 && profileId.length > 0){
            FetchApiPost('services/Pages/Need/GetNeedsForDisadvantage', 'POST', {
                brandIds: productId,
                  indicationIds: indicationId,
                  profileIds: profileId
            }).then(res => {
                if(res.status === 200){
                    res.json().then(json => (
                        setNeeds(json.data?.map(item => ({
                            id: item.id,
                            title: item.needName
                        }))),
                        setSelectNeed(json.data?.map(item => ({
                            id: item.id,
                            value: item.needName,
                            label: item.needName
                        })))
                    ))
                } else if (res.status === 500 || res.status === 502){
                    history.push('/error-500');
                }
            })
        }
        
    }, [selectProfiles])

    useEffect(() => {
        
        const needId = selectNeed.map(item => item.id)
        FetchApiPost('services/Pages/Need/GetNeedsSpecsByNeedIds', 'POST',{
            needIds: needId
        } ).then(res => {
            if(res.status === 200){
                res.json().then(json => (
                    setSpecializations(json.data.map(item => ({
                        id: item.specId,
                        title: item.specName,
                    }))),
                    setSelectSpecializations(json.data.map(item => ({
                        id: item.specId,
                        value: item.specName,
                        label: item.specName
                    })))
                ))
            } else if (res.status === 500 || res.status === 502){
                history.push('/error-500');
            }
        })

    }, [selectNeed])

    useEffect(() => {
        const productId = selectProducts.map(item => item.id)
        const productStr = productId.join(',')
        FetchApiPost('api/OldSystem/GetCompetitorComposition', 'POST', {
            brandIds: productStr
        }).then(res => {
            if(res.status === 200){
                res.json().then(json => (
                    setCompetitorInn(json?.map(item => ({
                        id: item.CompetitorInnId,
                        title: item.CompetitorInnName
                    }))),
                    setSelectCompetitorInn(json?.map(item => ({
                        id: item.CompetitorInnId,
                        value: item.CompetitorInnName,
                        label: item.CompetitorInnName
                    })))
                ))
            }
        })
    }, [selectProducts])

    const disadvantageFilter = () => {
        const countryId = selectCountries.map(item => item.id)
        const productId = selectProducts.map(item => item.id)
        const indicationId = selectIndications.map(item => item.id)
        const profileId = selectProfiles.map(item => item.id)
        const needId = selectNeed.map(item => item.id)
        const specId = selectSpecializations.map(item => item.id)
        const competitorInnId = selectCompetitorInn.map(item => item.id)
        const statusId = selectStatus.map(item => item.id)

        // const structureId = selectStructures.map(item => item.id) structure ve page şimdilik yok
        // const pageId = selectPage.map(item => item.id)
        const conditionArr = [
            countryId.length !== 0,
            productId.length !== 0,
            indicationId.length !== 0,
            profileId.length !== 0,
            needId.length !== 0,
            specId.length !== 0,
            statusId.length !== 0
        ];

        if (conditionArr.some((el) => el === false)) return;

        setCloseFilter(true);
        
        FetchApiPost('services/Pages/Disadvantage/GetAllDisadvantage', 'POST', {
            countryIds: countryId,
            productIds: productId,
            indications: indicationId,
            profileIds: profileId,
            needIds: needId,
            specIds: specId,
            competitorInnIds: competitorInnId,
            statusIds: statusId,
        }).then(res => res.json())
            .then(res => setDisadvantagesFilteredDatas(res.data))

    }

    const deleteFilter = () => {
        setSelectCountries([])
        setSelectProducts([])
        setSelectIndications([])
        setSelectProfiles([])
        setSelectSpecializations([])
        setSelectStatus([])
        setSelectStructures([])
        setSelectPage([])
    }

    useEffect(() => {
        if(handleAddNewDisadvantages === true){
            disadvantageFilter();
            setHandleAddNewDisadvantages(false)
        }
    }, [handleAddNewDisadvantages])

    return (
        <div className='mt-2 mb-2 need-filter'>
            <Col md={10} className='d-flex flex-wrap' style={{rowGap: ".5rem", alignItems: "center"}}>
                {filterComponentsData.map((item, key) => (
                    <MultiSelectReact
                        key={key}
                        value={item.state}
                        placeholder={item.label}
                        options={item.options?.map((el) => ({
                            id: el.id,
                            value: el.title,
                            label: el.title,
                        }))}
                        change={item.setState}
                    />
                ))}
            </Col>
            <Col md={1} className='need-filter__buttons'>
                    <button onClick={() => disadvantageFilter()}>
                        <Icon path={mdiCheck}
                            size={1}
                            color={'#0ACF97'}
                        />
                    </button>

                    <button onClick={() => deleteFilter()}>
                        <Icon path={mdiDeleteSweepOutline}
                            size={1}
                            color={'#FA5C7C'}
                        />
                    </button>

                    <button onClick={() => setCloseFilter(true)}>
                        <Icon path={mdiClose}
                            size={1}
                            color={'#6C757D'}
                        />
                    </button>
                </Col>
        </div>
    )
}

export default Filter