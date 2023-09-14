import React, { useState } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import '../../../../../assets/scss/custom/visitContent/promoSubject.scss';
import FailModal from '../../../../../components/FailModal';

const Body = ({ isClickAdd, setIsClickAdd, setShowModal, setAddButtonDisableStatus, selectedItem, getFilterData }) => {
    const { RangePicker } = DatePicker;
    const history = useHistory();
    const { t } = useTranslation();
    let today = new Date();
    const [workPlaceHeader, setWorkPlaceHeader] = useState();

    const [clientTypeName, setClientTypeName] = useState();

    const [place, setPlace] = useState(selectedItem && {value:selectedItem.placeId,label:selectedItem.placeName});
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [typeOfPriorityOptions, setTypeOfPriorityOptions] = useState([]);

    const [clientType, setClientType] = useState([]);
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [brandOptions, setBrandOptions] = useState([]);
    const [brand, setBrand] = useState(selectedItem && {value:selectedItem.brand.globalBrandId,label:selectedItem.brand.globalBrandName});

    const [indicationOptions, setIndicationOptions] = useState([]);
    const [indication, setIndication] = useState(selectedItem && {value:selectedItem.indication.indicationId,label:selectedItem.indication.indication});

    const [profileOptions, setProfileOptions] = useState([]);
    const [profile, setProfile] = useState(selectedItem && {value:selectedItem.profile.profileId,label:selectedItem.profile.profileName});

    const [needOptions, setNeedOptions] = useState([]);
    const [need, setNeed] = useState(selectedItem && {value:selectedItem.need.needId,label:selectedItem.need.needName});

    const [benefitOptions, setBenefitOptions] = useState([]);
    const [benefit, setBenefit] = useState(selectedItem && selectedItem.benefits.map(data => ({value:data.benefitId,label:data.benefitName})));

    const [specializationOptions, setSpecializationOptions] = useState([]);
    const [specialization, setSpecialization] = useState(selectedItem && selectedItem.specializations.map(data => ({value:data.specId,label:data.specName})));

    const [typeOptions, setTypeOptions] = useState([
        { value: 0, label: t('Child') },
        { value: 1, label: t('Parent') },
    ]);
    const [type, setType] = useState(selectedItem.type === 1 ? { value: 1, label: t('Parent') } : { value: 0, label: t('Child') } );

    const [promoSubjectName, setPromoSubjectName] = useState(selectedItem && selectedItem.name);


    const [startDate, setStartDate] = useState(selectedItem.startDate);
    const [endDate, setEndDate] = useState(selectedItem.endDate);
    
    const [message, setMessage] = useState('');
    const [failModal, setFailModal] = useState(false);

    const disabledDate = (current) => {
        // Can not select days before today
        return current && current < moment().startOf('day');
    };

    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(moment(start).format());
            setEndDate(moment(end).format());
        } else {
            setStartDate([]);
            setEndDate([]);
        }
    };


