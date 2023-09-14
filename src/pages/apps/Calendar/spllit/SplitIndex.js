import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddPharmacySplit2 from '../../../../components/AddPharmacy';
import SplitPage2 from './splitPage2/SplitPage2';
import PhysicianSplitIndex from './PhysicianSplit/PhysicianSplitIndex';
import { useDispatch, useSelector } from 'react-redux';
import { changeSplitPage, pharmacySplit, showSplitModal } from '../../../../redux/actions';
import { FetchApiGet } from '../../../../utils/http.helper';
import CloseWithoutSaving from '../../../../components/Modals/CloseWithoutSaving';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../components/Loading';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SplitIndex = ({ homePageOpen, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    // Redux
    const eventId = useSelector((state) => state.Calendar.eventId);
    const splitPage = useSelector((state) => state.Calendar.changeSplitPage);
    const appStatus = useSelector((state) => state.Calendar.appStatus);
    const modalShow = useSelector((state) => state.Calendar.showSplitModal);
    const isCancelButton = useSelector(state =>state.Calendar.splitModaReportPage);

    const [show, setShow] = useState(true);

    //close alert states
    const [modal, setModal] = useState(false);
    const [hideRm, setHideRm] = useState(false);

    // after api finish request clicable next button
    const [btnClick, setBtnClick] = useState(true);
    //Add Pharmacy
    const [pharmacytTableData, setPharmacytTableData] = useState([]);
    // Pharmacy Split
    const [pharmacyData, setPharmacyData] = useState([]);
    const [pharmacyDataLoading, setPharmacyDataLoading] = useState(false);
    const [skuData, setSkuData] = useState([]);
    const [allocationData, setAllocationData] = useState([]);
    
    //Physicians
    const [pharmacyName, setPharmacyName] = useState(null);
    const [pharmacyId, setPharmacyId] = useState(null);
    const [skuName, setSkuName] = useState(null);
    const [skuId, setSkuId] = useState(null);
    const [physicianData, setPhysicianData] = useState([]);
    const [pharmacySaveControl, setPharmacySaveControl] = useState([]);

    const [physicianDataCopy, setPhysicianDataCopy] = useState([]);
    const toggle = () => {
        setModal(!modal);
        setHideRm(!hideRm);
    };
    const closeRmAlertNoIsSaving = () => {
        toggle();
        setShow(true);
    };
    const closeRmAlertYesClose = () => {
        dispatch(showSplitModal(false));
        setShow(false);
        toggle();
    };

    const handleClose = () => {
        if (appStatus === 4) {
            dispatch(showSplitModal(false));
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

    useEffect(() => {
        FetchApiGet(`services/Daywork/Split/GetClinicConnectedPharmacyByEventId?eventId=${eventId}`, 'GET')
            .then((response) => response.json())
            .then((response) =>
                response.data.map(
                    (data) => (
                        setPharmacytTableData((prev) => [
                            ...prev,
                            {
                                value: data.pharmacyId,
                                label: data.pharmacyName,
                                inputPercent: data.pharmacyPercent,
                                category: data.category,
                                clinicId: data.clinicId,
                                clinicName: data.clinicName,
                                customerId: data.customerId,
                                customerName: data.customerName,
                                eventId: data.eventId,
                            },
                        ]),
                        dispatch(pharmacySplit(response))
                    )
                )
            )
            .catch((error) => console.log(error));
    }, [eventId]);

    useEffect(() => {
        setPharmacySaveControl(pharmacytTableData);
    }, [pharmacytTableData]);

    const getPharmacySplitDatas = () => {
        (async () => {
            try {
                await setBtnClick(false);
                const response = await FetchApiGet(
                    `services/Daywork/Split/GetPharmacySplitDatasByEventId?eventId=${Number(eventId)}`,
                    'GET'
                );
                const json = await response.json();
                await setPharmacyData([...json.data.clinicConnectedPharmacyResponses]);
                await setSkuData([...json.data.getGlobalSkusByBrandIdListandEmployeeIdResponses]);
                await setAllocationData([...json.data.getPhysicianAllocationForPharmacySplitResponses]);
                await dispatch(changeSplitPage(2));
                await setBtnClick(true);
            } catch (error) {
                console.log(error);
            }
        })();
    };

    useEffect(() => {
      
        if(isCancelButton) {
            (async () => {
                try {
                    await setBtnClick(false);
                    setPharmacyDataLoading(true);
                    FetchApiGet(`services/Daywork/Split/GetPharmacySplitDatasByEventId?eventId=${Number(eventId)}`,'GET')
                    .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setPharmacyDataLoading(false);
                                res.json().then(({data}) => {
                                    setPharmacyData([...data.clinicConnectedPharmacyResponses]);
                                    setSkuData([...data.getGlobalSkusByBrandIdListandEmployeeIdResponses]);
                                    setAllocationData([...data.getPhysicianAllocationForPharmacySplitResponses]);
                                    dispatch(changeSplitPage(2));
                                    setBtnClick(true);
                                })
                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                                setPharmacyDataLoading(false);
                            }
                            else {
                                setPharmacyDataLoading(false);
                            }
            
                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [dispatch, eventId, isCancelButton])
    

    return (
        <>
            {appStatus !== 4 ? (
                <CloseWithoutSaving
                    modal={modal}
                    toggle={toggle}
                    noButton={closeRmAlertNoIsSaving}
                    yesButton={closeRmAlertYesClose}
                    message="Are you sure you want to close without saving ?"
                />
            ) : null}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title">
                    <Modal.Title id="modal-title">
                        <h5 className="text-light">{t('SPLIT')}</h5>
                    </Modal.Title>
                    <div className="rm-close-button-cont" onClick={handleClose}>
                        <i className="dripicons-cross rm-close-button"></i>
                    </div>
                </Modal.Header>
                <Modal.Body className="pb-1 pt-3">
                    {splitPage === 1 && (
                        <AddPharmacySplit2
                            pharmacySaveControl={pharmacySaveControl}
                            setPharmacySaveControl={setPharmacySaveControl}
                            pharmacytTableData={pharmacytTableData}
                            setPharmacytTableData={setPharmacytTableData}
                            homePageOpen={homePageOpen}
                            btnClick={btnClick}
                            getPharmacySplitDatas={getPharmacySplitDatas}
                        />
                    )}
                    {splitPage === 2 && (
                        <SplitPage2
                            setBtnClick={setBtnClick}
                            eventId={eventId}
                            setPharmacyName={setPharmacyName}
                            setPharmacyId={setPharmacyId}
                            setSkuName={setSkuName}
                            setSkuId={setSkuId}
                            pharmacyData={pharmacyData}
                            skuData={skuData}
                            allocationData={allocationData}
                            setAllocationData={setAllocationData}
                            setPhysicianData={setPhysicianData}
                            setPhysicianDataCopy={setPhysicianDataCopy}
                        />
                    )}
                    {splitPage === 3 && (
                        <PhysicianSplitIndex
                            pharmacyName={pharmacyName}
                            pharmacyId={pharmacyId}
                            skuName={skuName}
                            skuId={skuId}
                            physicianData={physicianData}
                            setPhysicianData={setPhysicianData}
                            setPhysicianDataCopy={setPhysicianDataCopy}
                            physicianDataCopy={physicianDataCopy}
                        />
                    )}
                </Modal.Body>
            </Modal>

            <Loading loading={pharmacyDataLoading} />
        </>
    );
};

export default React.memo(SplitIndex);
