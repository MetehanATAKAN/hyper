import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as layoutConstants from '../constants/layout';

// All layouts/containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal/';

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from './index';
import { useEffect } from 'react';
import { FetchApiGet } from '../utils/http.helper';
import { useState } from 'react';
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));

const Routes = (props) => {
    const { layout, user } = useSelector((state) => ({
        layout: state.Layout,
        user: state.Auth.user,
    }));
    const userEmpId = localStorage.getItem('userEmpId');
    const [menuItems, setMenuItems] = useState([]);
    const [checkPage, setCheckPage] = useState([]);
    const getLayout = () => {
        let layoutCls = VerticalLayout;
        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };

    let Layout = getLayout();
    useEffect(() => {
        FetchApiGet(`services/AuthorizationSystem/ManageLeftBar/GetUsingLeftBar?id=${userEmpId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    const arr = [...data?.modules, ...data?.pages].sort((a, b) => {
                        return a.order - b.order;
                    });
                    const newArr = arr.map((el, i) => {
                        return { ...el, isTitle: false };
                    });
                    setMenuItems(newArr);
                });
            }
        });
    }, []);
    useEffect(() => {
        const arr = menuItems
            .map((el) => {
                if (!el.pages) {
                    return el.url;
                }
                if (el.pages) {
                    const child = el.pages.map((child) => {
                        return child.url;
                    });
                    return child;
                }
            })
            .flat();
        setCheckPage([...arr, '/']);
    }, [menuItems]);
    return (
        <BrowserRouter>
            <Switch>
                <Route path={publicProtectedFlattenRoutes.map((r) => r['path'])}>
                    <DefaultLayout {...props} layout={layout}>
                        <Switch>
                            {publicProtectedFlattenRoutes.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    )
                                );
                            })}
                        </Switch>
                    </DefaultLayout>
                </Route>
                <Route path={authProtectedFlattenRoutes.map((r) => r['path'])}>
                    <Layout {...props} layout={layout} user={user}>
                        <Switch>
                            {authProtectedFlattenRoutes.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={
                                                checkPage.includes(route.path) ? route.component : ErrorPageNotFound
                                            }
                                        />
                                    )
                                );
                            })}
                        </Switch>
                    </Layout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
