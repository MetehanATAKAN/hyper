import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import TextEditor from '../../../../components/GlobalNew/TextEditor';
import { FetchApiPost } from '../../../../utils/http.helper';

const ContentModal = ({ showModal, setShowModal, item, applyFilter, breadcrumbName }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [content, setContent] = useState(
        item.content !== null && item.content !== undefined ? Buffer.from(item.content, 'base64').toString('utf-8') : ''
    );
    const quillRef = useRef('')
    const handleAddBtn = () => {
        const contentLength = (c) => {
            var regex = /(<([^>]+)>)/gi;
            let hasText = !!c.replace(regex, '').trim().length;
            return hasText;
        };
        const checkEmptyContent = contentLength(content);
        // if (!checkEmptyContent) {
        //     return setShowModal(false);
        // }
        const data = {
            ...item,
            content: Buffer.from(content).toString('base64'),
        };
        FetchApiPost('services/Pages/ProductPage/UpdateProductPage', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setShowModal(false);
                    window.location.reload();
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    return (
        <GlobalModal
            showModal={showModal}
            setShowModal={setShowModal}
            toggle={() => setShowModal(!showModal)}
            header={`${t('Content')} / ${breadcrumbName} `}
            body={
                <>
                    <TextEditor
                        value={content}
                        setValue={setContent}
                        isStar={true}
                        isLabelShow={false}
                        className="page-editor-container"
                        quillRef={quillRef}
                    />
                </>
            }
            footer={
                <>
                    <Button onClick={() => setShowModal(false)} variant="light">
                        {t('cancel')}
                    </Button>
                    <Button variant="primary" onClick={handleAddBtn}>
                        {t('save')}
                    </Button>
                </>
            }
        />
    );
};

export default ContentModal;
