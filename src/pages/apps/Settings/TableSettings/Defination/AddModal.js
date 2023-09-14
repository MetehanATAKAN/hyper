import React, { useState } from 'react'
import GlobalModal from '../../../../../components/GlobalNew/Modal'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { AutoComplete } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect } from 'react';
import Loading from '../../../../../components/Loading';
import ErrorModal from './ErrorModal';

const AddModal = ({
    show,
    setShow,
    optionsDefinationsName,
    setOptionsDefinationsName,
    optionsAbb,
    setOptionsAbb,
    setSelectAddHeader,
    addHeader,
    selectAddHeader,
    applyFilter
}) => {

    const { t } = useTranslation();
    const history = useHistory();
    const createdBy = localStorage.getItem('userName');

    const [warning, setwarning] = useState(false);
    const [abbWarning, setAbbWarning] = useState(false);
    const [abbContentWarning, setAbbContentWarning] = useState(false);

    /**Error Modal */
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [errorModalMessages, setErrorModalMessages] = useState('');

    const [addDefinationLoading, setAddDefinationLoading] = useState(false);

    const [keyDown, setKeyDown] = useState(null);

    //defination type 
    const [definationType, setDefinationType] = useState([]);
    const [selectDefinationType, setSelectDefinationType] = useState();

    //defination name
    const [definationName, setDefinationName] = useState('');

    //abbrevation
    const [abbrevation, setAbbrevation] = useState('');

    //description
    const [description, setDescription] = useState('');

    const [inputs, setInputs] = useState([
        {
            id: 1,
            definationName: '',
            abbrevation: '',
            description: '',
            definationContentMessages: false,
            abbContentMessages: false,
            abbLengthMessages: false
        }
    ])
    
    const addInputs = () => {
        setInputs(prev => [...prev,{
            id: inputs.length+1,
            definationName: '',
            abbrevation: '',
            description: '',
            definationContentMessages: false,
            abbContentMessages: false,
            abbLengthMessages: false
        }])
    }

    const onChangeControl = (value, obj, name) => {

        if (name === 'abb') {
            const data = value.toUpperCase().trim();
            const valueLength = data.length;
            const optionsLength = optionsAbb?.filter(el => el.label === data);

            if (keyDown !== 32) {
                if (valueLength > 4) {
                    const newInputs = inputs.map(item => {
                        if (item.id === obj.id) {
                            item.abbLengthMessages = true;
                        }
                        return item
                    })
                    setInputs(newInputs)
                }
                else {
                    const newInputs = inputs.map(item => {
                        if (item.id === obj.id) {
                            item.abbLengthMessages = false;
                        }
                        return item
                    })
                    setInputs(newInputs)
                    if (optionsLength.length !== 0) {
                        const newInputs = inputs.map(item => {
                            if (item.id === obj.id) {
                                item.abbContentMessages = true;
                            }
                            return item
                        })
                        setInputs(newInputs)
                    }
                    else {
                        const newInputs = inputs.map(item => {
                            if (item.id === obj.id) {
                                item.abbrevation = data;
                                item.abbContentMessages = false;
                            }
                            return item
                        })
                        setInputs(newInputs)
                    }
                }
            }

        }
        else if (name === 'notAbb') {
            const data = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            const optionsLength = optionsDefinationsName?.filter(el => el.label === data);

            if (optionsLength.length !== 0) {
                const newInputs = inputs.map(item => {
                    if (item.id === obj.id) {
                        item.definationName = '';
                        item.definationContentMessages = true;
                    }
                    return item
                })
                setInputs(newInputs);
            }
            else {
                const newInputs = inputs.map(item => {
                    if (item.id === obj.id) {
                        item.definationName = data;
                        item.definationContentMessages = false;
                    }
                    return item
                })
                setInputs(newInputs);
            }
            const newInputs = inputs.map(item => {
                if (item.id === obj.id) {
                    item.definationName = data
                }
                return item
            })
            setInputs(newInputs);
        }
        else {
            const newInputs = inputs.map(item => {
                if (item.id === obj.id) {
                    item.description = value.target.value
                }
                return item
            })
            setInputs(newInputs);
        }
    }

    /**OPTIONS ADD */
    const inputOnBlur = (name) => {
         /**
             * Add optionsAbb
             */
            if(name === 'abb') {
                inputs.map(abbName => {
                    if(abbName.abbrevation !== '') {
                        setOptionsAbb(prev => [...prev,{
                            value:abbName.abbrevation,
                            label:abbName.abbrevation
                        }])
                    }
                    return abbName
                })
            }
            else {
                inputs.map(def => {
                    if(def.definationName !== '') {
                        setOptionsDefinationsName(prev => [...prev,{
                            value:def.definationName,
                            label:def.definationName
                        }])
                    }
                    return def
                })
            }

    }

    const options = [
        {
            value: 'Metehan',
            label: 'Metehan'
        },
        {
            value: 'atakan',
            label: 'atakan'
        },
    ]

    const [addButtonDisabled, setAddButtonDisabled] = useState(true);

 
    const addButtonDisabledFunc = () => {
        let bool = true ;
        inputs.map(data => {
            if(data.definationName === '' || data.abbrevation === '' || data.description === '') bool = false;
            return data
        })
        return bool
     
    }

    const addDisable = (body) => {
        let bool = true ;
        let arr = [];
        body.definations.map(data => {
            if(data.definationName === '' || data.abbrevation === '' || data.description === '') bool = false;
            return data
        })
        setAddButtonDisabled(bool);
        return bool
    }


    const addDefination = async () => {
        const body = {
            headerId:selectAddHeader?.value,
            definations:inputs.map(el => (
                {
                    definationName:el.definationName,
                    abbrevation:el.abbrevation,
                    description:el.description,
                    icon:'string'
                }
            ))
        }
        const addDisableResult = addDisable(body);

        if (addDisableResult) {
            setAddDefinationLoading(true);
            FetchApiPost('services/AdminPanel/Defination/CreateDefination', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 201) {
                                await setShow(false);
                                await setAddDefinationLoading(false);
                                await applyFilter();
                            }
                            else if (res.status === 401) {
                                history.push('/error-404');
                                setAddDefinationLoading(false);
                            }
                            else if (res.status === 409) {
                                setAddDefinationLoading(false);
                                setErrorModalShow(true);
                                res.json().then(data => {
                                    setErrorModalMessages(data?.errors[0]);
                                })
                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                                setAddDefinationLoading(false);
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    }

    useEffect(() => {
      
    }, [])
    

    return (
        <>
            <GlobalModal
                showModal={show}
                setShowModal={setShow}
                toggle={() => setShow(false)}
                header={t('Add Defination')}
                body={
                    <div>

                        <SingleSelects
                            options={addHeader}
                            selectedItems={selectAddHeader}
                            setSelectedItems={setSelectAddHeader}
                            label='header'
                            width='100%'
                            isStar={true}
                            disabled={false}
                        />


                        {
                            inputs.map(data => (
                                <>

                                    <div style={{ width: '100%' }}>
                                        <div>
                                            <label className="label-text-field" >
                                                {t('defination name')}
                                            </label>
                                            <span style={{ color: '#fa5c7c', marginLeft: '4px' }}>*</span>
                                        </div>
                                        <AutoComplete
                                            options={data.definationName !== '' && optionsDefinationsName}
                                            style={{ width: '100%' }}
                                            value={data.definationName}
                                            className={`new-dropdown-select`}
                                            size='middle'
                                            dropdownStyle={{ zIndex: 2000 }}
                                            onChange={(e) => onChangeControl(e, data, 'notAbb')}
                                            onKeyDown={(e) => setKeyDown(e.keyCode)}
                                            // onBlur={()=>inputOnBlur('def')}
                                            placeholder={t('Input...')}
                                            filterOption={(inputValue, option) =>
                                                option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            notFoundContent={null}
                                        />
                                        {
                                            data.definationContentMessages &&
                                            <span style={{ color: '#fa5c7c' }} >{t('isContentWarningMessages')}</span>
                                        }
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <div>
                                            <label className="label-text-field" >
                                                {t('abbreviation')}
                                            </label>
                                            <span style={{ color: '#fa5c7c', marginLeft: '4px' }}>*</span>
                                        </div>
                                        <AutoComplete
                                            options={data.abbrevation !== '' && optionsAbb}
                                            style={{ width: '100%' }}
                                            value={data.abbrevation}
                                            className={`new-dropdown-select`}
                                            size='middle'
                                            dropdownStyle={{ zIndex: 2000 }}
                                            onChange={(e) => onChangeControl(e, data, 'abb')}
                                            // onBlur={()=>inputOnBlur('abb')}
                                            onKeyDown={(e) => setKeyDown(e.keyCode)}
                                            placeholder={t('Input...')}
                                            filterOption={(inputValue, option) =>
                                                option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            notFoundContent={null}
                                        />
                                        {
                                            data.abbContentMessages &&
                                            <span style={{ color: '#fa5c7c' }} >{t('This abbreviation was used')}</span>
                                        }
                                        {
                                            data.abbLengthMessages &&
                                            <span style={{ color: '#fa5c7c' }} >{t('Abbreviation must contain a maximum of 4 characters')}</span>
                                        }
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <label className="label-text-field" >
                                                {t('description')}
                                            </label>
                                            <span style={{ color: 'red' }}>*</span>
                                        </div>
                                        <TextArea
                                            className="new-dropdown-select"
                                            value={data.description}
                                            style={{ width: '100%' }}
                                            onChange={(e) => onChangeControl(e, data, 'area')}
                                            placeholder={t('text area')}
                                            autoSize={{ minRows: 2 }}
                                        />
                                    </div>
                                </>
                            ))
                        }



                        {/* <AutoCompleteInput
                            options={optionsAbb}
                            label='abbrevation'
                            isStar={true}
                            width='100%'
                            value={abbrevation}
                            setValue={setAbbrevation}
                            isContentValid={true}
                            isContentWarningMessages='previously recorded under the same name'
                            abb={true}
                            abbWarningMessages='4 den uzun'
                        /> */}
                        <div>
                            <Button className='float-end' onClick={addInputs} variant="primary">
                                +
                            </Button>
                        </div>
                    </div>
                }
                footer={
                    <>
                        <Button variant="light" onClick={() => setShow(false)}>
                            {t('cancel')}
                        </Button>
                        <Button variant="primary"  onClick={addDefination}
                         >
                            {t('add')}
                        </Button>
                    </>
                }
            />
            {
                errorModalShow &&
                <ErrorModal
                modalShow={errorModalShow}
                setModalShow={setErrorModalShow}
                messages={errorModalMessages}
                />
            }
            <Loading loading={addDefinationLoading} />
        </>
    )
}

export default AddModal