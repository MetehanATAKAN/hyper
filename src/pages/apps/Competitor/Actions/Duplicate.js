import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { FetchApiPost } from '../../../../utils/http.helper';

const Duplicates = ({ modalShow, setModalShow, item, applyFilter }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const createdBy = localStorage.getItem('userName');
    const [competitorName, setCompetitorName] = useState('');
    const toggle = () => {
        setModalShow(!modalShow);
    };
    const duplicateBtm = () => {
        if (competitorName === '') return;
        const duplicateData = {
            competitorId: item.id,
            competitorName: competitorName,
            createdBy: createdBy,
        };
        FetchApiPost('services/Material/Competitor/DuplicateCompetitor', 'POST', duplicateData).then((res) => {
            if (res.status === 201) {
                setModalShow(false);
                applyFilter();
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <GlobalModal
            header={t('Duplicate Competitor')}
            showModal={modalShow}
            setShowModal={setModalShow}
            body={
                <div>
                    <NewInput
                        label="competitor name"
                        placeholder="competitor name"
                        value={competitorName}
                        setValue={setCompetitorName}
                        isStar={true}
                        width="100%"
                        status={competitorName === '' ? 'error' : 'default'}
                    />
                </div>
            }
            footer={
                <>
                    <Button onClick={() => setModalShow(false)} variant="light">
                        {t('cancel')}
                    </Button>
                    <Button onClick={duplicateBtm} variant="warning">
                        {t('duplicate')}
                    </Button>
                </>
            }
            toggle={toggle}
        />
    );
};

export default Duplicates;
