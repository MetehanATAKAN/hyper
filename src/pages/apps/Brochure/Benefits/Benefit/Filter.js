import React, { useEffect, useState } from 'react';
import { MultiSelectReact } from '../../../../forms/Basic';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { Col, Row } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { useDispatch } from 'react-redux';
import { filterFunct } from '../../../../../redux/actions';

const Filter = ({
    setTableData, 
    isFilter, 
    setIsFilters
}) => {

    const history = useHistory();
    const dispatch = useDispatch();

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

     //Status
    const [status, setStatus] = useState([
        {
            value:1,
            label:'Editable'
        },
        {
            value:2,
            label:'Send to approval'
        },
        {
            value:3,
            label:'Approve'
        },
        {
            value:4,
            label:'Reject'
        },
    ]);
    const [selectStatus, setSelectStatus] = useState([
        {
            value:1,
            label:'Editable'
        },
        {
            value:2,
            label:'Send to approval'
        },
        {
            value:3,
            label:'Approve'
        },
        {
            value:4,
            label:'Reject'
        },
    ]);

    // Link
    const [link, setLink] = useState([
        {
            value:0,
            label:'NotConnect'
        },
        {
            value:1,
            label:'Connect'
        }
    ])
    const [selectLink, setSelectLink] = useState([
        {
            value:0,
            label:'NotConnect'
        },
        {
            value:1,
            label:'Connect'
        }
    ]);

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
            options: specialization,
            value: selectSpecialization,
            change: setSelectSpecialization,
            placeHolder: 'Specialization'
        },
        {
            options: need,
            value: selectNeed,
            change: setSelectNeed,
            placeHolder: 'Need'
        },
        {
            options: status,
            value: selectStatus,
            change: setSelectStatus,
            placeHolder: 'Status'
        },
        {
            options: link,
            value: selectLink,
            change: setSelectLink,
            placeHolder: 'Link'
        },
    ]

    const filterChange = (value,label,name) => {
        
        switch (name) {
            case 'Product':
                return(
                    setSelectIndication([]),
                    setIndication([]),

                    setSelectProfile([]),
                    setProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setSpecialization([])
                )
                case 'Indication':
                return(
                    setSelectProfile([]),
                    setProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setSpecialization([])
                )
                case 'Profile':
                return(
                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setSpecialization([])
                )
                case 'Need':
                return(
                    setSelectSpecialization([]),
                    setSpecialization([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            default:
                break;
        }
    }

    const clearFilter = () => {
        setSelectCountries([]);

        setSelectProduct([]);
        
        setIndication([]);
        setSelectIndication([]);

        setSelectProfile([]);
        setProfile([]);

        setSelectNeed([]);
        setNeed([]);

        setSelectSpecialization([]);
        setSpecialization([]);

        setSelectStatus([]);
        setSelectLink([]);
    }

    const applyBenefit = () => {

        const benefitBody = {
            countryIds  : selectCountries?.map(data => data.value),
            productIds: selectProduct?.map(data => data.value),
            indicationIds: selectIndication?.map(data => data.value),
            profileIds: selectProfile?.map(data => data.value),
            needIds: selectNeed?.map(data => data.value),
            specIds: selectSpecialization?.map(data => data.value),
            statusIds: selectStatus?.map(data => data.value),
            link : selectLink?.map(data => data.value)
        }

        FetchApiPost('services/Pages/Benefit/ApplyForBenefitFilter','POST',benefitBody)
        .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    console.log(data);
                                    setIsFilters(false);
                                    setTableData(data.data)
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

    // Countries
    useEffect(() => {
      FetchApiGet('api/OldSystem/GetCountries','GET')
      .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (
                                        setCountries(data.map(data => (
                                            {
                                                value: data.CountryId,
                                                label: data.CountryName,
                                                CountryAbb:data.CountryAbb
                                            }
                                        ))),

                                        setSelectCountries(data.map(data => (
                                            {
                                                value: data.CountryId,
                                                label: data.CountryName,
                                                CountryAbb:data.CountryAbb
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
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
        FetchApiGet('api/OldSystem/GetAllGlobalBrands','GET')
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setProduct(data.map(data => (
                                              {
                                                  value: data.GlobalBrandId,
                                                  label: data.GlobalBrandName,
                                                  brandAbb:data.GlobalBrandAbb
                                              }
                                          ))),
                                          setSelectProduct(data.map(data => (
                                            {
                                                value: data.GlobalBrandId,
                                                label: data.GlobalBrandName,
                                                brandAbb:data.GlobalBrandAbb
                                            }
                                        )))
                                      )
                                  })
  
                              }
                              else if (res.status === 500 || res.status === 499) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
      }, [history])

      // Indication
      useEffect(() => {
        if(selectProduct.length !== 0) {
            const indicationBody = {
                brandIds  :   String(selectProduct.map(data => data.value))
            }

            FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds','POST',indicationBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setIndication(data.map(data => (
                                              {
                                                  value: data.IndicationId,
                                                  label: data.Indication,
                                              }
                                          ))),
                                          setSelectIndication(data.map(data => (
                                            {
                                                value: data.IndicationId,
                                                label: data.Indication,
                                            }
                                        )))
                                      )
                                  })
  
                              }
                              else if (res.status === 500 || res.status === 499) {
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
                brandIds        :   String(selectProduct.map(data => data.value)),
                indicationIds   :   String(selectIndication.map(data => data.value))
            }
            FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId','POST',profileBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                    
                                      return (
                                          setProfile(data.map(item => (
                                              {
                                                  value: item.ProfileId,
                                                  label: item.Profile,
                                              }
                                          ))),
                                          setSelectProfile(data.map(item => (
                                            {
                                                value: item.ProfileId,
                                                label: item.Profile,
                                            }
                                        )))
                                      )
                                  })
  
                              }
                              else if (res.status === 500 || res.status === 499) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [history, selectIndication, selectProduct])

      
      // Specialization
      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0) {
            const specBody = {
                brandIds        :   String(selectProduct.map(data => data.value)),
                indicationIds   :   String(selectIndication.map(data => data.value)),
                profileIds      :   String(selectProfile.map(data => data.value)),
            }
            FetchApiPost('api/OldSystem/GetSpecsForContent','POST',specBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setSpecialization(data.map(data => (
                                              {
                                                value       :   data.SpecId,
                                                label       :   data.SpecName,
                                                specAbb     :   data.SpecAbb
                                              }
                                          ))),
                                          setSelectSpecialization(data.map(data => (
                                            {
                                                value       :   data.SpecId,
                                                label       :   data.SpecName,
                                                specAbb     :   data.SpecAbb
                                            }
                                        )))
                                      )
                                  })
  
                              }
                              else if (res.status === 500 || res.status === 499) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [history, selectIndication, selectProduct, selectProfile])

      // Need

      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0 && selectSpecialization.length !== 0) {
            const specBody = {
                productIds      :   selectProduct.map(data => data.value),
                indicationIds   :   selectIndication.map(data => data.value),
                profileIds      :   selectProfile.map(data => data.value),
                specIds         :   selectSpecialization.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetNeedsForBenefitFilter','POST',specBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                    setNeed(data.data.map(data => (
                                        {
                                          value       :   data.needId,
                                          label       :   data.needName,
                                          needAbb     :   data.needAbb
                                        }
                                    )))
                                    setSelectNeed(data.data.map(data => (
                                      {
                                          value       :   data.needId,
                                          label       :   data.needName,
                                          needAbb     :   data.needAbb
                                      }
                                  )))
                                  })
  
                              }
                              else if (res.status === 500 || res.status === 499) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }

      }, [history, selectIndication, selectProduct, selectProfile, selectSpecialization])

      
