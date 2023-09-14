import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects'
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper'
import { Link, useHistory } from 'react-router-dom'
import { mdiStar, mdiCropSquare, mdiCheckboxMarkedOutline,mdiEye   } from '@mdi/js';
import Icon from '@mdi/react';
import { RibbonContainer, LeftCornerRibbon } from "react-ribbons";
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import mergeImages from "merge-images";

const Pages = () => {

    const pagesData = useSelector(state => state.PromoSubject.promoSubjectPageData);
    const { t } = useTranslation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const history = useHistory();
    const [stars] = useState([1, 1, 1, 1, 1]);
    const [need, setNeed] = useState([
        {
            value: pagesData?.needResponses.needAbb,
            label: pagesData?.needResponses.need
        },
        
    ])
    const [selectNeed, setSelectNeed] = useState([
        {
            value: pagesData?.needResponses.needAbb,
            label: pagesData?.needResponses.need
        },
    ]);

    const [benefit, setBenefit] = useState(
        pagesData !== null 
        ? pagesData.benefit.map(data => (
            {
                value:data.id,
                label:data.benefitName
            }
        ))
        : []
    )
    const [selectBenefit, setSelectBenefit] = useState(
        pagesData !== null 
        ? pagesData.benefit.map(data => (
            {
                value:data.id,
                label:data.benefitName
            }
        ))
        : []
    );
    const [templates, setTemplates] = useState([]);

    const [status, setStatus] = useState([
        {
            value:1,
            label:'Useds'
        },
        {
            value:2,
            label:'Unused ones'
        },
        {
            value:3,
            label:'All'
        },
    ])
    const [selectStatus, setSelectStatus] = useState();
    const [statusErr, setStatusErr] = useState('default')

  
    const [benefitTemplates, setBenefitTemplates] = useState([]);


    // useEffect(() => {
    //     FetchApiGet('services/Pages/Page/GetAllDesignPage', 'GET')
    //         .then((res) =>
    //             (async () => {
    //                 try {
    //                     if (res.status === 200) {
    //                         res.json().then(item => {
    //                             return (
    //                                 setBenefitTemplates(item.data.map(data => (
    //                                     {
    //                                         id: data.id,
    //                                         active:false,
    //                                         isApproved: data.isApproved,
    //                                         name: data.name,
    //                                         cornerText:
    //                                             data.isApproved === 0
    //                                                 ? 'editing'
    //                                                 : data.isApproved === 1
    //                                                     ? 'send to approval'
    //                                                     : data.isApproved === 2
    //                                                         ? 'approved'
    //                                                         : data.isApproved === 3
    //                                                             ? 'reject'
    //                                                             : data.isApproved === 4
    //                                                                 ? 'archive'
    //                                                                 : null
    //                                         ,
    //                                         cornerColor:
    //                                             data.isApproved === 0
    //                                                 ? '#e5e5e5'
    //                                                 : data.isApproved === 1
    //                                                     ? 'rgb(255, 255, 136)'
    //                                                     : data.isApproved === 2
    //                                                         ? 'green'
    //                                                         : data.isApproved === 3
    //                                                             ? 'red'
    //                                                             : data.isApproved === 4
    //                                                                 ? 'rgb(77, 28, 28)'
    //                                                                 : null
    //                                         ,
    //                                         title: 'Brochure',
    //                                         src: data.imageFile
    //                                     }
    //                                 ))),
    //                                 setTemplates(item.data.map(data => (
    //                                     {
    //                                         id: data.id,
    //                                         active:false,
    //                                         isApproved: data.isApproved,
    //                                         name: data.name,
    //                                         cornerText:
    //                                             data.isApproved === 0
    //                                                 ? 'editing'
    //                                                 : data.isApproved === 1
    //                                                     ? 'send to approval'
    //                                                     : data.isApproved === 2
    //                                                         ? 'approved'
    //                                                         : data.isApproved === 3
    //                                                             ? 'reject'
    //                                                             : data.isApproved === 4
    //                                                                 ? 'archive'
    //                                                                 : null
    //                                         ,
    //                                         cornerColor:
    //                                             data.isApproved === 0
    //                                                 ? '#e5e5e5'
    //                                                 : data.isApproved === 1
    //                                                     ? 'rgb(255, 255, 136)'
    //                                                     : data.isApproved === 2
    //                                                         ? 'green'
    //                                                         : data.isApproved === 3
    //                                                             ? 'red'
    //                                                             : data.isApproved === 4
    //                                                                 ? 'rgb(77, 28, 28)'
    //                                                                 : null
    //                                         ,
    //                                         title: 'Brochure',
    //                                         src: data.imageFile
    //                                     }
    //                                 )))
    //                             )
    //                         })
    //                     }
    //                     else if (res.status === 409) {
    //                         history.push('/error-500');
    //                     }
    //                     else if (res.status === 500) {
    //                         history.push('/error-500');
    //                     }
    //                     else {
    //                         console.log('hata');
    //                     }

    //                 } catch (error) {
    //                     console.log('error', error);
    //                 }
    //             })()
    //         )
    // }, [history])

    const handleClickTemplate = (id) => {
    
        const newState = templates?.map(obj => {
            if (obj.id === id) {
              return {...obj, active: !obj.active};
            }
      
            return obj;
          });
      
          setTemplates(newState);
    }

    const handleClickBenefit = (id) => {
        const newState = benefitTemplates?.map(obj => {
            if (obj.id === id) {
              return {...obj, active: !obj.active};
            }
      
            return obj;
          });
      
          setBenefitTemplates(newState);
    }

    const [images, setImages] = useState(null);
    const [previewTemplate, setPreviewTemplate] = useState(null);

   
    const previewPage = () => {
        setShow(true);
        let addTemplates = [];
        templates.map(data => addTemplates.push(data));
        benefitTemplates.map(data => addTemplates.push(data));
        setImages(addTemplates);
    }

    const save = () => {

        let addTemplates=[] ;

        templates.map(data => addTemplates.push(data));
        benefitTemplates.map(data => addTemplates.push(data));

      
        const body = {
            promoSubjectId: pagesData?.id,
            page:addTemplates.map(data => (
                {
                    passportOfProduct:data.name === 'need' ? 0 : 1,
                    contentId:data.contentId
                }
            ))
        }

        FetchApiPost('services/Pages/PromoSubject/CreatePromoSubjectPage','POST',body)
        .then((res) =>
                            (async () => {
                                try {
                                    if (res.status === 201) {
                                        res.json().then(item => {
                                            
                                        })
                                    }
                                    else if (res.status === 409) {
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

    useEffect(() => {
        if(pagesData !== null) {
            FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectNeedPageById?needId=${pagesData?.needResponses.needId}`,'GET')
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(item => {
                                    setTemplates(item?.data?.map(data =>(
                                        {
                                            active : false,
                                            id:data.pageId,
                                            src:data.imageFile,
                                            title:data.name,
                                            name:'need',
                                            contentId:data.contentId
                                        }
                                    )))
                                  })
                              }
                              else if (res.status === 409) {
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

                  const body = {
                    benefitIds:pagesData?.benefit.map(data => data.id)
                  }

                  FetchApiPost('services/Pages/PromoSubject/GetPromoSubjectBenefitPageById','POST',body)
                  .then((res) =>
                            (async () => {
                                try {
                                    if (res.status === 200) {
                                        res.json().then(item => {
                                            setBenefitTemplates(item?.data?.map(data =>(
                                                {
                                                    active : false,
                                                    id:data.pageId,
                                                    src:data.imageFile,
                                                    title:data.name,
                                                    name:'benefit',
                                                    contentId:data.contentId
                                                }
                                            )))
                                        })
                                    }
                                    else if (res.status === 409) {
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
    }, [history, pagesData])

    const [orgTypeName, setorgTypeName] = useState('');
    const [headerName, setHeaderName] = useState('');

    useEffect(() => {
        const name = pagesData?.organizationType.map(data =>(
            data === 1 ? 'Clinic' : 'Hospital'
        ))
        let orgType='';
        name?.map(data => (
            orgType+=`${data},`
        ))

        setorgTypeName(orgType);
    }, [pagesData?.organizationType])

    useEffect(() => {

        let headerName = `${pagesData?.indicationName},${pagesData?.profileName},`;
       pagesData?.specializations.map(data =>(
        headerName+=`${data.specAbb},`
       ))

       setHeaderName(headerName)
    }, [pagesData?.indicationName, pagesData?.profileName, pagesData?.specializations])
    
    
    useEffect(() => {
        if(selectStatus) {

            if(selectStatus.value === 1) {
                FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectUsedPageById?promoSubjectId=${pagesData?.id}`,'GET')
                .then((res) =>
                            (async () => {
                                try {
                                    if (res.status === 200) {
                                        res.json().then(item => {
                                            
                                        })
                                    }
                                    else if (res.status === 409) {
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
            else if(selectStatus.value === 2) {
                const body = {
                    promoSubjectId: pagesData.id,
                    needId: pagesData.needResponses.needId,
                    benefitIds: pagesData.benefit?.map(data => (
                        data.id
                    )),
                }
                FetchApiPost(`services/Pages/PromoSubject/GetPromoSubjectUnusedPageById`,'POST',body)
                .then((res) =>
                            (async () => {
                                try {
                                    if (res.status === 200) {
                                        res.json().then(item => {
                                            
                                        })
                                    }
                                    else if (res.status === 409) {
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

            else {
                const body = {
                    needId: pagesData.needResponses.needId,
                    benefitIds: pagesData.benefit?.map(data => (
                        data.id
                    )),
                }
                FetchApiPost(`services/Pages/PromoSubject/GetPromoSubjectAllPageById`,'POST',body)
                .then((res) =>
                            (async () => {
                                try {
                                    if (res.status === 200) {
                                        res.json().then(item => {
                                            
                                        })
                                    }
                                    else if (res.status === 409) {
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
        }
    }, [history, pagesData, selectStatus])

    useEffect(() => {
        mergeImages(
            images?.map(data => (
                data.src
            ))
        )
          .then(b64 => document.querySelector('.metehan-image').src = b64)
          .catch((err) => console.log(err));
      }, [images]);

    
    return (
        <div className='promo-subject-pages'>
            <Row className='header'>
                <Col className='col' sm={6}>
                    <div className='d-flex flex-column header-left'>
                    <span> {orgTypeName} </span>
                    <span> {headerName} </span>
                    </div>
                </Col>

                <Col className='col status' sm={4}>
                <SingleSelects
                                options={status}
                                selectedItems={selectStatus}
                                setSelectedItems={setSelectStatus}
                                placeholder='select...'
                                label='status'
                                status={statusErr}
                                width={'38%'}
                            />
                </Col>

                <Col  sm={2} className='header-right col'>
                    <div className='header-right-elements text-end'>
                        <span>
                            <Icon
                                path={mdiEye}
                                size={0.7}
                                color='#7A7A7A'
                                onClick={previewPage}
                            />
                        </span>
                        <button onClick={save} >{t('save')}</button>
                    </div>
                </Col>
            </Row>

            <Row className='pages'>
                <Col className='pages-need brochure-templates'>
                    <div className='pages-header'>
                        <div className='pages-header-need'>
                            <MultipleSelects
                                options={need}
                                selectedItems={selectNeed}
                                setSelectedItems={setSelectNeed}
                                placeholder='select...'
                                isStar={true}
                                label='need'
                                width={'100%'}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className='pages-datas'>
                        {
                            templates?.map((img, i) => (
                                <>
                                    <div className={img.active === false ? 'border-datas' : 'border-datas active'} key={i} onClick={() => handleClickTemplate(img.id)} >
                                        <div className='check text-center'>
                                            <Icon
                                            path={img.active === false ? mdiCropSquare : mdiCheckboxMarkedOutline }
                                            size={0.7}
                                            color={img.active === false ? '#EBEBEB' : '#0ACF97'}
                                            />
                                        </div>
                                        <RibbonContainer
                                            className={
                                                `imgContainer`
                                            }
                                            style={{ maxHeight: "300px" }}
                                        >
                                            <Link to={`/apps/brochure/template/design/${img.id}`}>
                                                <img src={img.src} alt={img.title} />
                                            </Link>
                                            <div className='template-card-hover' >
                                                <div className='template-card-hover-item-main'>
                                                    <div className='items'>
                                                        <div className='stars'>
                                                            {
                                                                stars.map(star => (
                                                                    <Icon path={mdiStar}
                                                                        title="Start"
                                                                        size={0.7}
                                                                        color="#969696"
                                                                    />
                                                                ))
                                                            }
                                                        </div>
                                                        <span className='template-name' > {img.name} </span>


                                                        <Link
                                                            to={{
                                                                pathname: `/apps/brochure/template/details`,
                                                                search: `?id=${img.id}&name=templates`,
                                                                hash: "#the-hash",
                                                                state: { Details: true }
                                                            }}
                                                        >
                                                            <Button className='btn-primary' style={{ fontSize: '11px' }}>use this template</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </RibbonContainer>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </Col>

                <Col className='pages-need brochure-templates'>
                    <div className='pages-header'>
                        <div className='pages-header-need'>
                            <MultipleSelects
                                options={benefit}
                                selectedItems={selectBenefit}
                                setSelectedItems={setSelectBenefit}
                                placeholder='select...'
                                isStar={true}
                                label='benefits'
                                width={'100%'}
                            />
                        </div>
                    </div>

                    <div className='pages-datas'>
                    {
                            benefitTemplates?.map((img, i) => (
                                <>
                                    <div className={img.active === false ? 'border-datas' : 'border-datas active'} key={i} onClick={() => handleClickBenefit(img.id)} >
                                        <div className='check text-center'>
                                            <Icon
                                            path={img.active === false ? mdiCropSquare : mdiCheckboxMarkedOutline }
                                            size={0.7}
                                            color={img.active === false ? '#EBEBEB' : '#0ACF97'}
                                            />
                                        </div>
                                        <RibbonContainer
                                            className={
                                                `imgContainer`
                                            }
                                            style={{ maxHeight: "300px" }}
                                        >
                                            <Link to={`/apps/brochure/template/design/${img.id}`}>
                                                <img src={img.src} alt={img.title} />
                                            </Link>
                                            <div className='template-card-hover' >
                                                <div className='template-card-hover-item-main'>
                                                    <div className='items'>
                                                        <div className='stars'>
                                                            {
                                                                stars.map(star => (
                                                                    <Icon path={mdiStar}
                                                                        title="Start"
                                                                        size={0.7}
                                                                        color="#969696"
                                                                    />
                                                                ))
                                                            }
                                                        </div>
                                                        <span className='template-name' > {img.name} </span>


                                                        <Link
                                                            to={{
                                                                pathname: `/apps/brochure/template/details`,
                                                                search: `?id=${img.id}&name=templates`,
                                                                hash: "#the-hash",
                                                                state: { Details: true }
                                                            }}
                                                        >
                                                            <Button className='btn-primary' style={{ fontSize: '11px' }}>use this template</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </RibbonContainer>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </Col>
            </Row>


            {/* <div>
                {
                    images?.map(data => (
                        <img src={data.src} alt={data.name} />
                    ))
                }
            </div> */}

            {
                show &&
                <Modal show={show} onHide={handleClose} size='xl' >
                <Modal.Body>
                    <div className='text-center' style={{maxHeight:'550px',overflow:'auto'}}>
                        {
                            images?.map(data => (
                                <img src={data.src} alt={data.name} />
                            ))
                        }
                    </div>
                </Modal.Body>
                </Modal>
            }

        </div>
    )
}

export default Pages