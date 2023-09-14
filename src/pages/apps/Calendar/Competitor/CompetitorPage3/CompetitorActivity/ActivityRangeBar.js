import { Slider } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ActivityRangeBars = (props) => {
    const { activityRangeData, activityRangeIndex } = props;
    const [sliderVal, setSliderVal] = useState(0);
    const { t } = useTranslation();
    const sliderChange = (event, newVal) => {
        setSliderVal(newVal);
    };
    useMemo(() => {
        if (sliderVal !== 0) {
            activityRangeData.percent = sliderVal;
        }
    }, [activityRangeData, sliderVal]);
    useEffect(() => {
        setSliderVal(activityRangeData.percent);
    }, [activityRangeData]);
    return (
        <div className="sliders" key={activityRangeIndex}>
            <div
                className={`slider1 ${sliderVal <= 25 && 'less25'} ${sliderVal > 25 && sliderVal <= 50 && 'less50'} ${
                    sliderVal > 50 && sliderVal <= 100 && 'less100'
                }`}>
                <span className="slider-title">{t(`${activityRangeData.activityName}`)}</span>
                <Slider
                    id="slider1"
                    min={0}
                    max={100}
                    onChange={sliderChange}
                    value={activityRangeData.percent}
                    step={activityRangeData.activityRange}
                />
                {activityRangeData.percent}%
            </div>
        </div>
    );
};

export default React.memo(ActivityRangeBars);
