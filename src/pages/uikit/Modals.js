// @flow
import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import classNames from 'classnames';

// components
import PageTitle from '../../components/PageTitle';

import logodark from '../../assets/images/logo-dark.png';

export const ModalSizes = ({sizem,title,tab}) => {
   
    const [modal, setModal] = useState(false);
    
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    /**
     * Opens large modal
     */
    const openModalWithSize = (size) => {
        setClassName(null);
        setScroll(null);
        toggle();
    };

    /**
     * Opens modal with custom class
     */
    // const openModalWithClass = (className) => {
    //     setClassName(className);
    //     setScroll(null);
    //     toggle();
    // };

    /**
     * Opens large modal
     */
    // const openModalWithScroll = () => {
    //     setScroll(true);
    //     setClassName(null);
    //     toggle();
    // };

    return (
        <>
            
                    {/* <h4 className="header-title">Bootstrap Modals</h4>

                    <p className="text-muted">A rendered modal with header, body, and set of actions in the footer.</p> */}

                    <div className="button-list">
                        {/* <Button variant="primary" onClick={toggle}>
                            Standard Modal
                        </Button>
                        
                        <Button variant="success" onClick={() => openModalWithSize('sm')}>
                            Small Modal
                        </Button>
                        <Button variant="primary" onClick={() => openModalWithClass('modal-full-width')}>
                            Full width Modal
                        </Button> */}
                        {/* <Button variant="secondary" onClick={openModalWithScroll}>
                            Scrollable Modal
                        </Button> */}
                        <Button variant="info" onClick={() => openModalWithSize('lg')}>
                            Large Modal
                        </Button>
                    </div>

                    <Modal show={modal} onHide={toggle} dialogClassName={className} size={sizem} scrollable={scroll}>
                        <Modal.Header onHide={toggle} closeButton >
                            <h4 className="modal-title">{title}</h4>
                        </Modal.Header>
                        <Modal.Body>
                            {tab}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={toggle}>
                                Cancel
                            </Button>{' '}
                            <Button variant="primary" onClick={toggle}>
                                metehan
                            </Button>
                        </Modal.Footer>
                    </Modal>
               
        </>
    );
};

const ModalsWithPages = () => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [signInModal, setSignInModal] = useState(false);

    /**
     * Show/hide the modal
     */
    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
    };

    const toggleSignIn = () => {
        setSignInModal(!signInModal);
    };

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title">Modal with Pages</h4>

                <p className="text-muted">Examples of custom modals.</p>

                <Button variant="primary" className="me-1" onClick={toggleSignUp}>
                    Sign Up Modal
                </Button>

                <Button variant="info" onClick={toggleSignIn}>
                    Log In Modal
                </Button>

                {/* Sign up Modal */}
                <Modal show={signUpModal} onHide={toggleSignUp}>
                    <Modal.Body>
                        <div className="text-center mt-2 mb-4">
                            <a href="/">
                                <span>
                                    <img src={logodark} alt="" height="18" />
                                </span>
                            </a>
                        </div>
                        <form className="ps-3 pe-3" action="#">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Name
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="username"
                                    required=""
                                    placeholder="Michael Zenaty"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="emailaddress" className="form-label">
                                    Email address
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="emailaddress"
                                    required=""
                                    placeholder="john@deo.com"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    required=""
                                    id="password"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div className="mb-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                                    <label className="form-check-label" htmlFor="customCheck1">
                                        I accept <a href="/">Terms and Conditions</a>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3 text-center">
                                <button className="btn btn-primary" type="submit">
                                    Sign Up Free
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                {/* Sign in Modal */}
                <Modal show={signInModal} onHide={toggleSignIn}>
                    <Modal.Body>
                        <div className="text-center mt-2 mb-4">
                            <a href="/">
                                <span>
                                    <img src={logodark} alt="" height="18" />
                                </span>
                            </a>
                        </div>
                        <form className="ps-3 pe-3" action="#">
                            <div className="mb-3">
                                <label htmlFor="emailaddress" className="form-label">
                                    Email address
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="emailaddress"
                                    required=""
                                    placeholder="john@deo.com"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    required=""
                                    id="password"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <div className="mb-3">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                                    <label className="form-check-label" htmlFor="customCheck1">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3 text-center">
                                <button className="btn btn-rounded btn-primary" type="submit">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

