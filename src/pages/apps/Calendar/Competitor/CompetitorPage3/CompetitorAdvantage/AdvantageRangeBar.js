import { Slider } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';

const AdvantageRangeBar = (props) => {
    const { advantageRangeData, advantageRangeIndex } = props;
    const [sliderVal, setSliderVal] = useState(0);
    const sliderChange = (event, newVal) => {
        setSliderVal(newVal);
    };
    useMemo(() => {
        if (sliderVal !== 0) {
            advantageRangeData.percent = sliderVal;
        }
    }, [advantageRangeData, sliderVal]);
    useEffect(() => {
        setSliderVal(advantageRangeData.percent);
    }, [advantageRangeData]);
    return (
        <div className="sliders" key={advantageRangeIndex}>
            <div
                className={`slider1 ${sliderVal <= 25 && 'less25'} ${sliderVal > 25 && sliderVal <= 50 && 'less50'} ${
                    sliderVal > 50 && sliderVal <= 100 && 'less100'
                }`}>
                <span className="slider-title">{advantageRangeData.advantageName}</span>
                <Slider
                    id="slider1"
                    min={0}
                    max={100}
                    onChange={sliderChange}
                    value={advantageRangeData.percent}
                    step={5}
                />
                {advantageRangeData.percent}%
            </div>
        </div>
    );
};

export default React.memo(AdvantageRangeBar);
