// @flow
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Logo from '../../assets/images/logo-dark-grand.png';

type AccountLayoutProps = {
    bottomLinks?: React$Element<any>,
    children?: any,
};

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps): React$Element<any> => {
    const { t } = useTranslation();

    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    return (
        <>
            {/* <div className="text-cont">
                <h2>I love the color !</h2>
                <h4>"It's elegant templete. I love it very much!."</h4>
                <h5>-Hyper Admin User</h5>
            </div> */}
            <div className="account-pagess">
                <Container style={{ alignSelf: 'center' }}>
                    <Row className="login-cont">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card className="col-cont">
                                {/* logo */}
                                <Card.Header style={{ borderBottom: 'none' }} className="pt-4 pb-4 logo-cont">
                                    <Link to="/">
                                        <span>
                                            <img className="new-login-img" src={Logo} alt="" height="50" />
                                        </span>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="p-4">{children}</Card.Body>
                                {/* bottom links */}
                                {bottomLinks}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* <footer className="footer footer-alt">{t('2018 - 2021 © Hyper - Coderthemes.com')}</footer> */}
        </>
    );
};

export default AccountLayout;
