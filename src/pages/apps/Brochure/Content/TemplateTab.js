import React, { useEffect, useState } from 'react';
import { Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import { RibbonContainer, LeftCornerRibbon } from 'react-ribbons';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FetchApiGet } from '../../../../utils/http.helper';
import ContentPageTab from './ContentPageTab';
import { mdiStar } from '@mdi/js';
import Icon from '@mdi/react';

const TemplateTab = () => {
    const { t } = useTranslation();

    const [templates, setTemplates] = useState([]);
    const [stars] = useState([1, 1, 1, 1, 1]);

    useEffect(() => {
        FetchApiGet('services/Pages/ProductPage/GetAllApprovedDesignPage', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setTemplates(res));
    }, []);

    return (
        <div>
            <Masonry className="gallery mt-4" elementType={'ul'}>
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
                                                        <Icon path={mdiStar} title="Start" size={1} color="#969696" />
                                                    ))}
                                                </div>
                                                <span className="template-name">Blue page design</span>

                                                <Link to={`/apps/brochure/template/${img.id}`}>
                                                    <Button className="btn-primary">{t('see details')}</Button>
                                                </Link>
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
    );
};

export default TemplateTab;
