import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { FormInput } from '../../../../../components';
import Page2Table from './Page2Table';
import '../../../../../assets/scss/custom/split/splitPage2.scss';
import SplitPage2Buttons from './SplitPage2Buttons';
import { useTranslation } from 'react-i18next';
import SplitLoyalty from './SplitLoyalty';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { changeSplitPage, pharmacyDatasApiBody } from '../../../../../redux/actions';

export const physicianTableData = (pharmacyDatasBody) => {
    return FetchApiPost('services/Daywork/Split/GetPhysicianSplitDatas', 'POST', pharmacyDatasBody);
};

const SplitPage2 = (props) => {
    const {
        setPharmacyName,
        setPharmacyId,
        setSkuName,
        setSkuId,
        eventId,
        pharmacyData,
        skuData,
        allocationData,
        setBtnClick,
        setPhysicianData,
        setPhysicianDataCopy,
    } = props;
    const [checked, setChecked] = useState(false);
    const [loyaltyShow, setLoyaltyShow] = useState(false);
    const [loyaltyData, setLoyaltyData] = useState(null);
    const [loyaltyNonData, setLoyaltyNonData] = useState([]);
    const product = ['visit product'];
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    //prev page spinner Control
    useEffect(() => {
        setBtnClick(true);
    }, [setBtnClick]);

    const skuClick = (event) => {
        const data = { EventId: Number(eventId), SkuId: Number(event.target.id) };
        (async () => {
            try {
                const response = await FetchApiPost(
                    'services/Daywork/Split/GetEventReportLoyaltyandProfiles',
                    'POST',
                    data
                );
                const json = await response.json();
                await setLoyaltyData(json.data);
                setLoyaltyShow(true);
            } catch (error) {
                console.log('Error!', error);
            }
        })();
        (async () => {
            try {
                const response = await FetchApiPost('services/Daywork/Split/GetBrandGlobalSkusLoyalties', 'POST', data);
                const json = await response.json();
                await setLoyaltyNonData([json.data[0]]);
                // await setLoyaltyShow(true);
            } catch (error) {
                console.log('Error!', error);
            }
        })();
    };

    const cellClick = (event) => {
        event.preventDefault();
        let getValues = event.target.id;
        let splitValue = getValues.split('╚');
        setPharmacyName(splitValue[1]);
        setPharmacyId(Number(splitValue[2]));
        setSkuName(splitValue[4]);
        setSkuId(Number(splitValue[5]));
        (async () => {
            try {
                const pharmacyDatasBody = await {
                    pharmacyId: Number(splitValue[2]),
                    skuId: Number(splitValue[5]),
                };
                await console.log(pharmacyDatasBody);
                const response = await physicianTableData(pharmacyDatasBody);
                const json = await response.json();
                await setPhysicianData(json.data);
                // await setPhysicianDataCopy(json.data);
                await dispatch(pharmacyDatasApiBody(pharmacyDatasBody));
                await dispatch(changeSplitPage(3));
            } catch (error) {
                console.log(error);
            }
        })();
    };

    return (
        <>
            {loyaltyShow === true && (
                <SplitLoyalty
                    loyaltyData={loyaltyData}
                    loyaltyNonData={loyaltyNonData}
                    show={loyaltyShow}
                    setShow={setLoyaltyShow}
                    eventId={eventId}
                />
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
            />
            <div id="split-page2-top-container">
                <div className="split2-container">
                    <div>
                        <label className="switch-label">%</label>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color="primary"
                                />
                            }
                            label={t('Unite')}
                        />
                    </div>
                    <FormInput
                        name="select3"
                        type="select"
                        containerClass="mb-1"
                        className="form-select top-container-dropdown">
                        {product.map((data) => (
                            <option>{t(`${data}`)}</option>
                        ))}
                    </FormInput>
                </div>
                <div id="table-container">
                    <Page2Table
                        setPharmacyName={setPharmacyName}
                        setPharmacyId={setPharmacyId}
                        setSkuName={setSkuName}
                        setSkuId={setSkuId}
                        skuClick={skuClick}
                        pharmacyData={pharmacyData}
                        skuData={skuData}
                        allocationData={allocationData}
                        checked={checked}
                        cellClick={cellClick}
                    />
                </div>
                <hr />
                <SplitPage2Buttons setBtnClick={setBtnClick} />
            </div>
        </>
    );
};

export default React.memo(SplitPage2);
