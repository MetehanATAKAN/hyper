import React, { useState } from 'react'
import Icon from '@mdi/react';
import {
    mdiFilterMenuOutline,
    mdiLayersTripleOutline,
    mdiArrowSplitVertical,
    mdiDotsHorizontal,
    mdiEyeOutline,
    mdiContentSave 
} from '@mdi/js';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../../../components/SearchInput';
import { Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import SuccessModal from '../../../../components/Modals/SuccessModal';
import Loading from '../../../../components/Loading';

const TableActions = ({
    tableData, 
    setTableData, 
    tableItems, 
    setTableItems,
    totalItems,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    setTotalItems,
    setIsFilter,
    isSaveButton
}) => {

    const { t } = useTranslation();
    const history = useHistory();
   

    const [searchValue, setSearchValue] = useState('');
    const [successModal, setSuccessModal] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const save = () => {
        
        const c = [];
        tableItems?.map(data => (
            data?.groups.forEach(item => (
                c.push(
                    {
                        companyId: data.companyId,
                        yearId: data.yearId,
                        brandId: data.brandId,
                        specId: data.specId,
                        busId: 0,
                        indicationId: data.indicationId,
                        profileId: data.profileId,
                        priority: item.priority === '-' ? 0 : item.priority,
                        category: item.group
                    }
                )
            ))
        ))
        setSaveLoading(true);
        FetchApiPost('services/VisitMix/ProductStrategy/SaveProfileStrategy','POST',{profileStrategyData:c})
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 201) {
                            setSuccessModal(true);
                            setSaveLoading(false);
                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                            setSaveLoading(false);
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

    return (
        <div style={{ background: '#ffffff', padding:'12px 24px' }}>

            <div className="table-topbar" style={{ margin: '0' }}>
                <div className="table-topbar-right" style={{ position: 'relative' }}>

                    <button
                        id="group-button"
                        style={{ background: 'transparent', border: 'none', color: '#6c757d' }}
                        className="item"
                        onClick={()=>setIsFilter( filter => !filter)}
                    >
                        <Icon path={mdiFilterMenuOutline} title="Filter" />
                        <label> {t('filter')} </label>
                    </button>

                    <button
                        id="group-button"
                        style={{ background: 'transparent', border: 'none', color: '#6c757d' }}
                        className="item">
                        <Icon path={mdiLayersTripleOutline} title="Group By" />
                        <label> {t('group by')} </label>
                    </button>

                    <button
                        id="group-button"
                        style={{ background: 'transparent', border: 'none', color: '#6c757d' }}
                        className="item"
                    >
                        <Icon path={mdiArrowSplitVertical} title="Freeze" />
                        <label> {t('freeze')} </label>
                    </button>

                    <button
                        id="group-button"
                        style={{ background: 'transparent', border: 'none', color: '#6c757d' }}
                        className="item"
                    >
                        <Icon path={mdiEyeOutline} />
                        <label> {t('show')} </label>
                    </button>

                    {
                        
                        isSaveButton &&
                        <>
                            <button
                                id="group-button"
                                style={{ background: 'transparent', border: 'none', color: '#6c757d' }}
                                className="item"
                                onClick={save}
                                disabled={tableData.length !== 0 ? false : true}
                            >
                                <Icon path={mdiContentSave} color='#0acf97' />
                                <label style={{ color: '#0acf97' }}> {t('save')} </label>
                            </button>
                        </>
                        // <Button onClick={save}  variant="success" disabled={tableData.length !== 0 ? false : true} >{t('save')}</Button>
                    }
                    <div>
                    <SearchInput
                        ITEMS_PER_PAGE={itemsPerPage}
                        currentPage={currentPage}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        setTableData={setTableData}
                        tableItem={tableItems}
                    />
                    </div>
                </div>
                <div className="table-topbar-right">
                    <div className="item">
                        <Icon
                            path={mdiDotsHorizontal}
                            color={'#6C757D'}

                        />
                    </div>
                </div>
            </div>
            <SuccessModal
                show={successModal}
                handleClose={setSuccessModal}
                messages='Save Successful'
            />

            <div style={{ display: 'hidden' }}>
                <Loading loading={saveLoading} />
            </div>
        </div>
    )
}

export default TableActions