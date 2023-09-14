import React, { useState, useEffect } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { FetchApiPost } from '../../../../../utils/http.helper';

const AddCityModal = ({ show, setShow, zone, country, setCityOptions }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();

    const [city, setCity] = useState("");
    console.log(zone, country)
    useEffect(() => {
        if(city.trim().length > 0){
            setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true);
        }
    }, [city])

    useEffect(() => {
        if(isClickAdd){
            FetchApiPost('services/CRM/City/CreateCity', 'POST', {
                cityName: city.trim(),
                createdBy: localStorage.getItem('userName'),
                countryId: country.value
            }).then(res => {
                if(res.status === 201){
                    res.json().then(({ data }) => {
                        setCityOptions(prev => [{ value: data.id, label: data.cityName }, ...prev])
                        setShow(false)
                    })
                    
                }
            })
        }
    }, [isClickAdd])

    return (
        <>
            {show && (
                <GlobalModal
                    showModal={show}
                    setShowModal={setShow}
                    toggle={() => setShow(false)}
                    header={t('add City')}
                    size={'md'}
                    body={
                        <div>
                            <label>
                            {country.label} / {zone.label} 
                            </label>
                            <NewInput 
                                label={"city"}
                                placeholder="city"
                                width={"100%"}
                                value={city}
                                setValue={setCity}
                                isStar={true}
                            />
                        </div>
                    }
                    footer={
                        <>
                            <Button onClick={() => setShow(false)} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button
                                onClick={() => setIsClickAdd(true)}
                                disabled={addButtonDisableStatus}
                                variant="primary">
                                {t('add')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default AddCityModal;
