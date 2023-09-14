import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Spin } from 'antd';

const AddModal = ({ show, setShow, selectedItem, getFilterData }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    
  return (
    <>
    {
        loader && (
            <Spin size="large" spinning={loader} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999999', background: 'rgba(0,0,0,.5)', width: '100%', height: '100%', display: 'grid', placeItems: 'center'}} ></Spin>
        )
    }
    {show && (
        <GlobalModal
            showModal={show}
            setShowModal={setShow}
            toggle={() => setShow(false)}
            header={t('Working Time')}
            size={'md'}
            body={
                <Body
                    isClickAdd={isClickAdd}
                    setIsClickAdd={setIsClickAdd}
                    setShow={setShow}
                    setAddButtonDisableStatus={setAddButtonDisableStatus}
                    selectedItem={selectedItem}
                    getFilterData={getFilterData}
                    setLoader={setLoader}
                />
            }
            footer={
                <>
                    <Button onClick={() => setShow(false)} variant="light">
                        {t('cancel')}
                    </Button>
                    <Button
                        onClick={() => setIsClickAdd(true)}
                        disabled={addButtonDisableStatus}
                        variant="success">
                        {t('save')}
                    </Button>
                </>
            }
        />
    )}
</>
  )
}

export default AddModal