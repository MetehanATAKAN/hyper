import React, { useState, useEffect, useCallback } from 'react';
import AddPharmacyTableDatas from '../pages/apps/Calendar/spllit/AddPharmacyTableDatas';
import { Col, Row, Table, Button } from 'react-bootstrap';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../utils/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { pharmacyDataSend, pharmacySplit, skuAbb } from '../redux/actions';
import AddPharmacyButtons from '../pages/apps/Calendar/spllit/AddPharmacyButtons';
import SuccessModal from '../components/Modals/SuccessModal';
import DeleteModal from './Modals/PharmacySplitDeletePharmacy';
import PharmacyShouldSave from '../components/Modals/PharmacyShouldSave';
import { useTranslation } from 'react-i18next';

const AddPharmacySplit2 = ({
    pharmacytTableData,
    setPharmacytTableData,
    homePageOpen,
    pharmacySaveControl,
    setPharmacySaveControl,
    btnClick,
    getPharmacySplitDatas,
}) => {
    const eventId = useSelector((state) => state.Calendar.eventId);
    const page = useSelector((state) => state.Calendar.changePage);
    const [buttonDisable, setButtonDisable] = useState({ disable: true, message: null });
    const { t } = useTranslation();
    const [clinicName, setClinicName] = useState([]);
    const [selectClinicName, setSelectClinicName] = useState();
    const [pharmacy, setPharmacy] = useState([]);
    const [selectPharmacy, setSelectPharmacy] = useState();
    const [inputPercent, setInputPercent] = useState(0);
    const [open, setOpen] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deletePharmacyInfo, setDeletePharmacyInfo] = useState({});
    const [shouldSaveModal, setShouldSaveModal] = useState(false);

    const dispatch = useDispatch();

    const selectChangeClinicName = (e) => {
        setSelectClinicName(e);
    };

    const selectPharmacyChange = (e) => {
        setSelectPharmacy(e);
    };

    const handleClickAddPharmacy = async () => {
        try {
            await pharmacy.map((data, index) =>
                data.value === selectPharmacy.value
                    ? setPharmacytTableData((prev) => [...prev, { ...selectPharmacy, inputPercent: 1 }])
                    : null
            );
            await setPharmacy(pharmacy.filter((data) => data.value !== selectPharmacy.value));
            await setSelectPharmacy(null);
        } catch (e) {
            console.log(e);
        }
        setOpen(false);
    };

    // Change Pharmacy Percent Input
    const splitChangeInput = useCallback((e) => {
        console.log(e.target.value);
            let inputPercentValue = e.target.value.split('');
            console.log('inputPercentValue', inputPercentValue);
            setPharmacySaveControl([]);
            let add_percent = 0;
            if (e.target.value > 100) {
                pharmacytTableData.map((data) =>
                    data.value === Number(e.target.id)
                        ? Number(e.target.value) === 0
                            ? (data.inputPercent = null)
                            : (data.inputPercent = Number(inputPercentValue[0] + inputPercentValue[1]))
                        : null
                );
            } else {
                pharmacytTableData.map((data) =>
                    data.value === Number(e.target.id)
                        ? Number(e.target.value) === 0
                            ? (data.inputPercent = null)
                            : (data.inputPercent = Number(e.target.value))
                        : null
                );

                pharmacytTableData.map((data) => (add_percent += data.inputPercent === null ? 0 : data.inputPercent));
                console.log(add_percent);
                setInputPercent(Number(add_percent));
                // setInputPercent(prev => 100 - Number(add_percent).toFixed(2));
            }
        },
        [pharmacytTableData]
    );

    const dataOnBlur = () => {
        pharmacytTableData.map((data) => (data.inputPercent === null ? (data.inputPercent = 0) : null));
    };

    //delete button modal
    const deleteButtonModal = async (e, data) => {
        await setDeletePharmacyInfo({ id: Number(e.target.id), data: data });
        await setDeleteModal(true);
    };

    const shouldSaveClose = () => {
        setShouldSaveModal(false);
    };

    //delete pharmacy
    const deletePharmacy = (deleteInfo) => {
        setPharmacySaveControl([]);
        setDeleteModal(false);
        const resultArray = pharmacytTableData.filter((data) => data.value !== deleteInfo.id);
        setPharmacytTableData([...resultArray]);
        setPharmacy((prev) => [...prev, deleteInfo.data]);
    };

    const savePharmacy = () => {
        setSuccessModal(true);
        setPharmacySaveControl(pharmacytTableData);
        const pharmacySaveBody = {
            EventId: eventId,
            details: pharmacytTableData.map((data) => ({
                ClinicId: selectClinicName.value,
                ClinicName: selectClinicName.label,
                CustomerId: 0,
                CustomerName: 'string',
                PharmacyId: data.value,
                PharmacyName: data.label,
                Category: data.category,
                PharmacyPercent: data.inputPercent,
            })),
        };

        FetchApiPost('services/Daywork/Split/SaveClinicConnectedPharmacy', 'POST', pharmacySaveBody)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        setOpen(false);
    }, []);

    useEffect(() => {
        if (inputPercent === 100) {
            setButtonDisable({ disable: false, message: null });
        } else {
            setButtonDisable({ disable: true, message: t('Заполните все 100 значений.') });
        }
    }, [inputPercent]);

    useEffect(() => {
        //

        //
        // FetchApiGet(`api/OldSystem/GetClinicSplit?EventId=${eventId}`, 'GET')
        //     .then((response) => response.json())
        //     .then((response) => {
        //         setClinicName([]);
        //         response.map((data) => {
        //             return setClinicName((prev) => [
        //                 ...prev,
        //                 {
        //                     value: data.ClinicId,
        //                     label: data.ClinicName,
        //                     clinicCity: data.ClinicCity,
        //                     clinicAdress: data.ClinicAddress,
        //                 },
        //             ]);
        //         });
        //         setSelectClinicName({ value: response[0].ClinicId, label: response[0].ClinicName });
        //     })
        //     .catch((error) => console.log(error));


            // work place eklendikten sonraki yeni api
            FetchApiPost('services/CRM/WorkPlace/GetClinicsForVisitPlanning', 'POST', {
                employeeId: Number(localStorage.getItem('userEmpId')),
                placeIds: [309]
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setSelectClinicName({ value: data[0].clinicId, label: data[0].clinicName });
                        setClinicName(data.map(i => ({
                            value: i.clinicId,
                            label: i.clinicName,
                            clinicCity: i.clinicCity,
                            clinicAdress: i.clinicAddress,
                         })))
                    })
                }
            })

        // FetchApiGet(`api/OldSystem/GetPharmacyByCustomer?EventId=${eventId}`, 'GET')
        //     .then((response) => response.json())
        //     .then((response) => {
        //         setPharmacy([]);
        //         response.map((data) => {
        //             return setPharmacy((prev) => [
        //                 ...prev,
        //                 {
        //                     value: data.PharmacyId,
        //                     label: data.PharmacyName+' / '+data.PharmacyAddress+' / '+data.PharmacyCity,
        //                     pharmacyAddress: data.PharmacyAddress,
        //                     pharmacyCity: data.PharmacyCity,
        //                     category: data.Category,
        //                     inputPercent: 0,
        //                 },
        //             ]);
        //         });
        //     })
        //     .catch((error) => console.log(error));

            FetchApiPost('services/CRM/WorkPlace/GetPharmaciesForVisitPlanning', 'POST', {
                employeeId: Number(localStorage.getItem('userEmpId')),
                eventId: 0,
                clinicIds: [0]
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPharmacy(data.map(i => ({
                            value: i.pharmacyId,
                            label: i.pharmacyName+' / '+i.pharmacyAddress+' / '+i.pharmacyCity,
                            pharmacyAddress: i.pharmacyAddress,
                            pharmacyCity: i.pharmacyCity,
                            category: i.category,
                            inputPercent: 0,
                        })))
                    })
                }
            })
    }, [eventId]);

    useEffect(() => {
        const calculator = () => {
            let temp_data = [...pharmacytTableData];
            let sumInputPercent = 0;
            temp_data.map((data) => (sumInputPercent += data.inputPercent));
            setInputPercent(Number(sumInputPercent));
        };
        calculator();
        dispatch(pharmacyDataSend(pharmacytTableData));
    }, [pharmacytTableData]);

    return (
        <div className="add-pharmacy">
            {/* <Row>
                <Col xs='4' className='add_pharmacy_headers'>clinic</Col>
                <Col xs='6' className='add_pharmacy_headers'>pharmacy</Col>
            </Row>
            <Row className='split-header'>
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
            </Row>
            <hr style={{ backgroundColor: 'gray' }}></hr>
            <Row className='pharmacy_percent'>
                <Col xs='9' className='add_pharmacy_headers'>pharmacy</Col>
                <Col xs='2'>
                    <div className={inputPercent === 100 ? 'percentSuccess' : 'percentDanger'}>
                        {inputPercent}
                    </div>
                </Col>
            </Row> */}
            {/* <div className='pharmacy_table'>
                <Table bordered size="sm">
                    <tbody>
                        {
                            pharmacytTableData.map((data, index) => (
                                <AddPharmacyTableDatas key={index} data={data} index={index} placeHolder={100 / pharmacytTableData.length} splitChangeInput={splitChangeInput} deletePharmacy={deletePharmacy} dataOnBlur={dataOnBlur} />
                            ))
                        }
                    </tbody>
                </Table>
            </div> */}
            <div className="pharmacy_table" style={{ height: '500px' }}>
                <Table bordered size="sm">
                    <thead>
                        <tr>
                            <th>{t('PHARMACIES')}</th>
                            <th>C</th>
                            <th className={inputPercent === 100 ? 'percentSuccess' : 'percentDanger'}>
                                <div>
                                    {/* {
                                    (-0.5 < inputPercent && inputPercent < 0.5)
                                        ? 0.00
                                        : inputPercent.toFixed(2)
                                } */}
                                    {`${inputPercent}%`}
                                </div>
                            </th>
                            <th onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
                                +
                            </th>
                            {open && (
                                <>
                                    <div className="pharmacy_split_select">
                                        <Row>
                                            <Select
                                                isMulti={false}
                                                options={clinicName}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={t('deneme')}
                                                value={selectClinicName}
                                                defaultValue={pharmacytTableData[0]}
                                                onChange={selectChangeClinicName}
                                            />
                                        </Row>
                                        <Row>
                                            <Select
                                                isMulti={false}
                                                options={pharmacy}
                                                className="react-select2 react-select"
                                                classNamePrefix="react-select"
                                                placeholder={t('Select...')}
                                                value={selectPharmacy}
                                                onChange={selectPharmacyChange}
                                            />
                                        </Row>
                                        <div style={{ backgroundColor: 'white', marginTop: '15px' }}>
                                            <Row>
                                                <Col xs="7"></Col>
                                                <Col xs="5" className="float-right">
                                                    <Button
                                                        className="btn btn-light me-1"
                                                        onClick={() => setOpen(!open)}>
                                                        {t('cancel')}
                                                    </Button>
                                                    {/* <Button type="submit" className="btn btn-primary py-1" >
                                                add
                                            </Button> */}
                                                    <Button
                                                        disabled={selectPharmacy === undefined ? true : false}
                                                        className="btn btn-add me-1"
                                                        onClick={handleClickAddPharmacy}>
                                                        {t('add')}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="bg"></div>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {pharmacytTableData.map((data, index) => (
                            <AddPharmacyTableDatas
                                key={index}
                                data={data}
                                index={index}
                                placeHolder={100 / pharmacytTableData.length}
                                splitChangeInput={splitChangeInput}
                                deletePharmacy={deletePharmacy}
                                deleteButtonModal={deleteButtonModal}
                                dataOnBlur={dataOnBlur}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
            <hr style={{ backgroundColor: 'gray' }}></hr>
            <Row className="add-pharmacy-buttons">
                <AddPharmacyButtons
                    btnClick={btnClick}
                    setShouldSaveModal={setShouldSaveModal}
                    pharmacytTableData={pharmacytTableData}
                    pharmacySaveControl={pharmacySaveControl}
                    setPharmacySaveControl={setPharmacySaveControl}
                    inputPercent={inputPercent}
                    savePharmacy={savePharmacy}
                    homePageOpen={homePageOpen}
                    getPharmacySplitDatas={getPharmacySplitDatas}
                />
            </Row>

            {successModal === true ? (
                <SuccessModal messages={t('Save Successfuly.')} show={successModal} handleClose={setSuccessModal} />
            ) : null}
            {deleteModal === true ? (
                <DeleteModal
                    messages={t('Are you sure want to delete this pharmacy?')}
                    deleteItem={deletePharmacy}
                    deletePharmacyInfo={deletePharmacyInfo}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                />
            ) : null}
            {shouldSaveModal === true && (
                <PharmacyShouldSave
                    show={shouldSaveModal}
                    handleClose={shouldSaveClose}
                    messages={t('Please save the changes.')}
                />
            )}
        </div>
    );
};

export default AddPharmacySplit2;
