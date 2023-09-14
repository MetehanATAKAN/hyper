import { Slider } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PromoRangeBar = (props) => {
    const { objectionRangeData, objectionRangeIndex, promoSave, setPromoSave, data, objectionDataPromo } = props;
    const [sliderVal, setSliderVal] = useState(0);
    const { t } = useTranslation();
    const sliderChange = (event, newVal) => {
        setSliderVal(newVal);
    };

    useEffect(() => {
        setPromoSave((prev) => [
            ...prev,
            {
                ...data,
                objectionId: objectionRangeData.id,
                objectionName: objectionRangeData.objectionName,
                percentage: 0,
            },
        ]);
    }, [data, objectionRangeData, setPromoSave]);

    useEffect(() => {
        promoSave.map((el) =>
            el.objectionId === objectionRangeData.id && el.brandName === data.brandName
                ? (el.percentage = sliderVal)
                : null
        );
    }, [data, objectionRangeData, promoSave, sliderVal]);

    useEffect(() => {
        if (!objectionDataPromo) return;
        setSliderVal(objectionDataPromo.percentage);
    }, [objectionDataPromo]);

    return (
        <div className="sliders" key={objectionRangeIndex}>
            <div
                className={`slider1 ${sliderVal <= 25 && 'less25'} ${sliderVal > 25 && sliderVal <= 50 && 'less50'} ${
                    sliderVal > 50 && sliderVal <= 100 && 'less100'
                }`}>
                <span className="slider-title">{t(`${objectionRangeData.objectionName}`)}</span>
                <Slider
                    id={objectionRangeIndex}
                    min={0}
                    max={100}
                    onChange={sliderChange}
                    value={sliderVal}
                    step={objectionRangeData.range}
                />
                {sliderVal}%
            </div>
        </div>
    );
};

export default React.memo(PromoRangeBar);
