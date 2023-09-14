import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import { BrandTemplateCardLeft, BrandTemplateCardRight } from './BrandTemplateCard';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { Divider, Spin } from 'antd';
import {
    statusApprovalOptions,
    statusApprovedOptions,
    statusRedactOptions,
    statusRejectOptions,
    statusTranslateOptions,
} from './TemplateStatus';
import { useDispatch } from 'react-redux';
import { resetItemId, resetItemName, resetTempalteId, setIsPage } from '../../../../redux/actions';
import ActionModals from '../../../../components/Modals/ActionModal';
import Filter from './Filter';
import BreadCrumb from '../../../../components/BreadCrumb';
import Duplicate from './Duplicate';
import ContentModal from './ContentModal';
import Dropdowns from '../../../../components/Dropdowns';
import '../../../../assets/scss/custom/visitContent/templatesCards.scss';
import EmptyCard from '../../../../components/EmptyCard';
import Icon from '@mdi/react';
import { mdiContentDuplicate, mdiFolder, mdiPlus } from '@mdi/js';
import { Badge, IconButton } from '@mui/material';
import { styled } from '@material-ui/styles';
import DocumentModal from './DocumentModal';

const TemplateById = () => {
    const { t } = useTranslation();
    const { ids, name } = useParams('id');
    const history = useHistory();
    const dispatch = useDispatch();
    const user = localStorage.getItem('userName');
    const [loader, setLoader] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [selectType, setSelectType] = useState();
    const [selectName, setSelectName] = useState([]);
    const [selectLanguage, setSelectLanguage] = useState([]);
    const [optionsLanguage, setOptionsLanguage] = useState([]);
    const [selectStatus, setSelectStatus] = useState([
        { value: 1, label: t('Redact') },
        // { value: 2, label: t('Send to Approval') },
        // { value: 3, label: t('Approved') },
    ]);
    const [selectBrand, setSelectBrand] = useState([]);
    const [optionsStatus, setOptionsStatus] = useState([
        { value: 1, label: t('Redact') },
        // { value: 2, label: t('Send to Approval') },
        // { value: 3, label: t('Approved') },
    ]);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [dataById, setDataById] = useState(null);
    const [breadcrumbName, setBreadcrumbName] = useState('');
    const [pageById, setPageById] = useState([]);
    const [pageByIdV2, setPageByIdV2] = useState([]);
    const [item, setItem] = useState(null);
    const [showContentModal, setShowContentModal] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const resetRedux = () => {
        dispatch(resetItemId());
        dispatch(resetItemName());
        dispatch(resetTempalteId());
        dispatch(setIsPage(false));
    };
    useEffect(() => {
        switch (name) {
            case 'Need':
                setLoader(true);
                FetchApiGet(`services/Pages/Need/GetNeedById?id=${ids}`, 'GET')
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            res.json().then(({ data }) => {
                                setDataById(data);
                                setPageById(
                                    data.productPages?.map((page) => {
                                        return page.id;
                                    })
                                );
                                setBreadcrumbName(data.needName);
                            });
                        }
                        if (res.status === 500 || res.status === 502) {
                            resetRedux();
                            history.push('/error-500');
                        }
                    })
                    .catch((error) => console.log(error));
                break;
            case 'Profile':
                setLoader(true);
                FetchApiGet(`services/Pages/Profile/GetProfileById?id=${ids}`, 'GET')
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            res.json().then(({ data }) => {
                                setDataById(data);
                                setPageById(
                                    data.productPages?.map((page) => {
                                        return page.id;
                                    })
                                );
                                setBreadcrumbName(data.profileName);
                            });
                        }
                        if (res.status === 500 || res.status === 502) {
                            resetRedux();
                            history.push('/error-500');
                        }
                    })
                    .catch((error) => console.log(error));
                break;
            case 'Benefit':
                setLoader(true);
                FetchApiGet(`services/Pages/Benefit/GetBenefitById?id=${ids}`, 'GET')
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            res.json().then(({ data }) => {
                                setDataById(data);
                                setPageById(
                                    data.productPages?.map((page) => {
                                        return page.id;
                                    })
                                );
                                setBreadcrumbName(data.benefitName);
                            });
                        }
                        if (res.status === 500 || res.status === 502) {
                            resetRedux();
                            history.push('/error-500');
                        }
                    })
                    .catch((error) => console.log(error));
                break;
            case 'MechanismPage':
                setLoader(true);
                FetchApiGet(`services/Pages/Benefit/GetBenefitById?id=${ids}`, 'GET')
                    .then((res) => {
                        if (res.status === 200 || res.status === 201) {
                            res.json().then(({ data }) => {
                                setDataById(data);
                                setPageById([data.mechanismPage.id]);
                                setBreadcrumbName(data.benefitName);
                            });
                        }
                        if (res.status === 500 || res.status === 502) {
                            resetRedux();
                            history.push('/error-500');
                        }
                    })
                    .catch((error) => console.log(error));
                break;
            default:
                break;
        }
    }, [ids, name]);
    useEffect(() => {
        if (!Array.isArray(pageById)) return;
        if (pageById.length > 0) {
            setLoader(true);
            const data = {
                ids: pageById,
            };
            FetchApiPost(`services/Pages/ProductPage/GetProductPageByIds`, 'POST', data)
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        res.json().then(({ data }) => {
                            setLoader(false);
                            setTemplates(data);
                        });
                    }
                    if (res.status === 500 || res.status === 502) {
                        resetRedux();
                        history.push('/error-500');
                    }
                })
                .catch((error) => console.log(error));
        }
    }, [pageById]);
    useEffect(() => {
        if (dataById === null) return;
        switch (name) {
            case 'Profile':
                setSelectType({ value: 0, label: t('Profile') });
                setSelectBrand([{ value: dataById.brand.globalBrandId, label: dataById.brand.globalBrandName }]);
                setSelectLanguage([{ value: dataById.language.languageAbbId, label: dataById.language.languageAbb }]);
                setSelectName([{ value: dataById.id, label: dataById.profileName }]);
                break;
            case 'Need':
                setSelectType({ value: 1, label: t('Need') });
                setSelectBrand([{ value: dataById.brand.globalBrandId, label: dataById.brand.globalBrandName }]);
                setSelectName([{ value: dataById.id, label: dataById.needName }]);
                setSelectLanguage([{ value: dataById.language.languageAbbId, label: dataById.language.languageAbb }]);
                break;
            case 'Benefit':
                setSelectType({ value: 2, label: t('Benefit') });
                setSelectBrand([{ value: dataById.brand.globalBrandId, label: dataById.brand.globalBrandName }]);
                setSelectName([{ value: dataById.id, label: dataById.benefitName }]);
                setSelectLanguage([{ value: dataById.language.languageAbbId, label: dataById.language.languageAbb }]);
                break;
            case 'MechanismPage':
                setSelectType({ value: 4, label: t('Mechanism of Action') });
                setSelectBrand([{ value: dataById.brand.globalBrandId, label: dataById.brand.globalBrandName }]);
                setSelectName([{ value: dataById.id, label: dataById.benefitName }]);
                setSelectLanguage([{ value: dataById.language.languageAbbId, label: dataById.language.languageAbb }]);
                break;
            default:
                break;
        }
    }, [dataById]);

    //GET LANGUAGE
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllLanguageAbb', 'GET').then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((data) => {
                    setOptionsLanguage(data?.map((x) => ({ value: x.LanguageAbbId, label: x.LanguageAbb })));
                });
            } else if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            } else {
                setOptionsLanguage([]);
            }
        });
    }, []);

    const getStatusOptions = (status, isSub) => {
        // isSub === true => this page sub
        // isSub === false => this page master
        if (!isSub) {
            switch (status) {
                case 1:
                    return statusRedactOptions;
                case 2:
                    return statusApprovalOptions;
                case 3:
                    if (name !== 'Profile') {
                        return statusApprovedOptions;
                    }
                    if (name === 'Profile') {
                        const arr = statusApprovedOptions.filter((x) => x.id !== 5);
                        return arr;
                    }
                    break;
                case 4:
                    return statusRejectOptions;
                case 5:
                    return statusTranslateOptions;
                default:
                    break;
            }
        }
        if (isSub) {
            switch (status) {
                case 1:
                    return statusRedactOptions.filter((x) => x.id !== 6);
                case 2:
                    return statusApprovalOptions.filter((x) => x.id !== 6);
                case 3:
                    if (name !== 'Profile') {
                        return statusApprovedOptions.filter((x) => x.id !== 6);
                    }
                    if (name === 'Profile') {
                        const arr = statusApprovedOptions.filter((x) => x.id !== 5 && x.id !== 6);
                        return arr;
                    }
                    break;
                case 4:
                    return statusRejectOptions;
                case 5:
                    return statusTranslateOptions;
                default:
                    break;
            }
        }
    };
    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        setPageByIdV2(itemId);
        setItem({
            id: itemId,
            visitContent: name,
            visitContentId: Number(ids),
            modifiedBy: user,
        });
        switch (statusId) {
            case 0: // DELETE
                return setShowDeleteModal(true);
            case 6: // DUPLICATE
                if (name === 'MechanismPage') return;
                setShowDuplicateModal(true);
                break;
            case 9: // EDIT
                history.push(`/apps/template-design/itemid=${ids}&productname=${name}&templateid=${itemId}&sub=false`);
                dispatch(setIsPage(true));
                break;
            default:
                break;
        }
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
    const mechanismApplyFilter = () => {
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
        if (selectLanguage.length === 0 || selectStatus.length === 0) return;
        switch (name) {
            case 'Profile':
                profileApplyFilter();
                break;
            case 'Need':
                needApplyFilter();
                break;
            case 'Benefit':
                benefitApplyFilter();
                break;
            case 'MechanismPage':
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
        setOptionsStatus([]);
    };

    const openContentModal = (ids) => {
        const findObject = () => {
            let foundObject = templates.find((item) => item.id === Number(ids));
            if (!foundObject) {
                templates.forEach((item) => {
                    if (item.subPage === null) return;
                    foundObject = item.subPage.id === Number(ids) && item.subPage;
                    if (foundObject) return foundObject;
                    if (!foundObject) return false;
                });
            }
            return foundObject;
        };
        let findPageById = findObject();
        const { id, jsonPath, htmlPath, isApproved, content } = { ...findPageById };
        setItem({
            id,
            jsonFile: jsonPath,
            htmlFile: htmlPath,
            isApproved,
            content,
            modifiedBy: user,
            status: true,
        });
        setShowContentModal(true);
    };
    const duplicateMasterBtn = (id) => {
        const data = { masterPageId: Number(id), createdBy: user };
        FetchApiPost('services/Pages/ProductPage/DuplicateSubPage', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    applyFilter();
                });
            }
            if (res.status === 500 || res.status === 502) {
                resetRedux();
                history.push('/error-500');
            }
        });
    };
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            // right: 0,
            top: 8,
            width: '8px',
            height: '12px',
            fontSize: '9px',
            padding: '4px',
            opacity: 0.8,
        },
    }));
    const [documents, setDocuments] = useState(null);
    const addDocumentTemplate = (id, docs) => {
        setDocuments({ id: id, docs });
        setShowDocumentModal(true);
    };
    const [breadCrumbProps, setBreadCrumbProps] = useState([
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Passport of Product', url: '/passport-of-products' },
        { label: name, url: '/apps/visit-content' },
    ]);
    useEffect(() => {
        if (breadcrumbName === '') return;
        setBreadCrumbProps((state) => [...state, { label: breadcrumbName }]);
    }, [breadcrumbName]);

    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} isHr={false} />
            <Filter
                selectType={selectType}
                setSelectType={setSelectType}
                selectBrand={selectBrand}
                setSelectBrand={setSelectBrand}
                setSelectName={setSelectName}
                setSelectLanguage={setSelectLanguage}
                setSelectStatus={setSelectStatus}
                selectName={selectName}
                selectLanguage={selectLanguage}
                optionsLanguage={optionsLanguage}
                selectStatus={selectStatus}
                optionsStatus={optionsStatus}
                applyFilter={applyFilter}
                clearFilter={clearFilter}
                ids={ids}
                name={name}
            />
            <div className="split">
                <div className="brochure-templates mt-3 split-left-area">
                    {/* <Spin spinning={loader} size="large"> */}
                    <Masonry className="gallery page-cards-ul">
                        {templates?.map((template, i) => {
                            return (
                                <BrandTemplateCardLeft
                                    i={i}
                                    template={template}
                                    isContentEditable={true}
                                    isMaster="Master"
                                    breadcrumbName={breadcrumbName}
                                    cardFooter={
                                        <>
                                            <IconButton
                                                onClick={() => addDocumentTemplate(template.id, template.documents)}
                                                aria-label="cart">
                                                <StyledBadge
                                                    badgeContent={template.documents.length}
                                                    max={10}
                                                    color="error">
                                                    <Icon path={mdiFolder} size={0.7} />
                                                </StyledBadge>
                                            </IconButton>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <Dropdowns
                                                    item={`?${template.id}`}
                                                    option={getStatusOptions(template.isApproved, false)}
                                                    onClick={statusClick}
                                                />
                                            </span>
                                        </>
                                    }
                                    openContentModal={openContentModal}
                                />
                            );
                        })}
                    </Masonry>
                    {/* </Spin> */}
                </div>
                <Divider
                    type="vertical"
                    className="page-split-divider"
                    style={{
                        height: '100vh',
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        display: window.innerWidth > 883 ? 'block' : 'none',
                    }}
                />
                <div className="split-right-area brochure-templates mt-3">
                    {templates?.map((template, i) =>
                        template.subPage === null && name !== 'MechanismPage' ? (
                            <EmptyCard
                                className={'page-empty-card'}
                                cardBody={
                                    <div
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '4rem',
                                        }}>
                                        <Link to={`/apps/templates/connect=${ids}&product=${name}&sub=${template.id}`}>
                                            <Icon path={mdiPlus} size={2} color={'#6C757D'} />
                                        </Link>
                                        <Icon
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => duplicateMasterBtn(template.id)}
                                            path={mdiContentDuplicate}
                                            size={2}
                                            color={'#6C757D'}
                                        />
                                    </div>
                                }
                            />
                        ) : (
                            name !== 'MechanismPage' && (
                                <Masonry className="gallery page-cards-ul">
                                    <BrandTemplateCardRight
                                        i={template.subPage.id}
                                        template={template.subPage}
                                        isContentEditable={true}
                                        isMaster="Surplus"
                                        breadcrumbName={breadcrumbName}
                                        cardFooter={
                                            <>
                                                <IconButton
                                                    onClick={() =>
                                                        addDocumentTemplate(
                                                            template.subPage.id,
                                                            template.subPage.documents
                                                        )
                                                    }
                                                    aria-label="cart">
                                                    <StyledBadge
                                                        badgeContent={template.subPage.documents.length}
                                                        max={10}
                                                        color="error">
                                                        <Icon path={mdiFolder} size={0.7} />
                                                    </StyledBadge>
                                                </IconButton>
                                                <span style={{ marginLeft: 'auto' }}>
                                                    <Dropdowns
                                                        item={`?${template.subPage.id}`}
                                                        option={getStatusOptions(template.subPage.isApproved, true)}
                                                        onClick={statusClick}
                                                    />
                                                </span>
                                            </>
                                        }
                                        openContentModal={openContentModal}
                                    />
                                </Masonry>
                            )
                        )
                    )}
                </div>
            </div>
            {showDeleteModal && (
                <ActionModals
                    type="delete"
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    url={'services/Pages/ProductPage/DeleteProductPage'}
                    postData={item}
                    dataName={breadcrumbName}
                    applyFilter={applyFilter}
                />
            )}
            {showDuplicateModal && (
                <Duplicate
                    showModal={showDuplicateModal}
                    setShowModal={setShowDuplicateModal}
                    applyFilter={applyFilter}
                    data={dataById}
                    page={pageByIdV2}
                    name={name}
                />
            )}
            {showContentModal && (
                <ContentModal
                    showModal={showContentModal}
                    setShowModal={setShowContentModal}
                    item={item}
                    applyFilter={applyFilter}
                    breadcrumbName={breadcrumbName}
                />
            )}
            {showDocumentModal && (
                <DocumentModal
                    showModal={showDocumentModal}
                    setShowModal={setShowDocumentModal}
                    documents={documents}
                    applyFilter={applyFilter}
                />
            )}
        </>
    );
};

export default React.memo(TemplateById);
