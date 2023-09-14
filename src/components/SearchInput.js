import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const SearchInput = ({
    searchValue,
    setSearchValue,
    tableItem,
    currentPage,
    ITEMS_PER_PAGE,
    setTableData
}) => {

    const { t } = useTranslation();

    const searchTable = async (value) => {

        await setSearchValue(value);
        let tableDatas = tableItem.slice((currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE), ITEMS_PER_PAGE * currentPage);
        const filterData = tableDatas.filter((person) => {
          return Object.keys(person).some((key) =>
            person[key]
              .toString()
              .toLowerCase()
              .includes(value.toString().toLocaleLowerCase())
          )
        })
    
        setTableData(filterData);
      }

      useEffect(() => {
        if (searchValue !== '') {
          searchTable(searchValue);
        }
      }, [currentPage])

  return (
    <div>
        <div
          className={'search mb-1 pt-1'}
          style={{ position: 'relative' }}>
          <input placeholder={t('search...')} onChange={(e) => searchTable(e.target.value)} defaultValue={searchValue} />
          <Icon path={mdiMagnify} color={'#6C757D'} title="Search" />
        </div>
    </div>
  )
}

export default SearchInput