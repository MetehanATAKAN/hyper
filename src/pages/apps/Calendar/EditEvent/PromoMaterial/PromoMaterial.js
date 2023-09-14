import React, { useEffect } from 'react';
import PromoMaterialBody from './PromoMaterialBody';
import '../../../../../assets/scss/custom/editevent/PromoMaterial.scss';
import { useSelector } from 'react-redux';

const PromoMaterial = (props) => {
    const {
        promoMaterial,
        setButtonDisable,
        setReportTitle,
        materialData,
        selectPromoMaterial,
        setSelectPromoMaterial,
    } = props;
    const appStatus = useSelector((state) => state.Calendar.appStatus);

    useEffect(() => {
        setReportTitle('PROMO MATERIAL');
    }, [setReportTitle]);
    return (
        <div className="promo-material">
            {promoMaterial.map((data) => (
                <div className="promo-material__group">
                    <PromoMaterialBody
                        label={data.label}
                        setButtonDisable={setButtonDisable}
                        data={
                            appStatus !== 4
                                ? materialData.filter((el) => data.id === el.BrandId)
                                : materialData.filter((el) => data.id === el.brandId)
                        }
                        setSelectPromoMaterial={setSelectPromoMaterial}
                        selectPromoMaterial={selectPromoMaterial}
                    />
                </div>
            ))}
        </div>
    );
};

export default PromoMaterial;
