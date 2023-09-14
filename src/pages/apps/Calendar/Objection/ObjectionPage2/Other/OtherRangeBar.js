import { Slider } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const OtherRangeBar = (props) => {
    const { objectionRangeData, objectionRangeIndex, otherSave, setOtherSave, data, objectionDataOther } = props;
    const [sliderVal, setSliderVal] = useState(0);
    const { t } = useTranslation();
    const sliderChange = (event, newVal) => {
        setSliderVal(newVal);
    };

    useEffect(() => {
        setOtherSave((prev) => [
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
    }, [data, objectionRangeData, setOtherSave]);

    useEffect(() => {
        otherSave.map((el) =>
            el.objectionId === objectionRangeData.id && el.brandName === data.brandName
                ? (el.percentage = sliderVal)
                : null
        );
    }, [data, objectionRangeData.id, otherSave, sliderVal]);

    useEffect(() => {
        if (!objectionDataOther) return;
        setSliderVal(objectionDataOther.percentage);
    }, [objectionDataOther]);

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

export default React.memo(OtherRangeBar);
