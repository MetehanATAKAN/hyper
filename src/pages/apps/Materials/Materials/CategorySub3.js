import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import { Button, Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../utils/http.helper';
import Delete from './Actions/Delete';
import Category3Table from './Tables/Category3Table';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';

const Filter = ({
    selectMainCategory,
    setSelectMainCategory,
    selectCategory,
    setSelectCategory,
    optionsCategory,
    optionsMain,
    selectCategory1,
    setSelectCategory1,
    optionsCategory1,
    selectCategory2,
    setSelectCategory2,
    optionsCategory2,
    statusArr,
    clearFilter,
    applyFilter,
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
            <MultipleSelects
                label="category sub 1"
                className="filter-radius"
                selectedItems={selectCategory1}
                setSelectedItems={setSelectCategory1}
                options={optionsCategory1}
                size="small"
                status={statusArr[2].status}
                width="20%"
            />
            <MultipleSelects
                label="category sub 2"
                className="filter-radius"
                selectedItems={selectCategory2}
                setSelectedItems={setSelectCategory2}
                options={optionsCategory2}
                size="small"
                status={statusArr[3].status}
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
const CategorySub3 = ({
    addModal,
    data,
    setData,
    selectMainCategory,
    setSelectMainCategory,
    selectCategory,
    setSelectCategory,
    optionsMain,
    optionsCategory,
    selectCategory1,
    setSelectCategory1,
    optionsCategory1,
    selectCategory2,
    setSelectCategory2,
    optionsCategory2,
    applyFilter,
    updateModal,
    statusCategory3Filter,
    closeFilter,
    setCloseFilter,
}) => {
    const [info, setInfo] = useState({ id: 0, name: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { t } = useTranslation();

    const clearFilter = () => {
        setSelectMainCategory();
        setSelectCategory([]);
        setSelectCategory1([]);
        setSelectCategory2([]);
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
                content={el.categories?.map((x, indx) => (
                    <span>
                        {x.name}
                        {indx !== el.categories.length - 1 && ', '}
                    </span>
                ))}>
                <span>
                    {el.categories?.map((item, idx) => (
                        <span>
                            {item.name}
                            {idx !== el.categories.length - 1 && ', '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        categorySub1: (
            <Tippy
                placement="bottom"
                content={el.categoryFirstSubs?.map((x, indx) => (
                    <span>
                        {x.name}
                        {indx !== el.categoryFirstSubs.length - 1 && ', '}
                    </span>
                ))}>
                <span>
                    {el.categoryFirstSubs?.map((item, idx) => (
                        <span>
                            {item.name}
                            {idx !== el.categoryFirstSubs.length - 1 && ', '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        categorySub2: (
            <Tippy
                placement="bottom"
                content={el.categorySecondSubs?.map((x, indx) => (
                    <span>
                        {x.name}
                        {indx !== el.categorySecondSubs.length - 1 && ', '}
                    </span>
                ))}>
                <span>
                    {el.categorySecondSubs?.map((item, idx) => (
                        <span>
                            {item.name}
                            {idx !== el.categorySecondSubs.length - 1 && ', '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        categorySub3: el.name,
        abb: el.abb,
        technicalInfo: el.technicalInfo,
        action: (
            <Dropdown trigger={'click'} menu={{ items }} placement="bottom">
                <Button
                    onClick={() =>
                        setInfo({
                            id: el.id,
                            name: el.name,
                            abb: el.abb,
                            desc: el.technicalInfo,
                            mainId: { value: el.mainCategory.id, label: el.mainCategory.name },
                            categories: el.categories?.map((x) => ({ value: x.id, label: x.name })),
                            firstCategories: el.categoryFirstSubs?.map((x) => ({ value: x.id, label: x.name })),
                            secondCategories: el.categorySecondSubs?.map((x) => ({ value: x.id, label: x.name })),
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
            <Category3Table
                data={tableData}
                addModal={addModal}
                closeFilter={closeFilter}
                setCloseFilter={setCloseFilter}
                applyFilter={applyFilter}
                clearFilter={clearFilter}
                filters={
                    <Filter
                        applyFilter={applyFilter}
                        clearFilter={clearFilter}
                        selectMainCategory={selectMainCategory}
                        setSelectMainCategory={setSelectMainCategory}
                        selectCategory={selectCategory}
                        setSelectCategory={setSelectCategory}
                        optionsMain={optionsMain}
                        optionsCategory={optionsCategory}
                        selectCategory1={selectCategory1}
                        setSelectCategory1={setSelectCategory1}
                        optionsCategory1={optionsCategory1}
                        selectCategory2={selectCategory2}
                        setSelectCategory2={setSelectCategory2}
                        optionsCategory2={optionsCategory2}
                        statusArr={statusCategory3Filter}
                        setCloseFilter={setCloseFilter}
                    />
                }
            />
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    info={info}
                    url={'services/Material/CategoryThirdSub/DeleteCategoryThirdSub'}
                    applyFilter={applyFilter}
                />
            )}
        </>
    );
};

export default CategorySub3;
