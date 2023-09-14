import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeCompetitorPageNext, competitorBrandId, competitorBrandName, data } from '../../../../../redux/actions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const Body = (competitor) => {
    const [headerName] = useState(['BRANDS', 'LAST UPDATE', 'NC']);
    const [brandName, setBrandName] = useState();
    const dispatch = useDispatch();
    const nowDate = new Date();
    const { t } = useTranslation();

    //    useEffect(() => {
    //      let a=new Date();
    //      let b=new Date('01/02/2024');

    //     //     console.log(b);
    //     //   console.log(a<b);

    //     //    console.log(a);

    //     let x;
    //     competitor.competitor.map((data)=>{
    //         console.log(data.date);
    //         return (
    //             x=new Date(data.date),
    //             a>x
    //             ?console.log('şimdi büyük gelen veriden')
    //             :a<x
    //             ?console.log('şimdi küçük gelen veriden')
    //             :console.log('- gelmiş')
    //         )
    //     })
    //    }, [competitor])

    const handleClickBrands = (e) => {
        const getBrand = e.target.id;
        const splitBrandName = getBrand.split('/');
        setBrandName(splitBrandName[0]);
        dispatch(competitorBrandName(splitBrandName[0]));
        dispatch(competitorBrandId(splitBrandName[1]));
        setTimeout(() => {
            dispatch(changeCompetitorPageNext());
        }, 250);
    };

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
                    return 'past_date';
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
        <div className="competitor_body">
            <Table>
                <thead>
                    <tr>
                        {headerName.map((data, index) => (
                            <th className={data === 'BRANDS' ? 'text-start ps-2' : null} key={index}>
                                {t(`${data}`)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {competitor.competitor.map((data, index) => (
                        <tr key={index} id={`${data.brandName}/${data.brandId}`}>
                            <td
                                onClick={(e) => handleClickBrands(e)}
                                className="text-start ps-2"
                                id={`${data.brandName}/${data.brandId}`}>
                                {data.brandName}
                            </td>
                            <td className={`competitor_date  ${changeBg(data.date)}`}>{data.date}</td>
                            <td id={`${data.brandName}/${data.brandId}`}>
                                {data.numberOfCompetitor === 0 ? '-' : data.numberOfCompetitor}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Body;
