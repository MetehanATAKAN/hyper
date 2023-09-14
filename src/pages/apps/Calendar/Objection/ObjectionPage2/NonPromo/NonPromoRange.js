import { Slider } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const NonPromoRange = (props) => {
    const { objectionRangeData, objectionRangeIndex, data, nonPromoSave, setNonPromoSave, objectionDataNonPromo } =
        props;
    const [sliderVal, setSliderVal] = useState(0);
    const { t } = useTranslation();
    const sliderChange = (event, newVal) => {
        setSliderVal(newVal);
    };

    useEffect(() => {
        setNonPromoSave((prev) => [
            ...prev,
            {
                objectionId: objectionRangeData.id,
                objectionName: objectionRangeData.objectionName,
                brandId: data.brandId,
                brandName: data.brandName,
                isPromo: data.isPromo,
                isAdditional: data.isAdditional,
                date: data.date,
                percentage: 0,
            },
        ]);
    }, [data, objectionRangeData, setNonPromoSave]);

    useEffect(() => {
        nonPromoSave.map((el) =>
            el.objectionId === objectionRangeData.id && el.brandName === data.brandName
                ? (el.percentage = sliderVal)
                : null
        );
    }, [data.brandName, nonPromoSave, objectionRangeData, sliderVal]);

    useEffect(() => {
        if (!objectionDataNonPromo) return;
        setSliderVal(objectionDataNonPromo.percentage);
    }, [objectionDataNonPromo]);

    return (
        <div className="sliders" key={objectionRangeIndex}>
            <div
                className={`slider1 ${sliderVal <= 25 && 'less25'} ${sliderVal > 25 && sliderVal <= 50 && 'less50'} ${
                    sliderVal > 50 && sliderVal <= 100 && 'less100'
                }`}>
                <span className="slider-title">{t(`${objectionRangeData.objectionName}`)}</span>
                <Slider
                    id="slider1"
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

export default React.memo(NonPromoRange);
