import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CloseWithoutSaving from '../../../../components/Modals/CloseWithoutSaving';
import {
    changeCompetitorPageBack,
    changeCompetitorPageNext,
    resetCompetitorPage,
    showCompetitorModal,
} from '../../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import Competitor from './CompetitorPage1/index';
import CompetitorP2Index from './CompetitorPage2/CompetitorP2Index';
import CompetitorP3Index from './CompetitorPage3/CompetitorP3Index';

import CompetitorFinishAnimation from '../../../../components/Modals/CompetitorFinishAnimation';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../../../components/Loading';


const CompetitorIndex = () => {
    const eventId = useSelector((state) => state.Calendar.eventId);
    const competitorPage = useSelector((state) => state.Calendar.changeCompetitorPage);
    const modalShow = useSelector((state) => state.Calendar.showCompetitorModal);
    const brandId = useSelector((state) => state.Calendar.competitorId);
    const brandName = useSelector((state) => state.Calendar.competitorBrand);
    const appStatus = useSelector((state) => state.Calendar.appStatus);

    const history = useHistory();
    // translation
    const { t } = useTranslation();
    //CompetitorPage1
    const [competitor, setCompetitor] = useState([]);
    //Page 2
    const [competitorProduct, setCompetitorProduct] = useState([]);
    const [competitorAddList, setCompetitorAddList] = useState([]);
    // Page 3
    const [competitorActivity, setCompetitorActivity] = useState([]);
    const [competitorDisadvantage, setCompetitorDisadvantage] = useState([]);
    const [competitorAdvantage, setCompetitorAdvantage] = useState([]);
    //
    const [competitorTitle, setCompetitorTitle] = useState('COMPETITOR');
    const [activeTab, setActiveTab] = useState('Activity');
    const [customer, setCustomer] = useState();
    const [show, setShow] = useState(true);
    const [btnDisable, setBtnDisable] = useState(false);
    const [errorApi, setErrorApi] = useState(false);
    //close alert states
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [hideRm, setHideRm] = useState(false);
    const [hideRm2, setHideRm2] = useState(false);
    const dispatch = useDispatch();
  
    const [competitorBrandStoryLoading, setCompetitorBrandStoryLoading] = useState(false);

    // Finish Animation Modal
    const [finishModal, setFinishModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
        setHideRm(!hideRm);
    };
    const closeRmAlertNoIsSaving = () => {
        toggle();
        setShow(true);
    };
    const closeRmAlertYesClose = () => {
        dispatch(showCompetitorModal(false));
        dispatch(resetCompetitorPage());
        setShow(false);
        toggle();
    };
    const toggle2 = () => {
        setModal2(!modal2);
        setHideRm2(!hideRm2);
    };
    const closeRmAlertNoIsSaving2 = async () => {
        await toggle2();
        await setShow(true);
        await setFinishModal(false);
        await dispatch(changeCompetitorPageNext())
        await dispatch(changeCompetitorPageBack())
    };
    const closeRmAlertYesClose2 = () => {
        saveCompetitor();
        setShow(false);
        dispatch(resetCompetitorPage());
        dispatch(showCompetitorModal(false));
        // toggle2();
        setFinishModal(false);
    };
    const handleClose = () => {
        if (appStatus === 4) {
            dispatch(showCompetitorModal(false));
            dispatch(resetCompetitorPage());
        }
        toggle();
        setShow(false);
    };
    useEffect(() => {
        if (modalShow === true) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [modalShow]);

    const handleTabChange = (e) => {
        // switch (activeTab) {
        //     case 'Activity':
        //         setActiveTab('AdvantagesRate');
        //         break;
        //     // case 'Advantages':
        //     //     setActiveTab('AdvantagesRate');
        //     //     break;
        //     case 'AdvantagesRate':
        //         setActiveTab('DisadvantagesRate');
        //         break;
        //     // case 'Disadvantages':
        //     //     setActiveTab('DisadvantagesRate');
        //     //     break;
        //     default:
        //         break;
        // }
        if (e.target.id === 'backTab') {
            switch (activeTab) {
                // case 'DisadvantagesRate':
                //     setActiveTab('AdvantagesRate');
                //     break;
                // case 'Disadvantages':
                //     setActiveTab('AdvantagesRate');
                //     break;
                // case 'AdvantagesRate':
                //     setActiveTab('Activity');
                //     break;
                // case 'Advantages':
                //     setActiveTab('Activity');
                //     break;
                case 'Activity':
                    setActiveTab('Activity');
                    dispatch(changeCompetitorPageBack());
                    break;
                default:
                    break;
            }
        }
    };
    const tabChange = (e) => {
        e.preventDefault();
        handleTabChange(e);
        if (activeTab === 'Activity' && e.target.id !== 'backTab') {
            toggle2();
            setShow(false);
        }
    };

    useEffect(() => {
        if (!brandId) return;
        const brandId1 = { BrandId: brandId };
        FetchApiPost(`services/daywork/EventReport/GetEventReportCompetitor`, 'POST', brandId1)
            .then((response) => response.json())
            .then((json) => setCompetitorProduct([...json.data]))
            .catch((err) => console.log(err));
    }, [brandId]);
    useEffect(() => {
        if (!brandId) return;
        FetchApiGet(`services/daywork/eventreport/CompetitorList?id=${brandId}`, 'GET')
            .then((response) => response.json())
            .then((json) => setCompetitorAddList([...json.data]))
            .catch((err) => console.log(err));
    }, [brandId]);

    useEffect(() => {
        setCompetitorBrandStoryLoading(true);
        FetchApiGet(`services/daywork/EventReport/GetCompetitorBrandsStory?EventId=${eventId}`, 'GET')
        .then((res) =>
             (async () => {
               try {
                 if (res.status === 200) {
                    setCompetitorBrandStoryLoading(false);
                   res.json().then(data => {
                     data.data.map(item =>setCompetitor((prev) => [...prev, { ...item }]) )
                   })
   
                 }
                 else if (res.status === 401) {
                   history.push('/error-404');
                 }
                 else if (res.status === 500 || res.status === 499) {
                   history.push('/error-500');
                 }
   
               } catch (error) {
                 console.log('error', error);
               }
             })()
           )
            // .then((response) => response.json())
            // .then((response) => response.data.map((data) => setCompetitor((prev) => [...prev, { ...data }])))
            // .catch((error) => console.log(error));

        FetchApiGet(`services/daywork/EventDetail/GetCustomerDetailByEventId?eventId=${eventId}`, 'GET')
            .then((response) => response.json())
            .then((json) => setCustomer(json))
            .catch((err) => console.log(err));
    }, [eventId]);
    const fetchActivity = async () => {
        try {
            const response = await FetchApiGet(
                `services/Daywork/EventReport/GetEventCompetitorActivityByBrandId?brandId=${Number(brandId)}`,
                'GET'
            );
            if (response.status === 200) {
                const json = await response.json();
                await setCompetitorActivity([...json.data]);
                return json.data;
            }
            if (response.status === 400) {
                await setCompetitorActivity([]);
                setErrorApi(true);
                return [];
            }
            if (response.status === 500) {
                await setCompetitorActivity([]);
                setErrorApi(true);
                return [];
            }
        } catch (error) {
            console.log(error);
            setCompetitorActivity([]);
        }
    };

    const fetchDisadvantages = async () => {
        try {
            const response = await FetchApiGet(
                `services/Daywork/EventReport/GetCompetitorDisadvantagesByBrandId?brandId=${Number(brandId)}`,
                'GET'
            );
            if (response.status === 200) {
                const json = await response.json();
                await setCompetitorDisadvantage([...json.data]);
                return json.data;
            }
            if (response.status === 400) {
                await setCompetitorDisadvantage([]);
                setErrorApi(true);
                return [];
            }
            if (response.status === 500) {
                await setCompetitorDisadvantage([]);
                setErrorApi(true);

                return [];
            }
        } catch (error) {
            console.log(error);
            setCompetitorDisadvantage([]);
        }
    };
    const fetchAdvantage = async () => {
        try {
            const response = await FetchApiGet(
                `services/Daywork/EventReport/GetEventCompetitorAdvantageByBrandId?brandId=${Number(brandId)}`,
                'GET'
            );
            if (response.status === 200) {
                const json = await response.json();
                await setCompetitorAdvantage([...json.data]);
                return json.data;
            }
            if (response.status === 400) {
                await setCompetitorAdvantage([]);
                setErrorApi(true);
                return [];
            }
            if (response.status === 500) {
                await setCompetitorAdvantage([]);
                setErrorApi(true);
                return [];
            }
        } catch (error) {
            console.log(error);
            setCompetitorAdvantage([]);
        }
    };
    const nexCompPage2 = () => {
        if (!brandId) return;
        fetchActivity()
            .then(fetchAdvantage())
            .then(fetchDisadvantages())
            .then(() => dispatch(changeCompetitorPageNext()));
    };
    const activitySave = useCallback(() => {
        let arr = [];
        for (let i = 0; i < competitorActivity.length; i++) {
            competitorActivity[i].competitorBrands.map((el, index) =>
                arr.push({
                    activityId: el.activityId,
                    activityName: el.activityName,
                    brandId: el.brandId,
                    brandName: brandName,
                    competitorBrandId: el.competitorBrandId,
                    competitorBrandName: el.competitorBrandName,
                    percent: el.percent,
                })
            );
        }
        return arr;
    }, [brandName, competitorActivity]);
    const sameDisadv = useSelector((state) => state.Calendar.competitorDisadvantageData);

    const disadvantageSave = useCallback(() => {
        let arr = [];
        for (let i = 0; i < competitorDisadvantage.length; i++) {
            competitorDisadvantage[i].competitors
                .filter((el) => el.isChecked === true)
                .map(
                    (el) =>
                        arr.push({
                            disadvantageId: el.disadvantageId,
                            brandId: competitorDisadvantage[i].brandId,
                            competitorBrandId: competitorDisadvantage[i].competitorBrandId,
                            percent: el.percent,
                            isChecked: el.isChecked,
                        }),
                    sameDisadv?.map((data) =>
                        data.items
                            .filter((el) => el.isChecked === true)
                            .map(
                                (el) => (
                                    competitorDisadvantage[i].competitorBrandId === el.competitorId1 &&
                                        arr.push({
                                            brandId: Number(brandId),
                                            competitorBrandId: el.competitorId1,
                                            disadvantageId: el.disadvantageId,
                                            percent: el.percent,
                                            isChecked: el.isChecked,
                                        }),
                                    competitorDisadvantage[i].competitorBrandId === el.competitorId2 &&
                                        arr.push({
                                            brandId: Number(brandId),
                                            competitorBrandId: el.competitorId2,
                                            disadvantageId: el.disadvantageId,
                                            percent: el.percent,
                                            isChecked: el.isChecked,
                                        })
                                )
                            )
                    )
                );
        }
        return arr;
    }, [brandId, competitorDisadvantage, sameDisadv]);

    const advantagesSave = useCallback(() => {
        const arr = competitorAdvantage.map((el) => ({
            AdvantageName: el.advantageName,
            brandId: el.brandId,
            competitorBrandId: el.competitorBrandId,
            competitorBrandName: el.competitorBrandName,
            percent: el.percent,
            status: el.status,
        }));
        return arr;
    }, [competitorAdvantage]);
    const saveCompetitorDatas = () => {
        const data = {
            eventDetailId: Number(eventId),
            eventReportCompetitorResponses: competitorProduct.map((data) => ({
                competitorBrandId: Number(data.competitorBrandId),
                competitorBrandName: data.competitorBrandName,
                competitorBrandPercent: data.competitorBrandPercent,
                brandId: data.brandId,
                status: true,
            })),
            competitorBrandsStoryResponses: competitor
                .filter((el) => el.brandId === Number(brandId))
                .map((data) => ({
                    date: data.date === '-' ? 'string' : data.date,
                    brandId: data.brandId,
                    brandName: data.brandName,
                })),
            competitorActivityResponses: activitySave(),
            competitorDisadvantagesResponses: disadvantageSave(),
            competitorAdvantageSettingsResponses: advantagesSave(),
        };
        return data;
    };
    const saveCompetitor = () => {
        const datas = saveCompetitorDatas();
        (async () => {
            try {
                await FetchApiPost('services/Daywork/EventReport/CreateEventCompetitor', 'POST', datas);
            } catch (error) {
                console.log(error);
            }
        })();
        // setTimeout(() => {
        //     setFinishModal(true);
        // }, 250);
    };

    return (
        <>
            {finishModal && <CompetitorFinishAnimation finishModal={finishModal} setFinishModal={setFinishModal}  noButton={closeRmAlertNoIsSaving2}
                yesButton={closeRmAlertYesClose2} />}
            {appStatus !== 4 ? (
                <CloseWithoutSaving
                    modal={modal}
                    toggle={toggle}
                    noButton={closeRmAlertNoIsSaving}
                    yesButton={closeRmAlertYesClose}
                    message={t('Are you sure you want to close without saving?')}
                />
            ) : null}
            {/* <SaveQuestion
                modal={modal2}
                toggle={toggle2}
                noButton={closeRmAlertNoIsSaving2}
                yesButton={closeRmAlertYesClose2}
                message={t('Are you sure you want to complete?')}
            /> */}
            {finishModal === false && errorApi === false && (
                <Modal show={show} onHide={handleClose} dialogClassName="competitor-index-modal">
                    <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title">
                        <Modal.Title id="modal-title">
                            <h5 className="text-light">{t(`${competitorTitle}`)}</h5>
                        </Modal.Title>
                        <div className="rm-close-button-cont" onClick={handleClose}>
                            <i className="dripicons-cross rm-close-button"></i>
                        </div>
                    </Modal.Header>
                    <Modal.Body className="pb-1 pt-3">
                        {competitorPage === 1 && <Competitor competitor={competitor} />}
                        {competitorPage === 2 && (
                            <CompetitorP2Index
                                brandId={brandId}
                                customer={customer}
                                setBtnDisable={setBtnDisable}
                                setCompetitorTitle={setCompetitorTitle}
                                competitorAddList={competitorAddList}
                                setCompetitorAddList={setCompetitorAddList}
                                competitorProduct={competitorProduct}
                                setCompetitorProduct={setCompetitorProduct}
                                competitorActivity={competitorActivity}
                                competitorDisadvantage={competitorDisadvantage}
                                competitorAdvantage={competitorAdvantage}
                            />
                        )}
                        {competitorPage === 3 && (
                            <CompetitorP3Index
                                brandId={brandId}
                                customer={customer}
                                activeTab={activeTab}
                                handleTabChange={handleTabChange}
                                setCompetitorTitle={setCompetitorTitle}
                                competitorProduct={competitorProduct}
                                setCompetitorProduct={setCompetitorProduct}
                                competitorActivity={competitorActivity}
                                setCompetitorActivity={setCompetitorActivity}
                                competitorDisadvantage={competitorDisadvantage}
                                setCompetitorDisadvantage={setCompetitorDisadvantage}
                                competitorAdvantage={competitorAdvantage}
                                setCompetitorAdvantage={setCompetitorAdvantage}
                            />
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {competitorPage === 2 && errorApi === false && (
                            <>
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        dispatch(changeCompetitorPageBack());
                                    }}>
                                    {t('Back')}
                                </Button>
                                <Button onClick={nexCompPage2} disabled={btnDisable}>
                                    {t('Next')}
                                </Button>
                            </>
                        )}
                        {competitorPage === 3 && errorApi === false && (
                            <>
                                <Button variant="light" id="backTab" onClick={tabChange}>
                                    {t('Back')}
                                </Button>
                                <Button onClick={() => setFinishModal(true)}>
                                    {' '}
                                    {activeTab === 'DisadvantagesRate' ? t('finish') : t('Next')}
                                </Button>
                            </>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
            {errorApi === true && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header className="pb-1 pt-2 px-4 border-bottom-0 rm-title">
                        <Modal.Title id="modal-title">
                            <h5 className="text-light error-500__title">ERROR</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-1 pt-3">
                        <div className="error-500">
                            <div class="gears" id="two-gears">
                                <div class="gears-container">
                                    <div class="gear-rotate"></div>
                                    <div class="gear-rotate-left"></div>
                                </div>
                            </div>
                            <h1>500</h1>
                            <span>INTERNAL SERVER ERROR</span>
                            <Button
                                className="error-500__btn"
                                variant="primary"
                                onClick={() => {
                                    dispatch(showCompetitorModal(false));
                                    dispatch(resetCompetitorPage());
                                }}>
                                <i className="fas fa-reply"></i> Return Home
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
            <Loading loading={competitorBrandStoryLoading} />
        </>
    );
};

export default CompetitorIndex;
