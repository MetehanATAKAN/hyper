import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../utils/http.helper';
import Delete from './Actions/Delete';
import CategoryTable from './Tables/CategoryTable';
const Filter = ({
    selectMainCategory,
    setSelectMainCategory,
    optionsMain,
    statusArr,
    applyFilter,
    clearFilter,
    setCloseFilter,
}) => {
    useEffect(() => {
        setSelectMainCategory(optionsMain);
    }, [optionsMain]);

    return (
        <div
            style={{
                display: 'flex',
                columnGap: '8px',
                marginBottom: '16px',
            }}>
            <MultipleSelects
                label="main category"
                selectedItems={selectMainCategory}
                setSelectedItems={setSelectMainCategory}
                className="filter-radius"
                options={optionsMain}
                size="small"
                status={statusArr[0].status}
                width="20%"
            />
            {/* <div className="filter-select-buttons">
                <Icon
                    onClick={applyFilter}
                    className="filter-button-icons"
                    path={mdiCheck}
                    size={1}
                    color={'#0ACF97'}
                />
                <Icon
                    path={mdiDeleteSweepOutline}
                    onClick={clearFilter}
                    className="filter-button-icons"
                    size={1}
                    color={'#FA5C7C'}
                />
                <Icon
                    path={mdiClose}
                    onClick={() => setCloseFilter(true)}
                    size={1}
                    color={'#6C757D'}
                    className="filter-button-icons"
                />
            </div> */}
        </div>
    );
};
const Category = ({
    addModal,
    data,
    setData,
    selectMainCategory,
    setSelectMainCategory,
    optionsMain,
    applyFilter,
    updateModal,
    statusCategoryFilter,
    closeFilter,
    setCloseFilter,
}) => {
    const [info, setInfo] = useState({ id: 0, name: '', abb: '', desc: '', mainId: 0 });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { t } = useTranslation();
    const clearFilter = () => {
        setSelectMainCategory();
    };
    const items = [
        {
            key: 'edit',
            label: (
                <span onClick={() => updateModal(info)} style={{ color: '#6C757D' }}>
                    <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>
                    {t('Edit')}
                </span>
            ),
        },
        {
            key: 'delete',
            label: (
                <span onClick={() => setShowDeleteModal(true)} style={{ color: '#FA5C7C' }}>
                    <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>
                    {t('Delete')}
                </span>
            ),
        },
    ];
    const tableData = data?.map((el, i) => ({
        mainCategory: (
            <span
                style={{
                    backgroundColor: `rgba(${el.mainCategory.backgroundColor},0.15)`,
                    color: `rgb(${el.mainCategory.backgroundColor})`,
                    padding: '1px 8px',
                    borderRadius: 3,
                }}>
                {el.mainCategory.abb}
            </span>
        ),
        category: el.name,
        abb: el.abb,
        technicalInfo: el.description,
        action: (
            <Dropdown trigger={'click'} menu={{ items }} placement="bottom">
                <Button
                    onClick={() =>
                        setInfo({
                            id: el.id,
                            name: el.name,
                            abb: el.abb,
                            desc: el.description,
                            mainId: { value: el.mainCategory.id, label: el.mainCategory.name },
                        })
                    }
                    icon={<i className="fas fa-ellipsis-v"></i>}
                    style={{ border: 'none', width: '18px' }}
                />
            </Dropdown>
        ),
    }));
    return (
        <>
            <CategoryTable
                data={tableData}
                addModal={addModal}
                closeFilter={closeFilter}
                setCloseFilter={setCloseFilter}
                clearFilter={clearFilter}
                applyFilter={applyFilter}
                
                filters={
                    <Filter
                        applyFilter={applyFilter}
                        clearFilter={clearFilter}
                        selectMainCategory={selectMainCategory}
                        setSelectMainCategory={setSelectMainCategory}
                        optionsMain={optionsMain}
                        statusArr={statusCategoryFilter}
                        setCloseFilter={setCloseFilter}

                    />
                }
            />
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    info={info}
                    url={'services/Material/Category/DeleteCategory'}
                    applyFilter={applyFilter}
                />
            )}
        </>
    );
};

export default Category;
