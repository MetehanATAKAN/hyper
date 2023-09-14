import React, { useEffect, useState } from 'react';
import { MultipleSelects } from '../../../../components/GlobalNew/Selects';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';
import { Button } from 'react-bootstrap';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Paper, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const AddSpec = ({ selectedBusUnit, selectedDate, showModal, setShowModal, fetchData, getData, rowName }) => {
    const [selectSpec, setSelectSpec] = useState([]);
    const [optionsSpec, setOptionsSpec] = useState([]);
    const [categoryStatus, setCategoryStatus] = useState([]);
    const [specsByItem, setSpecsByItem] = useState([]);
    const history = useHistory();
    const { t } = useTranslation();
    useEffect(() => {
        const data = {
            busId: selectedBusUnit.value,
            year: selectedDate ? selectedDate.value : new Date().getFullYear(),
        };
        FetchApiPost('api/OldSystem/GetSpec', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((data) => setOptionsSpec(data.map((el) => ({ value: el.Id, label: el.Val1 }))));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectedBusUnit.value, selectedDate]);

    useEffect(() => {
        if (fetchData === null) return;
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/GetBusinessUnitCalendarSpecialization',
            'POST',
            fetchData.fetchData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setSelectSpec(
                        data?.map((el) => ({
                            value: el.specId,
                            label: el.specName,
                            category: el.category,
                        }))
                    );
                    setSpecsByItem(
                        data?.map((el) => ({
                            value: el.specId,
                            label: el.specName,
                            category: el.category,
                        }))
                    );
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [fetchData, history]);

    const handleChange = (value, label) => {
        const prevSpecIds = specsByItem.map((x) => x.value);
        const check = prevSpecIds.map((x) => {
            if (value.includes(x)) return true;
            return false;
        });
        if (check.includes(false)) return;
        const arr = label?.map((el) => {
            if (prevSpecIds.includes(el.value)) {
                return selectSpec.find((x) => x.value === el.value);
            }
            return { ...el, category: [] };
        });
        setCategoryStatus([]);
        setSelectSpec(arr);
    };
    const allSelect = () => {
        const arr = optionsSpec?.map((el) => {
            const prevSpecIds = selectSpec.map((x) => x.value);
            if (prevSpecIds.includes(el.value)) {
                return selectSpec.find((x) => x.value === el.value);
            }
            return { ...el, category: [] };
        });
        setCategoryStatus([]);
        setSelectSpec(arr);
    };
    const handleFormat = (event, newFormats) => {
        const arr = selectSpec?.map((el) => {
            if (el.value === Number(event.target.id)) {
                return { ...el, category: newFormats };
            }
            return el;
        });
        setSelectSpec(arr);
    };
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
            margin: theme.spacing(0.5),
            border: 0,
            '&.Mui-disabled': {
                border: 0,
            },
            '&:not(:first-of-type)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-of-type': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    }));
    const saveSpecBtn = () => {
        const condition = [];
        selectSpec?.map((el) => (el.category.length === 0 ? condition.push(false) : condition.push(true)));
        if (condition.some((x) => x === false)) {
            setCategoryStatus(condition.map((x, i) => ({ index: i, status: x })));
            return;
        }
        const { postData } = fetchData;
        const data = {
            ...postData,
            specLists: selectSpec.map((x) => ({ specId: x.value, specName: x.label, category: x.category })),
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/UpdateBusinessUnitCalendar',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setShowModal(false);
                    getData();
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <>
            <GlobalModal
                header={rowName ?? ''}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <MultipleSelects
                            label={'spec'}
                            selectedItems={selectSpec}
                            setSelectedItems={() => {}}
                            handleChange={handleChange}
                            allSelect={allSelect}
                            options={optionsSpec}
                            width={'100%'}
                            isStar
                        />
                        <hr style={{ marginBottom: '8px' }} />
                        <label>{t('category')}</label>
                        <br />
                        {selectSpec.length === 0 ? (
                            <label>{t('no spec selected yet')}</label>
                        ) : (
                            selectSpec?.map((el, i) => (
                                <div>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            display: 'flex',
                                            border: (theme) =>
                                                categoryStatus[i]?.status === false
                                                    ? '1px solid #FA5C7C'
                                                    : `1px solid ${theme.palette.divider}`,
                                            flexWrap: 'wrap',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '4px 4px 4px 16px',
                                        }}>
                                        <label style={{ color: '#6c757d' }}>{el.label}</label>
                                        <StyledToggleButtonGroup
                                            color="primary"
                                            size="medium"
                                            value={el.category}
                                            onChange={handleFormat}>
                                            <ToggleButton color="success" id={el.value} value="A" aria-label="A">
                                                A
                                            </ToggleButton>
                                            <ToggleButton color="warning" id={el.value} value="B" aria-label="B">
                                                B
                                            </ToggleButton>
                                            <ToggleButton color="error" id={el.value} value="C" aria-label="C">
                                                C
                                            </ToggleButton>
                                        </StyledToggleButtonGroup>
                                    </Paper>
                                </div>
                            ))
                        )}
                    </div>
                }
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('Close')}
                        </Button>
                        <Button onClick={saveSpecBtn} variant="warning">
                            {t('Edit')}
                        </Button>
                    </>
                }
            />
        </>
    );
};

export default React.memo(AddSpec);
