import React, { useRef, useState } from 'react';
import { mdiClose, mdiDeleteOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import { Spin } from 'antd';
import { FetchApiPost } from '../../../../../utils/http.helper';

const TemplateDesign = () => {
    const { t } = useTranslation();
    const emailEditorRef = useRef(null);
    const history = useHistory();
    const { promoSubjectId, pageName, pageId, connectTemplateId, isSub } = useParams();
    const [buttonTime, setButtonTime] = useState(false);
    const [page, setPage] = useState(null);
    let isPageEdit = false

    const [getData, setGetData] = useState(false);

    const [loader, setLoader] = useState(false);

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(design))}`;
            const link = document.createElement('a');
            link.href = jsonString;
            link.download = 'data.json';

            let buff = new Buffer(toString(design));
            let base64data = buff.toString('base64');

            let objJsonStr = JSON.stringify(design);
            let objJsonB64 = Buffer.from(objJsonStr).toString('base64');

            // let objHtmlStr = JSON.stringify(html);
            let objHtmlB64 = Buffer.from(html).toString('base64');

            // console.log("objJsonB64", objJsonB64)
            // console.log("objHtmlB64", objHtmlB64)

            // return;

            const saveBody = {
                id: Number(pageId), //need benefit disad adv veya profile ıd gelicek
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                createdBy: localStorage.getItem('userName'),
                visitContent: pageName, //need benefit disad adv veya profile ismi gelicek
            };
            const saveSubBody = {
                pageId: Number(pageId), //need benefit disad adv veya profile ıd gelicek
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                createdBy: localStorage.getItem('userName'),
            };
            const saveBodyUpdate = {
                id: Number(connectTemplateId), // template ID
                content: page.content,
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                isApproved: 0,
                modifiedBy: localStorage.getItem('userName'),
                status: true,
            };

            const promoSubjectBody = {
                id: Number(promoSubjectId),
                visitContent: pageName,
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                createdBy: localStorage.getItem('userName')
            }

            const promoSubjectSubBody = {
                pageId: Number(pageId),
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                createdBy: localStorage.getItem('userName')
            }
            
            if(pageName === 'Profile' || pageName === 'Need' || pageName === 'Benefit'){
                if (isSub === 'true') {
                
                    // Create
                    if (isPageEdit === false) {
                        FetchApiPost('services/Pages/ProductPage/CreateSubPage', 'POST', saveSubBody).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                    // Edit
                    if (isPageEdit === true) {
                        FetchApiPost('services/Pages/ProductPage/UpdateProductPage', 'POST', saveBodyUpdate).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                }
                else if (isSub === 'false') {
                    // Create
                    if (isPageEdit === false) {
                        FetchApiPost('services/Pages/ProductPage/CreateProductPage', 'POST', saveBody).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                    // Edit
                    if (isPageEdit === true) {
                        FetchApiPost('services/Pages/ProductPage/UpdateProductPage', 'POST', saveBodyUpdate).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                }
            }else{
                if (isSub === 'true') {
                
                    // Create
                    if (isPageEdit === false) {
                        FetchApiPost('services/Pages/ProductPage/CreateSubPage', 'POST', promoSubjectSubBody).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                    // Edit
                    if (isPageEdit === true) {
                        FetchApiPost('services/Pages/ProductPage/CreateProductPage', 'POST', promoSubjectBody).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                }
                else if (isSub === 'false') {
                    // Create
                    if (isPageEdit === false) {
                        FetchApiPost('services/Pages/ProductPage/CreateProductPage', 'POST', promoSubjectBody).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                    // Edit
                    if (isPageEdit === true) {
                        FetchApiPost('services/Pages/ProductPage/CreateProductPage', 'POST', promoSubjectBody).then(res => history.push(`/apps/templates/promoSubject=${promoSubjectId}`));
                    }
                }
            }
           
        });
    };
    const getProductPage = () => {
        setLoader(true);
        FetchApiPost(`services/Pages/ProductPage/GetProductPageByIds`, 'POST', { ids: [Number(connectTemplateId)] })
            .then((response) => response.json())
            .then((response) => {
                setGetData(true)
                setPage(response.data[0]);
                setLoader(false);
                let design = JSON.parse(response.data[0].jsonPath);
                emailEditorRef.current.loadDesign(design);
                setButtonTime(true);
            })
            .catch((error) => {
                console.log(error);
                setLoader(false);
            });
    };
    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    };
    const onReady = () => {
        if(getData) return;
        getProductPage();
    };
    const closeBtn = () => {
        // history.push(`/apps/templates/templatedetails=${itemId}&Product=${itemName}`);
        // resetRedux();
        history.push(`/apps/templates/promoSubject=${promoSubjectId}`);
    };


    return (
        <div>
            <Spin spinning={loader} size="large">
                <div className="template-design">
                    {buttonTime && (
                        <div className="text-end p-2 header d-flex justify-content-between header">
                            <div>
                                <button className="save" onClick={exportHtml}>
                                    {t('save')}
                                </button>

                                <button onClick={closeBtn} className="close">
                                    <div>
                                        <Icon path={mdiClose} />
                                        <span>{t('close')}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    <EmailEditor
                        ref={emailEditorRef}
                        onLoad={onLoad}
                        onReady={onReady}
                        tools={{
                            'custom#dy_recommendation': {
                                data: {
                                    html: `<div
                                        style='
                                        border: 1px solid #ccc;
                                        padding: 20px;
                                        height:1000px
                                        '
                                        >Custom dynamic HTML</div>`,
                                },
                                position: 0,
                            },
                        }}
                    />
                </div>
            </Spin>
        </div>
    );
};

export default TemplateDesign;
