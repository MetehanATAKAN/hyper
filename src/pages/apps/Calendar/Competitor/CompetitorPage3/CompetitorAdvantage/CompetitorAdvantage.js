import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const CompetitorAdvantage = (props) => {
    const { competitorProduct, competitorAdvantage, setCompetitorAdvantage } = props;
    const [showAddInput, setShowAddInput] = useState(false);
    const [addAdvantages, setAddAdvantages] = useState('');
    const [newAdvantageArr, setNewAdvantageArr] = useState([]);
    const brandId = useSelector((state) => state.Calendar.competitorId);
    const { t } = useTranslation();
    const addButtonFirst = (event) => {
        const competitorId = event.target.id.split(' ')[0];
        setShowAddInput(!showAddInput);
        if (showAddInput === false) {
            document
                .getElementsByClassName('add-disadv-input')
                .namedItem(competitorId)
                .classList.add('show-disadv-input');
            const btn = document.getElementsByClassName('disadvantages-btn').namedItem(event.target.id);
            btn.innerHTML = '';
            let i = document.createElement('i');
            i.className = 'fas fa-check';
            i.setAttribute('id', event.target.id);
            btn.appendChild(i);
            btn.classList.add('check-icon');
        }
    };
    const addButtonSecond = (event) => {
        const competitorId = event.target.id.split(' ')[0];
        const competitorName = event.target.id.split(' ')[1];
        const selectedCompetitor = competitorAdvantage?.filter((el) => el.competitorBrandName === competitorName);
        const conditions = [
            addAdvantages === '',
            selectedCompetitor.find((el) => el.advantageName.toLowerCase() === addAdvantages.toLowerCase())
                ? true
                : false,
        ];
        if (conditions.every((v) => v === false)) {
            const advantage = {
                brandId: Number(brandId),
                competitorBrandId: Number(competitorId),
                competitorBrandName: competitorName,
                advantageName: addAdvantages,
                status: true,
                percent: 0,
            };
            competitorAdvantage.push(advantage);
            setNewAdvantageArr((state) => [...state, advantage]);
            setAddAdvantages('');
            document.getElementsByClassName('add-disadv-input').namedItem(competitorId).value = '';
        }
        if (conditions.some((v) => v === true)) {
            setAddAdvantages('');
        }
        setShowAddInput(!showAddInput);
        if (showAddInput === true) {
            document
                .getElementsByClassName('add-disadv-input')
                .namedItem(competitorId)
                .classList.remove('show-disadv-input');
            const btn = document.getElementsByClassName('disadvantages-btn').namedItem(event.target.id);
            btn.classList.remove('check-icon');
            btn.innerHTML = '+';
        }
    };
    const handleChange = (event) => {
        setAddAdvantages(event.target.value);
    };
    const deleteAdvantages = (event) => {
        const btnIndex = Number(event.target.id.split(' ')[0]);
        const btnId = Number(event.target.id.split(' ')[1]);
        competitorAdvantage.map((el, i) => (i === btnIndex ? (el.status = false) : true));
        competitorAdvantage.map((el, index) =>
            newAdvantageArr.includes(el) && el.status === false
                ? competitorAdvantage.splice(index, 1)
                : console.log('yok')
        );
        setCompetitorAdvantage([...competitorAdvantage]);
    };
    return (
        <div id="competitor-page3-table-container" key={2}>
            {competitorProduct?.map((data, index) => (
                <>
                    <div className="disadvantages-container" key={data.competitorBrandId}>
                        <div className="disadvantages-header">
                            <span className="disadvantages-header-title">{data.competitorBrandName}</span>
                            <div id={data.competitorBrandId}>
                                <span className="spanInp">
                                    <input
                                        id={data.competitorBrandId}
                                        type="text"
                                        value={addAdvantages}
                                        className={`add-disadv-input`}
                                        placeholder={t('Add Advantage')}
                                        onChange={handleChange}
                                    />
                                </span>
                                <Button
                                    key={data.competitorBrandId}
                                    id={`${data.competitorBrandId} ${data.competitorBrandName}`}
                                    className={`disadvantages-btn`}
                                    onClick={showAddInput === false ? addButtonFirst : addButtonSecond}>
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                    {competitorAdvantage.length > 0 &&
                        competitorAdvantage?.map((item, indx) =>
                            item.advantageName !== null &&
                            data.competitorBrandId === item.competitorBrandId &&
                            item.status === true ? (
                                <div className="disadvantages-content" key={indx}>
                                    <label id={indx} className="disadvantages-content-name">
                                        {item.advantageName}
                                    </label>
                                    <Button
                                        id={`${indx} ${data.competitorBrandId}`}
                                        className="disadvanteges-delete-btn"
                                        onClick={deleteAdvantages}>
                                        <i id={`${indx} ${data.competitorBrandId}`} className="fas fa-trash"></i>
                                    </Button>
                                </div>
                            ) : null
                        )}
                </>
            ))}
        </div>
    );
};

export default React.memo(CompetitorAdvantage);
