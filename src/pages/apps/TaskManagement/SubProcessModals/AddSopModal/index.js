import React, { useEffect, useState, useRef } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { NewInput } from '../../../../../components/GlobalNew/Inputs';
import { FetchApiPost } from '../../../../../utils/http.helper';
import TextEditor from '../Editor/TextEditor';

const AddSopModal = ({ showAddModal, setShowAddModal, selectedItem, setSubProcess, subProcess }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const quillRef = useRef('');

    const { t } = useTranslation();

    const [sop, setSop] = useState(selectedItem.sop !== null && selectedItem.sop !== undefined ? Buffer.from(selectedItem.sop, 'base64').toString('utf-8') : '');

    useEffect(() => {
        if(!sop || sop.trim().length === 0)
            setAddButtonDisableStatus(true)
        else
            setAddButtonDisableStatus(false)
    }, [sop])

    

    useEffect(() => {
        if(isClickAdd){
            FetchApiPost('services/TaskManagement/SubProcess/UpdateSubProcessSOP', 'POST', {
                subProcessId: Number(selectedItem.id),
                sop: Buffer.from(sop).toString('base64'),
                modifiedBy: localStorage.getItem('userName')
            }).then(res => {
                setShowAddModal(false)
                let newSub = subProcess.map(i => {
                    if(Number(i.id) === Number(selectedItem.id)){
                        return {
                            ...i,
                            sop: Buffer.from(sop).toString('base64')
                        }
                    }else{
                        return i
                    }
                })
                setSubProcess(newSub)
            })
        }
    }, [isClickAdd])

    return (
        <>
            {showAddModal && (
                <GlobalModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    toggle={() => setShowAddModal(false)}
                    header={selectedItem.sop ? t("Update S&OP") : t("add S&OP")}
                    size={"xl"}
                    body={
                        <div>
                            <TextEditor
                                value={sop}
                                setValue={setSop}
                                isStar={true}
                                isLabelShow={false}
                                className="page-editor-container"
                                quillRef={quillRef}
                            />
                        </div>
                    }
                    footer={
                        <>
                            <Button onClick={() => setShowAddModal(false)} variant="secondary">
                                {t('cancel')}
                            </Button>
                            <Button onClick={() => setIsClickAdd(true)} disabled={addButtonDisableStatus} variant={selectedItem.sop ? "warning" : "primary"}>
                                { selectedItem.sop ? t('update') : t('add')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default AddSopModal;