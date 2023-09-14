import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';
import { Button } from 'react-bootstrap';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Paper, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

const AddCategory = ({ showModal, setShowModal, specs, applyFilter, fetchData }) => {
    const [selectSpec, setSelectSpec] = useState(specs);
    const [categoryStatus, setCategoryStatus] = useState([]);
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        if (fetchData === null) return;
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/GetBusinessUnitCalendarSpecCategory',
            'POST',
            fetchData.fetchData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    const { value, label } = selectSpec[0];
                    const newObj = { value, label, category: data };
                    setSelectSpec([newObj]);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, fetchData]);
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
            categoryList: selectSpec[0].category,
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/UpdateBusinessUnitCalendarSpecCategory',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setShowModal(false);
                    applyFilter();
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
                header={t('Add Category')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
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
                            {t('edit')}
                        </Button>
                    </>
                }
            />
        </>
    );
};

export default React.memo(AddCategory);
