import React from 'react';
import '../../../../assets/scss/custom/Training/trainingDetail.scss';
import LeftDetail from './LeftDetail';
import RightDetail from './RightDetail';
const TrainingDetail = () => {
    return (
        <div id="training-detail-container">
            <div className="left-area">
                <LeftDetail />
            </div>
            <div className="right-area">
                <RightDetail />
            </div>
        </div>
    );
};

export default React.memo(TrainingDetail);
