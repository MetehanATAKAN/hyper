import React from 'react'
import Select from 'react-select'
import { useTranslation } from 'react-i18next';
const PromoSelect = ({promo,nonPromo,addPromited}) => {
    const { t } = useTranslation();
    return (
        <div className='promo_selects'>
            <div className='promo'>
                <div className='promo_header'>{t('promo')}</div>
                <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={promo}
                    isDisabled={true}
                    placeholder={false}
                />


            </div>
            <div className='non_promo'>
                <div className='promo_header'>{t('non promo')}</div>
                <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={nonPromo}
                    isDisabled={true}
                    placeholder={false}
                />
            </div>
            <div className='addinitonal_prometed'>
                <div className='promo_header'>{t('additional promoted')}</div>
                <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    isMulti={true}
                    value={addPromited}
                    isDisabled={true}
                    placeholder={false}
                />
            </div>
        </div>
    )
}

export default PromoSelect