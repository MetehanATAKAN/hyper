import React from 'react';
import { Paper, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Category = ({ selectSpec, setSelectSpec, setSelectCategory, selectCategory, selectedClient, status }) => {
    const { t } = useTranslation();
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
    return (
        <>
            {selectSpec.length === 0 ? (
                <label>{t('no spec selected')}</label>
            ) : (
                selectSpec?.map((el, i) => (
                    <div>
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                border: (theme) =>
                                    status[i]?.status === false
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
        </>
    );
};

export default React.memo(Category);
