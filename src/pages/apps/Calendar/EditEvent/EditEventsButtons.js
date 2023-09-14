import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changePageBack, changePageNext, changeSplitPage, showSplitModal,splitModalsReportPage } from '../../../../redux/actions';
import { toast, ToastContainer } from 'react-toastify';
import LoyaltyProductButton from './LoyaltyProduct/LoyaltyProductButton';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { async } from 'regenerator-runtime';

const EditEventsButtons = ({
    setCloseModal,
    buttonDisable,
    inputPercent,
    resetPharmacyTableData,
    resetButton,
    setResetButton,
    visitEvulotionCounter,
    loyaltyProductCounter,
    complatedButton,
    pharmacytTableData,
    setSuccessModal,
    saveReportClick,
    isSaveNext = false
}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

    const pharmacySplitDatas = useSelector(state => state.EditEvent.pharmacySplitData);

    const appStatus = useSelector((state) => state.Calendar.appStatus);
    const page = useSelector((state) => state.Calendar.changePage);
    const eventId = useSelector((state) => state.Calendar.eventId);

    const notify = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 4000,
        });
    };

    const visitEvulotionNextPageControl = () => {
        if (page === 3) {
            if (
                visitEvulotionCounter.promo === 0 &&
                visitEvulotionCounter.nonpromo === 0 &&
                visitEvulotionCounter.other === 0
            ) {
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else if (visitEvulotionCounter.promo === 0 && visitEvulotionCounter.nonpromo === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else if (visitEvulotionCounter.promo === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else {
                dispatch(changePageNext());
            }
        } else if (page === 4) {
            if (visitEvulotionCounter.nonpromo === 0 && visitEvulotionCounter.other === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else if (visitEvulotionCounter.nonpromo === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else {
                dispatch(changePageNext());
            }
        } else if (page === 5) {
            if (visitEvulotionCounter.other === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else {
                dispatch(changePageNext());
            }
        }
    };

    const visitEvulotionBackPageControl = () => {
        if (page === 7) {
            if (
                visitEvulotionCounter.other === 0 &&
                visitEvulotionCounter.nonpromo === 0 &&
                visitEvulotionCounter.promo === 0
            ) {
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else if (visitEvulotionCounter.other === 0 && visitEvulotionCounter.nonpromo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else if (visitEvulotionCounter.other === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else {
                dispatch(changePageBack());
            }
        } else if (page === 6) {
            if (visitEvulotionCounter.nonpromo === 0 && visitEvulotionCounter.promo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else if (visitEvulotionCounter.nonpromo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else {
                dispatch(changePageBack());
            }
        } else if (page === 5) {
            if (visitEvulotionCounter.promo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else {
                dispatch(changePageBack());
            }
        }
    };

    // Loyalty Product Page Control
    const loyaltyProductNextPageControl = () => {
        if (page === 7) {
            if (
                loyaltyProductCounter.promo === 0 &&
                loyaltyProductCounter.nonpromo === 0 &&
                loyaltyProductCounter.other === 0
            ) {
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else if (loyaltyProductCounter.promo === 0 && loyaltyProductCounter.nonpromo === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else if (loyaltyProductCounter.promo === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else {
                dispatch(changePageNext());
            }
        } else if (page === 8) {
            if (loyaltyProductCounter.nonpromo === 0 && loyaltyProductCounter.other === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else if (loyaltyProductCounter.nonpromo === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else {
                dispatch(changePageNext());
            }
        } else if (page === 9) {
            if (loyaltyProductCounter.other === 0) {
                dispatch(changePageNext());
                dispatch(changePageNext());
            } else {
                dispatch(changePageNext());
            }
        }
    };

    const loyaltyProductBackPageControl = () => {
        if (page === 11) {
            if (
                loyaltyProductCounter.other === 0 &&
                loyaltyProductCounter.nonpromo === 0 &&
                loyaltyProductCounter.promo === 0
            ) {
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else if (loyaltyProductCounter.other === 0 && loyaltyProductCounter.nonpromo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else if (loyaltyProductCounter.other === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else {
                dispatch(changePageBack());
            }
        } else if (page === 10) {
            if (loyaltyProductCounter.nonpromo === 0 && loyaltyProductCounter.promo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else if (loyaltyProductCounter.nonpromo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else {
                dispatch(changePageBack());
            }
        } else if (page === 9) {
            if (loyaltyProductCounter.promo === 0) {
                dispatch(changePageBack());
                dispatch(changePageBack());
            } else {
                dispatch(changePageBack());
            }
        }
    };

    const handleButtonControl = () => {
        if(page === 11) dispatch(changePageNext());
        else {
            if (buttonDisable.disable) {
                notify(buttonDisable.message);
                toast.clearWaitingQueue();
            } else {
                if (page === 3 || page === 4 || page === 5) {
                    visitEvulotionNextPageControl();
                } else if (page === 7 || page === 8 || page === 9) {
                    loyaltyProductNextPageControl();
                } else if (page === 15) {
                    setCloseModal(true);
                } else {
                    dispatch(changePageNext());
                }
                toast.dismiss();
            }
        }
    };
    const handleBackButtonControl = () => {
        if (page === 7 || page === 6 || page === 5) {
            visitEvulotionBackPageControl();
        } else if (page === 11 || page === 10 || page === 9) {
            loyaltyProductBackPageControl();
        } else {
            dispatch(changePageBack());
        }
        toast.dismiss();
    };
    const handleCloseRaport = () => {
        if(isSaveNext) {
            saveReportClick();
        }
    };
    const openSplit = async () => {
        await savePharmacy();
        await dispatch(showSplitModal(true));
        await dispatch(changeSplitPage(2));
        await dispatch(splitModalsReportPage(true));
    };
    
    const savePharmacy = () => { 
        const pharmacySaveBody = {
            EventId: eventId,
            details: pharmacytTableData.map((data) => ({
                ClinicId: data.clinicId,
                ClinicName: data.clinicName,
                CustomerId: data.customerId,
                CustomerName: data.customerName,
                PharmacyId: data.pharmacyId,
                PharmacyName: data.pharmacyName,
                Category: data.category,
                PharmacyPercent: data.inputPercent,
            })),
        };

        FetchApiPost('services/Daywork/Split/SaveClinicConnectedPharmacy', 'POST', pharmacySaveBody)
        .then((res) =>
        (async () => {
            try {
                if (res.status === 201) {
                   
                }
                else if (res.status === 500 || res.status === 499) {
                    history.push('/error-500');
                }
                else {
                    console.log('hata');
                }

            } catch (error) {
                console.log('error', error);
            }
        })()
    )
    };

    const splitIsDisabled = () => {
        // inputpercent 100 ise 
        let reduxData = [];
        let pharmacySplitTableData = [];

        pharmacySplitDatas.map(data => reduxData.push(data.pharmacyId));
        pharmacytTableData.map(data => pharmacySplitTableData.push(data.value));

        return true
    }
    const nextStatusControl = async (pageNum) => {
        if(appStatus !== 4) {

            if(page === 11) {
                await savePharmacy();
                await handleButtonControl();
            }
            else if(page === 15) {
                handleCloseRaport();
            }
            else {
                handleButtonControl()
            }
        }
        else {
            handleButtonControl();
        }
    }

    const nextButtonIsDisabled = async () => {
        if (appStatus === 4) return false;
        else {
            if (inputPercent === 100) {
                await savePharmacy();
                return false
            }
            else return true;
        }

        // let reduxData = [];
        // let pharmacySplitTableData = [];
        // let result = [];
        // pharmacySplitDatas.map(data => reduxData.push(data.pharmacyId));
        // pharmacytTableData.map(data => pharmacySplitTableData.push(data.value));

        // console.log(reduxData,pharmacySplitTableData);

        // if(inputPercent === 100) {
        //     if(reduxData.length === pharmacySplitTableData.length) {
        //         reduxData.map(data => {
        //             pharmacySplitTableData.map(el => {
        //                 if(data === el) {
        //                     result.push(el);
        //                 }
        //                 return el
        //             })
        //             return data
        //         })
    
        //         if(result.length === reduxData.length) return false;
        //         else return true;
        //     }
        //     else {
        //         return true
        //     }
        // }
        // else {
        //     return true
        // }

    }

    useEffect(() => {
      splitIsDisabled();
    }, [])
    
    return (
        <>
            {page === 11 && (
                <div className="pharmacy_buttons_left">
                    {/* <Button
                        className="pharmacy_buttons_save"
                        onClick={savePharmacy}
                        // disabled={()=>splitIsDisabled()}
                        >
                        <i class="fa-solid fa-floppy-disk"></i>
                    </Button> */}
                    <Button disabled={inputPercent !== 100 || appStatus === 4} className="pharmacy_buttons_back" onClick={openSplit}>
                        <i class="fa-solid fa-divide"></i>
                    </Button>
                    <Button
                        disabled={appStatus === 4}
                        className="pharmacy_buttons_reset"
                        onClick={resetPharmacyTableData}>
                        <i class="fa-solid fa-rotate-right"></i>
                    </Button>
                </div>
            )}
            {page === 8 && (
                <LoyaltyProductButton resetButton={resetButton} setResetButton={setResetButton} name="LoyaltyPromo" />
            )}
            {page === 9 && (
                <LoyaltyProductButton
                    resetButton={resetButton}
                    setResetButton={setResetButton}
                    name="LoyaltyNonPromo"
                />
            )}
            {page === 10 && (
                <LoyaltyProductButton resetButton={resetButton} setResetButton={setResetButton} name="LoyaltyOther" />
            )}
            <div>
                <Button className="btn btn-light me-1" onClick={() => handleBackButtonControl()}>
                    {t('back')}
                </Button>
                {
                    page === 3 && appStatus !== 4 ? 
                    <Button
                        type="submit"
                        className="btn btn-success py-1"
                        onClick={() =>  handleButtonControl()}
                        disabled={complatedButton}
                        >
                        {t('completed')}
                    </Button> 
                : 
                    <Button
                        type="submit"
                        className="btn btn-primary py-1"
                        disabled={page === 11 && inputPercent !== 100 ? true : false}
                        onClick={()=> nextStatusControl()}
                        // onClick={() => (appStatus === 4 && page === 15 ? handleCloseRaport() : handleButtonControl())}
                        >
                        {appStatus === 4 && page === 15 ? t('close') : t('next')}
                    </Button>
                }
                <ToastContainer limit={1} />
            </div>
        </>
    );
};

export default EditEventsButtons;
