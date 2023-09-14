import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTranslation } from 'react-i18next';

const Page2Table = (props) => {
    const { cellClick, skuClick, pharmacyData, skuData, allocationData, checked } = props;
    const { t } = useTranslation();

    const sortColumn = (event) => {
        const indis = Number(event.target.id);
        var table, i, x, y;
        table = document.getElementById('split-page2-table-tbody');
        var switching = true;
        // Run loop until no switching is needed
        while (switching) {
            switching = false;
            var rows = table.rows;
            // Loop to go through all rows
            for (i = 1; i < rows.length - 1; i++) {
                var Switch = false;
                // Fetch 2 elements that need to be compared
                x = rows[i].getElementsByTagName('TD')[indis + 2];
                y = rows[i + 1].getElementsByTagName('TD')[indis + 2];
                // Get inner cell Number
                let numX = Number(x.innerText.split('%')[0]);
                let numY = Number(y.innerText.split('%')[0]);
                // Check if 2 rows need to be switched
                if (numX > numY) {
                    // If yes, mark Switch as needed and break loop
                    Switch = true;
                    break;
                }
            }
            if (Switch) {
                // Function to switch rows and mark switch as completed
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    };

    useEffect(() => {
        //? sum each table column

        if (pharmacyData.length !== 0 && skuData.length !== 0) {
            const table = document.getElementById('split-page2-table-tbody');
            const rows = table.rows;
            for (let j = 0; j < skuData.length; j++) {
                let sumVal1 = 0;
                for (let i = 0; i < rows.length - 1; i++) {
                    let x = rows[i + 1].getElementsByTagName('TD')[j + 2];
                    if (x !== undefined) {
                        sumVal1 += Number(x.innerText.split('%')[0]);
                    }
                }
                rows[0].cells[j + 2].innerText = checked === false ? sumVal1.toFixed(2) + '%' : sumVal1;
            }
        }
    }, [checked, pharmacyData, skuData]);

    return (
        <div id="split-page2-table-container">
            <Table bordered id="split-page2-table">
                <thead>
                    {/* FİRST ROW */}
                    <tr key="thTr1">
                        <th>{t('CONNECTED')}</th>
                        <th></th>
                        {/* SKU */}
                        {skuData?.map((data, index) => (
                            <th key={index} className="head-name">
                                <button id={data.globalSkuId} onClick={skuClick} style={{ fontWeight: 600 }}>
                                    {data.globalSkuAbb}
                                </button>
                                <button id={index} onClick={sortColumn} className="up-down-icon">
                                    <i id={index} className="fas fa-angle-up up-icon"></i>
                                    <i id={index} className="fas fa-angle-down down-icon"></i>
                                </button>
                            </th>
                        ))}
                    </tr>
                    <tr key="thTr2">
                        <td>{t('UNITE or PERCEN')}.</td>
                        <td>
                            <button className="left-right-icon">
                                <i>
                                    <ArrowLeftIcon fontSize="1" className="left-icon" />
                                </i>
                                <i>
                                    <ArrowRightIcon fontSize="1" className="right-icon" />
                                </i>
                            </button>
                        </td>
                        {Array.from({ length: skuData?.length }).map((percent, index) => (
                            <td key={index}>
                                <button>
                                    <i className="newTab-icon">
                                        <OpenInNewIcon fontSize="1" color="secondary" />
                                    </i>
                                    -
                                </button>
                            </td>
                        ))}
                    </tr>
                </thead>

                <tbody id="split-page2-table-tbody">
                    <tr key="tbTr1">
                        <td>{t('SALES')}</td>
                        <td></td>
                        {Array.from({ length: skuData?.length }).map((percent, index) => (
                            <td key={index}>
                                <button>-</button>
                            </td>
                        ))}
                    </tr>
                    {/* PHARMACY  */}
                    {pharmacyData?.map((data, index) => (
                        <tr key={index}>
                            <td className="pharmacy-name" title={data.pharmacyName}>
                                {data.pharmacyName}
                            </td>
                            <td className="category">{data.category}</td>

                            {/* SKU CELL */}
                            {skuData?.map((el, ind) =>
                                allocationData?.map(
                                    (x) =>
                                        data.pharmacyId === x.pharmacyId &&
                                        el.globalSkuId === x.skuId && (
                                            <td key={index}>
                                                <button
                                                    id={`pharmacy:╚${data.pharmacyName}╚${x.pharmacyId}╚sku:╚${el.globalSkuName}╚${x.skuId}`}
                                                    onClick={cellClick}>
                                                    <i
                                                        className="newTab-icon"
                                                        id={`pharmacy:╚${data.pharmacyName}╚${x.pharmacyId}╚sku:╚${el.globalSkuName}╚${x.skuId}`}>
                                                        <OpenInNewIcon
                                                            fontSize="1"
                                                            color="secondary"
                                                            id={`pharmacy:╚${data.pharmacyName}╚${x.pharmacyId}╚:╚${el.globalSkuName}╚${x.skuId}`}
                                                        />
                                                    </i>
                                                    {checked === false ? `${x.percent}%` : x.unite}
                                                </button>
                                            </td>
                                        )
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default React.memo(Page2Table);
