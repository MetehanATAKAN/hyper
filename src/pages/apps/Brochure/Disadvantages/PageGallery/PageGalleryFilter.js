import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { MultiSelectReact } from '../../../../forms/Basic';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import PageGalleryTemplates from './PageGalleryTemplates';
import CreatePageForNeedModal from './CreatePageForNeedModal';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';

const PageGalleryFilter = ({ showModal, setShowModal, isFilter, setIsFilter, templates, setTemplates }) => {

    const history = useHistory();
    const { t } = useTranslation();
    const { RangePicker } = DatePicker;
   
    // Countries
    const [countries, setCountries] = useState([])
    const [selectCountries, setSelectCountries] = useState([]);

    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);

    // Indication
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState([]);

    // Profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);
    
    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);

    // Specialization
    const [specialization, setSpecialization] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState([]);

    // Creator
    const [creator, setCreator] = useState([]);
    const [selectCreator, setSelectCreator] = useState([]);

    // Create Date
    const [createDate, setCreateDate] = useState([]);
    const [selectCreateDate, setSelectCreateDate] = useState([]);

    //Status
    const [status, setStatus] = useState([{ value: 0, label: "Editable" },
    { value: 1, label: "Approval" },
    { value: 2, label: "Approved" },
    { value: 3, label: "Reject" }]);
    const [selectStatus, setSelectStatus] = useState([{ value: 0, label: "Editable" },
    { value: 1, label: "Approval" },
    { value: 2, label: "Approved" },
    { value: 3, label: "Reject" }]);

    // Competitor INN
    const [competitorInn, setCompetitorInn] = useState([]);
    const [selectCompetitorInn, setSelectCompetitorInn] = useState([]);


    const filters = [
        {
            options: countries,
            value: selectCountries,
            change: setSelectCountries,
            placeHolder: 'Countries'
        },
        {
            options: product,
            value: selectProduct,
            change: setSelectProduct,
            placeHolder: 'Product'
        },
        {
            options: indication,
            value: selectIndication,
            change: setSelectIndication,
            placeHolder: 'Indication'
        },
        {
            options: profile,
            value: selectProfile,
            change: setSelectProfile,
            placeHolder: 'Profile'
        },
        {
            options: need,
            value: selectNeed,
            change: setSelectNeed,
            placeHolder: 'Need'
        },
        {
            options: specialization,
            value: selectSpecialization,
            change: setSelectSpecialization,
            placeHolder: 'Specialization'
        },
        {
            options: competitorInn,
            value: selectCompetitorInn,
            change: setSelectCompetitorInn,
            placeHolder: 'Competitor INN'
        },
        {
            options: creator,
            value: selectCreator,
            change: setSelectCreator,
            placeHolder: 'Creator'
        },
        {
            options: createDate,
            value: selectCreateDate,
            change: setSelectCreateDate,
            placeHolder: 'Create Date'
        },
        {
            options: status,
            value: selectStatus,
            change: setSelectStatus,
            placeHolder: 'Status'
        },
    ]

    const clearFilter = () => {
       
        setSelectCountries([]);

        setProduct([]);
        setSelectProduct([]);

        setIndication([]);
        setSelectIndication([]);

        setProfile([]);
        setSelectProfile([]);

        setNeed([]);
        setSelectNeed([]);

        setSpecialization([]);
        setSelectSpecialization([]);

        setCreator([]);
        setSelectCreator([]);

        setCreateDate([]);
        setSelectCreateDate([]);

        setStatus([]);
        setSelectStatus([]);
    }

    // Countries
    useEffect(() => {
        FetchApiGet('services/Pages/ProductPage/GetAllCountriesForPageListFilter', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(data => {
                                setCountries(data.data.map(item => (
                                    {
                                        value: item.countryId,
                                        label: item.countryName
                                    }
                                )))
                                setSelectCountries(data.data.map(item => (
                                    {
                                        value: item.countryId,
                                        label: item.countryName
                                    }
                                )))
                            })

                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [history])

    // Product
    useEffect(() => {
            const productBody = {
                CountryIds: selectCountries.map(item => (
                    item.value
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetProductsByCountryFilterDatas ', 'POST', productBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setProduct(data.data.map(item => (
                                        {
                                            value: item.productId,
                                            label: item.productName
                                        }
                                    )))
                                    setSelectProduct(data.data.map(item => (
                                        {
                                            value: item.productId,
                                            label: item.productName
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        

    }, [history, selectCountries])

    // Indication
    useEffect(() => {

            const indicationBody = {
                Countries: selectCountries.map(item => (
                    item.value
                )),
                Products: selectProduct.map(item => (
                    item.value
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetIndicationsForPageListFilter', 'POST', indicationBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setIndication(data.data.map(item => (
                                        {
                                            value: item.indicationId,
                                            label: item.indicationName
                                        }
                                    )))
                                    setSelectIndication(data.data.map(item => (
                                        {
                                            value: item.indicationId,
                                            label: item.indicationName
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        

    }, [history, selectCountries, selectProduct])

    // Profile
    useEffect(() => {
        
            const profileBody = {
                Countries: selectCountries.map(item => (
                    item.value
                )),
                Products: selectProduct.map(item => (
                    item.value
                )),
                Indications: selectIndication.map(item => (
                    item.value
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetProfilesForPageListFilter', 'POST', profileBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setProfile(data.data.map(item => (
                                        {
                                            value: item.profileId,
                                            label: item.profileName
                                        }
                                    )))
                                    setSelectProfile(data.data.map(item => (
                                        {
                                            value: item.profileId,
                                            label: item.profileName
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        

    }, [history, selectCountries, selectIndication, selectProduct])

    // Need
    useEffect(() => {
        
            const needBody = {
                Countries: selectCountries.map(item => (
                    item.value
                )),
                Products: selectProduct.map(item => (
                    item.value
                )),
                Indications: selectIndication.map(item => (
                    item.value
                )),
                Profiles: selectProfile.map(item => (
                    item.value
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetNeedsForPageListFilter ', 'POST', needBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setNeed(data.data.map(item => (
                                        {
                                            value: item.needId,
                                            label: item.needName
                                        }
                                    )))
                                    setSelectNeed(data.data.map(item => (
                                        {
                                            value: item.needId,
                                            label: item.needName
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        

    }, [history, selectCountries, selectIndication, selectProduct, selectProfile])

    // Specialization
    useEffect(() => {
        
            const specBody = {
                Countries: selectCountries.map(item => (
                    item.value
                )),
                Products: selectProduct.map(item => (
                    item.value
                )),
                Indications: selectIndication.map(item => (
                    item.value
                )),
                Profiles: selectProfile.map(item => (
                    item.value
                )),
                Needs: selectNeed.map(item => (
                    item.value
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetSpecsForPageListFilter ', 'POST', specBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setSpecialization(data.data.map(item => (
                                        {
                                            value: item.specId,
                                            label: item.specName,
                                            specAbb: item.specAbb
                                        }
                                    )))
                                    setSelectSpecialization(data.data.map(item => (
                                        {
                                            value: item.specId,
                                            label: item.specName,
                                            specAbb: item.specAbb
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        

    }, [history, selectCountries, selectIndication, selectNeed, selectProduct, selectProfile])

    // Creator
    useEffect(() => {
        
            const creatorBody = {
                Countries: selectCountries.map(item => (
                    item.value
                )),
                Products: selectProduct.map(item => (
                    item.value
                )),
                Indications: selectIndication.map(item => (
                    item.value
                )),
                Profiles: selectProfile.map(item => (
                    item.value
                )),
                Needs: selectNeed.map(item => (
                    item.value
                )),
                Specs: selectSpecialization.map(item => (
                    item.value
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetCreatorForPageListFilter', 'POST', creatorBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setCreator(data.data.map(item => (
                                        {
                                            value: item.creatorId,
                                            label: item.creatorName,
                                        }
                                    )))
                                    setSelectCreator(data.data.map(item => (
                                        {
                                            value: item.creatorId,
                                            label: item.creatorName,
                                        }
                                    )))
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        

    }, [history, selectCountries, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

    useEffect(() => {
        if(selectProduct.length !== 0){
            if(selectProduct.length === product.length){
                setSelectStatus([{ value: 0, label: "Editable" },
                { value: 1, label: "Approval" },
                { value: 2, label: "Approved" },
                { value: 3, label: "Reject" }])
            }
        }
    }, [selectProduct, selectCountries, selectIndication, selectProfile, selectNeed, product, countries, indication, profile, need])

    useEffect(() => {
        if(product.length !== 0 && selectProduct.length === 0){
            setSelectStatus([])
        }else if (countries.length !== 0 && selectCountries.length === 0){
            setSelectStatus([])
        }else if (indication.length !== 0 && selectIndication.length === 0){
            setSelectStatus([])
        }else if(profile.length !== 0 && selectProfile.length === 0){
            setSelectStatus([])
        }else if(need.length !== 0 && selectNeed.length === 0){
            setSelectStatus([])
        }
    }, [selectProduct, selectCountries, selectIndication, selectProfile, selectNeed, product, countries, indication, profile, need])

    // Create Date
    // useEffect(() => {
        
    //         const createBody = {
    //             Countries: selectCountries.map(item => (
    //                 item.value
    //             )),
    //             Products: selectProduct.map(item => (
    //                 item.value
    //             )),
    //             Indications: selectIndication.map(item => (
    //                 item.value
    //             )),
    //             Profiles: selectProfile.map(item => (
    //                 item.value
    //             )),
    //             Needs: selectNeed.map(item => (
    //                 item.value
    //             )),
    //             Specs: selectSpecialization.map(item => (
    //                 item.value
    //             )),
    //             CreatorNames: selectCreator.map(item => (
    //                 item.label
    //             ))
    //         }
    //         FetchApiPost('services/Pages/ProductPage/GetCreateDateForPageListFilter', 'POST', createBody)
    //             .then((res) =>
    //                 (async () => {
    //                     try {
    //                         if (res.status === 200) {
    //                             res.json().then(data => {
    //                                 setCreateDate(data.data.map(item => (
    //                                     {
    //                                         value: 0,
    //                                         label: item.createdDate,
    //                                     }
    //                                 )))
    //                                 setSelectCreateDate(data.data.map(item => (
    //                                     {
    //                                         value: 0,
    //                                         label: item.createdDate,
    //                                     }
    //                                 )))
    //                             })

    //                         }
    //                         else if (res.status === 500) {
    //                             history.push('/error-500');
    //                         }

    //                     } catch (error) {
    //                         console.log('error', error);
    //                     }
    //                 })()
    //             )
        

    // }, [history, selectCountries, selectCreator, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

    useEffect(() => {
        const brandIds = selectProduct.map(data => (data.value))
        const brandStr = brandIds.join(',')
        FetchApiPost('api/OldSystem/GetCompetitorComposition', 'POST', {
            brandIds: brandStr
        })
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then(data => {
                            setCompetitorInn(data.map(item => (
                                {
                                    value: item.CompetitorInnId,
                                    label: item.CompetitorInnName

                                }
                            )))
                            setSelectCompetitorInn(data.map(item => (
                                {
                                    value: item.CompetitorInnId,
                                    label: item.CompetitorInnName
                                }
                            )))
                        })

                    }
                    else if (res.status === 500) {
                        history.push('/error-500');
                    }

                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
    }, [selectProduct])

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
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

    const applyPageFilter = () => {
        const newStart = startDate.length !== 0 && startDate.split('T');
        const newEnd = endDate.length !== 0 && endDate.split('T');

        const filterBody = {
            countryIds: selectCountries.map(data => (data.value)),
            needIds: selectNeed.map(data => (data.value)),
            competitorInnIds: selectCompetitorInn.map(data => (data.value)),
            creators: selectCreator.map(data => (data.label)),
            startDate: startDate.length === 0 ? '1999-01-01T00:00:00.000Z' : newStart[0] + 'T00:00:00+03:00',
            endDate: endDate.length === 0 ? '1999-01-01T00:00:00.000Z' : newEnd[0] + 'T23:59:59+03:00',
            status: selectStatus.map(data => (data.value)),
        }
        FetchApiPost('services/Pages/Disadvantage/GetAllPageGaleryForDisadvantage', 'POST', filterBody)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setIsFilter(false)
                            res.json().then(data => {
                                setTemplates(data.data)
                            })

                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

    
  return (
    <div className='mt-2 mb-2 disadvantage-page-gallery-filter'>
    {
        isFilter && ( <>
        <Col md={10} className='d-flex flex-wrap' style={{rowGap: ".5rem", alignItems: "center"}}>
            {
                filters.map((data, key) => {
                    return (
                        data.placeHolder === 'Create Date' ?
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
                        :
                        <MultiSelectReact
                            key={key}
                            options={data.options}
                            change={(e) => data.change(e)}
                            value={data.value}
                            placeholder={data.placeHolder}
                        />
                    )
                })
            }
        </Col>
        <Col md={1} className='need-filter__buttons'>
        <button onClick={() => applyPageFilter()}>
                        <Icon path={mdiCheck}
                            size={1}
                            color={'#0ACF97'}
                        />
                    </button>

                    <button onClick={() => clearFilter()}>
                        <Icon path={mdiDeleteSweepOutline}
                            size={1}
                            color={'#FA5C7C'}
                        />
                    </button>

                    <button onClick={() => setIsFilter(false)}>
                        <Icon path={mdiClose}
                            size={1}
                            color={'#6C757D'}
                        />
                    </button>
        </Col>
        </>
        
        )
    }
    {
        showModal && (
            <CreatePageForNeedModal showModal={showModal} setShowModal={setShowModal} />
        )
    }
</div>
  )
}

export default PageGalleryFilter