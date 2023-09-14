import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CompetitorP2Add from './CompetitorP2Add';
import CompetitorP2Table from './CompetitorP2Table';

const CompetitorP2Body = (props) => {
    const {
        setBtnDisable,
        competitorProduct,
        setCompetitorProduct,
        competitorAddList,
        setCompetitorAddList,
        brandId,
        competitorDisadvantage,
        competitorAdvantage,
        competitorActivity,
    } = props;
    const { t } = useTranslation();
    const [inputPercent, setInputPercent] = useState(0);
    const [show, setShow] = useState(false);

    const changeInput = (e) => {
        const btnId = Number(e.target.id.split(' ')[1]);
        let sumPercent = 0;
        competitorProduct.map((data) =>
            Number(data.competitorBrandId) === btnId ? (data.competitorBrandPercent = Number(e.target.value)) : null
        );
        competitorProduct.map((data) => (sumPercent += data.competitorBrandPercent));
        setInputPercent((prev) => 0 + Number(sumPercent));
    };
    const showAddCompetitor = () => {
        setShow(true);
    };

    const deleteCompetitor = (e) => {
        const btnIndex = Number(e.target.id.split(' ')[0]);
        const btnId = Number(e.target.id.split(' ')[1]);
        const resultArray = competitorProduct.filter((data) => Number(data.competitorBrandId) !== btnId);
        competitorProduct
            .filter((data) => Number(data.competitorBrandId) === btnId)
            .map((data) =>
                setCompetitorAddList((state) => [
                    ...state,
                    {
                        competitorBrandId: data.competitorBrandId,
                        competitorBrandName: data.competitorBrandName,
                        productId: data.brandId,
                    },
                ])
            );
        competitorActivity.splice(btnIndex, 1);
        competitorDisadvantage.splice(btnIndex, 1);
        competitorAdvantage.splice(btnIndex, 1);
        setCompetitorProduct([...resultArray]);
    };
    useEffect(() => {
        let sumPercent = 0;
        competitorProduct.map((data) => (sumPercent += data.competitorBrandPercent));
        setInputPercent(0 + sumPercent);
    }, [competitorProduct]);
    useEffect(() => {
        competitorProduct.every((el) => el.competitorBrandPercent !== 0) && inputPercent === 100
            ? setBtnDisable(false)
            : setBtnDisable(true);
    }, [competitorProduct, inputPercent]);
    return (
        <>
            <CompetitorP2Add
                show={show}
                setShow={setShow}
                setCompetitorProduct={setCompetitorProduct}
                competitorAddList={competitorAddList}
                setCompetitorAddList={setCompetitorAddList}
                competitorProduct={competitorProduct}
                brandId={brandId}
            />
            <Table bordered size="sm" id="competitor-page2-table">
                <thead>
                    <tr key="tr0">
                        <th key="th1" style={{ textAlign: 'left' }}>
                            {t('COMPETITORS')}
                        </th>
                        <th key="th2">%</th>
                        <th key="th3">
                            <button className="add-cmp" onClick={showAddCompetitor}>
                                +
                            </button>
                        </th>
                    </tr>
                    <tr key="tr1">
                        <th key="th4" style={{ textAlign: 'left' }}>
                            {competitorProduct === null ? '0' : competitorProduct.length} {t('Competitor')}
                        </th>
                        <th key="th5" className={inputPercent > 100 ? 'dangerPercent' : null}>
                            {competitorProduct === null ? '0' : inputPercent}%
                        </th>
                        <th key="th6"></th>
                    </tr>
                </thead>
                <tbody>
                    {competitorProduct.map((data, index) => (
                        <CompetitorP2Table
                            data={data}
                            index={index}
                            setPercent={setInputPercent}
                            changeInput={changeInput}
                            deleteCompetitor={deleteCompetitor}
                        />
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default React.memo(CompetitorP2Body);
