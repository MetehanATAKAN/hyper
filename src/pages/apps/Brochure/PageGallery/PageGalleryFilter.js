import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { MultiSelectReact } from '../../../forms/Basic';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import PageGalleryTemplates from './PageGalleryTemplates';
import CreatePageForNeedModal from './CreatePageForNeedModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const PageGalleryFilter = ({ showModal, setShowModal, isFilter, setIsFilter, templates, setTemplates }) => {

console.log(templates);
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
    const [status, setStatus] = useState([]);
    const [selectStatus, setSelectStatus] = useState([]);

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    const changeSelect = (name, e) => {
        switch (name) {
            case 'Countries':
                return (
                    setSelectCountries(e),

                    setSelectProduct([]),
                
                    setSelectIndication([]),
                    setIndication([]),

                    setSelectProfile([]),
                    setProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setSpecialization([]),

                    setSelectCreator([]),
                    setCreator([]),

                    setSelectStatus([]),
                    setStatus([])

                )
            case 'Product':
                return (
                    setSelectProduct(e),

                    setSelectIndication([]),
                    setIndication([]),

                    setSelectProfile([]),
                    setProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setSpecialization([]),

                    setSelectCreator([]),
                    setCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Indication':
                return (
                    setSelectIndication(e),

                    setSelectProfile([]),
                    setProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setSpecialization([]),

                    setSelectCreator([]),
                    setCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Profile':
                return (
                    setSelectProfile(e),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setSpecialization([]),

                    setSelectCreator([]),
                    setCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Need':
                return (
                    setSelectNeed(e),

                    setSelectSpecialization([]),
                    setSpecialization([]),

                    setSelectCreator([]),
                    setCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Specialization':
                return (
                    setSelectSpecialization(e),

                    setSelectCreator([]),
                    setCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Creator':
                return (
                    setSelectCreator(e),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Status':
                return (
                    setSelectStatus(e)
                )
            default:
                break;
        }
    }



    const filters = [
        {
            options: countries,
            value: selectCountries,
            change: changeSelect,
            placeHolder: 'Countries'
        },
        {
            options: product,
            value: selectProduct,
            change: changeSelect,
            placeHolder: 'Product'
        },
        {
            options: indication,
            value: selectIndication,
            change: changeSelect,
            placeHolder: 'Indication'
        },
        {
            options: profile,
            value: selectProfile,
            change: changeSelect,
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
            change: changeSelect,
            placeHolder: 'Specialization'
        },
        {
            options: creator,
            value: selectCreator,
            change: changeSelect,
            placeHolder: 'Creator'
        },
        { 

            options: [],
            value: [],
            change: [],
            placeHolder: 'Create Date'
        },
        {
            options: status,
            value: selectStatus,
            change: changeSelect,
            placeHolder: 'Status'
        },
    ]

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

        const filterBody = {
            Countries: selectCountries.map(data => (data.value)),
            Indications: selectIndication.map(data => (data.value)),
            Profiles: selectProfile.map(data => (data.value)),
            Needs: selectNeed.map(data => (data.value)),
            Specs: selectSpecialization.map(data => (data.value)),
            CreatorNames: selectCreator.map(data => (data.label)),
            // CreateDate: selectCreateDate.map(data => (data.label)),
            startDate: startDate.length === 0 ? '1999-01-01T00:00:00.000Z' : startDate,
            endDate: endDate.length === 0 ? '1999-01-01T00:00:00.000Z' : endDate,
            Status: selectStatus.map(data => (data.value)),
            Products: selectProduct.map(data => (data.value))
        }
        FetchApiPost('services/Pages/ProductPage/ApplyForPageListFilter', 'POST', filterBody)
        .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    setTemplates([]);
                        res.json().then((json) => 
                        json.data.map(data => (
                            console.log(data),
                            data.pageId !== 0 &&
                            setTemplates(prev=>[...prev,
                                {
                                    id: data.contentId,
                                    detailsId: data.pageId,
                                    isApproved: data.isApprovedContent,
                                    name: data.name,
                                    cornerText:
                                        data.isApprovedContent === 0
                                            ? 'delete'
                                            : data.isApprovedContent === 1
                                                ? 'editing'
                                                : data.isApprovedContent === 2
                                                    ? 'send to approval'
                                                    : data.isApprovedContent === 3
                                                        ? 'approved'
                                                        : data.isApprovedContent === 4
                                                            ? 'reject'
                                                            : data.isApproved === 5
                                                                ? 'archive'
                                                                : null
                                    ,
                                    cornerColor:
                                        data.isApprovedContent === 1
                                            ? '#e5e5e5'
                                            : data.isApprovedContent === 2
                                                ? 'rgb(255, 255, 136)'
                                                : data.isApprovedContent === 3
                                                    ? 'green'
                                                    : data.isApprovedContent === 4
                                                        ? 'red'
                                                        : data.isApprovedContent === 5
                                                            ? 'rgb(77, 28, 28)'
                                                            : null
                                    ,
                                    title: 'Brochure',
                                    src: data.imageFile
                                }
                            ])
                        ))
                       );
                    // res.json().then((item) => {
                    //     item.data.map(data =>(
                    //         data.pageId !== 0 &&
                    //         setTemplates(item.data.map(data => ( 
                    //             {
                    //                 id              : data.contentId,
                    //                 isApproved      : data.isApprovedContent,
                    //                 name            : data.name,
                    //                 cornerText      : 
                    //                 data.isApprovedContent === 0
                    //                 ?  'delete'
                    //                 :data.isApprovedContent === 1
                    //                 ?  'editing'
                    //                 :data.isApprovedContent === 2
                    //                 ?   'send to approval'
                    //                 :data.isApprovedContent === 3
                    //                 ?   'approved'
                    //                 :data.isApprovedContent === 4
                    //                 ?   'reject'
                    //                 :data.isApproved === 5
                    //                 ?   'archive'
                    //                 :null
                    //                 ,
                    //                 cornerColor     : 
                    //                 data.isApprovedContent === 1
                    //                 ?  '#e5e5e5'
                    //                 :data.isApprovedContent === 2
                    //                 ?   'rgb(255, 255, 136)'
                    //                 :data.isApprovedContent === 3
                    //                 ?   'green'
                    //                 :data.isApprovedContent === 4
                    //                 ?   'red'
                    //                 :data.isApprovedContent === 5
                    //                 ?   'rgb(77, 28, 28)'
                    //                 :null
                    //                 ,
                    //                 title           : 'Brochure',
                    //                 src             : data.imageFile
                    //             }
                    //         )))
                    //     ))
                        
                    // })
                }
                else if (res.status === 500) {
                    history.push('/error-500');
                }
                else {
                    console.log('hata');
                }

            } catch (error) {
                console.log('error', error);
            }
        })()
    )
    }

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
        if (selectCountries.length !== 0) {
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
        }

    }, [history, selectCountries])


    // Indication
    useEffect(() => {
        if (selectCountries.length !== 0 && selectProduct.length !== 0) {
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
        }

    }, [history, selectCountries, selectProduct])

    // Profile
    useEffect(() => {
        if (selectCountries.length !== 0 && selectProduct.length !== 0 && selectIndication.length !== 0) {
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
        }

    }, [history, selectCountries, selectIndication, selectProduct])

    // Need
    useEffect(() => {
        if (
            selectCountries.length !== 0 &&
            selectProduct.length !== 0 &&
            selectIndication.length !== 0 &&
            selectProfile.length !== 0
        ) {
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
        }

    }, [history, selectCountries, selectIndication, selectProduct, selectProfile])

    // Specialization
    useEffect(() => {
        if (
            selectCountries.length !== 0 &&
            selectProduct.length !== 0 &&
            selectIndication.length !== 0 &&
            selectProfile.length !== 0 &&
            selectNeed.length !== 0
        ) {
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
        }

    }, [history, selectCountries, selectIndication, selectNeed, selectProduct, selectProfile])

    // Creator
    useEffect(() => {
        if (
            selectCountries.length !== 0 &&
            selectProduct.length !== 0 &&
            selectIndication.length !== 0 &&
            selectProfile.length !== 0 &&
            selectNeed.length !== 0 &&
            selectSpecialization.length !== 0
        ) {
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
        }

    }, [history, selectCountries, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

    // Create Date
    useEffect(() => {
        if (
            selectCountries.length !== 0 &&
            selectProduct.length !== 0 &&
            selectIndication.length !== 0 &&
            selectProfile.length !== 0 &&
            selectNeed.length !== 0 &&
            selectSpecialization.length !== 0 &&
            selectCreator.length !== 0
        ) {
            const createBody = {
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
                )),
                CreatorNames: selectCreator.map(item => (
                    item.label
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetCreateDateForPageListFilter', 'POST', createBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setCreateDate(data.data.map(item => (
                                        {
                                            value: 0,
                                            label: item.createdDate,
                                        }
                                    )))
                                    setSelectCreateDate(data.data.map(item => (
                                        {
                                            value: 0,
                                            label: item.createdDate,
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
        }

    }, [history, selectCountries, selectCreator, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])


    // Status
    useEffect(() => {
        if (
            selectCountries.length !== 0 &&
            selectProduct.length !== 0 &&
            selectIndication.length !== 0 &&
            selectProfile.length !== 0 &&
            selectNeed.length !== 0 &&
            selectSpecialization.length !== 0 &&
            selectCreator.length !== 0 &&
            selectCreateDate.length !== 0
        ) {
            const statusBody = {
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
                )),
                CreatorNames: selectCreator.map(item => (
                    item.label
                )),
                CreateDate: selectCreateDate.map(item => (
                    item.label
                ))
            }
            FetchApiPost('services/Pages/ProductPage/GetStatusForPageListFilter', 'POST', statusBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setStatus(data.data.map(item => (
                                        {
                                            value: item.isApprovedContent,
                                            label: item.approvedContent

                                        }
                                    )))
                                    setSelectStatus(data.data.map(item => (
                                        {
                                            value: item.isApprovedContent,
                                            label: item.approvedContent
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
        }

    }, [history, selectCountries, selectCreateDate, selectCreator, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

    return (
        <div>
            {
                isFilter &&
                <Row className='page-filters  mt-2 mb-2'>
                    <Col xs={8} sm={9} md={10} className='d-flex flex-wrap multi-select-auto' >
                        {
                            filters.map((data, key) => {
                                return (
<>
{
    data.placeHolder !== 'Create Date' && (
        <MultiSelectReact
        key={key}
        options={data.options}
        change={(e) => data.change(data.placeHolder,e)}
        value={data.value}
        placeholder={data.placeHolder}
    />
    )
}

{
                                    data.placeHolder === 'Create Date' && (
                                        <RangePicker
                                            style={{
                                                borderRadius: '15px',
                                                maxWidth: '13.5rem',
                                                width: '100%',
                                                height: '26px',
                                                margin: '0 8px 26px 0',
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
                                    )
                                }
</>
                                   

                                )
                            })
                        }
                    </Col>

                    <Col xs={4} sm={3} md={2} className='buttons'>
                        <button onClick={applyPageFilter}>
                        <Icon path={mdiCheck}
                            size={1}
                            color={'#0ACF97'}
                            
                        />
                        </button>

                        <button onClick={clearFilter}>
                        <Icon path={mdiDeleteSweepOutline}
                            size={1}
                            color={'#FA5C7C'}
                            
                        />
                        </button>

                        <button  onClick={()=>setIsFilter(false)}>
                        <Icon path={mdiClose}
                            size={1}
                            color={'#6C757D'}
                           
                        />
                        </button>
                        

                        

                       
                    </Col>
                </Row>
            }
            <CreatePageForNeedModal showModal={showModal} setShowModal={setShowModal} />
            {/* <PageGalleryTemplates /> */}
        </div>
    )
}

export default PageGalleryFilter