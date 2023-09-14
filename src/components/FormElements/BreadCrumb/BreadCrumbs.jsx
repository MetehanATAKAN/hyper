import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const BreadCrumbs = ({ routes }) => {
    // Example State
    const breadCrumbProps = [
        {
            label: 'Home',
            // naming for popup has to be "items"
            items: [
                {
                    key: 1,
                    label: (
                        <Link target="_blank" to={'http://www.alipay.com/'}>
                            General
                        </Link>
                    ),
                },
                {
                    key: 2,
                    label: (
                        <Link target="_blank" to={'http://www.taobao.com/'}>
                            Layout
                        </Link>
                    ),
                },
                {
                    key: 3,
                    label: (
                        <Link target="_blank" to={'http://www.tmall.com/'}>
                            Navigation
                        </Link>
                    ),
                },
            ],
        },
        { label: 'Route 1' },
        { label: 'Route 2' },
    ];

    return (
        <Breadcrumb className="custom-breadcrumbs">
            {routes?.map(({ label, items }, i) => {
                if (items) {
                    return (
                        <Breadcrumb.Item key={i} menu={{ items }}>
                            {label}
                        </Breadcrumb.Item>
                    );
                }
                return <Breadcrumb.Item key={i}>{label}</Breadcrumb.Item>;
            })}
        </Breadcrumb>
    );
};
