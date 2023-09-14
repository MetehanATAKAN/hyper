import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import {  useHistory } from 'react-router-dom';
import { MultipleSelects } from '../../../../components/GlobalNew/Selects';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react'
import Loading from '../../../../components/Loading';
import Edit from './Edit';
import AddPromoSubjectModal from './AddPromoSubjectModal';

const Filter = ({tableData, setTableData, isShowUpdateModal,setIsShowUpdateModal, updateBenefitData,showModal, setShowModal  }) => {


    const history = useHistory();

    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);
    const [productLoading, setProductLoading] = useState(false);

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);
    const [needLoading, setNeedLoading] = useState(false);

    // Benefit
    const [benefit, setBenefit] = useState([]);
    const [selectBenefit, setSelectBenefit] = useState([]);
    const [benefitLoading, setBenefitLoading] = useState(false);

    // Spec
    const [spec, setSpec] = useState([]);
    const [selectSpec, setSelectSpec] = useState([]);
    const [specLoading, setSpecLoading] = useState(false);

    // Org Type
    const [orgType, setOrgType] = useState([
        {
            value:1,
            label:'clinic'
        },
        {
            value:2,
            label:'hospital'
        },
    ]);
    const [selectOrgType, setSelectOrgType] = useState([
        {
            value:1,
            label:'clinic'
        },
        {
            value:2,
            label:'hospital'
        },
    ]);
    const [orgTypeLoading, setOrgTypeLoading] = useState(false);

    // Filter
    const [applyFilterLoading, setApplyFilterLoading] = useState(false);

    const filters = [
        {
            selectedItems: selectProduct,
            setSelectedItems: setSelectProduct,
            options: product,
            label: 'product'
        },
        {
            selectedItems: selectNeed,
            setSelectedItems: setSelectNeed,
            options: need,
            label: 'need'
        },
        {
            selectedItems: selectBenefit,
            setSelectedItems: setSelectBenefit,
            options: benefit,
            label: 'benefit'
        },
        {
            selectedItems: selectSpec,
            setSelectedItems: setSelectSpec,
            options: spec,
            label: 'specialization'
        },
        {
            selectedItems: selectOrgType,
            setSelectedItems: setSelectOrgType,
            options: orgType,
            label: 'organization type'
        },
    ]

    const cellStatus = () => {
        console.log('cell status de');
        console.log(tableData);
        const data = document.querySelector('.status-title');
        console.log(data);
        const parentNode = data?.parentElement;
        console.log('parent node', parentNode);
        if (parentNode) {
            parentNode.style.padding = '0';
        }
    }

    const applyFilter = async () => {
        setApplyFilterLoading(true);
        const body = {
            ProductIds : selectProduct.map(data => data.value),
            NeedIds : selectNeed.map(data => data.value),    
            BenefitIds : selectBenefit.map(data => data.value),    
            SpecIds : selectSpec.map(data => data.value),    
            OrganizationType : selectOrgType.map(data => data.value)
        }

        FetchApiPost('services/Pages/PromoSubject/ApplyPromoSubjectFilter','POST',body)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  setApplyFilterLoading(false);

                                  res.json().then(item => {
                                      setTableData(item.data.map(data => (
                                          data
                                      )))
                                  })
                                  
                                  await cellStatus();
                              }
                              else if (res.status === 409) {
                                setApplyFilterLoading(false); 
                                  history.push('/error-500');
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
        setSelectProduct([]);

        setSelectNeed([]);
        setNeed([]);

        setSelectBenefit([]);
        setBenefit([]);

        setSelectSpec([]);
        setSpec([]);

        setSelectOrgType([])
    }


    useEffect(() => {
        setProductLoading(true);
      FetchApiGet('services/Pages/Page/GetGlobalBrandList','GET')
      .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setProductLoading(false);
                          res.json().then(item => {
                                return (
                                    setProduct(item?.data?.map(data => (
                                        {
                                            value: data.globalBrandId,
                                            label: data.globalBrandName,
                                            globalBrandAbb: data.globalBrandAbb
                                        }
                                    ))),
                                    setSelectProduct(item?.data?.map(data => (
                                        {
                                            value: data.globalBrandId,
                                            label: data.globalBrandName,
                                            globalBrandAbb: data.globalBrandAbb
                                        }
                                    )))
                                )
                            })
                              
                        }
                        else if (res.status === 499) {
                            setProductLoading(false);
                            history.push('/error-500');
                        }
                        else if (res.status === 500) {
                            setProductLoading(false);
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
    }, [history])

    // Need
    useEffect(() => {
        if(selectProduct.length !== 0) {
            setNeedLoading(true);
            const body = {
                ProductIds:selectProduct.map(data => data.value)
            }

            FetchApiPost('services/Pages/PromoSubject/GetNeedsForPromoSubjectFilter','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                setNeedLoading(false);
                                res.json().then(item => {
                                      setNeed(item.data.map(data => (
                                        {
                                            value:data.needId,
                                            label:data.needName
                                        }
                                      )))

                                      setSelectNeed(item.data.map(data => (
                                        {
                                            value:data.needId,
                                            label:data.needName
                                        }
                                      )))
                                  })
                                    
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
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
      }, [history, selectProduct])

      // Benefit
    useEffect(() => {
        if(selectProduct.length !== 0 && selectNeed.length !== 0) {
            setBenefitLoading(true);
            const body = {
                ProductIds:selectProduct.map(data => data.value),
                NeedIds:selectNeed.map(data => data.value)
            }

            FetchApiPost('services/Pages/PromoSubject/GetBenefitsForPromoSubjectFilter','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                setBenefitLoading(false);
                                res.json().then(item => {
                                    setBenefit(item.data.map(data => (
                                        {
                                            value:data.benefitId,
                                            label:data.benefitName
                                        }
                                      )))

                                      setSelectBenefit(item.data.map(data => (
                                        {
                                            value:data.benefitId,
                                            label:data.benefitName
                                        }
                                      )))
                                  })
                                    
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
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
      }, [history, selectNeed, selectProduct])

      // Spec
      useEffect(() => {
        if(selectProduct.length !== 0 && selectNeed.length !== 0 && selectBenefit.length !== 0) {
            setSpecLoading(true);
            const body = {
                ProductIds:selectProduct.map(data => data.value),
                NeedIds:selectNeed.map(data => data.value),
                BenefitIds:selectBenefit.map(data => data.value)
            }

            FetchApiPost('services/Pages/PromoSubject/GetSpecializationsForPromoSubjectFilter ','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                setSpecLoading(false);
                                res.json().then(item => {
                                    setSpec(item.data.map(data => (
                                        {
                                            value:data.specId,
                                            label:data.specName
                                        }
                                      )))

                                      setSelectSpec(item.data.map(data => (
                                        {
                                            value:data.specId,
                                            label:data.specName
                                        }
                                      )))
                                  })
                                    
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
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
      }, [history, selectBenefit, selectNeed, selectProduct])

      // Filter change
      useEffect(() => {

        setSelectNeed([]);
        setSelectBenefit([]);
        setSelectSpec([]);

      }, [selectProduct])

      useEffect(() => {

        setSelectBenefit([]);
        setSelectSpec([]);

      }, [selectNeed])
      
      useEffect(() => {

        setSelectSpec([]);

      }, [selectBenefit])
    

  return (
    <>

<div style={{display:'flex',columnGap:'8px',marginBottom:'16px'}}>
          {
              filters.map(filter => (
                  <MultipleSelects
                      selectedItems={filter.selectedItems}
                      setSelectedItems={filter.setSelectedItems}
                      options={filter.options}
                      label={filter.label}
                      className="filter-radius"
                      placeholder='select...'
                      width={'20%'}
                      labelStyle={{ color: '#6c757d' }}
                      size="small"
                      status={'default'}
                  />
              ))
          }

<div className="filter-select-buttons">
                <Icon
                    className="filter-button-icons"
                    path={mdiCheck}
                    size={1}
                    color={'#0ACF97'}
                    onClick={applyFilter}
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
                />
            </div>

            {
                isShowUpdateModal &&
                <Edit
                showModal={isShowUpdateModal}
                setShowModal={setIsShowUpdateModal}
                data={updateBenefitData}
                isApplyFilter={applyFilter}
                />
            }

{
    showModal &&
    <AddPromoSubjectModal showModal={showModal} setShowModal={setShowModal} applyFilter = {applyFilter} />
}

            <div style={{display:'hidden'}}>
            <Loading loading={productLoading} />
            <Loading loading={needLoading} />
            <Loading loading={benefitLoading} />
            <Loading loading={specLoading} />
            <Loading loading={orgTypeLoading} />
            <Loading loading={applyFilterLoading} />
            </div>
    </div>


    </>

  )
}

export default Filter