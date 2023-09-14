// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//actions
import { resetAuth, signupUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Already have account?')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, userSignUp, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            fullname: yup.string().required(t('Please enter Full Name')),
            email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        dispatch(signupUser(formData['fullname'], formData['email'], formData['password']));
    };

    return (
        <>
            {userSignUp ? <Redirect to={'/account/confirm'}></Redirect> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="w-100">
                    <h4 className="text-dark-50 fw-bold">{t('Free Sign Up')}</h4>
                    <p style={{ fontSize: '12px' }} className="text-muted mb-4 mt-2">
                        {t("Don't have an account? Create your account, it takes less than a minute.")}
                    </p>
                </div>
                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <FormInput
                        label={t('full name')}
                        type="text"
                        name="fullname"
                        placeholder={t('enter your name')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('email address')}
                        type="email"
                        name="email"
                        placeholder={t('enter your email')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('password')}
                        type="password"
                        name="password"
                        placeholder={t('enter your password')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('I accept Terms and Conditions')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3 text-muted'}
                    />

                    <div className="mb-3 mb-0 text-center w-100">
                        <Button style={{ width: '100%' }} variant="primary" type="submit" disabled={loading}>
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Register;
