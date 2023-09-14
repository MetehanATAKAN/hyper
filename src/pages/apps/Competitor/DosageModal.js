import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../components/GlobalNew/Modal';
import { SingleSelects } from '../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../utils/http.helper';

const DosageModal = (props) => {
    const { modalShow, setModalShow, dosageData, setDosageData, detailForm, compId } = props;
    const { t } = useTranslation();
    const toogle = () => {
        setModalShow(!modalShow);
        setDosageData([]);
    };
    const uniteOptions = [
        { value: 0, label: 'unite' },
        { value: 1, label: '%' },
        { value: 2, label: 'g' },
        { value: 3, label: 'mcg' },
        { value: 4, label: 'mg' },
        { value: 5, label: 'mg/mg' },
        { value: 6, label: 'mg/ug' },
        { value: 7, label: 'ml' },
    ];
    const col2 = detailForm?.map((el, i) => [
        {
            title: el,
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
                options={uniteOptions}
                selectedItems={el.firstFormUnite}
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
                options={uniteOptions}
                selectedItems={el.firstFormUnite}
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
                options={uniteOptions}
                selectedItems={el.secondFormUnite}
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
                options={uniteOptions}
                selectedItems={el.firstFormUnite}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'firstFormUnite')}
            />
        ),
        birim1: (
            <SingleSelects
                options={uniteOptions}
                selectedItems={el.secondFormUnite}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'secondFormUnite')}
            />
        ),
        birim2: (
            <SingleSelects
                options={uniteOptions}
                selectedItems={el.thirdFormUnite}
                setSelectedItems={() => {}}
                width="90px"
                size="small"
                handleChange={(value) => handleUniteChange(value, i, 'thirdFormUnite')}
            />
        ),
    }));
    const [tableData, setTableData] = useState();
    useEffect(() => {
        switch (detailForm.length) {
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
    const user = localStorage.getItem('userName');
    const updateDetail = () => {
        const dosage = dosageData.map((el) => {
            delete el.materialName;
            return el;
        });
        const data = {
            competitorId: compId,
            modifiedBy: user,
            competitorDosage: dosage,
        };
        FetchApiPost('services/Material/Competitor/UpdateCompetitorMaterialDosages', 'POST', data).then((res) => {
            if (res.status === 201) {
                setModalShow(false);
                setDosageData([]);
            }
            // if (res.status === 400 || res.status === 409 || res.status === 404) {
            //     res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
            // }
            // if (res.status === 500 || res.status === 502) {
            //     history.push('/error-500');
            // }
        });
    };
    return (
        <GlobalModal
            header={t('Details')}
            showModal={modalShow}
            setShowModal={setModalShow}
            toggle={toogle}
            size="lg"
            body={<Table columns={columns.flat()} dataSource={tableData} pagination={false} bordered size="small" />}
            footer={
                <>
                    <Button
                        onClick={() => {
                            setDosageData([]);
                            setModalShow(false);
                        }}
                        variant="light">
                        {t('cancel')}
                    </Button>
                    <Button onClick={updateDetail} variant="warning">
                        {t('update')}
                    </Button>
                </>
            }
        />
    );
};

export default React.memo(DosageModal);
