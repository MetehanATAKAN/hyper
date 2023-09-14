// @flow
import React, { useEffect, useState } from 'react';
import { Button, Alert, Row, Col, Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
//actions
import { resetAuth, loginUser } from '../../redux/actions';
import { useQuery } from '../../hooks/';
// components
import { VerticalForm } from '../../components/';
import AccountLayout from './AccountLayout';
// actions
import { changeLayout, changeLayoutWidth, changeSidebarTheme, changeSidebarType } from '../../redux/actions';
// constants
import * as layoutConstants from '../../constants/layout';
import { FetchApiGet } from '../../utils/http.helper';
import { config, config2 } from '../../config';

/* bottom link of account pages */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/account/register'} className="text-muted ms-1">
                        <b>{t('Sign Up')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = (): React$Element<any> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const query = useQuery();
    const next = query.get('next');

    const [loginUserData, setLoginUserData] = useState();

    // email and password warning message
    const [emailWarningMessage, setEmailWarningMessage] = useState();
    const [passwordWarningMessage, setPasswordWarningMessage] = useState();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if (emailWarningMessage) {
            setEmailWarningMessage(null);
        }
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if (passwordWarningMessage) {
            setPasswordWarningMessage(null);
        }
    };

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));
    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email address or Username')),
            // email: yup.string().required(t('Please enter Email address')),

            // username'ler email olarak değiştirildi.
            // username: yup.string().required(t('Please enter Email address')),

            password: yup.string().required(t('Please enter Password')),
        })
    );

    // Fetch--Axios Request Token
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [changeColor, setChangeColor] = useState(false);

    const data = {
        Email: email,
        Password: password,
    };
    const onClick = () => {
        if (password === '') {
            setChangeColor(true);
        } else {
            setChangeColor(false);
        }
    };

    //------------
    const api = new APICore();
    const handleSubmit = async (formData) => {
        await fetch(`${config2.API_URL}/api/Accounts/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'access-control-allow-origin': '*',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setLoginUserData(response);
                try {
                    const token = response.data.token;
                    if (response.data.statusCode === 200) {
                        (async () => {
                            await localStorage.setItem('userEmpId', response.data.empId);
                            await localStorage.setItem('userToken', response.data.token);
                            await localStorage.setItem('userName', response.data.fullName);
                            await localStorage.setItem('userTitle', response.data.title);
                            await localStorage.setItem('userImage', response.data.profileImage);
                            await localStorage.setItem('userTitleAbb', response.data.titleAbb);
                            await localStorage.setItem('countryId', response.data.countryId);
                            await localStorage.setItem('roleId', JSON.stringify(response.data.roleId));
                            await localStorage.setItem('companyId', response.data.companyId);
                            localStorage.setItem('userPosition', response.data.positionId);
                            const user = await { email, password, token };
                            await api.setLoggedInUser(user);
                            await dispatch(loginUser(email, password, token));
                        })();
                    }
                } catch (error) {
                    response.errors[0].toLowerCase().includes('wrong')
                        ? setPasswordWarningMessage(response.errors[0])
                        : setEmailWarningMessage(response.errors[0]);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const userEmpId = localStorage.getItem('userEmpId');
    useEffect(() => {
        fetch(`${config2.API_URL}/api/Accounts/GetUserPageSettings?id=${userEmpId}`, {
            method: 'GET',
            headers: {
                'access-control-allow-origin': '*',
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + localStorage.getItem('userToken'),
            },
        })
            .then((response) => response.json())
            .then((response) => {
                switch (response.data.layoutName) {
                    case 'topnav':
                        dispatch(changeLayout(layoutConstants.LAYOUT_HORIZONTAL));
                        localStorage.setItem('layoutType', layoutConstants.LAYOUT_HORIZONTAL);
                        break;
                    case 'detached':
                        dispatch(changeLayout(layoutConstants.LAYOUT_DETACHED));
                        localStorage.setItem('layoutType', layoutConstants.LAYOUT_DETACHED);
                        break;
                    default:
                        dispatch(changeLayout(layoutConstants.LAYOUT_VERTICAL));
                        localStorage.setItem('layoutType', layoutConstants.LAYOUT_VERTICAL);
                        break;
                }
                switch (response.data.widthName) {
                    case 'boxed':
                        dispatch(changeLayoutWidth(layoutConstants.LAYOUT_WIDTH_BOXED));
                        localStorage.setItem('layoutWidth', layoutConstants.LAYOUT_WIDTH_BOXED);
                        break;
                    default:
                        dispatch(changeLayoutWidth(layoutConstants.LAYOUT_WIDTH_FLUID));
                        localStorage.setItem('layoutWidth', layoutConstants.LAYOUT_WIDTH_FLUID);
                        break;
                }
                switch (response.data.leftSidebarName) {
                    case 'light':
                        dispatch(changeSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_LIGHT));
                        localStorage.setItem('leftSidebarTheme', layoutConstants.LEFT_SIDEBAR_THEME_LIGHT);
                        break;
                    case 'dark':
                        dispatch(changeSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_DARK));
                        localStorage.setItem('leftSidebarTheme', layoutConstants.LEFT_SIDEBAR_THEME_DARK);
                        break;
                    default:
                        dispatch(changeSidebarTheme(layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT));
                        localStorage.setItem('leftSidebarTheme', layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT);
                        break;
                }
                switch (response.data.leftSidebarViewName) {
                    case 'condensed':
                        dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED));
                        localStorage.setItem('leftSidebarType', layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED);
                        break;
                    case 'scrollable':
                        dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_SCROLLABLE));
                        localStorage.setItem('leftSidebarType', layoutConstants.LEFT_SIDEBAR_TYPE_SCROLLABLE);
                        break;
                    default:
                        dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
                        localStorage.setItem('leftSidebarType', layoutConstants.LEFT_SIDEBAR_TYPE_FIXED);
                        break;
                }
            })
            .catch((error) => console.log(error));
    }, [dispatch, userEmpId]);

    const [showPassword, setShowPassword] = useState(true);
    const clickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        document.title = 'Mypossibility';
    }, []);

    return (
        <>
            {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="w-100">
                    <h4 className="text-dark-50 fw-bold">{t('Sign In')}</h4>
                    <p style={{ fontSize: '12px' }} className="text-muted mb-4 mt-2">
                        {t('Enter your email address and password to access account.')}
                    </p>
                </div>
                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    onSubmit={handleSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ email: ' ', password: ' ' }}>
                    <div className="new-login-input2-cont">
                        <div className="new-login-input2-texts">
                            <span>{t('email')}</span>
                        </div>
                        <div className="text-muted float-end" style={{ visibility: 'hidden' }}>
                            x
                        </div>
                        <div className="new-login-password-cont">
                            <input
                                className={changeColor ? 'new-login-input-empty' : 'new-login-input2'}
                                label={t('Email address')}
                                type="text"
                                name="email"
                                placeholder={t('Enter your email or username')}
                                containerClass={'mb-3'}
                                onChange={(e) => handleChangeEmail(e)}
                            />
                        </div>
                        <div style={{ color: 'red' }}>{emailWarningMessage ? emailWarningMessage : null}</div>
                    </div>
                    <div className="new-login-input2-cont">
                        <div className="new-login-input2-texts">
                            <span>{t('password')}</span>
                        </div>
                        <Link to="/account/forget-password" className="text-muted float-end">
                            <small>{t('Forgot your password ?')}</small>
                        </Link>
                        <div className="new-login-password-cont">
                            <input
                                required
                                className={changeColor ? 'new-login-input-empty' : 'new-login-input2'}
                                // className="new-login-input2"
                                placeholder={t('Enter your password')}
                                type={showPassword ? 'password' : 'text'}
                                name="password"
                                label={t('Password')}
                                onChange={(e) => handleChangePassword(e)}
                            />
                            <i className={showPassword ? 'uil-eye-slash' : 'uil-eye'} onClick={clickShowPassword} />
                        </div>
                        <div style={{ color: 'red' }}>{passwordWarningMessage ? passwordWarningMessage : null}</div>
                        <div className="mb-3 mb-2 mt-3">
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label={t('Remember me')} />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="w-100 mt-2">
                        <Button
                            style={{ width: '100%' }}
                            onClick={onClick}
                            variant="primary"
                            type="submit"
                            disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;
