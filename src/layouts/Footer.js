// @flow
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = (): React$Element<any> => {
    const currentYear = new Date().getFullYear();
    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <Row>
                        <Col className='footer-content-container' >{currentYear} © Grand Medical Group</Col>
                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
