import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { Button as ButtonB } from 'react-bootstrap';
import { Button, Upload } from 'antd';
import Icon from '@mdi/react';
import { mdiDeleteOutline, mdiDownload, mdiFileExcelOutline } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import FileError from '../Need/DocumentDetail/FileError';
import { toast, ToastContainer } from 'react-toastify';
const DocumentModal = ({ showModal, setShowModal, documents, applyFilter }) => {
    const { t } = useTranslation();
    const [document, setDocument] = useState([]);
    const [errorModalShow, setErrorModalShow] = useState(false);
    useEffect(() => {
        setDocument(
            documents.docs?.map((doc) => {
                return {
                    uid: doc.split('__')[0],
                    name: doc.split('__')[1],
                };
            })
        );
    }, [documents]);
    const handleSaveDocument = () => {
        const fd = new FormData();
        for (let index = 0; index < document.length; index++) {
            if (document[index].originFileObj) {
                fd.append('files', document[index].originFileObj, `${document[index].name}`);
            } else {
                let file = new File([document[index]], `${document[index].uid}__${document[index].name}`);
                fd.append('files', file, `${document[index].uid}__${document[index].name}`);
            }
        }
        fd.append('id', documents.id);
        const xhr = new XMLHttpRequest();

        xhr.open('POST', `http://178.18.200.171:5000/services/Pages/ProductPage/AddProductPageDocument`, true);
        xhr.send(fd);
        xhr.onload = () => {
            setShowModal(false);
            applyFilter();
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

    const removeFile = (file) => {
        setDocument(document.filter((item) => item.uid !== file.uid));
    };
    const beforeUpload = (file) => {
        const docTypeControl =
            file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'application/pdf';
        if (!docTypeControl) {
            toast.error(t(`${file.name} must be of png/jpg or pdf file type`), {
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
            <GlobalModal
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(false)}
                header={t('Reference Document for Page')}
                body={
                    <>
                        <ToastContainer />
                        <div>
                            <label>{t('reference document')}</label>
                            <div className="visit-content-need-add__file-upload">
                                <Upload
                                    beforeUpload={beforeUpload}
                                    multiple={true}
                                    onChange={(e) => handleCheckUploadedFile(e.fileList)}
                                    fileList={document}>
                                    <Button style={{ color: '#6c757d' }}>{t('file upload')}</Button>
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
                                            <div className="visit-content-need-add__files-item-name">{item.name}</div>
                                        </div>
                                        <div>
                                            {item.uid.charAt(0) !== 'r' && (
                                                // eslint-disable-next-line react/jsx-no-target-blank
                                                <a
                                                    href={`http://178.18.200.171:5017/PageFiles/${item.uid}__${item.name}`}
                                                    target="_blank"
                                                    download={item.name}
                                                    className="visit-content-need-add__files-item-download">
                                                    <Icon path={mdiDownload} size={1} />
                                                </a>
                                            )}
                                            <button
                                                onClick={() => removeFile(item)}
                                                style={{ border: 'none', backgroundColor: 'transparent' }}
                                                className="visit-content-need-add__files-item-delete">
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
                        <ButtonB onClick={() => setShowModal(false)} variant="light">
                            {t('cancel')}
                        </ButtonB>
                        <ButtonB onClick={() => handleSaveDocument()} variant="primary">
                            {t('save')}
                        </ButtonB>
                    </>
                }
            />
            {errorModalShow && <FileError modalShow={errorModalShow} setModalShow={setErrorModalShow} />}
        </>
    );
};

export default React.memo(DocumentModal);
