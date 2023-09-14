// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

import Logo from '../../assets/images/logo.png';
import GMGLogo from '../../assets/images/logo-dark-grand.png';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiEmoticonCryOutline } from '@mdi/js';

const ErrorPageNotFound = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card>
                                {/* logo */}
                                <Card.Header className="pt-4 pb-4 text-center">
                                    <Link to="/">
                                        <span>
                                            <img src={GMGLogo} alt="GMG" height="36" />
                                        </span>
                                    </Link>
                                </Card.Header>

                                <Card.Body className="p-4">
                                    <div className="text-center">
                                        <h1 className="text-error">
                                            <div>
                                                <span>4</span>
                                                <Icon
                                                    path={mdiEmoticonCryOutline}
                                                    size={4}
                                                    style={{ verticalAlign: 'sub' }}
                                                    color="#FA5C7C"
                                                />
                                                <span>3</span>
                                            </div>
                                        </h1>
                                        <h3 className="mt-3" style={{ color: '#6C757D' }}>
                                            {t('Restricted Page!')}
                                        </h3>
                                        <p className="mt-3" style={{ color: '#6C757D' }}>
                                            {t(
                                                'You are not authorized to view this page. If you think that is a mistake, please contact your administration.'
                                            )}
                                        </p>

                                        {/* <Link 
                                        className="btn btn-primary mt-3 d-flex justify-content-center m-auto align-items-center text-center" 
                                        to="/"
                                        style={{width:'max-content'}}
                                        >
                                        <Icon path={mdiArrowLeft} size={1} /> 
                                        <span className='ms-2'>
                                        {t('return home')}
                                        </span>
                                        </Link> */}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* <footer className="footer footer-alt">2018 - 2021 © Hyper - Coderthemes.com</footer> */}
        </React.Fragment>
    );
};

export default ErrorPageNotFound;
