import { Breadcrumb } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../assets/scss/custom/components/breadCrumbs.scss';
const BreadCrumb = ({ breadCrumbProps, isHr = true }) => {
    const { t } = useTranslation();
    return (
        <>
            <hr style={{ margin: 0, padding: 0, color: '#CED4DA', opacity: 1 }} />
            <Breadcrumb className="breadcrumb">
                {breadCrumbProps?.map((el, i) => (
                    <Breadcrumb.Item key={i}>
                        {el.url ? (
                            <Link to={el.url} style={{ color: '#00A0DF', fontSize: '0.9rem' }}>
                                {t(el.label)}
                            </Link>
                        ) : (
                            <span style={{ color: '#6C757D' }}>{t(el.label)}</span>
                        )}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            {isHr && <hr style={{ margin: '0 0 5px 0', padding: 0, color: '#CED4DA', opacity: 1 }} />}
        </>
    );
};

export default BreadCrumb;