useEffect(() => {
  dispatch(filterFunct({
            countryIds  : selectCountries?.map(data => data.value),
            productIds: selectProduct?.map(data => data.value),
            indicationIds: selectIndication?.map(data => data.value),
            profileIds: selectProfile?.map(data => data.value),
            needIds: selectNeed?.map(data => data.value),
            specIds: selectSpecialization?.map(data => data.value),
            statusIds: selectStatus?.map(data => data.value),
            link : selectLink?.map(data => data.value)
        }))
}, [dispatch, selectCountries, selectIndication, selectLink, selectNeed, selectProduct, selectProfile, selectSpecialization, selectStatus])

  return (
    <>

          <div style={{ display: 'flex', columnGap: '8px', marginBottom: '16px' }}>
              {
                  filters.map(filter => (
                      <MultipleSelects
                          selectedItems={filter.value}
                          setSelectedItems={filter.change}
                          options={filter.options}
                          label={filter.placeHolder}
                          className="filter-radius"
                          placeholder='select...'
                          width={'20%'}
                          labelStyle={{ color: '#6c757d' }}
                          size="small"
                          status={'default'}
                          handleChange={filterChange}
                          headerName={filter.placeHolder}
                          allSelect={()=>filterChange(filter.value,filter.value,filter.placeHolder)}
                          allClear={()=>filterChange(filter.value,filter.value,filter.placeHolder)}
                      />
                  ))
              }

              <div className="filter-select-buttons">
                  <Icon
                      className="filter-button-icons"
                      path={mdiCheck}
                      size={1}
                      color={'#0ACF97'}
                      onClick={applyBenefit}
                  />
                  <Icon
                      path={mdiDeleteSweepOutline}
                      className="filter-button-icons"
                      size={1}
                      color={'#FA5C7C'}
                      onClick={clearFilter}
                  />
                  <Icon
                      path={mdiClose}
                      size={1}
                      color={'#6C757D'}
                      className="filter-button-icons"
                      onClick={()=>setIsFilters(false)}
                  />
              </div>
          </div>
    {/* <Row className='page-filters  mt-2 mb-2'>

        <Col xs={8} sm={9} md={10} className='d-flex flex-wrap multi-select-auto'>
        {
                        filters.map((data, key) => {
                            return (

                                <MultiSelectReact
                                    key={key}
                                    options={data.options}
                                    change={(e)=>data.change(e)}
                                    value={data.value}
                                    placeholder={data.placeHolder}
                                />

                            )
                        })
                    }
        </Col>

        <Col xs={4} sm={3} md={2} className='buttons'>
            <button onClick={applyBenefit}>
            <Icon path={mdiCheck}
                        size={1}
                        color={'#0ACF97'}
                        
                    />
            </button>

            <button>
            <Icon path={mdiDeleteSweepOutline}
                        size={1}
                        color={'#FA5C7C'}
                    />
            </button>

            <button>
            <Icon path={mdiClose}
                        size={1}
                        color={'#6C757D'}
                    />
            </button>
                   
        </Col>
    </Row> */}
    </>
  )
}

export default Filter