const ModalWithAlerts = () => {
    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState('');

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    /**
     * Opens modal with custom class
     */
    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title">Modal based Alerts</h4>

                <p className="text-muted">Show different contexual alert messages using modal component.</p>

                <Button variant="success" className="me-1" onClick={() => openModalWithClass('success')}>
                    Success Alert
                </Button>
                <Button variant="info" className="me-1" onClick={() => openModalWithClass('info')}>
                    Info Alert
                </Button>
                <Button variant="warning" className="me-1" onClick={() => openModalWithClass('warning')}>
                    Warning Alert
                </Button>
                <Button variant="danger" className="me-1" onClick={() => openModalWithClass('danger')}>
                    Danger Alert
                </Button>

                <Modal show={modal} onHide={toggle} size="sm">
                    <div className={classNames('modal-filled', 'bg-' + className)}>
                        <Modal.Body className="p-4">
                            <div className="text-center">
                                <i className="dripicons-checkmark h1"></i>
                                <h4 className="mt-2">Well Done!</h4>
                                <p className="mt-3">
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
                                    facilisis in, egestas eget quam.
                                </p>
                                <button type="button" className="btn btn-light my-2" data-bs-dismiss="modal">
                                    Continue
                                </button>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            </Card.Body>
        </Card>
    );
};

const ModalPositions = () => {
    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState(null);

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    /**
     * Opens modal with custom class
     */
    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Modal Position</h4>

                    <p className="text-muted">
                        Specify the position for the modal. You can display modal at top, bottom, center or right of
                        page by specifying classes <code>modal-top</code>, <code>modal-bottom</code>,{' '}
                        <code>modal-dialog-centered</code> and <code>modal-right</code>
                        respectively.
                    </p>

                    <div className="button-list">
                        <Button variant="secondary" onClick={() => openModalWithClass('modal-top')}>
                            Top
                        </Button>
                        <Button variant="secondary" onClick={() => openModalWithClass('modal-right')}>
                            Right
                        </Button>
                        <Button variant="secondary" onClick={() => openModalWithClass('modal-bottom')}>
                            Bottom
                        </Button>
                        <Button variant="secondary" onClick={() => openModalWithClass('modal-dialog-centered')}>
                            Center
                        </Button>
                    </div>

                    <Modal show={modal} onHide={toggle} dialogClassName={className}>
                        <Modal.Header onHide={toggle} closeButton>
                            <h4 className="modal-title">Modal Heading</h4>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Text in a modal</h5>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={toggle}>
                                Close
                            </Button>{' '}
                            <Button variant="primary" onClick={toggle}>
                                Save changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    );
};

const ModalWithColoredHeader = () => {
    const [modal, setModal] = useState(false);
    const [headerClassName, setHeaderClassName] = useState('');

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    /**
     * Opens modal with custom header
     */
    const openModalWithHeaderClass = (className) => {
        setHeaderClassName(className);
        toggle();
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Colored Header Modals</h4>

                    <p className="text-muted">A rendered modal with header having contexual background color.</p>

                    <div className="button-list">
                        <Button variant="primary" onClick={() => openModalWithHeaderClass('primary')}>
                            Primary Header
                        </Button>
                        <Button variant="success" onClick={() => openModalWithHeaderClass('success')}>
                            Success Header
                        </Button>
                        <Button variant="info" onClick={() => openModalWithHeaderClass('info')}>
                            Info Header
                        </Button>
                        <Button variant="danger" onClick={() => openModalWithHeaderClass('danger')}>
                            Danger Header
                        </Button>
                        <Button variant="warning" onClick={() => openModalWithHeaderClass('warning')}>
                            Warning Header
                        </Button>
                        <Button variant="dark" onClick={() => openModalWithHeaderClass('dark')}>
                            Dark Header
                        </Button>
                    </div>

                    <Modal show={modal} onHide={toggle}>
                        <Modal.Header
                            onHide={toggle}
                            closeButton
                            className={classNames('modal-colored-header', 'bg-' + headerClassName)}>
                            <h4 className="modal-title">Modal Heading</h4>
                        </Modal.Header>
                        <Modal.Body>
                            <h5 className="mt-0">{headerClassName} Background</h5>
                            <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            </p>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                lacus vel augue laoreet rutrum faucibus dolor auctor.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={toggle}>
                                Close
                            </Button>{' '}
                            <Button variant={headerClassName} onClick={toggle}>
                                Save changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    );
};

