import React, { useState, useEffect, useCallback } from 'react'
import { Col, Row, Table, Button } from 'react-bootstrap'
import Select from 'react-select'
import { FetchApiGet } from '../../../../../utils/http.helper'
import { useDispatch, useSelector } from 'react-redux'
import { pharmacyDataSend } from '../../../../../redux/actions'
import AddPharmacySplitTableDatas from './AddPharmacySplitTableDatas'
import DoctorInfo from '../../DoctorInfo'
import { useTranslation } from 'react-i18next'
import DeleteModal from '../../../../../components/Modals/PharmacySplitDeletePharmacy'
import SuccessModal from '../../../../../components/Modals/SuccessModal'
const AddPharmacy = (props) => {
    const { setReportTitle, successModal, setSuccessModal, changePage, onClick, prevSplitPage, setButtonDisable, pharmacytTableData, setPharmacytTableData, clinicName, setClinicName, selectClinicName, setSelectClinicName, pharmacy, setPharmacy, selectPharmacy, setSelectPharmacy, inputPercent, setInputPercent, pharmacytTableDataCopy } = props;
   
    const eventId = useSelector((state) => state.Calendar.eventId);
    const page = useSelector((state) => state.Calendar.changePage);
    
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletePharmacyInfo, setDeletePharmacyInfo] = useState({});
    const appStatus = useSelector(state => state.Calendar.appStatus);
    const { t } = useTranslation();
    
    const selectChangeClinicName = (e) => {
        setSelectClinicName(e)
    }
    const selectPharmacyChange = (e) => {
        setSelectPharmacy(e);
    }
    
    const handleClickAddPharmacy = async () => {
        try {
            await pharmacy.map((data, index) => (
                data.value === selectPharmacy.value
                    ? setPharmacytTableData(prev => [...prev, { ...selectPharmacy, inputPercent: 1 }])
                    : null
            ))
            await setPharmacy(pharmacy.filter((data) => data.value !== selectPharmacy.value))
            await setSelectPharmacy(null);
        }
        catch (e) {
            console.log(e);
        }
        setOpen(!open)
    }
    
    // Change Pharmacy Percent Input
    const splitChangeInput = useCallback((e) => {
        let inputPercentValue=(e.target.value).split('');
        
        let add_percent = 0;
        if(e.target.value>100) {
            pharmacytTableData.map((data) => (
                data.value === Number(e.target.id)
                    ? Number(e.target.value) === 0
                        ? data.inputPercent = null
                        : data.inputPercent = Number(inputPercentValue[0]+inputPercentValue[1])
                    : null
            ))
        }
        else {
            pharmacytTableData.map((data) => (
                data.value === Number(e.target.id)
                    ? Number(e.target.value) === 0
                        ? data.inputPercent = null
                        : data.inputPercent = Number(e.target.value)
                    : null
            ))
    
            pharmacytTableData.map((data) => (
                add_percent += data.inputPercent === null ? 0 :data.inputPercent
            ))

                setInputPercent(Number(add_percent));
        }
        
    }, [pharmacytTableData])

    // const splitChangeInput = useCallback((e) => {
    //     console.log(Number(e.target.value));
    //     let add_percent = 0;
    //     pharmacytTableData.map((data) => (
    //         data.value === Number(e.target.id)
    //             ? Number(e.target.value) === 0
    //                 ? data.inputPercent = null
    //                 : data.inputPercent = Number(e.target.value)
    //             : null
    //     ))
    //     pharmacytTableData.map((data) => (
    //         add_percent += data.inputPercent === null ? 0 : data.inputPercent
    //     ))
    //     setInputPercent(add_percent);
    //     // setInputPercent(prev => 100 - Number(add_percent).toFixed(2));
    // }, [pharmacytTableData])



    const splitInputOnBlur = (id, value) => {
       
        // pharmacytTableData.map((data) => (
        //     data.inputPercent === null
        //     ?data.inputPercent = 1
        //     :null
        // ))
    }
    // //delete pharmacy
    // const deletePharmacy = (e, data) => {
    //     const resultArray = pharmacytTableData.filter(data => data.value !== Number(e.target.id));
    //     setPharmacytTableData([...resultArray])
    //     setPharmacy(prev => [...prev, data])
    // }

    //delete button modal
    const deleteButtonModal = async (e, data) => {
        await setDeletePharmacyInfo({ id: Number(e.target.id), data: data });
        await setDeleteModal(true);
    }

    //delete pharmacy
    const deletePharmacy = (deleteInfo) => {
        setDeleteModal(false);
        const resultArray = pharmacytTableData.filter(data => data.value !== deleteInfo.id);
        setPharmacytTableData([...resultArray])
        setPharmacy(prev => [...prev, deleteInfo.data])
    }

    // const savePharmacy = () => {
    //     const pharmacySaveBody = {
    //         EventId: eventId,
    //         details: pharmacytTableData.map((data) => (
    //             {
    //                 ClinicId: selectClinicName.value,
    //                 ClinicName: selectClinicName.label,
    //                 CustomerId: 0,
    //                 CustomerName: 'string',
    //                 PharmacyId: data.value,
    //                 PharmacyName: data.label,
    //                 Category: data.category,
    //                 PharmacyPercent: data.inputPercent
    //             }
    //         ))

    //     }
    //     FetchApiPost('services/Daywork/Split/SaveClinicConnectedPharmacy', 'POST', pharmacySaveBody)
    //         .then(response => response.json())
    //         .then(response => console.log(response))
    //         .catch(error => console.log(error))
    // }

    const pharmacyControl = () => {
        let equal = true;
        for (let i = 0; i < pharmacytTableData.length; i++) {
            try {
                if(pharmacytTableData[i].inputPercent !== pharmacytTableDataCopy[i].inputPercent){
                    equal = false;
                }
            } catch (error) {
                equal = false;
            }
        }
        return equal;
    }


    useEffect(() => {
        if(appStatus === 3){
            if (inputPercent === 100) {
                if(pharmacyControl() === true){
                    setButtonDisable({ disable: false, message: null })
                }else{
                    setButtonDisable({ disable: true, message: t("You have not saved the changes.") })
                }
            }
            else {
                setButtonDisable({ disable: true, message: t('Fill in all 100 values.') })
            }
        }else{
            setButtonDisable({ disable: false, message: null })
        }
        
    }, [inputPercent])

    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetClinicSplit?EventId=${eventId}`, 'GET')
            .then((response) => response.json())
            .then((response) => {
                setClinicName([])
                response.map((data) => {
                    return (
                        setClinicName(prev => [...prev, { value: data.ClinicId, label: data.ClinicName, clinicCity: data.ClinicCity, clinicAdress: data.ClinicAddress }])
                    )
                })
                setSelectClinicName({ value: response[0].ClinicId, label: response[0].ClinicName })
            })
            .catch((error) => console.log(error))

        FetchApiGet(`api/OldSystem/GetPharmacyByCustomer?EventId=${eventId}`, 'GET')
            .then((response) => response.json())
            .then((response) => {
                setPharmacy([])
                response.map((data) => {
                    return (
                        setPharmacy(prev => [...prev, 
                            {   value           :   data.PharmacyId, 
                                pharmacyId      :   data.PharmacyId,
                                pharmacyName    :   data.PharmacyName+'/'+data.PharmacyAddress+'/'+data.PharmacyCity,
                                label           :   data.PharmacyName+'/'+data.PharmacyAddress+'/'+data.PharmacyCity, 
                                pharmacyAddress :   data.PharmacyAddress, 
                                pharmacyCity    :   data.PharmacyCity, 
                                category        :   data.Category, 
                                inputPercent    :   0 ,
                                clinicId        :   data.ClinicId,
                                clinicName      :   data.ClinicName,
                                customerId      :   data.CustomerId,
                                customerName    :   data.CustomerName
                            }])
                    )
                })
            })
            .catch((error) => console.log(error))
    }, [eventId])

    const dispatch = useDispatch();

    useEffect(() => {
        const calculator = () => {
            let temp_data = [...pharmacytTableData];
            let sumInputPercent = 0;
            temp_data.map((data) => (
                sumInputPercent += data.inputPercent
            ))
            setInputPercent(Number(sumInputPercent));
        }
        calculator();
        dispatch(pharmacyDataSend(pharmacytTableData));
    }, [pharmacytTableData])
    const [open, setOpen] = useState(false);

    return (
        <div className='add-pharmacy'>
            {/* <Row>
                <Col xs='4' className='add_pharmacy_headers'>clinic</Col>
                <Col xs='6' className='add_pharmacy_headers'>pharmacy</Col>
            </Row> */}
            <DoctorInfo />
            {/* <Row className='split-header'>
                <Col xs={4}>

                    <Select
                        isMulti={false}
                        options={clinicName}
                        className='react-select'
                        classNamePrefix="react-select"
                        placeholder="Select..."
                        value={selectClinicName}
                        defaultValue={pharmacytTableData[0]}
                        onChange={selectChangeClinicName}
                    />
                </Col>
                <Col xs={6}>
                    <Select
                        isMulti={false}
                        options={pharmacy}
                        className='react-select'
                        classNamePrefix="react-select"
                        placeholder="Select..."
                        value={selectPharmacy}
                        onChange={selectPharmacyChange}
                    />
                </Col>
                <Col xs={2}>
                    <Button className="btn btn-add me-1" onClick={handleClickAddPharmacy}>
                        add
                    </Button>
                </Col>
            </Row> */}
            {/* <hr style={{ backgroundColor: 'gray' }}></hr> */}
            {/* <Row className='pharmacy_percent'>
                <Col xs='9' className='add_pharmacy_headers'>pharmacy</Col>
                <Col xs='2'>
                    <div className={-0.5 < inputPercent && inputPercent < 0.5 ? 'percentSuccess' : 'percentDanger'}>
                        {
                            (-0.5 < inputPercent && inputPercent < 0.5)
                                ? 0.00
                                : inputPercent.toFixed(2)
                        }
                    </div>
                </Col>
            </Row> */}
            <div className='pharmacy_table' style={{ height: '500px' }}>
                <Table bordered size="sm">
                    <thead>
                        <tr>
                            <th>PHARMACIES</th>
                            <th>C</th>
                            <th className={inputPercent === 100 ? 'percentSuccess' : 'percentDanger'}><div >
                                {`${inputPercent}%`}
                            </div></th>
                            <th onClick={() => appStatus !== 4 && setOpen(!open)} style={{ cursor: 'pointer' }}>+</th>
                            {
                                open &&
                                <>
                                    <div className='pharmacy_split_select'>
                                        <Row>
                                            <Select
                                                isMulti={false}
                                                options={clinicName}
                                                className='react-select'
                                                classNamePrefix="react-select"
                                                placeholder={t("Select...")}
                                                value={selectClinicName}
                                                defaultValue={pharmacytTableData[0]}
                                                onChange={selectChangeClinicName}
                                            />
                                        </Row>
                                        <Row>
                                            <Select
                                                isMulti={false}
                                                options={pharmacy}
                                                className='react-select2 react-select'
                                                classNamePrefix="react-select"
                                                placeholder={t("Select...")}
                                                value={selectPharmacy}
                                                onChange={selectPharmacyChange}
                                            />
                                        </Row>
                                        <div style={{ backgroundColor: 'white', marginTop: '15px' }}>
                                            <Row>
                                                <Col xs='7'></Col>
                                                <Col xs='5' className='float-right'>
                                                    <Button className="btn btn-light me-1" onClick={() => setOpen(!open)} >
                                                        {t('cancel')}
                                                    </Button>
                                                    {/* <Button type="submit" className="btn btn-primary py-1" >
                                                add
                                            </Button> */}
                                                    <Button disabled={selectPharmacy === undefined ? true : false} className="btn btn-add me-1" onClick={handleClickAddPharmacy}>
                                                        {t('add')}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className='bg'></div>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody >
                        {
                            pharmacytTableData.map((data, index) => (
                                <AddPharmacySplitTableDatas key={index} data={data} index={index} placeHolder={100 / pharmacytTableData.length} splitInputOnBlur={splitInputOnBlur} deleteButtonModal={deleteButtonModal} splitChangeInput={splitChangeInput} deletePharmacy={deletePharmacy} prevSplitPage={prevSplitPage} />
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            {
                successModal === true
                    ? <SuccessModal messages={t('Save Successfuly.')} show={successModal} handleClose={setSuccessModal} pharmacyControl={pharmacyControl} />
                    : null
            }
            {
                deleteModal === true
                    ? <DeleteModal messages={t('Are you sure want to delete this pharmacy?')} deleteItem={deletePharmacy} deletePharmacyInfo={deletePharmacyInfo} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
                    : null
            }
        </div>
    )
}

export default AddPharmacy