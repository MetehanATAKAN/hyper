import React, { useEffect, useState } from 'react'
import Icon from '@mdi/react';
import {
    mdiMagnify,
    mdiFilterMenuOutline,
    mdiLayersTripleOutline,
    mdiArrowSplitVertical,
    mdiDotsHorizontal,
    mdiPlus,
    mdiEyeOutline,
} from '@mdi/js';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../../../components/SearchInput';

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
    setIsFilter
}) => {

    const { t } = useTranslation();

   

    const [searchValue, setSearchValue] = useState('');

    // useEffect(() => {
    //     setTableData(
    //       tableItems.slice((currentPage * itemsPerPage - itemsPerPage), itemsPerPage * currentPage)
    //     )
    //   }, [currentPage, itemsPerPage, setTableData])

    // useEffect(() => {
    //     setTotalItems(tableItems?.length)
    // }, [tableItems])

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
        </div>
    )
}

export default TableActions