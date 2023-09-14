import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import { Button, Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../utils/http.helper';
import Delete from './Actions/Delete';
import Category1Table from './Tables/Category1Table';
import 'tippy.js/dist/tippy.css';
import { conditionFunc } from '.';
import { useTranslation } from 'react-i18next';
const Filter = ({
    selectMainCategory,
    setSelectMainCategory,
    selectCategory,
    setSelectCategory,
    optionsCategory,
    optionsMain,
    statusArr,
    applyFilter,
    clearFilter,
    setCloseFilter,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                columnGap: '8px',
                marginBottom: '16px',
            }}>
            <SingleSelects
                label="main category"
                selectedItems={selectMainCategory}
                setSelectedItems={setSelectMainCategory}
                className="filter-radius"
                options={optionsMain}
                size="small"
                status={statusArr[0].status}
                width="20%"
            />
            <MultipleSelects
                label="category"
                className="filter-radius"
                selectedItems={selectCategory}
                setSelectedItems={setSelectCategory}
                options={optionsCategory}
                size="small"
                status={statusArr[1].status}
                width="20%"
            />
           
        </div>
    );
};
const CategorySub1 = ({
    addModal,
    data,
    setData,
    selectMainCategory,
    setSelectMainCategory,
    selectCategory,
    setSelectCategory,
    optionsMain,
    optionsCategory,
    setOptionsCategory,
    applyFilter,
    updateModal,
    statusCategory1Filter,
    closeFilter,
    setCloseFilter,
}) => {
    const [info, setInfo] = useState({ id: 0, name: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { t } = useTranslation();
    const clearFilter = () => {
        setSelectMainCategory();
        setSelectCategory([]);
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
        category: (
            <Tippy
                placement="bottom"
                content={el.category?.map((x, indx) => (
                    <span>
                        {x.name}
                        {indx !== el.category.length - 1 && ', '}
                    </span>
                ))}>
                <span>
                    {el.category?.map((item, idx) => (
                        <span>
                            {item.name}
                            {idx !== el.category.length - 1 && ', '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        categorySub1: el.name,
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
                            categories: el.category?.map((x) => ({ value: x.id, label: x.name })),
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
            <Category1Table
                data={tableData}
                addModal={addModal}
                closeFilter={closeFilter}
                setCloseFilter={setCloseFilter}
                clearFilter={clearFilter}
                applyFilter={applyFilter}
                filters={
                    <Filter
                        applyFilter={applyFilter}
                        selectMainCategory={selectMainCategory}
                        setSelectMainCategory={setSelectMainCategory}
                        selectCategory={selectCategory}
                        setSelectCategory={setSelectCategory}
                        optionsMain={optionsMain}
                        optionsCategory={optionsCategory}
                        statusArr={statusCategory1Filter}
                        clearFilter={clearFilter}
                        setCloseFilter={setCloseFilter}
                    />
                }
            />
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    info={info}
                    url={'services/Material/CategoryFirstSub/DeleteCategoryFirstSub'}
                    applyFilter={applyFilter}
                />
            )}
        </>
    );
};

export default CategorySub1;
