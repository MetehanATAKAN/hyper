import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';
import ModalPage1 from './ModalPage1';
import ModalPage2 from './ModalPage2';

const Body = (props) => {
    const {
        modalPage,
        modalPage1States,
        modalPage1Status,
        mfSwitch,
        setMfSwitch,
        copyDataContainer,
        setCopyDataContainer,
        copy,
        selectCompetitorMaterials,
        dosageData,
        setDosageData,
        modalPage2Status,
        modalPage2StatusUnite,
        selectCompetitorForm,
    } = props;
    const history = useHistory();
    const [uniteOptions, setUniteOptions] = useState([]);
    useEffect(() => {
        const selectedFormIds = selectCompetitorForm?.map((x) => Number(x.value));
        FetchApiPost('services/Material/UnitsOfForm/GetUnitOfFormByFormId', 'POST', selectedFormIds).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    const units = data?.flatMap((x) => x.units.map((a) => ({ value: a.id, label: a.unitName })));
                    setUniteOptions(units);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectCompetitorForm]);
    return (
        <>
            {modalPage === 1 && (
                <ModalPage1
                    modalPage1States={modalPage1States}
                    modalPage1Status={modalPage1Status}
                    mfSwitch={mfSwitch}
                    setMfSwitch={setMfSwitch}
                    copyDataContainer={copyDataContainer}
                    setCopyDataContainer={setCopyDataContainer}
                    copy={copy}
                />
            )}
            {modalPage === 2 && (
                <ModalPage2
                    selectCompetitorMaterials={selectCompetitorMaterials}
                    dosageData={dosageData}
                    setDosageData={setDosageData}
                    modalPage2Status={modalPage2Status}
                    modalPage2StatusUnite={modalPage2StatusUnite}
                    selectCompetitorForm={selectCompetitorForm}
                    uniteOption={uniteOptions}
                />
            )}
        </>
    );
};

export default React.memo(Body);
