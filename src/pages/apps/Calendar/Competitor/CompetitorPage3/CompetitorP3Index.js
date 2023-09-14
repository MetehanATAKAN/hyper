import React, { useEffect, useState } from 'react';
import '../../../../../assets/scss/custom/competitor/competitorPage3.scss';
import { Tab, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CompetitorP2Header from '../CompetitorPage2/CompetitorP2Header';
import CompetitorP3Disadvantages from './competitorDisadvantage/CompetitorP3Disadvantages';
import CompetitorActivity from './CompetitorActivity/CompetitorActivity';
import { FetchApiGet } from '../../../../../utils/http.helper';
import CompetitorAdvantage from './CompetitorAdvantage/CompetitorAdvantage';
import { useTranslation } from 'react-i18next';
import AdvantageRate from './CompetitorAdvantage/AdvantageRate';
import DisadvantageRate from './competitorDisadvantage/DisadvantageRate';

const CompetitorP3Index = (props) => {
    const {
        customer,
        activeTab,
        handleTabChange,
        setCompetitorTitle,
        competitorProduct,
        competitorActivity,
        competitorDisadvantage,
        setCompetitorDisadvantage,
        competitorAdvantage,
        setCompetitorAdvantage,
    } = props;
    const brandName = useSelector((state) => state.Calendar.competitorBrand);
    const { t } = useTranslation();
    useEffect(() => {
        switch (activeTab) {
            case 'Activity':
                setCompetitorTitle('COMPETITOR ACTIVITIY');
                break;
            case 'Disadvantages':
                setCompetitorTitle('COMPETITOR DISADVANTAGES');
                break;
            case 'Advantages':
                setCompetitorTitle('COMPETITOR ADVANTAGES');
                break;
            case 'AdvantagesRate':
                setCompetitorTitle('COMPETITOR ADVANTAGES RATE');
                break;
            case 'DisadvantagesRate':
                setCompetitorTitle('COMPETITOR DISADVANTAGES RATE');
                break;
            default:
                break;
        }
    }, [activeTab]);
    return (
        <>
            <CompetitorP2Header brandName={brandName} customer={customer} />
            <Tabs
                defaultActiveKey="Activity"
                activeKey={activeTab}
                onSelect={handleTabChange}
                id="uncontrolled-tab-example"
                className="mb-1 comp-tabs">
                <Tab eventKey="Activity" title={t('Activity')} disabled>
                    <CompetitorActivity competitorProduct={competitorProduct} competitorActivity={competitorActivity} />
                </Tab>
                {/* <Tab eventKey="Advantages" title={t('Advantages')} disabled>
                    <CompetitorAdvantage
                        competitorProduct={competitorProduct}
                        competitorAdvantage={competitorAdvantage}
                        setCompetitorAdvantage={setCompetitorAdvantage}
                    />
                </Tab> */}
                {/* <Tab eventKey="AdvantagesRate" title={t('Advantages Rate')} disabled>
                    <AdvantageRate competitorProduct={competitorProduct} competitorAdvantage={competitorAdvantage} />
                </Tab> */}
                {/* <Tab eventKey="Disadvantages" title={t('Disadvantages')} disabled>
                    <CompetitorP3Disadvantages
                        competitorProduct={competitorProduct}
                        competitorDisadvantage={competitorDisadvantage}
                        setCompetitorDisadvantage={setCompetitorDisadvantage}
                    />
                </Tab> */}
                {/* <Tab eventKey="DisadvantagesRate" title={t('Disadvantages Rate')} disabled>
                    <DisadvantageRate
                        competitorProduct={competitorProduct}
                        competitorDisadvantage={competitorDisadvantage}
                    />
                </Tab> */}
            </Tabs>
        </>
    );
};

export default React.memo(CompetitorP3Index);
