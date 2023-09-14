import React from 'react';
import { Card } from 'react-bootstrap';
import { Image } from 'antd';
import Icon from '@mdi/react';
import { mdiEyeOutline, mdiPlus } from '@mdi/js';
import { useTranslation } from 'react-i18next';
const TemplateCard = (props) => {
    const { i, template, handleClickTemplate } = props;
    const { t } = useTranslation();
    return (
        <Card key={i} className="text-center templates-card">
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
            <Card.Footer onClick={() => handleClickTemplate(template.id)}>
                <Icon path={mdiPlus} size={0.8} />
            </Card.Footer>
        </Card>
    );
};

export default React.memo(TemplateCard);
