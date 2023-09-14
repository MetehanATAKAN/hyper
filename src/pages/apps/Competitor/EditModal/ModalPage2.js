import { Input, Table } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../utils/http.helper';

const ModalsPage2 = (props) => {
    const { selectCompetitorMaterials, dosageData, setDosageData, selectCompetitorForm, uniteOption } = props;
    const { t } = useTranslation();
    const history = useHistory();
    useEffect(() => {
        // const indexes1 = dosageData.reduce((acc, curr, index) => {
        //     acc[curr.materialName] = index;
        //     return acc;
        // }, {});
        // const difference = selectCompetitorMaterials.filter((x) => !(x.label in indexes1));
        // if (difference.length === 0) return;
        const data = selectCompetitorMaterials?.map((el, i) => {
            const same = dosageData.find((obj) => obj.materialId === el.value);
            if (!same) {
                return {
                    materialId: el.value,
                    materialName: el.label,
                    firstFormQuantity: 0,
                    firstFormUnite: 0,
                    secondFormQuantity: 0,
                    secondFormUnite: 0,
                    thirdFormQuantity: 0,
                    thirdFormUnite: 0,
                    status: true,
                };
            }
            if (same) {
                return same;
            }
        });
        setDosageData(data);
    }, [selectCompetitorMaterials]);
    const col2 = selectCompetitorForm?.map((el, i) => [
        {
            title: el.label,
            dataIndex: `input${i}`,
            width: '90px',
            colSpan: 2,
        },
        {
            title: 'Birim',
            width: '90px',
            colSpan: 0,
            dataIndex: `birim${i}`,
        },
    ]);
    const columns = [
        {
            title: t('Material Name'),
            dataIndex: 'materialName',
            render: (text) => <span>{text}</span>,
        },
        ...col2,
    ];
    const handleChange = (e, index, quantity) => {
        setDosageData((prevState) => {
            const newState = prevState.map((obj) => {
                if (obj.materialId === dosageData[index].materialId) {
                    return { ...obj, [quantity]: Number(e.target.value) };
                }
                return obj;
            });

            return newState;
        });
    };
    const handleUniteChange = (value, index, unite) => {
        setDosageData((prevState) => {
            const newState = prevState.map((obj) => {
                if (obj.materialId === dosageData[index].materialId) {
                    return { ...obj, [unite]: value };
                }
                return obj;
            });

            return newState;
        });
    };
    const data1 = dosageData?.map((el, i) => ({
        key: i,
        materialName: el.materialName,
        input0: (
            <Input
                placeholder="..."
                value={el.firstFormQuantity === 0 ? '...' : el.firstFormQuantity}
                type="number"
                name="capsule"
                size="small"
                status={el.firstFormQuantity === 0 ? 'error' : 'default'}
                style={{ textAlign: 'right' }}
                onChange={(e) => handleChange(e, i, 'firstFormQuantity')}
            />
        ),
        birim0: (
            <SingleSelects
                options={uniteOption}
                selectedItems={el.firstFormUnite === 0 ? uniteOption[0] : el.firstFormUnite}
                status={el.firstFormUnite === undefined ? 'error' : 'default'}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'firstFormUnite')}
            />
        ),
    }));
    const data2 = dosageData?.map((el, i) => ({
        key: i,
        materialName: el.materialName,
        input0: (
            <Input
                placeholder="..."
                value={el.firstFormQuantity === 0 ? '...' : el.firstFormQuantity}
                type="number"
                name="capsule"
                size="small"
                style={{ textAlign: 'right' }}
                status={el.firstFormQuantity === 0 ? 'error' : 'default'}
                onChange={(e) => handleChange(e, i, 'firstFormQuantity')}
            />
        ),
        birim0: (
            <SingleSelects
                options={uniteOption}
                selectedItems={el.firstFormUnite === 0 ? uniteOption[0] : el.firstFormUnite}
                status={el.firstFormUnite === undefined ? 'error' : 'default'}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'firstFormUnite')}
            />
        ),
        input1: (
            <Input
                placeholder="..."
                value={el.secondFormQuantity === 0 ? '...' : el.secondFormQuantity}
                type="number"
                name="capsule"
                size="small"
                style={{ textAlign: 'right' }}
                status={el.secondFormQuantity === 0 ? 'error' : 'default'}
                onChange={(e) => handleChange(e, i, 'secondFormQuantity')}
            />
        ),
        birim1: (
            <SingleSelects
                options={uniteOption}
                selectedItems={el.secondFormUnite === 0 ? uniteOption[0] : el.secondFormUnite}
                status={el.secondFormUnite === undefined ? 'error' : 'default'}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'secondFormUnite')}
            />
        ),
    }));
    const data3 = dosageData?.map((el, i) => ({
        key: i,
        materialName: el.materialName,
        input0: (
            <Input
                placeholder="..."
                value={el.firstFormQuantity === 0 ? '...' : el.firstFormQuantity}
                type="number"
                name="capsule"
                size="small"
                style={{ textAlign: 'right' }}
                status={el.firstFormQuantity === 0 ? 'error' : 'default'}
                onChange={(e) => handleChange(e, i, 'firstFormQuantity')}
            />
        ),
        input1: (
            <Input
                placeholder="..."
                value={el.secondFormQuantity === 0 ? '...' : el.secondFormQuantity}
                type="number"
                name="capsule"
                size="small"
                style={{ textAlign: 'right' }}
                status={el.secondFormQuantity === 0 ? 'error' : 'default'}
                onChange={(e) => handleChange(e, i, 'secondFormQuantity')}
            />
        ),
        input2: (
            <Input
                placeholder="..."
                value={el.thirdFormQuantity === 0 ? '...' : el.thirdFormQuantity}
                type="number"
                name="capsule"
                size="small"
                style={{ textAlign: 'right' }}
                status={el.thirdFormQuantity === 0 ? 'error' : 'default'}
                onChange={(e) => handleChange(e, i, 'thirdFormQuantity')}
            />
        ),
        birim0: (
            <SingleSelects
                options={uniteOption}
                selectedItems={el.firstFormUnite === 0 ? uniteOption[0] : el.firstFormUnite}
                status={el.firstFormUnite === undefined ? 'error' : 'default'}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'firstFormUnite')}
            />
        ),
        birim1: (
            <SingleSelects
                options={uniteOption}
                selectedItems={el.secondFormUnite === 0 ? uniteOption[0] : el.secondFormUnite}
                status={el.secondFormUnite === undefined ? 'error' : 'default'}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'secondFormUnite')}
            />
        ),
        birim2: (
            <SingleSelects
                options={uniteOption}
                selectedItems={el.thirdFormUnite === 0 ? uniteOption[0] : el.thirdFormUnite}
                status={el.thirdFormUnite === undefined ? 'error' : 'default'}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'thirdFormUnite')}
            />
        ),
    }));
    const [tableData, setTableData] = useState();
    useEffect(() => {
        switch (selectCompetitorForm.length) {
            case 1:
                setTableData(data1);
                break;
            case 2:
                setTableData(data2);
                break;
            case 3:
                setTableData(data3);
                break;

            default:
                break;
        }
    }, [dosageData]);
    return <Table columns={columns.flat()} dataSource={tableData} pagination={false} bordered size="small" />;
};

export default React.memo(ModalsPage2);
