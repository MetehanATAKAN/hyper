import React, { useState, useEffect } from 'react'
import { MultiSelectReact } from '../../../../forms/Basic';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Col, Row } from 'react-bootstrap';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import { useHistory } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import { disadvantagePageButtonDatas as clearNeedPageFilter } from '../../../../../redux/actions';

const Filter = ({ setPageListFilteredDatas, handleAddNewPageList, setHandleAddNewPageList,
    selectCountries, setSelectCountries, selectProducts, setSelectProducts, selectIndications,
    selectCompetitorInn, setSelectIndications, setSelectCompetitorInn,
    selectProfiles, setSelectProfiles, selectNeed, setSelectNeed, selectSpecializations, setSelectSpecializations,
    selectCreator, setSelectCreator, selectCreateDate, setSelectCreateDate, selectStatus, setSelectStatus,
    countries, setCountries, products, setProducts, indications, setIndications, competitorInn, setCompetitorInn,
    profiles, setProfiles, needs, setNeeds, specializations, setSpecializations, creator, setCreator, createDate, setCreateDate, status, setStatus, startDate,
    setStartDate, endDate, setEndDate, setCloseFilter
}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const disadvantagePageButtonDatas = useSelector((state) => state.Need.disadvantagePageButtonDatas);
    console.log("needPageButtonDatas",disadvantagePageButtonDatas);
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
            label: 'Creator', options: creator, state: selectCreator, setState: setSelectCreator
        },
        {
            label: 'Create Date', options: createDate, state: selectCreateDate, setState: setSelectCreateDate
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
                disadvantagePageButtonDatas.product.value === null ?
                    setSelectProducts(data.map(item => ({
                        id: item.GlobalBrandId,
                        value: item.GlobalBrandName,
                        label: item.GlobalBrandName
                    }))) 
                    : setSelectProducts([disadvantagePageButtonDatas.product])
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
                disadvantagePageButtonDatas.indication.value === null ?
                setSelectIndications(res.map(item => ({
                    id: item.IndicationId,
                    value: item.Indication,
                    label: item.Indication
                })))
                : setSelectIndications([disadvantagePageButtonDatas.indication])
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
                disadvantagePageButtonDatas.profile.value === null ?
                setSelectProfiles(res.map(item => ({
                    id: item.ProfileId,
                    value: item.Profile,
                    label: item.Profile
                })))
                : setSelectProfiles([{
                    id: disadvantagePageButtonDatas.profile.id,
                    value: disadvantagePageButtonDatas.profile.value,
                    label: disadvantagePageButtonDatas.profile.label
                }])
            ))

    }, [selectIndications])

    useEffect(() => {
        if(selectProfiles.length === 0){
            setSelectNeed([]);
            setSelectSpecializations([]);
            setSelectCreator([]);
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
                        disadvantagePageButtonDatas.need.value === null ?
                        setSelectNeed(json.data?.map(item => ({
                            id: item.id,
                            value: item.needName,
                            label: item.needName
                        })))
                        : setSelectNeed([disadvantagePageButtonDatas.need])
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
                    disadvantagePageButtonDatas.specialization.length === 0 ?
                    setSelectSpecializations(json.data.map(item => ({
                        id: item.specId,
                        value: item.specName,
                        label: item.specName
                    })))
                    : (async () => {
                        await setSelectSpecializations(disadvantagePageButtonDatas.specialization[0].map(item => ({
                            id: item.id,
                            value: item.value,
                            label: item.label
                            })))
                        await dispatch(clearNeedPageFilter({
                            product: {
                                value: null,
                                label: null,
                                id: null
                            },
                            indication: {
                                value: null,
                                label: null,
                                id: null
                            },
                            profile: {
                                value: null,
                                label: null,
                                id: null
                            },
                            need: {
                                value: null,
                                label: null,
                                id: null
                            },
                            specialization: [],
                            status: {
                                value: null,
                                label: null,
                                id: null
                            }
                        }));
                    })()
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

    useEffect(() => {
        const countryIds = selectCountries.map(item => item.id)
        const needIds = selectNeed.map(item => item.id)
        const competitorInnIds = selectCompetitorInn.map(item => item.id)
        const competitorStr = competitorInnIds.join(',')
        if(countryIds.length > 0 && needIds.length > 0 && competitorInnIds.length > 0){
            FetchApiPost('services/Pages/Disadvantage/GetCreatorPageForDisadvantageByFilterDatas', 'POST', {
                countries: [0],
                needIds: needIds,
                competitorInnIds: competitorStr
            }).then(res => {
                if(res.status === 200){
                    res.json().then(json => (
                        setCreator(json.data?.map(item => ({
                            id: item.creatorId,
                            title: item.creatorName
                        }))),
                        setSelectCreator(json.data?.map(item => ({
                            id: item.creatorId,
                            value: item.creatorName,
                            label: item.creatorName
                        })))
                    ))
                }
            })
        }
        
    }, [selectCountries, selectCompetitorInn, selectNeed])

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
            // countryId.length !== 0,
            productId.length !== 0,
            indicationId.length !== 0,
            profileId.length !== 0,
            needId.length !== 0,
            specId.length !== 0,
            statusId.length !== 0
        ];

        if (conditionArr.some((el) => el === false)) return;
        
            const newStart = startDate.length !== 0 && startDate.split('T');
            const newEnd = endDate.length !== 0 && endDate.split('T');
            const data = {
                countryIds: [0],
                needIds: needId,
                competitorInnIds: competitorInnId,
                creators: selectCreator?.map((el) => el.value),
                startDate: startDate.length === 0 ? '1999-01-01T00:00:00.000Z' : newStart[0] + 'T00:00:00+03:00',
                endDate: endDate.length === 0 ? '1999-01-01T00:00:00.000Z' : newEnd[0] + 'T23:59:59+03:00',
                status: statusId,
            };

            setCloseFilter(true);
            
            FetchApiPost('services/Pages/Disadvantage/GetAllPageForDisadvantage', 'POST', data)
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((json) => setPageListFilteredDatas(json.data));
                    } else if (res.status === 500 || res.status === 502) {
                        history.push('/error-500');
                    } else {
                        setPageListFilteredDatas([]);
                    }
                })
                .catch((error) => console.log('Error', error));

    }

    const deleteFilter = () => {
        setSelectCountries([])
        setSelectProducts([])
        setSelectIndications([])
        setSelectProfiles([])
        setSelectSpecializations([])
        setSelectStatus([])

        dispatch(
            clearNeedPageFilter({
                product: {
                    value: null,
                    label: null,
                    id: null,
                },
                indication: {
                    value: null,
                    label: null,
                    id: null,
                },
                profile: {
                    value: null,
                    label: null,
                    id: null,
                },
                need: {
                    value: null,
                    label: null,
                    id: null
                },
                specialization: [],
                status: {
                    value: null,
                    label: null,
                    id: null
                }
            })
        );

    }

    useEffect(() => {
        if(handleAddNewPageList === true){
            disadvantageFilter();
            setHandleAddNewPageList(false)
        }
    }, [handleAddNewPageList])

    // const [startDate, setStartDate] = useState([]);
    // const [endDate, setEndDate] = useState([]);
    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(moment(start).format());
            setEndDate(moment(end).format());
        } else {
            setStartDate([]);
            setEndDate([]);
        }
    };

    

    const { RangePicker } = DatePicker;

    return (
        <div className='mt-2 mb-2 need-filter'>
            <Col md={10} className='d-flex flex-wrap' style={{rowGap: ".5rem", alignItems: "center"}}>
                {filterComponentsData.map((item, key) => 
                    
                    {
                        return (
                            item.label === 'Create Date' ? (
                                <RangePicker
                                    style={{
                                        borderRadius: '15px',
                                        maxWidth: '13.5rem',
                                        width: '100%',
                                        height: '26px',
                                        margin: '0 10px 0 0',
                                        borderColor: '#aaa',
                                    }}
                                    onChange={onChangeDate}
                                    format="DD/MM/YYYY"
                                    separator={
                                        <i
                                            style={{ color: '#c7c7c7', paddingTop: '3px' }}
                                            className="fas fa-arrow-right"></i>
                                    }
                                />
                            ):
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
                        )
                }
                )}
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