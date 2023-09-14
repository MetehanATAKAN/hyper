import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Masonry from 'react-masonry-component';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { RibbonContainer, LeftCornerRibbon } from 'react-ribbons';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiStar, mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import { Button, Col, Row } from 'react-bootstrap';
import { MultiSelectReact } from '../../../../forms/Basic';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Templates = () => {   
    const { t } = useTranslation();

    const [templates, setTemplates] = useState([]);
    const [stars] = useState([1, 1, 1, 1, 1]);
    const templateId = useSelector((state) => state.Brochure.disadvantageContentId);
    const history = useHistory();

    // Select Recommended
    const [recommended, setRecommended] = useState([]);
    const [selectRecommended, setSelectRecommended] = useState([]);

    const applyFilter = () => {
        const body = {
            ProductId: selectRecommended.map((data) => data.value),
        };
        if (selectRecommended.length !== 0) {
            FetchApiPost('services/Pages/ProductPage/ApplyForTemplateFilter', 'POST', body).then((res) =>
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
        }else if (selectRecommended.length === 0) {
            FetchApiGet('services/Pages/ProductPage/GetAllApprovedDesignPage', 'GET')
                .then((res) => res.json())
                .then((res) => res.data)
                .then((res) => setTemplates(res));
        }
    };

    // useEffect(() => {
    //     FetchApiGet('services/Pages/ProductPage/GetAllApprovedDesignPage', 'GET')
    //         .then((res) => res.json())
    //         .then((res) => res.data)
    //         .then((res) => setTemplates(res));
    // }, []);

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
            <div className='mt-2 mb-2 disadvantage-page-gallery-filter'>
                <Col md={10} className='d-flex flex-wrap' style={{rowGap: ".5rem", alignItems: "center"}}>
                        <MultiSelectReact
                            options={recommended}
                            value={selectRecommended}
                            change={(e) => setSelectRecommended(e)}
                            placeholder={'Select Recommended'}
                        />
                </Col>
                <Col md={1} className='need-filter__buttons'>
                    <button onClick={applyFilter}>
                        <Icon path={mdiCheck} size={1} color={'#0ACF97'}
                        />
                    </button>

                    <button onClick={() => setSelectRecommended([])}>
                        <Icon path={mdiDeleteSweepOutline} size={1} color={'#FA5C7C'}
                        />
                    </button>

                    <button>
                        <Icon path={mdiClose} size={1} color={'#6C757D'}
                        />
                    </button>
                </Col>
            </div>

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
                                        {
                                            templateId !== null ? (
                                            <Link to={`/apps/brochure/template/${img.id}`}>
                                                <img src={img.imageFile} alt={img.name} />
                                            </Link>
                                            ) : (
                                                <a>
                                                    <img src={img.imageFile} alt={img.name} />
                                                </a>
                                            )
                                        }
                                        
                                    </RibbonContainer>
                                ) : (
                                    <RibbonContainer className="imgContainer" style={{ maxHeight: '500px' }}>
                                        {
                                            templateId !== null ? (
                                            <Link to={`/apps/brochure/template/${img.id}`}>
                                                <img src={img.imageFile} alt={img.name} />
                                            </Link>
                                            ) : (
                                                <a to="#">
                                                    <img src={img.imageFile} alt={img.name} />
                                                </a>
                                            )
                                        }
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
                                                    <span className="template-name">{t('Blue page design')}</span>

                                                        
                                                    {
                                                        templateId !== null ? (
                                                            <Link
                                                                to={{
                                                                    pathname: `/apps/brochure/disadvantages/design`,
                                                                    search: `?id=${img.id}&name=disadvantages`,
                                                                    hash: '#the-hash',
                                                                    state: { DisadvantagesDesign: true },
                                                                }}>
                                                                <Button className="btn-primary">{t('use this template')}</Button>
                                                            </Link>
                                                        ) : 
                                                        (
                                                            <></>
                                                        )
                                                        
                                                    }
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
  )
}

export default Templates