import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { mdiPlus, mdiLinkVariantOff, mdiFolder, mdiContentDuplicate } from '@mdi/js';
import Icon from '@mdi/react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';

import { Badge, IconButton, Button } from '@mui/material';
import { styled } from '@material-ui/styles';
import Dropdowns from '../../../../../components/Dropdowns';
import Masonry from 'react-masonry-component';
import { BrandTemplateCardLeft, BrandTemplateCardRight } from './BrandTemplateCard';
import '../../../../../assets/scss/custom/visitContent/templatesCards.scss';
import EmptyMasterTemplate from './EmptyMasterTemplate';
import BreadCrumb from '../../../../../components/BreadCrumb';
import { useTranslation } from 'react-i18next';
import Delete from './Delete';
import FailModal from '../../../../../components/FailModal';
import AddIcon from '@mui/icons-material/Add';

const PageTemplate = () => {
    const { id } = useParams('id');
    const { t } = useTranslation();
    const history = useHistory();
    const [templates, setTemplates] = useState();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const [errorModal, setErrorModal] = useState(false);
    const [error, setError] = useState('');

    const [breadCrumbProps, setBreadCrumbProps] = useState([
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Marketing', url: '/apps/visit-content' },
        { label: 'Promo Subject', url: '/apps/visit-content?tab=Promo Subject' },
        { label: 'Page', url: null },
    ]);

    useEffect(() => {
        FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectById?id=${id}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setTemplates(data);
                });
            }
        });
    }, []);

    const addButtonStyle = {
        backgroundColor: '#00a0df',
        boxShadow: 'none',
        fontFamily: "'Roboto', sans-serif",
        padding: '6px 10px',
        fontSize: '0.75rem',
        border: '1px solid #00a0df',
        color: 'white',
        width: 'auto',
        height: '24px',
        textTransform: 'none',
    };

    const openContentModal = (ids) => {
        // const findObject = () => {
        //     let foundObject = templates.find((item) => item.id === Number(ids));
        //     if (!foundObject) {
        //         templates.forEach((item) => {
        //             if (item.subPage === null) return;
        //             foundObject = item.subPage.id === Number(ids) && item.subPage;
        //             if (foundObject) return foundObject;
        //             if (!foundObject) return false;
        //         });
        //     }
        //     return foundObject;
        // };
        // let findPageById = findObject();
        // const { id, jsonPath, htmlPath, isApproved, content } = { ...findPageById };
        // setItem({
        //     id,
        //     jsonFile: jsonPath,
        //     htmlFile: htmlPath,
        //     isApproved,
        //     content,
        //     modifiedBy: user,
        //     status: true,
        // });
        // setShowContentModal(true);
    };

    // Promo subject id
    // giriş sayfasında tıklanan şeyin adı benefit profile what can be vs.
    // giriş sayfasındaki tıklanan şeyin id si profileıD benefit id, KENDİ ID Sİ DEĞİL !!!

    const postDublicateGetTemplate = () => {
        FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectById?id=${id}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setTemplates(data);
                });
            }
        });
    };

    const dublicateVisitContentPages = (pageId) => {
        const saveSubBody = {
            masterPageId: Number(pageId),
            createdBy: localStorage.getItem('userName'),
        };

        FetchApiPost('services/Pages/ProductPage/DuplicateSubPage', 'POST', saveSubBody).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    getDataThenCopuSub();
                });
            }
        });
    };

    const getDataThenCopuSub = () => {
        FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectById?id=${id}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setTemplates(data);
                });
            }
        });
    };

    const dropDownOptions = [
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];

    const handleClickDropDown = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );

        let hasProfilePage = templates.profile.productPages.length === 0 ? false : true;
        let hasNeedPage = templates.need.productPages.length === 0 ? false : true;
        let hasBenefitPage = false;

        templates.benefits.map((b) => {
            if (b.productPages.length > 0) {
                hasBenefitPage = true;
            }
        });

        let count = 0;
        if (hasProfilePage === true) count = count + 1;
        if (hasNeedPage === true) count = count + 1;
        if (hasBenefitPage === true) count = count + 1;

        if (count === 1) {
            setError('At least one of the profile, need or benefit pages must be present.');
            setErrorModal(true);
            return;
        }

        // 0. indis statu id
        // 1. indis visit content id || promo subject kendi pageleri için sıfır yollıycam
        // 2. indis page in id si,
        // 3. indis page türünün adı

        const body = {
            id: Number(getIds[1]),
            visitContent: getIds[3],
            visitContentId: Number(getIds[2]),
            modifiedBy: localStorage.getItem('userName'),
        };
        setSelectedItem(body);
        setShowDeleteModal(true);
    };

    return (
        <>
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            {templates && (
                <div className="split">
                    <div className="brochure-templates mt-3 split-left-area">
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <h5>{t('Profile')}</h5>{' '}
                            <Button
                                onClick={() => history.push(`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=Profile&profileId=${templates?.profile?.id}&needId=${templates?.need?.id}&benefitId=${templates?.benefits[0]?.id}&connectPageId=${templates?.profile.id}&isSub=false`)}
                                style={addButtonStyle}
                                variant="contained"
                                // onClick={handleNewButton}
                                endIcon={<AddIcon sx={{ width: 16, height: 16, marginLeft: 0 }} />}>
                                {t('New')}
                            </Button>
                        </div>
                        <div className="gallery page-cards-ul">
                            {templates?.profile.productPages && templates?.profile.productPages.length > 0 ? (
                                templates?.profile.productPages.map((template, i) => {
                                    return (
                                        <Masonry className="gallery page-cards-ul">
                                            <BrandTemplateCardLeft
                                                i={i}
                                                template={template}
                                                isContentEditable={true}
                                                isMaster="Master"
                                                breadcrumbName={templates.profile.profileName}
                                                uniqId={`profile-${i}`}
                                                cardFooter={
                                                    <>
                                                        <span style={{ marginLeft: 'auto' }}>
                                                            <Dropdowns
                                                                item={`?${templates?.profile?.id}?${templates?.profile?.productPages[0]?.id}?profile`}
                                                                option={dropDownOptions}
                                                                onClick={handleClickDropDown}
                                                            />
                                                        </span>
                                                    </>
                                                }
                                                openContentModal={openContentModal}
                                            />
                                        </Masonry>
                                    );
                                })
                            ) : (
                                <EmptyMasterTemplate
                                    className={'master-page-empty-card'}
                                    cardBody={
                                        <div className="promo-subject-template-cards">
                                            <label
                                                className="promo-subject-template-cards__item-name"
                                                style={{ color: '#6C757D' }}>
                                                {templates?.profile?.profileName}
                                            </label>
                                            <div className="promo-subject-template-cards__item-icons">
                                                <Link
                                                    to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=Profile&pageId=${templates?.profile?.id}&isSub=false`}>
                                                    <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                </Link>
                                                <Link
                                                    to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=Profile&profileId=${templates?.profile?.id}&needId=${templates?.need?.id}&benefitId=${templates?.benefits[0]?.id}&connectPageId=${templates?.profile.id}&isSub=false`}>
                                                    <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                />
                            )}
                        </div>
                        <h5>{t('Promo Subject')}</h5>
                        {/* What can be interesting for a doctor in the discussion of the topic */}
                        {templates?.whatCanBeInterestingPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardLeft
                                    i={0}
                                    template={templates.whatCanBeInterestingPage}
                                    isContentEditable={true}
                                    isMaster="Master"
                                    breadcrumbName={
                                        'What can be interesting for a doctor in the discussion of the topic'
                                    }
                                    uniqId={`whatCanBeInterestingPage`}
                                    cardFooter={
                                        <>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <Dropdowns
                                                    item={`?0?${templates?.whatCanBeInterestingPage?.id}?whatCanBeInterestingPage`}
                                                    option={dropDownOptions}
                                                    onClick={handleClickDropDown}
                                                />
                                            </span>
                                        </>
                                    }
                                    openContentModal={openContentModal}
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
                                            {t('What can be interesting for a doctor in the discussion of the topic')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            <Link
                                                to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=WhatCanBeInterestingPage&pageId=${id}&isSub=false`}>
                                                <Icon path={mdiPlus} size={2} color="#6C757D" />
                                            </Link>
                                            <Link
                                                to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=WhatCanBeInterestingPage&profileId=${
                                                    templates?.profile?.id
                                                }&needId=${templates?.need?.id}&benefitId=${
                                                    templates?.benefits[0]?.id
                                                }&connectPageId=${0}&isSub=false`}>
                                                <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                            </Link>
                                            {/* <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" /> */}
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        <h5>{t('Promo Subject')}</h5>
                        {templates?.situationPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardLeft
                                    i={0}
                                    template={templates.situationPage}
                                    isContentEditable={true}
                                    isMaster="Master"
                                    breadcrumbName={'Situation Clarification of the situation'}
                                    uniqId={`situationPage`}
                                    cardFooter={
                                        <>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <Dropdowns
                                                    item={`?0?${templates?.situationPage?.id}?situationPage`}
                                                    option={dropDownOptions}
                                                    onClick={handleClickDropDown}
                                                />
                                            </span>
                                        </>
                                    }
                                    openContentModal={openContentModal}
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
                                            {t('Situation Clarification of the situation')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            <Link
                                                to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=SituationPage&pageId=${id}&isSub=false`}>
                                                <Icon path={mdiPlus} size={2} color="#6C757D" />
                                            </Link>
                                            <Link
                                                to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=SituationPage&profileId=${
                                                    templates?.profile?.id
                                                }&needId=${templates?.need?.id}&benefitId=${
                                                    templates?.benefits[0]?.id
                                                }&connectPageId=${0}&isSub=false`}>
                                                <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                            </Link>
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        <h5>{t('Promo Subject')}</h5>
                        {templates?.problemIdentificationPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardLeft
                                    i={0}
                                    template={templates.problemIdentificationPage}
                                    isContentEditable={true}
                                    isMaster="Master"
                                    breadcrumbName={'Problem Identification of Availability of Disadvantages in Life'}
                                    uniqId={`problemIdentificationPage`}
                                    cardFooter={
                                        <>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <Dropdowns
                                                    item={`?0?${templates?.problemIdentificationPage?.id}?problemIdentificationPage`}
                                                    option={dropDownOptions}
                                                    onClick={handleClickDropDown}
                                                />
                                            </span>
                                        </>
                                    }
                                    openContentModal={openContentModal}
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
                                            {t('Problem Identification of Availability of Disadvantages in Life')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            <Link
                                                to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=ProblemIdentificationPage&pageId=${id}&isSub=false`}>
                                                <Icon path={mdiPlus} size={2} color="#6C757D" />
                                            </Link>
                                            <Link
                                                to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=ProblemIdentificationPage&profileId=${
                                                    templates?.profile?.id
                                                }&needId=${templates?.need?.id}&benefitId=${
                                                    templates?.benefits[0]?.id
                                                }&connectPageId=${0}&isSub=false`}>
                                                <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                            </Link>
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        <h5>{t('Promo Subject')}</h5>
                        {templates?.identificationEvaluationPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardLeft
                                    i={0}
                                    template={templates.identificationEvaluationPage}
                                    isContentEditable={true}
                                    isMaster="Master"
                                    breadcrumbName={'Identification Evaluation of Unwanted Consequences'}
                                    uniqId={`identificationEvaluationPage`}
                                    cardFooter={
                                        <>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <Dropdowns
                                                    item={`?0?${templates?.identificationEvaluationPage?.id}?identificationEvaluationPage`}
                                                    option={dropDownOptions}
                                                    onClick={handleClickDropDown}
                                                />
                                            </span>
                                        </>
                                    }
                                    openContentModal={openContentModal}
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
                                            {t('Identification Evaluation of Unwanted Consequences')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            <Link
                                                to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=IdentificationEvaluationPage&pageId=${id}&isSub=false`}>
                                                <Icon path={mdiPlus} size={2} color="#6C757D" />
                                            </Link>
                                            <Link
                                                to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=IdentificationEvaluationPage&profileId=${
                                                    templates?.profile?.id
                                                }&needId=${templates?.need?.id}&benefitId=${
                                                    templates?.benefits[0]?.id
                                                }&connectPageId=${0}&isSub=false`}>
                                                <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                            </Link>
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        {/* Need */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <h5>{t('Need')}</h5>{' '}
                            <Button
                                onClick={() => history.push(`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=Need&profileId=${templates?.profile?.id}&needId=${templates?.need?.id}&benefitId=${templates?.benefits[0]?.id}&connectPageId=${templates?.need.id}&isSub=false`)}
                                style={addButtonStyle}
                                variant="contained"
                                // onClick={handleNewButton}
                                endIcon={<AddIcon sx={{ width: 16, height: 16, marginLeft: 0 }} />}>
                                {t('New')}
                            </Button>
                        </div>
                        <div className="gallery page-cards-ul">
                            {templates?.need.productPages && templates?.need.productPages.length > 0 ? (
                                templates?.need.productPages.map((template, i) => {
                                    return (
                                        <Masonry className="gallery page-cards-ul">
                                            <BrandTemplateCardLeft
                                                i={i}
                                                template={template}
                                                isContentEditable={true}
                                                isMaster="Master"
                                                breadcrumbName={templates.need.needName}
                                                uniqId={`need-${i}`}
                                                cardFooter={
                                                    <>
                                                        <span style={{ marginLeft: 'auto' }}>
                                                            <Dropdowns
                                                                item={`?${templates?.need?.id}?${templates?.need?.productPages[0]?.id}?need`}
                                                                option={dropDownOptions}
                                                                onClick={handleClickDropDown}
                                                            />
                                                        </span>
                                                    </>
                                                }
                                                openContentModal={openContentModal}
                                            />
                                        </Masonry>
                                    );
                                })
                            ) : (
                                <EmptyMasterTemplate
                                    className={'master-page-empty-card'}
                                    cardBody={
                                        <div className="promo-subject-template-cards">
                                            <label
                                                className="promo-subject-template-cards__item-name"
                                                style={{ color: '#6C757D' }}>
                                                {templates?.need?.needName}
                                            </label>
                                            <div className="promo-subject-template-cards__item-icons">
                                                <Link
                                                    to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=Need&pageId=${templates?.need?.id}&isSub=false`}>
                                                    <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                </Link>
                                                <Link
                                                    to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=Need&profileId=${templates?.profile?.id}&needId=${templates?.need?.id}&benefitId=${templates?.benefits[0]?.id}&connectPageId=${templates?.need.id}&isSub=false`}>
                                                    <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                />
                            )}
                        </div>

                        {/* mechanism of action */}

                        <h5>{t('Mechasim of Action')}</h5>
                        {templates?.benefits[0].mechanismPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardLeft
                                    i={0}
                                    template={templates.benefits[0].mechanismPage}
                                    isContentEditable={true}
                                    isMaster="Master"
                                    breadcrumbName={'templates?.benefits[0].benefitName'}
                                    uniqId={`mechanismPage`}
                                    cardFooter={<></>}
                                    openContentModal={openContentModal}
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
                                            {templates?.benefits[0]?.benefitName}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            <Icon path={mdiPlus} size={2} color="#6C757D" />
                                            <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        {/* Benefit */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <h5>{t('Benefit')}</h5>{' '}
                            <Button
                                onClick={() => history.push(`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=Benefit&profileId=${templates?.profile?.id}&needId=${templates?.need?.id}&benefitId=${templates?.benefits[0].id}&connectPageId=${templates?.benefits[0].id}&isSub=false`)}
                                style={addButtonStyle}
                                variant="contained"
                                // onClick={handleNewButton}
                                endIcon={<AddIcon sx={{ width: 16, height: 16, marginLeft: 0 }} />}>
                                {t('New')}
                            </Button>
                        </div>
                        {templates?.benefits.map((benefit, i) => (
                            <div className="gallery page-cards-ul">
                                {benefit.productPages && benefit.productPages.length > 0 ? (
                                    benefit.productPages.map((bPage, bPageId) => (
                                        <Masonry className="gallery page-cards-ul">
                                            <BrandTemplateCardLeft
                                                i={i}
                                                template={bPage}
                                                isContentEditable={true}
                                                isMaster="Master"
                                                breadcrumbName={benefit.benefitName}
                                                uniqId={`benefit-${bPageId}-${i}`}
                                                cardFooter={
                                                    <>
                                                        <span style={{ marginLeft: 'auto' }}>
                                                            <Dropdowns
                                                                item={`?${benefit?.id}?${bPage?.id}?benefit`}
                                                                option={dropDownOptions}
                                                                onClick={handleClickDropDown}
                                                            />
                                                        </span>
                                                    </>
                                                }
                                                openContentModal={openContentModal}
                                            />
                                        </Masonry>
                                    ))
                                ) : (
                                    <EmptyMasterTemplate
                                        className={'master-page-empty-card'}
                                        cardBody={
                                            <div className="promo-subject-template-cards">
                                                <label
                                                    className="promo-subject-template-cards__item-name"
                                                    style={{ color: '#6C757D' }}>
                                                    {benefit?.benefitName}
                                                </label>
                                                <div className="promo-subject-template-cards__item-icons">
                                                    <Link
                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=Benefit&pageId=${benefit?.id}&isSub=false`}>
                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                    </Link>
                                                    <Link
                                                        to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=Benefit&profileId=${templates?.profile?.id}&needId=${templates?.need?.id}&benefitId=${benefit?.id}&connectPageId=${benefit?.id}&isSub=false`}>
                                                        <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                    />
                                )}
                            </div>
                        ))}

                        {/* non promo */}
                        <h5>{t('Promo Subject')}</h5>
                        {templates?.nonPromoPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardLeft
                                    i={0}
                                    template={templates.nonPromoPage}
                                    isContentEditable={true}
                                    isMaster="Master"
                                    breadcrumbName={'non promo'}
                                    uniqId={`nonPromoPage`}
                                    cardFooter={
                                        <>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <Dropdowns
                                                    item={`?0?${templates?.nonPromoPage?.id}?nonPromoPage`}
                                                    option={dropDownOptions}
                                                    onClick={handleClickDropDown}
                                                />
                                            </span>
                                        </>
                                    }
                                    openContentModal={openContentModal}
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
                                            {t('non promo')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            <Link
                                                to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=NonPromoPage&pageId=${templates?.nonPromoPage?.id}&isSub=false`}>
                                                <Icon path={mdiPlus} size={2} color="#6C757D" />
                                            </Link>
                                            <Link
                                                to={`/apps/connect/promoSubjectConnect/promoSubjectId=${id}&pageName=NonPromoPage&profileId=${
                                                    templates?.profile?.id
                                                }&needId=${templates?.need?.id}&benefitId=${
                                                    templates?.benefits[0]?.id
                                                }&connectPageId=${0}&isSub=false`}>
                                                <Icon path={mdiLinkVariantOff} size={2} color="#6C757D" />
                                            </Link>
                                        </div>
                                    </div>
                                }
                            />
                        )}
                    </div>

                    <Divider
                        type="vertical"
                        className="page-split-divider"
                        style={{
                            height: 'auto',
                            marginLeft: '1rem',
                            marginRight: '1rem',
                            display: window.innerWidth > 883 ? 'block' : 'none',
                        }}
                    />

                    <div className="split-right-area brochure-templates mt-3">
                        {/* Profile */}
                        <h5>{t('Profile')}</h5>
                        <div className="gallery page-cards-ul">
                            {templates?.profile?.productPages && templates?.profile?.productPages?.length > 0 ? (
                                templates?.profile?.productPages.map((template, i) => {
                                    if (template.subPage !== null) {
                                        return (
                                            <Masonry className="gallery page-cards-ul">
                                                <BrandTemplateCardRight
                                                    i={i}
                                                    template={template.subPage}
                                                    isContentEditable={true}
                                                    isMaster="Surplus"
                                                    breadcrumbName={templates.profile.profileName}
                                                    uniqId={`profilesub-${i}`}
                                                    cardFooter={<></>}
                                                    openContentModal={openContentModal}
                                                />
                                            </Masonry>
                                        );
                                    } else {
                                        return (
                                            <EmptyMasterTemplate
                                                className={'master-page-empty-card'}
                                                cardBody={
                                                    <div className="promo-subject-template-cards">
                                                        <label
                                                            className="promo-subject-template-cards__item-name"
                                                            style={{ color: '#6C757D' }}>
                                                            {templates?.profile?.profileName}
                                                        </label>
                                                        <div className="promo-subject-template-cards__item-icons">
                                                            {template?.profile?.productPages !== null ? (
                                                                <>
                                                                    <Link
                                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=Profile&pageId=${template.id}&isSub=true`}>
                                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                                    </Link>
                                                                    <Icon
                                                                        path={mdiContentDuplicate}
                                                                        size={2}
                                                                        color="#6C757D"
                                                                        onClick={() =>
                                                                            dublicateVisitContentPages(template.id)
                                                                        }
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                                    <Icon
                                                                        path={mdiContentDuplicate}
                                                                        size={2}
                                                                        color="#6c757d80"
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        );
                                    }
                                })
                            ) : (
                                <EmptyMasterTemplate
                                    className={'master-page-empty-card'}
                                    cardBody={
                                        <div className="promo-subject-template-cards">
                                            <label
                                                className="promo-subject-template-cards__item-name"
                                                style={{ color: '#6C757D' }}>
                                                {templates?.profile?.profileName}
                                            </label>
                                            <div className="promo-subject-template-cards__item-icons">
                                                <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                            </div>
                                        </div>
                                    }
                                />
                            )}
                        </div>

                        <h5>{t('Promo Subject')}</h5>
                        {templates?.whatCanBeInterestingPage && templates.whatCanBeInterestingPage.subPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardRight
                                    i={0}
                                    template={templates.whatCanBeInterestingPage.subPage}
                                    isContentEditable={true}
                                    isMaster="Surplus"
                                    breadcrumbName={
                                        'What can be interesting for a doctor in the discussion of the topic'
                                    }
                                    uniqId={`whatCanBeInterestingPagesub`}
                                    cardFooter={<></>}
                                    openContentModal={openContentModal}
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
                                            {t('What can be interesting for a doctor in the discussion of the topic')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            {templates?.whatCanBeInterestingPage !== null ? (
                                                <>
                                                    <Link
                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=WhatCanBeInterestingPage&pageId=${templates?.whatCanBeInterestingPage.id}&isSub=true`}>
                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                    </Link>
                                                    <Icon
                                                        path={mdiContentDuplicate}
                                                        size={2}
                                                        color="#6C757D"
                                                        onClick={() =>
                                                            dublicateVisitContentPages(
                                                                templates?.whatCanBeInterestingPage?.id
                                                            )
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                    <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        <h5>{t('Promo Subject')}</h5>
                        {templates?.situationPage && templates.situationPage.subPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardRight
                                    i={0}
                                    template={templates.situationPage.subPage}
                                    isContentEditable={true}
                                    isMaster="Surplus"
                                    breadcrumbName={'Situation Clarification of the situation'}
                                    uniqId={`situationPagesub`}
                                    cardFooter={<></>}
                                    openContentModal={openContentModal}
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
                                            {t('Situation Clarification of the situation')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            {templates?.situationPage !== null ? (
                                                <>
                                                    <Link
                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=SituationPage&pageId=${templates?.situationPage?.id}&isSub=true`}>
                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                    </Link>
                                                    <Icon
                                                        path={mdiContentDuplicate}
                                                        size={2}
                                                        color="#6C757D"
                                                        onClick={() =>
                                                            dublicateVisitContentPages(templates?.situationPage?.id)
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                    <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        <h5>{t('Promo Subject')}</h5>
                        {templates?.problemIdentificationPage && templates.problemIdentificationPage.subPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardRight
                                    i={0}
                                    template={templates.problemIdentificationPage.subPage}
                                    isContentEditable={true}
                                    isMaster="Surplus"
                                    breadcrumbName={'Problem Identification of Availability of Disadvantages in Life'}
                                    uniqId={`problemIdentificationPagesub`}
                                    cardFooter={<></>}
                                    openContentModal={openContentModal}
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
                                            {t('Problem Identification of Availability of Disadvantages in Life')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            {templates?.problemIdentificationPage !== null ? (
                                                <>
                                                    <Link
                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=ProblemIdentificationPage&pageId=${templates?.problemIdentificationPage?.id}&isSub=true`}>
                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                    </Link>
                                                    <Icon
                                                        path={mdiContentDuplicate}
                                                        size={2}
                                                        color="#6C757D"
                                                        onClick={() =>
                                                            dublicateVisitContentPages(
                                                                templates?.problemIdentificationPage?.id
                                                            )
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                    <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        <h5>{t('Promo Subject')}</h5>
                        {templates?.identificationEvaluationPage && templates.identificationEvaluationPage.subPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardRight
                                    i={0}
                                    template={templates.identificationEvaluationPage.subPage}
                                    isContentEditable={true}
                                    isMaster="Surplus"
                                    breadcrumbName={'Identification Evaluation of Unwanted Consequences'}
                                    uniqId={`identificationEvaluationPagesub`}
                                    cardFooter={<></>}
                                    openContentModal={openContentModal}
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
                                            {t('Identification Evaluation of Unwanted Consequences')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            {templates?.identificationEvaluationPage !== null ? (
                                                <>
                                                    <Link
                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=IdentificationEvaluationPage&pageId=${templates?.identificationEvaluationPage?.id}&isSub=true`}>
                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                    </Link>
                                                    <Icon
                                                        path={mdiContentDuplicate}
                                                        size={2}
                                                        color="#6C757D"
                                                        onClick={() =>
                                                            dublicateVisitContentPages(
                                                                templates?.identificationEvaluationPage?.id
                                                            )
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                    <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        {/* Need */}
                        <h5>{t('Need')}</h5>

                        {templates?.need.productPages && templates?.need.productPages.length > 0 ? (
                            templates?.need.productPages.map((template, i) => {
                                if (template.subPage !== null) {
                                    return (
                                        <div className="gallery page-cards-ul">
                                            <Masonry className="gallery page-cards-ul">
                                                <BrandTemplateCardRight
                                                    i={i}
                                                    template={template.subPage}
                                                    isContentEditable={true}
                                                    isMaster="Surplus"
                                                    breadcrumbName={templates.need.needName}
                                                    uniqId={`needsub-${i}`}
                                                    cardFooter={<></>}
                                                    openContentModal={openContentModal}
                                                />
                                            </Masonry>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="gallery page-cards-ul">
                                            <EmptyMasterTemplate
                                                className={'master-page-empty-card'}
                                                cardBody={
                                                    <div className="promo-subject-template-cards">
                                                        <label
                                                            className="promo-subject-template-cards__item-name"
                                                            style={{ color: '#6C757D' }}>
                                                            {templates.need.needName}
                                                        </label>
                                                        <div className="promo-subject-template-cards__item-icons">
                                                            {template?.need?.productPages !== null ? (
                                                                <>
                                                                    <Link
                                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=Need&pageId=${template.id}&isSub=true`}>
                                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                                    </Link>
                                                                    <Icon
                                                                        path={mdiContentDuplicate}
                                                                        size={2}
                                                                        color="#6C757D"
                                                                        onClick={() =>
                                                                            dublicateVisitContentPages(template.id)
                                                                        }
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                                    <Icon
                                                                        path={mdiContentDuplicate}
                                                                        size={2}
                                                                        color="#6c757d80"
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <div className="gallery page-cards-ul">
                                <EmptyMasterTemplate
                                    className={'master-page-empty-card'}
                                    cardBody={
                                        <div className="promo-subject-template-cards">
                                            <label
                                                className="promo-subject-template-cards__item-name"
                                                style={{ color: '#6C757D' }}>
                                                {templates?.need?.needName}
                                            </label>
                                            <div className="promo-subject-template-cards__item-icons">
                                                <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        )}

                        {/* mechanism of action */}

                        <h5>{t('Mechasim of Action')}</h5>
                        {templates?.benefits[0].mechanismPage && templates?.benefits[0].mechanismPage.subPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardRight
                                    i={0}
                                    template={templates.benefits[0].mechanismPage.subPage}
                                    isContentEditable={true}
                                    isMaster="Surplus"
                                    breadcrumbName={'templates?.benefits[0].benefitName.subPage'}
                                    uniqId={`mechanismPagesub`}
                                    cardFooter={<></>}
                                    openContentModal={openContentModal}
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
                                            {templates?.benefits[0]?.benefitName}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                            <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                        </div>
                                    </div>
                                }
                            />
                        )}

                        {/* Benefit */}
                        <h5>{t('Benefit')}</h5>
                        {templates?.benefits.map((benefit, i) => (
                            <>
                                {benefit.productPages && benefit.productPages.length > 0 ? (
                                    benefit.productPages.map((template, pI) => {
                                        if (template.subPage !== null) {
                                            return (
                                                <div className="gallery page-cards-ul">
                                                    <Masonry className="gallery page-cards-ul">
                                                        <BrandTemplateCardRight
                                                            i={i}
                                                            template={template.subPage}
                                                            isContentEditable={true}
                                                            isMaster="Surplus"
                                                            breadcrumbName={benefit.benefitName}
                                                            uniqId={`benefitsub-${i}-${pI}`}
                                                            cardFooter={<></>}
                                                            openContentModal={openContentModal}
                                                        />
                                                    </Masonry>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="gallery page-cards-ul">
                                                    <EmptyMasterTemplate
                                                        className={'master-page-empty-card'}
                                                        cardBody={
                                                            <div className="promo-subject-template-cards">
                                                                <label
                                                                    className="promo-subject-template-cards__item-name"
                                                                    style={{ color: '#6C757D' }}>
                                                                    {benefit.benefitName}
                                                                </label>
                                                                <div className="promo-subject-template-cards__item-icons">
                                                                    {benefit?.productPages !== null ? (
                                                                        <>
                                                                            <Link
                                                                                to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=Benefit&pageId=${template?.id}&isSub=true`}>
                                                                                <Icon
                                                                                    path={mdiPlus}
                                                                                    size={2}
                                                                                    color="#6C757D"
                                                                                />
                                                                            </Link>
                                                                            <Icon
                                                                                path={mdiContentDuplicate}
                                                                                size={2}
                                                                                color="#6C757D"
                                                                                onClick={() =>
                                                                                    dublicateVisitContentPages(
                                                                                        template.id
                                                                                    )
                                                                                }
                                                                            />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Icon
                                                                                path={mdiPlus}
                                                                                size={2}
                                                                                color="#6c757d80"
                                                                            />
                                                                            <Icon
                                                                                path={mdiContentDuplicate}
                                                                                size={2}
                                                                                color="#6c757d80"
                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                            );
                                        }
                                    })
                                ) : (
                                    <div className="gallery page-cards-ul">
                                        <EmptyMasterTemplate
                                            className={'master-page-empty-card'}
                                            cardBody={
                                                <div className="promo-subject-template-cards">
                                                    <label
                                                        className="promo-subject-template-cards__item-name"
                                                        style={{ color: '#6C757D' }}>
                                                        {benefit?.benefitName}
                                                    </label>
                                                    <div className="promo-subject-template-cards__item-icons">
                                                        <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                        <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </div>
                                )}
                            </>
                        ))}

                        {/* non promo */}
                        <h5>{t('Promo Subject')}</h5>
                        {templates?.nonPromoPage && templates?.nonPromoPage?.subPage ? (
                            <Masonry className="gallery page-cards-ul">
                                <BrandTemplateCardRight
                                    i={0}
                                    template={templates.nonPromoPage.subPage}
                                    isContentEditable={true}
                                    isMaster="Surplus"
                                    breadcrumbName={'non promo'}
                                    uniqId={`nonPromoPagesub`}
                                    cardFooter={<></>}
                                    openContentModal={openContentModal}
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
                                            {t('non promo')}
                                        </label>
                                        <div className="promo-subject-template-cards__item-icons">
                                            {templates?.nonPromoPage !== null ? (
                                                <>
                                                    <Link
                                                        to={`/apps/templates/promoSubject/promoSubjectId=${id}&pageName=NonPromoPage&pageId=${templates?.nonPromoPage?.id}&isSub=true`}>
                                                        <Icon path={mdiPlus} size={2} color="#6C757D" />
                                                    </Link>
                                                    <Icon
                                                        path={mdiContentDuplicate}
                                                        size={2}
                                                        color="#6C757D"
                                                        onClick={() =>
                                                            dublicateVisitContentPages(templates?.nonPromoPage?.id)
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Icon path={mdiPlus} size={2} color="#6c757d80" />
                                                    <Icon path={mdiContentDuplicate} size={2} color="#6c757d80" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        )}
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    item={selectedItem}
                    getFilterData={postDublicateGetTemplate}
                />
            )}
        </>
    );
};

export default PageTemplate;
