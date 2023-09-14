import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button as ButtonB } from 'react-bootstrap';
import { Button, message, Upload } from 'antd';
import 'antd/dist/antd.css';
import { mdiFileExcelOutline, mdiDeleteOutline, mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
// import FileError from './FileError';
import { toast, ToastContainer } from 'react-toastify';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { config } from '../../../../../src/config';

const AddDocument = ({ documentDetailShow, setDocumentDetailShow, item, getFilterData, isDisableInput,callTable,setCallTable }) => {

    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();
    
    const [document, setDocument] = useState([]);
    
    const [errorModalShow, setErrorModalShow] = useState(false);
 
     /**config apiURL */
    const apiURL = config.API_URL;

    useEffect(() => {
        setDocument(
            item[0]?.documents?.map((doc) => {
                return {
                    uid: doc.split('__')[0],
                    name: doc.split('__')[1],
                };
            })
        );
    }, [item]);

    
    const removeFile = (file) => {
        setDocument(document.filter((item) => item.uid !== file.uid));
    };

    useEffect(() => {
        if (document.length === 0) {
            setAddButtonDisableStatus(true);
        } else {
            setAddButtonDisableStatus(false);
        }
    }, [document]);

    const handleUpdateDocument = () => {
        const fd = new FormData();
        for (let index = 0; index < document.length; index++) {
            if (document[index].originFileObj) {
                fd.append('files', document[index].originFileObj, `${item[0].id}╚${document[index].name}`);
            } else {
                let file = new File([document[index]], `${item[0].id}╚${document[index].uid}__${document[index].name}`);
                fd.append('files', file, `${item[0].id}╚${document[index].uid}__${document[index].name}`);
            }
        }
        const a = fd;
        // create the request
        const xhr = new XMLHttpRequest();

        // path to server would be where you'd normally post the form to
        xhr.open('POST', `${apiURL}/services/Finance/Bank/UpdateFilesToBank`, true);
        xhr.send(fd);

        xhr.onload = () => {
            setDocumentDetailShow(false);
            setCallTable(true);
        };
    };

    const reg = new RegExp(/^[^<>%$&*!@#^(){}[\]~`+=|\\:;?/]*$/);
    const handleCheckUploadedFile = (file) => {
        let characterControl = false;
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
            setErrorModalShow(true);
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

    return (
        <>
            {documentDetailShow && (
                <GlobalModal
                    showModal={documentDetailShow}
                    setShowModal={setDocumentDetailShow}
                    toggle={() => setDocumentDetailShow(false)}
                    header={t('Add Document')}
                    size={'md'}
                    body={
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
                                        <Button style={{ color: '#6c757d' }} disabled={isDisableInput}>
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
                                                {item.uid.charAt(0) !== 'r' && (
                                                    // eslint-disable-next-line react/jsx-no-target-blank
                                                    <a
                                                        href={`http://178.18.200.171:5027/BankFiles/${item.uid}__${item.name}`}
                                                        target="_blank"
                                                        download={item.name}
                                                        className="visit-content-need-add__files-item-download">
                                                        <Icon path={mdiDownload} size={1} />
                                                    </a>
                                                )}
                                                <button
                                                    disabled={isDisableInput}
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
                    }
                    footer={
                        <>
                            
                                <>
                                    <ButtonB onClick={() => setDocumentDetailShow(false)} variant="light">
                                        {t('cancel')}
                                    </ButtonB>
                                    <ButtonB
                                        onClick={() => handleUpdateDocument()}
                                        disabled={addButtonDisableStatus}
                                        variant="primary">
                                        {t('save')}
                                    </ButtonB>
                                </>
                             
                                {/* <>
                                    <ButtonB onClick={() => setDocumentDetailShow(false)} variant="light">
                                        {t('close')}
                                    </ButtonB>
                                </> */}
                            
                        </>
                    }
                />
            )}

            {/* {errorModalShow && <FileError modalShow={errorModalShow} setModalShow={setErrorModalShow} />} */}
        </>
    );
};

export default AddDocument;
