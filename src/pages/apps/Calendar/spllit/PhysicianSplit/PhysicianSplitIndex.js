import React from 'react';
import PhysicianSplitHeader from './PhysicianSplitHeader';
import PhysicianTableDatas from './PhysicianTableDatas';

const PhysicianSplitIndex = (props) => {
    const { physicianData, setPhysicianData, setPhysicianDataCopy, physicianDataCopy, pharmacyName, pharmacyId, skuName, skuId } = props;
    console.log(physicianData);
    return (
        <div>
            <PhysicianTableDatas physicianData={physicianData} setPhysicianData={setPhysicianData} setPhysicianDataCopy={setPhysicianDataCopy} physicianDataCopy={physicianDataCopy} />
            {/* <PhysicianSplitHeader
                setPhysicianData={setPhysicianData}
                physicianData={physicianData}
                pharmacyName={pharmacyName}
            /> */}
        </div>
    );
};

export default React.memo(PhysicianSplitIndex);
