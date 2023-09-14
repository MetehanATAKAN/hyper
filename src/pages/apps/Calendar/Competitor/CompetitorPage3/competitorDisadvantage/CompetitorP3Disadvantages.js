import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { competitorDisadvantageData } from '../../../../../../redux/calendar/actions';

const CompetitorP3Disadvantages = (props) => {
    const { competitorDisadvantage, competitorProduct, setCompetitorDisadvantage } = props;
    const [sameDisadvantage, setSameDisadvantage] = useState([]);
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const disadvId = event.target.id.split(' ')[0];
        const compBrandId = event.target.id.split(' ')[1];
        if (event.target.checked === true) {
            competitorDisadvantage.map((data) =>
                data.competitors.map((disadv) => {
                    if (disadv.disadvantageId === Number(disadvId) && data.competitorBrandId === Number(compBrandId)) {
                        disadv.isChecked = true;
                    }
                })
            );
            setCompetitorDisadvantage([...competitorDisadvantage]);
            sameDisadvantage.map((data) =>
                data.disadvantageId === Number(disadvId) && data.competitorBrandId === Number(compBrandId)
                    ? (data.isChecked = true)
                    : (data.isChecked = false)
            );
            setSameDisadvantage([...sameDisadvantage]);
        }
        if (event.target.checked === false) {
            competitorDisadvantage.map((data) =>
                data.competitors.map((disadv) => {
                    if (disadv.disadvantageId === Number(disadvId) && data.competitorBrandId === Number(compBrandId)) {
                        disadv.isChecked = false;
                    }
                })
            );
            setCompetitorDisadvantage([...competitorDisadvantage]);
            sameDisadvantage.map((data) =>
                data.disadvantageId === Number(disadvId) && data.competitorBrandId === Number(compBrandId)
                    ? (data.isChecked = false)
                    : (data.isChecked = true)
            );
            setSameDisadvantage([...sameDisadvantage]);
        }
    };
    const findSameDisadvantage = useCallback(() => {
        for (let i = 0; i < competitorDisadvantage.length && i + 1 < competitorDisadvantage.length; i++) {
            if (competitorDisadvantage[i].competitorBrandId !== competitorDisadvantage[i + 1].competitorBrandId) {
                const x = competitorDisadvantage[i].competitors.length;
                const y = competitorDisadvantage[i + 1].competitors.length;
                if (x > y) {
                    competitorDisadvantage[i].competitors.filter((data, index) =>
                        competitorDisadvantage[i + 1].competitors.map(
                            (el, idx) =>
                                data.disadvantageId === el.disadvantageId &&
                                (setSameDisadvantage((prev) => [
                                    ...prev,
                                    {
                                        ...data,
                                        competitorBrandName: `${competitorDisadvantage[i].competitorBrandName}, ${
                                            competitorDisadvantage[i + 1].competitorBrandName
                                        }`,
                                        competitorId1: competitorDisadvantage[i].competitorBrandId,
                                        competitorId2: competitorDisadvantage[i + 1].competitorBrandId,
                                    },
                                ]),
                                competitorDisadvantage[i + 1].competitors.splice(idx, 1),
                                competitorDisadvantage[i].competitors.splice(index, 1))
                        )
                    );
                }
                if (y > x) {
                    competitorDisadvantage[i + 1].competitors.filter((data, index) =>
                        competitorDisadvantage[i].competitors.map(
                            (el, idx) =>
                                data.disadvantageId === el.disadvantageId &&
                                (setSameDisadvantage((prev) => [
                                    ...prev,
                                    {
                                        ...data,
                                        competitorBrandName: `${competitorDisadvantage[i].competitorBrandName}, ${
                                            competitorDisadvantage[i + 1].competitorBrandName
                                        }`,
                                        competitorId1: competitorDisadvantage[i].competitorBrandId,
                                        competitorId2: competitorDisadvantage[i + 1].competitorBrandId,
                                    },
                                ]),
                                competitorDisadvantage[i + 1].competitors.splice(index, 1),
                                competitorDisadvantage[i].competitors.splice(idx, 1))
                        )
                    );
                }
            }
        }
    }, [competitorDisadvantage]);
    useEffect(() => {
        findSameDisadvantage();
    }, [sameDisadvantage]);

    let arr;
    let result = sameDisadvantage.reduce((a, v) => {
        let index = a.findIndex((el) => el.competitorBrandName === v.competitorBrandName);
        if (index !== -1) {
            a[index].items.push(v);
            return [...a];
        }
        return [{ competitorBrandName: v.competitorBrandName, items: [v] }, ...a];
    }, []);

    arr = result;
    if (arr.length > 0) {
        dispatch(competitorDisadvantageData(arr));
    }

    return (
        <div id="competitor-page3-table-container" key={2}>
            {competitorDisadvantage?.map((data, index) => (
                <>
                    <div className="disadvantages-container" key={data.competitorBrandId}>
                        <div className="disadvantages-header">
                            <span className="disadvantages-header-title">{data.competitorBrandName}</span>
                        </div>
                    </div>
                    {data.competitors?.map((el, indx) => (
                        <div className="disadvantages-content" key={indx}>
                            <label id={el.disadvantageId} className="disadvantages-content-name">
                                {el.disadvantageName}
                            </label>
                            <Form.Check
                                checked={el.isChecked}
                                className="disadvantage-checkbox"
                                id={`${el.disadvantageId} ${data.competitorBrandId}`}
                                onClick={handleChange}
                            />
                        </div>
                    ))}
                </>
            ))}
            {arr.length > 0 &&
                arr?.map((data, index) => (
                    <>
                        <div className="disadvantages-container" key={data.competitorBrandId}>
                            <div className="disadvantages-header">
                                <span className="disadvantages-header-title">{data.competitorBrandName}</span>
                            </div>
                        </div>
                        {data.items?.map((el, indx) => (
                            <div className="disadvantages-content" key={indx}>
                                <label id={el.disadvantageId} className="disadvantages-content-name">
                                    {el.disadvantageName}
                                </label>
                                <Form.Check
                                    checked={el.isChecked}
                                    className="disadvantage-checkbox"
                                    id={`${el.disadvantageId} ${data.competitorBrandId}`}
                                    onClick={handleChange}
                                />
                            </div>
                        ))}
                    </>
                ))}
        </div>
    );
};

export default React.memo(CompetitorP3Disadvantages);
