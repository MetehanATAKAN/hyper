import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MultipleSelects } from '../../../../components/GlobalNew/Selects';
import Delete from './Actions/Delete';
import MaterialTypeTable from './Tables/MaterialTypeTable';
const Filter = ({
    clearFilter,
    applyFilter,
    selectMaterialServiceFilter,
    setSelectMaterialServiceFilter,
    optionsMaterialServiceFilter,
    setCloseFilter,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                columnGap: '8px',
                marginBottom: '16px',
            }}>
            <MultipleSelects
                label="material or service"
                className="filter-radius"
                selectedItems={selectMaterialServiceFilter}
                setSelectedItems={setSelectMaterialServiceFilter}
                options={optionsMaterialServiceFilter}
                size="small"
                status={'default'}
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
const MaterialType = ({
    addModal,
    data,
    setData,
    updateModal,
    applyFilter,
    selectMaterialServiceFilter,
    setSelectMaterialServiceFilter,
    optionsMaterialServiceFilter,
    closeFilter,
    setCloseFilter,
}) => {
    const [info, setInfo] = useState({ id: 0, name: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { t } = useTranslation();
    const clearFilter = () => {};
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
        materialType: el.name,
        materialService:
            el.materialOrServices.length === 0
                ? '-'
                : el.materialOrServices?.map((item, idx) => (
                      <span>
                          {item.name}
                          {idx !== el.materialOrServices.length - 1 && ', '}
                      </span>
                  )),
        action: (
            <Dropdown trigger={'click'} menu={{ items }} placement="bottom">
                <Button
                    onClick={() =>
                        setInfo({
                            id: el.id,
                            name: el.name,
                            material: el.materialOrServices?.map((x) => ({ value: x.id, label: x.name })),
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
            <MaterialTypeTable
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
                        selectMaterialServiceFilter={selectMaterialServiceFilter}
                        setSelectMaterialServiceFilter={setSelectMaterialServiceFilter}
                        optionsMaterialServiceFilter={optionsMaterialServiceFilter}
                        setCloseFilter={setCloseFilter}
                    />
                }
            />
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    info={info}
                    url={'services/Material/MaterialOrServicesType/DeleteMaterialOrServicesType'}
                    applyFilter={applyFilter}
                />
            )}
        </>
    );
};

export default MaterialType;
