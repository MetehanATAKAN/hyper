import React, { useRef, useEffect, useState } from 'react';
import EmailEditor from 'react-email-editor';
import {  FetchApiPost } from '../../../../../utils/http.helper';
import { Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiClose, mdiAlertCircleOutline } from '@mdi/js';
import SuccessModal from '../../../../../components/Modals/SuccessModal';
import { useDispatch } from 'react-redux';
import { disadvantageTab } from '../../../../../redux/actions';

const DesignTemplate = (props) => {

    const { t } = useTranslation();
    const emailEditorRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    // Template Id
    const templateId = Number(new URLSearchParams(window.location.search).get('id'));

    const pageName = new URLSearchParams(window.location.search).get('name');
    
    console.log(pageName);
    const [successModal, setSuccessModal] = useState(false);
    const [buttonTime, setButtonTime] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const onHide = () => {};


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

            const saveDisadvantageBody = {
                contentId: Number(localStorage.getItem('disadvantagePageListctId')),
                pageId: Number(new URLSearchParams(window.location.search).get('id')),
                jsonFile: objJsonB64,
                htmlFile: objHtmlB64,
                modifiedBy: localStorage.getItem('userName'),
            }

                FetchApiPost('services/Pages/Disadvantage/SaveConnectDisadvantageToTemplate', 'POST', saveDisadvantageBody).then(
                    (res) =>
                        (async () => {
                            try {
                                if (res.status === 201) {
                                    res.json().then((data) => {
                                        setTimeout(() => {
                                            setSuccessModal(true);
                                            // history.push('/apps/brochure/disadvantages');
                                        }, 1000);
                                    });
                                } else {
                                    console.log('hata');
                                }
                            } catch (error) {
                                console.log('error', error);
                            }
                        })()
                );
            
        });
    };

    const deleteTemplate = () => {
        const deleteBody = {
            Id: templateId,
        };
        FetchApiPost('services/Pages/Page/DeleteDesignPageAndLabel', 'POST', deleteBody).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            return setTimeout(() => {
                                    history.push('/apps/brochure/disadvantages');
                            }, 1500);
                        });
                    } else {
                        console.log('hata');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    };

    const onReady = () => {
        setButtonTime(true);
        // editor is ready
        // console.log(first);
        // emailEditorRef.current.loadDesign(template)
    };

    const [templateInfos, setTemplateInfos] = useState();

    useEffect(() => {
        let urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');

        FetchApiPost(`services/Pages/Page/GetDesignPageById?id=${id}`, 'GET')
            .then((response) => response.json())
            .then((response) => {
                setTemplateInfos(response.data);
                let design = JSON.parse(response.data.jsonFile);
                emailEditorRef.current.loadDesign(design);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleChangeTab = () => {
        if(pageName === "disadvantages"){
            dispatch(disadvantageTab("Page List"));
        }
    }

    return (
        <>
            <div className="template-design">
                {
                    buttonTime &&
                    <div className="text-end p-2 header d-flex justify-content-between header">
                    <div>
                        <button
                            className="save"
                            onClick={exportHtml}
                            disabled={templateInfos?.isApproved === 1 ? true : false}>
                            {t('save')}
                        </button>

                        <Link onClick={() => handleChangeTab()} to={'/apps/brochure/disadvantages'}>
                            <button className="close">
                                <div>
                                    <Icon path={mdiClose} />
                                    <span>{t('close')}</span>
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
                }

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
                {/* <div className='d-flex' style={{
        position:'absolute',
        right:'20%',
        top:'50%'
      }}>
      <button>atakan</button>
      <button>metehan</button>
      </div> */}
            </div>

            <div className="alert-modal">
                <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                    <Modal.Body>
                        <div className="alert-modal-items">
                            <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                                <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                            </div>
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                            </div>
                            <div className="alert-modal-question">
                                {t(
                                    "you won't be able to revert this! You CAN NOT view this need in your list anymore if you delete."
                                )}
                            </div>
                            <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                    }}
                                    className="delete"
                                    onClick={deleteTemplate}>
                                    {t('Yes, delete it!')}
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#EEF2F7',
                                        color: '#6C757C',
                                        fontWeight: '600',
                                        width: '75px',
                                    }}
                                    className="cancel"
                                    onClick={()=>setModalShow(false)}
                                    >
                                    {t('cancel')}
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {
                successModal &&
                <SuccessModal
                show={successModal}
                messages={'Save success'}
                handleClose={setSuccessModal}
                />
            }
        </>
    );
};

export default DesignTemplate;
