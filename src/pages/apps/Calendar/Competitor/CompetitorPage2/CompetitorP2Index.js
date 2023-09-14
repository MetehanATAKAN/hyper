import React, { useEffect } from 'react';
import CompetitorP2Body from './CompetitorP2Body';
import CompetitorP2Header from './CompetitorP2Header';
import '../../../../../assets/scss/custom/competitor/competitorPage2.scss';
import { useSelector } from 'react-redux';

const CompetitorP2Index = (props) => {
    const {
        customer,
        setBtnDisable,
        setCompetitorTitle,
        brandId,
        competitorProduct,
        setCompetitorProduct,
        competitorActivity,
        competitorDisadvantage,
        competitorAdvantage,
        competitorAddList,
        setCompetitorAddList,
    } = props;
    const brandName = useSelector((state) => state.Calendar.competitorBrand);

    useEffect(() => {
        setCompetitorTitle('COMPETITOR');
    }, [setCompetitorTitle]);
    return (
        <div>
            <CompetitorP2Header brandName={brandName} customer={customer} />
            <CompetitorP2Body
                brandId={brandId}
                setBtnDisable={setBtnDisable}
                competitorProduct={competitorProduct}
                setCompetitorProduct={setCompetitorProduct}
                competitorAddList={competitorAddList}
                setCompetitorAddList={setCompetitorAddList}
                competitorActivity={competitorActivity}
                competitorAdvantage={competitorAdvantage}
                competitorDisadvantage={competitorDisadvantage}
            />
        </div>
    );
};

export default React.memo(CompetitorP2Index);
