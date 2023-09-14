import React, { useState, useEffect } from 'react';
import PhysicianTable from './PhysicianTable';
import { Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeSplitPage } from '../../../../../redux/actions';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { physicianTableData } from '../splitPage2/SplitPage2';
import  PharmacyShouldSave from '../../../../../components/Modals/PharmacyShouldSave';

const PhysicianTableDatas = ({ physicianData, setPhysicianData, physicianDataCopy, setPhysicianDataCopy }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const physicianTableDataBody = useSelector((state) => state.Calendar.pharmacyDatasBody);
    const [show, setShow] = useState(false);
    
    const savePhysiciansSplit = () => {

        console.log('savephysciansplit');
        const savePhysiciansSplitBody = {
            createPhysicianSplitDetailCommands: physicianData.map((data) => ({
                customerId: data.customerId,
                customerName: data.customerName,
                customerCategory: data.customerCategory,
                pharmacyId: data.pharmacyId,
                pharmacyName: data.pharmacyName,
                skuId: data.skuId,
                skuName: data.skuName,
                salesActual:data.salesActual,
                loyality: data.loyality,
                allocation: data.allocation,
            })),
        };
        setPhysicianDataCopy(physicianData?.map(physician => ({
            allocation: physician.allocation,
            customerCategory: physician.customerCategory,
            customerId: physician.customerId,
            customerName: physician.customerName,
            loyality: physician.loyality,
            pharmacyId: physician.pharmacyId,
            pharmacyName: physician.pharmacyName,
            salesActual: physician.salesActual,
            skuId: physician.skuId,
            skuName: physician.skuName
        })))
        FetchApiPost('services/Daywork/Split/SavePhysicianSplitDetail', 'POST', savePhysiciansSplitBody)
            .then((response) => response.json())
            .then((response) => console.log('savePhysiciansSplitBody =>', response))
            .catch((error) => console.log(error));
    };

    const resetPhysiciansSplit = () => {
        const response= physicianTableData(physicianTableDataBody);
        response.then((response)=>response.json())
        .then((response)=>setPhysicianData(response.data))
        .catch((error)=>console.log(error));
    }

    const physicianControl = () => {
        let equal = true;
        for (let i = 0; i < physicianData?.length; i++) {
            if(physicianData[i]?.allocation !== physicianDataCopy[i]?.allocation){
                equal = false;
            }
        }
        return equal;
    }

    const changePageControl = () => {
        console.log(physicianControl());
        if(physicianControl() === true){
            dispatch(changeSplitPage(2))
        }else{
            setShow(true)
        }
        
    }
    useEffect(() => {
        setPhysicianDataCopy(physicianData?.map(physician => ({
            allocation: physician.allocation,
            customerCategory: physician.customerCategory,
            customerId: physician.customerId,
            customerName: physician.customerName,
            loyality: physician.loyality,
            pharmacyId: physician.pharmacyId,
            pharmacyName: physician.pharmacyName,
            salesActual: physician.salesActual,
            skuId: physician.skuId,
            skuName: physician.skuName
        })))
    }, [])

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div>
            <PharmacyShouldSave messages={t("You have not saved the changes.")} show={show} handleClose={handleClose} />
            <PhysicianTable physicianData={physicianData} setPhysicianData={setPhysicianData} savePhysiciansSplit={savePhysiciansSplit} />
            <hr />
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <Button
                        variant="success"
                        className="btn btn-light me-1 float-right"
                        onClick={() => changePageControl()}>
                        {t('previous')}
                    </Button>
                    <div>
                    <Button variant="outline-danger" onClick={resetPhysiciansSplit}>
                        <i className="fa-solid fa-recycle "></i>
                        {t('reset')}
                    </Button>{' '}
                    <Button onClick={savePhysiciansSplit} style={{marginLeft:'5px'}} variant="outline-success">
                        <i className="fa-solid fa-floppy-disk icon"></i>
                        {t('save')}
                    </Button>{' '}
                    </div>
            </div>
        </div>
    );
};

export default React.memo(PhysicianTableDatas);
