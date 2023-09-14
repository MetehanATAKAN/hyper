import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../utils/http.helper';
import { CustomSwitch } from '../../Budget/NewButtonModal/NewButton';

const ModalPage1 = (props) => {
    const { modalPage1States, modalPage1Status, mfSwitch, setMfSwitch, copyDataContainer, setCopyDataContainer, copy } =
        props;
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
                    value={modalPage1States[0].state}
                    setValue={modalPage1States[0].setState}
                    isStar={true}
                    width="50%"
                    status={modalPage1Status[0].status}
                />
                <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
                    <MultipleSelects
                        label="competitor materials"
                        isStar={true}
                        selectedItems={modalPage1States[1].state}
                        setSelectedItems={modalPage1States[1].setState}
                        options={modalPage1States[1].options}
                        status={modalPage1Status[1].status}
                        placeholder="materials"
                        width="370px"
                    />
                    <MultipleSelects
                        label="competitor form"
                        isStar={true}
                        selectedItems={modalPage1States[2].state}
                        setSelectedItems={modalPage1States[2].setState}
                        options={modalPage1States[2].options}
                        status={modalPage1Status[2].status}
                        placeholder="competitor form"
                        width="165px"
                        isMaxSelect={true}
                        maxSelectItem={3}
                    />
                    <MultipleSelects
                        label="packing form"
                        isStar={true}
                        selectedItems={modalPage1States[3].state}
                        setSelectedItems={modalPage1States[3].setState}
                        options={modalPage1States[3].options}
                        status={modalPage1Status[3].status}
                        placeholder="packing form"
                        width="170px"
                    />
                </div>
                <div style={{ display: 'flex', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
                    <SingleSelects
                        label="competitor manufacturer country"
                        selectedItems={modalPage1States[4].state}
                        setSelectedItems={modalPage1States[4].setState}
                        options={modalPage1States[4].options}
                        placeholder="competitor manufacturer country"
                        width="365px"
                    />
                    <SingleSelects
                        label="competitor manufacturer"
                        isStar={true}
                        selectedItems={modalPage1States[5].state}
                        setSelectedItems={modalPage1States[5].setState}
                        options={modalPage1States[5].options}
                        status={modalPage1Status[4].status}
                        placeholder="competitor manufacturer"
                        width="357px"
                    />
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <MultipleSelects
                        label="country for use"
                        isStar={true}
                        selectedItems={modalPage1States[6].state}
                        setSelectedItems={modalPage1States[6].setState}
                        options={modalPage1States[6].options}
                        status={modalPage1Status[5].status}
                        placeholder="country for use"
                        width="175px"
                    />
                    <SingleSelects
                        label="competitor seller country"
                        selectedItems={modalPage1States[7].state}
                        setSelectedItems={modalPage1States[7].setState}
                        options={modalPage1States[7].options}
                        placeholder="competitor seller country"
                        disabled={mfSwitch}
                        width="175px"
                    />
                    <SingleSelects
                        label="competitor seller"
                        isStar={true}
                        selectedItems={modalPage1States[8].state}
                        setSelectedItems={modalPage1States[8].setState}
                        options={modalPage1States[8].options}
                        status={modalPage1Status[6].status}
                        placeholder="competitor seller"
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
                            options={modalPage1States[6].options}
                            status={el.countryForUse.length === 0 ? 'error' : 'default'}
                            placeholder="country for use"
                            width="175px"
                            handleChange={(value, label) => addDataCopyState(value, label, i, 'countryForUse')}
                        />
                        <SingleSelects
                            label="competitor seller country"
                            selectedItems={el.competitorSellerCountry}
                            setSelectedItems={() => {}}
                            options={modalPage1States[7].options}
                            // status={!el.competitorSellerCountry ? 'error' : 'default'}
                            placeholder="competitor seller country"
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
                            placeholder="competitor seller"
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
                    selectedItems={modalPage1States[9].state}
                    setSelectedItems={modalPage1States[9].setState}
                    options={modalPage1States[9].options}
                    status={modalPage1Status[7].status}
                    placeholder="our product"
                    width="50%"
                />
            </div>
        </>
    );
};

export default React.memo(ModalPage1);
