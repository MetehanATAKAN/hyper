import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import Filters from './Filters';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { useDispatch } from 'react-redux';
import { productPaSelectFilterName } from '../../../../redux/actions';

const FilterHeader = ({
    setisApplyFilter,
    setApplyData,
    setIsApply,
    isOpenFilter,
    setSubPromoLoading,
    setisTable,
    setIsOpenFilter
}) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [filterName, setFilterName] = useState('specialization');
    
    const filterOptions = [
        {
            value:1,
            label:'specialization'
        },
        {
            value:2,
            label:'customer'
        },
        {
            value:3,
            label:'pharmacy'
        },
    ];

    useEffect(() => {
      dispatch(productPaSelectFilterName(filterName));
    }, [dispatch, filterName])
    
    
  return (
      <>
          {
            isOpenFilter &&
            <div className='d-flex total-detail'>
              <div>
                  <Form.Check
                      inline
                      label={t('total')}
                      name="totalOrDetail"
                      type='checkbox'
                      checked={true}
                  />
                  <Form.Check
                      inline
                      label={t('detail')}
                      name="totalOrDetail"
                      type='checkbox'
                      disabled
                  />
              </div>

              {/* <div>
              <SingleSelects
                options={filterOptions}
                selectedItems={filterName}
                setSelectedItems={(e)=>setFilterName(e.label)}
                className='filter-radius'
                size="small"
                clearIcon={false}
                />
              </div> */}
          </div>
          }

          <Filters
              selectFilter={filterName}
              setisApplyFilter={setisApplyFilter}
              setApplyData={setApplyData}
              setIsApply={setIsApply}
              isOpenFilter={isOpenFilter}
              setSubPromoLoading={setSubPromoLoading}
              setisTable={setisTable}
              setIsOpenFilter={setIsOpenFilter}
          />
      </>
  )
}

export default FilterHeader