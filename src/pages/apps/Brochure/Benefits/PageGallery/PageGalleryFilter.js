import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import PageGalleryTemplates from './PageGalleryTemplates';
import CreatePageForNeedModal from './CreatePageForNeedModal';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { MultiSelectReact } from '../../../../forms/Basic';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const PageGalleryFilter = ({ showModal, setShowModal, isFilter, setIsFilter,templates,setTemplates }) => {


    const history = useHistory();
    const { t } = useTranslation();
    const { RangePicker } = DatePicker;
    // // Countries
    // const [countries, setCountries] = useState([])
    // const [selectCountries, setSelectCountries] = useState([]);

    // // Product
    // const [product, setProduct] = useState([]);
    // const [selectProduct, setSelectProduct] = useState([]);

    // // Indication
    // const [indication, setIndication] = useState([]);
    // const [selectIndication, setSelectIndication] = useState([]);

    // // Profile
    // const [profile, setProfile] = useState([]);
    // const [selectProfile, setSelectProfile] = useState([]);
    
    // // Need
    // const [need, setNeed] = useState([]);
    // const [selectNeed, setSelectNeed] = useState([]);

    // // Specialization
    // const [specialization, setSpecialization] = useState([]);
    // const [selectSpecialization, setSelectSpecialization] = useState([]);

    // // Creator
    // const [creator, setCreator] = useState([]);
    // const [selectCreator, setSelectCreator] = useState([]);

    // // Create Date
    // const [createDate, setCreateDate] = useState([]);
    // const [selectCreateDate, setSelectCreateDate] = useState([]);

    // //Status
    // const [status, setStatus] = useState([]);
    // const [selectStatus, setSelectStatus] = useState([]);

    const [selectCountries, setSelectCountries] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);
    const [selectIndication, setSelectIndication] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState([]);
    const [selectCreator, setSelectCreator] = useState([]);
    const [optionsCountries, setOptionsCountries] = useState([]);
    const [optionsProduct, setOptionsProduct] = useState([]);
    const [optionsIndication, setOptionsIndication] = useState([]);
    const [optionsProfile, setOptionsProfile] = useState([]);
    const [optionsSpecialization, setOptionsSpecialization] = useState([]);
    const [optionsCreator, setOptionsCreator] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);

    //Status
    const [status, setStatus] = useState([]);
    const [selectStatus, setSelectStatus] = useState([]);

    const changeSelect = (name, e) => {
        switch (name) {
            case 'Countries':
                return (
                    setSelectCountries(e),

                    setSelectProduct([]),
                
                    setSelectIndication([]),
                    setOptionsIndication([]),

                    setSelectProfile([]),
                    setOptionsProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])

                )
            case 'Product':
                return (
                    setSelectProduct(e),

                    setSelectIndication([]),
                    setOptionsIndication([]),

                    setSelectProfile([]),
                    setOptionsProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Indication':
                return (
                    setSelectIndication(e),

                    setSelectProfile([]),
                    setOptionsProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Profile':
                return (
                    setSelectProfile(e),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Need':
                return (
                    setSelectNeed(e),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Specialization':
                return (
                    setSelectSpecialization(e),

                    setSelectCreator([]),
                    setOptionsCreator([]),

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
            options: optionsCountries,
            value: selectCountries,
            change: changeSelect,
            placeHolder: 'Countries'
        },
        {
            options: optionsProduct,
            value: selectProduct,
            change: changeSelect,
            placeHolder: 'Product'
        },
        {
            options: optionsIndication,
            value: selectIndication,
            change: changeSelect,
            placeHolder: 'Indication'
        },
        {
            options: optionsProfile,
            value: selectProfile,
            change: changeSelect,
            placeHolder: 'Profile'
        },
        {
            options: need,
            value: selectNeed,
            change: changeSelect,
            placeHolder: 'Need'
        },
        {
            options: optionsSpecialization,
            value: selectSpecialization,
            change: changeSelect,
            placeHolder: 'Specialization'
        },
        { 

            options: optionsCreator,
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


    const applyFilter = () => {
        console.log('apply filter da');
        const body = {
            products: selectProduct.map(data => data.value),
            indications: selectIndication.map(data => data.value),
            profiles: selectProfile.map(data => data.value),
            needs: selectNeed.map(data => data.value),
            specs: selectSpecialization.map(data => data.value),
            creatorNames:selectCreator.map(data => data.label),
            startDate: startDate.length === 0 ? '1999-01-01T00:00:00.000Z' : startDate,
            endDate: endDate.length === 0 ? '1999-01-01T00:00:00.000Z' : endDate,
            status: selectStatus.map(data => data.value),
        }
        const applyCondition = [
            selectProduct.length === 0,
            selectIndication.length === 0,
            selectProfile.length === 0,
            selectNeed.length === 0 ,
            selectSpecialization.length === 0,
            selectStatus.length === 0,
        ];
        if (applyCondition.every((v) => v === false)) {
            
            FetchApiPost('services/Pages/Benefit/ApplyForBenefitPageListFilter', 'POST', body)
                .then((res) => {
                    if (res.status === 200) {
                        setTemplates([]);
                        res.json().then((json) => 
                        json.data.map(data => (
                            console.log(data),
                            data.pageId !== 0 &&
                            setTemplates(prev=>[...prev,
                                {
                                    id              : data.contentId,
                                    detailsId       : data.pageId,
                                    isApproved      : data.isApprovedContent,
                                    name            : data.name,
                                    cornerText      : 
                                    data.isApprovedContent === 0
                                    ?  'editing'
                                    :data.isApprovedContent === 1
                                    ?   'send to approval'
                                    :data.isApprovedContent === 2
                                    ?   'approved'
                                    :data.isApprovedContent === 3
                                    ?   'reject'
                                    :data.isApprovedContent === 4
                                    ?   'archive'
                                    :null
                                    ,
                                    cornerColor     : 
                                    data.isApprovedContent === 0
                                    ?  '#e5e5e5'
                                    :data.isApprovedContent === 1
                                    ?   'rgb(255, 255, 136)'
                                    :data.isApprovedContent === 2
                                    ?   'green'
                                    :data.isApprovedContent === 3
                                    ?   'red'
                                    :data.isApprovedContent === 4
                                    ?   'rgb(77, 28, 28)'
                                    :null
                                    ,
                                    title           : 'Brochure',
                                    src             : data.imageFile
                                }
                            ])
                        ))
                       );
                    } else if (res.status === 500 || res.status === 502) {
                        history.push('/error-500');
                    } else {
                        // setBrochuries([]);
                    }
                })
                .catch((error) => console.log('Error', error));
        }
    };

    const clearFilter = () => {
       
        setSelectCountries([]);

        setOptionsProduct([]);
        setSelectProduct([]);

        setOptionsIndication([]);
        setSelectIndication([]);

        setOptionsProfile([]);
        setSelectProfile([]);

        setNeed([]);
        setSelectNeed([]);

        setOptionsSpecialization([]);
        setSelectSpecialization([]);

        setOptionsCreator([]);
        setSelectCreator([]);

        setStartDate([]);
        setEndDate([]);

        setStatus([]);
        setSelectStatus([]);
    }

    // Countries
    useEffect(() => {
        FetchApiGet('services/Pages/ProductPage/GetAllCountriesForPageListFilter','GET')
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setOptionsCountries(data.data.map(data => (
                                              {
                                                  value: data.countryId,
                                                  label: data.countryName,
                                              }
                                          ))),
  
                                          setSelectCountries(data.data.map(data => (
                                              {
                                                  value: data.countryId,
                                                  label: data.countryName,
                                              }
                                          )))
                                      )
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
        // FetchApiGet('services/Pages/Benefit/GetProductsForBenefitFilter','GET')
        // .then((res) =>
        //               (async () => {
        //                   try {
        //                       if (res.status === 200) {
        //                           res.json().then(data => {
        //                               return (
        //                                   setOptionsProduct(data.data.map(data => (
        //                                       {
        //                                           value: data.productId,
        //                                           label: data.productName,
        //                                       }
        //                                   ))),
        //                                   setSelectProduct(data.data.map(data => (
        //                                     {
        //                                         value: data.productId,
        //                                         label: data.productName,
        //                                     }
        //                                 )))
        //                               )
        //                           })
  
        //                       }
        //                       else if (res.status === 500) {
        //                           history.push('/error-500');
        //                       }
  
        //                   } catch (error) {
        //                       console.log('error', error);
        //                   }
        //               })()
        //           )
      }, [history])
    
      // Indication
      useEffect(() => {
        if(selectProduct.length !== 0) {
            const indicationBody = {
                ProductIds  :   selectProduct.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetIndicationsForBenefitFilter','POST',indicationBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setOptionsIndication(data.data.map(data => (
                                              {
                                                  value: data.indicationId,
                                                  label: data.indicationName,
                                              }
                                          ))),
                                          setSelectIndication(data.data.map(data => (
                                            {
                                                value: data.indicationId,
                                                label: data.indicationName,
                                            }
                                        )))
                                      )
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
      }, [history, selectProduct])

      // Profile
      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0) {
            const profileBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetProfilesForBenefitFilter','POST',profileBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setOptionsProfile(data.data.map(item => (
                                              {
                                                  value: item.profileId,
                                                  label: item.profileName,
                                              }
                                          ))),
                                          setSelectProfile(data.data.map(item => (
                                            {
                                                value: item.profileId,
                                                label: item.profileName,
                                            }
                                        )))
                                      )
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
      }, [history, selectIndication, selectProduct])


    // Need
    useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0) {
            const needBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetNeedsForBenefitFilter','POST',needBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setNeed(data.data.map(data => (
                                              {
                                                  value: data.needId,
                                                  label: data.needName,
                                              }
                                          ))),
                                          setSelectNeed(data.data.map(data => (
                                            {
                                                value: data.needId,
                                                label: data.needName,
                                            }
                                        )))
                                      )
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
      }, [history, selectIndication, selectProduct, selectProfile])


      // Specialization
      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0 && selectNeed.length !== 0) {
            const specBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value),
                NeedIds         :   selectNeed.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetSpecsForBenefitFilter ','POST',specBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setOptionsSpecialization(data.data.map(data => (
                                              {
                                                value       :   data.specId,
                                                label       :   data.specName,
                                                specAbb     :   data.specAbb
                                              }
                                          ))),
                                          setSelectSpecialization(data.data.map(data => (
                                            {
                                                value       :   data.specId,
                                                label       :   data.specName,
                                                specAbb     :   data.specAbb
                                            }
                                        )))
                                      )
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
      }, [history, selectIndication, selectNeed, selectProduct, selectProfile])

      // Creator
      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0 && selectNeed.length !== 0 && selectSpecialization.length !== 0) {
            const creatorBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value),
                NeedIds         :   selectNeed.map(data => data.value),
                SpecIds         :   selectSpecialization.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetCreatorForBenefitFilter','POST',creatorBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setOptionsCreator(data.data.map(data => (
                                              {
                                                value       :   data.creatorId,
                                                label       :   data.creatorName,
                                              }
                                          ))),
                                          setSelectCreator(data.data.map(data => (
                                            {
                                                value       :   data.creatorId,
                                                label       :   data.creatorName,
                                            }
                                        )))
                                      )
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
      }, [history, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

      // Status
      useEffect(() => {
        if(selectProduct.length !== 0 && 
            selectIndication.length !== 0 && 
            selectProfile.length !== 0 && 
            selectNeed.length !== 0 &&
            selectSpecialization.length !== 0
            ) {
            const statusBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value),
                NeedIds         :   selectNeed.map(data => data.value),
                SpecIds         :   selectSpecialization.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetStatusForBenefitFilter','POST',statusBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setStatus(data.data.map(data => (
                                              {
                                                  value: data.isApprovedContent,
                                                  label: data.approvedContent,
                                              }
                                          ))),
                                          setSelectStatus(data.data.map(data => (
                                            {
                                                value: data.isApprovedContent,
                                                label: data.approvedContent,
                                            }
                                        )))
                                      )
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
      }, [history, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

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
                        <button  onClick={applyFilter}>
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

                        <button onClick={()=>setIsFilter(false)} >
                        <Icon path={mdiClose}
                            size={1}
                            color={'#6C757D'}
                            
                        />
                        </button>
                       

                    </Col>
                </Row>
            }
            <CreatePageForNeedModal showModal={showModal} setShowModal={setShowModal} />
            <PageGalleryTemplates
                templates={templates}
                setTemplates={setTemplates}
            />
        </div>
    )
}

export default PageGalleryFilter