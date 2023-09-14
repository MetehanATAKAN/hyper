import React, { useCallback, useEffect, useState } from 'react';
import { Accordion, Button, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import '../../../../../assets/scss/custom/split/splitLoyalty.scss';
import { FetchApiPost } from '../../../../../utils/http.helper';

const SplitLoyalty = (props) => {
    const { setShow, show, loyaltyData, loyaltyNonData, eventId } = props;
    const [profile, setProfile] = useState([]);
    const [product, setProduct] = useState({});
    const handleClose = () => {
        let arr = [];
        profile.forEach((el) => arr.push(el.percent));
        const check = loyaltyData.eventProfileLoyalties?.map(
            (data, index) => data.percentage === profile[index].percent
        );
        if (loyaltyData.eventReportLoyalties.length === 0) {
            if (arr.every((percent) => percent === null)) {
                setShow(false);
            } else {
                setShow(false);
                toast.warn('NOT SAVED!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            if (check[0] === true) {
                setShow(false);
            }
            if (check[0] === false) {
                setShow(false);
                toast.warn('NOT SAVED!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };
    useEffect(() => {
        if (loyaltyData.eventReportLoyalties.length !== 0) {
            setProduct({});
            setProfile([]);
            loyaltyData.eventProfileLoyalties?.map((data) =>
                setProfile((prev) => [
                    ...prev,
                    { id: data.profileId, name: data.profileName, percent: data.percentage },
                ])
            );
            loyaltyData.eventReportLoyalties?.map((data) =>
                setProduct({
                    id: data.skuId,
                    name: data.skuName,
                    percent: data.percentage,
                    isPromoOrOther: data.isPromoOrOther,
                })
            );
        }
    }, [loyaltyData]);

    useEffect(() => {
        if (loyaltyData.eventReportLoyalties.length === 0) {
            setProduct({});
            setProfile([]);
            loyaltyNonData.map(
                (data) => (
                    setProduct({
                        id: data.globalSkuId,
                        name: data.globalSkuName,
                        percent: null,
                        isPromoOrOther: data.isPromoOrOther,
                    }),
                    data.profile.map((el) =>
                        setProfile((prev) => [
                            ...prev,
                            { id: el.profileId, id2: el.indicationId, name: el.profile, percent: null },
                        ])
                    )
                )
            );
        }
    }, [loyaltyData, loyaltyNonData]);

    // adding product percent
    useEffect(() => {
        if (profile.length === 0) return;
        let totalPercent = null;
        profile?.map((data) => (totalPercent += data.percent));
        setProduct((prev) => ({
            ...prev,
            percent: totalPercent === 0 ? null : (totalPercent / profile.length).toFixed(0),
        }));
    }, [profile]);
    // change product bar
    useEffect(() => {
        if (product.percent !== null) {
            const percent = product.percent;
            if (percent >= 0 && percent <= 20) {
                changeAccordionColor(
                    0,
                    percent,
                    'repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)'
                );
            } else if (percent >= 21 && percent <= 50) {
                changeAccordionColor(
                    0,
                    percent,
                    'repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)'
                );
            } else if (percent >= 51 && percent <= 100) {
                changeAccordionColor(
                    0,
                    percent,
                    'repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)'
                );
            }
        }
    }, [product]);

    // change profile bar
    useEffect(() => {
        profile.forEach((item, index) => {
            if (item.percent !== null) {
                if (item.percent === 0) {
                    changeColor(
                        index,
                        0,
                        'repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)'
                    );
                } else if (item.percent === 10) {
                    changeColor(
                        index,
                        1,
                        'repeating-linear-gradient(45deg, #FA5C7C 0px, #FA5C7C 5px, #FA5C7C 5px, #FB7D96 5px, #FB7D96 10px)'
                    );
                } else if (item.percent === 20) {
                    changeColor(
                        index,
                        2,
                        'repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)'
                    );
                } else if (item.percent === 30) {
                    changeColor(
                        index,
                        3,
                        'repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)'
                    );
                } else if (item.percent === 40) {
                    changeColor(
                        index,
                        4,
                        'repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)'
                    );
                } else if (item.percent === 50) {
                    changeColor(
                        index,
                        5,
                        'repeating-linear-gradient(45deg, #FFC626 0px, #FFC626 5px, #FFC626 5px, #FFD151 5px, #FFD151 10px)'
                    );
                } else if (item.percent === 60) {
                    changeColor(
                        index,
                        6,
                        'repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)'
                    );
                } else if (item.percent === 70) {
                    changeColor(
                        index,
                        7,
                        'repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)'
                    );
                } else if (item.percent === 80) {
                    changeColor(
                        index,
                        8,
                        'repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)'
                    );
                } else if (item.percent === 90) {
                    changeColor(
                        index,
                        9,
                        'repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)'
                    );
                } else if (item.percent === 100) {
                    changeColor(
                        index,
                        10,
                        'repeating-linear-gradient(45deg, #0ACF97 0px, #0ACF97 5px, #0ACF97 5px, #3BD9AC 5px, #3BD9AC 10px)'
                    );
                }
            }
        });
    }, [profile]);

    // change product bar
    const changeAccordionColor = (row, percent, color) => {
        let element = document.getElementsByClassName('product-percent-hidden-bar');
        element[row].style.backgroundImage = color;
        element[row].style.borderTopRightRadius = '0px';
        element[row].style.borderBottomRightRadius = '0px';
        if (percent === 100) {
            element[row].style.width = `99.8%`;
            element[row].style.borderTopRightRadius = '4px';
            element[row].style.borderBottomRightRadius = '4px';
        } else {
            element[row].style.width = `${(100 / 11) * (percent / 10) + 100 / 11}%`;
            element[row].style.borderTopRightRadius = '0px';
            element[row].style.borderBottomRightRadius = '0px';
        }
        let span = document.getElementsByClassName('product-percent-hidden-bar')[row].parentNode.children[1].children;
        for (let i = 0; i <= 10; i++) {
            if (i <= percent / 10) {
                span[i].style.color = '#F8FEFC';
            } else {
                span[i].style.color = '#6C757D';
            }
        }
    };

    // change profile bar
    const changeColor = (row, column, color) => {
        let element = document.getElementsByClassName('profile-percent-hidden-bar');
        element[row].style.backgroundImage = color;
        element[row].style.borderTopRightRadius = '0px';
        element[row].style.borderBottomRightRadius = '0px';
        if (column === 10) {
            element[row].style.width = `99.8%`;
            element[row].style.borderTopRightRadius = '4px';
            element[row].style.borderBottomRightRadius = '4px';
        } else {
            element[row].style.width = `${(100 / 11) * (column + 1)}%`;
            element[row].style.borderTopRightRadius = '0px';
            element[row].style.borderBottomRightRadius = '0px';
        }
        let span = document.getElementsByClassName('profile-percent-hidden-bar')[row].parentNode.children[1].children;
        for (let i = 0; i <= 10; i++) {
            if (i <= column) {
                span[i].style.color = '#F8FEFC';
            } else {
                span[i].style.color = '#6C757D';
            }
        }
    };

    // profile bar click
    const handleClick = (event, percent) => {
        const id1 = event.target.id.split(' ')[0];
        const id2 = event.target.id.split(' ')[1];
        profile.forEach((item) => {
            if (item.id === Number(id1) && item.id2 === Number(id2)) {
                let arr = profile;
                arr?.map((data) =>
                    data.id === Number(id1) && data.id2 === Number(id2) ? (data.percent = percent) : null
                );
                setProfile([...arr]);
            }
            if (item.id === Number(id1) && id2 === 'undefined') {
                let arr = profile;
                arr?.map((data) => (data.id === Number(id1) ? (data.percent = percent) : null));
                setProfile([...arr]);
            }
        });
    };

    const data = useCallback(() => {
        return {
            eventDetailId: Number(eventId),
            eventReportLoyalties: [
                {
                    skuId: Number(product.id),
                    skuName: product.name,
                    percentage: Number(product.percent),
                    isPromoOrOther: product.isPromoOrOther,
                    eventProfileLoyalties: profile.map((data) => ({
                        profileId: Number(data.id),
                        profileName: data.name,
                        percentage: Number(data.percent),
                    })),
                },
            ],
        };
    }, [eventId, product, profile]);

    const saveLoyalty = () => {
        (async () => {
            try {
                const values = await data();
                await FetchApiPost('services/Daywork/Split/SaveBrandGlobalSkusLoyaltiesandProfiles', 'POST', values);
                await setShow(false);
                await toast.success('SAVED!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                console.log(error);
            }
        })();
    };

    return (
        <>
            <Modal show={show} size="m">
                <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title">
                    <Modal.Title id="modal-title">
                        <h5 className="text-light">SPLIT LOYALTY</h5>
                    </Modal.Title>
                    <div className="rm-close-button-cont" onClick={handleClose}>
                        <i className="dripicons-cross rm-close-button"></i>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey={0}>
                        <Accordion.Item eventKey={0} className="acordion-item">
                            <Accordion.Header>
                                <div className="product-container">
                                    <div className="product-container__item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="product-container__title">{product.name}</div>
                                            <span>{product.percent !== null && product.percent + '%'}</span>
                                        </div>
                                        <div className="product-container__percent">
                                            <span>0%</span>
                                            <span>10%</span>
                                            <span>20%</span>
                                            <span>30%</span>
                                            <span>40%</span>
                                            <span>50%</span>
                                            <span>60%</span>
                                            <span>70%</span>
                                            <span>80%</span>
                                            <span>90%</span>
                                            <span>100%</span>
                                        </div>
                                        <div className="product-percent-hidden-bar"></div>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="profile-container">
                                    {profile?.map((data, index) => (
                                        <div className="profile-container__item" key={index}>
                                            <div className="profile-container__title">
                                                <span title={data.name} className="profile-container__title__name">
                                                    {data.name}
                                                </span>
                                                <span>{data.percent && data.percent + '%'}</span>
                                            </div>
                                            <div className="profile-container__percent">
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 0)}>
                                                    0%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 10)}>
                                                    10%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 20)}>
                                                    20%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 30)}>
                                                    30%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 40)}>
                                                    40%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 50)}>
                                                    50%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 60)}>
                                                    60%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 70)}>
                                                    70%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 80)}>
                                                    80%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 90)}>
                                                    90%
                                                </span>
                                                <span
                                                    id={`${data.id} ${data.id2}`}
                                                    onClick={(event) => handleClick(event, 100)}>
                                                    100%
                                                </span>
                                            </div>
                                            <div className="profile-percent-hidden-bar"></div>
                                        </div>
                                    ))}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={saveLoyalty}>
                        save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default React.memo(SplitLoyalty);
