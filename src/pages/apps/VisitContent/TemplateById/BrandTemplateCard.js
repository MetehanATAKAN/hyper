import React, { useEffect } from 'react';
import Icon from '@mdi/react';
import { Image } from 'antd';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiEyeOutline } from '@mdi/js';
export const BrandTemplateCardLeft = (props) => {
    const {
        i,
        template,
        isContentEditable,
        cardFooter,
        openContentModal,
        width,
        marginRight,
        isMaster,
        breadcrumbName,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
        if (!template.hasOwnProperty('content')) return;
        const parser = new DOMParser();
        const element = document.getElementById(`page-contents${template.id}`);
        const string =
            template.content !== null
                ? Buffer.from(template.content, 'base64').toString('utf-8')
                : Buffer.from('WW91IGNhbiBlbnRlciB0aGUgY29udGVudCBoZXJl', 'base64').toString('utf-8');
        const child = parser.parseFromString(string, 'text/html');
        element.appendChild(child.body);
    }, []);
    return (
        <div className="page-template-brand" style={{ width: width, marginRight: marginRight }}>
            <div className="page-template-brand__left-section">
                <Card key={i} className="text-center templates-card-brand">
                    <Card.Body className="p-0">
                        <Image.PreviewGroup>
                            <Image
                                preview={{
                                    mask: (
                                        <span className="img-mask">
                                            <Icon path={mdiEyeOutline} size={0.65} />
                                            {t('Preview')}
                                        </span>
                                    ),
                                }}
                                height={'100%'}
                                src={template.imgPath || template.imageFile}
                            />
                        </Image.PreviewGroup>
                    </Card.Body>
                    <Card.Footer>{cardFooter}</Card.Footer>
                </Card>
            </div>
            <div className="page-template-brand__right-section">
                <div className="page-info">
                    <span className="page-status">{t('redact')}</span>
                    <span className="page-subject">{t(isMaster)}</span>
                    <span className="page-language">
                        {template.hasOwnProperty('language') && template.language !== null
                            ? template.language.languageAbb
                            : null}
                    </span>
                </div>
                <span className="page-name">{breadcrumbName}</span>
                <span
                    id={`page-contents${template.id}`}
                    onClick={() => isContentEditable && openContentModal(template.id)}
                    style={{ cursor: isContentEditable ? 'pointer' : 'default' }}
                    className="page-content"></span>
            </div>
        </div>
    );
};

export const BrandTemplateCardRight = (props) => {
    const {
        i,
        template,
        isContentEditable,
        cardFooter,
        openContentModal,
        width,
        marginRight,
        isMaster,
        breadcrumbName,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
        if (!template.hasOwnProperty('content')) return;
        const parser = new DOMParser();
        const element = document.getElementById(`page-contents${template.id}`);
        const string =
            template.content !== null
                ? Buffer.from(template.content, 'base64').toString('utf-8')
                : Buffer.from('WW91IGNhbiBlbnRlciB0aGUgY29udGVudCBoZXJl', 'base64').toString('utf-8');
        const child = parser.parseFromString(string, 'text/html');
        element.appendChild(child.body);
    }, []);
    return (
        <div className="page-template-brand" style={{ width: width, marginRight: marginRight }}>
            <div className="page-template-brand__right-section">
                <div className="page-info">
                    <span className="page-status">{t('redact')}</span>
                    <span className="page-subject" style={{ color: '#02A8B5' }}>
                        {t(isMaster)}
                    </span>
                    <span className="page-language">
                        {template.hasOwnProperty('language') && template.language !== null
                            ? template.language.languageAbb
                            : null}
                    </span>
                </div>
                <span className="page-name">{breadcrumbName}</span>
                <span
                    id={`page-contents${template.id}`}
                    onClick={() => isContentEditable && openContentModal(template.id)}
                    style={{ cursor: isContentEditable ? 'pointer' : 'default' }}
                    className="page-content"></span>
            </div>
            <div className="page-template-brand__left-section">
                <Card key={i} className="text-center templates-card-brand">
                    <Card.Body className="p-0">
                        <Image.PreviewGroup>
                            <Image
                                preview={{
                                    mask: (
                                        <span className="img-mask">
                                            <Icon path={mdiEyeOutline} size={0.65} />
                                            {t('Preview')}
                                        </span>
                                    ),
                                }}
                                height={'100%'}
                                src={template.imgPath || template.imageFile}
                            />
                        </Image.PreviewGroup>
                    </Card.Body>
                    <Card.Footer>{cardFooter}</Card.Footer>
                </Card>
            </div>
        </div>
    );
};
