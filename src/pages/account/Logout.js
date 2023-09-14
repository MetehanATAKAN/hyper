// @flow
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';

//actions
import { logoutUser } from '../../redux/actions';

// components
import AccountLayout from './AccountLayout';

import logoutIcon from '../../assets/images/logout-icon.svg';

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

const Logout = (): React$Element<any> | React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    useEffect(() => {
        document.title = 'Mypossibility';
    }, []);

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div
                    style={{
                        height: '27.18rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <div>
                        <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('See You Again!')}</h4>
                        <p className="text-muted mb-4">{t('You are now successfully sign out.')}</p>

                        <div className="logout-icon m-auto">
                            <img src={logoutIcon} alt="" />
                        </div>
                    </div>
                </div>
            </AccountLayout>
        </>
    );
};

export default Logout;
