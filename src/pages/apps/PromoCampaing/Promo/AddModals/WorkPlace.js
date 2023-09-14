import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WorkPlace = ({
    selectCycle,
    setSelectCycle,
    selectType,
    setSelectType,
    selectType2,
    setSelectType2,
    selectType3,
    setSelectType3,
    selectCategory,
    setSelectCategory,
    optionsCycle,
    setOptionsCycle,
    optionsType,
    setOptionsType,
    optionsCategory,
    setOptionsCategory,
    dropdowns,
    workStatus,
}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const cycleData = useSelector((state) => state.PromoCampaing.cycleData);
    const countryId = localStorage.getItem('countryId');
    const [error, setError] = useState('');
    useEffect(() => {
        if (cycleData === null) return;
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/GetCyclePeriod',
            'POST',
            cycleData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setOptionsCycle(data?.map((el) => ({ value: el.id, label: el.cycleName })));
                });
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [cycleData]);

    useEffect(() => {
        const data = {
            headerIds: dropdowns.map((el) => {
                if (el.headerId === 0) {
                    return el.id;
                }
                return el.headerId;
            }),
            countryId: Number(countryId),
            defIds: [],
        };
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderIdandDefIds', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) =>
                    setOptionsType(
                        data?.map((el) => ({
                            value: el.definationId,
                            label: el.definationName,
                            desc: el.description,
                            headerId: el.headerId,
                        }))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    return (
        <>
            {error && <label style={{ color: '#FA5C7C' }}>{error}</label>}

            <MultipleSelects
                label={'cycle period'}
                selectedItems={selectCycle}
                setSelectedItems={setSelectCycle}
                options={optionsCycle}
                width={'100%'}
                status={workStatus[0].status}
                isStar={true}
            />
            {dropdowns?.map((el) => {
                if (el.headerId === 1 || el.id === 1) {
                    return (
                        <SingleSelects
                            label={el.headerName}
                            selectedItems={selectType}
                            setSelectedItems={setSelectType}
                            options={optionsType.filter((el) => el.headerId === 1 || el.id === 1)}
                            width={'100%'}
                            status={workStatus[1].status}
                            isStar={true}
                        />
                    );
                }
                if (el.headerId === 8 || el.id === 8) {
                    return (
                        <SingleSelects
                            label={el.headerName}
                            selectedItems={selectType2}
                            setSelectedItems={setSelectType2}
                            options={optionsType.filter((el) => el.headerId === 8 || el.id === 8)}
                            width={'100%'}
                            status={workStatus[2].status}
                            isStar={true}
                        />
                    );
                }
                if (el.headerId === 15 || el.id === 15) {
                    return (
                        <SingleSelects
                            label={el.headerName}
                            selectedItems={selectType3}
                            setSelectedItems={setSelectType3}
                            options={optionsType.filter((el) => el.headerId === 15 || el.id === 15)}
                            width={'100%'}
                            status={workStatus[3].status}
                            isStar={true}
                        />
                    );
                }
            })}
            <MultipleSelects
                label={'category'}
                selectedItems={selectCategory}
                setSelectedItems={setSelectCategory}
                options={optionsCategory}
                status={workStatus[4].status}
                width={'100%'}
                isStar={true}
            />
        </>
    );
};

export default React.memo(WorkPlace);
