import React, { useState } from 'react';
import AccountLayout from './AccountLayout';
import { Button } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import validations from './Validations';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { config2 } from '../../config';
const ChangePassword = () => {
    const { t } = useTranslation();
    // password is true redirect to login
    const [isPassword, setIsPassword] = useState();
    //is passwords equal
    const [isPasswordEqual, setIsPasswordEqual] = useState();
    let { token } = useParams();

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordAgain: '',
        },
        onSubmit: (values) => {
            if (formik.values.password === formik.values.passwordAgain) {
                setTimeout(() => {
                    setIsPassword(true);
                }, 2500);
                setIsPasswordEqual(true);
                const passwordData = {
                    Password: formik.values.password,
                    Id: Number(token),
                };
                fetch(`${config2.API_URL}/api/Accounts/UpdatePasswordChange`, {
                    method: 'POST',
                    body: JSON.stringify(passwordData),
                    headers: {
                        'access-control-allow-origin': '*',
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
            } else {
                setIsPassword(false);
                setIsPasswordEqual(false);
            }
        },
        validationSchema: validations,
    });
    return (
        <div>
            {isPassword === true ? <Redirect to={'/account/login'}></Redirect> : null}
            <AccountLayout>
                <div className="text-center m-auto">
                    <h4 className="text-dark-50 text-center mt-0 font-weight-bold">{t('Set Password')}</h4>
                    <p className="text-muted mb-4">{t('Set your new password')}</p>
                    {isPasswordEqual === false ? (
                        <p style={{ color: 'red' }}>{t('Passwords do not match')}</p>
                    ) : isPasswordEqual === true ? (
                        <p style={{ color: 'green' }}>{t('New password creation successful')}</p>
                    ) : null}
                </div>
                <div className="new-login-input2-cont">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="new-login-password-cont">
                            <input
                                className={'new-login-input2'}
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                placeholder={t('Your new password')}
                            />
                            {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
                            <br />
                            <br />
                            <input
                                className={'new-login-input2'}
                                id="passwordAgain"
                                name="passwordAgain"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.passwordAgain}
                                onBlur={formik.handleBlur}
                                placeholder={t('Your new password again')}
                            />
                            {formik.errors.passwordAgain && formik.touched.passwordAgain && (
                                <div>{formik.errors.passwordAgain}</div>
                            )}
                            <br />
                            <br />
                            <div className="mb-3 w-100">
                                <Button variant="primary" type="submit">
                                    {t('Save')}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </AccountLayout>
        </div>
    );
};

export default ChangePassword;
