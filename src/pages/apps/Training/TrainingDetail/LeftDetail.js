import React from 'react';
import DetailTab from './DetailTab';
import resim from './a233.jpg';
const LeftDetail = () => {
    return (
        <>
            <DetailTab />
            <div className="fill-image" style={{ backgroundImage: `url(${resim})` }}></div>
            <div className="left-bottom-area"></div>
        </>
    );
};

export default React.memo(LeftDetail);
