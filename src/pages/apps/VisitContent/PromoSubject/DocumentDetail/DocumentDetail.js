import React, { useState, useEffect } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Button as ButtonB } from 'react-bootstrap';
import { Button, message, Upload } from 'antd';
import 'antd/dist/antd.css';
import { mdiFileExcelOutline, mdiDeleteOutline, mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import { toast, ToastContainer } from 'react-toastify';

const DocumentDetail = ({ documentDetailShow, setDocumentDetailShow, item, getFilterData, filterData }) => {
    const { t } = useTranslation();

    const [document, setDocument] = useState([]);

    useEffect(() => {
        let data = filterData.filter((filterItem) => filterItem.id === item.id);
        if(data.length === 0){
            filterData.map((filterItem) => filterItem.translates.map((translateItem) => {
                if(translateItem.id === item.id){
                    data = [translateItem];
                }
            }))
        }

        console.log(data)
        
        // let documentData = [...data[0].benefits[0].documents, ...data[0].need.documents];
        let documentBenefit = data[0].benefits[0].documents;
        let documentNeed = data[0].need.documents;

        setDocument([
            ...documentNeed.map(doc => {
            return {
                uid: (doc.split("__")[0]),
                name: doc.split("__")[1],
                type: 'need'
            }
            }),
            ...documentBenefit.map(doc => {
                return {
                    uid: (doc.split("__")[0]),
                    name: doc.split("__")[1],
                    type: 'benefit'
                }
                }),
    ])
    }, [item, filterData])


  return (
    <>
            {documentDetailShow && (
                <GlobalModal
                    showModal={documentDetailShow}
                    setShowModal={setDocumentDetailShow}
                    toggle={() => setDocumentDetailShow(false)}
                    header={t("Reference Document for Promo Subject")}
                    size={"md"}
                    body={
                        <>
                        <ToastContainer />
                        <label>{item.benefitName}</label>
                            <div>
                                <label>{t('reference document')}<span style={{color: 'red'}}>*</span></label>
                                <div className="visit-content-need-add__file-upload">
                                    <Upload multiple={true} fileList={document}>
                                        <Button style={{ color: '#6c757d' }} disabled={true}>
                                            {t('file upload')}
                                        </Button>
                                    </Upload>
                                    <label>{t('not selected')}</label>
                                </div>
                            </div>
                            {
                                document.length > 0 && (
                                    <div className='visit-content-need-add__files'>
                                        {
                                            document.map((item, index) => (
                                                <div className='visit-content-need-add__files-container mb-0'>
                                                    <div className='visit-content-need-add__files-item'>
                                                        <div className='visit-content-need-add__files-item-icon'>
                                                            <Icon path={mdiFileExcelOutline} size={1} />
                                                        </div>
                                                        <div className='visit-content-need-add__files-item-name'>
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                    {item.uid.charAt(0) !== 'r' && (
                                                    // eslint-disable-next-line react/jsx-no-target-blank
                                                        <a
                                                            href={item.type=== 'benefit' ? `http://178.18.200.171:5017/BenefitFiles/${item.uid}__${item.name}` : `http://178.18.200.171:5017/NeedFiles/${item.uid}__${item.name}`}
                                                            target="_blank"
                                                            download={item.name}
                                                            className="visit-content-need-add__files-item-download">
                                                            <Icon path={mdiDownload} size={1} />
                                                        </a>
                                                     )}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </>
                    }
                    footer={

                                <>
                                    <ButtonB onClick={() => setDocumentDetailShow(false)} variant="light">
                                        {t('close')}
                                    </ButtonB>
                                </>
                    }
                />
            )}
        </>
  )
}

export default DocumentDetail