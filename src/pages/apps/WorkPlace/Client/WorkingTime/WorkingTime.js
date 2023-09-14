import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../../../utils/http.helper';

const WorkingTime = ({ show, setShow, selectedItem, getFilterData }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();

    // const deneme = () => {
    //     FetchApiPost("services/CRM/Client/CreateClientAvailableTime", "POST", {
    //         clientCategoryId: selectedItem.workPlace.clientCategoryId,
    //         availableTimes: [
    //           {
    //             dayId: 0,
    //             startTime: "10:00",
    //             endTime: "12:45"
    //           }
    //         ],
    //         createdBy: localStorage.getItem('userName')
    //     })
    // }
  return (
    <>
    {show && (
        <GlobalModal
            showModal={show}
            setShowModal={setShow}
            toggle={() => setShow(false)}
            header={t('Preferred Time')}
            size={'md'}
            body={
                <Body
                    isClickAdd={isClickAdd}
                    setIsClickAdd={setIsClickAdd}
                    setShow={setShow}
                    setAddButtonDisableStatus={setAddButtonDisableStatus}
                    selectedItem={selectedItem}
                    getFilterData={getFilterData}
                />
            }
            footer={
                <>
                    <Button onClick={() => setShow(false)} variant="secondary">
                        {t('cancel')}
                    </Button>
                    {/* <Button
                        onClick={() => setIsClickAdd(true)}
                        disabled={addButtonDisableStatus}
                        variant="success">
                        {t('save')}
                    </Button> */}
                    <Button onClick={() => setIsClickAdd(true)} disabled={addButtonDisableStatus}>{t('save')}</Button>
                </>
            }
        />
    )}
</>
  )
}

export default WorkingTime