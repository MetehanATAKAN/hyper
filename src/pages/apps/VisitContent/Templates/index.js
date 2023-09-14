import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { setIsPage } from '../../../../redux/actions';
import '../../../../assets/scss/custom/visitContent/templatesCards.scss';
import Filter from './Filter';
import TemplateCard from './TemplateCard';
import BreadCrumb from '../../../../components/BreadCrumb';
import { BrandTemplateCardLeft } from '../TemplateById/BrandTemplateCard';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

const Templates = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { ids, name, isSub } = useParams('id');
    const [loader, setLoader] = useState(false);
    const [loaderFilter, setLoaderFilter] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [selectType, setSelectType] = useState();
    const [selectName, setSelectName] = useState([]);
    const [selectLanguage, setSelectLanguage] = useState([]);
    const [optionsLanguage, setOptionsLanguage] = useState([]);
    const [selectStatus, setSelectStatus] = useState([]);
    const [selectBrand, setSelectBrand] = useState([]);
    const [optionsBrand, setOptionsBrand] = useState([]);
    const [optionsType, setOptionsType] = useState([
        { value: 0, label: t('Profile') },
        { value: 1, label: t('Need') },
        { value: 2, label: t('Benefit') },
        // { value: 3, label: t('Disadvantages') },
        { value: 9, label: t('Templates') },
    ]);
    const [optionsName, setOptionsName] = useState([]);
    const [optionsStatus, setOptionsStatus] = useState([]);
    const [isBrand, setIsBrand] = useState(false);
    const resetRedux = () => {
        dispatch(setIsPage(false));
    };
    // GET APPROVED TEMPLATE
    const getAllApprovedTemplate = () => {
        setLoader(true);
        FetchApiGet('services/Pages/Page/GetAllApprovedDesignPage', 'GET').then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setIsBrand(false);
                    setTemplates(data);
                });
            } else if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            } else {
                setTemplates([]);
            }
        });
    };

    useEffect(() => {
        getAllApprovedTemplate();
    }, []);

    // GET BRANDS
    useEffect(() => {
        if (!selectType) return;
        if (selectType.value === 9) return;
        setLoaderFilter(true);
        FetchApiGet(`api/OldSystem/GetAllGlobalBrands`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSelectBrand(data?.map((el) => ({ value: el.GlobalBrandId, label: el.GlobalBrandName })));
                    setOptionsBrand(data?.map((el) => ({ value: el.GlobalBrandId, label: el.GlobalBrandName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            }
        });
    }, [history, selectType]);

    // GET NAME
    useEffect(() => {
        if (!selectType) return;
        setSelectLanguage([]);
        setSelectStatus([]);
        setOptionsLanguage([]);
        setOptionsStatus([]);
        if (selectBrand.length === 0) return;
        const data = {
            brandIds: selectBrand?.map((x) => x.value),
        };
        switch (selectType.value) {
            case 0: //PROFİLE
                FetchApiPost('services/Pages/Profile/GetProfilesForPagesFilter', 'POST', data).then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        res.json().then(({ data }) => {
                            setSelectName(data?.map((el) => ({ value: el.id, label: el.profileName })));
                            setOptionsName(data?.map((el) => ({ value: el.id, label: el.profileName })));
                        });
                    }
                    if (res.status === 500 || res.status === 502) {
                        resetRedux();
                        history.push('/error-500');
                    }
                });
                break;
            case 1: // NEED
                FetchApiPost('services/Pages/Need/GetNeedsForPageFilter', 'POST', data).then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        res.json().then(({ data }) => {
                            setSelectName(data?.map((el) => ({ value: el.id, label: el.needName })));
                            setOptionsName(data?.map((el) => ({ value: el.id, label: el.needName })));
                        });
                    }
                    if (res.status === 500 || res.status === 502) {
                        resetRedux();
                        history.push('/error-500');
                    }
                });
                break;
            case 2: // BENEFIT
                FetchApiPost('services/Pages/Benefit/GetBenefitForPageFilter', 'POST', data).then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        res.json().then(({ data }) => {
                            setSelectName(data?.map((el) => ({ value: el.id, label: el.benefitName })));
                            setOptionsName(data?.map((el) => ({ value: el.id, label: el.benefitName })));
                        });
                    }
                    if (res.status === 500 || res.status === 502) {
                        resetRedux();
                        history.push('/error-500');
                    }
                });
                break;
            default:
                break;
        }
    }, [history, selectBrand, selectType]);

    // GET LANGUAGE
    useEffect(() => {
        if (selectName.length === 0) {
            return setLoaderFilter(false);
        }
        FetchApiGet('api/OldSystem/GetAllLanguageAbb', 'GET').then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((data) => {
                    setSelectLanguage(data?.map((x) => ({ value: x.LanguageAbbId, label: x.LanguageAbb })));
                    setOptionsLanguage(data?.map((x) => ({ value: x.LanguageAbbId, label: x.LanguageAbb })));
                    setSelectStatus([
                        { value: 1, label: t('Redact') },
                        { value: 2, label: t('Send to Approval') },
                        { value: 3, label: t('Approved') },
                    ]);
                    setOptionsStatus([
                        { value: 1, label: t('Redact') },
                        { value: 2, label: t('Send to Approval') },
                        { value: 3, label: t('Approved') },
                    ]);
                    setLoaderFilter(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            } else {
                setOptionsLanguage([]);
            }
        });
    }, [selectName]);
    //
    useEffect(() => {
        if (!selectType) return;
        if (selectType.value !== 9) return;
        getAllApprovedTemplate();
    }, [selectType]);

    const handleClickTemplate = (id) => {
        history.push(`/apps/template-design/itemid=${ids}&productname=${name}&templateid=${id}&sub=${isSub}`);
    };

    const profileApplyFilter = () => {
        const data = {
            brandIds: selectBrand?.map((x) => x.value),
            profileIds: selectName?.map((x) => x.value),
            languageIds: selectLanguage?.map((x) => x.value),
            statusIds: selectStatus?.map((x) => x.value),
        };
        setLoader(true);
        FetchApiPost('services/Pages/Profile/GetProfilesPagesApply', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    const pages = data?.flatMap((x) => x.productPages);
                    setLoader(false);
                    setTemplates(pages);
                });
            }
            if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            }
        });
    };

    const needApplyFilter = () => {
        const data = {
            brandIds: selectBrand?.map((x) => x.value),
            needIds: selectName?.map((x) => x.value),
            languageIds: selectLanguage?.map((x) => x.value),
            statusIds: selectStatus?.map((x) => x.value),
        };
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetNeedsForPageApply', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    const pages = data?.flatMap((x) => x.productPages);
                    setLoader(false);
                    setTemplates(pages);
                });
            }
            if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            }
        });
    };
    const benefitApplyFilter = () => {
        const data = {
            brandIds: selectBrand?.map((x) => x.value),
            benefitIds: selectName?.map((x) => x.value),
            languageIds: selectLanguage?.map((x) => x.value),
            statusIds: selectStatus?.map((x) => x.value),
        };
        setLoader(true);
        FetchApiPost('services/Pages/Benefit/GetBenefitForPageApply', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    const pages = data?.flatMap((x) => x.productPages);
                    setLoader(false);
                    setTemplates(pages);
                });
            }
            if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            }
        });
    };
    const applyFilter = () => {
        if (!selectType) return;
        setIsBrand(true);
        switch (selectType.value) {
            case 0: //PROFİLE
                profileApplyFilter();
                break;
            case 1: //NEED
                needApplyFilter();
                break;
            case 2: //BENEFIT
                benefitApplyFilter();
                break;
            default:
                break;
        }
    };

    const clearFilter = () => {
        setSelectType();
        setSelectName([]);
        setSelectLanguage([]);
        setOptionsLanguage([]);
        setSelectStatus([]);
        setSelectBrand([]);
        setOptionsBrand([]);
        setOptionsName([]);
        setOptionsStatus([]);
    };
    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Passport of Product', url: '/passport-of-products' },
        { label: name, url: '/apps/visit-content' },
        { label: 'Template' },
    ];
    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} isHr={false} />
            <Filter
                loaderFilter={loaderFilter}
                selectType={selectType}
                setSelectType={setSelectType}
                optionsType={optionsType}
                selectBrand={selectBrand}
                setSelectBrand={setSelectBrand}
                optionsBrand={optionsBrand}
                setSelectName={setSelectName}
                setSelectLanguage={setSelectLanguage}
                setSelectStatus={setSelectStatus}
                selectName={selectName}
                optionsName={optionsName}
                selectLanguage={selectLanguage}
                optionsLanguage={optionsLanguage}
                selectStatus={selectStatus}
                optionsStatus={optionsStatus}
                applyFilter={applyFilter}
                clearFilter={clearFilter}
            />
            {isBrand === false && (
                <div className="card">
                    <div className="brochure-templates mt-3">
                        <Spin spinning={loader} size="large">
                            <Masonry className="gallery" elementType={'ul'}>
                                {isBrand === false &&
                                    templates.length !== 0 &&
                                    templates?.map((template, i) => {
                                        return (
                                            <TemplateCard
                                                i={i}
                                                template={template}
                                                handleClickTemplate={handleClickTemplate}
                                            />
                                        );
                                    })}
                            </Masonry>
                        </Spin>
                    </div>
                </div>
            )}
            {isBrand === true && (
                <div className="brochure-templates mt-3">
                    <Spin spinning={loader} size="large">
                        <Masonry className="gallery page-cards-ul">
                            {templates?.map((template, i) => {
                                return (
                                    <BrandTemplateCardLeft
                                        i={i}
                                        template={template}
                                        handleClickTemplate={handleClickTemplate}
                                        isContentEditable={false}
                                        width={'calc(50% - 40px)'}
                                        marginRight={i % 2 === 0 ? '16px' : 0}
                                        cardFooter={
                                            <Icon
                                                onClick={() => handleClickTemplate(template.id)}
                                                path={mdiPlus}
                                                size={0.8}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        }
                                    />
                                );
                            })}
                        </Masonry>
                    </Spin>
                </div>
            )}
        </>
    );
};

export default React.memo(Templates);
