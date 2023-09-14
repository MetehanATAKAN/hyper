import React, { useRef, useState } from 'react';
import { mdiClose, mdiDeleteOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import EmailEditor from 'react-email-editor';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setIsPage } from '../../../../redux/actions';
import { Spin } from 'antd';
import ActionModals from '../../../../components/Modals/ActionModal';
import FailModal from '../../../../components/FailModal';

const TemplateDesign = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const emailEditorRef = useRef(null);
    const { itemId, itemName, templateId, isSub } = useParams();
    const [buttonTime, setButtonTime] = useState(false);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [error, setError] = useState(false);
    const isPageEdit = useSelector((state) => state.VisitContent.isPage);
    const [isApiPostReq, setIsApiPostReq] = useState(true);
    const resetRedux = () => {
        dispatch(setIsPage(false));
    };
    const fetchPost = (url, body) => {
        FetchApiPost(url, 'POST', body)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    history.push(`/apps/templates/templatedetails=${itemId}&Product=${itemName}`);
                    resetRedux();
                }
                if (res.status === 400 || res.status === 404 || res.status === 409) {
                    res.json().then(({ errors }) => {
                        setShowFailModal(true);
                        setError(errors);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    resetRedux();
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
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

            const saveBody = {
                id: Number(itemId), //need benefit disad adv veya profile ıd gelicek
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                createdBy: localStorage.getItem('userName'),
                visitContent: itemName, //need benefit disad adv veya profile ismi gelicek
            };
            const saveSubBody = {
                pageId: Number(isSub), //need benefit disad adv veya profile ıd gelicek
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                createdBy: localStorage.getItem('userName'),
            };
            const saveBodyUpdate = {
                id: Number(templateId), // template ID
                content: page.content,
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                isApproved: 0,
                modifiedBy: localStorage.getItem('userName'),
                status: true,
            };
            if (isSub !== 'false') {
                // Create
                if (isPageEdit === false) {
                    fetchPost('services/Pages/ProductPage/CreateSubPage', saveSubBody);
                }
                // Edit
                if (isPageEdit === true) {
                    fetchPost('services/Pages/ProductPage/UpdateProductPage', saveBodyUpdate);
                }
            }
            if (isSub === 'false') {
                // Create
                if (isPageEdit === false) {
                    fetchPost('services/Pages/ProductPage/CreateProductPage', saveBody);
                }
                // Edit
                if (isPageEdit === true) {
                    fetchPost('services/Pages/ProductPage/UpdateProductPage', saveBodyUpdate);
                }
            }
        });
    };
    const getProductPage = () => {
        // setLoader(true);
        FetchApiPost(`services/Pages/ProductPage/GetProductPageByIds`, 'POST', { ids: [Number(templateId)] })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then((response) => {
                        setPage(response.data[0]);
                        let design = JSON.parse(response.data[0].jsonPath);
                        emailEditorRef.current.loadDesign(design);
                        // setLoader(false);
                        setButtonTime(true);
                        setIsApiPostReq(false);
                    });
                }
                if (res.status === 400 || res.status === 404 || res.status === 409) {
                    res.json().then(({ errors }) => {
                        setShowFailModal(true);
                        setError(errors);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    resetRedux();
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    };
    const onReady = () => {
        if (isApiPostReq === false) return;
        getProductPage();
    };
    const closeBtn = () => {
        history.push(`/apps/templates/templatedetails=${itemId}&Product=${itemName}`);
        resetRedux();
    };
    return (
        <>
            <Spin spinning={loader} size="large">
                <div className="template-design">
                    {buttonTime && (
                        <div className="text-end p-2 header d-flex justify-content-end header">
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
            {showDeleteModal && (
                <ActionModals
                    type="delete"
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    url={'services/Pages/ProductPage/UpdateProductPage'}
                    postData={{
                        id: templateId, // template ID
                        jsonFile: page.jsonPath,
                        htmlFile: page.htmlPath,
                        isApproved: 1,
                        modifiedBy: localStorage.getItem('userName'),
                        status: false,
                    }}
                    showDataName={false}
                    handleData={() => {
                        history.push(history.push(`/apps/templates/templatedetails=${itemId}&Product=${itemName}`));
                        resetRedux();
                    }}
                />
            )}
            {showFailModal && <FailModal modalShow={showFailModal} setModalShow={setShowFailModal} error={error} />}
        </>
    );
};

export default TemplateDesign;
