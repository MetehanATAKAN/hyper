import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeObjectionPageBack,
    changeObjectionPageNext,
    resetObjectionPage,
    showObjectionModal,
} from '../../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import ObjectionPage1 from './ObjectionPage1/Index';
import ObjectionPage2 from './ObjectionPage2/ObjectionPage2';
import CloseWithoutSaving from '../../../../components/Modals/CloseWithoutSaving';
import { useTranslation } from 'react-i18next';
import SaveQuestion from '../../../../components/Modals/SaveQuestion';

const ObjectionIndex = ({ homePageOpen }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const objectionPage = useSelector((state) => state.Calendar.changeObjectionPage);
    const modalShow = useSelector((state) => state.Calendar.showObjectionModal);
    const eventId = useSelector((state) => state.Calendar.eventId);
    const appStatus = useSelector((state) => state.Calendar.appStatus);

    const [show, setShow] = useState(true);
    const [activeTab, setActiveTab] = useState('Promo');
    const [objectionTitle, setObjectionTitle] = useState('OBJECTIONS');
    const [customer, setCustomer] = useState([]);
    const [brand, setBrand] = useState({ id: 0, name: 'string' });
    const [objectionInside, setObjectionInside] = useState([]);

    const [objectionDataPromo, setObjectionDataPromo] = useState([]);
    const [objectionDataNonPromo, setObjectionDataNonPromo] = useState([]);
    const [objectionDataOther, setObjectionDataOther] = useState([]);

    const [objectionPromo, setObjectionPromo] = useState([]);
    const [objectionNonPromo, setObjectionNonPromo] = useState([]);
    const [objectionOther, setObjectionOther] = useState([]);

    const [promoSave, setPromoSave] = useState([]);
    const [nonPromoSave, setNonPromoSave] = useState([]);
    const [otherSave, setOtherSave] = useState([]);

    //close alert states
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [hideRm, setHideRm] = useState(false);
    const [hideRm2, setHideRm2] = useState(false);
    const toggle = () => {
        setModal(!modal);
        setHideRm(!hideRm);
    };
    const closeRmAlertNoIsSaving = () => {
        toggle();
        setShow(true);
    };
    const closeRmAlertYesClose = () => {
        dispatch(showObjectionModal(false));
        dispatch(resetObjectionPage());
        setShow(false);
        toggle();
    };
    const toggle2 = () => {
        setModal2(!modal2);
        setHideRm2(!hideRm2);
    };
    const closeRmAlertNoIsSaving2 = () => {
        toggle2();
        setShow(true);
    };
    const closeRmAlertYesClose2 = () => {
        saveObjection();
        toggle2();
    };
    const handleClose = () => {
        if (appStatus === 4) {
            dispatch(showObjectionModal(false));
            dispatch(resetObjectionPage());
        }
        setShow(false);
        toggle();
    };
    useEffect(() => {
        if (modalShow === true) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [modalShow]);

    const handleTabChange = (e) => {
        if (activeTab === 'Promo') {
            setActiveTab('Non-Promo');
            setObjectionTitle('OBJECTIONS NON-PROMO');
            if (objectionNonPromo.length === 0) {
                setActiveTab('Other');
                setObjectionTitle('OBJECTIONS OTHER');
            }
            if (objectionNonPromo.length === 0 && objectionOther.length === 0) {
                toggle2();
                setShow(false);
            }
        }
        if (activeTab === 'Non-Promo') {
            setActiveTab('Other');
            setObjectionTitle('OBJECTIONS OTHER');
            if (objectionOther.length === 0) {
                toggle2();
                setShow(false);
            }
        }
        if (e.target.id === 'backTab') {
            if (objectionOther.length === 0) {
                setActiveTab('Non-Promo');
                setObjectionTitle('OBJECTIONS NON-PROMO');
            }
            if (objectionNonPromo.length === 0 && objectionOther.length === 0) {
                setActiveTab('Promo');
                setObjectionTitle('OBJECTIONS PROMO');
            }
            if (activeTab === 'Other') {
                setActiveTab('Non-Promo');
                setObjectionTitle('OBJECTIONS NON-PROMO');
                if (objectionNonPromo.length === 0) {
                    setActiveTab('Promo');
                    setObjectionTitle('OBJECTIONS PROMO');
                }
            } else if (activeTab === 'Non-promo') {
                setActiveTab('Promo');
                setObjectionTitle('OBJECTIONS PROMO');
            } else {
                setActiveTab('Promo');
                setObjectionTitle('OBJECTIONS PROMO');
            }
            if (activeTab === 'Promo') {
                dispatch(changeObjectionPageBack());
                setObjectionTitle('OBJECTIONS');
            }
        }
    };
    const tabChange = (e) => {
        e.preventDefault();
        setObjectionTitle('OBJECTIONS PROMO');
        handleTabChange(e);
        if (activeTab === 'Other' && e.target.id !== 'backTab') {
            toggle2();
            setShow(false);
        }
    };
    useEffect(() => {
        FetchApiGet(`services/daywork/EventDetail/GetCustomerDetailByEventId?eventId=${eventId}`, 'GET')
            .then((response) => response.json())
            .then((json) => setCustomer([...json.data]))
            .catch((err) => console.log(err));

        /// GET OBJECTİON BRANDS
        (async () => {
            try {
                const response = await FetchApiGet(
                    `services/daywork/eventDetail/GetObjectionBrandsStory?eventId=${eventId}`,
                    'GET'
                );
                const json = await response.json();
                await json.data.map(
                    (data) => (
                        data.isPromo === true &&
                            data.isAdditional === false &&
                            setObjectionPromo((prev) => [...prev, data]),
                        data.isPromo === false &&
                            data.isAdditional === false &&
                            setObjectionNonPromo((prev) => [...prev, data]),
                        data.isAdditional === true && setObjectionOther((prev) => [...prev, data])
                    )
                );
            } catch (error) {
                console.log(error);
            }
        })();

        (async () => {
            try {
                const response = await FetchApiGet('services/daywork/eventDetail/GetObjectionSettings', 'GET');
                const json = await response.json();
                await setObjectionInside([...json.data]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [eventId]);
    const saveObjectionDatas = () => {
        const finalProduct = promoSave.concat(nonPromoSave, otherSave);
        const data = {
            objectionResponses: finalProduct.map((data, index) => ({
                eventId: eventId,
                objectionId: data.objectionId,
                objectionName: data.objectionName,
                brandId: data.brandId,
                brandName: data.brandName,
                isPromo: data.isPromo,
                isAdditional: data.isAdditional,
                percentage: data.percentage,
                objectionBrandsStoryResponses: [
                    {
                        brandId: data.brandId,
                        brandName: data.brandName,
                        isPromo: data.isPromo,
                        isAdditional: data.isAdditional,
                        date: data.date,
                    },
                ],
            })),
        };
        return data;
    };

    const saveObjection = () => {
        const data = saveObjectionDatas();

        (async () => {
            try {
                await FetchApiPost('services/Daywork/EventDetail/CreateEventObjection', 'POST', data);
            } catch (error) {
                console.log(error);
            }
        })();
        setTimeout(() => {
            dispatch(showObjectionModal(false));
            dispatch(resetObjectionPage());
        }, 250);
    };
    const page1NextBtn = () => {
        if (objectionPromo.length === 0 && objectionPromo.length === 0 && objectionPromo.length === 0) return;
        dispatch(changeObjectionPageNext());
    };
    return (
        <>
            {appStatus !== 4 ? (
                <CloseWithoutSaving
                    modal={modal}
                    toggle={toggle}
                    noButton={closeRmAlertNoIsSaving}
                    yesButton={closeRmAlertYesClose}
                    message={t('Are you sure you want to close without saving?')}
                />
            ) : null}
            <SaveQuestion
                modal={modal2}
                toggle={toggle2}
                noButton={closeRmAlertNoIsSaving2}
                yesButton={closeRmAlertYesClose2}
                message={t('Are you sure you want to complete?')}
            />
            <Modal show={show} onHide={handleClose} dialogClassName="objection-index-modal">
                <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title">
                    <Modal.Title id="modal-title">
                        <h5 className="text-light">{t(`${objectionTitle}`)}</h5>
                    </Modal.Title>
                    <div className="rm-close-button-cont" onClick={handleClose}>
                        <i className="dripicons-cross rm-close-button"></i>
                    </div>
                </Modal.Header>
                <Modal.Body className="pb-1 pt-3">
                    {objectionPage === 1 && (
                        <ObjectionPage1
                            objectionPromo={objectionPromo}
                            objectionNonPromo={objectionNonPromo}
                            objectionOther={objectionOther}
                            setBrand={setBrand}
                        />
                    )}
                    {objectionPage === 2 && (
                        <ObjectionPage2
                            objectionDataPromo={objectionDataPromo}
                            setObjectionDataPromo={setObjectionDataPromo}
                            objectionDataNonPromo={objectionDataNonPromo}
                            setObjectionDataNonPromo={setObjectionDataNonPromo}
                            objectionDataOther={objectionDataOther}
                            setObjectionDataOther={setObjectionDataOther}
                            promoSave={promoSave}
                            setPromoSave={setPromoSave}
                            nonPromoSave={nonPromoSave}
                            setNonPromoSave={setNonPromoSave}
                            otherSave={otherSave}
                            setOtherSave={setOtherSave}
                            activeTab={activeTab}
                            customer={customer}
                            objectionInside={objectionInside}
                            setObjectionTitle={setObjectionTitle}
                            objectionPromo={objectionPromo}
                            objectionNonPromo={objectionNonPromo}
                            objectionOther={objectionOther}
                            eventId={eventId}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {objectionPage === 1 && <Button onClick={page1NextBtn}>{t('Next')}</Button>}
                    {objectionPage === 2 && (
                        <>
                            <Button variant="light" id="backTab" onClick={tabChange}>
                                {t('Back')}
                            </Button>
                            <Button onClick={tabChange}>{t('Next')}</Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default React.memo(ObjectionIndex);
