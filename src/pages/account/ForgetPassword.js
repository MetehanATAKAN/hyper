// @flow
import React, { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//actions
import { resetAuth, forgotPassword } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';
import { useState } from 'react';
import { config2 } from '../../config';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Back to')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const ForgetPassword = (): React$Element<any> => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);
    const [statusSendEmail, setStatusSendEmail] = useState({ status: 0, msg: '' });
    const { loading, passwordReset, resetPasswordSuccess, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        passwordReset: state.Auth.passwordReset,
        resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            email: yup.string().email('Not a proper email').required(t('Please enter Email')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        // dispatch(forgotPassword(formData['username']));
        const userInfo = {
            email: formData['email'],
            username: formData['username'],
        };
        fetch(`${config2.API_URL}/api/Accounts/ForgetPassword`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'access-control-allow-origin': '*',
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) =>
            (async () => {
                try {
                    res.status === 409 &&
                        res.json().then((json) => setStatusSendEmail({ status: 409, msg: json.errors }));
                    res.status === 200 &&
                        res.json().then((json) => setStatusSendEmail({ status: 200, msg: 'You can check your email' }));
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    useEffect(() => {
        document.title = 'Mypossibility';
    }, []);

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="w-100">
                    <h4 className="text-dark-50 fw-bold">{t('Reset Password')}</h4>
                    <p style={{ fontSize: '12px' }} className="text-muted mb-4 mt-2">
                        {t(
                            "Enter your email address and we'll send you an email with instructions to reset your password"
                        )}
                    </p>
                </div>
                {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.message}</Alert>}

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                {!passwordReset && (
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                        <FormInput
                            label={t('user name')}
                            type="text"
                            name="username"
                            placeholder={t('enter your user name')}
                            containerClass={'mb-3'}
                        />
                        <FormInput
                            label={t('email')}
                            type="text"
                            name="email"
                            placeholder={t('enter your email')}
                            containerClass={'mb-3'}
                        />
                        {statusSendEmail.msg !== '' && (
                            <div style={{ color: statusSendEmail.status === 200 ? 'green' : 'red' }}>
                                {statusSendEmail.msg}
                            </div>
                        )}
                        <div className="mb-3 mb-0">
                            <Button className="w-100" variant="primary" type="submit" disabled={loading}>
                                {t('Submit')}
                            </Button>
                        </div>
                    </VerticalForm>
                )}
            </AccountLayout>
        </>
    );
};

export default ForgetPassword;
