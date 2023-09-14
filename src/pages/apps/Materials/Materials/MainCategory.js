import { Button, Dropdown } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Delete from './Actions/Delete';
import MainCategoryTable from './Tables/MainCategoryTable';

const MainCategory = ({ addModal, data, setData, updateModal }) => {
    const [info, setInfo] = useState({ id: 0, name: '', abb: '', desc: '', color: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { t } = useTranslation();

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
        mainCategory: el.name,
        abb: (
            <span
                style={{
                    backgroundColor: `rgba(${el.backgroundColor},0.15)`,
                    color: `rgb(${el.backgroundColor})`,
                    padding: '1px 8px',
                    borderRadius: 3,
                }}>
                {el.abb}
            </span>
        ),
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
                            color: el.backgroundColor,
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
            <MainCategoryTable data={tableData} addModal={addModal} />
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    info={info}
                    url={'services/Material/MainCategory/DeleteMainCategory'}
                    tab="Main Category"
                    setData={setData}
                />
            )}
        </>
    );
};

export default MainCategory;
