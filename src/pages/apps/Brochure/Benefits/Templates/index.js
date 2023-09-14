import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Masonry from 'react-masonry-component';
import { RibbonContainer, LeftCornerRibbon } from 'react-ribbons';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiStar, mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { MultiSelectReact } from '../../../../forms/Basic';
import { benefitTab } from '../../../../../redux/actions';

const TemplatesIndex = () => {
    const { t } = useTranslation();
    const contentId = useSelector((state) => state.Brochure.contentId);
    const dispatch = useDispatch();

    const pageListPlus = useSelector( state => state.Need.pageListPlus);
    console.log('tabName',pageListPlus);
    const [templates, setTemplates] = useState([]);
    console.log(templates);
    const [selectFilter, setSelectFilter] = useState([]);
    const [stars] = useState([1, 1, 1, 1, 1]);

    const history = useHistory();

    // Select Recommended
    const [recommended, setRecommended] = useState([]);
    const [selectRecommended, setSelectRecommended] = useState([]);

    const applyFilter = () => {
        const body = {
            ProductId: selectRecommended.map((data) => data.value),
        };
        if (selectRecommended.length !== 0) {
            FetchApiPost('services/Pages/ProductPage/ApplyForTemplateFilter', 'POST', body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                setTemplates(data.data);
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    };

    // Get all
    // useEffect(() => {
    //     FetchApiGet('services/Pages/ProductPage/GetAllApprovedDesignPage', 'GET')
    //     .then((res) =>
    //     (async () => {
    //         try {
    //             if (res.status === 200) {
    //                 res.json().then((data) => {
    //                     setTemplates(data.data);
    //                 });
    //             } else if (res.status === 500) {
    //                 history.push('/error-500');
    //             }
    //         } catch (error) {
    //             console.log('error', error);
    //         }
    //     })()
    // );
    // }, [history]);

    useEffect(() => {
        FetchApiGet('services/Pages/ProductPage/GetFilterRecommendedProductsForTemplate', 'GET').then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setRecommended(
                                data.data.map((item) => ({
                                    value: item.productId,
                                    label: item.productName,
                                }))
                            );
                            setSelectRecommended(
                                data.data.map((item) => ({
                                    value: item.productId,
                                    label: item.productName,
                                }))
                            );
                        });
                    } else if (res.status === 500) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    }, [history]);

    return (
        <>
            <Row className="mt-2 page-filters ">
                <Col xs={8} sm={9} md={10} className="d-flex multi-select-auto">
                    <MultiSelectReact
                        options={recommended}
                        value={selectRecommended}
                        change={(e) => setSelectRecommended(e)}
                        placeholder={'Select Recommended'}
                    />
                </Col>

                <Col xs={4} sm={3} md={2} className="buttons">
                    <button onClick={applyFilter}>
                    <Icon path={mdiCheck} size={1} color={'#0ACF97'}  />
                    </button>

                    <button onClick={()=>setSelectRecommended([])}>
                    <Icon path={mdiDeleteSweepOutline} size={1} color={'#FA5C7C'}  />
                    </button>

                    <button>
                    <Icon path={mdiClose} size={1} color={'#6C757D'} />
                    </button>
                
                </Col>
            </Row>

            <div className="brochure-templates">
                <Masonry className="gallery" elementType={'ul'}>
                    {templates.map((img, i) => {
                        return (
                            <>
                                {img.approverName ? (
                                    <RibbonContainer className="imgContainer" style={{ maxHeight: '500px' }}>
                                        <LeftCornerRibbon
                                            backgroundColor={img.cornerColor}
                                            color="#f0f0f0"
                                            fontFamily="Arial">
                                            {img.cornerText}
                                        </LeftCornerRibbon>
                                        <Link to={`/apps/brochure/template/${img.id}`}>
                                            <img src={img.imageFile} alt={img.name} />
                                        </Link>
                                    </RibbonContainer>
                                ) : (
                                    <RibbonContainer className="imgContainer" style={{ maxHeight: '500px' }}>
                                        <Link to={`/apps/brochure/template/${img.id}`}>
                                            <img src={img.imageFile} alt={img.name} />
                                        </Link>
                                        <div className="template-card-hover">
                                            <div className="template-card-hover-item-main">
                                                <div className="items">
                                                    <div className="stars">
                                                        {stars.map((star) => (
                                                            <Icon
                                                                path={mdiStar}
                                                                title="Start"
                                                                size={1}
                                                                color="#969696"
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="template-name">Blue page design</span>

                                                    {
                                                        pageListPlus === true
                                                        ? <Link
                                                        to={{
                                                            pathname: `/apps/brochure/template/design`,
                                                            search: `?id=${img.id}&name=benefit`,
                                                            hash: '#benefit',
                                                            state: { DesignTemplate: true },
                                                        }}>
                                                        <Button className="btn-primary" onClick={()=>dispatch(benefitTab('Page List'))} >use this template</Button>
                                                    </Link>
                                                        : null
                                                    }

                                                    {/* <Link
                                                        to={{
                                                            pathname: `/apps/brochure/template/design`,
                                                            search: `?id=${img.id}&name=benefit`,
                                                            hash: '#benefit',
                                                            state: { DesignTemplate: true },
                                                        }}>
                                                        <Button className="btn-primary" onClick={()=>dispatch(benefitTab('Page List'))} >use this template</Button>
                                                    </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </RibbonContainer>
                                )}
                            </>
                        );
                    })}
                </Masonry>
            </div>
        </>
    );
};

export default TemplatesIndex;