const handleChangeSelect = (name) => {
    switch (name) {
        case 'place':
            setBrand();
            setBrandOptions([]);
            setIndication();
            setIndicationOptions([]);
            setProfile();
            setProfileOptions([]);
            setSpecialization([]);
            setSpecializationOptions([]);
            setNeed();
            setNeedOptions([]);
            setBenefitOptions([])
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'place type':
            setBrand();
            setBrandOptions([]);
            setIndication();
            setIndicationOptions([]);
            setProfile();
            setProfileOptions([]);
            setSpecialization([]);
            setSpecializationOptions([]);
            setNeed();
            setNeedOptions([]);
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'priority':
            setBrand();
            setBrandOptions([]);
            setIndication();
            setIndicationOptions([]);
            setProfile();
            setProfileOptions([]);
            setSpecialization([]);
            setSpecializationOptions([]);
            setNeed();
            setNeedOptions([]);
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'client':
            setBrand();
            setBrandOptions([]);
            setIndication();
            setIndicationOptions([]);
            setProfile();
            setProfileOptions([]);
            setSpecialization([]);
            setSpecializationOptions([]);
            setNeed();
            setNeedOptions([]);
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'brand':
            setIndication();
            setIndicationOptions([]);
            setProfile();
            setProfileOptions([]);
            setSpecialization([]);
            setSpecializationOptions([]);
            setNeed();
            setNeedOptions([]);
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'indication':
            setProfile();
            setProfileOptions([]);
            setSpecialization([]);
            setSpecializationOptions([]);
            setNeed();
            setNeedOptions([]);
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'profile':
            setSpecialization([]);
            setSpecializationOptions([]);
            setNeed();
            setNeedOptions([]);
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'need':
            setBenefit([])
            setBenefitOptions([])
            break;
        case 'specialization':
            setNeed();
            setNeedOptions([]);
            // setBenefit()
            // setBenefitOptions([])
            break;
        default:
            break;
    }
};


  return (
    <div className="promo-subject-add-modal">
            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <SingleSelects
                    label={workPlaceHeader?.pl ? workPlaceHeader?.pl?.headerName : 'place'}
                    width={'217px'}
                    options={placeOptions}
                    selectedItems={place}
                    setSelectedItems={setPlace}
                    isStar={true}
                    handleChange={() => handleChangeSelect('place')}
                    disabled={true}
                />
                <MultipleSelects
                    label={workPlaceHeader?.pt ? workPlaceHeader?.pt?.headerName : 'place type'}
                    width={'217px'}
                    options={placeTypeOptions}
                    selectedItems={placeType}
                    setSelectedItems={setPlaceType}
                    isStar={true}
                    handleChange={() => handleChangeSelect('place type')}
                    disabled={true}
                />
            </div>

            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <MultipleSelects
                    label={workPlaceHeader?.tp ? workPlaceHeader?.tp?.headerName : 'type of priority'}
                    width={'217px'}
                    options={typeOfPriorityOptions}
                    selectedItems={typeOfPriority}
                    setSelectedItems={setTypeOfPriority}
                    isStar={true}
                    handleChange={() => handleChangeSelect('priority')}
                    disabled={true}
                />
                <MultipleSelects
                    label={clientTypeName ? clientTypeName[0].headerName : 'client type'}
                    width={'217px'}
                    options={clientTypeOptions}
                    selectedItems={clientType}
                    setSelectedItems={setClientType}
                    handleChange={() => handleChangeSelect('client')}
                    disabled={true}
                />
            </div>

            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <SingleSelects
                    label="global brand"
                    width={'100%'}
                    options={brandOptions}
                    selectedItems={brand}
                    setSelectedItems={setBrand}
                    isStar={true}
                    handleChange={() => handleChangeSelect('brand')}
                    disabled={true}
                />
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <SingleSelects
                    label="indication"
                    width={'217px'}
                    options={indicationOptions}
                    selectedItems={indication}
                    setSelectedItems={setIndication}
                    isStar={true}
                    handleChange={() => handleChangeSelect('indication')}
                    disabled={true}
                />
                <SingleSelects
                    label="profile"
                    width={'217px'}
                    options={profileOptions}
                    selectedItems={profile}
                    setSelectedItems={setProfile}
                    isStar={true}
                    handleChange={() => handleChangeSelect('profile')}
                    disabled={true}
                />
            </div>
            <div style={{ display: 'flex', columnGap: '1rem'}}>
                <SingleSelects
                    label="need"
                    width={'217px'}
                    options={needOptions}
                    selectedItems={need}
                    setSelectedItems={setNeed}
                    isStar={true}
                    handleChange={() => handleChangeSelect('need')}
                    disabled={true}
                />
                <MultipleSelects
                    label="benefit"
                    width={'217px'}
                    options={benefitOptions}
                    selectedItems={benefit}
                    setSelectedItems={setBenefit}
                    isStar={true}
                    disabled={true}
                />
            </div>
            <div style={{ display: 'flex', columnGap: '1rem' }}>
                <MultipleSelects
                    label="specialization"
                    width={'217px'}
                    options={specializationOptions}
                    selectedItems={specialization}
                    setSelectedItems={setSpecialization}
                    isStar={clientType ? true : false}
                    disabled={true}
                    handleChange={() => handleChangeSelect('specialization')}
                />
                <SingleSelects
                    label="type"
                    width={'217px'}
                    options={typeOptions}
                    selectedItems={type}
                    setSelectedItems={setType}
                    isStar={true}
                    disabled={true}
                />
            </div>

            <NewTextArea
                label="promo subject name"
                width={'100%'}
                value={promoSubjectName}
                setValue={setPromoSubjectName}
                isStar={true}
                placeholder="promo subject name"
                disabled
            />

            <div className="promo-subject-datepicker">
                <label>
                    {t('start end date')}
                    <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                </label>
                <RangePicker
                    className="promo-subject-datepicker__date-picker"
                    style={{
                        borderRadius: '15px',
                        width: '100%',
                        height: '26px',
                        margin: '0 8px 26px 0',
                        borderColor: '#aaa',
                    }}
                    onChange={onChangeDate}
                    format="DD/MM/YYYY"
                    separator={<i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>}
                    disabledDate={disabledDate}
                    disabled={[true,false]}
                    placeholder={[t('Start Date'), t('End Date')]}
                    defaultValue={[moment(startDate), moment(endDate)]}
                />
            </div>
            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={message} />}
        </div>
  )
}

export default Body;