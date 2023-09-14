import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

import { Badge, IconButton } from '@mui/material';
import { styled } from '@material-ui/styles';
import Dropdowns from '../../../../../components/Dropdowns';
import Masonry from 'react-masonry-component';
import { BrandTemplateCardLeft, BrandTemplateCardRight } from './BrandTemplateCard';
import '../../../../../assets/scss/custom/visitContent/templatesCards.scss';
import EmptyMasterTemplate from './EmptyMasterTemplate';
import BreadCrumb from '../../../../../components/BreadCrumb';
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import Icon from '@mdi/react';
import { mdiCheckboxMarked } from '@mdi/js';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ConnectTemplates = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const { promoSubjectId, pageName, profileId, needId, benefitId, isSub, connectPageId } = useParams();

    const [loader, setLoader] = useState(false);
    const [templates, setTemplates] = useState([]);

    const [promoSubjectTemplates, setPromoSubjectTemplates] = useState();
    // profile need benefit satır id si lazım
    // promo suject id lazım
    // template adı lazım / profile need benefit what ca be vs.

    const [breadCrumbProps, setBreadCrumbProps] = useState([
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Passport of Product', url: '/passport-of-products' },
        { label: 'Promo Subject', url: '/apps/visit-content?tab=Promo Subject' },
        { label: 'Page', url: null },
    ]);

    const [apiControl, setApiControl] = useState({ profile: false, need: false, benefit: false });

    const [allTemplates, setAllTemplates] = useState();
  //   useEffect(() => {
  //     FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectById?id=${promoSubjectId}`, 'GET').then((res) => {
  //         if (res.status === 200) {
  //             res.json().then(({ data }) => {
  //                 setAllTemplates(data);
  //             });
  //         }
  //     });
  // }, []);

    useEffect(() => {
        setLoader(true);
        if(pageName === 'Profile'){
          FetchApiGet(`services/Pages/Profile/GetProfilePageById?id=${profileId}`, 'GET').then((res) => {
            res.json().then((res) => {
                setTemplates((prev) => [...prev, ...res.data.map((item) => ({ ...item, isClicked: false }))]);
                setApiControl((prev) => ({ ...prev, profile: true }));
            });
        });
        }
        if(pageName === 'Need'){
          FetchApiGet(`services/Pages/Need/GetNeedPageById?id=${needId}`, 'GET').then((res) => {
            res.json().then((res) => {
                setTemplates((prev) => [...prev, ...res.data.map((item) => ({ ...item, isClicked: false }))]);
                setApiControl((prev) => ({ ...prev, need: true }));
            });
        });
        }

        if(pageName === 'Benefit'){
          FetchApiGet(`services/Pages/Benefit/GetBenefitPageById?id=${benefitId}`, 'GET').then((res) => {
            res.json().then((res) => {
                setTemplates((prev) => [...prev, ...res.data.map((item) => ({ ...item, isClicked: false }))]);
                setApiControl((prev) => ({ ...prev, benefit: true }));
            });
        });
        }

        
    }, [history]);

    useEffect(() => {
        FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectById?id=${promoSubjectId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setPromoSubjectTemplates(data);
                });
            }
        });
    }, [history]);


    const [templateApiControl, setTemplateApiControl] = useState(false)
    useEffect(() => {
      if(templates.length > 0 && promoSubjectTemplates && !templateApiControl){
        let hasPageIds = []
        
          if(pageName === 'Profile' && promoSubjectTemplates.profile.productPages.length > 0){
            promoSubjectTemplates.profile.productPages.map(i => {
              hasPageIds.push(i.id)
            })
            let newTemplates = templates.map(temp => {
                if(hasPageIds.includes(temp.id)){
                  return {
                    ...temp,
                    isClicked: true
                  }
                }else{
                  return temp
                }
            })
            setTemplates(newTemplates)
          }else if(pageName === 'Need' && promoSubjectTemplates.need.productPages.length > 0){
            promoSubjectTemplates.need.productPages.map(i => {
              hasPageIds.push(i.id)
            })
            let newTemplates = templates.map(temp => {
                if(hasPageIds.includes(temp.id)){
                  return {
                    ...temp,
                    isClicked: true
                  }
                }else{
                  return temp
                }
            })
            setTemplates(newTemplates)
          }else if(pageName === 'Benefit'){
            let benefitsControl = false;
            promoSubjectTemplates.benefits.map(b => {
              if(b.productPages.length){
                benefitsControl=true
              }
            })
            if(benefitsControl){
              promoSubjectTemplates.benefits.map(b => {
                if(b.productPages.length > 0){
                  b.productPages.map(p => {
                    hasPageIds.push(p.id)
                  })
                }
              })
              let newTemplates = templates.map(temp => {
                  if(hasPageIds.includes(temp.id)){
                    return {
                      ...temp,
                      isClicked: true
                    }
                  }else{
                    return temp
                  }
              })
              setTemplates(newTemplates)
            }
            
          }

          setTemplateApiControl(true)
      }
    }, [templates, promoSubjectTemplates])

    const [control, setControl] = useState(false);

    useEffect(() => {
        if (
            templates.length > 0 &&
            promoSubjectTemplates &&
            control === false &&
            apiControl.profile &&
            apiControl.need &&
            apiControl.benefit
        ) {
            const newTemplates = [...templates];
            newTemplates.map((template) => {
                promoSubjectTemplates.identificationEvaluationPage?.id === template.id && (template.isClicked = true);
                promoSubjectTemplates.nonPromoPage?.id === template.id && (template.isClicked = true);
                promoSubjectTemplates.problemIdentificationPage?.id === template.id && (template.isClicked = true);
                promoSubjectTemplates.situationPage?.id === template.id && (template.isClicked = true);
                promoSubjectTemplates.whatCanBeInterestingPage?.id === template.id && (template.isClicked = true);
            });
            setTemplates(newTemplates);
            setControl(true);
        }
    }, [templates, promoSubjectTemplates, control]);

    const handleClick = (index) => {
        
        const newTemplates = [...templates];

        let count = 0;

        if(newTemplates[index].isClicked === true){
          newTemplates[index].isClicked = !newTemplates[index].isClicked;
          setTemplates(newTemplates);
        }
        else{
              // newTemplates.map(i => {
              //   if(i.isClicked){
              //     count = count + 1
              //   }
              // })
            // if(count === 0){
              newTemplates[index].isClicked = !newTemplates[index].isClicked;
              setTemplates(newTemplates);
              return;
          // }
        }
    };

    const [linkAdress, setLinkAdress] = useState(null);

    useEffect(() => {
      if(pageName === 'Profile'){
        setLinkAdress(profileId)
      }else if(pageName === 'Need'){
        setLinkAdress(needId)
      }else if(pageName === 'Benefit'){
        setLinkAdress(benefitId)
      }else{
        setLinkAdress(promoSubjectId)
      }
    }, [])

    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {
      if(templates.length > 0){
        let count = 0;
        templates.map((item) => {
          if(item.isClicked){
            count++
          }
        })
        if(count > 0){
          setDisabledButton(false)
        }else{
          setDisabledButton(true)
        }
      }else{
        setDisabledButton(false)
      }
    }, [templates])
    
    const handleSave = () => {
      
      if(pageName === 'Profile' || pageName === 'Need' || pageName === 'Benefit'){
        const body = {
          id: Number(promoSubjectId),
          pageIds: templates.filter((item) => item.isClicked).map((item) => item.id),
          visitContent: pageName,
          visitContentId: pageName === 'Profile' ? Number(profileId) : pageName === 'Need' ? Number(needId) : Number(benefitId)
        }
        FetchApiPost('services/Pages/PromoSubject/AddVisitContentPages', 'POST', body)
          .then(res => {
            if(res.status === 201){
                history.push(`/apps/templates/promoSubject=${promoSubjectId}`)
            }
          })
      }else{
        const body = {
          id: Number(promoSubjectId),
          pageId: templates.filter((item) => item.isClicked)[0].id,
          whichColumn: pageName
        }

        FetchApiPost('services/Pages/PromoSubject/AddPromoSubjectsPages', 'POST', body)
          .then(res => {
            if(res.status === 201){
              history.push(`/apps/templates/promoSubject=${promoSubjectId}`)
            }
          })
      }
    }

    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '1rem' }}>
                <Link
                    to={`/apps/templates/promoSubject/promoSubjectId=${promoSubjectId}&pageName=${pageName}&pageId=${linkAdress}&isSub=${isSub}`}
                    style={{
                        backgroundColor: '#00a0df',
                        padding: '1px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 'fit-content',
                        height: '32px',
                        marginTop: '10px',
                        color: '#fff',
                        marginRight: '1rem',
                    }}>
                    <span style={{ paddingBottom: '4px' }}>{t('new')}</span>
                    <i style={{ fontSize: '12px' }} className="ms-1 fas fa-plus" />
                </Link>

                <button 
                  style={{
                    backgroundColor: '#0ACF97',
                    padding: '1px 10px',
                    textAlign: 'center',
                    height: '32px',

                    marginTop: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    border: 'none',
                    
                  }}
                  disabled={disabledButton}
                  onClick={() => handleSave()}
                >
                  save
                </button>
            </div>
            <div className="split">
                <div className="brochure-templates mt-3 split-left-area">
                    {templates.length > 0 &&
                        templates.map((template, i) => (
                            <Masonry className="gallery page-cards-ul" style={{ marginBottom: '1rem' }}>
                                <button
                                    onClick={() => handleClick(i)}
                                    className="gallery page-cards-ul"
                                    style={{ border: 'none', padding: '0px', cursor: 'pointer', position: 'relative' }}>
                                    <BrandTemplateCardLeft
                                        i={i}
                                        template={template}
                                        isContentEditable={true}
                                        isMaster="Master"
                                        breadcrumbName={'page'}
                                        uniqId={`page-${i}`}
                                        cardFooter={<></>}
                                        openContentModal={() => {}}
                                        isPrewiev={false}
                                        style={'marginBottom: 0px'}
                                    />
                                    {template.isClicked && (
                                        <>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    background: '#fff',
                                                    opacity: '.7',
                                                    width: '100%',
                                                    height: '100%',
                                                    zIndex: 100,
                                                    transform: 'translate(0, 0)',
                                                    top: 0,
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                }}></div>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    zIndex: 1000,
                                                    transform: 'translate(0, 0)',
                                                    top: 0,
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                }}>
                                                <Icon path={mdiCheckboxMarked} size={2} color="#00A0DF" />
                                            </div>
                                        </>
                                    )}
                                </button>
                            </Masonry>
                        ))}
                </div>
                <Divider
                    type="vertical"
                    className="page-split-divider"
                    style={{
                        minHeight: '100vh',
                        height: 'auto',
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        display: window.innerWidth > 883 ? 'block' : 'none',
                    }}
                />

                <div className="split-right-area brochure-templates mt-3">
                    {templates.length > 0 &&
                        templates.map((template, i) => {
                            return template.subPage ? (
                                <Masonry className="gallery page-cards-ul" style={{ marginBottom: '1rem' }}>
                                    <BrandTemplateCardLeft
                                        i={i}
                                        template={template.subPage}
                                        isContentEditable={false}
                                        isMaster="Surplus"
                                        breadcrumbName={'page'}
                                        uniqId={`pagesub-${i}`}
                                        cardFooter={<></>}
                                        openContentModal={() => {}}
                                        isPrewiev={false}
                                        style={'marginBottom: 0px'}
                                    />
                                </Masonry>
                            ) : (
                                <EmptyMasterTemplate
                                    className={'master-page-empty-card'}
                                    cardBody={
                                        <div className="promo-subject-template-cards">
                                            <label
                                                className="promo-subject-template-cards__item-name"
                                                style={{ color: '#6C757D' }}>
                                                Surplus
                                            </label>
                                            <div className="promo-subject-template-cards__item-icons"></div>
                                        </div>
                                    }
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default ConnectTemplates;