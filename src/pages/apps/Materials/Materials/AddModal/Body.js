import { Box, Tab, Tabs, tabsClasses } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainCategory from './MainCategory';
import Category from './Category';
import Category1 from './Category1';
import Category2 from './Category2';
import Category3 from './Category3';
import MaterialService from './MaterialService';
import MaterialType from './MaterialType';
import { FetchApiGet } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Body = ({
    addBtn,
    cancelBtn,
    setModalTabValue,
    modalTabValue,
    mainCategoryModalProps,
    mainCategoryModalStatus,
    categoryModalProps,
    categoryModalStatus,
    category1ModalProps,
    category1ModalStatus,
    category2ModalProps,
    category2ModalStatus,
    category3ModalProps,
    category3ModalStatus,
    materialServiceModalProps,
    materialServiceModalStatus,
    materialTypeModalProps,
    materialTypeModalStatus,
    setOptionsMainCategory,
}) => {
    const { t } = useTranslation();
    const handleChange = (event, newValue) => {
        setModalTabValue(newValue);
    };
    const history = useHistory();
    useEffect(() => {
        FetchApiGet('services/Material/MainCategory/GetAllMainCategory', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) =>
                    setOptionsMainCategory(data.map((el) => ({ value: el.id, label: el.name })))
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    maxWidth: { xs: 320, sm: 480 },
                    bgcolor: 'background.paper',
                }}>
                <Tabs
                    value={modalTabValue}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    aria-label="visible arrows tabs example"
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}>
                    <Tab
                        sx={{ textTransform: 'capitalize' }}
                        style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }}
                        label={t('Main Category')}
                    />
                    <Tab
                        sx={{ textTransform: 'capitalize' }}
                        style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }}
                        label={t('Category')}
                    />
                    <Tab
                        sx={{ textTransform: 'capitalize' }}
                        style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }}
                        label={t('Category Sub 1')}
                    />
                    <Tab
                        sx={{ textTransform: 'capitalize' }}
                        style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }}
                        label={t('Category Sub 2')}
                    />
                    <Tab
                        sx={{ textTransform: 'capitalize' }}
                        style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }}
                        label={t('Category Sub 3')}
                    />
                    <Tab
                        sx={{ textTransform: 'capitalize' }}
                        style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }}
                        label={t('Materials or Services')}
                    />
                    <Tab
                        sx={{ textTransform: 'capitalize' }}
                        style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }}
                        label={t('Materials or Services Type')}
                    />
                </Tabs>
            </Box>
            {modalTabValue === 0 && (
                <MainCategory
                    addBtn={addBtn}
                    cancelBtn={cancelBtn}
                    mainCategoryModalProps={mainCategoryModalProps}
                    mainCategoryModalStatus={mainCategoryModalStatus}
                />
            )}
            {modalTabValue === 1 && (
                <Category
                    addBtn={addBtn}
                    cancelBtn={cancelBtn}
                    categoryModalProps={categoryModalProps}
                    categoryModalStatus={categoryModalStatus}
                />
            )}
            {modalTabValue === 2 && (
                <Category1
                    addBtn={addBtn}
                    cancelBtn={cancelBtn}
                    category1ModalProps={category1ModalProps}
                    category1ModalStatus={category1ModalStatus}
                />
            )}
            {modalTabValue === 3 && (
                <Category2
                    addBtn={addBtn}
                    cancelBtn={cancelBtn}
                    category2ModalProps={category2ModalProps}
                    category2ModalStatus={category2ModalStatus}
                />
            )}
            {modalTabValue === 4 && (
                <Category3
                    addBtn={addBtn}
                    cancelBtn={cancelBtn}
                    category3ModalProps={category3ModalProps}
                    category3ModalStatus={category3ModalStatus}
                />
            )}
            {modalTabValue === 5 && (
                <MaterialService
                    addBtn={addBtn}
                    cancelBtn={cancelBtn}
                    materialServiceModalProps={materialServiceModalProps}
                    materialServiceModalStatus={materialServiceModalStatus}
                />
            )}
            {modalTabValue === 6 && (
                <MaterialType
                    addBtn={addBtn}
                    cancelBtn={cancelBtn}
                    materialTypeModalProps={materialTypeModalProps}
                    materialTypeModalStatus={materialTypeModalStatus}
                />
            )}
        </>
    );
};

export default React.memo(Body);
