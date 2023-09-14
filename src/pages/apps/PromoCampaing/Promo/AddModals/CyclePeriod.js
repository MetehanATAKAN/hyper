import React, { useEffect } from 'react';
import { NewInput } from '../../../../../components/GlobalNew/Inputs';
import { useTranslation } from 'react-i18next';
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { DatePicker } from 'antd';
import moment from 'moment';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus } from '@mdi/js';
const { RangePicker } = DatePicker;
const Colors = ({ label, color }) => {
    const { t } = useTranslation();
    return (
        <div style={{ color: `rgb(${color})`, display: 'flex', alignItems: 'center', fontWeight: '500' }}>
            <div
                style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: `rgba(${color}, 0.5)`,
                    borderRadius: '3px',
                    marginRight: '8px',
                }}></div>{' '}
            {t(label)}
        </div>
    );
};
const CyclePeriod = ({
    name,
    setName,
    selectCompany,
    setSelectCompany,
    setColor,
    selectBusUnit,
    setSelectBusUnit,
    setSelectDate,
    optionsCompany,
    setOptionsCompany,
    optionsBusUnit,
    setOptionsBusUnit,
    cycleStatus,
    checkNewCyclePeriod,
    setCheckNewCyclePeriod,
}) => {
    const { t } = useTranslation();
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const year = useSelector((state) => state.PromoCampaing.year);
    const items = [
        { label: <Colors color="0, 160, 223" label={'Blue'} />, key: '0, 160, 223' }, // remember to pass the key prop
        { label: <Colors color="108, 117, 125" label={'Gray'} />, key: '108, 117, 125' },
        { label: <Colors color="10, 207, 151" label={'Green'} />, key: '10, 207, 151' },
        { label: <Colors color="255, 188, 0" label={'Yellow'} />, key: '255, 188, 0' },
        { label: <Colors color="250, 92, 124" label={'Red'} />, key: '250, 92, 124' },
        { label: <Colors color="57, 175, 209" label={'Turquoise'} />, key: '57, 175, 209' },
        { label: <Colors color="114, 124, 245" label={'Indigo'} />, key: '114, 124, 245' },
        { label: <Colors color="107, 94, 174" label={'Purple'} />, key: '107, 94, 174' },
        { label: <Colors color="255, 103, 155" label={'Pink'} />, key: '255, 103, 155' },
        { label: <Colors color="253, 126, 20" label={'Orange'} />, key: '253, 126, 20' },
        { label: <Colors color="2, 168, 181" label={'Teal'} />, key: '2, 168, 181' },
    ];

    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            const first = moment(start).format();
            const last = moment(end).format();
            setSelectDate([new Date(first).toISOString(), new Date(last).toISOString()]);
        } else {
            setSelectDate([]);
        }
    };
    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetRoCompanies/${empId}`, 'GET').then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    setSelectCompany({ value: data[0].CompanyId, label: data[0].CompanyName });
                    setOptionsCompany(data?.map((x) => ({ value: x.CompanyId, label: x.CompanyName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [empId, history]);
    useEffect(() => {
        if (!selectCompany) return;
        const postData = {
            CompanyId: selectCompany.value,
            Year: year ?? 0,
        };
        FetchApiPost('api/OldSystem/GetBusinessUnitCampaign', 'POST', postData).then((res) => {
            if (res.status === 200 || 201) {
                res.json().then((data) => {
                    if (data.length === 0) {
                        return setOptionsBusUnit([]), setSelectBusUnit();
                    }
                    setSelectBusUnit({ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName });
                    setOptionsBusUnit(data?.map((x) => ({ value: x.BusinessUnitId, label: x.BusinessUnitName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, selectCompany]);
    return (
        <>
            <Button
                className="d-flex align-items-center"
                size="sm"
                onClick={() => setCheckNewCyclePeriod(!checkNewCyclePeriod)}
                style={{
                    backgroundColor: '#fafbfe',
                    color: '#00a0df',
                    border: 'none',
                    boxShadow: 'none',
                    padding: '0',
                    fontSize: '.9rem',
                    fontWeight: '600',
                    marginTop: '8px',
                }}>
                <Icon
                    path={checkNewCyclePeriod === false ? mdiPlus : mdiMinus}
                    title="content"
                    size={0.7}
                    horizontal
                    vertical
                    color="#00a0df"
                />
                {t('add cycle')}
            </Button>
            {checkNewCyclePeriod && (
                <NewInput
                    width={'100%'}
                    value={name}
                    setValue={setName}
                    label="cycle name"
                    isDropDown={true}
                    isStar={true}
                    isUpperCase={true}
                    btnTooltip="Colors"
                    btnIcon={<i className="fas fa-ellipsis-h"></i>}
                    dropDownItems={items}
                    dropDownSetValue={setColor}
                    status={cycleStatus[0].status}
                />
            )}
            <SingleSelects
                isStar={true}
                label={'company'}
                selectedItems={selectCompany}
                setSelectedItems={setSelectCompany}
                options={optionsCompany}
                width={'100%'}
                status={cycleStatus[1].status}
            />
            <SingleSelects
                isStar={true}
                label={'business unit'}
                selectedItems={selectBusUnit}
                setSelectedItems={setSelectBusUnit}
                options={optionsBusUnit}
                width={'100%'}
                status={cycleStatus[2].status}
            />
            {checkNewCyclePeriod && (
                <RangePicker
                    style={{ width: '100%' }}
                    picker="month"
                    onChange={onChangeDate}
                    placeholder={[t('Start Date'), t('End Date')]}
                    format="MM/YYYY"
                    separator={<i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>}
                    status={cycleStatus[3].status}
                />
            )}
        </>
    );
};

export default React.memo(CyclePeriod);
