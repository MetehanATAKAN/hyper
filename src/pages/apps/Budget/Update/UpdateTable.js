import React, { useEffect } from 'react';
import { Input, Table } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomSwitch } from './Update1';
const UpdateTable = ({
    quantitySwitch,
    monthsPrice,
    setMonthsPrice,
    monthsQuantity,
    setMonthsQuantity,
    selectYear,
}) => {
    const [copySwitch, setCopySwitch] = useState(false);
    const [rowTotal, setRowTotal] = useState(0);
    const [disableMonths, setDisableMonths] = useState({
        jan: false,
        feb: false,
        mar: false,
        apr: false,
        may: false,
        jun: false,
        jul: false,
        aug: false,
        sep: false,
        oct: false,
        nov: false,
        dec: false,
    });
    const userDate = new Date();
    const currentMonth = userDate.getMonth();
    const userYear = userDate.getFullYear();
    useEffect(() => {
        const initialObj = { ...disableMonths };
        if (selectYear.id < Number(userYear)) {
            Object.keys(initialObj).map((el, i) => {
                initialObj[el] = true;
            });
            setDisableMonths(initialObj);
        }
        if (selectYear.id === Number(userYear)) {
            Object.keys(initialObj).map((el, i) => {
                if (i < currentMonth) {
                    initialObj[el] = true;
                }
                return el;
            });
            setDisableMonths(initialObj);
        }
    }, [currentMonth, selectYear, userYear]);
    console.log(disableMonths);
    const { t } = useTranslation();
    const handleChange = (e, row) => {
        if (row.key === '1') {
            setMonthsPrice({ ...monthsPrice, [e.target.name]: Number(e.target.value) });
            if (copySwitch === true) {
                const initialObj = { ...monthsPrice };
                //filter object compare value 0
                const obj = Object.fromEntries(
                    Object.entries(initialObj).filter(([key, value]) => key === e.target.name)
                );
                // find last element prop
                let lastKey = Object.keys(obj).pop();
                let lastIndex = Object.keys(monthsPrice).findIndex((el) => el === lastKey);
                // add last element value from index
                Object.keys(initialObj).forEach((item, i) => {
                    if (i >= lastIndex) {
                        initialObj[item] = Number(e.target.value);
                    }
                });
                setMonthsPrice(initialObj);
            }
        }
        if (row.key === '2') {
            setMonthsQuantity({ ...monthsQuantity, [e.target.name]: Number(e.target.value) });
            if (copySwitch === true) {
                const initialObj = { ...monthsQuantity };
                //filter object compare value 0
                const obj = Object.fromEntries(
                    Object.entries(initialObj).filter(([key, value]) => key === e.target.name)
                );
                // find last element prop
                let lastKey = Object.keys(obj).pop();
                let lastIndex = Object.keys(monthsQuantity).findIndex((el) => el === lastKey);
                // add last element value from index
                Object.keys(initialObj).forEach((item, i) => {
                    if (i >= lastIndex) {
                        initialObj[item] = Number(e.target.value);
                    }
                });
                setMonthsQuantity(initialObj);
            }
        }
    };
    const columns = [
        {
            title: '',
            dataIndex: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: t('Jan'),
            dataIndex: 'jan',
            align: 'center',
            render: (text, key) => (
                <Input
                    placeholder="-"
                    type="number"
                    disabled={disableMonths.jan}
                    name="jan"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Feb'),
            dataIndex: 'feb',
            align: 'center',
            render: (text, key) => (
                <Input
                    placeholder="-"
                    type="number"
                    name="feb"
                    disabled={disableMonths.feb}
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Mar'),
            dataIndex: 'mar',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.mar}
                    placeholder="-"
                    type="number"
                    name="mar"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Apr'),
            dataIndex: 'apr',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.apr}
                    placeholder="-"
                    type="number"
                    name="apr"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('May'),
            dataIndex: 'may',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.may}
                    placeholder="-"
                    type="number"
                    name="may"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Jun'),
            dataIndex: 'jun',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.jun}
                    placeholder="-"
                    type="number"
                    name="jun"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Jul'),
            dataIndex: 'jul',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.jul}
                    placeholder="-"
                    type="number"
                    name="jul"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Aug'),
            dataIndex: 'aug',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.aug}
                    placeholder="-"
                    type="number"
                    name="aug"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Sep'),
            dataIndex: 'sep',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.sep}
                    placeholder="-"
                    type="number"
                    name="sep"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Oct'),
            dataIndex: 'oct',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.oct}
                    placeholder="-"
                    type="number"
                    name="oct"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Nov'),
            dataIndex: 'nov',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.nov}
                    placeholder="-"
                    type="number"
                    name="nov"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Dec'),
            dataIndex: 'dec',
            align: 'center',
            render: (text, key) => (
                <Input
                    disabled={disableMonths.dec}
                    placeholder="-"
                    type="number"
                    name="dec"
                    onChange={(e) => handleChange(e, key)}
                    value={text}
                    size="small"
                    style={{ width: '60px', textAlign: 'right' }}
                />
            ),
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            className: 'budget-status-column',
            align: 'center',
            render: (text) => (
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#6C757D',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                        color: '#ffff',
                        height: quantitySwitch === false ? '40px' : '81px',
                    }}>
                    {' '}
                    <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>
                    {text}
                </span>
            ),
            onCell: (_, index) => {
                if (index === 0) {
                    return {
                        rowSpan: 3,
                    };
                }
                if (index > 0) {
                    return {
                        rowSpan: 0,
                    };
                }
                return {};
            },
        },
        {
            title: t('Total'),
            dataIndex: 'total',
            align: 'center',
            onCell: (_, index) => {
                if (index === 0) {
                    return {
                        rowSpan: 3,
                    };
                }
                if (index > 0) {
                    return {
                        rowSpan: 0,
                    };
                }
                return {};
            },
        },
    ];
    // useEffect(() => {
    //     let sum = 0;
    //     const total1 = Object.values(monthsPrice).reduce(
    //         (previousValue, currentValue) => Number(previousValue) + Number(currentValue)
    //     );
    //     const totalQuantity = Object.values(monthsQuantity).reduce(
    //         (previousValue, currentValue) => Number(previousValue) + Number(currentValue)
    //     );
    //     if (totalQuantity === 0) {
    //         sum = Number(total1);
    //     } else {
    //         sum = Number(total1) * Number(totalQuantity);
    //     }
    //     setRowTotal(sum);
    // }, [monthsPrice, monthsQuantity]);
    const data = [
        {
            key: '1',
            name: t('price'),
            jan: monthsPrice.jan === 0 ? '' : monthsPrice.jan,
            feb: monthsPrice.feb === 0 ? '' : monthsPrice.feb,
            mar: monthsPrice.mar === 0 ? '' : monthsPrice.mar,
            apr: monthsPrice.apr === 0 ? '' : monthsPrice.apr,
            may: monthsPrice.may === 0 ? '' : monthsPrice.may,
            jun: monthsPrice.jun === 0 ? '' : monthsPrice.jun,
            jul: monthsPrice.jul === 0 ? '' : monthsPrice.jul,
            aug: monthsPrice.aug === 0 ? '' : monthsPrice.aug,
            sep: monthsPrice.sep === 0 ? '' : monthsPrice.sep,
            oct: monthsPrice.oct === 0 ? '' : monthsPrice.oct,
            nov: monthsPrice.nov === 0 ? '' : monthsPrice.nov,
            dec: monthsPrice.dec === 0 ? '' : monthsPrice.dec,
            status: t('redact'),
            total: rowTotal,
        },
    ];
    const data2 = [
        {
            key: '1',
            name: t('price'),
            jan: monthsPrice.jan === 0 ? '' : monthsPrice.jan,
            feb: monthsPrice.feb === 0 ? '' : monthsPrice.feb,
            mar: monthsPrice.mar === 0 ? '' : monthsPrice.mar,
            apr: monthsPrice.apr === 0 ? '' : monthsPrice.apr,
            may: monthsPrice.may === 0 ? '' : monthsPrice.may,
            jun: monthsPrice.jun === 0 ? '' : monthsPrice.jun,
            jul: monthsPrice.jul === 0 ? '' : monthsPrice.jul,
            aug: monthsPrice.aug === 0 ? '' : monthsPrice.aug,
            sep: monthsPrice.sep === 0 ? '' : monthsPrice.sep,
            oct: monthsPrice.oct === 0 ? '' : monthsPrice.oct,
            nov: monthsPrice.nov === 0 ? '' : monthsPrice.nov,
            dec: monthsPrice.dec === 0 ? '' : monthsPrice.dec,
            status: t('redact'),
            total: rowTotal,
        },
        {
            key: '2',
            name: t('quantity'),
            jan: monthsQuantity.jan === 0 ? '' : monthsQuantity.jan,
            feb: monthsQuantity.feb === 0 ? '' : monthsQuantity.feb,
            mar: monthsQuantity.mar === 0 ? '' : monthsQuantity.mar,
            apr: monthsQuantity.apr === 0 ? '' : monthsQuantity.apr,
            may: monthsQuantity.may === 0 ? '' : monthsQuantity.may,
            jun: monthsQuantity.jun === 0 ? '' : monthsQuantity.jun,
            jul: monthsQuantity.jul === 0 ? '' : monthsQuantity.jul,
            aug: monthsQuantity.aug === 0 ? '' : monthsQuantity.aug,
            sep: monthsQuantity.sep === 0 ? '' : monthsQuantity.sep,
            oct: monthsQuantity.oct === 0 ? '' : monthsQuantity.oct,
            nov: monthsQuantity.nov === 0 ? '' : monthsQuantity.nov,
            dec: monthsQuantity.dec === 0 ? '' : monthsQuantity.dec,
        },
    ];
    return (
        <>
            <CustomSwitch
                checked={copySwitch}
                setCheck={setCopySwitch}
                label={t('copy the value to the following months')}
            />
            <Table
                columns={columns}
                dataSource={quantitySwitch === false ? data : data2}
                pagination={false}
                bordered
                size="small"
                summary={(pageData) => {
                    let sumJan = 1;
                    let sumFeb = 1;
                    let sumMar = 1;
                    let sumApr = 1;
                    let sumMay = 1;
                    let sumJun = 1;
                    let sumJul = 1;
                    let sumAug = 1;
                    let sumSep = 1;
                    let sumOct = 1;
                    let sumNov = 1;
                    let sumDec = 1;
                    pageData.forEach(({ jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec }) => {
                        sumJan *= Number(jan);
                        sumFeb *= Number(feb);
                        sumMar *= Number(mar);
                        sumApr *= Number(apr);
                        sumMay *= Number(may);
                        sumJun *= Number(jun);
                        sumJul *= Number(jul);
                        sumAug *= Number(aug);
                        sumSep *= Number(sep);
                        sumOct *= Number(oct);
                        sumNov *= Number(nov);
                        sumDec *= Number(dec);
                        setRowTotal(
                            Number(sumJan) +
                                Number(sumFeb) +
                                Number(sumMar) +
                                Number(sumApr) +
                                Number(sumMay) +
                                Number(sumJun) +
                                Number(sumJul) +
                                Number(sumAug) +
                                Number(sumSep) +
                                Number(sumOct) +
                                Number(sumNov) +
                                Number(sumDec)
                        );
                    });
                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>
                                    <span>{t('sum')}</span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={1}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumJan === 0 ? '' : sumJan}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={2}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumFeb === 0 ? '' : sumFeb}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={3}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumMar === 0 ? '' : sumMar}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={4}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumApr === 0 ? '' : sumApr}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={5}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumMay === 0 ? '' : sumMay}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={6}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumJun === 0 ? '' : sumJun}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={7}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumJul === 0 ? '' : sumJul}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={8}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumAug === 0 ? '' : sumAug}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={9}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumSep === 0 ? '' : sumSep}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={10}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumOct === 0 ? '' : sumOct}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={11}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumNov === 0 ? '' : sumNov}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align="right" index={12}>
                                    <span style={{ paddingRight: '8px', fontWeight: 'normal', color: 'black' }}>
                                        {sumDec === 0 ? '' : sumDec}
                                    </span>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }}
            />
        </>
    );
};

export default React.memo(UpdateTable);
