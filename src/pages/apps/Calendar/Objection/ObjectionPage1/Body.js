import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { changeObjectionPageNext } from '../../../../../redux/actions';
import { useTranslation } from 'react-i18next';

const Body = (props) => {
    const { objectionPromo, objectionNonPromo, objectionOther, setBrand } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const headerName = ['PT', 'BRANDS', 'LAST UPDATE'];
    // const handleClickBrands = (e) => {
    //     const getBrand = e.target.id;
    //     const splitBrandName = getBrand.split("/")
    //     setBrand({id: splitBrandName[1], name: splitBrandName[0]})
    //     setTimeout(() => {
    //         dispatch(changeObjectionPageNext());
    //     }, 250);
    // }

    const changeBg = (date) => {
        let a = new Date();
        let x = new Date(date);

        const nowDateString = moment(a).format('L').split('/');
        const dateString = moment(x).format('L').split('/');

        if (nowDateString[2] > dateString[2]) {
            return 'past_date';
        } else if (nowDateString[2] === dateString[2]) {
            if (nowDateString[0] > dateString[1]) {
                if (nowDateString[1] > dateString[0]) {
                    return 'past_date';
                } else if (nowDateString[0] === dateString[1]) {
                    return 'now_date';
                } else {
                    return 'future_date';
                }
            } else if (nowDateString[0] === dateString[1]) {
                if (nowDateString[1] > dateString[0]) {
                    return 'paste_date';
                } else if (nowDateString[1] === dateString[0]) {
                    return 'now_date';
                } else {
                    return 'future_date';
                }
            } else if (nowDateString[0] < dateString[1]) {
                return 'future_date';
            }
        } else if (nowDateString[2] < dateString[2]) {
            return 'future_date';
        } else {
            return 'now_date';
        }
    };

    return (
        <div className="objection_body">
            <Table responsive>
                <thead>
                    <tr>
                        {headerName?.map((data, index) => (
                            <th className={data === 'BRANDS' ? 'text-start ps-2' : null} key={index}>
                                {t(`${data}`)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {objectionPromo?.map((data, index) => (
                        <tr key={index}>
                            <td style={{ color: '#00a0db' }}>PP</td>
                            <td className="text-start ps-2">{data.brandName}</td>
                            <td className={`competitor_date  ${changeBg(data.date)}`}>{data.date}</td>
                        </tr>
                    ))}
                    {objectionNonPromo?.map((data, index) => (
                        <tr key={index}>
                            <td style={{ color: '#febc98' }}>NPP</td>
                            <td className="text-start ps-2">{data.brandName}</td>
                            <td className={`competitor_date  ${changeBg(data.date)}`}>{data.date}</td>
                        </tr>
                    ))}
                    {objectionOther?.map((data, index) => (
                        <tr key={index}>
                            <td style={{ color: '#849ed0' }}>OP</td>
                            <td className="text-start ps-2">{data.brandName}</td>
                            <td className={`competitor_date  ${changeBg(data.date)}`}>{data.date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default React.memo(Body);
