import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { CustomSwitch } from '../../Budget/NewButtonModal/NewButton';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const ModalsPage1 = (props) => {
    const {
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
        mfSwitch,
        setMfSwitch,
        copyDataContainer,
        setCopyDataContainer,
        copy,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const addCopyData = () => {
        setCopyDataContainer((prev) => [...prev, copy]);
    };
    const deleteCopyData = (index) => {
        setCopyDataContainer((prev) => prev.filter((item, i) => i !== index));
    };
    const addDataCopyState = (value, label, index, objectKey) => {
        setCopyDataContainer((prev) =>
            prev.map((item, i) => {
                if (i === index) {
                    return { ...item, [objectKey]: label };
                }
                return item;
            })
        );
        if (objectKey === 'countryForUse') {
            FetchApiPost('services/Material/Competitor/GetSellerByCountryId', 'POST', value).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setCopyDataContainer((prev) =>
                            prev.map((item, i) => {
                                if (i === index) {
                                    return {
                                        ...item,
                                        optionsCompetitorSellerCopy: data?.map((el) => ({
                                            value: el.sellerId,
                                            label: el.sellerName,
                                        })),
                                    };
                                }
                                return item;
                            })
                        );
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            });
        }
    };
    return (
        <>
            <div className="competitor-page-modal">
                <CustomSwitch
                    checked={mfSwitch}
                    setCheck={setMfSwitch}
                    label={t('manufacturer is seller')}
                    style={{ width: '50%' }}
                />
                <NewInput
                    label="competitor brand"
                    placeholder="competitor brand"
                    value={competitorBrandInput}
                    setValue={setCompetitorBrandInput}
                    isStar={true}
                    width="50%"
                    status={competitorBrandInput === '' ? 'error' : 'default'}
                />
                <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
                    <MultipleSelects
                        label="competitor materials"
                        isStar={true}
                        selectedItems={selectCompetitorMaterials}
                        setSelectedItems={setSelectCompetitorMaterials}
                        options={optionsCompetitorMaterials}
                        status={selectCompetitorMaterials.length === 0 ? 'error' : 'default'}
                        placeholder="materials"
                        width="370px"
                    />
                    <MultipleSelects
                        label="competitor form"
                        isStar={true}
                        selectedItems={selectCompetitorForm}
                        setSelectedItems={setSelectCompetitorForm}
                        options={optionsCompetitorForm}
                        // status={selectCompetitorForm.length === 0 ? 'error' : 'default'}
                        placeholder="materials"
                        width="165px"
                        isMaxSelect={true}
                        maxSelectItem={3}
                        disabled={true}
                    />
                    <MultipleSelects
                        label="packing form"
                        isStar={true}
                        disabled={true}
                        selectedItems={selectPackingForm}
                        setSelectedItems={setSelectPackingForm}
                        options={optionsPackingForm}
                        // status={selectPackingForm.length === 0 ? 'error' : 'default'}
                        placeholder="materials"
                        width="170px"
                    />
                </div>
                <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
                    <SingleSelects
                        label="competitor manufacturer country"
                        selectedItems={selectCompetitorMfCountry}
                        setSelectedItems={setSelectCompetitorMfCountry}
                        options={optionsCompetitorMfCountry}
                        placeholder="materials"
                        width="365px"
                    />
                    <SingleSelects
                        label="competitor manufacturer"
                        isStar={true}
                        selectedItems={selectCompetitorMf}
                        setSelectedItems={setSelectCompetitorMf}
                        options={optionsCompetitorMf}
                        status={!selectCompetitorMf ? 'error' : 'default'}
                        placeholder="materials"
                        width="357px"
                    />
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <MultipleSelects
                        label="country for use"
                        isStar={true}
                        selectedItems={selectCountryForUse}
                        setSelectedItems={setSelectCountryForUse}
                        options={optionsCountryForUse}
                        // status={selectCountryForUse.length === 0 ? 'error' : 'default'}
                        placeholder="materials"
                        width="175px"
                    />
                    <SingleSelects
                        label="competitor seller country"
                        selectedItems={selectCompetitorSellerCountry}
                        setSelectedItems={setSelectCompetitorSellerCountry}
                        options={optionsCompetitorSellerCountry}
                        placeholder="materials"
                        disabled={mfSwitch}
                        width="175px"
                    />
                    <SingleSelects
                        label="competitor seller"
                        isStar={true}
                        selectedItems={selectCompetitorSeller}
                        setSelectedItems={setSelectCompetitorSeller}
                        options={optionsCompetitorSeller}
                        status={!selectCompetitorSeller ? 'error' : 'default'}
                        placeholder="materials"
                        disabled={mfSwitch}
                        width="310px"
                    />
                    <Button
                        onClick={addCopyData}
                        style={{ alignSelf: 'flex-end', height: '32px', width: '32px', padding: 0 }}>
                        <i className="fas fa-plus"></i>
                    </Button>
                </div>
                {copyDataContainer?.map((el, i) => (
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <MultipleSelects
                            label="country for use"
                            isStar={true}
                            selectedItems={el.countryForUse}
                            setSelectedItems={() => {}}
                            options={optionsCountryForUse}
                            status={el.countryForUse.length === 0 ? 'error' : 'default'}
                            placeholder="materials"
                            width="175px"
                            handleChange={(value, label) => addDataCopyState(value, label, i, 'countryForUse')}
                        />
                        <SingleSelects
                            label="competitor seller country"
                            selectedItems={el.competitorSellerCountry}
                            setSelectedItems={() => {}}
                            options={optionsCompetitorSellerCountry}
                            // status={!el.competitorSellerCountry ? 'error' : 'default'}
                            placeholder="materials"
                            width="175px"
                            handleChange={(value, label) =>
                                addDataCopyState(value, label, i, 'competitorSellerCountry')
                            }
                        />
                        <SingleSelects
                            label="competitor seller"
                            isStar={true}
                            selectedItems={el.competitorSeller}
                            setSelectedItems={() => {}}
                            options={el.optionsCompetitorSellerCopy}
                            status={!el.competitorSeller ? 'error' : 'default'}
                            placeholder="materials"
                            width="310px"
                            handleChange={(value, label) => addDataCopyState(value, label, i, 'competitorSeller')}
                        />
                        <Button
                            onClick={() => deleteCopyData(i)}
                            variant="danger"
                            style={{ alignSelf: 'flex-end', height: '32px', width: '32px', padding: 0 }}>
                            <i className="fa-solid fa-trash"></i>
                        </Button>
                    </div>
                ))}
            </div>
            <hr style={{ color: '#DEE2E6' }} />
            <div>
                <MultipleSelects
                    label="our product"
                    isStar={true}
                    selectedItems={selectOurProduct}
                    setSelectedItems={setSelectOurProduct}
                    options={optionsOurProduct}
                    // status={selectOurProduct.length === 0 ? 'error' : 'default'}
                    placeholder="materials"
                    width="50%"
                    isMaxSelect={true}
                    maxSelectItem={1}
                />
            </div>
        </>
    );
};

export default ModalsPage1;
