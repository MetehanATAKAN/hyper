import React, { useEffect, useState } from 'react'
import GlobalModal from '../../../../components/GlobalNew/Modal'
import { useTranslation } from 'react-i18next'
import { Button as ButtonB } from 'react-bootstrap';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import Icon from '@mdi/react';
import { mdiFileExcelOutline, mdiDeleteOutline } from '@mdi/js';
import { ToastContainer, toast } from 'react-toastify';
import { Upload, Button } from 'antd';
import { config } from '../../../../../src/config'
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { InputDefault, InputPassword, InputPrePost, InputSearch, TextArea } from '../../../../components/FormElements/Input';

const AddBank = ({
    show,
    setShow,
    callTable,
    setCallTable
}) => {

    const { t } = useTranslation();
    const history = useHistory();

    /**created by */
    const createdBy = localStorage.getItem('userName');

    /**config apiURL */
    const apiURL = config.API_URL;

    /**error modal */
    const [errorModal, setErrorModal] = useState(false);

    /**error modal text */
    const [errorModalText, setErrorModalText] = useState('');

    /**document */
    const [document, setDocument] = useState([]);

    /**type */
    const [type, setType] = useState([]);
    const [selectType, setSelectType] = useState();
   
    /**bank name */
    const [bankName, setBankName] = useState('');

    /**swift */
    const [swift, setSwift] = useState('');

    /**web site */
    const [webSite, setWebSite] = useState('');

    const removeFile = (file) => {
        setDocument(document.filter((item) => item.uid !== file.uid));
    };

    const reg = new RegExp(/^[^<>%$&*!@#^(){}[\]~`+=|\\:;?/]*$/);
    const handleCheckUploadedFile = (file) => {
        let characterControl = false;
        console.log(file);
        for (let index = 0; index < file.length; index++) {
            if (file[index].name.includes('__') || !reg.test(file[index].name)) {
                characterControl = true;
                break;
            } else {
                let dotCount = 0;
                for (let x = 0; x < file[index].name.length; x++) {
                    if (file[index].name[x] === '.') {
                        dotCount++;
                    }
                }
                if (dotCount > 1) {
                    characterControl = true;
                    break;
                }
            }
        }
        if (characterControl) {
            // setErrorModalShow(true);
        } else {
            setDocument(file);
        }
    };

    const beforeUpload = (file) => {
        const docTypeControl =
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/pdf';
        if (!docTypeControl) {
            toast.error(<>{file.name.length < 25 ? <>{file.name}</> : <>{file.name.slice(0, 22)}...</>} {t(`must be of xlsx, xls or pdf file type`)}</>, {
                position: 'top-center',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light',
            });
        }

        return docTypeControl || Upload.LIST_IGNORE;
    };

    const sendFile = (id) => {
        if (document.length > 0) {
            const fd = new FormData();
            for (let index = 0; index < document.length; index++) {
                fd.append('files', document[index].originFileObj, `${id}╚${document[index].name}`);
            }

            // create the request
            const xhr = new XMLHttpRequest();

            // path to server would be where you'd normally post the form to
            xhr.open('POST', `${apiURL}/services/Finance/Bank/UpdateFilesToBank`, true);
            xhr.send(fd);
            
            xhr.onload = () => {
                setShow(false);
                setCallTable(true);
            };
        } else {
            setShow(false);
        }
    };

    const addBank = () => {
        const body = {
            typeId: selectType?.value,
            name: bankName,
            swiftCode:swift,
            webSite: webSite,
            createdBy: createdBy
        }

        if(bankName !== '' && swift !== '' && (selectType !== undefined || selectType !== '') && webSite !== '' && document.length !== 0) {
            FetchApiPost('services/Finance/Bank/CreateBank','POST',body)
            .then(res => {
                if(res.status === 201) {
                    res.json().then(({ data }) => {
                        sendFile(data?.id);
                    });
                }
                else if(res.status === 409) {
                    setErrorModal(true);
                    res.json().then(data => setErrorModalText(data?.errors[0]));
                }
                else {
                    history.push('/error-500')
                }
              })
        }
    }

    /**type */
    useEffect(() => {
        FetchApiGet('services/Finance/Branch/GetTypes', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setType(res?.data?.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                        setSelectType(
                            {
                                value: res?.data[0]?.id,
                                label: res?.data[0]?.name
                            }
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

const [deneme, setDeneme] = useState('');

    const denemeChange = (e) => {
        console.log('deneme change',e);
    }
    return (
        <>
            <GlobalModal
                showModal={show}
                setShowModal={setShow}
                toggle={() => setShow(false)}
                header={t('Add Bank')}
                body={
                    <div>
                        <InputDefault label='mete'/>
                        <InputPrePost value={deneme} setValue={setDeneme} />

                        <InputSearch size='middle' enterButton='search'/>
                        <TextArea disabled={false}  onChange={denemeChange} isUpperCase={true} value={deneme} setValue={setDeneme}  />
                         <SingleSelects
                            label='type'
                            isStar={true}
                            options={type}
                            selectedItems={selectType}
                            setSelectedItems={setSelectType}
                            width='100%'
                        />
                        <NewInput
                            label='name'
                            isStar={true}
                            value={bankName}
                            setValue={setBankName}
                            width='100%'
                            placeholder='name'
                            isUpperCase={true}
                        />
                         <NewInput
                            label='swift'
                            isStar={true}
                            value={swift}
                            setValue={setSwift}
                            width='100%'
                            placeholder='swift'
                        />
                         <NewInput
                            label='web site'
                            isStar={true}
                            value={webSite}
                            setValue={setWebSite}
                            width='100%'
                            placeholder='web site'
                        />
                         <>
                            <ToastContainer />
                            {/* <label>{item.needName}</label> */}
                            <div>
                                <label>
                                    {t('document')}
                                    <span style={{ color: 'red' }}>*</span>
                                </label>
                                <div className="visit-content-need-add__file-upload">
                                    <Upload
                                        beforeUpload={beforeUpload}
                                        multiple={true}
                                        onChange={(e) => handleCheckUploadedFile(e.fileList)}
                                        fileList={document}>
                                        <Button style={{ color: '#6c757d' }}>
                                            {t('file upload')}
                                        </Button>
                                    </Upload>
                                    <label>{t('not selected')}</label>
                                </div>
                            </div>
                            {document.length > 0 && (
                                <div className="visit-content-need-add__files">
                                    {document.map((item, index) => (
                                        <div className="visit-content-need-add__files-container mb-0" key={index}>
                                            <div className="visit-content-need-add__files-item">
                                                <div className="visit-content-need-add__files-item-icon">
                                                    <Icon path={mdiFileExcelOutline} size={1} />
                                                </div>
                                                <div className="visit-content-need-add__files-item-name">
                                                    {item.name}
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    style={{ border: 'none', backgroundColor: 'transparent' }}
                                                    className="visit-content-need-add__files-item-delete"
                                                    onClick={() => removeFile(item)}>
                                                    <Icon path={mdiDeleteOutline} size={1} />
                                                </button>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    </div>
                }
                footer={
                    <>
                        <ButtonB variant="light" onClick={() => setShow(false)}>
                            {t('cancel')}
                        </ButtonB>
                        <ButtonB
                            variant="primary"
                            onClick={addBank}
                            disabled={
                                selectType !== undefined && 
                                bankName !== '' && 
                                swift !== '' && 
                                document.length !== 0 &&
                                webSite !== ''
                                 ? false 
                                 : true
                                }
                            >
                            {t('add')}
                        </ButtonB>
                    </>
                }
            />
            {
                errorModal &&
                <PharmacySplitPercentProblem
                show={errorModal}
                handleClose={()=>setErrorModal(false)}
                messages={errorModalText}
                />
            }
        </>
    )
}

export default AddBank