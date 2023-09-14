import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';
import ModalsPage1 from './ModalPage1';
import ModalsPage2 from './ModalPage2';
const EditModal = (props) => {
    const {
        modalPage,
        mfSwitch,
        setMfSwitch,
        copyDataContainer,
        setCopyDataContainer,
        copy,
        dosageData,
        setDosageData,
        modalPage2Status,
        modalPage2StatusUnite,
        competitorBrandInput,
        setCompetitorBrandInput,
        optionsCompetitorBrand,
        selectCompetitorMaterials,
        setSelectCompetitorMaterials,
        optionsCompetitorMaterials,
        selectCompetitorForm,
        setSelectCompetitorForm,
        optionsCompetitorForm,
        selectPackingForm,
        setSelectPackingForm,
        optionsPackingForm,
        selectCompetitorMfCountry,
        setSelectCompetitorMfCountry,
        optionsCompetitorMfCountry,
        selectCompetitorMf,
        setSelectCompetitorMf,
        optionsCompetitorMf,
        selectCountryForUse,
        setSelectCountryForUse,
        optionsCountryForUse,
        selectCompetitorSellerCountry,
        setSelectCompetitorSellerCountry,
        optionsCompetitorSellerCountry,
        selectCompetitorSeller,
        setSelectCompetitorSeller,
        optionsCompetitorSeller,
        selectOurProduct,
        setSelectOurProduct,
        optionsOurProduct,
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
                <ModalsPage1
                    mfSwitch={mfSwitch}
                    setMfSwitch={setMfSwitch}
                    copyDataContainer={copyDataContainer}
                    setCopyDataContainer={setCopyDataContainer}
                    copy={copy}
                    competitorBrandInput={competitorBrandInput}
                    setCompetitorBrandInput={setCompetitorBrandInput}
                    optionsCompetitorBrand={optionsCompetitorBrand}
                    selectCompetitorMaterials={selectCompetitorMaterials}
                    setSelectCompetitorMaterials={setSelectCompetitorMaterials}
                    optionsCompetitorMaterials={optionsCompetitorMaterials}
                    selectCompetitorForm={selectCompetitorForm}
                    setSelectCompetitorForm={setSelectCompetitorForm}
                    optionsCompetitorForm={optionsCompetitorForm}
                    selectPackingForm={selectPackingForm}
                    setSelectPackingForm={setSelectPackingForm}
                    optionsPackingForm={optionsPackingForm}
                    selectCompetitorMfCountry={selectCompetitorMfCountry}
                    setSelectCompetitorMfCountry={setSelectCompetitorMfCountry}
                    optionsCompetitorMfCountry={optionsCompetitorMfCountry}
                    selectCompetitorMf={selectCompetitorMf}
                    setSelectCompetitorMf={setSelectCompetitorMf}
                    optionsCompetitorMf={optionsCompetitorMf}
                    selectCountryForUse={selectCountryForUse}
                    setSelectCountryForUse={setSelectCountryForUse}
                    optionsCountryForUse={optionsCountryForUse}
                    selectCompetitorSellerCountry={selectCompetitorSellerCountry}
                    setSelectCompetitorSellerCountry={setSelectCompetitorSellerCountry}
                    optionsCompetitorSellerCountry={optionsCompetitorSellerCountry}
                    selectCompetitorSeller={selectCompetitorSeller}
                    setSelectCompetitorSeller={setSelectCompetitorSeller}
                    optionsCompetitorSeller={optionsCompetitorSeller}
                    selectOurProduct={selectOurProduct}
                    setSelectOurProduct={setSelectOurProduct}
                    optionsOurProduct={optionsOurProduct}
                />
            )}
            {modalPage === 2 && (
                <ModalsPage2
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

export default EditModal;
