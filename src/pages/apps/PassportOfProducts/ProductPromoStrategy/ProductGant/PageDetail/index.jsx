import React, { useEffect } from 'react';
import { Image } from 'antd';
import { useSelector } from 'react-redux';
import './pageDetail.scss';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiEyeOutline } from '@mdi/js';
const StrategyPageDetail = () => {
    const pages = JSON.parse(localStorage.getItem('pages'));
    console.log('dasdassd', pages);
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('pages');
        };

        window.addEventListener('unload', handleBeforeUnload);

        return () => {
            window.removeEventListener('unload', handleBeforeUnload);
        };
    }, []);
    const { t } = useTranslation();
    return (
        <Image.PreviewGroup
            preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}>
            <div className="strategy-page-img-container">
                {pages?.map((img, i) => (
                    <div className="img-container">
                        <label>{img.pageType}</label>
                        <Image
                            width={250}
                            height={250}
                            src={img.imgPath}
                            preview={{
                                mask: (
                                    <span className="img-mask">
                                        <Icon path={mdiEyeOutline} size={0.65} />
                                        {t('Preview')}
                                    </span>
                                ),
                            }}
                        />
                    </div>
                ))}
            </div>
        </Image.PreviewGroup>
    );
};

export default StrategyPageDetail;