const ModalWithFilled = () => {
    const [modal, setModal] = useState(false);
    const [headerClassName, setHeaderClassName] = useState('');

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    /**
     * Opens modal with custom header
     */
    const openModalWithHeaderClass = (className) => {
        setHeaderClassName(className);
        toggle();
    };
    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Colored Header Modals</h4>

                    <p className="text-muted">
                        A rendered modal with header, body and footer having contexual background color.
                    </p>

                    <div className="button-list">
                        <Button variant="primary" onClick={() => openModalWithHeaderClass('primary')}>
                            Primary Filled
                        </Button>
                        <Button variant="success" onClick={() => openModalWithHeaderClass('success')}>
                            Success Filled
                        </Button>
                        <Button variant="info" onClick={() => openModalWithHeaderClass('info')}>
                            Info Filled
                        </Button>
                        <Button variant="danger" onClick={() => openModalWithHeaderClass('danger')}>
                            Danger Filled
                        </Button>
                        <Button variant="warning" onClick={() => openModalWithHeaderClass('warning')}>
                            Warning Filled
                        </Button>
                        <Button variant="dark" onClick={() => openModalWithHeaderClass('dark')}>
                            Dark Filled
                        </Button>
                    </div>

                    <Modal show={modal} onHide={toggle}>
                        <Modal.Header
                            onHide={toggle}
                            closeButton
                            className={classNames('modal-filled', 'bg-' + headerClassName)}>
                            <h4 className="modal-title">{headerClassName} Filled Modal</h4>
                        </Modal.Header>
                        <Modal.Body className={classNames('modal-filled', 'bg-' + headerClassName)}>
                            <p>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            </p>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                lacus vel augue laoreet rutrum faucibus dolor auctor.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className={classNames('modal-filled', 'bg-' + headerClassName)}>
                            <Button variant="light" onClick={toggle}>
                                Close
                            </Button>{' '}
                            <Button variant="outline-light" onClick={toggle}>
                                Save changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    );
};

const MultipleModal = () => {
    const [modal, setModal] = useState(false);
    const [nextModal, setNextModal] = useState(false);

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    const toggleNextModal = () => {
        toggle();
        setNextModal(!nextModal);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Multiple Modal</h4>

                    <p className="text-muted">
                        Display a series of modals one by one to guide your users on multiple aspects or take step wise
                        input.
                    </p>

                    <div className="button-list">
                        <Button variant="secondary" onClick={toggle}>
                            Multiple Modal
                        </Button>
                    </div>

                    <Modal show={modal} onHide={toggle}>
                        <Modal.Header closeButton>
                            <h4 className="modal-title">Modal Heading</h4>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Text in a modal</h5>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setNextModal(true)}>
                                Next
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={nextModal} onHide={toggleNextModal}>
                        <Modal.Header closeButton>
                            <h4 className="modal-title">Modal Heading</h4>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Text in a modal</h5>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={toggleNextModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    );
};

const StaticBackdropModal = () => {
    const [modal, setModal] = useState(false);

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Static Backdrop</h4>

                    <p className="text-muted">
                        When backdrop is set to static, the modal will not close when clicking outside it. Click the
                        button below to try it.
                    </p>

                    <div className="button-list">
                        <Button variant="info" onClick={toggle}>
                            Static Backdrop
                        </Button>
                    </div>

                    <Modal show={modal} onHide={toggle} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            I will not close if you click outside me. Don't even try to press escape key.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={toggle}>
                                Close
                            </Button>
                            <Button variant="primary">Understood</Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    );
};

const Modals = (): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Base UI', path: '/ui/modals' },
                    { label: 'Modals', path: '/ui/modals', active: true },
                ]}
                title={'Modals'}
            />

            <Row>
                <Col md={6}>
                    <ModalSizes />
                </Col>

                <Col md={6}>
                    <ModalsWithPages />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <ModalWithAlerts />
                </Col>

                <Col md={6}>
                    <ModalPositions />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <ModalWithColoredHeader />
                </Col>

                <Col md={6}>
                    <ModalWithFilled />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <MultipleModal />
                </Col>

                <Col md={6}>
                    <StaticBackdropModal />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Modals;
